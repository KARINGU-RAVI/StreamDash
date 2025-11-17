# Streaming Dashboard (OMDb)

A simplified streaming dashboard built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma + SQLite, and OMDb API.

## Setup

1. Install dependencies:

```powershell
npm install
```

2. Create local env file:

```powershell
Copy-Item .env.example .env.local
# Then set OMDB_API_KEY in .env.local
```

3. Generate Prisma client (after first install):

```powershell
npx prisma generate
```

4. Run dev server:

```powershell
npm run dev
```

## Notes
- Server-side fetch uses `process.env.OMDB_API_KEY` only on the server.
- Images domains configured for OMDb posters.
- SQLite is used for local caching; persistence on Vercel is limited by default.
