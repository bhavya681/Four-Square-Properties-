import Image from "next/image";
import Link from "next/link";
import { IconInstagram, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/icons";
import { brand, contact, navLinks, serviceNav } from "@/lib/config";
import { mapsSearchUrl, whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-navy text-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="relative block h-12 w-12 shrink-0">
              <Image
                src="/logo2.png"
                alt={brand.name}
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
            <strong className="text-lg font-bold leading-tight">{brand.shortName}</strong>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/75">{brand.description}</p>
          <div className="mt-5 flex gap-3">
            <a
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105"
              href={whatsappUrl(generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <IconWhatsApp size={22} />
            </a>
            <a
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-110 hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)]"
              href={`tel:+${contact.phoneTel}`}
              aria-label="Call now"
            >
              <IconPhone size={22} />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-primary" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceNav.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-primary" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">Contact</h2>
          <p className="flex items-center gap-2">
            <IconPhone size={16} />
            <a className="hover:text-primary" href={`tel:+${contact.phoneTel}`}>
              {contact.phoneDisplay}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <IconMail size={16} />
            <a className="hover:text-primary" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
          <p className="flex items-start gap-2">
            <IconPin size={16} className="mt-0.5" />
            <a
              className="hover:text-primary"
              href={mapsSearchUrl(contact.mapsSearchQuery)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.address}
            </a>
          </p>
          <p>
            <a className="hover:text-primary" href={brand.website} target="_blank" rel="noopener noreferrer">
              {brand.website}
            </a>
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              className="btn btn-primary"
              href={whatsappUrl(generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="btn btn-outline border-white/20 bg-transparent text-white"
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconInstagram size={16} /> Instagram
              {contact.instagramIsPlaceholder ? " (set URL)" : ""}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {brand.name}. All rights reserved. Frontend demonstration
        website — all property listings are sample data.
      </div>
    </footer>
  );
}