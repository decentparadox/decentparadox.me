export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'DecentParadox | Sasank Reddy | Portfolio',
  DESCRIPTION: 'Freelance web development and cybersecurity shenanigans',
  EMAIL: 'hello@decentparadox.me',
  NUM_POSTS_ON_HOMEPAGE: 2,
  POSTS_PER_PAGE: 3,
  SITEURL: 'https://decentparadox.me',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
  { href: '/guestbook', label: 'guestbook' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/decentparadox', label: 'GitHub' },
  { href: 'https://twitter.com/0xdecentparadox', label: 'Twitter' },
  { href: 'hello@decentparadox.me', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
