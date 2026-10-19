"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IconClose, IconMenu, IconPhone, IconWhatsApp } from "@/components/icons";
import { brand, contact, navLinks } from "@/lib/config";
import { generalEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== pathnameRef.current) {
      pathnameRef.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "border-line bg-white/95 shadow-sm backdrop-blur" : "border-transparent bg-white"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="relative block h-10 w-10 shrink-0">
            <Image
              src="/logo2.png"
              alt={brand.name}
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold leading-tight text-navy sm:text-base">
              {brand.shortName}
            </span>
            <span className="hidden truncate text-xs text-muted sm:block">
              Properties & Finance Services
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                pathname === link.href ? "text-primary" : "text-navy hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            className="btn border-2 border-[#25D366] bg-transparent text-[#25D366] hover:bg-[#25D366] hover:text-white"
            href={`tel:+${contact.phoneTel}`}
          >
            <IconPhone size={16} /> {contact.phoneDisplay}
          </a>
          <a
            className="btn btn-primary"
            href={whatsappUrl(generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire now
          </a>
</div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#87CEEB] bg-transparent px-3 py-2 text-sm font-medium text-[#87CEEB] transition hover:bg-[#25D366] hover:text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-haspopup="true"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose size={18} /> : <IconMenu size={18} />}
          {/* <span>{open ? "Close" : "Menu"}</span> */}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <nav className="container-site flex flex-col gap-3 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="py-1 font-medium text-navy">
                {link.label}
              </Link>
            ))}
            <a
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#87CEEB] px-4 py-2.5 text-sm font-medium text-[#87CEEB] transition hover:bg-[#25D366] hover:text-white"
              href={`tel:+${contact.phoneTel}`}
            >
              <IconPhone size={16} /> Call {contact.phoneDisplay}
            </a>
            <a
              className="btn btn-primary"
              href={whatsappUrl(generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp size={18} /> Enquire on WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
