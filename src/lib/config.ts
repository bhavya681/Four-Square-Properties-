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

export const contact = {
  phoneDisplay: "+91 99212 48234",
  phoneTel: "919921248234",
  email: "Foursquare2332@gmail.com",
  address:
    "Shop No. B/1, Prashant Complex, Chitralaya, Palghar, Maharashtra – 401506",
  mapsSearchQuery:
    "Shop No. B/1, Prashant Complex, Chitralaya, Palghar, Maharashtra 401506",
  /**
   * Replace this placeholder when the business provides the official Instagram URL.
   * Do not invent a handle.
   */
  instagramUrl: "https://www.instagram.com/",
  instagramIsPlaceholder: true,
  /**
   * Hours are not supplied by the business. Edit this copy when confirmed.
   */
  hoursLabel: "By appointment (placeholder — confirm with the team)",
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

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
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

export const DEMO_NOTICE =
  "Sample demonstration data for this frontend preview. Listings, prices and availability are not live market records.";
