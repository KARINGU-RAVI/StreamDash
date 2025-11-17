import HeroBanner from '@/components/HeroBanner'
import MovieRow from '@/components/MovieRow'
import { fetchAtLeastNMovies } from '@/lib/movies'

export default async function Page() {
  try {
    const movies = await fetchAtLeastNMovies(30)
    // Data fetched at request/build time
    
    if (!movies || movies.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">No movies found</h1>
            <p className="text-gray-400">Please check your API key and connection.</p>
          </div>
        </div>
      )
    }

    const [first, ...rest] = movies
    // First movie is used for hero banner
    
    // Split remaining movies into 3 rows
    const rowSize = Math.ceil(rest.length / 3)
    const row1 = rest.slice(0, rowSize)
    const row2 = rest.slice(rowSize, rowSize * 2)
    const row3 = rest.slice(rowSize * 2)
    
    // Row distribution calculated for three categories

    return (
      <div className="min-h-screen">
        {first && <HeroBanner title={first.Title} posterUrl={first.Poster !== 'N/A' ? first.Poster : null} />}
        <div className="bg-black">
          {row1.length > 0 && <MovieRow categoryTitle="Trending" movies={row1} />}
          {row2.length > 0 && <MovieRow categoryTitle="Space & Sci‑Fi" movies={row2} />}
          {row3.length > 0 && <MovieRow categoryTitle="Romance & Drama" movies={row3} />}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading movies:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-red-500">Error Loading Movies</h1>
          <p className="text-gray-400">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    )
  }
}
