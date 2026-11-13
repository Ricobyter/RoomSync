# apps/web

The RoomSync web application (`@roomsync/web`).

**Status:** Scaffold only. It contains the design system, provider setup, API-client integration point and a starter landing page. There is no authentication, no backend integration and no product feature yet. The "Log in" and "Get started" links point to routes that do not exist.

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, shadcn/ui-style components (Radix Slot, class-variance-authority), Lucide React, Framer Motion, TanStack Query, React Hook Form, Zod and `@hookform/resolvers`. Font: Plus Jakarta Sans via `next/font/google`.

## Commands

Run from the repository root (or use `pnpm --filter @roomsync/web <script>`):

```bash
pnpm dev        # start the dev server on http://localhost:3000
pnpm build      # production build
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Environment

Copy `.env.example` to `.env.local`. Only frontend-safe variables belong here; `NEXT_PUBLIC_*` values are visible in the browser, so never put secrets in them.

| Variable              | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL (default `http://localhost:8000/api`) |

## Shared packages

`@roomsync/contracts`, `@roomsync/api-client`, `@roomsync/shared-utils` and `@roomsync/design-tokens` are workspace dependencies. They export TypeScript source, so they are listed in `transpilePackages` in `next.config.ts`.

Backend access goes through `src/services/api.ts`, which wraps `@roomsync/api-client` with a shared browser client and a per-call server client. Components must not call `fetch` directly. Authentication hooks are marked `TODO(auth)`.

## Design system

- Colours, radii and shadows come only from `@roomsync/design-tokens`. `src/lib/theme.ts` turns them into `:root` CSS variables (`--color-brand-primary`, `--color-background`, `--color-surface`, `--color-border`, `--color-text-primary`, and so on), which the root layout injects.
- `src/app/globals.css` only aliases those variables to Tailwind utilities (`bg-primary`, `bg-page`, `bg-muted`, `border-line`, `rounded-card`, `rounded-button`) and defines the type scale (`text-display`, `text-heading`, `text-subheading`, `text-body-lg`, `text-label`, `text-caption`). It holds no colour values.
- Cards use an 18px radius and buttons a 12px radius.
- The shadcn components in `src/components/ui` (`button`, `card`) are written by hand and follow shadcn conventions; `components.json` is configured so the CLI can add more later. Newly added components will need their default colour classes mapped to the RoomSync utilities above.
- Framer Motion is limited to subtle entrance and hover effects and respects `prefers-reduced-motion`.

## Structure

```text
src/
├── app/          # routes, root layout, global styles, icon.svg
├── components/   # ui (primitives), layout, common
├── config/       # env access
├── hooks/
├── lib/          # utils, theme builder
├── providers/    # React Query and provider composition
├── services/     # API integration
└── styles/
```
