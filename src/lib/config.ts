export const brand = {
  name: "Four Square Properties & Finance Services",
  shortName: "Four Square",
  tagline: "Buy • Sell • Invest • Finance",
  heroHeading: "Your Trusted Partner in Property & Finance",
  description:
    "Four Square Properties & Finance Services is a professional real estate and finance consultancy serving Boisar, Tarapur, Palghar and surrounding areas, with a special focus on helping Mumbai clients invest confidently in Palghar–Boisar.",
  experience: "15+ years",
  website: "https://foursquareprofin.com",
  reraNumber: "MahaRERA A51700000001",
} as const;

export const socialLinks = {
  facebook: "https://www.facebook.com/foursquareprofin",
  twitter: "https://twitter.com/squareprofin",
  instagram: "https://www.instagram.com/foursquareprofin/",
  linkedin: "https://www.linkedin.com/in/pramod-bharti-389320209/",
  youtube:
    "https://www.youtube.com/watch?v=aVL8MH841hU&list=PLGXRINPc0_oR7W5W_SOOPNlh5wR31uSQa",
  youtubeChannel: "https://www.youtube.com/@propertiesbhartihub7663/videos",
} as const;

export const contact = {
  phoneDisplay: "+91 99212 48234",
  phoneTel: "919921248234",
  email: "Foursquare2332@gmail.com",
  address:
    "Shop No. B/1, Prashant Complex, Chitralaya, Palghar, Maharashtra – 401506",
  mapsSearchQuery:
    "Shop No. B/1, Prashant Complex, Chitralaya, Palghar, Maharashtra 401506",
  instagramUrl: socialLinks.instagram,
  facebookUrl: socialLinks.facebook,
  twitterUrl: socialLinks.twitter,
  linkedinUrl: socialLinks.linkedin,
  hoursLabel: "Monday – Sunday: 9:30 AM – 8:00 PM",
} as const;

export const enquiryConfig = {
  /**
   * Demo-only: submits to Formspree to email enquiries to foursquare2332@gmail.com
   */
  submitMode: "formspree" as "whatsapp" | "mailto" | "formspree",
  formspreeEndpoint: "https://formspree.io/f/xrblgkna",
};

export const seo = {
  siteName: brand.name,
  defaultTitle: `${brand.name} | Property & Finance Consultancy in Palghar–Boisar`,
  defaultDescription:
    "Real estate and finance consultancy in Boisar, Tarapur and Palghar. Property search, documentation support and finance assistance for local and Mumbai clients.",
  ogImage: "/og-image.svg",
};

