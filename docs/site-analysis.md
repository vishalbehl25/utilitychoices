# UtilityChoice.com.au — Forensic Site Analysis

**Target:** https://www.utilitychoices.com.au  
**Platform:** Wix.com Website Builder (Thunderbolt renderer v1.17390.0)  
**Analysis Date:** 2026-06-01  
**Site Revision:** 814

---

## 1. Platform & Architecture

| Property          | Value                                  |
| ----------------- | -------------------------------------- |
| CMS/Builder       | Wix Thunderbolt (SPA/MPA hybrid)       |
| Meta Site ID      | `0be08e1e-d3ba-4776-ae3b-f7fb3e63992c` |
| Site Width        | 980px (desktop fixed container)        |
| Language          | en (locale: en-in)                     |
| External Base URL | https://www.utilitychoices.com.au      |
| Media CDN         | static.wixstatic.com                   |
| Custom Code       | Wix Velo (wixData backend)             |

---

## 2. HTML Structure & DOM Hierarchy

```
#SITE_CONTAINER
├── #SITE_HEADER (sticky header)
│   ├── Logo (Utility Choice)
│   ├── Desktop Navigation (horizontal menu)
│   └── Mobile Hamburger Menu (#TINY_MENU / hamburger-overlay)
├── #PAGES_CONTAINER
│   └── #SITE_PAGES (page content sections)
│       ├── Hero Section (H1 + postcode search)
│       ├── Service Tabs (Home Loan, Solar, NBN, Credit Card, Personal Loan, Inverter)
│       ├── Partner Logos Carousel
│       ├── Value Proposition (Explore/Select/Switch/Save)
│       ├── Testimonials Slider
│       ├── Video Section
│       ├── About Us / Vision / Mission
│       └── CTA Banner
└── #SITE_FOOTER
    ├── Service Links Grid
    ├── Legal Links (Privacy Policy)
    └── Copyright
```

### Key Wix Component IDs (Homepage)

- Service tab panel: `data-hook="TabPanel"`, `data-hook="TabsListWrapper"`
- Scroll buttons: `data-hook="ForwardScrollBtn"`, `data-hook="BackwardScrollBtn"`
- Background layers: `data-hook="bgLayers"`

---

## 3. CSS Architecture

- **System:** Wix Corvid/Stylable design tokens via CSS custom properties
- **Layout:** CSS Grid mesh-layout (`#masterPage.mesh-layout`)
- **Container:** `--site-width: 980px`, centered with `calc((100% - var(--site-width)) / 2)`
- **Mobile:** `device-mobile-optimized` class, 320px fixed width container
- **Typography:** Wix font scale `--font_0` through `--font_10`
- **Colors:** Wix palette `--color_1` through `--color_65`
- **Buttons:** StylableButton2545352419 component system
- **Rich Text:** wixui-rich-text classes

---

## 4. Responsive Breakpoints

| Breakpoint | Behavior                               |
| ---------- | -------------------------------------- |
| 320px      | Mobile optimized fixed 320px container |
| 375px      | Mobile layout                          |
| 425px      | Mobile layout                          |
| 768px      | Tablet transition                      |
| 980px      | Site max-width (desktop container)     |
| 1024px+    | Full desktop layout                    |
| 1280px+    | Content centered in 980px              |
| 1440px+    | Content centered in 980px              |
| 1920px+    | Content centered in 980px              |

Wix uses `device-mobile-optimized` body class rather than standard media queries for primary layout switch.

---

## 5. JavaScript Behavior

### Navigation

- MPA navigation with view transitions (SlideHorizontal, SlideVertical, OutIn)
- Page transition duration: 0.6s cubic-bezier(0.83, 0, 0.17, 1)
- Header/footer persist across page transitions

### Service Tabs (Homepage Hero)

- Horizontal tab strip: Home Loan, Solar, NBN, Credit Card, Personal Loan, Inverter
- Tab click navigates to respective service page
- "Explore" CTA button per tab

### Postcode Search

- Text input for Australian postcode
- "Explore" / "Compare" button triggers navigation to service page with postcode context
- Used on: Homepage hero, Solar page, Inverters page

### Testimonials Slider

- Auto-scrolling carousel with client reviews
- Forward/backward scroll buttons
- Client: James Wilson testimonial visible

### FAQ Accordions

- Expandable sections on Solar and Inverters pages
- 20+ FAQ items per page

### Filter Dropdowns (Listing Pages)

- Credit Cards: Company, Interest Rates, Charges
- Home Loan: Interest Rate pa, Loan Fee, Maximum Loan Amount
- NBN: Company, Maximum download speed
- Personal Loan: Interest Rates

---

## 6. Form Workflows

### Contact Form (`/enquiry`, `/call-contact`)

| Field              | Type                     | Required |
| ------------------ | ------------------------ | -------- |
| Full Name          | text                     | yes      |
| Contact Number     | tel                      | yes      |
| Email              | email                    | yes      |
| Current Address    | text                     | yes      |
| Service Selection  | multi-checkbox           | yes      |
| Terms & Conditions | checkbox                 | yes      |
| SMS Consent        | implicit via Connect Now | yes      |

**Services Checkboxes:**

