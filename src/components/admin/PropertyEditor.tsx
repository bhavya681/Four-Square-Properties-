"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { useToast } from "@/components/ui/Toast";
import { useDemoStore } from "@/context/DemoStore";
import { createId, slugify } from "@/lib/format";
import { saveImageBlob } from "@/lib/image-store";
import type { AreaName, ListingStatus, Property, PropertyCategory, PropertyImage, PropertyType } from "@/lib/types";
import { validatePropertyForm } from "@/lib/validation";

const MAX_IMAGES = 7;

export function PropertyEditor({ property }: { property?: Property }) {
  const router = useRouter();
  const { properties, upsertProperty } = useDemoStore();
  const { notify } = useToast();
  const [title, setTitle] = useState(property?.title ?? "");
  const [slug, setSlug] = useState(property?.slug ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [location, setLocation] = useState(property?.location ?? "");
  const [areaName, setAreaName] = useState(property?.areaName ?? "Boisar");
  const [category, setCategory] = useState<PropertyCategory>(property?.category ?? "residential");
  const [type, setType] = useState<PropertyType>(property?.type ?? "apartment");
  const [status, setStatus] = useState<ListingStatus>(property?.status ?? "sale");
  const [price, setPrice] = useState(property ? String(property.price) : "");
  const [areaSqft, setAreaSqft] = useState(property ? String(property.areaSqft) : "");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms ? String(property.bedrooms) : "");
  const [bathrooms, setBathrooms] = useState(property?.bathrooms ? String(property.bathrooms) : "");
  const [amenities, setAmenities] = useState(property?.amenities.join(", ") ?? "");
  const [highlights, setHighlights] = useState(property?.highlights.join(", ") ?? "");
  const [featured, setFeatured] = useState(property?.featured ?? false);
  const [images, setImages] = useState<PropertyImage[]>(property?.images ?? []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const id = useMemo(() => property?.id ?? createId(), [property?.id]);

  async function onFiles(fileList: FileList | null) {
    if (!fileList) return;
    const remaining = MAX_IMAGES - images.length;
    const files = Array.from(fileList).slice(0, remaining);
    const next: PropertyImage[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const imageId = createId();
      await saveImageBlob(imageId, file);
      next.push({
        id: imageId,
        src: `idb:${imageId}`,
        alt: `${title || "Property"} photo`,
      });
    }
    setImages((current) => [...current, ...next]);
    if (fileList.length > remaining) {
      notify(`Up to ${MAX_IMAGES} images per property. Extra files were ignored.`);
    }
  }

  function move(index: number, direction: -1 | 1) {
    setImages((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const copy = [...current];
      const [item] = copy.splice(index, 1);
      copy.splice(target, 0, item);
      return copy;
    });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const values = {
      title,
      slug,
      description,
      location,
      areaName,
      category,
      type,
      status,
      price,
      areaSqft,
      bedrooms,
      bathrooms,
      amenities,
      highlights,
      featured,
    };
    const nextErrors = validatePropertyForm(values);
    const clash = properties.some((item) => item.slug === slug && item.id !== id);
    if (clash) nextErrors.slug = "This slug is already in use.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    const record: Property = {
      id,
      slug: slugify(slug),
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      areaName: areaName as AreaName,
      category,
      type,
      status,
      price: Number(price),
      areaSqft: Number(areaSqft),
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      amenities: amenities.split(",").map((item) => item.trim()).filter(Boolean),
      highlights: highlights.split(",").map((item) => item.trim()).filter(Boolean),
      featured,
      images,
      createdAt: property?.createdAt ?? new Date().toISOString(),
      isSample: false,
    };
    upsertProperty(record);
    notify("Saved in this browser only. This is not a live listing and is not stored on a server.");
    setSaving(false);
    router.push("/admin");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <p className="rounded-lg bg-sky px-3 py-2 text-sm text-navy">
        Demo editor. Images are stored in IndexedDB in this browser (not localStorage). Large
        collections may hit browser storage limits.
      </p>
      <label className="text-sm font-medium text-navy">
        Title
        <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title ? <p className="field-error">{errors.title}</p> : null}
      </label>
      <label className="text-sm font-medium text-navy">
        Slug
        <input
          className="input mt-1"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          onBlur={() => setSlug((value) => slugify(value || title))}
        />
        {errors.slug ? <p className="field-error">{errors.slug}</p> : null}
      </label>
      <label className="text-sm font-medium text-navy">
        Description
        <textarea className="textarea mt-1" value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description ? <p className="field-error">{errors.description}</p> : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-navy">
          Location
          <input className="input mt-1" value={location} onChange={(e) => setLocation(e.target.value)} />
          {errors.location ? <p className="field-error">{errors.location}</p> : null}
        </label>
        <label className="text-sm font-medium text-navy">
          Area
          <select className="select mt-1" value={areaName} onChange={(e) => setAreaName(e.target.value as AreaName)}>
            <option>Boisar</option>
            <option>Tarapur</option>
            <option>Palghar</option>
            <option>Nearby</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Category
          <select className="select mt-1" value={category} onChange={(e) => setCategory(e.target.value as PropertyCategory)}>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Type
          <select className="select mt-1" value={type} onChange={(e) => setType(e.target.value as PropertyType)}>
            <option value="apartment">Apartment</option>
            <option value="independent-house">Independent house</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="shop">Shop</option>
            <option value="office">Office</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Sale or rent
          <select className="select mt-1" value={status} onChange={(e) => setStatus(e.target.value as ListingStatus)}>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Price (₹)
          <input className="input mt-1" value={price} onChange={(e) => setPrice(e.target.value)} />
          {errors.price ? <p className="field-error">{errors.price}</p> : null}
        </label>
        <label className="text-sm font-medium text-navy">
          Area (sq. ft.)
          <input className="input mt-1" value={areaSqft} onChange={(e) => setAreaSqft(e.target.value)} />
          {errors.areaSqft ? <p className="field-error">{errors.areaSqft}</p> : null}
        </label>
        <label className="text-sm font-medium text-navy">
          Bedrooms
          <input className="input mt-1" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
        </label>
        <label className="text-sm font-medium text-navy">
          Bathrooms
          <input className="input mt-1" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
        </label>
      </div>
      <label className="text-sm font-medium text-navy">
        Amenities (comma separated)
        <input className="input mt-1" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
      </label>
      <label className="text-sm font-medium text-navy">
        Highlights (comma separated)
        <input className="input mt-1" value={highlights} onChange={(e) => setHighlights(e.target.value)} />
      </label>
      <label className="flex items-center gap-2 text-sm text-navy">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Featured on homepage
      </label>
      <fieldset>
        <legend className="text-sm font-medium text-navy">Images (up to {MAX_IMAGES})</legend>
        <input
          className="mt-2 block w-full text-sm"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => void onFiles(e.target.files)}
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image, index) => (
            <div key={image.id} className="overflow-hidden rounded-lg border border-line">
              <SmartImage src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
              <div className="flex flex-wrap gap-2 p-2">
                <button type="button" className="btn btn-outline px-2 py-1 text-xs" onClick={() => move(index, -1)}>
                  Up
                </button>
                <button type="button" className="btn btn-outline px-2 py-1 text-xs" onClick={() => move(index, 1)}>
                  Down
                </button>
                <button
                  type="button"
                  className="btn btn-outline px-2 py-1 text-xs"
                  onClick={() => setImages((current) => current.filter((item) => item.id !== image.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="flex gap-3">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save in this browser"}
        </button>
        <button className="btn btn-outline" type="button" onClick={() => router.push("/admin")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