export const youtubeConfig = {
  playlistUrl:
    "https://www.youtube.com/watch?v=aVL8MH841hU&list=PLGXRINPc0_oR7W5W_SOOPNlh5wR31uSQa",
  playlistId: "PLGXRINPc0_oR7W5W_SOOPNlh5wR31uSQa",
  channelUrl: "https://www.youtube.com/@propertiesbhartihub7663/videos",
  channelName: "Properties Bharti Hub",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceNav = [
  { href: "/services#buying", label: "Buying a property" },
  { href: "/services#selling", label: "Selling a property" },
  { href: "/services#investment", label: "Investment guidance" },
  { href: "/services#commercial", label: "Residential & commercial" },
  { href: "/services#finance", label: "Finance assistance" },
  { href: "/services#documentation", label: "Documentation support" },
] as const;

export type Video = {
  id: string;
  title: string;
  description?: string;
  location?: "Boisar" | "Palghar" | "General";
  featured?: boolean;
};

/**
 * YouTube channel videos extracted from Four Square / Properties Bharti Hub playlist:
 * https://www.youtube.com/watch?v=aVL8MH841hU&list=PLGXRINPc0_oR7W5W_SOOPNlh5wR31uSQa
 */
export const videos: Video[] = [
  {
    id: "aVL8MH841hU",
    title: "Boisar luxurious flat with premium quality in affordable price",
    description: "Premium quality residential flat in Boisar with modern amenities and budget-friendly pricing. Call +91 99212 48234.",
    location: "Boisar",
    featured: true,
  },
  {
    id: "zwV3mNnVtgE",
    title: "Palghar property near Kelve Beach with affordable price & amenities",
    description: "Serene residential option near scenic Kelve Beach, Palghar with full lifestyle amenities. Call +91 99212 48234.",
    location: "Palghar",
    featured: true,
  },
  {
    id: "SbTJHknzLP8",
    title: "Boisar Spanish Theme Villa at an attractive price point",
    description: "Exclusive Spanish architecture theme luxury villa with private feel in Boisar. Contact +91 99212 48234.",
    location: "Boisar",
    featured: true,
  },
  {
    id: "GEue9w8_n5s",
    title: "Palghar Properties — Luxurious amenities & low cost homes",
    description: "Carefully designed budget homes with contemporary club & community facilities in Palghar. Call +91 99212 48234.",
    location: "Palghar",
    featured: true,
  },
  {
    id: "65Pd7viJ8PA",
    title: "Boisar 1 BHK ₹13 Lakh basic with amenities near bullet train station",
    description: "High investment upside location close to the upcoming Boisar bullet train station corridor. Call +91 99212 48234.",
    location: "Boisar",
    featured: true,
  },
  {
    id: "JByjJ83M0zk",
    title: "Boisar Tata Heaven property with integrated township concept",
    description: "Reputed township living experience with landscaped parks, open areas and complete social infrastructure. Call +91 99212 48234.",
    location: "Boisar",
    featured: true,
  },
  {
    id: "ipOrr9vq84s",
    title: "Boisar township property with 100% loan assistance & amenities",
    description: "Move-in friendly with comprehensive bank loan guidance and full community lifestyle features. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "4AaFy7abV78",
    title: "Boisar premium luxurious property with branded fittings & amenities",
    description: "High-spec finishes, branded bathroom and electrical fittings in a gated residential society. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "lahjO15Kptk",
    title: "Palghar affordable properties — Ready & under-construction options",
    description: "Explore pocket-friendly homes in prime Palghar residential pockets. Call +91 99212 48234.",
    location: "Palghar",
  },
  {
    id: "SrRbqGQF7Kc",
    title: "Boisar property near future bullet train hub with high growth potential",
    description: "Strategic investment pick positioned to benefit from the Mumbai–Ahmedabad bullet train connectivity. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "n4HLl9hEjzs",
    title: "Boisar ready to move properties ₹15 Lakh package deal",
    description: "Ready-to-occupy flats in Boisar with packaged pricing benefits. Contact +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "zgS8kJ6Q8l0",
    title: "Boisar property near railway station — ₹17 Lakh affordable homes",
    description: "Walking or short commute distance from Boisar railway station, ideal for daily Mumbai commuters. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "xem5V4B_zVI",
    title: "Boisar township flats near railway station with community amenities",
    description: "Township living with clean drinking water, children's play area and 24/7 security near Boisar station. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "3KseCypLkos",
    title: "Affordable price flats available in Boisar with family amenities",
    description: "Well-ventilated 1 & 2 BHK apartments in peaceful residential neighbourhoods of Boisar. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "Zr9HePVT274",
    title: "Bungalows & row houses in Boisar with independent plots",
    description: "Spacious independent bungalows and row houses with terrace rights at attractive pricing. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "C_O5rH83Y-0",
    title: "Boisar commercial area property with fully loaded amenities",
    description: "Strategically located near commercial hubs and markets for rental yield and convenience. Call +91 99212 48234.",
    location: "Boisar",
  },
  {
    id: "NRjfuDcsN_o",
    title: "Palghar marketable location property — Premium quality & fair price",
    description: "Central Palghar address close to schools, hospitals and markets with top structural quality. Call +91 99212 48234.",
    location: "Palghar",
  },
  {
    id: "GHeAGacEoYw",
    title: "Boisar & Palghar property showcase — Direct builder guidance & zero brokerage",
    description: "Comprehensive walkthrough of local projects and buyer consultancy. Call +91 99212 48234.",
    location: "General",
  },
];

export const DEMO_NOTICE =
  "Sample demonstration data for this frontend preview. Listings, prices and availability are not live market records.";
