"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconClose, IconSend } from "@/components/icons";
import { useDemoStore } from "@/context/DemoStore";
import { getBotReply, suggestedQuestions, type ChatLink } from "@/lib/chatbot";

type Message = { id: number; from: "bot" | "user"; text: string; links?: ChatLink[] };

export function Chatbot() {
  const { properties } = useDemoStore();
  const [open, setOpen] = useState(false);
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
      <button
        type="button"
        className="fixed bottom-22 right-4 z-40 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lg sm:bottom-24"
        style={{ bottom: "5.75rem" }}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        Property Assistant
      </button>
      {open ? (
        <div
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(36rem,calc(100vh-5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card sm:inset-x-auto sm:right-4 sm:bottom-24 sm:w-[24rem]"
          role="dialog"
          aria-label="Property Assistant"
        >
          <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
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
                  message.from === "user" ? "ml-auto bg-primary text-white" : "bg-sky text-navy"
                }`}
              >
                <p>{message.text}</p>
                {message.links?.length ? (
                  <ul className="mt-2 space-y-1">
                    {message.links.map((link) => (
                      <li key={link.href}>
                        <Link className="underline" href={link.href} onClick={() => setOpen(false)}>
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
                  className="rounded-full border border-line px-3 py-1 text-left text-xs text-navy"
                  onClick={() => pushReply(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <form
            className="flex gap-2 border-t border-line p-3"
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
