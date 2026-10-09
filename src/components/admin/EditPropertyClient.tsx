"use client";

import Link from "next/link";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { useDemoStore } from "@/context/DemoStore";

export function EditPropertyClient({ id }: { id: string }) {
  const { properties, ready } = useDemoStore();
  const property = properties.find((item) => item.id === id);

  if (!ready) return <div className="container-site py-16 text-muted">Loading…</div>;
  if (!property) {
    return (
      <div className="container-site py-16">
        <h1 className="text-2xl font-semibold text-navy">Listing not found in this browser</h1>
        <Link className="btn btn-primary mt-4" href="/admin">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site py-10">
      <h1 className="text-3xl font-bold text-navy">Edit demo property</h1>
      <div className="card mt-6 p-6">
        <PropertyEditor property={property} />
      </div>
    </div>
  );
}
