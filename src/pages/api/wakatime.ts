import type { APIContext } from 'astro'
import type { WakatimeStats } from '@/types'

export const prerender = false

export async function GET(_context: APIContext) {
  try {
    const apiKey = import.meta.env.WAKATIME_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing WAKATIME_API_KEY on server' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const response = await fetch(
      'https://wakatime.com/api/v1/users/current/stats/all_time',
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
        },
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch WakaTime stats: ${response.status}`)
    }

    const stats = (await response.json()) as {
      data?: {
        languages?: Array<{
          name: string
          percent: number
          total_seconds: number
          color?: string
        }>
      }
    }

    const languages =
      stats.data?.languages
        ?.map(lang => ({
          name: lang.name,
          percent: lang.percent ?? 0,
          color: lang.color ?? '#888888',
        }))
        .sort((a, b) => b.percent - a.percent) ?? []

    const payload: WakatimeStats = { data: languages }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Error fetching Wakatime stats:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch Wakatime data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