- Credit Card, N.B.N., Inverter, Solar Panel, Personal Loan, Home Loan, Health Insurance (enquiry) / Life Insurance (call-contact)

**Submit:** "Connect Now" button  
**Backend:** Wix Forms API via Velo  
**Success:** Redirect to `/copy-of-thanks-for-submitting` or popup `/popup-wtkvy`

### Validation Rules (Inferred)

- Full Name: non-empty, min 2 chars
- Contact Number: Australian phone format (10 digits)
- Email: valid email format
- Address: non-empty
- Terms checkbox: must be checked
- At least one service must be selected

---

## 7. CTA Flows

| CTA                 | Destination                             |
| ------------------- | --------------------------------------- |
| Explore (Hero tabs) | Respective service listing page         |
| Compare (Postcode)  | Service page with postcode filter       |
| Connect Now         | Form submission → thank you page        |
| Service Cards       | `/credit-cards`, `/items`, `/nbn`, etc. |
| Blog Read More      | `/post/{slug}`                          |
| Product Cards       | Dynamic item detail pages               |

---

## 8. Navigation Logic

### Desktop Menu

1. Home → `/`
2. Credit Cards → `/credit-cards`
3. Personal Loan → `/personal-loan`
4. NBN → `/nbn`
5. Home Loan → `/items`
6. Solar Panel → `/solar-pannel`
7. Inverters → `/Inverters`
8. Blog → `/blog`

### Footer

- Privacy Policy → `/privacy-policy`
- Service category links
- Contact → `/enquiry` or `/call-contact`

---

## 9. SEO Structure

### Homepage Meta

- **Title:** Explore & Compare Home Loan Deals | Utilitychoice - Best Utility Marketplace
- **Description:** Compare home loan options with UtilityChoice, Australia's top marketplace...
- **Canonical:** https://www.utilitychoices.com.au
- **OG Type:** website
- **OG Site Name:** Utility Choice

### JSON-LD Schemas

1. **LocalBusiness** — Utility Choice, Epping AU, help@utilitychoice.com.au
2. **WebSite** — name, url

### Sitemap

- Index at `/sitemap.xml` (6 sub-sitemaps)
- Total indexed URLs: ~213

### Robots.txt

- Allow: `/`
- Disallow: `*?lightbox=`, `/_partials*`
- Sitemap: https://www.utilitychoices.com.au/sitemap.xml

---

## 10. Tracking & Analytics

- Wix built-in analytics (`isTrackClicksAnalyticsEnabled: true`)
- Pinterest domain verification meta tag
- No Google Analytics ID found in static HTML (may load dynamically)
- Wix session tracking cookies

---

## 11. Image Optimization

- Wix static CDN with responsive transforms: `/v1/fill/w_{width},h_{height},al_c,q_{quality}`
- AVIF/WebP formats used (`~mv2.webp`)
- Lazy loading via `data-animate-blur` with 9px blur → sharp transition (0.8s ease-in)
- 128+ unique images on homepage

---

## 12. Animation System

| Animation                    | Duration                   | Easing                         |
| ---------------------------- | -------------------------- | ------------------------------ |
| Page transition (horizontal) | 0.6s                       | cubic-bezier(0.83, 0, 0.17, 1) |
| Page transition (OutIn)      | 0.35s                      | cubic-bezier(0.22, 1, 0.36, 1) |
| Fade in/out                  | var(--transition-duration) | cubic-bezier(0.37, 0, 0.63, 1) |
| Button hover                 | 0.2s                       | ease                           |
| Image blur load              | 0.8s                       | ease-in                        |
| Scroll reveal                | 0.3s                       | cubic-bezier(0, 1, 0.5, 1)     |
| Header sticky                | 0.2s                       | ease-in                        |

---

## 13. Content Sections (Homepage)

1. **Hero** — "Explore, Select & get Best Utility Deals" + service tabs + Explore CTA
2. **Expert Connect** — "Choose & Connect with our expert for free"
3. **Marketplace Badge** — "We are the Best Utility Market Place in Australia"
4. **Partner Logos** — Credit Cards, Home Loan, Personal Loan, Solar, NBN, Inverter
5. **Value Prop** — "Our Fellow Australians! Pay Less Enjoy More"
6. **Process Steps** — Explore → Select → Switch → Save
7. **Testimonials** — Client reviews slider (4.3-star, 45,000+ users)
8. **Video Section** — "Why you should review your bills today!"
9. **About Us** — Company description
10. **Vision & Mission** — Company values
11. **Bottom CTA** — "It's better to explore before you pay more" + service links

---

## 14. Network Analysis

### Wix Internal APIs

- `/_api/v1/access-tokens` — Session tokens
- `/_api/v2/dynamicmodel` — Dynamic page data
- `/_api/one-app-session-web/v3/businesses` — Business session

### Form Submission

- Wix Forms via Velo backend (wixData collections)
- No external lead API exposed in client-side code
- **Clone strategy:** Mock API service replicating submission behavior

---

## 15. Accessibility

- A11y contrast styles for forced-colors mode
- Focus ring styles on interactive elements
- Skip-to-content patterns via Wix accessibility features
- ARIA on tab components (`data-hook` patterns)
- Keyboard navigation on hamburger menu
