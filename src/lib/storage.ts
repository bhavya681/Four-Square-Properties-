import { seedProperties, seedTestimonials } from "./seed-data";
import type { Enquiry, Property, Testimonial } from "./types";
import { clearImageStore } from "./image-store";

const PROPERTY_KEY = "foursquare.demo.properties.v1";
const ENQUIRY_KEY = "foursquare.demo.enquiries.v1";
const TESTIMONIAL_KEY = "foursquare.demo.testimonials.v1";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or private-mode failures should not crash the UI.
  }
}

function isProperty(value: unknown): value is Property {
  if (!value || typeof value !== "object") return false;
  const item = value as Property;
  return Boolean(
    item.id &&
      item.slug &&
      item.title &&
      Array.isArray(item.images) &&
      typeof item.price === "number",
  );
}

export function loadProperties(): Property[] {
  const stored = readJson<Property[]>(PROPERTY_KEY);
  if (Array.isArray(stored) && stored.every(isProperty) && stored.length > 0) {
    return stored;
  }
  return seedProperties;
}

export function saveProperties(properties: Property[]) {
  writeJson(PROPERTY_KEY, properties);
}

export function loadEnquiries(): Enquiry[] {
  const stored = readJson<Enquiry[]>(ENQUIRY_KEY);
  return Array.isArray(stored) ? stored : [];
}

export function saveEnquiries(enquiries: Enquiry[]) {
  writeJson(ENQUIRY_KEY, enquiries);
}

export function loadTestimonials(): Testimonial[] {
  const stored = readJson<Testimonial[]>(TESTIMONIAL_KEY);
  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  return seedTestimonials;
}

export function saveTestimonials(items: Testimonial[]) {
  writeJson(TESTIMONIAL_KEY, items);
}

export async function resetDemoData() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(PROPERTY_KEY);
    window.localStorage.removeItem(ENQUIRY_KEY);
    window.localStorage.removeItem(TESTIMONIAL_KEY);
  }
  try {
    await clearImageStore();
  } catch {
    // IndexedDB may be blocked; seed data still restores.
  }
}
