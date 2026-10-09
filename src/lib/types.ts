export type ListingStatus = "sale" | "rent";
export type PropertyCategory = "residential" | "commercial";
export type PropertyType =
  | "apartment"
  | "independent-house"
  | "villa"
  | "plot"
  | "shop"
  | "office";
export type AreaName = "Boisar" | "Tarapur" | "Palghar" | "Nearby";

export type PropertyImage = {
  id: string;
  src: string;
  alt: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  areaName: AreaName;
  category: PropertyCategory;
  type: PropertyType;
  status: ListingStatus;
  price: number;
  areaSqft: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities: string[];
  highlights: string[];
  featured: boolean;
  images: PropertyImage[];
  createdAt: string;
  isSample: boolean;
};

export type Enquiry = {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  enquiryType: string;
  preferredLocation: string;
  budgetRange: string;
  message: string;
  propertyTitle?: string;
  propertySlug?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  isPlaceholder: boolean;
};

export type PropertyFilters = {
  query: string;
  status: "all" | ListingStatus;
  category: "all" | PropertyCategory;
  type: "all" | PropertyType;
  area: "all" | AreaName;
  minPrice: string;
  maxPrice: string;
  bedrooms: "all" | "1" | "2" | "3" | "4";
  sort: "recent" | "price-asc" | "price-desc";
};
