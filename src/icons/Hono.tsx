import type { SVGProps } from 'react'

export function Hono(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12.445.002a45.5 45.5 0 0 0-5.252 8.146a9 9 0 0 1-.555-.53a28 28 0 0 0-1.205-1.542a8.8 8.8 0 0 0-1.251 2.12a20.7 20.7 0 0 0-1.448 5.88a8.9 8.9 0 0 0 .338 3.468q1.968 5.22 7.445 6.337q4.583.657 8.097-2.312q4.015-3.885 2.047-9.132a33.3 33.3 0 0 0-2.988-5.59A91 91 0 0 0 12.615.053a.22.22 0 0 0-.17-.051m-.336 3.906a51 51 0 0 1 4.794 6.552q.672 1.15 1.108 2.41q.91 3.579-1.951 5.904q-2.768 1.947-6.072 1.156q-3.564-1.105-4.121-4.794a5.1 5.1 0 0 1 .242-2.266q.536-1.361 1.3-2.601l1.446-2.121a397 397 0 0 0 3.254-4.24"
      ></path>
    </svg>
  )
}
