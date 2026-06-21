# Copilot instructions for this repository

This file summarizes repository-specific commands, architecture, and conventions to help Copilot sessions reason and operate effectively.

## 1) Build, test, and lint commands
- Install dependencies: `npm install`
- Dev server: `npm run dev` (runs `next dev`)
- Build production: `npm run build` (runs `next build`)
- Start production: `npm run start` (runs `next start`)
- Lint: `npm run lint` (runs `eslint`).

Notes:
- TypeScript type-check (no script in package.json): `npx tsc --noEmit -p tsconfig.json`.
- Lint a single file: `npx eslint path/to/file.tsx --ext .ts,.tsx`.
- No test runner found in package.json (no Jest/Vitest configured). If tests are added, run a single test via the test runner CLI (e.g., `npx vitest run path/to/test` or `npx jest path/to/test`).

## 2) High-level architecture (big picture)
- Framework: Next.js (Pages Router) + TypeScript.
- Feature-first code organization: top-level `src/modules/<Feature>/` holds a feature's components, hooks, forms, schemas, models, constants and utilities.
- Thin pages: `src/pages/` should be thin wrappers that only define route entry, optional SEO, optional `getLayout`, and mount the feature module root. Business logic belongs in feature modules.
- Shared UI primitives: `src/components/` contains generic, reusable UI (Button, Card, Modal, Table, Form controls, Loading/Error states).
- Centralized API layer: `src/apis/` contains API client code. Components must not call APIs directly — use query/mutation hooks.
- Data fetching: TanStack Query is used; project-level hooks wrap the library (use `useAppQuery` / `useMutation` instead of calling `useQuery` directly in components).
- Routing & layout strategy: layout-based auth structure + `getLayout` pattern; routes centralized in `APP_ROUTES`.
- Styling: MUI for design system + Tailwind for utilities + SCSS Modules for scoped styles. Preferred pattern: SCSS Modules + Tailwind `@apply` with MUI theme tokens as needed.

## 3) Key conventions and repository-specific rules
- Exports: prefer named exports only.
- Components: reusable UI in `src/components/`; feature-specific UI inside `src/modules/<Feature>/components/`.
- API calls: never from components; use `src/apis/` and typed request/response shapes. Use wrapper hooks (`useAppQuery`, `useMutation`).
- Forms: react-hook-form + zod. Keep schemas outside TSX files; use mutation-based submissions and reusable `Control*` form fields.
- TypeScript: strict mode enabled. Avoid `any` and prefer typed boundaries. Use `npx tsc --noEmit` for project-wide checks.
- Imports: do NOT use `@/` path alias imports (project intentionally avoids that pattern). Use relative or base imports consistent with `baseUrl` set to `.`.
- Environment variables: client-visible vars must be prefixed with `NEXT_PUBLIC_`. Centralize environment access in `src/configs/environment.ts`.
- Styling: prefer SCSS Modules + Tailwind `@apply`. Avoid feature-global CSS and raw hex colors; use MUI theme tokens.
- Lint rules: ESLint configured with TypeScript and React rules; treat console usage and many common mistakes as errors (see `eslintrc.json`).
- State management: prefer simplest solution; order of preference: local state → feature state → Context → Zustand → Redux.
- Anti-patterns to avoid (enforced by README and lint): use of `@/` imports, calling APIs in components, direct use of raw `useQuery` in components, using Formik, creating giant components, duplicating styling systems, hardcoding routes.

## 4) Where Copilot should look first
- For routing/layout decisions: `src/pages/`, `src/layouts/`, and `src/configs/` (APP_ROUTES).
- For feature implementation context: `src/modules/<Feature>/` (components, hooks, schemas, models).
- For API surface and types: `src/apis/` and `src/models/`.
- For theme and styling patterns: `src/theme/` and `src/styles/`.

## 5) Quick heuristics for automated edits or code-gen
- Keep pages thin: prefer moving logic into `src/modules/<Feature>/` when generating code.
- New components should default to SCSS Modules + Tailwind `@apply` and be added under `src/components/` unless feature-specific.
- New data hooks should wrap TanStack Query and expose `useAppQuery`/`useMutation` style signatures, returning typed data and error handling.
- For environment variables, add to `.env.example` and reference via `NEXT_PUBLIC_*` on the client.

## 6) Project Mode: PDF Form Builder (IMPORTANT OVERRIDE)

When working on the PDF form UI feature:

- This is a SINGLE-PAGE UI ONLY
- Do NOT create or use routes under `src/pages/forms`
- Do NOT introduce API layer usage
- Do NOT use TanStack Query for this feature
- Do NOT introduce backend or data-fetching logic
- Use ONLY local React state for UI switching

Feature structure must stay inside:
src/modules/forms/

UI Views:
- Information View (PDF page 1)
- Form View (PDF page 2)

State:
'information' | 'form'

Rules override:
- Simplicity is preferred over architecture
- Do not apply full enterprise patterns to this feature
- Do not refactor unrelated modules

---

This file was created by analyzing package.json, README.md, tsconfig.json and ESLint config. Adjust or extend sections if CI, test frameworks, or scripts are added.
