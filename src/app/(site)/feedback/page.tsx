"use client";

import { useState } from "react";
import { IconYouTube, IconStar, IconMessageSquare, IconPlay, IconThumbUp, IconVerified, IconClose } from "@/components/icons";
import { videoReviews, youtubeConfig } from "@/lib/config";

export default function FeedbackPage() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videoReviews[0] | null>(null);

  const stars = [1, 2, 3, 4, 5];

  const getVideoEmbedUrl = (url: string, type: "video" | "shorts") => {
    if (type === "shorts") {
      const videoId = url.split("/shorts/")[1]?.split("?")[0] || url;
      return `https://www.youtube.com/embed/${videoId}`;
    }
    const videoId = url.split("v=")[1]?.split("&")[0] || url;
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <article className="container-site py-10 px-4 sm:px-6 lg:px-8">
      <p className="eyebrow">Client Reviews</p>
      <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
        Video Testimonials & Reviews
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Watch property walkthroughs and read genuine feedback from our verified clients.
      </p>

      {/* Professional Card Grid - Responsive */}
      <section className="mt-8">
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {videoReviews.map((review) => (
            <article
              key={review.videoId}
              className="card overflow-hidden bg-white border border-line hover:shadow-card transition-all duration-300 flex flex-col"
              onClick={() => setSelectedVideo(review)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video group cursor-pointer flex-shrink-0">
                <img
                  src={review.thumbnail}
                  alt={review.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform group-hover:scale-110">
                    <IconPlay size={22} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    review.type === "shorts"
                      ? "bg-red-600 text-white"
                      : "bg-navy text-white"
                  }`}>
                    {review.type === "shorts" && <IconYouTube size={9} className="inline mr-1" />}
                    {review.type === "shorts" ? "Shorts" : "Video"}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-white/90 text-navy">
                    {review.location}
                  </span>
                </div>
              </div>

              {/* Video Info - Flex column to fill space */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 min-h-0">
                <h3 className="font-semibold text-navy line-clamp-2 text-base sm:text-lg">{review.title}</h3>
                
                {/* Rating Row */}
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <IconStar size={14} fill="currentColor" />
                    <span className="font-bold text-navy text-base sm:text-lg">{review.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted">({review.totalReviews} reviews)</span>
                  <span className="flex-1" />
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn btn-primary text-xs sm:text-sm py-1.5 px-3 sm:py-1.5 sm:px-4 shrink-0"
                  >
                    Watch
                  </a>
                </div>

                {/* Sample Comments - Compact */}
                <div className="mt-3 pt-3 border-t border-line space-y-2.5 flex-1 overflow-hidden">
                  {review.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="flex gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm">
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-medium text-navy text-xs sm:text-sm">{comment.author}</span>
                          {comment.isVerified && (
                            <IconVerified size={10} className="text-primary shrink-0" />
                          )}
                          <span className="text-xs text-muted">{comment.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-yellow-500 mt-0.5">
                          {stars.map((n) => (
                            <IconStar
                              key={n}
                              size={10}
                              fill={n <= comment.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <p className="mt-0.5 text-xs sm:text-sm text-muted line-clamp-2">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  {review.comments.length > 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(review);
                      }}
                      className="w-full text-xs sm:text-sm text-primary hover:text-accent font-medium py-1.5 mt-1"
                    >
                      View all {review.comments.length} comments
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Video Modal - Improved Layout */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 backdrop-blur-sm p-3 sm:p-4" onClick={() => setSelectedVideo(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(15,45,74,0.4)] animate-slide-up flex flex-col max-h-[90vh] max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player - Fixed height ratio */}
            <div className="relative aspect-video w-full flex-shrink-0 bg-black">
              <iframe
                id="video-modal-title"
                title={selectedVideo.title}
                src={getVideoEmbedUrl(selectedVideo.url, selectedVideo.type)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Content Area - Scrollable */}
            <div className="p-4 sm:p-5 lg:p-6 flex-1 overflow-y-auto flex flex-col min-h-0">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedVideo.type === "shorts"
                        ? "bg-red-600 text-white"
                        : "bg-navy text-white"
                    }`}>
                      {selectedVideo.type === "shorts" && <IconYouTube size={9} className="inline mr-1" />}
                      {selectedVideo.type === "shorts" ? "Shorts" : "Video"}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                      {selectedVideo.location}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-lg sm:text-xl font-bold text-navy line-clamp-2">{selectedVideo.title}</h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <IconStar size={14} fill="currentColor" />
                      <span className="font-bold text-navy text-base sm:text-lg">{selectedVideo.rating.toFixed(1)}</span>
                      <span className="text-xs sm:text-sm text-muted">({selectedVideo.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="shrink-0 rounded-full bg-white/10 p-1.5 sm:p-2 text-white backdrop-blur-sm hover:bg-white/25 transition"
                >
                  <IconClose size={20} />
                </button>
              </div>

              {/* Comments Section */}
              <div className="border-t border-line pt-4 flex-1 overflow-y-auto">
                <h4 className="font-semibold text-navy mb-3">Comments & Reviews</h4>
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                  {selectedVideo.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-medium text-navy text-sm">{comment.author}</span>
                          {comment.isVerified && (
                            <IconVerified size={12} className="text-primary shrink-0" />
                          )}
                          <span className="text-xs text-muted">{comment.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-yellow-500 mt-0.5">
                          {stars.map((n) => (
                            <IconStar
                              key={n}
                              size={11}
                              fill={n <= comment.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-sm text-muted">{comment.text}</p>
                        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted">
                          <button className="flex items-center gap-1 hover:text-primary transition">
                            <IconThumbUp size={11} />
                            <span>{comment.likes} Helpful</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary transition">
                            <IconMessageSquare size={11} />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Clean */}
      {/* <section className="mt-10">
        <div className="card p-5 sm:p-6 lg:p-8 bg-gradient-to-r from-navy to-primary text-white rounded-2xl">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] items-center">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Share Your Experience</h2>
              <p className="mt-1.5 text-white/80 text-sm sm:text-base">
                Your feedback helps us improve and guides other property seekers in making informed decisions.
              </p>
            </div>
            <a
              href={youtubeConfig.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-navy font-bold hover:bg-white/90 shadow-lg shrink-0"
            >
              <IconYouTube size={18} /> Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section> */}
    </article>
  );
}