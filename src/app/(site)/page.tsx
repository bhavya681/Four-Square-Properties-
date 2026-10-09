import { HomePage } from "@/components/home/HomePage";
import { seo } from "@/lib/config";

export const metadata = {
  title: seo.defaultTitle,
  description: seo.defaultDescription,
};

export default function Page() {
  return <HomePage />;
}
