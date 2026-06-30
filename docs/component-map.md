# Component Map — UtilityChoice Clone

## Layout Components

### SiteHeader

- **Path:** `src/components/layout/SiteHeader.tsx`
- **Sub-components:**
  - `Logo` — Utility Choice brand mark
  - `DesktopNav` — Horizontal menu (8 items)
  - `MobileMenu` — Hamburger overlay with full nav
- **State:** Mobile menu open/close (Redux: `ui.mobileMenuOpen`)
- **Behavior:** Sticky on scroll, active link highlighting

### SiteFooter

- **Path:** `src/components/layout/SiteFooter.tsx`
- **Sub-components:**
  - `FooterServiceLinks` — 6 service category links
  - `FooterLegalLinks` — Privacy Policy
  - `FooterCopyright` — © Utility Choice
- **Sections:** Service grid, legal, social (if present)

### PageContainer

- **Path:** `src/components/layout/PageContainer.tsx`
- **Props:** `maxWidth` (default 980px), `className`
- **Purpose:** Wix site-width container wrapper

---

## Homepage Sections

### HeroSection

- **Path:** `src/components/home/HeroSection.tsx`
- **Content:** H1 "Explore, Select & get Best Utility Deals"
- **Sub-components:**
  - `ServiceTabs` — 6 service category tabs
  - `PostcodeSearch` — Postcode input + Explore button
- **Animation:** Fade-in on load (Framer Motion)

### ServiceTabs

- **Path:** `src/components/home/ServiceTabs.tsx`
- **Tabs:** Home Loan, Solar, NBN, Credit Card, Personal Loan, Inverter
- **Behavior:** Tab selection highlights active, links to service pages
- **Uses:** Radix Tabs

### PostcodeSearch

- **Path:** `src/components/forms/PostcodeSearch.tsx`
- **Fields:** Postcode (4-digit AU validation)
- **Submit:** Navigate to selected service with postcode in Redux state
- **Redux:** `postcode` slice

### ExpertConnectBanner

- **Path:** `src/components/home/ExpertConnectBanner.tsx`
- **Content:** "Choose & Connect with our expert for free"

### MarketplaceBadge

- **Path:** `src/components/home/MarketplaceBadge.tsx`
- **Content:** "We are the Best Utility Market Place in Australia"

### PartnerLogos

- **Path:** `src/components/home/PartnerLogos.tsx`
- **Content:** 6 partner category logos in horizontal scroll
- **Categories:** Credit Cards, Home Loan, Personal Loan, Solar, NBN, Inverter

### ValueProposition

- **Path:** `src/components/home/ValueProposition.tsx`
- **Content:** "Our Fellow Australians! Pay Less Enjoy More"
- **Description:** Platform value text

### ProcessSteps

- **Path:** `src/components/home/ProcessSteps.tsx`
- **Steps:** Explore → Select → Switch → Save
- **Layout:** 4-column grid (responsive stack)

### TestimonialsSlider

- **Path:** `src/components/home/TestimonialsSlider.tsx`
- **Library:** Swiper
- **Features:** Autoplay, pagination, loop
- **Content:** Client reviews (James Wilson + others)
- **Stats:** 4.3-star, 45,000+ users, 6 years

### VideoSection

- **Path:** `src/components/home/VideoSection.tsx`
- **Content:** "Why you should review your bills today!"
- **Sub-components:** Video embed cards

### AboutSection

- **Path:** `src/components/home/AboutSection.tsx`
- **Content:** About Us, Vision, Mission blocks

### BottomCTA

- **Path:** `src/components/home/BottomCTA.tsx`
- **Content:** "It's better to explore before you pay more"
- **Links:** 6 service category cards

---

## Service Listing Components

### ServicePageHeader

- **Path:** `src/components/services/ServicePageHeader.tsx`
- **Props:** `title`, `description`
- **Usage:** All listing pages (Credit Cards, NBN, etc.)

### FilterBar

- **Path:** `src/components/services/FilterBar.tsx`
- **Sub-components:**
  - `FilterSelect` — Dropdown filter (Radix Select)
- **Filters vary by page:**
  - Credit Cards: Company, Interest Rates, Charges
  - Home Loan: Interest Rate, Loan Fee, Max Amount
  - NBN: Company, Download Speed
  - Personal Loan: Interest Rates

### ProductCard

- **Path:** `src/components/services/ProductCard.tsx`
- **Variants:**
  - `CreditCardProductCard`
  - `HomeLoanProductCard`
  - `NBNProductCard`
  - `PersonalLoanProductCard`
- **Props:** Product data object, link to detail page

### ProductGrid

- **Path:** `src/components/services/ProductGrid.tsx`
- **Layout:** Responsive grid of ProductCards
- **Features:** Filter integration via Redux

---

## Service Detail Components

### ProductDetail

- **Path:** `src/components/services/ProductDetail.tsx`
- **Sections:** Hero, specs table, CTA, related products
- **Dynamic routes:** `/credit-cards/[slug]`, `/nbn/[slug]`, etc.

---

## Solar & Inverter Components

### SolarPackages

- **Path:** `src/components/solar/SolarPackages.tsx`
- **Packages:** 6.6KW, 9.9KW, 12KW
- **Content:** Panel count, inverter, ideal household size

### InverterComparison

