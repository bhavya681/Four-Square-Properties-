import { VideosGalleryPage } from "@/components/video/VideosGalleryPage";
import { seo, youtubeConfig } from "@/lib/config";

export const metadata = {
  title: `Property Video Walkthroughs | ${seo.siteName}`,
  description:
    "Explore our complete collection of real estate tours, residential apartments, bungalows, and locality guides in Boisar and Palghar from our YouTube channel.",
};

export default function VideosPage() {
  return <VideosGalleryPage />;
}
