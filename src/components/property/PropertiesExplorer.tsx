"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { useDemoStore } from "@/context/DemoStore";
import { DEMO_NOTICE } from "@/lib/config";
import { defaultFilters, filterProperties, filtersFromSearchParams } from "@/lib/filters";

const PAGE_SIZE = 6;

export function PropertiesExplorer() {
  const searchParams = useSearchParams();
  const { properties } = useDemoStore();
  const [filters, setFilters] = useState(() => filtersFromSearchParams(searchParams));
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterProperties(properties, filters), [properties, filters]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="container-site py-10">
      <p className="eyebrow">Properties</p>
      <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Explore sample listings</h1>
      <p className="mt-3 max-w-2xl text-muted">{DEMO_NOTICE}</p>
      <div className="mt-8">
        <PropertyFilters
          filters={filters}
          count={filtered.length}
          view={view}
          onView={setView}
          onClear={() => {
            setFilters(defaultFilters());
            setPage(1);
          }}
          onChange={(next) => {
            setFilters(next);
            setPage(1);
          }}
        />
      </div>
      {filtered.length === 0 ? (
        <div className="card mt-8 p-10 text-center">
          <h2 className="text-xl font-semibold text-navy">No properties match these filters</h2>
          <p className="mt-2 text-sm text-muted">Clear filters or adjust price and location.</p>
        </div>
      ) : (
        <div className={`mt-8 grid gap-6 ${view === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
          {visible.map((property) => (
            <PropertyCard key={property.id} property={property} layout={view} />
          ))}
        </div>
      )}
      {visible.length < filtered.length ? (
        <div className="mt-8 text-center">
          <button type="button" className="btn btn-navy" onClick={() => setPage((value) => Math.min(pages, value + 1))}>
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
}
