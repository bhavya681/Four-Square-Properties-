"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconClose, IconSend } from "@/components/icons";
import { useDemoStore } from "@/context/DemoStore";
import { getBotReply, suggestedQuestions, type ChatLink } from "@/lib/chatbot";

type Message = { id: number; from: "bot" | "user"; text: string; links?: ChatLink[] };

export function Chatbot({
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
}: {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  hideTrigger?: boolean;
} = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = (value: boolean) => {
    if (onOpenChange) onOpenChange(value);
    else setInternalOpen(value);
  };
  const { properties } = useDemoStore();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [seq, setSeq] = useState(1);
  const welcome = useMemo<Message>(
    () => ({
      id: 1,
      from: "bot",
      text: "Welcome. This is a rule-based Property Assistant for demonstration — not a live AI model. Ask about sample listings, services or contact details.",
    }),
    [],
  );
  const [messages, setMessages] = useState<Message[]>([welcome]);

  function pushReply(text: string) {
    const id = seq;
    setSeq((current) => current + 1);
    const user: Message = { id, from: "user", text };
    setMessages((current) => [...current, user]);
    setTyping(true);
    window.setTimeout(() => {
      const reply = getBotReply(text, properties);
      setMessages((current) => [
        ...current,
        { id: seq, from: "bot", text: reply.text, links: reply.links },
      ]);
      setSeq((current) => current + 1);
      setTyping(false);
    }, 450);
  }

  return (
    <>
      {!hideTrigger ? (
        <button
          type="button"
          className="fixed bottom-6 right-5 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_8px_24px_rgba(22,168,213,0.45)] ring-4 ring-white/60 transition hover:scale-110 hover:shadow-[0_12px_30px_rgba(22,168,213,0.55)] dark:ring-sky-soft/50"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label="Property Assistant"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="12" rx="3" />
            <path d="M12 7V4M9 4h6" />
            <circle cx="9" cy="13" r="1.2" fill="currentColor" />
            <circle cx="15" cy="13" r="1.2" fill="currentColor" />
            <path d="M9 17h6" />
          </svg>
        </button>
      ) : null}
      {open ? (
        <div
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(36rem,calc(100vh-5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_rgba(18,59,93,0.18)] ring-1 ring-sky-soft/60 sm:inset-x-auto sm:right-4 sm:bottom-24 sm:w-[24rem]"
          role="dialog"
          aria-label="Property Assistant"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-navy to-[#0f3a5f] px-4 py-3 text-white">
            <div>
              <p className="font-semibold">Property Assistant</p>
              <p className="text-xs text-white/70">Rule-based demo · not a live AI model</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded px-2 py-1 text-xs hover:bg-white/10"
                onClick={() => setMessages([welcome])}
              >
                Clear
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
                <IconClose />
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                  message.from === "user"
                    ? "ml-auto bg-gradient-to-br from-primary to-accent text-white shadow-md"
                    : "bg-sky text-navy border border-sky-soft"
                }`}
              >
                <p>{message.text}</p>
                {message.links?.length ? (
                  <ul className="mt-2 space-y-1">
                    {message.links.map((link) => (
                      <li key={link.href}>
                        <Link className="underline text-accent hover:text-primary" href={link.href} onClick={() => setOpen(false)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            {typing ? <p className="text-xs text-muted">Assistant is typing…</p> : null}
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="rounded-full border border-line bg-sky-soft px-3 py-1 text-left text-xs text-navy transition hover:border-primary hover:bg-sky"
                  onClick={() => pushReply(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <form
            className="flex gap-2 border-t border-line bg-sky-soft/40 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!input.trim()) return;
              pushReply(input.trim());
              setInput("");
            }}
          >
            <label className="sr-only" htmlFor="chat-input">
              Message
            </label>
            <input
              id="chat-input"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about listings or services"
            />
            <button className="btn btn-primary px-3" type="submit" aria-label="Send">
              <IconSend />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
