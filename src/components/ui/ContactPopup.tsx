"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconClose } from "@/components/icons";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { brand } from "@/lib/config";

export function ContactPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 5 * 60 * 1000);
    return () => clearTimeout(t);
  }, []);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-white shadow-card sm:max-h-[90vh] sm:rounded-2xl"
        style={{ maxHeight: "92vh", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-navy via-primary to-accent px-5 py-4 text-white sm:px-6">
          <span className="relative block h-11 w-11 shrink-0 rounded-xl bg-white/95 p-1.5 shadow-sm">
            <Image src="/logo2.png" alt={brand.name} fill sizes="44px" className="object-contain" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-tight sm:text-base">{brand.shortName}</p>
            <p className="text-xs text-white/85">Properties & Finance Services</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="shrink-0 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 active:bg-white/30"
          >
            <IconClose size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
          <h2 className="text-lg font-semibold text-navy sm:text-xl">Enquire with us</h2>
          <p className="mb-5 text-sm text-muted">
            Share a few details and our team will get back to you shortly.
          </p>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
