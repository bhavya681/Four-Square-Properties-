"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { IconWhatsApp } from "@/components/icons";
import { useDemoStore } from "@/context/DemoStore";
import { DEMO_NOTICE } from "@/lib/config";
import { formatArea, formatPrice, propertyTypeLabel, statusLabel } from "@/lib/format";
import { propertyEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";

export function PropertyDetail({ slug }: { slug: string }) {
  const { properties, ready } = useDemoStore();
  const property = properties.find((item) => item.slug === slug);

  if (!ready) {
    return <div className="container-site py-16 text-muted">Loading listing…</div>;
  }
  if (!property) notFound();

  const similar = properties
    .filter((item) => item.id !== property.id && (item.areaName === property.areaName || item.type === property.type))
    .slice(0, 3);
  const pageUrl = typeof window !== "undefined" ? window.location.href : `/properties/${property.slug}`;

  return (
    <div className="container-site py-10">
      <p className="text-sm text-muted">
        <Link href="/properties">Properties</Link> / {property.title}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <PropertyGallery images={property.images} title={property.title} />
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {statusLabel(property.status)} · {propertyTypeLabel(property.type)}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy">{property.title}</h1>
            <p className="mt-1 text-muted">{property.location}</p>
            <p className="mt-4 text-2xl font-semibold text-primary">
              {formatPrice(property.price, property.status)}
            </p>
            <p className="text-sm text-muted">
              {formatArea(property.areaSqft)}
              {property.bedrooms ? ` · ${property.bedrooms} bedrooms` : ""}
              {property.bathrooms ? ` · ${property.bathrooms} bathrooms` : ""}
            </p>
            <p className="mt-3 text-xs text-muted">{DEMO_NOTICE}</p>
          </div>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-navy">Overview</h2>
            <p className="mt-3 text-muted">{property.description}</p>
          </section>
          {property.highlights.length ? (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-navy">Highlights</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                {property.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {property.amenities.length ? (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-navy">Amenities</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {property.amenities.map((item) => (
                  <li key={item} className="rounded-full bg-sky px-3 py-1 text-sm text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-navy">Location</h2>
            <p className="mt-3 text-muted">
              {property.location}. Use this as a locality guide — it is not a verified map pin of a
              live listing.
            </p>
          </section>
          <section className="mt-10 lg:hidden">
            <h2 className="text-xl font-semibold text-navy">Enquire</h2>
            <div className="card mt-4 p-5">
              <EnquiryForm propertyTitle={property.title} propertySlug={property.slug} />
            </div>
          </section>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24 card p-5">
            <p className="font-semibold text-navy">Talk to the team</p>
            <p className="mt-2 text-sm text-muted">
              Sample listing. Confirm current availability directly with Four Square.
            </p>
            <a
              className="btn btn-primary mt-4 w-full"
              href={whatsappUrl(propertyEnquiryMessage(property.title, pageUrl))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp size={18} /> WhatsApp enquiry
            </a>
            <div className="mt-6">
              <EnquiryForm propertyTitle={property.title} propertySlug={property.slug} />
            </div>
          </div>
        </aside>
      </div>
      {similar.length ? (
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-navy">Similar sample properties</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {similar.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      ) : null}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white p-3 lg:hidden">
        <a
          className="btn btn-primary w-full"
          href={whatsappUrl(propertyEnquiryMessage(property.title, pageUrl))}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp enquiry
        </a>
      </div>
    </div>
  );
}
