"use client";

import { IconGrid, IconList } from "@/components/icons";
import type { PropertyFilters as Filters } from "@/lib/types";

export function PropertyFilters({
  filters,
  onChange,
  onClear,
  count,
  view,
  onView,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
  count: number;
  view: "grid" | "list";
  onView: (view: "grid" | "list") => void;
}) {
  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="card p-4 sm:p-5">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-medium text-navy">
          Search
          <input
            className="input mt-1"
            placeholder="Name or location"
            value={filters.query}
            onChange={(e) => set("query", e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-navy">
          Sale or rent
          <select className="select mt-1" value={filters.status} onChange={(e) => set("status", e.target.value as Filters["status"])}>
            <option value="all">All</option>
            <option value="sale">For sale</option>
            <option value="rent">For rent</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Category
          <select className="select mt-1" value={filters.category} onChange={(e) => set("category", e.target.value as Filters["category"])}>
            <option value="all">All</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Property type
          <select className="select mt-1" value={filters.type} onChange={(e) => set("type", e.target.value as Filters["type"])}>
            <option value="all">All</option>
            <option value="apartment">Apartment</option>
            <option value="independent-house">Independent house</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="shop">Shop</option>
            <option value="office">Office</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Location
          <select className="select mt-1" value={filters.area} onChange={(e) => set("area", e.target.value as Filters["area"])}>
            <option value="all">All</option>
            <option value="Boisar">Boisar</option>
            <option value="Tarapur">Tarapur</option>
            <option value="Palghar">Palghar</option>
            <option value="Nearby">Nearby</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Min price (₹)
          <input className="input mt-1" inputMode="numeric" value={filters.minPrice} onChange={(e) => set("minPrice", e.target.value)} />
        </label>
        <label className="text-sm font-medium text-navy">
          Max price (₹)
          <input className="input mt-1" inputMode="numeric" value={filters.maxPrice} onChange={(e) => set("maxPrice", e.target.value)} />
        </label>
        <label className="text-sm font-medium text-navy">
          Bedrooms
          <select className="select mt-1" value={filters.bedrooms} onChange={(e) => set("bedrooms", e.target.value as Filters["bedrooms"])}>
            <option value="all">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-navy">
            Sort
            <select className="select mt-1 sm:mt-0 sm:ml-2" value={filters.sort} onChange={(e) => set("sort", e.target.value as Filters["sort"])}>
              <option value="recent">Recently added</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
          <button type="button" className="btn btn-outline" onClick={onClear}>
            Clear all filters
          </button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted">{count} {count === 1 ? "property" : "properties"}</p>
          <button type="button" className={`btn ${view === "grid" ? "btn-navy" : "btn-outline"} px-3`} onClick={() => onView("grid")} aria-label="Grid view">
            <IconGrid size={18} />
          </button>
          <button type="button" className={`btn ${view === "list" ? "btn-navy" : "btn-outline"} px-3`} onClick={() => onView("list")} aria-label="List view">
            <IconList size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
