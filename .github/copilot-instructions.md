# Copilot Instructions — AIM Landing Page

## Project

Corporate landing page for **AIM Asesorías Integrales de Gestión** (`aimasesorias.com`).
Stack: React 19 + Vite 7 + Tailwind CSS 4.

## Commands

```bash
npm run dev       # Dev server with HMR
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint (no --fix flag exists by default)
```

No test suite is configured.

## Architecture

The entire app lives in **one large single-file component**:

- `src/App.jsx` — Primary implementation used by `main.jsx`

`src/App.jsx` follows this structure:
1. `CONFIG` object (contact info, URLs, security limits)
2. Design constants (`PHI`, `SPACING`, `COLORS`)
3. Data arrays (`TEAM_DATA`, `SERVICES_DATA`, `COVERAGE_DATA`, `FAQ_DATA`)
4. Security utility functions (`sanitizeInput`, `validateEmail`, `validatePhone`, `escapeHTML`)
5. Custom hooks (`useScrollSpy`, `useThrottle`)
6. Atomic components (`Button`, `SectionTitle`, …)
7. Section-level components
8. Default export: `App`

## Key Conventions

### Styling: CSS-in-JS, not Tailwind utilities
Despite Tailwind being installed, styles are applied via **inline `style` objects** using the `COLORS` and `SPACING` constants — not Tailwind utility classes. `index.css` only contains `@import 'tailwindcss'`.

### Spacing: Fibonacci / Golden Ratio
All spacing comes from the `SPACING` constant (8 → 13 → 21 → 34 → 55 → 89 → 144 px). Always use `SPACING.xs/sm/md/lg/xl/xxl/xxxl` instead of arbitrary pixel values.

### Colors: Corporate palette
Always use `COLORS.*` (e.g., `COLORS.navy`, `COLORS.teal`) — never hardcode hex values.

### Data: SCREAMING_SNAKE_CASE constants
All content (team, services, FAQs, coverage) is in top-level `const` arrays. ESLint is configured to ignore unused vars matching `^[A-Z_]`, so unused data constants won't trigger errors.

### Security rules (strictly enforced)
- `dangerouslySetInnerHTML` is **prohibited**
- All user input must pass through `sanitizeInput()` before use
- All external URLs must use `https://`
- Forms use `useThrottle` with `CONFIG.security.rateLimitDelay` (3000 ms) to prevent spam
- Email validated with `validateEmail()`, phone with `validatePhone()`

### Hover state pattern
Components manage hover state locally with `useState` + `onMouseEnter`/`onMouseLeave` — no CSS pseudo-classes.

### IDs for React keys
Data objects use kebab-case string `id` fields (e.g., `'maria-rodriguez'`) as React list keys, never array indices.
