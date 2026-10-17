"use client";

import { useState } from "react";
import { IconPhone, IconWhatsApp } from "@/components/icons";
import { contact } from "@/lib/config";
import { generalEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { Chatbot } from "@/components/chat/Chatbot";

export function WhatsAppButton() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3">
        <a
          href={`tel:+${contact.phoneTel}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-sky text-navy shadow-lg transition hover:scale-105"
          aria-label="Call now"
        >
          <IconPhone size={26} />
        </a>
        <a
          href={whatsappUrl(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-lg transition hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <IconWhatsApp size={28} />
        </a>
        <button
          type="button"
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-lg transition hover:scale-105"
          onClick={() => setChatOpen(true)}
          aria-haspopup="dialog"
          aria-label="Property Assistant"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="12" rx="3" />
            <path d="M12 7V4M9 4h6" />
            <circle cx="9" cy="13" r="1.2" fill="currentColor" />
            <circle cx="15" cy="13" r="1.2" fill="currentColor" />
            <path d="M9 17h6" />
          </svg>
        </button>
      </div>
      <Chatbot open={chatOpen} onOpenChange={setChatOpen} hideTrigger />
    </>
  );
}