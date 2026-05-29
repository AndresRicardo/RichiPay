# RichiPay - Agent Instructions

## Dev Commands
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run lint` - ESLint check
- `npm run preview` - Preview production build

## Architecture
- **React 19** + **Vite 8** + **TailwindCSS v4** (uses `@tailwindcss/vite` plugin, no config file)
- **Zustand 5** with `persist` middleware → localStorage key: `richipay-obligations`
- **uuid** package for ID generation (not `crypto.randomUUID()`)
- State lives in `src/store/useObligationsStore.js` - also exports `getMonthKey(date)` helper

## Key Patterns
- Store functions: `addObligation`, `editObligation`, `removeObligation`, `togglePayment`, `shouldShowObligation`
- Obligation structure: `{ id, name, amount, dueDay, type, startMonth, applicableMonths }`
- Payment structure: `{ id, obligationId, monthKey, paid, paidAt }`
- `monthKey` format: `"YYYY-MM"` (e.g., "2026-05")

## Important Conventions
1. **Always commit before starting a new phase/feature** - user expects clean commit points
2. **Console.logs for debugging** are already wired in - use them to trace data flow
3. **Component files use PascalCase**, helpers/functions use camelCase
4. **Edit flows through**: PaymentCard → MonthlyList → App (handlers passed as props)
5. **ObligationModal** handles both create and edit via `initialData` prop (null = create, object = edit)

## Project Status
All phases 1-4 complete. Core features:
- CRUD obligations (recurring/occasional)
- Monthly navigation
- Mark as paid (per month)
- History view with summaries