const API_BASE = 'https://www.omdbapi.com/'

type SearchItem = { Title: string; Year: string; imdbID: string; Type: string; Poster: string }
export type SearchResponse = { Search?: SearchItem[]; totalResults?: string; Response: 'True' | 'False'; Error?: string }
export type MovieDetail = {
  Title: string
  Year: string
  Rated?: string
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Actors?: string
  Plot?: string
  Poster?: string
  imdbID: string
  Type: string
  Ratings?: Array<{ Source: string; Value: string }>
}

function apiKey() {
  const key = process.env.OMDB_API_KEY
  if (!key) throw new Error('Missing OMDB_API_KEY')
  return key
}

export async function searchMovies(query: string, page: number = 1, init?: RequestInit): Promise<SearchResponse> {
  const url = `${API_BASE}?s=${encodeURIComponent(query)}&type=movie&page=${page}&apikey=${apiKey()}`
  const res = await fetch(url, { ...init, next: { revalidate: 86400 } })
  const data = await res.json()
  // Replace low-res posters with higher resolution
  if (data.Search) {
    data.Search = data.Search.map((movie: any) => ({
      ...movie,
      Poster: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster.replace('SX300', 'SX700') : movie.Poster
    }))
  }
  return data
}

export async function getMovieById(imdbId: string, init?: RequestInit): Promise<MovieDetail> {
  const url = `${API_BASE}?i=${encodeURIComponent(imdbId)}&plot=full&apikey=${apiKey()}`
  const res = await fetch(url, { ...init, next: { revalidate: 86400 } })
  const data = await res.json()
  // Replace low-res poster with higher resolution
  if (data.Poster && data.Poster !== 'N/A') {
    data.Poster = data.Poster.replace('SX300', 'SX700')
  }
  return data
}
