# Dump Wizard — Website Redesign

A complete, from-scratch redesign of dumpwizard.com: a family-owned junk removal and
dumpster rental business in Boca Raton, FL, serving Palm Beach and Broward counties.

Built with **vanilla HTML, CSS, and JavaScript** — no build step, no dependencies,
no environment variables, no external APIs.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Single-page site: hero, pricing, how it works, services, about, work/gallery, reviews, service area, FAQ, contact |
| `styles.css` | Full design system — palette, typography, layout, responsive breakpoints |
| `script.js` | Mobile nav, sticky header, before/after sliders, scroll reveals, FAQ accordion, quote form |
| `privacy-policy.html` | Privacy policy page |
| `terms-and-conditions.html` | Terms and conditions page |
| `favicon.svg` | Gold wand mark favicon |

## Design

- **Palette:** ink/charcoal base (`#0b0d12`) with a gold accent (`#f2b632`), alternating
  with clean light sections for contrast and readability.
- **Typography:** Sora for headings (tight, bold, display weights), Inter for body copy.
- **Signature interaction:** draggable before/after comparison sliders built from the
  business's real job photos — pointer, touch, and keyboard accessible.
- **Accessibility:** semantic landmarks, skip link, visible focus rings, ARIA on the
  nav toggle and sliders, descriptive alt text, and `prefers-reduced-motion` support.
- **SEO:** meta description, Open Graph and Twitter cards, canonical URL, and
  `LocalBusiness` JSON-LD with hours, service area, and aggregate rating.

## Content

All copy, pricing, services, reviews, FAQs, and contact details come from the business's
existing content. Real job photography and team/trailer shots were preserved; additional
service-card imagery is licensed stock from Pexels, matched to each service.

## Contact (as published)

- Phone/text: (561) 980-3444 — open 24/7
- Email: dumpwizardfl@gmail.com
- Boca Raton, FL 33428
