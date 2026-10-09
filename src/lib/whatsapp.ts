import { contact } from "./config";

export function whatsappUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${contact.phoneTel}?text=${encoded}`;
}

export function propertyEnquiryMessage(title: string, pageUrl?: string) {
  const lines = [
    "Hello Four Square Properties & Finance Services,",
    `I would like to enquire about: ${title}.`,
  ];
  if (pageUrl) {
    lines.push(`Property page: ${pageUrl}`);
  }
  lines.push("Please share more details.");
  return lines.join("\n");
}

export function generalEnquiryMessage() {
  return "Hello Four Square Properties & Finance Services, I would like to discuss a property or finance requirement.";
}

export function formEnquiryMessage(fields: {
  fullName: string;
  phone: string;
  email: string;
  enquiryType: string;
  preferredLocation: string;
  budgetRange: string;
  message: string;
  propertyTitle?: string;
}) {
  return [
    "Hello Four Square Properties & Finance Services,",
    "I would like to submit an enquiry (sent from the website form).",
    `Name: ${fields.fullName}`,
    `Phone: ${fields.phone}`,
    `Email: ${fields.email}`,
    `Enquiry type: ${fields.enquiryType}`,
    `Preferred location: ${fields.preferredLocation}`,
    `Budget range: ${fields.budgetRange}`,
    fields.propertyTitle ? `Property: ${fields.propertyTitle}` : "",
    `Message: ${fields.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${encodeURIComponent("Foursquare2332@gmail.com")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
