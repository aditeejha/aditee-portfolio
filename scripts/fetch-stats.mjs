// Refreshes src/data/stats.json and src/data/articles.json from live sources.
// Run: npm run stats   (LeetCode GraphQL, CodeChef HTML, GitHub REST, Medium RSS)
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const statsPath = path.join(root, 'src/data/stats.json')
const articlesPath = path.join(root, 'src/data/articles.json')
const today = new Date().toISOString().slice(0, 10)
const UA = 'Mozilla/5.0 (portfolio-stats-refresh)'

const stats = JSON.parse(await readFile(statsPath, 'utf8'))
const articles = JSON.parse(await readFile(articlesPath, 'utf8'))

async function leetcode() {
  const query =
    'query($u:String!){matchedUser(username:$u){profile{ranking} submitStatsGlobal{acSubmissionNum{difficulty count}} badges{displayName}} userContestRanking(username:$u){attendedContestsCount rating globalRanking topPercentage}}'
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json', referer: 'https://leetcode.com/', 'user-agent': UA },
    body: JSON.stringify({ query, variables: { u: stats.leetcode.username } }),
  })
  const { data } = await res.json()
  const bucket = Object.fromEntries(
    data.matchedUser.submitStatsGlobal.acSubmissionNum.map((d) => [d.difficulty.toLowerCase(), d.count]),
  )
  const c = data.userContestRanking
  Object.assign(stats.leetcode, {
    solved: { all: bucket.all, easy: bucket.easy, medium: bucket.medium, hard: bucket.hard },
    contestRating: Math.round(c?.rating ?? stats.leetcode.contestRating),
    contestsAttended: c?.attendedContestsCount ?? stats.leetcode.contestsAttended,
    globalRanking: c?.globalRanking ?? stats.leetcode.globalRanking,
    topPercentage: c?.topPercentage ?? stats.leetcode.topPercentage,
    problemRanking: data.matchedUser.profile.ranking,
    badges: data.matchedUser.badges.map((b) => b.displayName),
  })
}

async function codechef() {
  const html = await (await fetch(stats.codechef.url, { headers: { 'user-agent': UA } })).text()
  const num = (re) => {
    const m = html.match(re)
    return m ? Number(m[1].replace(/,/g, '')) : undefined
  }
  const rating = num(/rating-number">\s*(\d+)/)
  const highest = num(/Highest Rating\s*(\d+)/i)
  const stars = num(/rating-star">\s*<span>\s*(\d)/)
  const contests = num(/No\. of Contests Participated:?\s*(\d+)/i)
  if (rating) stats.codechef.rating = rating
  if (highest) stats.codechef.highestRating = highest
  if (stars) stats.codechef.stars = stars
  if (contests) stats.codechef.contests = contests
}

async function github() {
  const r = await (
    await fetch(`https://api.github.com/users/${stats.github.username}`, { headers: { 'user-agent': UA } })
  ).json()
  if (r.public_repos) stats.github.publicRepos = r.public_repos
  if (typeof r.followers === 'number') stats.github.followers = r.followers
}

function titleCase(slug) {
  return slug
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

async function medium() {
  const xml = await (await fetch('https://medium.com/feed/@aditeejha', { headers: { 'user-agent': UA } })).text()
  const previous = new Map(articles.items.map((a) => [a.link, a]))
  const decode = (s) =>
    s
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, body]) => {
    const pick = (tag) => {
      const re = new RegExp('<' + tag + '>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</' + tag + '>')
      return (body.match(re) ?? [])[1]?.trim() ?? ''
    }
    const link = pick('link').split('?')[0]
    const title = pick('title').replace(/^[“"]+|[”"]+$/g, '').trim()
    const snippet = pick('description').match(/medium-feed-snippet">([\s\S]*?)<\/p>/)?.[1]
    const summary = snippet ? decode(snippet.replace(/<[^>]+>/g, '').trim()) : previous.get(link)?.summary ?? ''
    const pubSlug = link.match(/medium\.com\/([^/]+)\//)?.[1] ?? ''
    const publication = pubSlug.startsWith('@') ? 'Medium' : titleCase(pubSlug)
    return { title, link, date: new Date(pick('pubDate')).toISOString().slice(0, 10), publication, summary }
  })
  if (items.length) articles.items = items
}

for (const [name, fn] of Object.entries({ leetcode, codechef, github, medium })) {
  try {
    await fn()
    console.log('ok   ' + name)
  } catch (e) {
    console.warn('skip ' + name + ': ' + e.message + ' (kept previous values)')
  }
}
stats.updatedAt = today
articles.updatedAt = today
await writeFile(statsPath, JSON.stringify(stats, null, 2) + '\n')
await writeFile(articlesPath, JSON.stringify(articles, null, 2) + '\n')
console.log('written stats.json + articles.json')
