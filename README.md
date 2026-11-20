# msheker.dev

Personal portfolio and CV of Mustafa Şeker, live at **https://msheker.dev** (English at `/`, Turkish at `/tr`).

Next.js 16 (App Router, static, `cacheComponents`) · React 19 · TypeScript strict · Tailwind 4 · built-in i18n · Vercel

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static production build (also type-checks) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `next typegen` then `tsc --noEmit` (route types included) |
| `npm run cv:pdf` | Build, print both PDF CVs with headless Chrome, record their source hash |
| `npm run cv:check` | Fail if the CV sources changed since the PDFs were printed |

`cv:pdf` needs Google Chrome; set `CHROME_PATH` if it is not at the default macOS location.

## Where things live

```
src/app/[lang]/         pages: home, work, work/[slug], about, cv, cv/document (PDF source), contact
src/components/         header, footer, floating settings, terminals, motion
src/content/            site.ts (identity, links) · cv.ts (CV data) · projects.ts · cases.ts
src/i18n/               locales, dictionaries/en.json + tr.json, SEO helpers
src/app/globals.css     design tokens (see docs/DESIGN.md) and the PDF CV styles
public/cv/              the committed PDF CVs and their source hash
public/work/<slug>/     case study screenshots
scripts/cv-pdf.mjs      PDF printer and stale check
docs/                   plan, roadmap, decisions, content, copy, design (Turkish)
```

## Common changes

**Update the CV**
1. Edit `src/content/cv.ts` (experience, education, skills, languages; `cvSummary` and `cvProjects` are PDF only).
2. `npm run cv:pdf`
3. Commit the code and `public/cv/*`. CI fails if you forget step 2.

**Add a project**
1. Add an entry to `src/content/projects.ts` (index card) and `src/content/cases.ts` (case study, EN + TR).
2. Put screenshots in `public/work/<slug>/` and list them under `shots`.
3. Add the path to `routes` in `src/i18n/seo.ts` so it lands in the sitemap.
4. If it belongs on the PDF, add it to `cvProjects` and run `npm run cv:pdf`.

**Change site copy**: `src/i18n/dictionaries/en.json` and `tr.json`. English is the reference shape; a key missing in Turkish is a type error.

## Deploy

Every push to `main` deploys to Vercel (project `msheker-dev`). DNS is on Cloudflare: `@` and `www` are DNS-only CNAMEs to Vercel; `www` redirects (308) to the apex. Mail (`hello@msheker.dev`) is Cloudflare Email Routing. Google Search Console owns the domain through a `google-site-verification` TXT record on `@` (keep it) and reads `/sitemap.xml`.

CI (GitHub Actions) runs lint, typecheck and `cv:check` on every push and pull request.

## Notes

- Keyboard: `1`–`4` jump to sections, `s` opens settings, `t` cycles the theme, `p` pauses motion.
- The site uses `hello@msheker.dev`; the PDF CV uses the personal address (D-008).
- The project sits in an iCloud-synced folder, which sometimes leaves `* 2.ts` copies in `.next/`; `tsconfig.json` ignores them.
