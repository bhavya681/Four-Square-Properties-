"use client";

import { brand, contact } from "@/lib/config";

export function ProfileClient() {
  return (
    <article className="container-site py-12">
      <p className="eyebrow">Founder Profile</p>
      <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
        Pramod Kumar Bharti
      </h1>
      <p className="mt-2 text-lg text-primary font-semibold">
        Founder | Four Square Properties & Finance Services
      </p>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-navy">Professional Profile</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Pramod Kumar Bharti is the Founder of Four Square Properties & Finance Services, a real estate and
              financial services management company committed to providing reliable, transparent and customer-focused
              property and finance solutions.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              With over 15 years of professional experience in Real Estate and Finance, he brings extensive knowledge of
              property transactions, real estate management, financial solutions and customer relationship management.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              He holds a Master of Commerce (M.Com) and an MBA in Finance, combining strong academic credentials with
              practical industry experience. As a RERA-registered real estate professional (Registration No.
              A99000028409), he is committed to maintaining the highest standards of professional conduct and regulatory
              compliance.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-navy">Education & Credentials</h2>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  1
                </span>
                <span>Master of Commerce (M.Com)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  2
                </span>
                <span>MBA in Finance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  3
                </span>
                <span>RERA Registered Professional (Registration No. A99000028409)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  4
                </span>
                <span>15+ Years Experience in Real Estate & Finance</span>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-navy">Areas of Expertise</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Property Transactions",
                "Real Estate Management",
                "Financial Solutions",
                "Customer Relationship Management",
                "Investment Advisory",
                "Documentation & Compliance",
                "RERA Compliance",
                "Loan Assistance Coordination",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-sky text-sm font-medium text-navy"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-navy">Contact Information</h2>
            <div className="mt-4 space-y-4 text-muted">
              <p className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
                  </svg>
                </span>
                <span>{contact.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3.5" y="5" width="17" height="14" rx="2" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                </span>
                <span>{contact.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.2" />
                  </svg>
                </span>
                <span>{contact.address}</span>
              </p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-navy">Download Profile</h2>
            <p className="mt-3 text-sm text-muted">
              Download the complete professional profile as a PDF document.
            </p>
            <button
              className="btn btn-primary mt-4 w-full sm:w-auto"
              onClick={() => {
                window.print();
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Profile (Print to PDF)
            </button>
          </div>

          <div className="card p-6 bg-gradient-to-r from-navy to-primary text-white">
            <h2 className="text-xl font-semibold">Four Square Properties & Finance Services</h2>
            <p className="mt-3 text-white/90">
              {brand.description}
            </p>
            <p className="mt-3 text-sm text-white/70">
              {brand.website}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}