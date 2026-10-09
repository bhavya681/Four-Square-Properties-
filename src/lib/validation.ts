export type FieldErrors = Record<string, string>;

const phonePattern = /^[0-9+\-\s()]{8,18}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EnquiryFormValues = {
  fullName: string;
  phone: string;
  email: string;
  enquiryType: string;
  preferredLocation: string;
  budgetRange: string;
  message: string;
  consent: boolean;
};

export const emptyEnquiryForm = (): EnquiryFormValues => ({
  fullName: "",
  phone: "",
  email: "",
  enquiryType: "",
  preferredLocation: "",
  budgetRange: "",
  message: "",
  consent: false,
});

export function validateEnquiry(values: EnquiryFormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.enquiryType) {
    errors.enquiryType = "Select an enquiry type.";
  }
  if (!values.preferredLocation) {
    errors.preferredLocation = "Select a preferred location.";
  }
  if (!values.budgetRange) {
    errors.budgetRange = "Select a budget range.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Add a short message (at least 10 characters).";
  }
  if (!values.consent) {
    errors.consent = "Please confirm you are ready to share these details over WhatsApp or email.";
  }
  return errors;
}

export type PropertyFormValues = {
  title: string;
  slug: string;
  description: string;
  location: string;
  areaName: string;
  category: string;
  type: string;
  status: string;
  price: string;
  areaSqft: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string;
  highlights: string;
  featured: boolean;
};

export function validatePropertyForm(values: PropertyFormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (values.title.trim().length < 4) errors.title = "Enter a listing title.";
  if (!values.slug.trim()) errors.slug = "Enter a URL slug.";
  if (values.description.trim().length < 20) {
    errors.description = "Add a short overview (at least 20 characters).";
  }
  if (values.location.trim().length < 3) errors.location = "Enter a location.";
  if (!values.areaName) errors.areaName = "Select an area.";
  if (!values.category) errors.category = "Select residential or commercial.";
  if (!values.type) errors.type = "Select a property type.";
  if (!values.status) errors.status = "Select sale or rent.";
  const price = Number(values.price);
  if (!Number.isFinite(price) || price <= 0) errors.price = "Enter a valid price.";
  const area = Number(values.areaSqft);
  if (!Number.isFinite(area) || area <= 0) errors.areaSqft = "Enter area in sq. ft.";
  return errors;
}
