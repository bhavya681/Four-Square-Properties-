"use client";

import { useEffect, useRef, useState } from "react";
import { IconClose, IconPhone } from "@/components/icons";
import { brand, contact } from "@/lib/config";
import { whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function ReraPopup() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function showPopup() {
      setOpen(true);
      // Auto-hide after 8 seconds
      setTimeout(() => setOpen(false), 8000);
    }

    // First popup after 5 minutes
    timerRef.current = setTimeout(() => {
      showPopup();
      // Repeat every 5 minutes
      timerRef.current = setInterval(() => {
        showPopup();
      }, 5 * 60 * 1000);
    }, 5 * 60 * 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 sm:bottom-28 sm:left-auto sm:right-6 sm:translate-x-0">
      <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              RERA Registered
            </p>
            <p className="mt-1 text-sm font-semibold text-navy">
              {brand.reraNumber}
            </p>
            <p className="mt-2 text-xs text-muted">
              Four Square Properties & Finance Services
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="shrink-0 rounded-full p-1 text-muted hover:text-navy"
            aria-label="Close notification"
          >
            <IconClose size={16} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            className="btn btn-primary px-3 py-1.5 text-xs"
            href={`tel:+${contact.phoneTel}`}
          >
            <IconPhone size={14} /> {contact.phoneDisplay}
          </a>
          <a
            className="btn btn-outline px-3 py-1.5 text-xs"
            href={whatsappUrl(generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}