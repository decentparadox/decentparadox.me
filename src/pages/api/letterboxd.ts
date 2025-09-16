import type { APIContext } from 'astro'
import Parser from 'rss-parser'
import type { LetterboxdFeed } from '@/types'

const parser = new Parser()

export async function GET(context: APIContext) {
  try {
    // The RSS feed URL provided by the user
    const feedUrl = 'https://rss.app/feeds/v1.1/uOwMNHukX4u66NrF.json'

    // Fetch and parse the RSS feed
    const feed = await parser.parseURL(feedUrl) as LetterboxdFeed

    // Return the feed data as JSON
    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error fetching Letterboxd feed:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch Letterboxd data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
