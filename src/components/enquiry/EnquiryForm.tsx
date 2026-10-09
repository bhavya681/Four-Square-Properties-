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
}: {
  propertyTitle?: string;
  propertySlug?: string;
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
    addEnquiry({
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      enquiryType: values.enquiryType,
      preferredLocation: values.preferredLocation,
      budgetRange: values.budgetRange,
      message: values.message.trim(),
      propertyTitle,
      propertySlug,
    });

    const body = formEnquiryMessage({ ...values, propertyTitle });
    if (enquiryConfig.submitMode === "whatsapp") {
      window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoUrl(`Enquiry from ${values.fullName}`, body);
    }

    setLoading(false);
    setDone(true);
    notify(
      "A message draft was opened. Send it to reach the team. A copy stays in this browser for the demo admin only — nothing was saved on a server.",
    );
  }

  function reset() {
    setValues(emptyEnquiryForm());
    setErrors({});
    setDone(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <p className="text-sm text-muted">
        This form does not send data to a server. On submit it opens WhatsApp or an email draft,
        and stores a copy in your browser for the demo admin panel.
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
        I understand this will open WhatsApp or email with my details, and a demo copy may be stored in this browser.
      </label>
      {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
      {done ? (
        <p className="rounded-lg bg-sky px-3 py-2 text-sm text-navy">
          Draft prepared. Please send the WhatsApp or email message yourself so the team receives it.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Preparing…" : "Send enquiry draft"}
        </button>
        <button className="btn btn-outline" type="button" onClick={reset}>
          Reset
        </button>
      </div>
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
