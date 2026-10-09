import { PropertyDetail } from "@/components/property/PropertyDetail";
import { seedProperties } from "@/lib/seed-data";

export const dynamicParams = true;

export function generateStaticParams() {
  return seedProperties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = seedProperties.find((item) => item.slug === slug);
  return {
    title: property?.title ?? "Property details",
    description: property?.description ?? "Sample property listing for demonstration.",
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PropertyDetail slug={slug} />;
}
