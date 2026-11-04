# ICS Research Centre — Institutional Web Platform

**Official Website & Research Repository**  
*Independence Avenue, Ridge Residential Area, Accra, Ghana*  
*Prepared in accordance with the Web Requirements Proposal (Document Version 1.0)*

---

## 1. Project Overview

This codebase implements the complete, production-grade official web portal for **ICS Research Centre**, an independent data and analytics research institution in Accra, Ghana. The implementation is built in direct alignment with the approved **Web Requirements Proposal (15 September 2026)** prepared for:
- **Daniel Oppong**, Chief Executive Officer
- **Aaron Donkor**, Deputy Chief Executive Officer

---

## 2. Design System & Visual Identity (Section 7)

In strict adherence to **Section 7** of the proposal, the website avoids generic startup/SaaS patterns (card grids, drop shadows, oversized rounded corners, and promotional stock imagery) in favor of a **restrained, document-led institutional aesthetic**:

| Element | Specification | Rationale |
| :--- | :--- | :--- |
| **Dominant Colour** | `#0F1A2B` (Institutional Navy) | Conveys authority and stability comparable to central banks and policy institutes. |
| **Secondary Accent** | `#2B4C6F` (Steel Blue) | Used for interactive elements, hairline borders, and metadata badges. |
| **Emphasis Accent** | `#A9803F` (Muted Brass / Gold) | Reserved for key numerals, serif highlights, and focus indicators. |
| **Dividers & Rules** | `#E2E8F0` / `#CBD5E1` (Hairline Rules) | Replaces bulky card boxes with clean, document-like index dividers. |
| **Headings Font** | `Newsreader` / `Playfair Display` (Serif) | Institutional authority and distinction from ubiquitous corporate sans-serifs. |
| **Body Font** | `Inter` (Sans-Serif) | Maximum legibility for long-form abstracts, briefs, and methodology notes. |
| **Data & Identifiers**| Monospace font stack | Crisp presentation of DOI and tracking codes (`ICS-WP-2026-04`). |

---

## 3. Information Architecture (Section 4)

The platform maintains a single, consistent primary navigation across every page, ensuring all content is reachable within two clicks:

1. **Home (`index.html`)**
   - Hero statement: Independent data & analytics research for government and multilateral partners.
   - Compact Data Strip: 48+ Studies, 32 Clients, 4.6M+ Records, 16 Regions with custom SVG sparklines.
   - Programme summaries, recent research index, and four-stage method summary.
2. **Research Focus Areas (`research.html`)**
   - Sets out the 5 core programmes in full (Public Policy & Governance, Economic & Social Data, Applied Statistical Modelling, Health & Development Metrics, Data Infrastructure & Training).
3. **Method (`method.html`)**
   - Detailed four-stage protocol: Scope & Design, Data Collection, Analysis & Review, Publication & Handover.
   - Documents quality controls (10% supervisor back-checks, CAPI anomaly scripts, reproducible econometric code).
4. **Publications Archive (`publications.html`)**
   - Searchable, filterable repository (filter by Type, Focus Area, Year).
   - Real-time search across titles, authors, and abstracts.
   - Interactive Citation Generator modal (APA 7th, Chicago, BibTeX).
5. **Open Datasets (`data.html`)**
   - Dedicated open data layer with geographic coverage, update frequency, and codebooks.
   - Live in-browser Dataset Explorer with one-click CSV export.
6. **Leadership (`leadership.html`)**
   - Executive profiles of Daniel Oppong (CEO) and Aaron Donkor (Deputy CEO).
   - Extensible faculty structure for senior fellows and department leads.
7. **About & Governance (`about.html`)**
   - Institutional background, Institutional Review Board (IRB) ethics charter.
   - Ghana Data Protection Act 2012 (Act 843) compliance policy and career opportunities.
8. **Contact & Commissioning (`contact.html`)**
   - Intake form mapped to the 5 focus areas with automated confirmation tracking code generation (`ICS-ENQ-2026-XXXX`).
   - Anti-spam honeypot and direct departmental routing inboxes.

---

## 4. How to Preview & Run

### Option A: Local Node.js Server (Recommended)
You can launch the included zero-dependency web server:
```bash
node server.js
```
Then open your web browser to: **`http://localhost:3000`**

### Option B: Direct Browser Opening
Because all files are standard, self-contained HTML5, CSS3, and modern JavaScript, you can open `index.html` directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari without any build step.

---

## 5. Non-Functional & Standards Compliance (Section 6)
- **Performance:** Ultra-lightweight footprint, zero bloat, fast load times on 3G/4G connections across West Africa.
- **Accessibility:** Meets WCAG 2.1 AA contrast ratios and keyboard navigability.
- **Privacy:** Form data sanitised; adheres to Ghana Data Protection Act 843.
- **Print Optimization:** Formatted print stylesheets allow printing policy briefs and reports with clean typography.

