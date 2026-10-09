"use client";

import Link from "next/link";
import { IconWhatsApp } from "@/components/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatArea, formatPrice, propertyTypeLabel, statusLabel } from "@/lib/format";
import type { Property } from "@/lib/types";
import { propertyEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";

export function PropertyCard({
  property,
  layout = "grid",
}: {
  property: Property;
  layout?: "grid" | "list";
}) {
  const href = `/properties/${property.slug}`;
  const pageUrl = typeof window !== "undefined" ? `${window.location.origin}${href}` : href;
  const image = property.images[0];
  const isList = layout === "list";

  return (
    <article className={`card overflow-hidden ${isList ? "grid md:grid-cols-[240px_1fr]" : ""}`}>
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-sky">
        {image ? (
          <SmartImage
            src={image.src}
            alt={image.alt || property.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">No image</div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
          {statusLabel(property.status)}
        </span>
      </Link>
      <div className="flex flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            {propertyTypeLabel(property.type)} · {property.areaName}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-navy">
            <Link href={href}>{property.title}</Link>
          </h3>
          <p className="text-sm text-muted">{property.location}</p>
        </div>
        <p className="text-xl font-semibold text-primary">{formatPrice(property.price, property.status)}</p>
        <p className="text-sm text-muted">
          {formatArea(property.areaSqft)}
          {property.bedrooms ? ` · ${property.bedrooms} bed` : ""}
          {property.bathrooms ? ` · ${property.bathrooms} bath` : ""}
        </p>
        {property.isSample ? (
          <p className="text-xs text-muted">Sample demonstration listing</p>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-2">
          <Link href={href} className="btn btn-primary">
            View details
          </Link>
          <a
            className="btn btn-outline"
            href={whatsappUrl(propertyEnquiryMessage(property.title, pageUrl))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp size={18} /> WhatsApp enquiry
          </a>
        </div>
      </div>
    </article>
  );
}
