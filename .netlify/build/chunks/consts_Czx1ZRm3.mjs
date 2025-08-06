import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatDate(date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
function calculateWordCountFromHtml(html) {
  if (!html) return 0;
  const textOnly = html.replace(/<[^>]+>/g, "");
  return textOnly.split(/\s+/).filter(Boolean).length;
}
function readingTime(wordCount) {
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));
  return `${readingTimeMinutes} min read`;
}
function getHeadingMargin(depth) {
  const margins = {
    3: "ml-4",
    4: "ml-8",
    5: "ml-12",
    6: "ml-16"
  };
  return margins[depth] || "";
}

const SITE = {
  TITLE: "DecentParadox | Sasank Reddy | Portfolio",
  DESCRIPTION: "Freelance web development and cybersecurity shenanigans",
  EMAIL: "hello@decentparadox.me",
  NUM_POSTS_ON_HOMEPAGE: 2,
  POSTS_PER_PAGE: 3,
  SITEURL: "https://decentparadox.me"
};
const NAV_LINKS = [
  { href: "/blog", label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/guestbook", label: "guestbook" }
];

export { NAV_LINKS as N, SITE as S, calculateWordCountFromHtml as a, cn as c, formatDate as f, getHeadingMargin as g, readingTime as r };
