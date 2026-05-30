# Booking Feature — Agent Documentation

> **Read first:** [AGENTS.md](../AGENTS.md) for global project rules (stack, styling, architecture, constraints).  
> This document is the **source of truth for client booking flow work** in ilihh.

---

## Purpose

Build the **Book Now flow** — what happens after a client taps **Book Now** on the artisan detail footer. Clients can describe their job, pick a preferred date/time, and submit a booking request that appears in their **Bookings** tab.

No backend. Use Zustand + AsyncStorage for persistence. Keep the implementation teachable.

---

## Current State (Baseline)

| Area | Status | Location |
|------|--------|----------|
| Artisan detail screen | ✅ Done | `src/app/artisan/[id]/index.tsx` |
| Detail footer CTA | ⚠️ Placeholder | Was `Alert.alert` — now navigates to booking |
| Booking form route | ❌ Missing | — |
| Client booking store | ❌ Missing | — |
| Client Bookings tab | ⚠️ Empty state only | `src/components/client-bookings.tsx` |
| Artisan incoming requests | ✅ Demo only | `MOCK_BOOKING_REQUESTS` in `index.tsx` (separate from client store for v1) |

---

## Scope — v1 Booking Flow

### Required

| Step | Behavior |
|------|----------|
| **Auth gate** | Guest tapping Book Now → redirect to `/login?redirect=/artisan/[id]/book` |
| **Booking form** | Route `/artisan/[id]/book` — artisan summary + job details form |
| **Validation** | Service description, location, preferred date, preferred time (pure functions in `lib/`) |
| **Submit** | Save to `useBookingStore`, status `pending`, navigate home |
| **Bookings tab** | List client's bookings from store; empty state when none |

### Form fields

| Field | Required | Notes |
|-------|----------|-------|
| Service description | Yes | Min 10 characters — what the client needs done |
| Location | Yes | Pre-fill from logged-in user's location |
| Preferred date | Yes | Native date picker (`@expo/ui/community/datetime-picker`), today → 90 days ahead |
| Preferred time | Yes | Native time picker |
| Budget | No | Pre-fill with artisan's starting rate |

### Out of scope (v1)

- Calendar / date picker SDK
- Real-time sync to artisan dashboard (`MOCK_BOOKING_REQUESTS` stays separate)
- Payment processing
- Booking edit / reschedule
- Push notifications
- In-app chat from booking

### Optional v1.1

- Success confirmation screen before returning home
- Deep link to Bookings tab after submit
- Merge client bookings into artisan `BookingRequest` feed

---

## Navigation Architecture

### Routes

```txt
src/app/artisan/[id]/index.tsx   → /artisan/:id        (detail)
src/app/artisan/[id]/book.tsx    → /artisan/:id/book   (booking form)
```

### Entry points

| Source | Action |
|--------|--------|
| Artisan detail footer → Book Now | Auth check → `/artisan/[id]/book` or login with redirect |
| Login success (with redirect param) | `router.replace(redirect)` back to booking form |

### Auth redirect pattern

```tsx
router.push(`/login?redirect=${encodeURIComponent(`/artisan/${id}/book`)}`);
```

Login and sign-up screens read `redirect` from search params and use it after successful auth.

---

## Data Model

### Create `src/types/booking.ts`

```ts
export type BookingStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';

export interface ClientBooking {
  id: string;
  clientId: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanCategory: string;
  serviceDescription: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  budget: string;
  status: BookingStatus;
  createdAt: string;
}

export interface CreateBookingPayload {
  clientId: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanCategory: string;
  serviceDescription: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  budget: string;
}
```

### Store — `src/store/use-booking-store.ts`

- Persist `bookings: ClientBooking[]` via `safeStorage`
- `createBooking(payload)` → appends with generated id, `status: 'pending'`, `createdAt`
- `cancelBooking(id)` → sets status to `cancelled` (only if `pending`)
- `getBookingsForClient(clientId)` — filter helper or selector in component

