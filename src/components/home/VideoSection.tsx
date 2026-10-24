"use client";

import { useState } from "react";
import Link from "next/link";
import { brand, videos, youtubeConfig } from "@/lib/config";
import { VideoCard } from "@/components/ui/VideoCard";
import { VideoModal } from "@/components/ui/VideoModal";
import { IconYouTube } from "@/components/icons";

export function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Show top 6 videos on home page
  const homeVideos = videos.slice(0, 6);

  return (
    <section className="section bg-sky-soft" id="videos">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 items-center gap-1.5 rounded-full bg-red-600/10 px-2.5 text-xs font-bold text-red-600">
                <IconYouTube size={14} /> Video Tours
              </span>
              <p className="eyebrow mb-0">Official YouTube Channel</p>
            </div>
            <h2 className="mt-2 text-3xl font-bold text-navy">
              Property Walkthroughs &amp; Locality Guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Watch authentic video tours of budget flats, luxury villas, and prime investment plots across Boisar and Palghar from our channel ({youtubeConfig.channelName}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/videos" className="btn btn-primary text-black">
              View All {videos.length} Videos
            </Link>
            <a
              href={youtubeConfig.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2"
            >
              <IconYouTube size={18} /> Open YouTube Playlist
            </a>
          </div>
        </div>

        {/* Featured Video Highlight Banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-navy via-navy/90 to-primary/80 p-6 sm:p-8 text-white shadow-card">
          <div className="grid gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold tracking-wide uppercase text-white shadow">
                <IconYouTube size={14} /> Featured Playlist
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Boisar &amp; Palghar Property Showcase Series
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Explore real site walkthroughs, township layouts, bullet train corridor insights, and verified properties with zero brokerage promotion.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedVideo(videos[0].id)}
                  className="btn bg-white text-navy font-bold hover:bg-white/90 shadow"
                >
                  ▶ Watch Latest ({videos[0].location})
                </button>
                <a
                  href={youtubeConfig.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                >
                  Watch Full Playlist on YouTube ↗
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                onClick={() => setSelectedVideo(videos[0].id)}
                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 border-white/20 shadow-2xl transition hover:scale-[1.02]"
              >
                <img
                  src={`https://img.youtube.com/vi/${videos[0].id}/hqdefault.jpg`}
                  alt={videos[0].title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 flex items-center justify-center transition">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition group-hover:scale-110">
                    <span className="text-xl ml-0.5">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 rounded bg-black/70 backdrop-blur-sm p-2 text-xs text-white truncate font-medium">
                  {videos[0].title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {homeVideos.map((video) => (
            <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
          ))}
        </div>

        {/* Bottom CTA to View All */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
          <div>
            <h4 className="font-bold text-navy">Looking for more property tours &amp; area overviews?</h4>
            <p className="text-sm text-muted">
              We have {videos.length} detailed video walkthroughs covering Boisar, Palghar, and Tarapur.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/videos" className="btn btn-navy shrink-0">
              Explore All Videos
            </Link>
            <a
              href={youtubeConfig.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 shrink-0 border-0 shadow-md shadow-red-600/20"
            >
              <IconYouTube size={16} /> YouTube Playlist ↗
            </a>
          </div>
        </div>

        <VideoModal open={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoId={selectedVideo} />
      </div>
    </section>
  );
}
