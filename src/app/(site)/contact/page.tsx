import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconPin,
  IconTwitter,
  IconWhatsApp,
  IconYouTube,
} from "@/components/icons";
import { contact, socialLinks } from "@/lib/config";
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
          className="card p-5 hover:border-[#25D366] transition group"
          href={whatsappUrl(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWhatsApp className="text-[#25D366] group-hover:scale-110 transition-transform" />
          <h2 className="mt-3 font-semibold text-navy">WhatsApp</h2>
          <p className="text-muted">Direct chat: {contact.phoneDisplay}</p>
        </a>
        <a
          className="card p-5 hover:border-pink-500 transition group"
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconInstagram className="text-pink-600 group-hover:scale-110 transition-transform" />
          <h2 className="mt-3 font-semibold text-navy">Instagram</h2>
          <p className="text-muted">@foursquareprofin</p>
        </a>
        <a
          className="card p-5 hover:border-[#1877F2] transition group"
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconFacebook className="text-[#1877F2] group-hover:scale-110 transition-transform" />
          <h2 className="mt-3 font-semibold text-navy">Facebook</h2>
          <p className="text-muted">facebook.com/foursquareprofin</p>
        </a>
        <a
          className="card p-5 hover:border-[#0A66C2] transition group"
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconLinkedIn className="text-[#0A66C2] group-hover:scale-110 transition-transform" />
          <h2 className="mt-3 font-semibold text-navy">LinkedIn</h2>
          <p className="text-muted">Pramod Bharti (Founder &amp; Consultant)</p>
        </a>
        <a
          className="card p-5 hover:border-black transition group"
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconTwitter className="text-black group-hover:scale-110 transition-transform" />
          <h2 className="mt-3 font-semibold text-navy">Twitter / X</h2>
          <p className="text-muted">@squareprofin</p>
        </a>
        <a
          className="card p-5 hover:border-red-600 transition group"
          href={socialLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconYouTube className="text-red-600 group-hover:scale-110 transition-transform" />
          <h2 className="mt-3 font-semibold text-navy">YouTube Video Channel</h2>
          <p className="text-muted">Watch video tours &amp; project walkthroughs</p>
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
