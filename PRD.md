# Streaming Dashboard Clone — Product Requirements Document (PRD)

## 1) Summary
- Build a simplified streaming dashboard (Netflix/Hulu style) using Next.js 14 App Router + TypeScript and Tailwind CSS.
- Integrate with the OMDb API for content data and fetch at least 30 movies.
- Use Server Components for primary data fetching. Use Client Components for interactive UI (e.g., horizontal scroll rows).
- Implement dynamic routing for movie detail pages.
- Use SQLite for local development data storage (caching/indexing/search). Deploy to Vercel with proper environment variables.
- Complete the work within 6–8 hours (1 day).

## 2) Goals and Non‑Goals
### Goals
- Server-first rendering via Next.js App Router.
- Secure usage of an OMDb API key via env vars.
- Clean, responsive UI with Tailwind CSS and Next Image/Link optimizations.
- At least 3 content rows (horizontal scrollers) and a hero banner.
- Dynamic detail route `/movie/[id]` retrieving and displaying full movie details.
- Local persistence with SQLite (caching fetched movies; optional watchlist/favorites if time allows).
- Deploy to Vercel with environment variables configured.

### Non‑Goals
- Full authentication and user accounts.
- Payment/billing, DRM, or actual video playback.
- Comprehensive accessibility audit (basic a11y only due to scope/time).
- Production-grade editorial taxonomy; we’ll curate categories by queries.

## 3) Success Criteria
- Homepage renders server-side with:
  - A hero banner for the first item.
  - At least three movie rows with horizontal scrolling.
  - Each poster uses Next `Image` and links to a detail page via Next `Link`.
- Detail page `/movie/[id]` renders server-side with title, description, and large poster.
- At least 30 unique movies shown across rows.
- OMDb key loaded via environment variable; not exposed to client directly.
- SQLite used in dev to cache/search movie data.
- App deployed to Vercel with working env var and images.
- AI_Report.md prepared per submission requirements.

## 4) Constraints & Assumptions
- Timeboxed to 6–8 hours.
- OMDb free tier limits: results are returned 10 per page for `s=` queries; use paging (`page=1..n`) and multiple queries; deduplicate by `imdbID`.
- Image sources from OMDb responses often point to `m.media-amazon.com` or `img.omdbapi.com`. Configure `next.config.js` `images.remotePatterns` accordingly.
- SQLite on Vercel is not persistent by default; DB is reliable locally. For production, we can fall back to on-demand fetch + ISR/`revalidate` or use hosted SQLite (e.g., Turso) if allowed. See Risks.

## 5) Tech Stack
- Framework: Next.js 14 (App Router) + TypeScript
- Styling: Tailwind CSS
- Data: OMDb API
- DB: SQLite (Prisma ORM recommended) for local persistence
- Deployment: Vercel
- Tooling: ESLint/Prettier, Git/GitHub

## 6) External API: OMDb
- API base: `https://www.omdbapi.com/`
- Auth: API key via query param `apikey=...`
- Sample provided: `https://www.omdbapi.com/?i=tt3896198&apikey=3a7e0d1c` (key: `3a7e0d1c`)
- Endpoints used:
  - Search: `/?s={query}&type=movie&page={1..n}&apikey={key}` — returns a list with `Search`, `totalResults`, `Response`.
  - Detail by ID: `/?i={imdbID}&plot=full&apikey={key}` — returns full details.
- Data Notes:
  - `Poster` may be `N/A`; provide a placeholder image.
  - Results per page are 10; fetch multiple pages and/or multiple queries for ≥30 items.

## 7) Data Model (SQLite via Prisma)
- `Movie` (cached search/detail data)
  - `imdbId` (string, PK e.g., `tt1234567`)
  - `title` (string)
  - `year` (string)
  - `type` (string) — e.g., `movie`
  - `posterUrl` (string | null)
  - `plot` (string | null)
  - `genre` (string | null)
  - `rated` (string | null)
  - `runtime` (string | null)
  - `director` (string | null)
  - `actors` (string | null)
  - `ratingsJson` (JSON | null)
  - `lastFetchedAt` (Date)

- `Collection` (for curated rows)
  - `id` (int, PK, auto)
  - `slug` (string, unique) — e.g., `trending`, `marvel`, `space`
  - `title` (string) — display name of the row

