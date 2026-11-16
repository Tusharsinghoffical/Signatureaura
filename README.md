# Signature Aura Developers · Luxury Real Estate Platform

Next.js 15 (App Router) luxury real estate showcase and lead-to-WhatsApp advisory platform, configured for zero-friction deployment on **Vercel**.

## Vercel Deployment Setup

### Option 1: Deploy via GitHub + Vercel Dashboard (Recommended)
1. Push this repository to your GitHub account.
2. Open [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep the auto-detected **Next.js** framework settings (pre-configured via `vercel.json`):
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (default)
   - **Region:** `bom1` (Mumbai, India)
4. *(Optional)* Add `NEXT_PUBLIC_SITE_URL` in **Project Settings → Environment Variables** if using a custom domain (otherwise Vercel automatically uses `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`).
5. Click **Deploy**.

### Option 2: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Features Included
- **Flagship Projects:** Signature Aura Baner (2 BHK starting ₹ 55 Lakh) & Aura Sky Mumbai (starting ₹ 85 Lakh)
- **Instant WhatsApp Lead Routing:** All contact, callback, site-visit, and brochure forms redirect directly to WhatsApp (`+91 88056 21111`)
- **Client-Side Persistence & AI Property Assistant:** Zero external database required (`localStorage` + client RAG knowledge base)
- **Vercel Ready:** Native Next.js Image Optimization (`AVIF`/`WebP`), `@vercel/analytics`, `@vercel/speed-insights`, dynamic `sitemap.xml` & `robots.txt`, and security/cache headers in `vercel.json`.
