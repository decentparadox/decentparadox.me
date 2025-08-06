"use client";
import { SpotifyLogo, VideoIcon } from "@phosphor-icons/react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";


export const MovieCard = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  title: string
  year: string
  rating: string
  watchedDate: string
  link: string
  poster: string
}) => {
  const { title, year, rating, watchedDate, link, poster } = props;
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <MovieContentData src={poster} title={title} year={year} />
        <div className="flex gap-x-0.5 items-center bg-accent text-background">
          <a
            href={link}
            target="_blank"
            className="flex items-center gap-x-1 text-sm bg-gray-12 justify-center w-full text-gray-5 py-1 rounded-sm font-medium hover:bg-gray-11 transition-colors duration-100 whitespace-nowrap"
          >
            <VideoIcon className="shrink-0" aria-hidden={true} />
            See on Letterboxd
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const MusicCard = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  name: string;
  artist:  string;
  album: string;
  image: string;
  url: string;
}) => {
  const { name, artist, album, image, url } = props;

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardContentData src={image} title={name} author={artist} />
        <div className="flex gap-x-0.5 items-center bg-accent text-background">

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 text-sm bg-gray-12 justify-center w-full text-gray-5 py-1 rounded-sm font-medium hover:bg-gray-11 transition-colors duration-100 whitespace-nowrap"
          >
            <SpotifyLogo className="shrink-0" aria-hidden={true} />
            Listen on Spotify
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const HoverCardTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <HoverCardPrimitive.Trigger asChild>{children}</HoverCardPrimitive.Trigger>
  );
};

const HoverCardContentData = ({
  src,
  title,
  author,
}: {
  src: string;
  title: string;
  author: string;
}) => {
  return (
    <>
      <div className="aspect-square border rounded-[3px] overflow-hidden relative">
        <img
          src={src}
          className="object-cover w-full h-full grayscale"
          alt={`Album art for ${title} by ${author}`}
          width={128}
          height={128}
        />
      </div>
      <div className="text-gray-1 mt-2 mb-1">
        <span className="font-serif text-accent leading-none block truncate">{title}</span>
        <span className="text-sm font-sans text-gray-10">by {author}</span>
      </div>
    </>
  );
};


const MovieContentData = ({
    src,
    title,
    year,
  }: {
    src: string;
    title: string;
    year: string;
  }) => {
    return (
      <>
        <div className="border rounded-[3px] overflow-hidden relative w-full">
          <img
            src={src}
            className="object-cover w-full h-auto grayscale"
            alt={`Album art for ${title} - ${year}`}
            width={128}
          />
        </div>
        <div className="text-gray-1 mt-2 mb-1">
          <span className="font-serif text-accent leading-none block truncate">{title}</span>
          <span className="text-sm font-sans text-gray-10">{year}</span>
        </div>
      </>
    );
  };

const HoverCardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className="w-40 h-fit text-foreground bg-background shadow-xs text-gray-12 rounded-[4px] pt-1 pb-1.5 px-1 border border-gray-12 outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        sideOffset={5}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};

const HoverCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <HoverCardPrimitive.Root openDelay={200}>
      {children}
    </HoverCardPrimitive.Root>
  );
};