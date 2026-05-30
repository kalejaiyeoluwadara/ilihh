# Artisan Detail & Booking Feature — Agent Documentation

> **Read first:** [AGENTS.md](../AGENTS.md) for global project rules (stack, styling, architecture, constraints).  
> This document is the **source of truth for artisan profile/detail and booking entry work** in ilihh.

---

## Purpose

Build the **Artisan Detail screen** — the page a client lands on after tapping **Book Now** on an artisan card. This is a **major marketplace feature** and should feel thorough, trustworthy, and polished.

The screen lets clients:

- View full artisan identity and availability
- Read an expanded bio and key stats
- Browse **recent work / portfolio**
- Read **ratings and reviews**
- See **contact details** and **service address**
- Understand **billing / payment terms** (when provided)
- Proceed to book (CTA — booking flow itself is a later feature)

No backend. Use typed hardcoded data in `src/data/`. Keep the implementation teachable.

---

## Current State (Baseline)

| Area | Status | Location |
|------|--------|----------|
| Artisan list cards | ✅ Done | `src/components/artisan-card.tsx` |
| Artisan list data (summary) | ✅ Done | `src/data/artisans.ts` — `Artisan` interface |
| Book Now navigation | ❌ Missing | `client-dashboard.tsx` — empty `onBookPress` |
| Detail route | ❌ Missing | No `src/app/artisan/[id].tsx` |
| Rich profile data | ❌ Missing | No portfolio, reviews, contact, billing |
| Detail components | ❌ Missing | — |

### Existing `Artisan` summary fields

```ts
id, name, category, rating, reviewsCount, jobsCompleted,
location, distance, rate, bio, avatar, isVerified, isAvailable
```

