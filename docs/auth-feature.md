# Auth Feature — Agent Documentation

> **Read first:** [AGENTS.md](../AGENTS.md) for global project rules (stack, styling, architecture, constraints).  
> This document is the **source of truth for authentication work** in ilihh. Follow it alongside AGENTS.md before implementing any auth screen, store change, or route.

---

## Purpose

Build a **mock, client-side authentication flow** for ilihh (Ilisan Help Hub) that:

- Lets users **sign up** and **log in** without a real backend
- Supports **dual roles** (Client or Artisan) at registration
- Persists session state with **Zustand + AsyncStorage**
- Keeps the app **teachable** — simple, readable, feature-by-feature
- Matches the existing **design system** (Poppins, purple brand, rounded cards, dark mode)

No database, no API, no secret keys. This is intentional per AGENTS.md.

---

## Current State (Baseline)

### What exists today

| Area | Status | Location |
|------|--------|----------|
| Onboarding (3 slides) | ✅ Done | `src/app/onboarding.tsx` |
| Onboarding gate | ✅ Done | `src/app/_layout.tsx` checks `hasCompletedOnboarding` |
| Main app (guest browsing) | ✅ Done | `src/app/index.tsx` |
| Role toggle (demo) | ✅ Done | `useAppStore` → `userRole`, `toggleUserRole` |
| Login button in header | ⚠️ UI only | `src/components/home-header.tsx` — `onLoginPress` not wired |
| Auth routes | ❌ Missing | No `src/app/(auth)/` group |
| Auth store / session | ❌ Missing | No `isAuthenticated`, no user profile object |
| User types | ❌ Missing | No `src/types/user.ts` |
| Hardcoded user "Dara" | ⚠️ Placeholder | `home-header.tsx`, `client-profile.tsx`, `artisan-profile.tsx` |

### Current Zustand store

File: `src/store/use-app-store.ts`

Persisted fields today:

- `hasCompletedOnboarding: boolean`
- `userRole: 'client' | 'artisan'`

Uses `safeStorage` wrapper (AsyncStorage with web/localStorage/memory fallback). **Reuse this pattern** for auth persistence — do not create a second storage adapter.

### Current navigation flow

```
App launch
  → Fonts load
  → AnimatedSplashOverlay
  → if !hasCompletedOnboarding → OnboardingScreen
  → else → Stack (index only)
```