- **Path:** `src/components/solar/InverterComparison.tsx`
- **Sections:** Single-phase, Three-phase inverter grids

### FAQAccordion

- **Path:** `src/components/shared/FAQAccordion.tsx`
- **Library:** Radix Accordion
- **Items:** 20+ FAQ questions per page

### PostcodeCompare

- **Path:** `src/components/forms/PostcodeCompare.tsx`
- **Content:** "Compare with Pincode" input + Compare button

---

## Form Components

### ContactForm

- **Path:** `src/components/forms/ContactForm.tsx`
- **Fields:** Full Name, Contact Number, Email, Address
- **Sub-components:**
  - `ServiceCheckboxGroup` — Multi-select services
  - `TermsCheckbox` — T&C acceptance
  - `ConsentText` — SMS/phone consent
- **Validation:** Zod schema
- **Submit:** Redux async thunk → mock API
- **Variants:** `enquiry` (Health Insurance), `call-contact` (Life Insurance)

### ServiceCheckboxGroup

- **Path:** `src/components/forms/ServiceCheckboxGroup.tsx`
- **Options:** Credit Card, N.B.N., Inverter, Solar Panel, Personal Loan, Home Loan, + insurance

---

## Blog Components

### BlogGrid

- **Path:** `src/components/blog/BlogGrid.tsx`
- **Layout:** Card grid with image, title, date, read time

### BlogCard

- **Path:** `src/components/blog/BlogCard.tsx`
- **Props:** title, slug, date, readTime, excerpt

### BlogPost

- **Path:** `src/components/blog/BlogPost.tsx`
- **Content:** Full article render
- **SEO:** Article schema, breadcrumbs

---

## Shared UI Components (Shadcn)

| Component | Path                              | Usage                        |
| --------- | --------------------------------- | ---------------------------- |
| Button    | `src/components/ui/button.tsx`    | CTAs, form submit            |
| Input     | `src/components/ui/input.tsx`     | Form fields, postcode        |
| Checkbox  | `src/components/ui/checkbox.tsx`  | Service selection, terms     |
| Select    | `src/components/ui/select.tsx`    | Filter dropdowns             |
| Accordion | `src/components/ui/accordion.tsx` | FAQ sections                 |
| Tabs      | `src/components/ui/tabs.tsx`      | Service tabs, privacy policy |
| Dialog    | `src/components/ui/dialog.tsx`    | Mobile menu overlay          |
| Label     | `src/components/ui/label.tsx`     | Form labels                  |

---

## Redux Feature Slices

| Slice          | Path                                                       | State                      |
| -------------- | ---------------------------------------------------------- | -------------------------- |
| ui             | `src/redux/features/ui/uiSlice.ts`                         | mobileMenu, modals         |
| forms          | `src/redux/features/forms/formsSlice.ts`                   | form submission state      |
| postcode       | `src/redux/features/postcode/postcodeSlice.ts`             | postcode, selected service |
| leadGeneration | `src/redux/features/leadGeneration/leadGenerationSlice.ts` | lead data                  |
| contact        | `src/redux/features/contact/contactSlice.ts`               | contact form state         |
| comparison     | `src/redux/features/comparison/comparisonSlice.ts`         | filter state               |
| calculator     | `src/redux/features/calculator/calculatorSlice.ts`         | loan calculator            |
| services       | `src/redux/features/services/servicesApi.ts`               | RTK Query product data     |

---

## Page → Component Mapping

| Page                      | Components Used                                                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                       | HeroSection, ServiceTabs, PostcodeSearch, ExpertConnectBanner, MarketplaceBadge, PartnerLogos, ValueProposition, ProcessSteps, TestimonialsSlider, VideoSection, AboutSection, BottomCTA |
| `/credit-cards`           | ServicePageHeader, FilterBar, ProductGrid (CreditCardProductCard)                                                                                                                        |
| `/items`                  | ServicePageHeader, FilterBar, ProductGrid (HomeLoanProductCard)                                                                                                                          |
| `/nbn`                    | ServicePageHeader, FilterBar, ProductGrid (NBNProductCard)                                                                                                                               |
| `/personal-loan`          | ServicePageHeader, FilterBar, ProductGrid (PersonalLoanProductCard)                                                                                                                      |
| `/solar-pannel`           | ServicePageHeader, PostcodeCompare, SolarPackages, FAQAccordion                                                                                                                          |
| `/Inverters`              | ServicePageHeader, PostcodeCompare, InverterComparison, FAQAccordion                                                                                                                     |
| `/enquiry`                | ContactForm (enquiry variant)                                                                                                                                                            |
| `/call-contact`           | ContactForm (call-contact variant)                                                                                                                                                       |
| `/privacy-policy`         | PrivacyPolicyContent, Tabs (Privacy/Terms/Disclaimer)                                                                                                                                    |
| `/blog`                   | BlogGrid, BlogCard                                                                                                                                                                       |
| `/post/[slug]`            | BlogPost                                                                                                                                                                                 |
| `/credit-cards/[slug]`    | ProductDetail                                                                                                                                                                            |
| `/nbn/[slug]`             | ProductDetail                                                                                                                                                                            |
| `/items/[slug]`           | ProductDetail                                                                                                                                                                            |
| `/personal-loan-1/[slug]` | ProductDetail                                                                                                                                                                            |
