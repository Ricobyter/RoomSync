# RoomSync

**Find your space. Find your people.**

RoomSync is a modern roommate discovery and shared-housing platform. It helps people find compatible roommates and suitable accommodation, whether they start with the people or with the place.

> **Status:** Initial repository setup. Nothing described below as "planned" has been implemented yet. See [Current development status](#current-development-status).

## Table of contents

- [Introduction](#introduction)
- [Product vision](#product-vision)
- [Core product journeys](#core-product-journeys)
- [Technology stack](#technology-stack)
- [Repository structure](#repository-structure)
- [Architecture principles](#architecture-principles)
- [Workspace setup](#workspace-setup)
- [Design system](#design-system)
- [Development roadmap](#development-roadmap)
- [Current development status](#current-development-status)
- [Contributing](#contributing)
- [License](#license)

## Introduction

RoomSync supports two equally important journeys:

- **People-first:** discover compatible roommates, connect, form a household and find a flat together.
- **Flat-first:** discover available rooms in existing households and find compatible flatmates.

The initial launch market is **Delhi NCR**: Delhi, Gurugram and Noida. The platform is being developed web-first, with an architecture that is ready for a future React Native + Expo mobile application.

The brand is premium, modern, warm and trustworthy PropTech.

## Product vision

Conventional property platforms centre on the listing: price, size, location. RoomSync centres on the people who will share the home.

- **Compatibility between roommates.** Lifestyle, habits and preferences are first-class data, not an afterthought.
- **Transparency in household expectations.** Households state their norms (cleanliness, guests, schedules, shared costs) up front, so there are fewer surprises after move-in.
- **Finding accommodation with compatible people.** Seekers who start with people can team up first and then search for a flat together.
- **Finding compatible people for existing households.** Households with a vacant room can find flatmates who fit, not just anyone who can pay.
- **Trust and safety.** Verification, moderation and privacy-conscious design are part of the product from the start.

## Core product journeys

### People-first

1. Create a profile with lifestyle and housing preferences.
2. Discover compatible roommates.
3. Connect and chat to confirm the fit.
4. Form a household together.
5. Find a flat as a group.

### Flat-first

1. Create a profile with lifestyle and housing preferences.
2. Browse available rooms in existing households.
3. Review the household's expectations and current flatmates.
4. Connect with the household.
5. Move in with compatible flatmates.

## Technology stack

This is the **intended** stack. None of it is set up yet.

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Lucide React
- Framer Motion
- Plus Jakarta Sans

### Backend

- Python
- Django
- Django REST Framework
- GeoDjango
- drf-spectacular

### Database

- PostgreSQL + PostGIS

### Infrastructure

- Redis
- Celery
- Docker and Docker Compose

### Shared packages

- pnpm workspaces
- openapi-typescript
- openapi-fetch

### Future mobile application

- React Native
- Expo
- Expo Router

## Repository structure

```text
roomsync/
├── apps/
│   ├── web/                  # Next.js web application
│   └── mobile/               # Future React Native + Expo app
├── packages/
│   ├── api-client/           # Typed API client
│   ├── contracts/            # API contracts and generated TS types
│   ├── shared-utils/         # Platform-independent utilities
│   └── design-tokens/        # Shared visual design tokens
├── backend/
│   ├── config/
│   │   └── settings/         # Django settings
│   ├── apps/
│   │   └── accounts/
│   │       └── migrations/
│   └── tests/
├── docs/                     # Technical and product documentation
├── infra/
│   └── docker/               # Docker infrastructure
├── .github/
│   └── workflows/            # CI/CD workflows
├── .editorconfig
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

| Directory                | Responsibility                                                       |
| ------------------------ | -------------------------------------------------------------------- |
| `apps/web`               | The Next.js web application: the primary user interface.             |
| `apps/mobile`            | Future Expo application, built on the same API and shared packages.  |
| `packages/api-client`    | Typed API client shared by web and mobile.                           |
| `packages/contracts`     | API contracts (OpenAPI) and generated TypeScript types.              |
| `packages/shared-utils`  | Platform-independent helpers with no UI or platform dependencies.    |
| `packages/design-tokens` | Colours, radii, typography and other tokens shared across platforms. |
| `backend`                | Django backend: configuration, domain apps and tests.                |
| `docs`                   | Architecture, API and product documentation.                         |
| `infra/docker`           | Container and local-environment configuration.                       |
| `.github/workflows`      | Continuous integration and deployment workflows.                     |

All directories currently contain only documentation or placeholders.

## Architecture principles

1. **Django modular monolith, not microservices.** One deployable backend split into well-bounded domain apps.
2. **Backend owns business logic.** Clients render and collect input; rules, validation and matching live on the server.
3. **PostgreSQL/PostGIS is the primary database.** Relational data and geospatial queries in one place.
4. **API-first.** Features are designed as documented API contracts before UI work.
5. **Shared API contracts between web and mobile.** One OpenAPI schema generates the types used by both clients.
6. **Platform-independent shared utilities.** Shared packages contain no web- or native-only code.
7. **Separate platform-specific UI.** Web and mobile each own their UI; only logic, types and tokens are shared.
8. **Secure authentication and credential storage.** Credentials are hashed, secrets stay out of the repository, and clients store tokens using platform-appropriate secure mechanisms.
9. **Mobile-readiness from the beginning.** API design and package boundaries assume a second client.
10. **Avoid unnecessary complexity in the MVP.** Add infrastructure and abstractions only when a real need appears.

## Workspace setup

The JavaScript/TypeScript side is a [pnpm workspace](https://pnpm.io/workspaces) (`apps/*` and `packages/*`). The Django backend is not part of it. The Next.js web app (`apps/web`, scaffold only) is a workspace package; the Expo app (`apps/mobile`) does not exist yet.

### Prerequisites

- Node.js `>=20.11.0`
- pnpm `>=10` (pinned to `10.34.9` via the `packageManager` field; with Corepack, `corepack enable` selects it automatically)

Use pnpm only; do not use npm or yarn to install.

### Install

```bash
pnpm install
```

### Shared packages

| Package                   | Responsibility                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `@roomsync/contracts`     | API contracts and types generated from the backend OpenAPI schema (not yet generated).          |
| `@roomsync/api-client`    | Framework-independent typed API client; depends on `@roomsync/contracts` (not yet implemented). |
| `@roomsync/shared-utils`  | Platform-independent pure utilities (currently empty).                                          |
| `@roomsync/design-tokens` | Framework-independent colour, typography, spacing and radius tokens.                            |

Applications will depend on these through `"@roomsync/<name>": "workspace:*"`. Packages currently export their TypeScript source directly (`src/index.ts`), so consuming apps must transpile them (for example Next.js `transpilePackages`). Shared packages never import application code, and none depend on Next.js, Expo, Tailwind or shadcn/ui.

### Root scripts

| Script                         | Description                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| `pnpm dev` / `pnpm dev:web`    | Start the web app (`@roomsync/web`).                                 |
| `pnpm dev:mobile`              | Start the mobile app (requires `@roomsync/mobile`, not yet created). |
| `pnpm build`                   | Build the web app .                                                  |
| `pnpm lint`                    | Run `lint` in every package that defines it.                         |
| `pnpm typecheck`               | Run `typecheck` in every package that defines it.                    |
| `pnpm test`                    | Run `test` in every package that defines it.                         |
| `pnpm format` / `format:check` | Format or check formatting with Prettier.                            |

## Design system

**Tagline:** Find your space. Find your people.

| Element          | Final choice             |
| ---------------- | ------------------------ |
| Brand identity   | Premium, modern PropTech |
| Primary font     | Plus Jakarta Sans        |
| Primary colour   | Orange `#DD700B`         |
| Secondary colour | Olive Grey `#707D75`     |
| Warm grey        | `#ADACA7`                |
| Background       | Pale Cream `#FCF8D8`     |
| Neutral surface  | Cool Grey `#D9DADF`      |
| Card radius      | 18px                     |
| Button radius    | 12px                     |
| Icons            | Lucide React             |
| Animations       | Framer Motion            |
| UI style         | Minimal, spacious, clean |

## Development roadmap

These are planned stages, not completed features.

- **Phase 0:** Repository and infrastructure foundation.
- **Phase 1:** Database design and domain modelling.
- **Phase 2:** Authentication and user profiles.
- **Phase 3:** Housing intent, households and room listings.
- **Phase 4:** Matching and discovery.
- **Phase 5:** Connections and messaging.
- **Phase 6:** Trust, safety and launch readiness.
- **Future:** React Native + Expo mobile application.

## Current development status

This repository is at an early stage. It contains the monorepo configuration, shared packages (design tokens plus empty contracts, API client and utilities) and a **scaffold of the web app** with the RoomSync design system and a starter landing page. The backend, database, authentication, mobile app and all product features are **not yet implemented**.

## Contributing

Contribution guidelines will be refined as the project matures. The baseline conventions are:

- **Branch naming:** `type/short-description`, e.g. `feat/user-profile`, `fix/login-redirect`, `docs/readme-update`, `chore/ci-setup`.
- **Commit messages:** [Conventional Commits](https://www.conventionalcommits.org/), e.g. `feat(accounts): add profile model`. Use the imperative mood and keep the subject short.
- **Pull requests:** Keep them small and focused, describe what and why, link related issues, and ensure checks pass before requesting review.
- **Code quality:** Follow the `.editorconfig`, use the project's linters and formatters once configured, and include tests for new behaviour.
- **Documentation:** Update the relevant README or `docs/` page in the same pull request as the change.

## License

The project license has not yet been finalised. See [LICENSE](LICENSE).
#   R o o m S y n c  
 