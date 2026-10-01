export const profile = {
  name: 'Aditee Jha',
  handle: 'aditeejha',
  katakana: 'アディティ・ジャー',
  roles: ['Full-Stack Developer', 'Backend Engineer', 'Competitive Programmer', 'Writer on Medium', 'Debater & Orator'],
  tagline:
    'I build backends that do not flinch under load, frontends that feel alive, and I write about everything in between.',
  location: 'Dhanbad, Jharkhand, India',
  timezone: 'Asia/Kolkata',
  email: 'aditeejha18@gmail.com',
  resume: '/Aditee_Jha_Resume.pdf',
  availability: 'Open to internships · Summer 2027',
  bio: [
    'Second-year Computer Science undergrad at BIT Mesra, writing code that ships. My comfort zone is the backend: REST APIs, auth and RBAC, Postgres schemas, queues, and the kind of concurrency bugs that only show up at 2 AM.',
    'Lately I have been building full products end to end: a civic-issue platform with AI triage and SLA escalation, an offline-first car-rental marketplace, and a finance analytics API. I like systems that stay honest under pressure: transactional state machines, append-only audit logs, idempotent replays.',
    'Off the keyboard I debate, give talks, and publish essays on Medium. Same muscle, different medium: take something tangled, make it clear.',
  ],
  education: {
    school: 'Birla Institute of Technology, Mesra',
    degree: 'B.Tech, Computer Science & Engineering',
    years: '2024 – 2028',
    cgpa: '8.27',
    location: 'Ranchi, Jharkhand',
    coursework: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Object-Oriented Programming', 'Computer Networks'],
  },
  quickFacts: [
    { label: 'CLASS', value: 'Full-Stack / Backend' },
    { label: 'GUILD', value: 'BIT Mesra · CSE ’28' },
    { label: 'BASE', value: 'Dhanbad, JH' },
    { label: 'MAIN WEAPON', value: 'Node.js + PostgreSQL' },
    { label: 'SIDE QUEST', value: 'Essays on Medium' },
    { label: 'STATUS', value: 'Open to internships' },
  ],
  socials: [
    { name: 'GitHub', handle: '@aditeejha', url: 'https://github.com/aditeejha', icon: 'github' },
    { name: 'LinkedIn', handle: 'aditeejha18', url: 'https://www.linkedin.com/in/aditeejha18', icon: 'linkedin' },
    { name: 'X / Twitter', handle: '@aditeejha_', url: 'https://x.com/aditeejha_', icon: 'x' },
    { name: 'Medium', handle: '@aditeejha', url: 'https://aditeejha.medium.com/', icon: 'medium' },
    { name: 'LeetCode', handle: 'aditeejha', url: 'https://leetcode.com/u/aditeejha/', icon: 'leetcode' },
    { name: 'CodeChef', handle: 'aditee_jha', url: 'https://www.codechef.com/users/aditee_jha', icon: 'codechef' },
    { name: 'Codolio', handle: 'aditeejha', url: 'https://codolio.com/profile/aditeejha', icon: 'codolio' },
  ],
} as const

export type SocialIcon = (typeof profile.socials)[number]['icon']

