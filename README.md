# Colorado Tech Rescue — Website

A two-part project:

- **`/frontend`** — React (Vite) website: Home, Services, Recent Work/Gallery, Reviews, About, and Contact pages.
- **`/backend`** — Node.js/Express API that emails contact/appointment-request submissions to **Coloradotechrescue@gmail.com** and serves editable content (reviews, gallery) as JSON.

No separate "Book Appointment" calendar flow is included, per request — appointment-style
questions (device, service type, preferred date/time, drop-off vs. in-home, problem description,
optional photo) all live on the **Contact page**, and submitting sends one email with everything
in it. Every page has a "Contact Us" button in the top nav that leads there.

---

## 1. Running it locally

You need [Node.js](https://nodejs.org) 18+ installed. Open two terminals.

### Backend (API + email)

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `BUSINESS_EMAIL` — where requests are delivered (defaults to Coloradotechrescue@gmail.com)
- `GMAIL_USER` — the Gmail address that will *send* the email
- `GMAIL_APP_PASSWORD` — a 16-character **App Password**, NOT your normal Gmail password.
  Create one at https://myaccount.google.com/apppasswords (requires 2-Step Verification turned on).

Then start it:

```bash
npm run dev      # auto-restarts on changes (uses nodemon)
# or
npm start
```

The API runs at `http://localhost:5000`.

### Frontend (website)

```bash
cd frontend
npm install
cp .env.example .env    # already points at http://localhost:5000/api, fine for local dev
npm run dev
```

The site runs at `http://localhost:5173`. Submitting the Contact form will hit the local backend
and send a real email if your `.env` is filled in correctly.

---

## 2. Deploying it

- **Frontend**: `npm run build` inside `/frontend` produces a static `dist/` folder — deploy it to
  Netlify, Vercel, or any static host. Set `VITE_API_URL` (in that host's environment settings) to
  your live backend's URL, e.g. `https://api.coloradotechrescue.com/api`.
- **Backend**: deploy `/backend` to any Node host (Render, Railway, a VPS, etc). Set the same
  environment variables from `.env.example` in that host's dashboard — never commit a real `.env`
  file. Set `ALLOWED_ORIGINS` to your live frontend URL so the API only accepts requests from your
  site.

---

## 3. Updating content without a developer

Two files control content that changes often — edit them directly, no code changes needed:

- `backend/data/reviews.json` — Google rating, review count, and the testimonials shown on the
  Home and Reviews pages.
- `backend/data/gallery.json` — the "Recent Work" items shown on the Gallery page (category +
  title). Add a new object to the `items` array for each new completed job.

Business info that appears site-wide (phone, email, hours, service area) is in one place:
`frontend/src/data/siteConfig.js`.

Editing any of these files takes effect immediately on refresh — the JSON files don't require a
rebuild since the backend reads them fresh on each request; `siteConfig.js` requires re-running
`npm run build` for the frontend since it's compiled into the site.

---

## 4. Project structure

```
colorado-tech-rescue/
├── backend/
│   ├── server.js                  # Express app entry point
│   ├── routes/                    # /api/contact, /api/content
│   ├── controllers/                # Email-sending logic (Nodemailer)
│   ├── data/                       # Editable JSON: reviews.json, gallery.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── pages/                  # Home, Services, Gallery, Reviews, About, Contact, NotFound
    │   ├── components/              # Navbar, Footer, ServiceCard, TestimonialCard, etc.
    │   ├── data/siteConfig.js       # Business info + service list, used across the site
    │   └── assets/                  # Your logo files
    └── .env.example
```

---

## 5. What's next / not included yet

- Real photos in the Gallery grid (currently styled placeholder tiles — drop in real photos and
  swap the placeholder markup in `GalleryCard.jsx` whenever you have a batch ready).
- Live Google Reviews pulled automatically (currently curated testimonials in `reviews.json` —
  pulling live reviews requires a Google Business Profile API integration, which needs a Google
  Cloud project and API key tied to your business listing).
- A full non-technical admin panel (right now, content updates are done by editing the two JSON
  files above — ask your developer if you'd like a password-protected page to edit these through
  a browser instead).
