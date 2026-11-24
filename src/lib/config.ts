export const brand = {
  name: "Four Square Properties & Finance Services",
  shortName: "Four Square",
  tagline: "Buy • Sell • Invest • Finance",
  heroHeading: "Your Trusted Partner in Property & Finance",
  description:
    "Four Square Properties & Finance Services is a professional real estate and finance consultancy serving Boisar, Tarapur, Palghar and surrounding areas, with a special focus on helping Mumbai clients invest confidently in Palghar–Boisar.",
  experience: "15+ years",
  website: "https://www.foursquareprofin.online/",
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
  { href: "/profile", label: "Profile" },
  { href: "/feedback", label: "Feedback" },
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

export type VideoReview = {
  videoId: string;
  title: string;
  description?: string;
  location?: "Boisar" | "Palghar" | "General";
  type: "video" | "shorts";
  url: string;
  thumbnail?: string;
  rating: number;
  totalReviews: number;
  comments: VideoComment[];
};

export type VideoComment = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  isVerified?: boolean;
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

/**
 * Video Reviews with ratings, comments, and user feedback
 * Add more videos here as needed - each can have multiple comments with ratings
 */
export const videoReviews: VideoReview[] = [
  // {
  //   videoId: "aVL8MH841hU",
  //   title: "Boisar Luxurious Flat - Premium Quality at Affordable Price",
  //   description: "Premium quality residential flat in Boisar with modern amenities and budget-friendly pricing.",
  //   location: "Boisar",
  //   type: "video",
  //   url: "https://www.youtube.com/watch?v=aVL8MH841hU",
  //   thumbnail: "https://img.youtube.com/vi/aVL8MH841hU/hqdefault.jpg",
  //   rating: 4.8,
  //   totalReviews: 124,
  //   comments: [
  //     {
  //       id: "c1",
  //       author: "Rajesh Sharma",
  //       avatar: "RS",
  //       date: "2 weeks ago",
  //       rating: 5,
  //       text: "Excellent property tour! The Boisar flat showcased has great amenities and the pricing is very competitive. Pramod sir explained everything clearly.",
  //       likes: 24,
  //       isVerified: true,
  //     },
  //     {
  //       id: "c2",
  //       author: "Priya Patel",
  //       avatar: "PP",
  //       date: "1 month ago",
  //       rating: 5,
  //       text: "Very informative video about Palghar properties near Kelve Beach. The locality guide helped me understand the area better. Highly recommended for Mumbai investors!",
  //       likes: 18,
  //       isVerified: true,
  //     },
  //     {
  //       id: "c3",
  //       author: "Amit Kumar",
  //       avatar: "AK",
  //       date: "3 weeks ago",
  //       rating: 4,
  //       text: "Good walkthrough of the Spanish Theme Villa. Would love to see more interior shots. The zero brokerage claim is impressive if true.",
  //       likes: 12,
  //     },
  //     {
  //       id: "c4",
  //       author: "Sunita Deshmukh",
  //       avatar: "SD",
  //       date: "1 week ago",
  //       rating: 5,
  //       text: "Finally a genuine property consultant who doesn't push fake promises. Pramod Bharti's 15+ years experience shows in his knowledge. Trustworthy!",
  //       likes: 31,
  //       isVerified: true,
  //     },
  //     {
  //       id: "c5",
  //       author: "Vikram Singh",
  //       avatar: "VS",
  //       date: "2 days ago",
  //       rating: 5,
  //       text: "The bullet train corridor insight was very valuable. This is exactly the kind of local knowledge Mumbai investors need. Subscribed to the channel!",
  //       likes: 15,
  //     },
  //   ],
  // },
  {
    videoId: "0gXgRICLUVE",
    title: "Boisar Property Investment Opportunity - Shorts",
    description: "Quick overview of prime investment property in Boisar with high growth potential near bullet train corridor.",
    location: "Boisar",
    type: "shorts",
    url: "https://youtube.com/shorts/0gXgRICLUVE",
    thumbnail: "https://img.youtube.com/vi/0gXgRICLUVE/hqdefault.jpg",
    rating: 4.9,
    totalReviews: 87,
    comments: [
      {
        id: "sc1",
        author: "Deepak Jain",
        avatar: "DJ",
        date: "1 day ago",
        rating: 5,
        text: "Amazing short! Crisp and informative. The location near bullet train is a game changer for investment.",
        likes: 45,
        isVerified: true,
      },
      {
        id: "sc2",
        author: "Meera Nair",
        avatar: "MN",
        date: "3 hours ago",
        rating: 5,
        text: "Love the short format - quick decision making info. Will contact for site visit!",
        likes: 23,
      },
      {
        id: "sc3",
        author: "Rohit Gupta",
        avatar: "RG",
        date: "5 hours ago",
        rating: 4,
        text: "Good overview. Would like to see more details on pricing and payment plans.",
        likes: 12,
      },
      {
        id: "sc4",
        author: "Kavya Reddy",
        avatar: "KR",
        date: "2 hours ago",
        rating: 5,
        text: "Perfect for busy professionals. Short, sweet, and covers all key points. Great work!",
        likes: 19,
        isVerified: true,
      },
    ],
  },
];

export const DEMO_NOTICE =
  "Sample demonstration data for this frontend preview. Listings, prices and availability are not live market records.";
