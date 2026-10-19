"use client";

import Link from "next/link";
import {
  IconBriefcase,
  IconBuilding,
  IconChart,
  IconDocument,
  IconHome,
  IconKey,
} from "@/components/icons";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { useDemoStore } from "@/context/DemoStore";
import { brand, DEMO_NOTICE } from "@/lib/config";
import { locationCopy } from "@/lib/seed-data";
import { generalEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";

const services = [
  { href: "/services#buying", title: "Residential property buying", text: "Help narrowing options in Boisar, Palghar, Tarapur and nearby areas.", icon: IconHome },
  { href: "/services#selling", title: "Property selling assistance", text: "Practical support to present a property and coordinate next steps.", icon: IconKey },
  { href: "/services#investment", title: "Investment consultancy", text: "Local context for Mumbai clients comparing Palghar–Boisar opportunities.", icon: IconChart },
  { href: "/services#commercial", title: "Commercial property", text: "Shops, offices and mixed-use enquiries with clear, measured guidance.", icon: IconBuilding },
  { href: "/services#finance", title: "Property finance assistance", text: "Help with typical paperwork and lender conversations — not a loan guarantee.", icon: IconBriefcase },
  { href: "/services#documentation", title: "Documentation and transaction support", text: "Coordination through paperwork and transaction steps, without legal guarantees.", icon: IconDocument },
];

const steps = [
  { n: "01", title: "Tell us your requirements", text: "Share location, budget, and whether you are buying, selling, renting or exploring finance." },
  { n: "02", title: "Explore suitable properties", text: "Review sample listings here, then speak with the team about current options." },
  { n: "03", title: "Evaluate and verify details", text: "Walk through layout, location and documents. Independent legal checks remain your decision." },
  { n: "04", title: "Get transaction assistance", text: "Receive coordination support. Financing approval and legal outcomes are not guaranteed." },
];

export function HomePage() {
  const { properties, testimonials } = useDemoStore();
  const featured = properties.filter((item) => item.featured).slice(0, 6);

  return (
    <>
      <section className="hero-bg">
        <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow">{brand.tagline}</p>
            <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-navy sm:text-5xl">
              {brand.heroHeading}
            </h1>
            <p className="mt-5 max-w-xl text-muted">{brand.description}</p>
            <p className="mt-4 max-w-xl text-foreground">
              With {brand.experience} of experience in Property & Finance, we provide end-to-end
              assistance—from property search and evaluation to documentation, transaction support
              and finance assistance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/properties">
                Explore properties
              </Link>
              <a
                className="btn btn-navy"
                href={whatsappUrl(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                Talk to our expert
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <SmartImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                alt="Residential building with landscaped entrance"
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -left-5 -bottom-5 hidden w-44 rounded-2xl border border-line bg-white p-4 shadow-card lg:block">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Boisar</p>
              <p className="mt-1 text-sm font-semibold text-navy">Palghar–Boisar corridor</p>
              <p className="mt-1 text-xs text-muted">Focus area for Mumbai investors</p>
            </div>
          </div>
        </div>
        <div className="border-t border-line bg-white">
          <ul className="container-site grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "15+ years of experience",
              "Local property expertise",
              "End-to-end assistance",
              "Buyer & seller support",
            ].map((item) => (
              <li key={item} className="text-sm font-semibold text-navy">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured properties</p>
              <h2 className="mt-2 text-3xl font-bold text-navy">Sample listings in Palghar–Boisar</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">{DEMO_NOTICE}</p>
            </div>
            <Link className="btn btn-outline" href="/properties">
              View all properties
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sky">
        <div className="container-site">
          <p className="eyebrow">Services</p>
          <h2 className="mt-2 text-3xl font-bold text-navy">Guidance across property and finance</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link key={service.href} href={service.href} className="card p-6 hover:border-primary">
                <service.icon className="text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-navy">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Why choose us</p>
            <h2 className="mt-2 text-3xl font-bold text-navy">
              Making property decisions simple, transparent & reliable
            </h2>
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Local market knowledge of Boisar, Tarapur, Palghar and nearby settlements, with
                particular attention to Mumbai clients investing in this corridor.
              </p>
              <p>
                Personalised property guidance, transparent communication, and end-to-end
                transaction assistance — without inflated claims or guaranteed outcomes.
              </p>
            </div>
          </div>
          <blockquote className="border-l-4 border-primary bg-sky p-6 text-navy">
            We keep the process practical: search, evaluate, document, and coordinate. Legal
            verification and lender decisions remain independent of this website.
          </blockquote>
        </div>
      </section>

      <section className="section bg-navy text-white">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">About</p>
            <h2 className="mt-2 text-3xl font-bold">Four Square Properties & Finance Services</h2>
            <p className="mt-4 text-white/80">
              Established to give clients clear, practical guidance for property and finance
              decisions, with {brand.experience} of experience and a client-focused approach across
              the Boisar–Palghar region.
            </p>
            <Link className="btn btn-primary mt-6" href="/about">
              Know more about us
            </Link>
          </div>
          <SmartImage
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"
            alt="Keys and property documents on a table"
            className="aspect-[16/10] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <p className="eyebrow">Investment locations</p>
          <h2 className="mt-2 text-3xl font-bold text-navy">Where clients typically look</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {Object.entries(locationCopy).map(([key, location]) => (
              <article key={key} className="card overflow-hidden">
                <SmartImage src={location.image} alt={location.alt} className="aspect-[16/8] w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-navy">{location.title}</h3>
                  <p className="mt-2 text-sm text-muted">{location.text}</p>
                  <Link className="btn btn-outline mt-4" href={`/properties?area=${key}`}>
                    Explore properties
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sky">
        <div className="container-site">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-2 text-3xl font-bold text-navy">A straightforward path</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="card p-5">
                <span className="text-sm font-bold text-primary">{step.n}</span>
                <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-2 text-3xl font-bold text-navy">Client feedback (placeholders)</h2>
          <p className="mt-2 text-sm text-muted">
            These quotes are labelled placeholders. They are not real reviews.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.id} className="card p-5">
                <blockquote className="text-sm text-foreground">{item.quote}</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-navy">
                  {item.attribution}
                  {item.isPlaceholder ? (
                    <span className="ml-2 text-xs font-normal text-muted">Demo placeholder</span>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold">Ready to find your next property?</h2>
          <div className="flex flex-wrap gap-3">
            <Link className="btn bg-white text-navy hover:bg-white/90" href="/properties">
              Explore properties
            </Link>
            <Link className="btn border-2 border-white bg-transparent text-white hover:bg-white/10" href="/contact">
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
