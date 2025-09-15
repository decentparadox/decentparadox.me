import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MoveUpRight } from 'lucide-react'
import { MusicCard, MovieCard } from './hover-card'
interface Track {
  name: string
  artist: { '#text': string }
  album: { '#text': string }
  image: { '#text': string }[]
  url: string
  '@attr'?: { nowplaying: string }
}

type Movie = {
  title: string
  year: string
  rating: string
  watchedDate: string
  link: string
  poster: string
}

const SpotifyPresence = () => {
  const [displayData, setDisplayData] = useState<Track | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [movieData, setMovieData] = useState<Movie | null>(null)
  const [isMovieLoading, setIsMovieLoading] = useState(true)
  useEffect(() => {
    fetch(
      'https://lastfm-last-played.biancarosa.com.br/decentparadox/latest-song',
    )
      .then((response) => response.json())
      .then((data) => {
        setDisplayData(data.track)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching latest song:', error)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fletterboxd.com%2Fdecentparadox%2Frss')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok' && data.items.length > 0) {
          const latestItem = data.items[0];
          const titleMatch = latestItem.title.match(/^(.+?), (\d{4}) - (.+)$/);
          
          if (titleMatch) {
            const movieData = {
              title: titleMatch[1],
              year: titleMatch[2],
              rating: titleMatch[3],
              watchedDate: latestItem.pubDate,
              link: latestItem.link,
              poster: latestItem.thumbnail || ''
            };
            setMovieData(movieData);
          }
        }
        setIsMovieLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching latest Movie:', error)
        setIsMovieLoading(false)
      })
  }, [])

  if (isLoading || isMovieLoading) {
    return (
      <div className="flex flex-wrap items-center gap-x-1">
        
        
        Listening to{' '}
        <Skeleton className="inline-flex h-4 w-24" /> by {' '}
        <Skeleton className="inline-flex h-4 w-12" /> and I recently watched{' '}
        <Skeleton className="inline-flex h-4 w-24" />
      </div>
    )
  }

  if (!displayData || !movieData) return <p>Something absolutely horrible has gone wrong</p>

  const { name: song, artist, album, image, url } = displayData
  const { title: movie, year, rating, watchedDate, link, poster } = movieData
  const track = {
    name: song,
    artist: artist['#text'],
    album: album['#text'],
    image: image[3]['#text'],
    url: url,
  };
  console.log(track)
  return (
<div className="flex flex-1 flex-col gap-4">
      <span>
        {displayData['@attr']?.nowplaying === 'true'
          ? 'Listening to '
          : 'Last played '}
        
          <MusicCard {...track}>
          <span className="font-serifItalic text-accent">
          {song} {' '}
          </span>
          </MusicCard>
         by {' '}
        {artist['#text']} and I recently watched{' '}
        <MovieCard {...movieData}>
          <span className="font-serifItalic text-accent">{movie}</span>
        </MovieCard>
      </span>
    </div>
  )
}

export default SpotifyPresence