---

## Validation

### Create `src/lib/booking-validation.ts`

Pure functions, same pattern as `auth-validation.ts`:

- `serviceDescription` — required, min 10 chars
- `location` — required, min 3 chars
- `preferredDate` — required
- `preferredTime` — required
- `budget` — optional

Return `{ isValid, errors }` with field-level error messages.

---

## UI & Components

Follow [AGENTS.md](../AGENTS.md) and patterns from auth screens and artisan detail.

### Components to create

| Component | Responsibility |
|-----------|----------------|
| `booking-artisan-summary.tsx` | Compact artisan card at top of booking form |
| `booking-datetime-field.tsx` | Native date/time picker field |
| `client-booking-card.tsx` | Single booking row in client Bookings tab |
| `booking-status-badge.tsx` | Status pill (pending, accepted, etc.) |

Reuse `AuthTextInput` for form fields and `PrimaryButton` for submit. Reuse `AuthScreenLayout` for keyboard-safe scroll.

### Booking form screen structure

```txt
AuthScreenLayout
  Back button + title
  BookingArtisanSummary
  Form fields (description, location, date, time, budget)
  PrimaryButton "Send Booking Request"
```

### Client Bookings tab

- If no bookings for current user → existing empty state
- Else → `FlatList` or mapped list of `ClientBookingCard`
- Pending bookings show **Cancel request** action

---

## Integration Checklist

- [ ] `src/types/booking.ts`
- [ ] `src/lib/booking-validation.ts`
- [ ] `src/store/use-booking-store.ts`
- [ ] Move `src/app/artisan/[id].tsx` → `src/app/artisan/[id]/index.tsx`
- [ ] `src/app/artisan/[id]/book.tsx`
- [ ] Booking components (summary, card, status badge)
- [ ] Wire detail footer → booking route + auth gate
- [ ] Login/sign-up redirect param support
- [ ] `client-bookings.tsx` reads from store
- [ ] Update `AGENTS.md` feature table

---

## Suggested Implementation Order

1. Types + validation + store
2. Refactor artisan route to `[id]/index.tsx`
3. Booking form screen + summary component
4. Auth gate on detail footer + login redirect
5. Client Bookings tab list
6. QA + lint

---

## Testing & QA

### Manual test plan

1. **Guest flow:** Tap Book Now while logged out → login screen → sign in → lands on booking form
2. **Logged-in flow:** Tap Book Now → booking form with artisan summary
3. **Validation:** Submit empty form → field errors shown
4. **Submit:** Fill form → submit → home screen → Bookings tab shows new request as Pending
5. **Cancel:** Cancel a pending booking → status updates to Cancelled
6. **Unavailable artisan:** Footer disabled, no navigation
7. **Invalid artisan id on book route:** Not found / back navigation
8. Dark mode on form and booking cards

### Before marking complete

```bash
npm run lint
npm run typecheck
```

---

## Anti-Patterns (Do Not Do)

- ❌ Adding calendar SDK or payment SDK without approval
- ❌ Requiring auth for viewing artisan detail (only for booking)
- ❌ Duplicating booking types in `artisans.ts` — use `src/types/booking.ts`
- ❌ Inline SVG in screen files
- ❌ `SafeAreaView className="..."`

---

## Related Files

```
src/app/artisan/[id]/index.tsx
src/app/artisan/[id]/book.tsx
src/components/artisan-detail-footer.tsx
src/components/client-bookings.tsx
src/store/use-booking-store.ts
src/store/use-auth-store.ts
docs/artisan-detail-feature.md
docs/auth-feature.md
AGENTS.md
```

---

## Agent Workflow Summary

1. Read **AGENTS.md** and **this document**
2. Implement store + validation first
3. Build booking form screen
4. Wire auth gate and login redirect
5. Update Client Bookings tab
6. Run lint + manual QA
7. Explain changes and how to test
