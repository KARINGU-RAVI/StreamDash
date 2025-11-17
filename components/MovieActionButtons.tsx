'use client'

interface Props { title: string }

export default function MovieActionButtons({ title }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={() => alert(`Playing: ${title}`)}
        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Play
      </button>
      <button
        onClick={() => alert(`Added \"${title}\" to your list!`)}
        className="flex items-center gap-2 bg-gray-600/70 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-300 hover:scale-105 backdrop-blur hover:shadow-lg active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        My List
      </button>
    </div>
  )
}
