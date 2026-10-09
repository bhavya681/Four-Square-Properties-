"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createId } from "@/lib/format";
import {
  loadEnquiries,
  loadProperties,
  loadTestimonials,
  resetDemoData,
  saveEnquiries,
  saveProperties,
  saveTestimonials,
} from "@/lib/storage";
import { seedProperties, seedTestimonials } from "@/lib/seed-data";
import type { Enquiry, Property, Testimonial } from "@/lib/types";

type DemoStore = {
  ready: boolean;
  properties: Property[];
  enquiries: Enquiry[];
  testimonials: Testimonial[];
  upsertProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  setFeatured: (id: string, featured: boolean) => void;
  setStatus: (id: string, status: Property["status"]) => void;
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt">) => void;
  saveTestimonials: (items: Testimonial[]) => void;
  reset: () => Promise<void>;
};

const Context = createContext<DemoStore | null>(null);

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [ready] = useState(true);
  const [properties, setProperties] = useState<Property[]>(() => loadProperties());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => loadEnquiries());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadTestimonials());

  useEffect(() => {
    if (ready) saveProperties(properties);
  }, [properties, ready]);

  useEffect(() => {
    if (ready) saveEnquiries(enquiries);
  }, [enquiries, ready]);

  useEffect(() => {
    if (ready) saveTestimonials(testimonials);
  }, [testimonials, ready]);

  const upsertProperty = useCallback((property: Property) => {
    setProperties((current) => {
      const index = current.findIndex((item) => item.id === property.id);
      if (index === -1) return [property, ...current];
      const next = [...current];
      next[index] = property;
      return next;
    });
  }, []);

  const deleteProperty = useCallback((id: string) => {
    setProperties((current) => current.filter((item) => item.id !== id));
  }, []);

  const setFeatured = useCallback((id: string, featured: boolean) => {
    setProperties((current) =>
      current.map((item) => (item.id === id ? { ...item, featured } : item)),
    );
  }, []);

  const setStatus = useCallback((id: string, status: Property["status"]) => {
    setProperties((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }, []);

  const addEnquiry = useCallback((enquiry: Omit<Enquiry, "id" | "createdAt">) => {
    const record: Enquiry = {
      ...enquiry,
      id: createId(),
      createdAt: new Date().toISOString(),
    };
    setEnquiries((current) => [record, ...current].slice(0, 50));
  }, []);

  const saveTestimonialsState = useCallback((items: Testimonial[]) => {
    setTestimonials(items);
  }, []);

  const reset = useCallback(async () => {
    await resetDemoData();
    setProperties(seedProperties);
    setEnquiries([]);
    setTestimonials(seedTestimonials);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      properties,
      enquiries,
      testimonials,
      upsertProperty,
      deleteProperty,
      setFeatured,
      setStatus,
      addEnquiry,
      saveTestimonials: saveTestimonialsState,
      reset,
    }),
    [
      ready,
      properties,
      enquiries,
      testimonials,
      upsertProperty,
      deleteProperty,
      setFeatured,
      setStatus,
      addEnquiry,
      saveTestimonialsState,
      reset,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useDemoStore() {
  const store = useContext(Context);
  if (!store) {
    throw new Error("useDemoStore must be used within DemoStoreProvider");
  }
  return store;
}
