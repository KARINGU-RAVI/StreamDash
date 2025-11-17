'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-red-600 font-bold text-2xl sm:text-3xl tracking-tight hover:text-red-500 transition">
            STREAMDASH
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-all duration-200 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all after:duration-300">Home</Link>
            <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-all duration-200 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all after:duration-300">TV Shows</Link>
            <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-all duration-200 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all after:duration-300">Movies</Link>
            <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-all duration-200 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all after:duration-300">New & Popular</Link>
            <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-all duration-200 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all after:duration-300">My List</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="hidden sm:flex items-center gap-2 hover:text-gray-300 transition"
            onClick={() => alert('Search feature coming soon!')}
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="hidden sm:block hover:text-gray-300 transition" aria-label="Notifications">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button 
            className="md:hidden p-1 hover:text-gray-300 transition"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden bg-black/95 border-t border-white/10 animate-fadeIn backdrop-blur-lg">
          <nav className="flex flex-col px-4 py-3 space-y-2">
            <Link href="/" onClick={() => setShowMenu(false)} className="py-2 text-sm font-medium hover:text-red-500 transition-all duration-200 hover:translate-x-2 border-l-2 border-transparent hover:border-red-500 pl-2">Home</Link>
            <Link href="/" onClick={() => setShowMenu(false)} className="py-2 text-sm font-medium hover:text-red-500 transition-all duration-200 hover:translate-x-2 border-l-2 border-transparent hover:border-red-500 pl-2">TV Shows</Link>
            <Link href="/" onClick={() => setShowMenu(false)} className="py-2 text-sm font-medium hover:text-red-500 transition-all duration-200 hover:translate-x-2 border-l-2 border-transparent hover:border-red-500 pl-2">Movies</Link>
            <Link href="/" onClick={() => setShowMenu(false)} className="py-2 text-sm font-medium hover:text-red-500 transition-all duration-200 hover:translate-x-2 border-l-2 border-transparent hover:border-red-500 pl-2">New & Popular</Link>
            <Link href="/" onClick={() => setShowMenu(false)} className="py-2 text-sm font-medium hover:text-red-500 transition-all duration-200 hover:translate-x-2 border-l-2 border-transparent hover:border-red-500 pl-2">My List</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
