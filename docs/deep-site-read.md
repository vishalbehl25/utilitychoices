# Deep Site Read — utilitychoices.com.au

**Source:** [https://www.utilitychoices.com.au/](https://www.utilitychoices.com.au/)  
**Platform:** Wix Thunderbolt · Site width **980px** · Revision 814

---

## 1. Brand & Color System

### Primary palette (extracted from Wix CSS `--color_N`)

| Token | Hex | Usage |
|-------|-----|-------|
| **Brand Blue** | `#0061B8` | Buttons, links, active nav, primary CTA |
| **Brand Orange** | `#FF6200` | Hero highlight word "**Best**" (color_44), accent CTAs |
| **Dark Navy** | `#101921` | Headings, body text (color_14/15) |
| **Cream** | `#FCF9E2` | Section backgrounds, borders (color_37/47) |
| **Off White** | `#FEFEF8` | Alternate section bg (color_17/38) |
| **Light Blue** | `#E5F0FE` | Hero/subtle tint (color_16) |
| **Muted Gray** | `#4D4D4D` | Secondary body copy |
| **Tagline Gray** | `#323232` | "Connecting to better" subtitle |

### Button states
- **Primary:** bg `#0061B8`, text white, hover → dark `#101921`
- **Accent:** bg `#FF6200`, used for highlighted text blocks
- **Secondary:** white bg, blue border `#0061B8`

---

## 2. Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Hero H1 | Nunito Sans | 64px / 90px display | 700 |
| Section H2 | Nunito Sans | 44px | 700 |
| Section H3 | Nunito Sans | 32px | 700 |
| Body | Nunito Sans Light | 16–18px | 300–400 |
| Labels / small | DIN Next W01 Light | 12–16px | 300 |
| Tagline | Nunito Sans | 20–24px | 400, color `#323232` |

Line heights: H1 `1em`, H2 `1.2em`, body `1.4–1.5em`.

---

## 3. Header & Navigation

### Desktop
- Logo left, 8 nav links right
- Links: Home, Credit Cards, Personal Loan, NBN, Home Loan, Solar Panel, Inverters, Blog

### Mobile menu (hamburger)
- Full-screen overlay with vertical menu
- Footer of menu shows:
  - `Help@utilitychoice.com`
  - `© 2021 by UtilityChoice & Secured by Utility Choice`
- Phone icon link present

---

## 4. Homepage — Section-by-Section (exact order)

### 4.1 Hero
```
Tagline:     "Connecting to better"          (#323232)
H1:          "Explore, Select & get Best Utility Deals."
             └── "Best" highlighted in ORANGE (#FF6200) with orange bg pill
Sub-label:   "Explore the market offers"     (address/postcode input label)
Input:       Address/postcode field + "Explore" button
Service tabs: 6 icon cards in a row:
  - Home Loan (animated GIF icon)
  - Solar
  - NBN
  - Credit Card
  - Personal Loan
  - Inverter
Each tab shows service name below icon image.
```

### 4.2 Expert CTA Banner
- Blue full-width band
- **"Choose & Connect with our expert for free"**

### 4.3 Marketplace Badge
- **"We are the Best Utility Market Place in Australia"**

### 4.4 Trust / Review Badges (3 images in a row)
- Google review badge — "Utility Choice google review"
- Trustpilot badge — "Utility Choice trust pilot review"
- Facebook rating — "Facebook Rating of Utility Choice"

### 4.5 Partner Category Row
- **"Our Partner's Partner"**
- 6 category labels: Credit Cards, Home Loan, Personal Loan, Solar, NBN, Inverter

### 4.6 Partner Logo Carousels (auto-scroll, multiple rows)
**Credit Cards / Banks:** Kogan, Bankwest, Bank Australia, ANZ, American Express, HSBC, Defence Bank, Citi, Bendigo Bank, Harmoney, Now Finance, Westpac, OMM Bank, Latitude, NAB, ING, Ubank, MACQ

**Solar:** Sunpower, Jinko, ReneSolar, Trina Solar, Canadian Solar, JA Solar, West Wind, Sunboost, Swoop

**NBN/Telco:** Superloop, Buddy Telco, Tangerine Telecom, iiNet, Dodo, Origin Broadband, Moose NBN

**Inverters:** Jinko, Fronius, Redback, Growatt, Fox ESS, Solis, SunGrow, Goodwe

### 4.7 Value Proposition (cream background)
- **"Our Fellow Australians! Pay Less Enjoy Moreeee."**
- Body paragraph about trusted utility brokers network

### 4.8 Process Steps (4 columns)
| Step | Title | Description |
|------|-------|-------------|
| 1 | **Explore.** | Enter postcode + details for top brokers |
| 2 | **Select.** | Compare 400+ companies |
| 3 | **Switch.** | Save with high-value plans |
| 4 | **Save.** | Same copy as Switch (duplicate on original) |

**CTA:** "Connect Now" button after steps

### 4.9 Testimonials
- **"Let's see what our clients says"**
- Stats: 6 years · 45,000+ users · 4.3-star rating
- Review card: **James Wilson** — credit card quote

### 4.10 Video Section
- **"Why you should review your bills today!"**
- Sub: "Check these videos and get further clarifications"
- Embedded video player(s)

### 4.11 About Us
- Full paragraph about UtilityChoice marketplace (10+ years, 45,000+ customers)
- Image: "Utility Choices"

### 4.12 Vision & Mission
- **# Our Vision** — mission to empower consumers (note: labels swapped vs content on original)
- **# Our Misson** — envision effortless marketplace (typo "Misson" preserved on original)
- Animated marquee text repeating "Our Vision" / "Our Misson"

### 4.13 Bottom CTA
- **"It's better to explore before you pay more."**
- "Connect Now" button
- 6 service image cards: Credit Card, Personal Loan, Inverter, Home Loan, Solar, NBN

---

## 5. Footer (full structure)

```
┌─────────────────────────────────────────────────────────┐
│  "Connecting to better"                                  │
├──────────────┬──────────────┬───────────────────────────┤
│ Our Products │ Other links  │ Contact                   │
│ Credit Card  │ Blogs        │ 322 King William St,       │
│ Personal Loan│ Terms of Use │ Adelaide SA 5000, AU       │
│ Solar Panel  │ Privacy Policy│ help@utilitychoice.com.au │
│ Home Loan    │ Disclaimer   │ 08 6385 7841              │
│ Inverters    │              │                           │
│ NBN          │              │                           │
├──────────────┴──────────────┴───────────────────────────┤
│  Platform description paragraph                          │
├─────────────────────────────────────────────────────────┤
│  ISO 27001 badge | ISO 9001 badge                        │
├─────────────────────────────────────────────────────────┤
│  Security disclaimer (full paragraph)                    │
├─────────────────────────────────────────────────────────┤
│  Trust Pilot verified | SSL Secured | Google Verified    │
│  Secured site in australia                               │
├─────────────────────────────────────────────────────────┤
│  Copyright @2021 - 2025 by UtilityChoice                 │
└─────────────────────────────────────────────────────────┘
```

**Security text (exact):**
> At UtilityChoice.com.au, we prioritize the security and confidentiality of your information. Rest assured, your details are stored safely and will be used solely by our team of Australian-based agents and experts to contact you with better deals tailored to your needs. We collaborate with a network of trusted utility brokers to ensure you receive the most competitive offers available.

---

## 6. Contact Information

| Field | Value |
|-------|-------|
| Email | help@utilitychoice.com.au |
| Phone | 08 6385 7841 |
| Address | 322 King William St, Adelaide SA 5000, Australia |
| Schema address | Epping, AU (JSON-LD) |

---

## 7. CTAs on Homepage

| Button | Count | Destination |
|--------|-------|-------------|
| Explore | 1+ | Postcode search submit |
| Connect Now | 4 | `/enquiry` or `/call-contact` |

---

## 8. Animations & Interactions

- Service tab icons: animated GIFs (Home Loan, Credit Card, etc.)
- Partner logo rows: horizontal auto-scroll carousels
- Vision/Mission: CSS marquee animation
- Page transitions: 0.6s cubic-bezier slide (Wix MPA)
- Image load: 9px blur → sharp (0.8s)
- Button hover: 0.2s color transition

---

## 9. SEO & Trust Signals

- Title: Explore & Compare Home Loan Deals | Utilitychoice - Best Utility Marketplace
- JSON-LD: LocalBusiness + WebSite
- Trust badges: Google, Trustpilot, Facebook, ISO 27001, ISO 9001, SSL
- Pinterest domain verification meta tag

---

## 10. Clone Gap Analysis (current vs original)

| Element | Original | Clone status |
|---------|----------|--------------|
| "Connecting to better" tagline | ✅ | ❌ Missing |
| Orange "Best" highlight | ✅ | ❌ Missing |
| Trust review badges (3) | ✅ | ❌ Missing |
| Partner logo carousels (50+) | ✅ | ⚠️ Text badges only |
| Service tab GIF icons | ✅ | ⚠️ Text pills only |
| Connect Now mid-page CTA | ✅ | ❌ Missing |
| Full footer w/ Adelaide address | ✅ | ❌ Simplified |
| ISO/security badges | ✅ | ❌ Missing |
| Vision/Mission marquee | ✅ | ❌ Static only |
| Bottom service image cards | ✅ | ⚠️ Text links only |

**Estimated match after deep read: ~85% structure, ~75% visual fidelity**

---

## 11. Recommended Implementation Priority

1. Hero tagline + orange "Best" highlight
2. Trust badges section (Google, Trustpilot, Facebook)
3. Partner logo scrolling carousels (Wix CDN images)
4. Full footer with contact, legal links, security text
5. Connect Now CTAs in process + bottom sections
6. Service tab icon images (GIFs from Wix CDN)
