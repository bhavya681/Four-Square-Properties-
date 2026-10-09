import Link from "next/link";

export const metadata = {
  title: "Services",
  description:
    "Buying, selling, investment guidance, commercial property, finance assistance and documentation support in Palghar–Boisar.",
};

const services = [
  {
    id: "buying",
    title: "Buying a property",
    process: ["Share budget, location and timeline.", "Review suitable options.", "Visit and evaluate details.", "Coordinate next steps towards a decision."],
    help: "We help you compare residential options in Boisar, Palghar, Tarapur and nearby areas, including apartments, houses and plots.",
  },
  {
    id: "selling",
    title: "Selling a property",
    process: ["Understand the property and your expectations.", "Prepare listing information.", "Handle buyer enquiries.", "Support documentation around a sale."],
    help: "Selling assistance is about presentation, enquiry handling and coordination — not a guaranteed sale price or timeline.",
  },
  {
    id: "investment",
    title: "Property investment guidance",
    process: ["Clarify whether you need end-use, rental or a longer hold.", "Look at localities that match that brief.", "Review practical constraints such as access and documentation.", "Decide with your own advisors."],
    help: "Guidance for Mumbai clients comparing Palghar–Boisar. We do not promise returns, occupancy or appreciation.",
  },
  {
    id: "commercial",
    title: "Residential and commercial properties",
    process: ["Identify the use: home, shop, office or land.", "Filter by location and budget.", "Inspect and discuss trade-offs.", "Enquire for current options."],
    help: "Support across homes and commercial formats such as shops and small offices. Listings on this site are samples unless confirmed.",
  },
  {
    id: "finance",
    title: "Property finance assistance",
    process: ["Understand the requirement.", "Outline typical documents lenders often request.", "Connect you with the conversation you need.", "You complete lender processes independently."],
    help: "Finance assistance is support, not a loan product and not an approval. Eligibility is decided by the lender.",
  },
  {
    id: "documentation",
    title: "Documentation and transaction coordination",
    process: ["List the papers usually required.", "Help you gather and track them.", "Coordinate with other parties where appropriate.", "Keep communication clear through the transaction."],
    help: "We coordinate; we do not replace a lawyer or guarantee that a title is clear. Independent legal review is recommended.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container-site py-12">
      <p className="eyebrow">Services</p>
      <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">How we can help</h1>
      <p className="mt-4 max-w-2xl text-muted">
        End-to-end assistance around search, evaluation, paperwork and finance conversations. Nothing
        here is a guarantee of legal clearance, loan sanction or investment performance.
      </p>
      <div className="mt-10 space-y-8">
        {services.map((service) => (
          <section id={service.id} key={service.id} className="card scroll-mt-24 p-6">
            <h2 className="text-2xl font-semibold text-navy">{service.title}</h2>
            <p className="mt-3 text-muted">{service.help}</p>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-accent">Typical process</h3>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
              {service.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <Link className="btn btn-primary mt-6" href="/contact">
              Enquire about this service
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
