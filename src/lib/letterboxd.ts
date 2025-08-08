import Parser from 'rss-parser'
import { neon } from '@neondatabase/serverless'

export type Movie = {
  title: string
  year: string
  rating: string
  watchedDate: string
  link: string
  poster: string
}

const FEED_URL = 'https://letterboxd.com/decentparadox/rss'

let lastFetchMs = 0
let initialized = false
let intervalHandle: NodeJS.Timeout | null = null
let inflight: Promise<void> | null = null

const parser = new Parser<any>({
  customFields: {
    item: [
      ['letterboxd:filmTitle', 'title'],
      ['letterboxd:filmYear', 'year'],
      ['letterboxd:memberRating', 'rating'],
      ['letterboxd:watchedDate', 'watchedDate'],
      ['link', 'link'],
      ['description', 'description'],
    ],
  },
})

function normalizeItemToMovie(item: any): Movie {
  return {
    title: (item.title || '').split(' - ')[0] || '',
    year: item.year || 'Unknown',
    rating: item.rating || 'N/A',
    watchedDate: item.watchedDate || 'Unknown',
    link: item.link || '',
    poster: item.description?.match(/src="([^"]+)"/)?.[1] || '',
  }
}

const sql = neon(import.meta.env.NEON_DATABASE_URL)

async function ensureTableExists(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS "Letterboxd" (
      "key" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "year" TEXT NOT NULL,
      "rating" TEXT NOT NULL,
      "watchedDate" TEXT NOT NULL,
      "link" TEXT,
      "poster" TEXT,
      "createdAt" BIGINT NOT NULL
    );
  `
}

function makeKey(m: Movie): string {
  return m.link || `${m.title}-${m.watchedDate}`
}

async function persistMovies(movies: Movie[]): Promise<void> {
  await ensureTableExists()
  const now = Date.now()
  for (const m of movies) {
    const key = makeKey(m)
    await sql`
      INSERT INTO "Letterboxd" ("key","title","year","rating","watchedDate","link","poster","createdAt")
      VALUES (${key}, ${m.title}, ${m.year}, ${m.rating}, ${m.watchedDate}, ${m.link || null}, ${m.poster || null}, ${now})
      ON CONFLICT ("key") DO NOTHING;
    `
  }
}

async function getMoviesFromDb(limit: number = 50): Promise<Movie[]> {
  await ensureTableExists()
  const rows = (await sql`
    SELECT "title","year","rating","watchedDate","link","poster"
    FROM "Letterboxd"
    ORDER BY "createdAt" DESC
    LIMIT ${limit}
  `) as unknown as Array<{
    title: string
    year: string
    rating: string
    watchedDate: string
    link: string | null
    poster: string | null
  }>
  return rows.map((r) => ({
    title: r.title,
    year: r.year,
    rating: r.rating,
    watchedDate: r.watchedDate,
    link: r.link || '',
    poster: r.poster || '',
  }))
}

async function fetchFromFeed(): Promise<Movie[]> {
  const feed = await parser.parseURL(FEED_URL)
  const items = Array.isArray(feed.items) ? feed.items : []
  return items.map(normalizeItemToMovie)
}

export async function ensureInitialized(): Promise<void> {
  if (initialized) return
  initialized = true
  await ensureTableExists()
  lastFetchMs = 0
  // kick off background sync every ~60 seconds
  intervalHandle = setInterval(() => {
    void syncIfStale()
  }, 60_000)
}

export async function syncIfStale(maxAgeMs: number = 60_000): Promise<void> {
  const now = Date.now()
  if (inflight) return inflight
  if (now - lastFetchMs < maxAgeMs) return
  inflight = (async () => {
    try {
      const latest = await fetchFromFeed()
      await persistMovies(latest)
      lastFetchMs = now
    } catch {
      // swallow errors; keep existing cache
    } finally {
      inflight = null
    }
  })()
  return inflight
}

export async function getMovies(): Promise<Movie[]> {
  await ensureInitialized()
  await syncIfStale()
  return getMoviesFromDb()
}

export function stopInterval(): void {
  if (intervalHandle) {
    clearInterval(intervalHandle)
    intervalHandle = null
  }
}


