import { searchMovies, getMovieById, type MovieDetail, type SearchResponse } from './omdb'
import { prisma } from './db'

export type MovieSummary = NonNullable<SearchResponse['Search']>[number]

async function upsertSummary(m: MovieSummary) {
  try {
    await prisma.movie.upsert({
      where: { imdbId: m.imdbID },
      update: {
        title: m.Title,
        year: m.Year,
        type: m.Type,
        posterUrl: m.Poster !== 'N/A' ? m.Poster : null,
        lastFetchedAt: new Date(),
      },
      create: {
        imdbId: m.imdbID,
        title: m.Title,
        year: m.Year,
        type: m.Type,
        posterUrl: m.Poster !== 'N/A' ? m.Poster : null,
      },
    })
  } catch {
    // ignore caching errors to avoid impacting UX
  }
}

async function upsertDetail(d: MovieDetail) {
  try {
    await prisma.movie.upsert({
      where: { imdbId: d.imdbID },
      update: {
        title: d.Title,
        year: d.Year,
        type: d.Type,
        posterUrl: d.Poster && d.Poster !== 'N/A' ? d.Poster : null,
        plot: d.Plot ?? undefined,
        genre: d.Genre ?? undefined,
        rated: d.Rated ?? undefined,
        runtime: d.Runtime ?? undefined,
        director: d.Director ?? undefined,
        actors: d.Actors ?? undefined,
        ratingsJson: d.Ratings ? JSON.stringify(d.Ratings) : undefined,
        lastFetchedAt: new Date(),
      },
      create: {
        imdbId: d.imdbID,
        title: d.Title,
        year: d.Year,
        type: d.Type,
        posterUrl: d.Poster && d.Poster !== 'N/A' ? d.Poster : null,
        plot: d.Plot ?? null,
        genre: d.Genre ?? null,
        rated: d.Rated ?? null,
        runtime: d.Runtime ?? null,
        director: d.Director ?? null,
        actors: d.Actors ?? null,
        ratingsJson: d.Ratings ? JSON.stringify(d.Ratings) : null,
      },
    })
  } catch {
    // ignore caching errors to avoid impacting UX
  }
}

export async function fetchAtLeastNMovies(n: number): Promise<MovieSummary[]> {
  const queries = ['star', 'man', 'love']
  const pages = [1, 2, 3]
  const results: MovieSummary[] = []
  const seen = new Set<string>()

  console.log('Starting to fetch movies, target:', n)

  for (const q of queries) {
    for (const p of pages) {
      console.log(`Fetching query="${q}" page=${p}`)
      const data = await searchMovies(q, p)
      console.log(`Response for ${q} page ${p}:`, data.Response, 'Items:', data.Search?.length || 0)
      
      const items = data.Search ?? []
      for (const m of items) {
        if (!seen.has(m.imdbID)) {
          seen.add(m.imdbID)
          results.push(m)
          if (results.length >= n) {
            console.log('Target reached, total movies:', results.length)
            await Promise.all(results.map((m) => upsertSummary(m)))
            return results
          }
        }
      }
    }
  }

  console.log('Finished fetching, total movies:', results.length)
  // Cache summaries in SQLite (best-effort)
  await Promise.all(results.map((m) => upsertSummary(m)))
  return results
}

export async function fetchMovieDetail(id: string): Promise<MovieDetail> {
  const d = await getMovieById(id)
  // Cache detail in SQLite (best-effort)
  await upsertDetail(d)
  return d
}
