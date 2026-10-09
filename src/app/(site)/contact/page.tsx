import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { IconInstagram, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/icons";
import { contact } from "@/lib/config";
import { generalEnquiryMessage, mapsEmbedUrl, mapsSearchUrl, whatsappUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Four Square Properties & Finance Services in Palghar for property and finance assistance.",
};

export default function ContactPage() {
  return (
    <div className="container-site py-12">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Speak with the team</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Use the details below or send an enquiry draft. The map search is based on the published
        address and is not a verified GPS pin.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <a className="card p-5" href={`tel:+${contact.phoneTel}`}>
          <IconPhone className="text-primary" />
          <h2 className="mt-3 font-semibold text-navy">Phone</h2>
          <p className="text-muted">{contact.phoneDisplay}</p>
        </a>
        <a className="card p-5" href={`mailto:${contact.email}`}>
          <IconMail className="text-primary" />
          <h2 className="mt-3 font-semibold text-navy">Email</h2>
          <p className="text-muted">{contact.email}</p>
        </a>
        <a
          className="card p-5"
          href={whatsappUrl(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWhatsApp className="text-primary" />
          <h2 className="mt-3 font-semibold text-navy">WhatsApp</h2>
          <p className="text-muted">Message {contact.phoneDisplay}</p>
        </a>
        <a className="card p-5" href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
          <IconInstagram className="text-primary" />
          <h2 className="mt-3 font-semibold text-navy">Instagram</h2>
          <p className="text-muted">
            {contact.instagramIsPlaceholder
              ? "Profile URL not supplied yet — placeholder link in config."
              : "Open Instagram"}
          </p>
        </a>
      </div>
      <div className="mt-6 card p-5">
        <div className="flex gap-2 text-navy">
          <IconPin />
          <div>
            <h2 className="font-semibold">Office address</h2>
            <p className="mt-1 text-muted">{contact.address}</p>
            <a
              className="mt-2 inline-block text-sm text-primary"
              href={mapsSearchUrl(contact.mapsSearchQuery)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps (address search)
            </a>
            <p className="mt-3 text-sm text-muted">Hours: {contact.hoursLabel}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-navy">Enquiry form</h2>
          <div className="mt-4">
            <EnquiryForm />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-navy">Map search</h2>
          <p className="mt-2 text-sm text-muted">
            Embedded search for Prashant Complex, Chitralaya, Palghar. Confirm the shop location with
            the team before visiting.
          </p>
          <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Google Maps search for the published office address"
              src={mapsEmbedUrl(contact.mapsSearchQuery)}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
