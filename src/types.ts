export type Site = {
  title: string
  description: string
  href: string
  author: string
  locale: string
  featuredPostCount: number
  postsPerPage: number
}

export type SocialLink = {
  href: string
  label: string
}

export type IconMap = {
  [key: string]: string
}

export type LetterboxdAuthor = {
  name: string
}

export type LetterboxdAttachment = {
  url: string
}

export type LetterboxdItem = {
  id: string
  url: string
  title: string
  content_text: string
  content_html: string
  image?: string
  date_published: string
  authors: LetterboxdAuthor[]
  attachments?: LetterboxdAttachment[]
}

export type LetterboxdFeed = {
  version: string
  title: string
  home_page_url: string
  feed_url: string
  favicon?: string
  language: string
  description: string
  items: LetterboxdItem[]
}

export type WakatimeLanguage = {
  name: string
  percent: number
  color: string
}

export type WakatimeStats = {
  data: WakatimeLanguage[]
}