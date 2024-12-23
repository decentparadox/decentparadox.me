import type { SVGProps } from 'react'

export function Construction(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="url(#grad1)"
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#94a3b8', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#f1f5f9', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path d="m17.85 19.95l-4.425-4.425l2.1-2.1l4.425 4.425q.425.425.425 1.05t-.425 1.05t-1.05.425t-1.05-.425m-13.8 0q-.425-.425-.425-1.05t.425-1.05L9.9 12l-1.7-1.7q-.275.275-.7.275t-.7-.275l-.575-.575v2.25q0 .35-.3.475t-.55-.125L2.65 9.6q-.25-.25-.125-.55T3 8.75h2.25L4.7 8.2q-.3-.3-.3-.7t.3-.7l2.85-2.85q.5-.5 1.075-.725T9.8 3q.5 0 .938.15t.862.45q.2.125.213.35t-.163.4l-1.9 1.9l.55.55q.275.275.275.7t-.275.7L12 9.9l2.25-2.25q-.1-.275-.162-.575t-.063-.6q0-1.475 1.013-2.488t2.487-1.012q.2 0 .375.013t.35.062q.225.075.288.313t-.113.412L16.8 5.4q-.15.15-.15.35t.15.35l1.1 1.1q.15.15.35.15t.35-.15l1.625-1.625q.175-.175.413-.125t.312.3q.05.175.063.35t.012.375q0 1.475-1.012 2.487t-2.488 1.013q-.3 0-.6-.05t-.575-.175l-10.2 10.2q-.425.425-1.05.425t-1.05-.425"></path>
    </svg>
  )
}
