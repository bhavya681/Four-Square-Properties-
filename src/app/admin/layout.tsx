import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-sky/40">
      <header className="border-b border-line bg-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-3 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="relative block h-8 w-8 shrink-0">
              <Image
                src="/logo2.png"
                alt="Demo admin"
                fill
                sizes="32px"
                className="object-contain"
              />
            </span>
            <span className="text-sm font-semibold text-navy">Demo admin</span>
          </Link>
          <nav className="flex flex-wrap gap-3 text-sm font-medium text-navy">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/new">Add property</Link>
            <Link href="/">View website</Link>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
