import type { APIRoute } from 'astro'
import Parser from 'rss-parser'

type Movie = {
  title: string
  year: string
  rating: string
  watchedDate: string
  link: string
  poster: string
}

export const GET: APIRoute = async ({ params, request }) => {
  const parser = new Parser({
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

  const feed = await parser.parseURL('https://letterboxd.com/decentparadox/rss')
  const movies: Movie[] = feed.items.map((item) => ({
    title: item.title.split(" - ")[0], // Extract only movie title
    year: item.year || "Unknown",
    rating: item.rating || "N/A",
    watchedDate: item.watchedDate || "Unknown",
    link: item.link,
    poster: item.description.match(/src="([^"]+)"/)?.[1] || "", // Extract poster URL
  }));

  return new Response(JSON.stringify(movies))
}


