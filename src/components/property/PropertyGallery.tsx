"use client";

import { useState } from "react";
import { IconChevron, IconClose } from "@/components/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { PropertyImage } from "@/lib/types";

export function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = images[index];

  function prev() {
    setIndex((value) => (value === 0 ? images.length - 1 : value - 1));
  }
  function next() {
    setIndex((value) => (value === images.length - 1 ? 0 : value + 1));
  }

  if (!current) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-sky text-muted">
        No images yet
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-sky">
        <button type="button" className="block w-full" onClick={() => setOpen(true)}>
          <SmartImage
            src={current.src}
            alt={current.alt || title}
            className="aspect-[16/10] w-full object-cover"
            priority
          />
        </button>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
              onClick={prev}
              aria-label="Previous image"
            >
              <IconChevron className="rotate-180" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
              onClick={next}
              aria-label="Next image"
            >
              <IconChevron />
            </button>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, imageIndex) => (
            <button
              key={image.id}
              type="button"
              className={`h-20 w-28 shrink-0 overflow-hidden rounded-lg border ${
                imageIndex === index ? "border-primary" : "border-line"
              }`}
              onClick={() => setIndex(imageIndex)}
            >
              <SmartImage src={image.src} alt={image.alt || `${title} ${imageIndex + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy/95 p-4" role="dialog" aria-modal>
          <div className="mb-3 flex justify-end">
            <button type="button" className="rounded-full bg-white p-2" onClick={() => setOpen(false)} aria-label="Close gallery">
              <IconClose />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <SmartImage
              src={current.src}
              alt={current.alt || title}
              className="max-h-full max-w-full object-contain"
            />
            {images.length > 1 ? (
              <>
                <button type="button" className="absolute left-2 rounded-full bg-white p-2" onClick={prev} aria-label="Previous image">
                  <IconChevron className="rotate-180" />
                </button>
                <button type="button" className="absolute right-2 rounded-full bg-white p-2" onClick={next} aria-label="Next image">
                  <IconChevron />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
