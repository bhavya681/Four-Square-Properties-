"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconClose } from "@/components/icons";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { brand } from "@/lib/config";

export function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const hasSeen = typeof window !== "undefined" && localStorage.getItem("contact-popup-seen");
    if (!hasSeen) {
      const t = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("contact-popup-seen", "1");
      }, 5 * 60 * 1000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (open && typeof window !== "undefined") {
      localStorage.setItem("contact-popup-seen", "1");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/55 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-popup-title"
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-white shadow-[0_24px_70px_rgba(18,59,93,0.3)] sm:max-h-[92vh] sm:rounded-2xl animate-slide-up"
        style={{ maxHeight: "92vh", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="relative flex shrink-0 items-center gap-3 bg-gradient-to-r from-navy via-[#0d3a5c] to-[#0e8fb8] px-5 py-4 text-white sm:px-6">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <span className="relative block h-12 w-20 shrink-0 rounded-xl bg-white p-1.5 shadow-lg ring-2 ring-white/20">
            <Image src="/logo4.png" alt={brand.name} fill sizes="80px" className="object-contain" />
          </span>
          <div className="relative min-w-0 flex-1">
            <p id="contact-popup-title" className="truncate text-base font-bold leading-tight sm:text-lg">
              {brand.shortName}
            </p>
            <p className="truncate text-xs text-white/80">Properties & Finance Services</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="relative shrink-0 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
          >
            <IconClose size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6 sm:py-7">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-soft text-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-semibold text-navy sm:text-xl">Enquire with us</h2>
              <p className="text-xs text-muted">Usually replies within 24 hours</p>
            </div>
          </div>
          <p className="mb-5 text-sm text-muted">
            Share a few details and our team will get back to you shortly.
          </p>
        <EnquiryForm
          onSuccess={() => {
            setOpen(false);
            if (typeof window !== "undefined") {
              localStorage.setItem("contact-popup-seen", "1");
            }
          }}
          renderActions={({ loading, done, onSubmit, onReset }) => (
            <div className="sticky bottom-0 mt-4 flex flex-wrap gap-3 border-t border-line bg-white/95 px-1 py-3 backdrop-blur-sm">
              {done ? (
                <p className="flex w-full items-center gap-2 rounded-lg bg-sky px-3 py-2 text-sm text-navy">
                  <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Enquiry sent. We'll get back to you soon.
                </p>
              ) : (
                <>
                  <button className="btn btn-primary px-5" type="submit" disabled={loading} onClick={onSubmit}>
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M21 12a9 9 0 1 1-6.2-8.6" />
                        </svg>
                        Preparing…
                      </span>
                    ) : (
                      "Send enquiry draft"
                    )}
                  </button>
                  <button className="btn btn-outline px-5" type="button" onClick={onReset} disabled={loading}>
                    Reset
                  </button>
                </>
              )}
            </div>
          )}
        />
        </div>
      </div>
    </div>
  );
}
