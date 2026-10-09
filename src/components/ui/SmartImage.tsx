"use client";

import { useEffect, useState } from "react";
import { getImageBlob, isStoredImageSrc, storedImageId } from "@/lib/image-store";
import { IconHome } from "@/components/icons";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function SmartImage({ src, alt, className = "", priority }: Props) {
  const [resolved, setResolved] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let revoke: string | null = null;
    let cancelled = false;

    async function resolve() {
      if (!isStoredImageSrc(src)) {
        setResolved(src);
        return;
      }
      try {
        const blob = await getImageBlob(storedImageId(src));
        if (!blob || cancelled) {
          if (!cancelled) setFailed(true);
          return;
        }
        const url = URL.createObjectURL(blob);
        revoke = url;
        setResolved(url);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void resolve();
    return () => {
      cancelled = true;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [src]);

  if (failed || !resolved) {
    return (
      <div
        className={`flex items-center justify-center bg-sky text-navy ${className}`}
        role="img"
        aria-label={alt}
      >
        <IconHome />
      </div>
    );
  }

  return (
    // Native img so blob: and remote URLs share one fallback path.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}
