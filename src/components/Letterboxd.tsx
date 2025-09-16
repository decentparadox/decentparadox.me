import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MovieCard } from './hover-card'
import type { LetterboxdItem } from '@/types'

const Letterboxd = () => {
  const [movies, setMovies] = useState<LetterboxdItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/letterboxd')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Letterboxd data')
        }
        return response.json()
      })
      .then((data) => {
        if (data.items && Array.isArray(data.items)) {
          setMovies(data.items)
        } else {
          throw new Error('Invalid data format')
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching Letterboxd data:', error)
        setError(error.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-serifItalic text-accent">Movies I&apos;ve Watched</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-serifItalic text-accent">Movies I&apos;ve Watched</h2>
        </div>
        <p className="text-muted-foreground">Failed to load movie data. {error}</p>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-serifItalic text-accent">Movies I&apos;ve Watched</h2>
        </div>
        <p className="text-muted-foreground">No movies found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-serifItalic text-accent">Movies I&apos;ve Watched</h2>
        <span className="text-sm text-muted-foreground">({movies.length} films)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => {
          // Extract movie title and year from the title string
          // Format is typically: "Movie Title, Year " or "Movie Title, Year - ★★★★"
          const titleMatch = movie.title.match(/^(.+?),\s*(\d{4})\s*(.*)$/)
          const movieTitle = titleMatch ? titleMatch[1] : movie.title
          const movieYear = titleMatch ? titleMatch[2] : ''
          const movieRating = titleMatch ? titleMatch[3] : ''

          // Get the poster image - prefer the image field, fallback to attachments
          const posterUrl = movie.image || movie.attachments?.[0]?.url || ''

          return (
            <div key={movie.id} className="group">
              <MovieCard
                title={movieTitle}
                year={movieYear}
                rating={movieRating}
                watchedDate={new Date(movie.date_published).toLocaleDateString()}
                link={movie.url}
                poster={posterUrl}
              >
                <div className="relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg">
                  {posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={`Poster for ${movieTitle}`}
                      className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">No poster</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="font-serif text-sm font-medium truncate">{movieTitle}</h3>
                    <p className="text-xs text-white/80">{movieYear}</p>
                    {movieRating && (
                      <p className="text-xs text-yellow-400 mt-1">{movieRating}</p>
                    )}
                  </div>
                </div>
              </MovieCard>

              {/* Review text if available */}
              {movie.content_text && movie.content_text.trim() && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {movie.content_text}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Letterboxd
