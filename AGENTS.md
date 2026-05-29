# RichiPay - Agent Instructions

## Dev Commands
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run lint` - ESLint check
- `npm run preview` - Preview production build

## Architecture
- **React 19** + **Vite 8** + **TailwindCSS v4** (uses `@tailwindcss/vite` plugin, no config file)
- **Supabase** for cloud storage + authentication (no more localStorage)
- **Zustand 5** for state management
- **uuid** package for ID generation

## Supabase Setup
- Config via `.env` file: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Client singleton at `src/lib/supabase.js`
- Auth via `src/contexts/AuthContext.jsx` (AuthProvider wraps App)

## Database Schema (Snake Case!)
**obligations:**
```js
{ id, user_id, name, amount, due_day, type, start_month, applicable_months[], created_at, updated_at }
```

**payments:**
```js
{ id, user_id, obligation_id, month_key, paid, paid_at, created_at }
```

**IMPORTANT:** DB columns use snake_case (due_day, start_month, etc.) - NOT camelCase!

## Store Pattern
- `src/store/useObligationsStore.js` - all CRUD operations go to Supabase
- `fetchData(userId)` - loads obligations + payments from Supabase
- `addObligation`, `editObligation`, `removeObligation`, `togglePayment` - async operations
- `getMonthKey(date)` helper exported for month key format "YYYY-MM"

## Key Patterns
- Store functions: `addObligation`, `editObligation`, `removeObligation`, `togglePayment`, `shouldShowObligation`
- `shouldShowObligation` uses `obligation.type`, `obligation.start_month`, `obligation.applicable_months`
- `monthKey` format: `"YYYY-MM"` (e.g., "2026-05")

## Authentication Flow
1. `AuthContext` manages user session via Supabase Auth
2. Unauthenticated users see `AuthModal` (login/register)
3. On login, `fetchData(userId)` loads user's obligations and payments
4. On logout, `clearData()` resets store

## Important Conventions
1. **Always commit before starting a new phase/feature** - user expects clean commit points
2. **Console.logs for debugging** are already wired in - use them to trace data flow
3. **Component files use PascalCase**, helpers/functions use camelCase
4. **Edit flows through**: PaymentCard → MonthlyList → App (handlers passed as props)
5. **ObligationModal** handles both create and edit via `initialData` prop (null = create, object = edit)
6. **Snake case for DB columns** - always use `due_day`, `start_month`, `obligation_id`, `month_key` when accessing Supabase data

## Project Status
All phases 1-4 complete. Supabase integration with authentication complete.
- CRUD obligations (recurring/occasional)
- Monthly navigation with "Hoy" button and month picker
- Mark as paid (per month)
- History view with summaries
- User authentication via Supabase (email/password)
- Cloud sync - data persists across devices