# A.N Resources — IDE Memory & Development Rules

## Core Identity & Brand Constraints
- **Official Brand Name**: `A.N Resources` (or `A.N RESOURCES`).
- **Tagline**: `INVEST • TRADE • GROW`
- **Domain**: `alliancenetworkresources.com`
- **Contact Email**: `contact@alliancenetworkresources.com`
- **Strict Prohibition**: Never use `A.N Capital` for the company name in text, titles, forms, or metadata. (Financial terms like "capital appreciation" or "capital preservation" are valid).

## Frontend Architecture
- **Tech Stack**: Vanilla HTML5, CSS3, Tailwind CSS (CDN runtime), Vanilla JS (ES6+), Three.js WebGL background engine.
- **Design Tokens**:
  - Primary Gold: `#d4af37` (`--color-primary`)
  - Light Metallic Gold: `#f2ca50` (`--color-primary-light`)
  - Dark Obsidian Background: `#111111` (`--color-background`)
  - Glass Surface: `#131313` / `#1a1a1a` (`--color-surface`)
- **Typography**:
  - Headings: `'Libre Caslon Text', serif`
  - Body & Buttons: `'Manrope', sans-serif`
- **Logo Reference**: `assets/img/logo.png?v=2`

## Global Rules
- **Memory File Mandate**: Every project MUST contain a `MEMORY.md` file in its root directory.
- **Single Source of Truth**: The `MEMORY.md` file serves as the primary repository context for project history, architecture, design system, sitemap, and deployment workflows. Always keep it updated when introducing major changes.

## Deployment Command
```bash
rm -f A.N-Resources-Website.zip && zip -r A.N-Resources-Website.zip index.html about.html services.html process.html contact.html privacy.html terms.html disclaimer.html cookies.html contact.php site.webmanifest sitemap.xml robots.txt google12b0c94c08abffb6.html assets .htaccess
```
