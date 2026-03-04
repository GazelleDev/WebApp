# Gazelle Brand Site

Gazelle is a premium coffee brand site built with React, Vite, Express, and TypeScript. The frontend is a multi-page marketing experience, and the backend now supports both public form handling and a private owner admin for editable site content and menu management.

## Stack

- React 18 + Vite
- Tailwind CSS + Framer Motion
- Express 5
- Drizzle ORM + PostgreSQL

## Status

- The site can run without a database.
- If `DATABASE_URL` is missing, the server falls back to in-memory storage.
- Contact and newsletter submissions persist only when a Postgres database is configured.
- The public site still renders without Postgres, but `/admin` editing requires a configured database, `SESSION_SECRET`, and a seeded owner account.

## Local Development

```bash
npm install
npm run dev
```

The app listens on `PORT`, which defaults to `5000`.

## Environment

Copy `.env.example` to `.env` if you want persistence and admin editing.

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/gazelle
PORT=5000
ADMIN_EMAIL=owner@gazellecoffee.com
ADMIN_PASSWORD=change-me-please
SESSION_SECRET=replace-with-a-long-random-string
```

## Owner Admin Setup

The owner editing workflow is built into this app at `/admin`.

1. Configure `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET`.
2. Push the schema to Postgres:

```bash
npm run db:push
```

3. Seed the initial owner account and editable content:

```bash
npm run admin:seed
```

4. Start the app and sign in at `/admin/login`.

What owners can edit in phase 1:

- global business details
- homepage, about, location, gallery, contact, footer, privacy copy
- full menu categories and items

What still stays in code:

- image assets
- page layout and design structure

## Scripts

- `npm run dev` starts the Vite/Express development server
- `npm run check` runs TypeScript
- `npm run verify` runs typecheck + production build
- `npm run build` builds the client and bundles the server
- `npm run start` runs the production build from `dist/index.cjs`
- `npm run db:push` pushes the schema to Postgres with Drizzle
- `npm run admin:seed` seeds the owner account and editable content documents

## Publishing

The repo now includes:

- a production `Dockerfile`
- GitHub Actions CI
- GitHub Actions CD for publishing a container image to GHCR
- an app health endpoint at `/api/health`

Publishing and secret setup details are in [PUBLISHING.md](/Users/yazan/Documents/Gazelle/Dev/Brand-Design-Guide/PUBLISHING.md).
