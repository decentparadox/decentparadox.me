import type { APIRoute } from 'astro'
import { ensureInitialized, getMovies } from '@/lib/letterboxd'

export const GET: APIRoute = async () => {
  await ensureInitialized()
  const movies = await getMovies()
  return new Response(JSON.stringify(movies), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}


