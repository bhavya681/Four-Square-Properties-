"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { useDemoStore } from "@/context/DemoStore";
import { formatPrice } from "@/lib/format";

export function AdminDashboard() {
  const { properties, enquiries, testimonials, deleteProperty, setFeatured, setStatus, saveTestimonials, reset } =
    useDemoStore();
  const { notify } = useToast();
  const [query, setQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [quotes, setQuotes] = useState(testimonials.map((item) => item.quote).join("\n\n"));

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return properties.filter((item) => `${item.title} ${item.location}`.toLowerCase().includes(q));
  }, [properties, query]);

  const sale = properties.filter((item) => item.status === "sale").length;
  const rent = properties.filter((item) => item.status === "rent").length;

  return (
    <div className="container-site py-10">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-navy">
        Demonstration admin only. There is no login, no access control, and no server. Anyone using
        this browser can edit demo data. Production use needs a backend and authentication.
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Demo dashboard</h1>
          <p className="text-sm text-muted">Property records persist in localStorage; uploads use IndexedDB.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-primary" href="/admin/new">
            Add property
          </Link>
          <button
            type="button"
            className="btn btn-outline"
            onClick={async () => {
              await reset();
              notify("Demo data restored in this browser.");
            }}
          >
            Reset demo data
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Sample properties" value={properties.length} />
        <Stat label="For sale" value={sale} />
        <Stat label="For rent" value={rent} />
        <Stat label="Demo enquiries" value={enquiries.length} />
      </div>
      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-navy">Properties</h2>
          <input
            className="input max-w-xs"
            placeholder="Search listings"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="min-w-[720px] w-full text-left text-sm">
            <thead className="bg-sky text-navy">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Price</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((property) => (
                <tr key={property.id} className="border-t border-line">
                  <td className="p-3">
                    <p className="font-medium text-navy">{property.title}</p>
                    <p className="text-xs text-muted">{property.location}</p>
                  </td>
                  <td className="p-3">
                    <select
                      className="select"
                      value={property.status}
                      onChange={(e) => setStatus(property.id, e.target.value as "sale" | "rent")}
                    >
                      <option value="sale">Sale</option>
                      <option value="rent">Rent</option>
                    </select>
                  </td>
                  <td className="p-3">{formatPrice(property.price, property.status)}</td>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={property.featured}
                      onChange={(e) => setFeatured(property.id, e.target.checked)}
                      aria-label={`Feature ${property.title}`}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Link className="btn btn-outline px-3 py-1" href={`/properties/${property.slug}`}>
                        Preview
                      </Link>
                      <Link className="btn btn-outline px-3 py-1" href={`/admin/edit/${property.id}`}>
                        Edit
                      </Link>
                      <button type="button" className="btn btn-outline px-3 py-1" onClick={() => setDeleteId(property.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-navy">Recent demo enquiries</h2>
          <p className="mt-1 text-xs text-muted">Stored only in this browser. The business has not received these unless you sent WhatsApp or email.</p>
          <ul className="mt-4 space-y-3">
            {enquiries.length === 0 ? <li className="text-sm text-muted">No demo enquiries yet.</li> : null}
            {enquiries.slice(0, 8).map((item) => (
              <li key={item.id} className="border-b border-line pb-3 text-sm">
                <p className="font-medium text-navy">{item.fullName}</p>
                <p className="text-muted">{item.enquiryType} · {item.preferredLocation}</p>
                <p className="text-xs text-muted">{new Date(item.createdAt).toLocaleString("en-IN")}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-navy">Placeholder testimonials</h2>
          <p className="mt-1 text-xs text-muted">Separate quotes with a blank line. Keep them labelled as placeholders unless they are genuine.</p>
          <textarea className="textarea mt-3" value={quotes} onChange={(e) => setQuotes(e.target.value)} />
          <button
            type="button"
            className="btn btn-navy mt-3"
            onClick={() => {
              const items = quotes
                .split(/\n\s*\n/)
                .map((quote, index) => ({
                  id: `custom-${index}`,
                  quote: quote.trim(),
                  attribution: "Sample reviewer (placeholder)",
                  isPlaceholder: true,
                }))
                .filter((item) => item.quote);
              saveTestimonials(items);
              notify("Testimonials updated in this browser only.");
            }}
          >
            Save testimonials
          </button>
        </div>
      </section>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete this demo listing?"
        message="This only removes the record from this browser. It does not change any real inventory."
        confirmLabel="Delete"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteProperty(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-navy">{value}</p>
    </div>
  );
}