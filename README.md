# Aditee Jha — Portfolio

Retro-future, anime-flavoured portfolio for [Aditee Jha](https://github.com/aditeejha): synthwave sun and grid, CRT scanlines, pixel-art player card, falling sakura, and a Konami-code easter egg.

Built with **React 19 + TypeScript + Vite 7 + Tailwind CSS v4 + Framer Motion**. No backend. The contact form opens Gmail (or the mail app on a phone) with the message pre-filled.

## Run

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # static output in dist/
npm run preview    # serve the production build
```

## Refresh live stats

LeetCode, CodeChef, GitHub and Medium numbers live in `src/data/stats.json` and `src/data/articles.json`. They are static so the site never hits third-party APIs from the browser. Refresh them any time with:

```bash
npm run stats
```

Each source is fetched independently; if one fails the previous values are kept.

## Edit content

Everything written on the site lives in `src/data/profile.ts`: name, roles, bio, education, skills, projects, side quests, achievements, certifications, social links and nav. Change text there, save, done.

- Resume PDF: replace `public/Aditee_Jha_Resume.pdf`
- Project cover: `public/projects/spot2solve.webp`
- Pixel avatar: the 16×16 character map in `src/components/PixelAvatar.tsx`
- Player card stat bars: `playerStats` in `src/data/profile.ts`
- Colours and fonts: the `@theme` block in `src/index.css`

## Structure

```
src/
├── components/   canvas backgrounds, nav, cursor, preloader, cards, UI bits
├── sections/     Hero · About · Skills · Projects · Arena · Achievements · Writing · Contact · Footer
├── data/         profile.ts (content) · stats.json · articles.json
└── hooks/        useKonami · useActiveSection
scripts/fetch-stats.mjs   refreshes the JSON data
```

## Easter egg

Type ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the page.

## Deploy

`npm run build` and upload `dist/` to Vercel, Netlify, GitHub Pages or any static host. No environment variables needed.
