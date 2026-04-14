# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Compile Tailwind CSS (run before deployment or after changing Tailwind classes)
npm run build:css

# Watch and auto-recompile Tailwind CSS during development
npm run watch:css
```

There are no test commands — this is a static site with no test suite.

To preview locally, open any `.html` file directly in a browser or use a simple HTTP server:
```bash
npx serve .
```

## Architecture

This is a **static multi-page HTML/CSS website** for BPO Hive, a B2B lead generation agency. There is no build pipeline beyond Tailwind CSS compilation; HTML pages are served directly.

### Page Organization

- **Root pages:** `index.html`, `about.html`, `pricing.html`, `careers.html`, `blogs.html`, `case-studies.html`, `roi-calculator.html`, and legal/utility pages
- **`services/`** — 9 service-specific landing pages (appointment-setting, cold-calling, CRM, customer-support, etc.)
- **`industries/`** — 9 industry-specific landing pages (SaaS, real-estate, solar, roofing, etc.)

### Styling

Tailwind CSS is the only styling framework. The compiled output lives at `assets/css/tailwind.css`. Source config is in `tailwind.config.js`. Custom animations and page-specific CSS live in `<style>` blocks inline within each HTML file. Run `npm run build:css` after adding new Tailwind utility classes to regenerate the compiled stylesheet.

**Brand colors** (defined in `tailwind.config.js`):
- `bpo-blue`: `#4EA6FE` (primary)
- `bpo-light-blue`: `#78BBFA`
- `bpo-dark`: `#1A1A1A`

Note: Some older class names like `belkins-orange` and `belkins-dark` may still appear in the HTML — they map to the same colors.

### Navigation Consistency

Navigation is duplicated across every HTML page (there is no templating engine). Three Python scripts exist to bulk-update navigation across all pages:

- `update_nav.py` — string-based replacement
- `update_nav_bulletproof.py` — with duplicate-insertion guards
- `update_nav_regex.py` — regex-based for varying HTML formats

Run one of these scripts after adding new nav items rather than editing each file manually. They handle relative path depth (`../` prefix for files in subdirectories).

### External Integrations

Every page includes these tracking scripts (in `<head>`):
- **Google Tag Manager** — GTM-WTCM2N4W
- **Google Analytics 4** — GA-MRYSLESY4H
- **Meta Pixel** — 1492963711498633
- **Mouseflow** — session recording

CTAs open a **Calendly** scheduling widget (inline embed or popup).

### Deployment

The site targets Apache hosting. `.htaccess` handles:
- Clean URL rewriting (`/about` → `about.html`)
- GZIP compression
- Long-term browser caching
- Security headers

Commit the compiled `assets/css/tailwind.css` to git — there is no server-side build step.

### Unused Directories

- `react-version/` — a React prototype of the homepage (not deployed)
- `wordpress-theme/` — a WordPress theme stub (not deployed)