Target flow after auth (see [Navigation Architecture](#navigation-architecture)):

```
App launch
  → Fonts load
  → Splash
  → if !hasCompletedOnboarding → Onboarding
  → else if !isAuthenticated → (auth) stack   ← new
  → else → Main app
```

**Decision (recommended):** Support **guest browsing** after onboarding. Users land on the main app without logging in; tapping **Login** in the header opens the auth stack as a modal or push. Document this in implementation so students understand optional vs required auth.

If product requires **auth before main app**, switch the gate in `_layout.tsx` accordingly — but confirm with the user/design first.

---

## Scope — Screens to Build

### Required (v1)

| Screen | Route (proposed) | Purpose |
|--------|------------------|---------|
| **Login** | `(auth)/login` | Email/phone + password; link to sign up |
| **Sign Up** | `(auth)/sign-up` | Name, email, phone, password, role, location; link to login |

### Optional (v1.1 — only if design provided)

| Screen | Route | Purpose |
|--------|-------|---------|
| Forgot Password | `(auth)/forgot-password` | UI-only; show success toast/message (no real reset) |
| Role Picker (standalone) | `(auth)/choose-role` | Only if sign-up is split across two screens in design |

### Out of scope (do not build unless explicitly requested)

- Real OAuth (Google, Apple)
- SMS / email verification backends
- JWT refresh, API integration
- Biometric login libraries

---

## Navigation Architecture

### File structure (per AGENTS.md)

```txt
src/app/
  _layout.tsx              # Root gate: onboarding → auth → main
  index.tsx                # Main tabbed home (existing)
  onboarding.tsx           # Existing
  (auth)/
    _layout.tsx            # Auth stack — headerShown: false
    login.tsx
    sign-up.tsx
    forgot-password.tsx    # Optional
```

### Expo Router rules

- Screens in `src/app/` only — **no business logic blobs**; compose components + hooks + store
- Use `Stack` inside `(auth)/_layout.tsx` with `headerShown: false` (match root layout)
- Navigate with `router.push('/login')`, `router.replace('/')` after success
- Auth group path: `/login`, `/sign-up` (Expo Router strips `(auth)` from URL)

### Entry points to wire

1. **HomeHeader Login button** → `router.push('/login')`
2. **Profile screens** → "Sign in" CTA when guest (if guest mode)
3. **Post sign-up / login** → `router.replace('/')` and hydrate store
4. **Logout** → clear auth slice, optionally `router.replace('/login')`

---

## Data Model

### Create `src/types/user.ts`

```ts
export type UserRole = 'client' | 'artisan';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string; // e.g. "Ilisan, Ogun State"
  role: UserRole;
  avatarUri?: string; // optional; default to mascot for v1
  createdAt: string;  // ISO string
}
```

### Create `src/types/auth.ts` (optional but recommended)

```ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  location: string;
}

export interface AuthValidationErrors {
  [field: string]: string | undefined;
}
```

Keep types **simple and readable**. Avoid `any`.

---

## State Management

### Extend `useAppStore` OR create `useAuthStore`

**Recommendation:** Create `src/store/use-auth-store.ts` for separation of concerns (teaches multiple Zustand slices). Persist with the same `safeStorage` pattern — **extract `safeStorage` to `src/lib/storage.ts`** if both stores need it (refactor only when implementing).

#### Auth store shape (proposed)

```ts
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;

  // Mock registered users (persisted for demo login across restarts)
  registeredUsers: User[];

  login: (credentials: LoginCredentials) => { success: boolean; error?: string };
  signUp: (payload: SignUpPayload) => { success: boolean; error?: string };
  logout: () => void;

  // Sync role with app store on login/sign-up
}
```

#### Mock auth behavior

- **Sign up:** Validate fields → hash not required → store user in `registeredUsers` with generated `id` → set `user` + `isAuthenticated: true` → call `setUserRole(payload.role)` on app store
- **Login:** Find user by email in `registeredUsers` → compare password (plain text OK for demo — add comment that production would use secure backend)
- **Logout:** Set `isAuthenticated: false`, `user: null`; do **not** reset onboarding
- **Duplicate email:** Return `{ success: false, error: 'Email already registered' }`

#### Cross-store coordination

On successful login/sign-up:

```ts
useAppStore.getState().setUserRole(user.role);
```

On profile role toggle (existing demo feature): decide whether toggling role updates `user.role` in auth store when authenticated — **yes, keep in sync**.

---

## Validation

Create `src/lib/auth-validation.ts` — pure functions, easy to test/teach:

| Field | Rules (v1) |
|-------|------------|
| fullName | Min 2 chars, trimmed |
| email | Basic email regex |
| phone | Nigerian-friendly: min 10 digits, allow `+234` |
| password | Min 6 chars |
| confirmPassword | Must match password |
| role | Required enum |
| location | Min 2 chars (default suggestion: `"Ilisan, Ogun State"`) |

Return `{ isValid: boolean, errors: AuthValidationErrors }`.

Show errors **inline below inputs** — friendly copy, not alerts-only.

---

## UI & Design System

### AGENTS.md rules that apply directly

- **Pixel-perfect** when design images are provided — do not approximate
- **NativeWind v5** for styling — check `package.json` version before use
- **StyleSheet exceptions:** `SafeAreaView`, `KeyboardAvoidingView`, `ScrollView` (`contentContainerStyle`), `TextInput` (platform props), shadows, pressed states
- **Icons:** Add to `src/components/icons.tsx` — never inline SVG or emoji in auth screens
- **Images:** Register in `src/constants/images.ts` — import via `images.*`
- **No new libraries** without user approval

### Visual patterns to reuse (from onboarding + profile)

| Pattern | Reference |
|---------|-----------|
| Primary CTA button | `onboarding.tsx` — full width, `bg-primary-purple`, `rounded-2xl`, `py-4` |
| Typography | `font-poppins-bold` titles, `font-poppins` body, `text-text-primary` / `text-text-secondary` |
| Input containers | Rounded cards, `border border-slate-200 dark:border-slate-800`, `rounded-2xl` |
| Screen background | `bg-white dark:bg-slate-950` |
| Safe area | `SafeAreaView` with `StyleSheet` — **not** className |

### Auth-specific layout

Each auth screen should include:

1. `SafeAreaView` + `KeyboardAvoidingView` (iOS `padding`, Android `undefined` or `height`)
2. `ScrollView` with `keyboardShouldPersistTaps="handled"`
3. Top: back button (if stack allows) or brand mark / mascot
4. Title + subtitle
5. Form fields
6. Primary submit button
7. Footer link (e.g. "Don't have an account? Sign up")

### Components to create (when reused or clarity warrants)

| Component | When |
|-----------|------|
| `AuthScreenLayout` | Shared wrapper (safe area, keyboard, scroll) — used on 2+ screens |
| `AuthTextInput` | Styled input + label + error — used on login + sign-up |
| `PrimaryButton` | If not already shared — match onboarding CTA |
| `RoleSelector` | Client vs Artisan cards on sign-up |
| `PasswordInput` | TextInput with show/hide toggle |

Do **not** over-extract one-off UI. Ask if unsure (per AGENTS.md).

### Dark mode

All auth screens must support light and dark using existing tokens:

- `--color-primary-purple`, `text-text-primary`, `dark:text-slate-50`, etc. from `src/global.css`

---

## Integration Checklist

When auth is implemented, update these files:

- [ ] `src/app/_layout.tsx` — auth gate (if required) or ensure Stack includes `(auth)` group
- [ ] `src/app/(auth)/_layout.tsx` — new
- [ ] `src/app/(auth)/login.tsx` — new
- [ ] `src/app/(auth)/sign-up.tsx` — new
- [ ] `src/store/use-auth-store.ts` — new
- [ ] `src/lib/storage.ts` — optional extract of `safeStorage`
- [ ] `src/lib/auth-validation.ts` — new
- [ ] `src/types/user.ts` — new
- [ ] `src/components/home-header.tsx` — wire `onLoginPress`, show user name when authenticated
- [ ] `src/app/index.tsx` — pass login handler to `HomeHeader`
- [ ] `src/components/client-profile.tsx` — real user data + logout
- [ ] `src/components/artisan-profile.tsx` — real user data + logout
- [ ] `src/components/icons.tsx` — auth icons (eye, mail, lock, user, etc.)

---

## Suggested Implementation Order

Teach feature-by-feature in this sequence:

1. **Types** — `user.ts`, `auth.ts`
2. **Validation** — `auth-validation.ts`
3. **Store** — `use-auth-store.ts` with mock sign-up/login/logout
4. **Shared UI** — `AuthTextInput`, layout wrapper, icons
5. **Sign Up screen** — creates user, sets role, navigates home
6. **Login screen** — authenticates against registered users
7. **Wire header** — Login button → `/login`
8. **Profile integration** — display `user.fullName`, logout action
9. **Polish** — loading states, empty errors, dark mode QA

---

## Testing & QA

### Manual test plan

1. Fresh install → onboarding → main app as guest
2. Tap Login → login screen opens
3. Sign up as Client → lands on home → header shows name → profile shows Client
4. Logout → guest state restored
5. Sign up as Artisan → role-specific tabs/dashboard
6. Login with wrong password → inline error
7. Duplicate email sign-up → error
8. Kill app and reopen → session persists
9. Dark mode on all auth screens
10. Keyboard does not cover submit button on small devices

### Before marking complete

```bash
npm run lint
```

Fix all lint errors. (`typecheck` script may not exist — run `npx tsc --noEmit` if needed.)

---

## Demo / Seed Data (optional)

For teaching demos, optionally seed one user in the store:

```ts
// Example seed — artisan demo account
{
  id: 'demo-artisan-1',
  fullName: 'Dara',
  email: 'dara@ilihh.demo',
  phone: '+2348012345678',
  location: 'Ilisan, Ogun State',
  role: 'artisan',
  createdAt: new Date().toISOString(),
}
```

Password: `demo123` — document in code comment only, not in user-facing UI.

This explains why "Dara" appears in current mock UI and eases migration.

---

## Open Questions (confirm before coding if unclear)

1. **Guest vs required auth** — Can users browse without logging in? (Current app suggests yes.)
2. **Design assets** — Are Figma/screenshots provided for login and sign-up? If yes, match pixel-perfectly.
3. **Sign-up fields** — Is location a text field or picker? Default to text with Ilisan placeholder.
4. **Forgot password** — Include UI-only screen or skip v1?
5. **Phone login** — Login with email only for v1, or email **or** phone?

Default assumptions if no answer: guest browsing allowed, email login only, no forgot-password v1, text location field, designs to be provided or follow onboarding visual language.

---

## Anti-Patterns (Do Not Do)

- ❌ Adding Firebase, Supabase, or Auth0 without user approval
- ❌ Putting SVG icons inline in screen files
- ❌ Using `SafeAreaView className="..."`
- ❌ Storing real passwords in production-style hashing without explaining it's mock-only
- ❌ Creating auth API routes — no backend in this version
- ❌ Using `any` for form state or store
- ❌ Large monolithic screen files — compose components
- ❌ Skipping AsyncStorage persistence for session

---

## Related Files Quick Reference

```
src/app/_layout.tsx
src/app/onboarding.tsx
src/app/index.tsx
src/store/use-app-store.ts
src/components/home-header.tsx
src/components/client-profile.tsx
src/components/artisan-profile.tsx
src/components/icons.tsx
src/constants/images.ts
src/constants/theme.ts
src/global.css
AGENTS.md
```

---

## Agent Workflow Summary

Before writing auth code:

1. Read **AGENTS.md**
2. Read **this document**
3. Confirm open questions with user if designs/flow unclear
4. Implement in [suggested order](#suggested-implementation-order)
5. Wire integrations from [checklist](#integration-checklist)
6. Run lint and manual QA
7. Explain changes and how to test (concisely)
