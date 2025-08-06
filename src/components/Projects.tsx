import React from 'react'
import { useState } from 'react'

type ProjectProp = {
  name: string
  imageSrc: string
  link: string
  desc: string
  year: string
}
function ProjectItem({ name, imageSrc, link, desc, year }: ProjectProp) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={`/projects/${link}`}>
        <div className="flex h-28 w-full justify-between border-t-2  pt-2 font-sans">
          <div className="relative flex flex-[4] overflow-hidden md:w-[300px]">
            <div
              className={`absolute left-0 top-0 mr-4 h-full w-32 overflow-hidden transition-all duration-300 ease-in-out ${
                isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <img
                src={`/static/images/${imageSrc}`}
                alt={`${name}`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isHovered ? 'ml-32' : 'ml-0'
              }`}
            >
              <h2 className="pl-2 font-geist text-lg text-accent">{name}</h2>
            </div>
          </div>
          <div className="hidden flex-[2] md:block">
            <p className="text-sm text-muted-foreground">{desc}</p>
            <p className="text-sm text-muted-foreground">/{year}</p>
          </div>
          <div className="flex-[0.5] text-right">
            <p className="text-xl opacity-50 group-hover:opacity-100">
              &#8599;
            </p>
          </div>
        </div>
      </a>
    </div>
  )
}
const Home = () => {
  return (
    <div className="w-full relative  overflow-x-hidden font-sans">
      <div className="w-full my-16">
        <div className="flex items-center justify-between pb-4 font-geist opacity-75">
          <h2 className="text-accent font-serif">(Projects)</h2>
          <a href="/projects" className="text-right text-accent font-serif">
            (See all projects)
          </a>
        </div>
        <div className="w-full ml-auto flex flex-col gap-2">
          <ProjectItem
            name="bi0sMeetups"
            imageSrc="bi0s.png"
            link="bi0smeetups"
            desc="Meetups website for India's #1 CTF"
            year="2024"
          />
          <ProjectItem
            name="Kalser"
            imageSrc="kalser.png"
            link="kalser"
            desc="TUI tool to rice your Linux"
            year="2023"
          />
          <ProjectItem
            name="PiratedPixels"
            imageSrc="piratedPixels.png"
            link="piratedpixels"
            desc="CTF platform on TUI"
            year="2024"
          />
          <ProjectItem
            name="Orca"
            imageSrc="orca.png"
            link="orca"
            desc="Astro integration for Graphic Designers"
            year="2024"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
