import { brand, contact } from "./config";
import { formatPrice } from "./format";
import type { Property } from "./types";

export type ChatLink = { href: string; label: string };
export type ChatReply = { text: string; links?: ChatLink[] };

export const suggestedQuestions = [
  "I want to buy a property in Boisar.",
  "Show me properties in my budget.",
  "What services do you provide?",
  "I need property finance assistance.",
  "How can I contact your team?",
];

function listProperties(properties: Property[], limit = 3): ChatLink[] {
  return properties.slice(0, limit).map((property) => ({
    href: `/properties/${property.slug}`,
    label: `${property.title} · ${formatPrice(property.price, property.status)}`,
  }));
}

export function getBotReply(message: string, properties: Property[]): ChatReply {
  const q = message.toLowerCase();
  const sale = properties.filter((p) => p.status === "sale");

  if (/(hello|hi|hey)\b/.test(q)) {
    return {
      text: `Hello. I am a rule-based Property Assistant for ${brand.shortName} — not a live AI model. Ask about sample listings, services, finance assistance or how to contact the team.`,
    };
  }

  if (q.includes("boisar") && (q.includes("buy") || q.includes("property"))) {
    const matches = sale.filter((p) => p.areaName === "Boisar");
    return {
      text: "Here are sample Boisar sale listings from the demo data. Treat them as illustrations, then speak with the team to check current options.",
      links: [
        ...listProperties(matches),
        { href: "/properties?area=Boisar&status=sale", label: "Browse Boisar listings" },
      ],
    };
  }

  if (q.includes("budget") || q.includes("price") || /\d/.test(q)) {
    const numbers = q.match(/(\d[\d,]*)/g)?.map((n) => Number(n.replace(/,/g, ""))) ?? [];
    let max = numbers.find((n) => n >= 100000) ?? numbers.find((n) => n > 0);
    if (max && max < 1000) max = max * 100000;
    const matches = max
      ? sale.filter((p) => p.price <= max)
      : sale.filter((p) => p.price <= 5000000);
    return {
      text: max
        ? `From the sample data, these sale listings are at or below ${formatPrice(max, "sale")}. Confirm live prices with the team.`
        : "I can filter sample sale listings. Share a number in rupees (for example 40 lakh or 4000000), or browse the properties page.",
      links: [
        ...listProperties(matches.length ? matches : sale),
        { href: "/properties", label: "Open property search" },
      ],
    };
  }

  if (q.includes("service")) {
    return {
      text: `${brand.name} assists with buying, selling, investment guidance, residential and commercial properties, finance assistance, and documentation coordination. Finance assistance is support — not a guaranteed loan.`,
      links: [{ href: "/services", label: "View services" }],
    };
  }

  if (q.includes("finance") || q.includes("loan") || q.includes("home loan")) {
    return {
      text: "The team can help you understand typical documentation and introduce finance options. This is assistance only — loan approval depends on the lender and your eligibility.",
      links: [
        { href: "/services#finance", label: "Finance assistance" },
        { href: "/contact", label: "Contact the team" },
      ],
    };
  }

  if (q.includes("contact") || q.includes("whatsapp") || q.includes("phone") || q.includes("email")) {
    return {
      text: `Call ${contact.phoneDisplay}, email ${contact.email}, or message on WhatsApp. The office address is ${contact.address}.`,
      links: [{ href: "/contact", label: "Contact page" }],
    };
  }

  if (q.includes("tarapur") || q.includes("palghar") || q.includes("umroli")) {
    const area = q.includes("tarapur") ? "Tarapur" : q.includes("palghar") ? "Palghar" : "Nearby";
    const matches = properties.filter((p) => p.areaName === area);
    return {
      text: `Sample listings tagged ${area} are shown below. Use the properties page to refine sale, rent and budget filters.`,
      links: [
        ...listProperties(matches),
        { href: `/properties?area=${area}`, label: `Browse ${area}` },
      ],
    };
  }

  if (q.includes("rent")) {
    const matches = properties.filter((p) => p.status === "rent");
    return {
      text: "These are sample rental listings in the demo dataset.",
      links: [
        ...listProperties(matches),
        { href: "/properties?status=rent", label: "Browse rentals" },
      ],
    };
  }

  return {
    text: "I can help with sample listings, services, finance assistance (not loan guarantees) and contact details. Try a suggested question, or open the properties page to search.",
    links: [
      { href: "/properties", label: "Explore properties" },
      { href: "/contact", label: "Contact the team" },
    ],
  };
}
