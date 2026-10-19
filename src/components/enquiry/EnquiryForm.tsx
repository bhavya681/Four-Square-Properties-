"use client";

import { useState } from "react";
import { useDemoStore } from "@/context/DemoStore";
import { useToast } from "@/components/ui/Toast";
import { enquiryConfig } from "@/lib/config";
import {
  emptyEnquiryForm,
  validateEnquiry,
  type EnquiryFormValues,
} from "@/lib/validation";
import { formEnquiryMessage, mailtoUrl, whatsappUrl } from "@/lib/whatsapp";

const enquiryTypes = [
  "Buy a property",
  "Sell a property",
  "Investment guidance",
  "Finance assistance",
  "Commercial property",
  "General enquiry",
];

const locations = ["Boisar", "Tarapur", "Palghar", "Nearby areas", "Not sure yet"];
const budgets = [
  "Under ₹20 lakh",
  "₹20–40 lakh",
  "₹40–70 lakh",
  "₹70 lakh – ₹1 crore",
  "Above ₹1 crore",
  "Rental budget",
];

export function EnquiryForm({
  propertyTitle,
  propertySlug,
  renderActions,
  onSuccess,
}: {
  propertyTitle?: string;
  propertySlug?: string;
  renderActions?: (opts: {
    loading: boolean;
    done: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
  }) => React.ReactNode;
  onSuccess?: () => void;
}) {
  const { addEnquiry } = useDemoStore();
  const { notify } = useToast();
  const [values, setValues] = useState<EnquiryFormValues>(emptyEnquiryForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function update<K extends keyof EnquiryFormValues>(key: K, value: EnquiryFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    try {
      const body = formEnquiryMessage({ ...values, propertyTitle });
      const formData = new FormData();
      formData.append("name", values.fullName.trim());
      formData.append("phone", values.phone.trim());
      formData.append("email", values.email.trim());
      formData.append("enquiryType", values.enquiryType);
      formData.append("preferredLocation", values.preferredLocation);
      formData.append("budgetRange", values.budgetRange);
      formData.append("message", values.message.trim());
      if (propertyTitle) formData.append("property", propertyTitle);
      formData.append("_replyto", values.email.trim());

      await fetch(enquiryConfig.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      addEnquiry({

      propertySlug,
    });

    setLoading(false);
    setDone(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("contact-popup-seen", "1");
    }
    onSuccess?.();
    notify("Enquiry sent successfully. We'll get back to you soon.");
  } catch (error) {
    setLoading(false);
    notify("Failed to send enquiry. Please try again or call us directly.");
  }
    notify("Enquiry sent successfully. We'll get back to you soon.");
  }

  function reset() {
    setValues(emptyEnquiryForm());
    setErrors({});
    setDone(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <p className="text-sm text-muted">
        Your enquiry will be sent directly to foursquare2332@gmail.com.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName}>
          <input
            className="input"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <input
            className="input"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            className="input"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
        <Field label="Enquiry type" error={errors.enquiryType}>
          <select
            className="select"
            value={values.enquiryType}
            onChange={(e) => update("enquiryType", e.target.value)}
          >
            <option value="">Select</option>
            {enquiryTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred location" error={errors.preferredLocation}>
          <select
            className="select"
            value={values.preferredLocation}
            onChange={(e) => update("preferredLocation", e.target.value)}
          >
            <option value="">Select</option>
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget range" error={errors.budgetRange}>
          <select
            className="select"
            value={values.budgetRange}
            onChange={(e) => update("budgetRange", e.target.value)}
          >
            <option value="">Select</option>
            {budgets.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message}>
        <textarea
          className="textarea"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </Field>
      <label className="flex items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1"
        />
        I understand this will send my enquiry directly to foursquare2332@gmail.com, and a demo copy may be stored in this browser.
      </label>
      {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
      {done ? (
        <p className="flex items-center gap-2 rounded-lg bg-sky px-3 py-2 text-sm text-navy">
          <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Draft prepared. Please send the WhatsApp or email message yourself so the team receives it.
        </p>
      ) : null}
      {renderActions
        ? renderActions({ loading, done, onSubmit, onReset: reset })
        : (
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary px-5" type="submit" disabled={loading}>
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.2-8.6" />
                  </svg>
                  Preparing…
                </span>
              ) : (
                "Send enquiry draft"
              )}
            </button>
            <button className="btn btn-outline px-5" type="button" onClick={reset} disabled={loading}>
              Reset
            </button>
          </div>
        )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-navy">
      {label}
      <div className="mt-1">{children}</div>
      {error ? <p className="field-error">{error}</p> : null}
    </label>
  );
}
