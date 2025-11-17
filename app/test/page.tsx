import { searchMovies } from '@/lib/omdb'

export default async function TestPage() {
  try {
    const result = await searchMovies('star', 1)
    return (
      <div className="p-8">
        <h1 className="text-2xl mb-4">API Test</h1>
        <pre className="bg-gray-800 p-4 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl mb-4 text-red-500">Error</h1>
        <pre className="bg-gray-800 p-4 rounded overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    )
  }
}
