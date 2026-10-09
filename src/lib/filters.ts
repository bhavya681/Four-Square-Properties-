import type { Property, PropertyFilters } from "./types";

export const defaultFilters = (): PropertyFilters => ({
  query: "",
  status: "all",
  category: "all",
  type: "all",
  area: "all",
  minPrice: "",
  maxPrice: "",
  bedrooms: "all",
  sort: "recent",
});

export function filterProperties(properties: Property[], filters: PropertyFilters) {
  const query = filters.query.trim().toLowerCase();
  const min = filters.minPrice ? Number(filters.minPrice) : null;
  const max = filters.maxPrice ? Number(filters.maxPrice) : null;

  let result = properties.filter((property) => {
    const haystack = `${property.title} ${property.location} ${property.areaName}`.toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (filters.status !== "all" && property.status !== filters.status) return false;
    if (filters.category !== "all" && property.category !== filters.category) return false;
    if (filters.type !== "all" && property.type !== filters.type) return false;
    if (filters.area !== "all" && property.areaName !== filters.area) return false;
    if (min !== null && Number.isFinite(min) && property.price < min) return false;
    if (max !== null && Number.isFinite(max) && property.price > max) return false;
    if (filters.bedrooms !== "all") {
      const needed = Number(filters.bedrooms);
      if ((property.bedrooms ?? 0) < needed) return false;
    }
    return true;
  });

  result = [...result].sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return result;
}

export function filtersFromSearchParams(params: URLSearchParams): PropertyFilters {
  const base = defaultFilters();
  const status = params.get("status");
  const area = params.get("area");
  const category = params.get("category");
  const type = params.get("type");
  if (status === "sale" || status === "rent") base.status = status;
  if (area === "Boisar" || area === "Tarapur" || area === "Palghar" || area === "Nearby") {
    base.area = area;
  }
  if (category === "residential" || category === "commercial") base.category = category;
  if (
    type === "apartment" ||
    type === "independent-house" ||
    type === "villa" ||
    type === "plot" ||
    type === "shop" ||
    type === "office"
  ) {
    base.type = type;
  }
  return base;
}
