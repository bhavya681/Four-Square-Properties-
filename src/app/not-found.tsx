import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container-site flex flex-1 flex-col items-start py-20">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-3xl font-bold text-navy">This page is not available</h1>
        <p className="mt-3 max-w-lg text-muted">
          The link may be incorrect, or the listing exists only in another browser’s demo data.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/">
            Home
          </Link>
          <Link className="btn btn-outline" href="/properties">
            Properties
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
