"use client";

import { IconPhone, IconWhatsApp } from "@/components/icons";
import { contact } from "@/lib/config";
import { generalEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3">
      <a
        href={whatsappUrl(generalEnquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <IconWhatsApp size={28} />
      </a>
      <a
        href={`tel:+${contact.phoneTel}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg transition hover:scale-105"
        aria-label="Call now"
      >
        <IconPhone size={26} />
      </a>
    </div>
  );
}