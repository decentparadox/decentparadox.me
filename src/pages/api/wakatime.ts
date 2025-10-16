import type { APIContext } from 'astro'
import type { WakatimeStats } from '@/types'

export const prerender = false

export async function GET(context: APIContext) {
  try {
    // The Wakatime stats URL provided by the user
    const statsUrl = 'https://wakatime.com/share/@decentparadox/59d98eab-ad0d-4f50-9d5f-66870f61da76.json'

    // Fetch the Wakatime stats
    const response = await fetch(statsUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch Wakatime stats: ${response.status}`)
    }

    const stats: WakatimeStats = await response.json()

    // Return the stats data as JSON
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
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