These are enough for **cards** but not for the **detail page**. Extend with a detail layer (see [Data Model](#data-model)).

---

## Scope — v1 Detail Screen

### Required sections (in order)

| Section | Content |
|---------|---------|
| **Header / Hero** | Back nav, avatar, name, verified badge, category pill, availability, rating + review count, rate |
| **About** | Full bio, years of experience, response time |
| **Stats strip** | Jobs completed, rating, reviews (neutral styling — no per-category colors) |
| **Portfolio** | Recent works — image + title + completion date; horizontal scroll or 2-column grid |
| **Reviews & Ratings** | Individual review cards: client name, stars, service type, comment, date |
| **Contact & Location** | Phone, email, full address, service area |
| **Billing** | How billing works — only if artisan has `billing` data |
| **Sticky footer CTA** | Primary "Book Now" / "Request Booking" button + rate reminder |

### Out of scope (v1 — do not build unless requested)

- Full booking form / calendar picker
- In-app chat from this screen
- Payment processing
- Map embed / Google Maps
- Share profile
- Report artisan
- Edit profile (artisan-side)

### Optional v1.1

- Require login before booking CTA → redirect to `/login`
- Save/favorite artisan
- Photo lightbox on portfolio tap

**Default for v1:** Guest can view full detail. CTA shows alert or placeholder message that booking flow is coming next (or navigates to login — pick one and document).

---

## Navigation Architecture

### Route

```txt
src/app/artisan/[id].tsx
```

Expo Router dynamic segment. URL: `/artisan/art-1`

### Entry points

| Source | Action |
|--------|--------|
| `ArtisanCard` → Book Now | `router.push(\`/artisan/${artisan.id}\`)` |
| Future: deep link | Same route with `id` param |

### Back navigation

Custom back button in screen header (match auth screens pattern). Use `router.back()`.

### Not found

If `id` is invalid → simple empty state with back button ("Artisan not found").

---

## Data Model

### Create `src/types/artisan-detail.ts`

```ts
export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  completedAt: string;
}

export interface ArtisanReview {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export interface ArtisanContact {
  phone: string;
  email: string;
  address: string;
  serviceArea: string;
}

export interface ArtisanBilling {
  summary: string;
  paymentMethods: string[];
  notes: string[];
}

export interface ArtisanDetail {
  // Summary fields (same as Artisan)
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  location: string;
  distance: string;
  rate: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  isAvailable: boolean;
  // Detail-only fields
  yearsExperience: number;
  responseTime: string;
  contact: ArtisanContact;
  billing?: ArtisanBilling;
  portfolio: PortfolioItem[];
  reviews: ArtisanReview[];
}
```

### Create `src/data/artisan-details.ts`

- Export `ARTISAN_DETAILS: ArtisanDetail[]` with **rich mock data for all 6 artisans**
- Each artisan should have **3–4 portfolio items** and **2–3 reviews**
- At least **4 artisans** should include `billing` info; others can omit it
- Use realistic Ilisan/Ogun State context (addresses, ₦ rates, local service names)

### Create `src/lib/artisans.ts`

```ts
export function getArtisanDetail(id: string): ArtisanDetail | undefined;
export function getAllArtisanSummaries(): Artisan[]; // optional helper
```

Keep `src/data/artisans.ts` as the **list source** OR merge into one file — prefer **one detail file** that exports summaries via `.map()` to avoid drift. Document the chosen approach in code comments.

**Recommended:** `artisan-details.ts` is canonical; `ARTISANS` in `artisans.ts` derived from details for list view (single source of truth).

---

## UI & Design System

Follow [AGENTS.md](../AGENTS.md) and patterns from `artisan-card.tsx`, auth screens, and profile screens.

### Visual principles for this feature

- **Detailed but not cluttered** — clear section headings, generous spacing
- **Mature aesthetic** — neutral slate pills/stats; no per-category rainbow colors
- **No emoji icons** — use `src/components/icons.tsx`
- **No borders on avatars/portfolio images** unless design requires
- **Dark mode** required on all sections
- **Sticky footer** for primary CTA — use `StyleSheet` for safe area inset

### Style rules (from AGENTS.md)

- NativeWind v5 for most layout/typography
- `StyleSheet` for: `SafeAreaView`, `ScrollView` `contentContainerStyle`, sticky footer, shadows, platform-specific insets
- Images via `expo-image`; remote URLs OK for portfolio (Unsplash)

### Section heading pattern

```tsx
<Text className="font-poppins-semibold text-base text-text-primary dark:text-slate-100 mb-3">
  Recent Work
</Text>
```

### Components to create

| Component | Responsibility |
|-----------|----------------|
| `artisan-detail-header.tsx` | Hero: avatar, name, meta, stats summary |
| `portfolio-section.tsx` | Portfolio grid or horizontal list |
| `review-card.tsx` | Single review row/card |
| `reviews-section.tsx` | Reviews list + average breakdown |
| `contact-details-section.tsx` | Phone, email, address blocks |
| `billing-section.tsx` | Billing summary (conditional render) |
| `artisan-detail-footer.tsx` | Sticky Book Now bar |

Extract only when it keeps `artisan/[id].tsx` readable. Screen should **compose** components, not contain 300+ lines of JSX.

### Icons (`icons.tsx`)

Add as needed: `PhoneIcon`, `MailIcon`, `LocationIcon`, `StarIcon`, `VerifiedIcon`, `BackIcon` (exist). Consider `ClockIcon`, `CreditCardIcon` or `DocIcon` for billing.

---

## Screen Structure

```txt
SafeAreaView
  ScrollView (flex 1, padding bottom for footer)
    Back button row
    ArtisanDetailHeader
    AboutSection (inline or component)
    StatsStrip
    PortfolioSection
    ReviewsSection
    ContactDetailsSection
    BillingSection (if billing)
  ArtisanDetailFooter (absolute/sticky bottom)
```

### Footer CTA behavior (v1)

- If `!artisan.isAvailable` → disabled button "Unavailable"
- If available → "Book Now" → auth gate → booking form at `/artisan/[id]/book`  
  **See [docs/booking-feature.md](./booking-feature.md) for the full booking flow.**

---

## Integration Checklist

- [ ] `src/types/artisan-detail.ts`
- [ ] `src/data/artisan-details.ts` — full mock data
- [ ] `src/lib/artisans.ts` — lookup helpers
- [ ] Refactor `src/data/artisans.ts` if needed (single source of truth)
- [ ] `src/app/artisan/[id].tsx`
- [ ] Detail components (see table above)
- [ ] `src/components/icons.tsx` — any new icons
- [ ] `src/components/client-dashboard.tsx` — wire `onBookPress` → `/artisan/[id]`
- [ ] Optional: tap card body → same route (not required v1)

---

## Suggested Implementation Order

1. Types + mock detail data (all artisans)
2. `getArtisanDetail` helper
3. Icons + small reusable components (`review-card`, footer)
4. Section components
5. `artisan/[id].tsx` screen
6. Wire Book Now from dashboard
7. QA: every artisan id loads; missing id handled; dark mode; scroll + sticky footer

---

## Testing & QA

### Manual test plan

1. From Discover → tap Book Now on Babajide → detail loads
2. All sections visible: portfolio, reviews, contact
3. Artisan with billing (e.g. Chioma) shows billing section
4. Artisan without billing hides billing section
5. Gbenga (unavailable) → disabled footer CTA
6. Invalid URL `/artisan/bad-id` → not found state
7. Back button returns to dashboard
8. Dark mode on entire screen
9. Footer does not cover last section content (scroll padding)

### Before marking complete

```bash
npm run lint
npx tsc --noEmit
```

---

## Anti-Patterns (Do Not Do)

- ❌ Duplicating artisan data in two files without a single source of truth
- ❌ Emoji for stars, phone, location in detail UI
- ❌ Per-category color theming on detail page
- ❌ Putting all JSX in one 400-line screen file
- ❌ Adding map SDK or payment SDK without approval
- ❌ `SafeAreaView className="..."`
- ❌ Inline SVG in screen files

---

## Related Files

```
src/components/artisan-card.tsx
src/components/client-dashboard.tsx
src/data/artisans.ts
src/data/categories.ts
src/app/_layout.tsx
src/app/index.tsx
docs/auth-feature.md
AGENTS.md
```

---

## Agent Workflow Summary

1. Read **AGENTS.md** and **this document**
2. Implement data layer first (types + mock details)
3. Build screen section by section
4. Wire navigation from Book Now
5. Run lint + manual QA
6. Explain changes and how to test
