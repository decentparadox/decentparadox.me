import { useState } from 'react'

type ProjectProp = {
  name: string
  imageSrc: string
  darkImageSrc?: string
  link: string
  desc: string
  year: string
  borderBottom?: boolean
}
function ProjectItem({ name, imageSrc, darkImageSrc, link, desc, year, borderBottom }: ProjectProp) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="group">
      <a
        href={`/projects/${link}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex h-28 w-full justify-between border-t-2 ${borderBottom ? 'md:border-b-2' : ''} pt-2 font-sans`}>
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
                className={`h-full w-full object-cover ${darkImageSrc ? 'block dark:hidden' : ''}`}
              />
              {darkImageSrc && (
                <img
                  src={`/static/images/${darkImageSrc}`}
                  alt={`${name}`}
                  width={64}
                  height={64}
                  className="hidden dark:block h-full w-full object-cover"
                />
              )}
            </div>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isHovered ? 'ml-32 opacity-0' : 'ml-0 opacity-100'
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
const Home = ({ showDeco = false }: { showDeco?: boolean }) => {
  return (
    <div className="w-full relative  overflow-x-hidden font-sans">
      <div className="w-full my-16">
        <div className="flex items-start gap-20">
          {showDeco && (
            <div className="hidden md:flex w-[146px] shrink-0 self-stretch opacity-45">
              <img
                src="/static/images/project-deco-light.svg"
                alt=""
                aria-hidden="true"
                className="dark:hidden w-full h-full object-contain object-top"
              />
              <img
                src="/static/images/project-deco-dark.svg"
                alt=""
                aria-hidden="true"
                className="hidden dark:block w-full h-full object-contain object-top"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-4 font-geist opacity-75">
              <h2 className="text-accent font-serif">(Projects)</h2>
              <a href="/projects" className="text-right text-accent font-serif">
                (See all projects)
              </a>
            </div>
            <div className="flex flex-col gap-2">
          <ProjectItem
            name="bi0sMeetups"
            imageSrc="bi0s-light.svg"
            darkImageSrc="bi0s-dark.svg"
            link="bi0smeetups"
            desc="Meetups website for India's #1 CTF"
            year="2024"
          />
          <ProjectItem
            name="Tethra"
            imageSrc="tethra-hover-light.svg"
            darkImageSrc="tethra-hover-dark.svg"
            link="tethra"
            desc="Desktop application to chat with multiple AI models"
            year="2025"
          />
<ProjectItem
            name="Cue"
            imageSrc="cue-light.svg"
            darkImageSrc="cue-dark.svg"
            link="cue"
            desc="Native iOS AI assistant with persistent memory"
            year="2025"
            borderBottom
          />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
