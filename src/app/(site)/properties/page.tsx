import { Suspense } from "react";
import { PropertiesExplorer } from "@/components/property/PropertiesExplorer";

export const metadata = {
  title: "Properties",
  description:
    "Browse sample residential and commercial listings in Boisar, Palghar and Tarapur. Demonstration data only.",
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="container-site py-16 text-muted">Loading properties…</div>}>
      <PropertiesExplorer />
    </Suspense>
  );
}