export const skillGroups = [
  {
    title: 'Languages',
    jp: 'げんご',
    items: ['Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'Core',
    jp: 'コア',
    items: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Design'],
  },
  {
    title: 'Backend',
    jp: 'バックエンド',
    items: ['Node.js', 'Express.js', 'REST APIs', 'API Design', 'JWT Auth', 'RBAC', 'BullMQ', 'Sequelize'],
  },
  {
    title: 'Frontend & Databases',
    jp: 'フロント',
    items: ['React', 'Next.js', 'HTML5', 'CSS3', 'PostgreSQL', 'MySQL', 'Prisma', 'Redis'],
  },
  {
    title: 'Tools & Services',
    jp: 'ツール',
    items: ['Git', 'GitHub', 'Postman', 'Docker', 'Cloudinary', 'Leaflet', 'OpenStreetMap', 'Gemini API'],
  },
] as const

export const playerStats = [
  { label: 'BACKEND', value: 92, tone: 'cyan' },
  { label: 'FRONTEND', value: 78, tone: 'pink' },
  { label: 'DSA', value: 84, tone: 'amber' },
  { label: 'WRITING', value: 88, tone: 'violet' },
] as const

export type Project = {
  slug: string
  title: string
  year: string
  kind: string
  tagline: string
  description: string
  highlights: string[]
  tech: string[]
  links: { label: string; url: string; kind: 'live' | 'code' }[]
  cover?: string
  accent: 'pink' | 'cyan' | 'amber' | 'violet'
  featured?: boolean
  badge?: string
}

export const projects: Project[] = [
  {
    slug: 'spot2solve',
    title: 'Spot2Solve',
    year: '2026',
    kind: 'Civic-tech platform',
    tagline: 'Civic issues, tracked to the finish.',
    description:
      'A full-stack civic issue reporting and resolution platform with separate Citizen, Authority and Admin workflows, JWT-based RBAC, and an issue lifecycle that only closes when the citizen confirms the fix.',
    highlights: [
      'End-to-end lifecycle: duplicate detection, geolocation, department auto-routing, SLA tracking, escalation, citizen verification and append-only audit history.',
      'Gemini classifies photos into category and severity; Cloudinary stores evidence and voice notes; Leaflet and OpenStreetMap power maps, heatmaps and near-me discovery.',
      'Transactional status transitions, background SLA monitoring with automatic escalation, and notification fan-out via in-app alerts and email.',
    ],
    tech: ['React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Gemini', 'Cloudinary', 'Leaflet'],
    links: [
      { label: 'Live', url: 'https://spot2solve-frontend.onrender.com/', kind: 'live' },
      { label: 'Code', url: 'https://github.com/aditeejha/Spot2Solve', kind: 'code' },
    ],
    cover: '/projects/spot2solve.webp',
    accent: 'cyan',
    featured: true,
    badge: 'FEATURED',
  },
  {
    slug: 'trustly-cars',
    title: 'Trustly Cars',
    year: '2026',
    kind: 'Offline-first marketplace',
    tagline: 'A car-rental platform where the AI narrates but never decides.',
    description:
      'Next.js 14 + Express + PostgreSQL + Redis + BullMQ car-rental platform with 35+ endpoints, JWT/RBAC, a PWA service worker and IndexedDB-backed offline sync that replays queued bookings idempotently.',
    highlights: [
      'Trust and damage accountability: 5-angle pre/post-trip evidence with a deterministic rule engine, plus an AI assistant pipeline (Context → Rules → Prompt → LLM → Formatter) with a no-API-key fallback.',
      'Zero double-booking under concurrent and offline-replay traffic via Redis locks, transactional FOR UPDATE and tstzrange overlap checks.',
      'Dynamic pricing (demand × time × scarcity) recomputed by a BullMQ cron every 15 minutes; emergency alerts, live tracking, KYC, Helmet, rate limits, Joi, Pino, S3 presigned uploads.',
    ],
    tech: ['Next.js 14', 'Express', 'PostgreSQL', 'Redis', 'BullMQ', 'PWA', 'IndexedDB', 'S3'],
    links: [{ label: 'Code', url: 'https://github.com/aditeejha/Trustly-cars', kind: 'code' }],
    accent: 'pink',
  },
  {
    slug: 'finance-dashboard',
    title: 'Finance Dashboard API',
    year: '2026',
    kind: 'Backend service',
    tagline: 'Structured financial data with roles, filters and analytics.',
    description:
      'A scalable REST backend on Node.js, Express and MySQL for financial data management with JWT auth and role-based access (admin, analyst, viewer).',
    highlights: [
      'Modular controllers / services / middleware architecture with centralized error handling, validation and rate limiting.',
      'Transaction APIs with CRUD, filtering, pagination and search; Sequelize aggregation queries drive income, expense and trend analytics.',
      'Load-tested with concurrent requests to verify reliability.',
    ],
    tech: ['Node.js', 'Express', 'MySQL', 'Sequelize', 'JWT', 'RBAC'],
    links: [{ label: 'Code', url: 'https://github.com/aditeejha/finance-dashboard', kind: 'code' }],
    accent: 'amber',
  },
  {
    slug: 'medikiosk',
    title: 'MediKiosk',
    year: '2026',
    kind: 'Smart India Hackathon',
    tagline: 'A clinical intake kiosk that writes the doctor’s summary.',
    description:
      'Digital clinical intake kiosk that collects patient details, symptoms and previous lab reports, generates concise clinical summaries for doctors, and uses OCR to extract important medical values.',
    highlights: [
      'Qualified the SIH 2026 college round.',
      'Adaptive history interview, red-flag triage and bilingual physician summary.',
      'Prescription and lab-report digitization through OCR and vision models.',
    ],
    tech: ['AI / LLM', 'OCR', 'FastAPI', 'React'],
    links: [],
    accent: 'violet',
    badge: 'SIH 2026',
  },
]

export const sideQuests = [
  { name: 'Trackify', blurb: 'Fleet management: vehicle tracking, trip planning, maintenance.', url: 'https://github.com/aditeejha/Trackify' },
  { name: 'LeetMetrics', blurb: 'LeetCode stats visualiser.', url: 'https://github.com/aditeejha/LeetMetrics' },
  { name: 'auth-backend', blurb: 'Reusable JWT auth service.', url: 'https://github.com/aditeejha/auth-backend' },
  { name: 'FirstStepTech', blurb: 'Early frontend build, deployed on Vercel.', url: 'https://first-step-tech-ruddy.vercel.app' },
  { name: 'LeetCode-Questions', blurb: 'Java solutions, updated almost daily.', url: 'https://github.com/aditeejha/LeetCode-Questions' },
]

export const achievements = [
  {
    title: 'SIH 2026 · College Round Qualified',
    detail: 'Built MediKiosk, a clinical intake kiosk with OCR-driven lab report extraction and doctor-ready summaries.',
    year: '2026',
    icon: 'trophy',
  },
  {
    title: 'Winner · Technical Presentation',
    detail: 'College-level technical presentation on AI Applications in Drones.',
    year: '2025',
    icon: 'mic',
  },
  {
    title: 'Winner · Debate Competitions',
    detail: 'Multiple college-level debate wins; top finishes across inter-school and inter-college events.',
    year: '2024 – 2026',
    icon: 'swords',
  },
  {
    title: 'LeetCode 200-Day Streak',
    detail: 'Earned the 200 Days badge for 2026 by solving something every single day.',
    year: '2026',
    icon: 'flame',
  },
]

export const certifications = [
  { title: 'IBM Full-Stack JavaScript Developer Professional Certificate', issuer: 'Coursera · IBM' },
  { title: 'Developing Front-End Apps with React', issuer: 'Coursera · IBM' },
  { title: 'The Complete Git & GitHub Course 2025', issuer: 'Udemy' },
]

export const navItems = [
  { id: 'home', label: 'Home', jp: 'ホーム' },
  { id: 'about', label: 'About', jp: 'アバウト' },
  { id: 'skills', label: 'Skills', jp: 'スキル' },
  { id: 'projects', label: 'Projects', jp: 'プロジェクト' },
  { id: 'arena', label: 'Arena', jp: 'アリーナ' },
  { id: 'achievements', label: 'Trophies', jp: 'トロフィー' },
  { id: 'writing', label: 'Writing', jp: 'エッセイ' },
  { id: 'contact', label: 'Contact', jp: 'コンタクト' },
]