- `CollectionItem`
  - `id` (int, PK, auto)
  - `collectionId` (FK -> Collection)
  - `imdbId` (FK -> Movie)
  - `orderIndex` (int)

Notes:
- Keep schema minimal for speed. If time is tight, skip `Collection` tables and compute rows from queries at runtime; DB remains useful for caching.

## 8) Architecture & Routing
- App Router structure:
  - `app/layout.tsx` — root layout, global styles, header wrapper
  - `app/page.tsx` — server component; fetches data server-side; renders hero + multiple `MovieRow`
  - `app/movie/[id]/page.tsx` — server component; fetch detail by `params.id`
  - `components/Header` (client), `components/HeroBanner` (server/client if using intersection), `components/MovieRow` (client), `components/MovieCard` (client)
  - `lib/omdb.ts` — server-side fetch helpers (search, detail)
  - `lib/db.ts` — Prisma client
  - `lib/movies.ts` — data orchestration, caching into SQLite

- Image config: `next.config.js` with `images.remotePatterns` allowing `m.media-amazon.com` and `img.omdbapi.com`.

## 9) UX Requirements
- Header: fixed top, logo text/title, simple nav (e.g., Home, optionally Collections).
- Hero: full-width, responsive, uses Next `Image` with `fill` and `priority`.
- Rows: horizontally scrollable poster rails; keyboard/scroll controls; touch scroll on mobile.
- Cards: poster image, hover scale, clickable to detail page.
- Detail Page: large poster on left/top (responsive), title, year, genre, plot, director/actors.
- Responsive: Mobile-first; rows become swipeable; hero crops well.

## 10) Data Fetching Strategy
- Server-first:
  - Homepage (`app/page.tsx`): server fetch via `fetch()` to OMDb using env var for key; no `useState`/`useEffect` for primary fetch.
  - Detail page (`app/movie/[id]/page.tsx`): server fetch via `fetch()` by `imdbID`.
- Categories/Collections:
  - Use curated queries to assemble ≥30 unique movies, e.g., queries: `star`, `man`, `love`; pages 1–3 each → up to 90 candidates, dedupe by `imdbID`.
  - Pick hero = first item of the first row.
- Caching:
  - Option A (fast): rely on Next `fetch` cache with `revalidate` (e.g., 24h) and keep runtime in-memory.
  - Option B (with SQLite): on initial request, fetch-and-upsert movies to SQLite, then read from DB for rendering. Store detail responses when visited.

## 11) Environment & Security
- `.env.local` (dev only): `OMDB_API_KEY=3a7e0d1c`
- Access key on server only (do not embed in client components or query strings rendered to client). All `fetch()` from server components or server utils.
- Vercel: set `OMDB_API_KEY` in Project Settings → Environment Variables.

## 12) Phased Plan with Acceptance Criteria

### Phase 1 — Setup and External API Integration
1. Initialize Next.js 14 app with TypeScript and Tailwind; init Git repo.
2. Configure ESLint/Prettier; add base Tailwind styles.
3. Add `next.config.js` image remote patterns for OMDb poster hosts.
4. Create `.env.local` and load `OMDB_API_KEY` server-side.
5. Define TypeScript types for OMDb Search and Detail responses.
6. Implement `lib/omdb.ts` with `searchMovies(query, page)` and `getMovieById(imdbId)`.
7. Set up Prisma with SQLite (`schema.prisma`), generate client, minimal `Movie` model.

Acceptance:
- Local server runs; TS builds; types align with OMDb responses.
- Test search and detail utilities return expected data in dev.

### Phase 2 — Homepage and Server Components
8. Implement `app/layout.tsx` and `components/Header`.
9. In `app/page.tsx` (server), assemble ≥30 movies via multiple `searchMovies` calls; dedupe; pick hero.
10. Build `components/HeroBanner` using Next `Image` with `fill` and `priority`.
11. Create `components/MovieRow` (client) and `components/MovieCard` (client) for horizontal poster rails.
12. Render at least 3 `MovieRow` instances with titles (e.g., Trending, Space, Romance).
13. Ensure all posters use Next `Image` and wrap in Next `Link` to `/movie/[id]`.

Acceptance:
- Homepage renders hero + ≥3 rows with posters and working links; ≥30 unique movies visible across rows.

