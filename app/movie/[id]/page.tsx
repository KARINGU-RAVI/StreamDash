import { fetchMovieDetail } from '@/lib/movies'
import Image from 'next/image'
import Link from 'next/link'
import MovieActionButtons from '@/components/MovieActionButtons'

export default async function MoviePage({ params }: { params: { id: string } }) {
  const data = await fetchMovieDetail(params.id)

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh]">
        {data.Poster && data.Poster !== 'N/A' ? (
          <Image src={data.Poster} alt={data.Title} fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm mb-4 hover:text-gray-300 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-2xl">{data.Title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-red-600 rounded text-xs sm:text-sm font-semibold">{data.Rated || 'NR'}</span>
            <span className="px-3 py-1 bg-gray-700/80 rounded text-xs sm:text-sm backdrop-blur">{data.Year}</span>
            <span className="px-3 py-1 bg-gray-700/80 rounded text-xs sm:text-sm backdrop-blur">{data.Runtime || 'N/A'}</span>
          </div>
          <MovieActionButtons title={data.Title} />
        </div>
      </div>

      {/* Details Section */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{data.Plot || 'No plot available.'}</p>
            </div>
            
            {data.Genre && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-400">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {data.Genre.split(',').map((g, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-red-900/40 to-pink-900/40 border border-red-700/50 rounded-full text-sm">
                      {g.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {data.Director && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Director</h3>
                <p className="text-base">{data.Director}</p>
              </div>
            )}
            {data.Actors && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Cast</h3>
                <p className="text-base text-gray-300">{data.Actors}</p>
              </div>
            )}
            {data.Ratings && data.Ratings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Ratings</h3>
                <div className="space-y-2">
                  {data.Ratings.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm">{r.Source}: <strong>{r.Value}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
