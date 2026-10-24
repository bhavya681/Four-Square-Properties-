"use client";

import { useState } from "react";
import Image from "next/image";
import { IconPlay, IconYouTube } from "@/components/icons";
import type { Video } from "@/lib/config";

type Props = {
  video: Video;
  onSelect?: (videoId: string) => void;
};

export function VideoCard({ video, onSelect }: Props) {
  const [thumbSrc, setThumbSrc] = useState(
    `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
  );
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}&list=PLGXRINPc0_oR7W5W_SOOPNlh5wR31uSQa`;

  return (
    <article className="card group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      <div className="relative aspect-video bg-navy/10 overflow-hidden cursor-pointer" onClick={() => onSelect?.(video.id)}>
        <Image
          src={thumbSrc}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          onError={() => setThumbSrc(`https://img.youtube.com/vi/${video.id}/default.jpg`)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-500">
            <IconPlay size={24} className="ml-1" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="flex items-center gap-1.5 rounded-full bg-red-600/95 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-md">
            <IconYouTube size={14} /> YouTube
          </span>
          {video.location && (
            <span className="rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-navy shadow">
              {video.location}
            </span>
          )}
        </div>

        <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> Click to watch
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3
            onClick={() => onSelect?.(video.id)}
            className="font-bold text-navy leading-snug line-clamp-2 hover:text-primary cursor-pointer transition-colors"
          >
            {video.title}
          </h3>
          {video.description && (
            <p className="mt-2 text-xs text-muted line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs font-semibold">
          <button
            onClick={() => onSelect?.(video.id)}
            className="text-navy hover:text-primary inline-flex items-center gap-1 transition-colors"
          >
            Watch Video <span aria-hidden>▸</span>
          </button>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:underline"
          >
            Open on YouTube <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
