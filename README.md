# Gazelle Brand Site

Gazelle is a premium coffee brand concept site built with React, Vite, Express, and TypeScript. The frontend is a multi-page marketing experience; the backend currently handles contact form submissions and newsletter signups.

## Stack

- React 18 + Vite
- Tailwind CSS + Framer Motion
- Express 5
- Drizzle ORM + PostgreSQL

## Status

- The site can run without a database.
- If `DATABASE_URL` is missing, the server falls back to in-memory storage.
- Contact and newsletter submissions persist only when a Postgres database is configured.

## Local Development

```bash
npm install
npm run dev
```

The app listens on `PORT`, which defaults to `5000`.

## Environment

Copy `.env.example` to `.env` if you want persistent form storage.

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/gazelle
PORT=5000
```

## Scripts

- `npm run dev` starts the Vite/Express development server
- `npm run check` runs TypeScript
- `npm run build` builds the client and bundles the server
- `npm run start` runs the production build from `dist/index.cjs`
- `npm run db:push` pushes the schema to Postgres with Drizzle
