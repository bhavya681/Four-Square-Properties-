import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DemoStoreProvider } from "@/context/DemoStore";
import { ToastProvider } from "@/components/ui/Toast";
import { brand, seo } from "@/lib/config";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.website),
  title: {
    default: seo.defaultTitle,
    template: `%s | ${brand.shortName}`,
  },
  description: seo.defaultDescription,
  openGraph: {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    siteName: seo.siteName,
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [
      { url: "/logo3.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/logo3.png", sizes: "1617x973" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <DemoStoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </DemoStoreProvider>
      </body>
    </html>
  );
}
