'use client'

import MovieCard from './MovieCard'
import { useRef } from 'react'

type MovieSummary = { imdbID: string; Title: string; Poster?: string | null }

export default function MovieRow({ movies, categoryTitle }: { movies: MovieSummary[]; categoryTitle: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 group animate-slideIn">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent drop-shadow-lg tracking-tight">{categoryTitle}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-red-500 transition-all duration-300 hover:scale-110 backdrop-blur z-10"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-red-500 transition-all duration-300 hover:scale-110 backdrop-blur z-10"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="relative group/scroll">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600/90 text-white p-3 rounded-full opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm border border-white/20"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory scroll-smooth"
        >
          {movies.length === 0 && <p className="text-gray-400 animate-pulse">No movies available</p>}
          {movies.map((m, index) => (
            <div key={m.imdbID} className="snap-start animate-fadeIn flex-shrink-0" style={{ animationDelay: `${index * 0.05}s` }}>
              <MovieCard imdbId={m.imdbID} title={m.Title} posterUrl={m.Poster || null} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600/90 text-white p-3 rounded-full opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm border border-white/20"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
