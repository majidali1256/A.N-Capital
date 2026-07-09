---
name: Prestige Finance Framework
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#e4c367'
  on-secondary: '#3d2f00'
  secondary-container: '#715900'
  on-secondary-container: '#f3d273'
  tertiary: '#cfcece'
  on-tertiary: '#2f3131'
  tertiary-container: '#b3b3b3'
  on-tertiary-container: '#444546'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffe08b'
  secondary-fixed-dim: '#e4c367'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

This design system is engineered for the high-end luxury finance sector, specifically targeting institutional investors and high-net-worth individuals. The brand personality is authoritative, exclusive, and meticulous, characterized by the motto: "Your Trust, Our Commitment."

The visual language utilizes a **Modern-Corporate** foundation infused with **Glassmorphism** and **Tactile** accents. It leverages high-contrast dark surfaces to evoke a sense of private banking exclusivity. Key stylistic hallmarks include:
- **Depth through Translucency:** Frosted glass layers suggest transparency in financial dealings while maintaining a solid, premium feel.
- **Metallic Precision:** Use of gold and silver as structural accents rather than just decoration.
- **Architectural Spacing:** Generous whitespace (or "darkspace") to convey a sense of calm and unhurried professionalism.
- **Subtle Illumination:** Soft gold glows used to guide the eye toward critical data points or primary calls to action.

## Colors

The palette is rooted in a "Black Tie" aesthetic. The core is built on **Deep Black (#070707)** and **Dark Charcoal (#111111)** to provide a canvas where metallic accents can shine.

- **Metallic Gold (#D4AF37):** Reserved for primary brand elements, active states, and structural borders.
- **Champagne Gold (#E8C76A):** Used for hover states, highlights, and subtle gradients to add dimensionality.
- **Premium Silver (#C0C0C0):** Functions as a secondary accent for technical data, inactive icons, or tertiary borders.
- **White & Light Gray:** Used strictly for typography to ensure maximum legibility against the dark background.

**Color Application:**
Apply gold gradients (Metallic to Champagne) for primary action buttons. Use the Charcoal surface for card backgrounds with a 1px Gold or Silver stroke.

## Typography

This design system employs a sophisticated pairing of an editorial serif and a technical sans-serif.

- **Headlines (Libre Caslon Text):** Chosen for its traditional authority and luxury feel. Large display type should use a slight negative letter spacing to feel "tighter" and more bespoke.
- **Body & Data (Manrope):** A modern, balanced sans-serif that ensures high readability for complex financial figures and long-form investment reports. 
- **Labels:** Always use **Manrope** in uppercase with increased letter spacing to create a sense of organized, "cataloged" information.

**Hierarchy Rule:** Use Gold (#D4AF37) for section titles (Title-MD) and White (#FFFFFF) for primary headlines to maintain a balanced, high-contrast aesthetic.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach for desktop to maintain a controlled, premium presentation, transitioning to a fluid model for mobile devices.

- **Grid:** A 12-column grid with 24px gutters. Elements should generally align to a 4-column or 6-column span to maintain "weighty" blocks of information.
- **Vertical Rhythm:** A strict 8px baseline grid ensures alignment across all UI components. 
- **Margins:** Desktop margins are intentionally wide (64px) to frame the content like a luxury magazine. 
- **Mobile Reflow:** On mobile, margins reduce to 20px, and multi-column card layouts collapse into a single-column stack. Data tables should allow for horizontal scrolling within their containers to preserve readability.

## Elevation & Depth

Depth is not communicated via heavy shadows, but through **Tonal Layers** and **Backdrop Blurs**.

1.  **The Canvas:** The base layer is #070707.
2.  **The Surface:** Cards and containers use #111111 with a 1px stroke of #D4AF37 at 20% opacity.
3.  **The Overlay (Glass):** For modals or navigation bars, use a semi-transparent Charcoal background (opacity 70%) with a `backdrop-filter: blur(12px)`.
4.  **The Glow:** High-priority elements (like a "Trade Now" button) feature a soft, outer gold glow (`box-shadow: 0 0 20px rgba(212, 175, 55, 0.3)`).

Avoid standard black shadows; if a shadow is required for separation, it should be a deep tinted shadow (e.g., #000000 at 60% opacity with a 32px blur).

## Shapes

The shape language is **Soft (0.25rem)**. This provides a subtle modern touch without sacrificing the "seriousness" and structural integrity of a traditional financial institution.

- **Buttons & Inputs:** 4px (0.25rem) corner radius.
- **Cards & Modals:** 8px (0.5rem) corner radius.
- **Status Chips:** Full pill-shape to distinguish them from interactive buttons.

Use sharp 90-degree angles only for structural dividers and decorative gold lines used to separate sections.

## Components

### Buttons
- **Primary:** Metallic Gold to Champagne Gold gradient background, Black text, 4px radius. Bold weight.
- **Secondary:** Ghost style. 1px Gold border, Gold text, no background.
- **Tertiary:** Silver text with a simple underline on hover.

### Cards
- **Investment Cards:** Dark Charcoal (#111111) background, 1px Silver (#C0C0C0) border at 10% opacity. On hover, the border brightens to 100% Gold (#D4AF37).

### Input Fields
- **Style:** Underlined only or fully enclosed with a 1px Charcoal-Grey border.
- **Focus State:** Border turns Gold with a subtle 4px Gold outer glow.

### Lists & Tables
- **Financial Tables:** No vertical borders. Use thin horizontal Silver lines (5% opacity) to separate rows. Header text in **Label-Caps** Gold.

### Chips & Badges
- **Market Status:** Pill-shaped. Green (Success) or Red (Alert) using muted, "jewel-tone" variants to maintain the luxury aesthetic (e.g., Emerald and Ruby rather than Neon Green/Red).

### Navigation
- **Header:** Glassmorphic background with a bottom 1px Gold border. Logo centered or left-aligned with "Invest | Trade | Grow" tagline in small caps.