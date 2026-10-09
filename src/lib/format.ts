import type { ListingStatus, PropertyType } from "./types";

export function formatPrice(value: number, status: ListingStatus) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
  return status === "rent" ? `${formatted} / month` : formatted;
}

export function formatArea(sqft: number) {
  return `${sqft.toLocaleString("en-IN")} sq. ft.`;
}

export function propertyTypeLabel(type: PropertyType) {
  const labels: Record<PropertyType, string> = {
    apartment: "Apartment",
    "independent-house": "Independent house",
    villa: "Villa",
    plot: "Residential plot",
    shop: "Shop",
    office: "Office",
  };
  return labels[type];
}

export function statusLabel(status: ListingStatus) {
  return status === "sale" ? "For Sale" : "For Rent";
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
