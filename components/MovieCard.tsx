'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type Props = { imdbId: string; title: string; posterUrl?: string | null }

export default function MovieCard({ imdbId, title, posterUrl }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex-shrink-0">
      <Link 
        href={`/movie/${imdbId}`} 
        className="block w-40 sm:w-48 lg:w-56 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 shadow-xl transition-all duration-500 ease-out transform-gpu group-hover:scale-105 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-red-900/40 group-hover:ring-2 group-hover:ring-red-500/60 will-change-transform\" style={{ transformStyle: 'preserve-3d' }}>
        {posterUrl && posterUrl !== 'N/A' ? (
          <>
            <Image src={posterUrl} alt={title} fill sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-3 animate-fadeIn">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold line-clamp-2">{title}</p>
                  <div className="flex gap-1">
                    <button className="p-1.5 bg-white rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/50 animate-fadeIn" aria-label="Play">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button className="p-1.5 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-600 hover:border-red-500 animate-fadeIn" style={{ animationDelay: '0.1s' }} aria-label="Add to list">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-3 text-center bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 animate-gradient">
            <p className="text-xs sm:text-sm font-medium text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 animate-shimmer">{title}</p>
          </div>
        )}
        </div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 line-clamp-2 px-1">{title}</h3>
      </Link>
    </div>
  )
}
