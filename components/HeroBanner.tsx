'use client'

import Image from 'next/image'

type Props = { title: string; posterUrl?: string | null }

export default function HeroBanner({ title, posterUrl }: Props) {
  return (
    <section className="relative h-[50vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden group">
      {posterUrl ? (
        <Image src={posterUrl} alt={title} fill priority className="object-cover transition-transform duration-[10s] ease-out group-hover:scale-110" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-black flex items-center justify-center animate-gradient">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 animate-shimmer">{title}</h1>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12 space-y-3 sm:space-y-4 animate-slideUp">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold drop-shadow-2xl max-w-2xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent animate-fadeIn">{title}</h1>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button 
            onClick={() => alert('Play functionality would start video playback')}
            className="flex items-center gap-2 bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/50 animate-fadeIn active:scale-95"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span className="text-sm sm:text-base">Play</span>
          </button>
          <button 
            onClick={() => alert('More Info: This would show detailed information about the movie')}
            className="flex items-center gap-2 bg-gray-600/70 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-300 hover:scale-105 backdrop-blur hover:shadow-lg hover:shadow-gray-500/50 animate-fadeIn active:scale-95" style={{ animationDelay: '0.1s' }}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm sm:text-base">More Info</span>
          </button>
        </div>
      </div>
    </section>
  )
}
