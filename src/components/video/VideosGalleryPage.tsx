"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { brand, contact, videos, youtubeConfig } from "@/lib/config";
import { VideoCard } from "@/components/ui/VideoCard";
import { VideoModal } from "@/components/ui/VideoModal";
import { IconYouTube, IconPhone, IconWhatsApp } from "@/components/icons";
import { generalEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";

export function VideosGalleryPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"All" | "Boisar" | "Palghar">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesFilter =
        activeFilter === "All" ? true : v.location === activeFilter;
      const matchesSearch =
        searchQuery.trim() === ""
          ? true
          : v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="bg-bg min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-navy to-[#0c273e] text-white py-14 lg:py-20">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-500/30 px-3.5 py-1 text-xs font-semibold text-red-400">
              <IconYouTube size={16} /> Official YouTube Video Showcase
            </div>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl tracking-tight text-white leading-tight">
              Property Walkthroughs &amp; Real Estate Guides
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Experience transparent virtual visits, locality guides, amenities reviews, and pricing breakdowns directly from our official channel ({youtubeConfig.channelName}).
            </p>

            {/* Direct Channel and Playlist Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={youtubeConfig.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <IconYouTube size={18} /> Open YouTube Playlist ({videos.length} Videos) ↗
              </a>
              <a
                href={youtubeConfig.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur flex items-center gap-2"
              >
                Subscribe to Channel ↗
              </a>
              <a
                href={whatsappUrl("Hello Four Square Properties, I saw your video tours and want enquiry about properties in Boisar/Palghar")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold flex items-center gap-2"
              >
                <IconWhatsApp size={18} /> Inquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section py-10 sm:py-14">
        <div className="container-site">
          {/* Controls Bar: Search & Location Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-line pb-6">
            {/* Location Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider mr-1">
                Filter by Location:
              </span>
              {(["All", "Boisar", "Palghar"] as const).map((filter) => {
                const count =
                  filter === "All"
                    ? videos.length
                    : videos.filter((v) => v.location === filter).length;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      activeFilter === filter
                        ? "bg-navy text-white shadow-sm"
                        : "bg-white border border-line text-navy hover:border-primary hover:text-primary"
                    }`}
                  >
                    {filter} <span className="opacity-70 text-[11px] font-normal">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by keywords (e.g. 1 BHK, Villa, Beach)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-navy"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results Header */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-muted">
              Showing <span className="font-bold text-navy">{filteredVideos.length}</span> videos
              {activeFilter !== "All" && ` in ${activeFilter}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            <span className="text-xs text-muted hidden sm:inline">
              Click any video card to stream directly with player
            </span>
          </div>

          {/* Videos Grid */}
          {filteredVideos.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-line bg-white p-12 text-center">
              <h3 className="text-lg font-bold text-navy">No matching videos found</h3>
              <p className="mt-2 text-sm text-muted">
                Try searching for different terms or reset your filters.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="btn btn-navy mt-4 text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Callout Banner */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-white shadow-card">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-white/80">
                  Direct Channel Access
                </span>
                <h3 className="mt-1 text-2xl font-bold">Want to see all upcoming property videos?</h3>
                <p className="mt-2 text-sm text-white/90 max-w-xl">
                  Subscribe to our YouTube playlist to stay updated whenever a new budget flat, commercial shop, or bungalow listing is published.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href={youtubeConfig.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-900/30 flex items-center gap-2 border-0"
                >
                  <IconYouTube size={18} /> Visit YouTube Channel ↗
                </a>
                <a
                  href={`tel:+${contact.phoneTel}`}
                  className="btn border border-white bg-transparent text-white hover:bg-white/10"
                >
                  <IconPhone size={16} /> Call {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        open={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo}
      />
    </div>
  );
}
