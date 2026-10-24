import Image from "next/image";
import Link from "next/link";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconPin,
  IconTwitter,
  IconWhatsApp,
  IconYouTube,
} from "@/components/icons";
import { brand, contact, navLinks, serviceNav, socialLinks, youtubeConfig } from "@/lib/config";
import { mapsSearchUrl, whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-navy text-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="relative block h-14 w-28 shrink-0">
              <Image
                src="/logo3.png"
                alt={brand.name}
                fill
                sizes="120px"
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
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2.5">
              Connect With Us
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366] text-white shadow transition hover:scale-110 hover:shadow-[#25D366]/40"
                href={whatsappUrl(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <IconWhatsApp size={18} />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2] text-white shadow transition hover:scale-110 hover:shadow-[#1877F2]/40"
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <IconFacebook size={18} />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow transition hover:scale-110 hover:shadow-pink-500/40"
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <IconInstagram size={18} />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white border border-white/20 shadow transition hover:scale-110 hover:border-white/50"
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                title="Twitter / X"
              >
                <IconTwitter size={16} />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow transition hover:scale-110 hover:shadow-[#0A66C2]/40"
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <IconLinkedIn size={18} />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF0000] text-white shadow transition hover:scale-110 hover:shadow-red-600/40"
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube Playlist"
              >
                <IconYouTube size={18} />
              </a>
            </div>
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