### Phase 3 — Dynamic Routing and Deployment
14. Add route `app/movie/[id]/page.tsx` (server) fetching details by `params.id`.
15. Render title, description, large poster, meta info.
16. Vercel deployment with `OMDB_API_KEY` env var configured.
17. Create `AI_Report.md` documenting AI tools used, code areas accelerated, live URL, and GitHub repo.

Acceptance:
- Detail page loads correctly on Vercel.
- Live URL and repo provided in `AI_Report.md`.

## 13) Detailed TODO Checklist (Sequential)
1) Scaffold Next.js + TS + Tailwind; init Git.
2) Configure `next.config.js` images remotePatterns.
3) Add `.env.local` with `OMDB_API_KEY` and server-only access.
4) Write OMDb TypeScript interfaces (`SearchResponse`, `MovieSummary`, `MovieDetail`).
5) Implement `lib/omdb.ts` (search/detail helpers) with error handling and dedupe utils.
6) Add Prisma + SQLite; define `Movie` model; run `prisma generate`.
7) Optional: add `Collection`/`CollectionItem` if time permits; otherwise, compute rows in code.
8) Build `app/layout.tsx` and `components/Header`.
9) Build `components/HeroBanner` (Next `Image` with `fill`+`priority`).
10) Build `components/MovieCard` and `components/MovieRow` (client, horizontal scroll).
11) Implement `app/page.tsx` server data fetching for ≥30 movies (multi-query, multi-page), choose hero, render 3+ rows.
12) Implement `/movie/[id]/page.tsx` server fetch by `imdbID` with full plot.
13) Polish styles, loading states, placeholder for `Poster === 'N/A'`.
14) Add minimal tests or type checks; run build locally.
15) Deploy to Vercel; configure env var; verify images load.
16) Write `AI_Report.md` with tool usage, live URL, repo link.

## 14) Implementation Notes
- Queries and Paging for ≥30 items: Use three queries like `star`, `man`, `love` and request `page=1..3` each; collect up to 90, dedupe by `imdbID`, then slice to desired counts per row.
- Dedupe: Use a `Set` of `imdbID` to avoid duplicates across queries.
- Placeholders: When `Poster` is `N/A`, render a Tailwind-styled placeholder with title overlay.
- Image domains: Allow `m.media-amazon.com` and `img.omdbapi.com` in Next config.
- Caching: Use `fetch` with `next: { revalidate: 86400 }` (24h) or similar.
- DB strategy: Upsert summaries on search; upsert full detail on detail page view.

## 15) Testing Plan
- Type safety: TS interfaces validated by sample responses.
- Utility tests (optional due to time): Dedupe function, OMDb URL builder.
- Manual QA: Verify hero renders, row scrolling, links to detail, images optimized, placeholder works, 30+ items shown.

## 16) Deployment Plan (Vercel)
- Push to GitHub; import repo in Vercel.
- Set `OMDB_API_KEY` in Vercel project env vars.
- Ensure `next.config.js` image remotePatterns are correct.
- Note on SQLite: Local persistence only is guaranteed. On Vercel, rely on server fetch + ISR unless a hosted SQLite (e.g., Turso) is approved.

## 17) Risks & Mitigations
- OMDb rate/volume limits: Keep requests minimal (3 queries × 3 pages = 9 calls) and cache via `revalidate`.
- Missing posters (`N/A`): Use placeholder.
- Vercel + SQLite persistence: Treat SQLite as dev cache; in prod, use ISR and on-demand fetch or switch to hosted SQLite if permitted.
- Image domains mismatch: Validate domains in Next config; fall back to placeholder.

## 18) Timeboxed Schedule (6–8 hours)
- Hour 0.5–1.0: Scaffold project, Tailwind, Git, env.
- Hour 1.0–2.0: OMDb helpers, TS types, next config images.
- Hour 2.0–3.5: Homepage server fetch, hero, rows, cards.
- Hour 3.5–4.5: Detail page server fetch + layout.
- Hour 4.5–5.5: Styling polish, placeholders, minor tests.
- Hour 5.5–6.5: Prisma/SQLite integration (local caching) if not yet done.
- Hour 6.5–7.5: Deploy to Vercel, env var, verify.
- Hour 7.5–8.0: Write AI_Report.md and final checks.

## 19) Submission
- Live URL (Vercel)
- GitHub repo link
- `AI_Report.md` documenting:
  - AI tools used (ChatGPT, Copilot, etc.)
  - Code areas assisted (Tailwind, utilities, configs)
  - Links to live site and repo
