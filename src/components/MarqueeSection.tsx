import Marquee from '@/components/ui/marquee'

// Star icon component based on the design
export const StarIcon = () => (
  <svg
    width="77"
    height="24"
    viewBox="0 0 77 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex items-center"
  >
    <path
      d="M12.5024 0L13.0038 3.71294C13.5028 7.41177 15.5226 10.2296 18.0295 10.7294L24.5 12L18.0295 13.2706C15.5226 13.7647 13.5028 16.5826 13.0038 20.2814L12.5024 24L12.001 20.2871C11.502 16.5882 9.48455 13.7704 6.97762 13.2706L0.5 12L6.97762 10.7294C9.48455 10.2353 11.4925 7.41741 12.001 3.71859L12.5024 0Z"
      className="fill-accent"
    />
    <path
      d="M38.5024 0L39.0038 3.71294C39.5028 7.41177 41.5226 10.2296 44.0295 10.7294L50.5 12L44.0295 13.2706C41.5226 13.7647 39.5028 16.5826 39.0038 20.2814L38.5024 24L38.001 20.2871C37.502 16.5882 35.4846 13.7704 32.9776 13.2706L26.5 12L32.9776 10.7294C35.4846 10.2353 37.4925 7.41741 38.001 3.71859L38.5024 0Z"
      className="fill-accent"
    />
    <path
      d="M64.5024 0L65.0038 3.71294C65.5028 7.41177 67.5226 10.2296 70.0295 10.7294L76.5 12L70.0295 13.2706C67.5226 13.7647 65.5028 16.5826 65.0038 20.2814L64.5024 24L64.001 20.2871C63.502 16.5882 61.4846 13.7704 58.9776 13.2706L52.5 12L58.9776 10.7294C61.4846 10.2353 63.4925 7.41741 64.001 3.71859L64.5024 0Z"
      className="fill-accent"
    />
  </svg>
)

// Wide star icon component for the second separator
export const WideStarIcon = () => (
  <svg
    width="195"
    height="24"
    viewBox="0 0 195 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex items-center"
  >
    <path
      d="M12.5024 0L13.0038 3.71294C13.5028 7.41177 15.5226 10.2296 18.0295 10.7294L24.5 12L18.0295 13.2706C15.5226 13.7647 13.5028 16.5826 13.0038 20.2814L12.5024 24L12.001 20.2871C11.502 16.5882 9.48455 13.7704 6.97762 13.2706L0.5 12L6.97762 10.7294C9.48455 10.2353 11.4925 7.41741 12.001 3.71859L12.5024 0Z"
      className="fill-accent"
    />
    <path
      d="M97.5024 0L98.0038 3.71294C98.5028 7.41177 100.523 10.2296 103.03 10.7294L109.5 12L103.03 13.2706C100.523 13.7647 98.5028 16.5826 98.0038 20.2814L97.5024 24L97.001 20.2871C96.502 16.5882 94.4846 13.7704 91.9776 13.2706L85.5 12L91.9776 10.7294C94.4846 10.2353 96.4925 7.41741 97.001 3.71859L97.5024 0Z"
      className="fill-accent"
    />
    <path
      d="M182.502 0L183.004 3.71294C183.503 7.41177 185.523 10.2296 188.03 10.7294L194.5 12L188.03 13.2706C185.523 13.7647 183.503 16.5826 183.004 20.2814L182.502 24L182.001 20.2871C181.502 16.5882 179.485 13.7704 176.978 13.2706L170.5 12L176.978 10.7294C179.485 10.2353 181.492 7.41741 182.001 3.71859L182.502 0Z"
      className="fill-accent"
    />
  </svg>
)

const MarqueeSection = () => {
  return (
    <div className="[--duration:30s] [--gap:170px]">
      <div className="flex h-6 items-center justify-between gap-auto">
        <StarIcon />
        <div className="font-sans md:text-base text-[10px] font-normal leading-normal text-foreground px-2">
          Folio 2k25
        </div>
        <WideStarIcon />
        <div className="font-sans md:text-base text-[10px] font-normal leading-normal text-foreground px-2">
          Design — Code — Build
        </div>
        <StarIcon />
      </div>
    </div>
  )
}

export default MarqueeSection
