"use client";

import { useEffect } from "react";
import { IconClose } from "@/components/icons";
import { brand } from "@/lib/config";

type Props = {
  open: boolean;
  onClose: () => void;
  videoId: string | null;
};

export function VideoModal({ open, onClose, videoId }: Props) {
  const isOpen = open && Boolean(videoId);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Video player"
        className="relative w-full max-w-4xl aspect-video rounded-2xl border border-line bg-white overflow-hidden shadow-[0_24px_70px_rgba(18,59,93,0.3)] animate-slide-up sm:max-w-[90vw] sm:max-h-[85vh]"
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-4 right-4 z-20 shrink-0 rounded-full bg-white/90 p-2 text-navy shadow-lg hover:bg-white active:scale-95 transition"
        >
          <IconClose size={22} />
        </button>
        <iframe
          className="w-full h-full"
          src={src}
          title={brand.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
