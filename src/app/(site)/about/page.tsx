import Link from "next/link";
import { brand, contact } from "@/lib/config";

export const metadata = {
  title: "About Us",
  description:
    "Four Square Properties & Finance Services offers practical property and finance guidance in Boisar, Palghar and Tarapur.",
};

export default function AboutPage() {
  return (
    <article className="container-site py-12">
      <p className="eyebrow">About us</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-bold text-navy sm:text-4xl">
        Making property decisions simple, transparent & reliable
      </h1>
      <div className="mt-6 max-w-3xl space-y-4 text-muted">
        <p>
          Four Square Properties & Finance Services was established with a simple objective: to
          provide clients with clear, practical and dependable guidance for property and finance
          decisions.
        </p>
        <p>
          With {brand.experience} of experience in Property & Finance, we help clients navigate
          property search, evaluation, documentation, transaction support and finance assistance.
        </p>
        <p>
          Based in the Boisar–Palghar region, we serve local customers and Mumbai clients looking to
          explore property opportunities in the surrounding areas.
        </p>
      </div>
      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-navy">Our story</h2>
          <p className="mt-3 text-muted">
            The practice grew from day-to-day work with buyers, sellers and people who needed
            finance-related coordination — not from awards or inflated metrics. We keep claims
            limited to what the business can stand behind: local knowledge and patient guidance.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-navy">Our approach</h2>
          <p className="mt-3 text-muted">
            Listen first, then match requirements to realistic options. We explain trade-offs in
            plain language and do not promise investment returns or guaranteed loan approval.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-navy">Service areas</h2>
          <p className="mt-3 text-muted">
            Boisar, Tarapur, Palghar and nearby settlements, with a particular focus on Mumbai
            clients investing in the Palghar–Boisar corridor.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-navy">Transparent communication</h2>
          <p className="mt-3 text-muted">
            Sample listings on this website are demonstration data. Live availability, documents and
            pricing are confirmed in conversation with the team.
          </p>
        </div>
      </section>
      <section className="mt-12 card p-6">
        <h2 className="text-xl font-semibold text-navy">Property and finance expertise</h2>
        <p className="mt-3 text-muted">
          {brand.experience} working across residential and commercial enquiries, plus finance
          assistance such as helping clients understand typical paperwork. Lender decisions remain
          with banks and housing-finance companies.
        </p>
        <p className="mt-4 text-sm text-muted">Office: {contact.address}</p>
        <Link className="btn btn-primary mt-6" href="/contact">
          Contact the team
        </Link>
      </section>
    </article>
  );
}
