
# Utility Choice - Comparison Platform

Utility Choice is a high-performance utility marketplace built with **Next.js 15 (App Router)** and **Tailwind CSS v4**. It helps Australian consumers explore, filter, compare, and connect with experts for a range of utility services including Home Loans, Personal Loans, Credit Cards, Broadband (NBN), and Solar Panels & Inverters.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Running Locally

To launch the hot-reloading development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ CLI Development Commands

The project includes several pre-configured scripting commands to manage assets, caching, and progress:

| Command                       | Action                   | Description                                                                                                                             |
| :---------------------------- | :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                 | Launch local server      | Starts Next.js development server at port 3000.                                                                                         |
| `npm run progress`            | Update dashboard         | Scans code comments and compiles the [PROGRESS.md](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/PROGRESS.md) dashboard.        |
| `npm run download-assets`     | Fetch core static assets | Mirrors Wix/media URLs referenced in `src/` into `/public/assets`.                                                                      |
| `npm run download-all-assets` | Fetch all site assets    | Runs asset mirror + NBN/credit-card/home-loan logo scripts and verifies paths. Use `--extract` to refresh `extracted-logos.json` first. |
| `npm run verify-assets`       | Check local assets       | Fails if any `/assets/...` path referenced in code is missing on disk.                                                                  |
| `npm run build`               | Compile for production   | Performs compile-time checks, type-checking, and generates static pages.                                                                |
| `npm run start`               | Start prod server        | Starts Next.js compiled output server in production mode.                                                                               |
| `npm run test`                | Run tests                | Runs Jest unit tests under the `__tests__` directory.                                                                                   |
| `npm run format`              | Prettier formatter       | Formats code layout and indentation across all TS/TSX source files.                                                                     |

---

## 📂 Page Routes Directory (17 Active Routes)

The application utilizes Next.js App Router. Below is the mapping of all URLs to their matching Page Component:

| Route Path                       | Type    | Dynamic Parameters     | Purpose                                           | File Source                                                                                                      |
| :------------------------------- | :------ | :--------------------- | :------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `/`                              | Static  | _None_                 | Landing Page (Hero lookup, partners, categories)  | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/page.tsx)                               |
| `/credit-cards`                  | Static  | _None_                 | Credit card filter catalog                        | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/credit-cards/page.tsx)                  |
| `/credit-cards/[slug]`           | Dynamic | `slug` (Static Params) | Individual credit card specifications & metrics   | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/credit-cards/[slug]/page.tsx)           |
| `/personal-loan`                 | Static  | _None_                 | Personal loan calculator and listings             | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/personal-loan/page.tsx)                 |
| `/personal-loan-1/[slug]`        | Dynamic | `slug` (Static Params) | Personal loan plan info                           | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/personal-loan-1/[slug]/page.tsx)        |
| `/nbn`                           | Static  | _None_                 | NBN Broadband filter catalog                      | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/nbn/page.tsx)                           |
| `/nbn/[slug]`                    | Dynamic | `slug` (Static Params) | Internet plan speed details & cost terms          | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/nbn/[slug]/page.tsx)                    |
| `/items`                         | Static  | _None_                 | Home Loan rates comparison                        | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/items/page.tsx)                         |
| `/items/[slug]`                  | Dynamic | `slug` (Static Params) | Home Loan bank metrics & offset details           | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/items/[slug]/page.tsx)                  |
| `/solar-pannel`                  | Static  | _None_                 | Solar panels packages and size selectors          | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/solar-pannel/page.tsx)                  |
| `/Inverters`                     | Static  | _None_                 | Solar inverters catalogue list                    | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/Inverters/page.tsx)                     |
| `/blog`                          | Static  | _None_                 | Marketing blogs listing page                      | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/blog/page.tsx)                          |
| `/post/[slug]`                   | Dynamic | `slug` (Static Params) | Blog post article details and layout              | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/post/[slug]/page.tsx)                   |
| `/enquiry`                       | Static  | _None_                 | Multi-choice expert connection lead form          | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/enquiry/page.tsx)                       |
| `/call-contact`                  | Static  | _None_                 | Express lead request contact form                 | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/call-contact/page.tsx)                  |
| `/privacy-policy`                | Static  | _None_                 | Corporate Privacy terms and Disclaimer conditions | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/privacy-policy/page.tsx)                |
| `/copy-of-thanks-for-submitting` | Static  | _None_                 | Lead submission Success page                      | [page.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/app/copy-of-thanks-for-submitting/page.tsx) |

---

## 🧩 Components Catalog

The platform contains over **35+ components** grouped under 5 modules for reuse and speed optimizations:

### 1. Reusable UI Components (`src/components/ui/`)

Primitive inputs and design elements utilizing Tailwind v4 dynamic theme triggers:

- [button.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/ui/button.tsx): Custom semantic button options (primary, secondary, link sizes).
- [checkbox.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/ui/checkbox.tsx): Accessible Radix Checkbox element.
- [input.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/ui/input.tsx): Styled input box.
- [label.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/ui/label.tsx): Forms helper label component.
- [accordion.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/ui/accordion.tsx): Radix-powered accessible FAQ dropdowns.

### 2. Page & Layout Components (`src/components/layout/`)

Structural templates and wrappers framing the website content:

- [SiteLayout.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/layout/SiteLayout.tsx): Combines Redux stores (`StoreProvider`) and global context boundaries.
- [SiteHeader.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/layout/SiteHeader.tsx): Mobile-responsive layout header with a slide-out overlay menu.
- [SiteFooter.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/layout/SiteFooter.tsx): Multi-column address details, ISO compliance seals, and legal disclaimers.
- [UtilityChoiceLogo.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/layout/UtilityChoiceLogo.tsx): Renders logo SVG assets alongside corporate taglines.
- [PageContainer.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/layout/PageContainer.tsx): Custom margins helper tags.
- [ChatFab.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/layout/ChatFab.tsx): Fixed contact floating bubble triggers.

### 3. Homepage Sections (`src/components/home/`)

Rich blocks that assemble the main landing experience:

- [HeroSection.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/home/HeroSection.tsx): Primary hero banner housing postcode entry inputs.
- [HeroLottieAnimation.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/home/HeroLottieAnimation.tsx): Embeds smooth illustrations.
- [ServiceTabs.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/home/ServiceTabs.tsx): Grid panel for sector routing.
- [HomeSections.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/home/HomeSections.tsx): Modular homepage blocks including `PartnerLogos` filter categories, youtube video popup embeds, and About us content.
- [ProcessSteps.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/home/ProcessSteps.tsx): Timeline step-by-step layout.
- [TestimonialsSlider.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/home/TestimonialsSlider.tsx): Swiper slider showcasing customer ratings.

### 4. Interactive Forms (`src/components/forms/`)

Validates user input formats using custom regex checks and Zod rules:

- [PostcodeSearch.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/forms/PostcodeSearch.tsx): Zod-validated 4-digit postcode form.
- [ContactForm.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/forms/ContactForm.tsx): The central lead capture form.

### 5. Services & Listings (`src/components/services/`)

Components for utility plan specification pages:

- [ProductCard.tsx](file:///Users/saurabh/PANTHEON%20DIGITAL/UtlityChoice/src/components/services/ProductCard.tsx): Standardized specifications layout, filter select dropdowns, and comparison headers.
