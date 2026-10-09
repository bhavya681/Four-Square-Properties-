# Four Square Properties & Finance Services

Frontend-only website for a real estate and finance consultancy in Palghar–Boisar. Built with Next.js (App Router), React, TypeScript and Tailwind CSS. There is no backend, database or live AI service.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run lint
```

## Routes

- `/` Home
- `/properties` Property search (local filters)
- `/properties/[slug]` Property details
- `/about` About
- `/services` Services
- `/contact` Contact and enquiry form
- `/admin` Demo admin dashboard
- `/admin/new` Add a demo property
- `/admin/edit/[id]` Edit a demo property

## How to edit sample properties

1. Open `/admin` (demonstration only — no real login).
2. Use **Add property** or **Edit**.
3. Upload up to seven images. Previews use object URLs; files are stored in IndexedDB in this browser.
4. Listing fields (except image binaries) are saved in `localStorage`.
5. **Reset demo data** restores the original sample set and clears stored images.

If IndexedDB or localStorage is blocked, the site falls back to the seed listings in `src/lib/seed-data.ts`.

## Demo-only features

- Admin create/edit/delete, featured flags, testimonials and enquiry copies
- Chatbot (rule-based, not a live AI model)
- Form “success” that opens WhatsApp or an email draft
- Sample prices, availability and photographs

None of this is stored on a server or sent to the business unless the visitor actually sends WhatsApp or email.

## Business details still required

- Official Instagram profile URL (`src/lib/config.ts` → `contact.instagramUrl`)
- Confirmed visiting hours
- Real listings and photography to replace sample data
- Genuine testimonials with permission
- Visiting-card scan was not present in this repository; contact details were taken from the project brief

Set Instagram in a single constant. Do not invent a handle.
# Four-Square-Properties-
