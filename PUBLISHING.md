# Publishing

This repo is set up to publish as a containerized full-stack app.

Recommended host: Render.

Why this is the default recommendation:

- it handles a single Dockerized web service cleanly
- managed Postgres is available in the same platform
- health checks and deploy hooks are first-class
- the repo can be deployed from `render.yaml`

## What Is Included

- GitHub Actions CI on every push and pull request
- GitHub Actions CD on `main` and version tags
- Multi-stage production `Dockerfile`
- Health endpoint at `/api/health`
- Optional production database migration + owner seed during deploy
- Optional deploy-hook trigger for your hosting platform

## GitHub Actions Workflows

### `CI`

Runs on every push and pull request:

- `npm ci`
- `npm run check`
- `npm run build`
- `docker build .`

### `Publish`

Runs on:

- pushes to `main`
- tags matching `v*`
- manual `workflow_dispatch`

It does three things:

1. Verifies the app again with `npm run verify`
2. Builds and pushes a container image to `ghcr.io/<owner>/<repo>`
3. Optionally runs production DB setup and deploy trigger steps when secrets are configured

## Required Runtime Environment

For a real published deployment, configure these environment variables in your hosting platform:

- `DATABASE_URL`
- `SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `PORT`

`PORT` is usually provided by the host automatically. The app defaults to `5000`.

## Render Blueprint

The repo includes [render.yaml](/Users/yazan/Documents/Gazelle/Dev/Brand-Design-Guide/render.yaml).

It provisions:

- `gazelle-web` as a Docker web service
- `gazelle-db` as a managed Postgres database

Default Render behavior in this setup:

- region: `ohio`
- web plan: `starter`
- database plan: `basic-256mb`
- health check path: `/api/health`
- deploys only after GitHub checks pass

Values still requiring manual entry in Render:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Render generates `SESSION_SECRET` automatically and injects `DATABASE_URL` from the managed database.

## GitHub Secrets

I could not set repository secrets from this environment because there is no authenticated GitHub API or CLI access here.

Add these in the GitHub repository settings if you want the publish workflow to do more than push a container image:

- `PRODUCTION_DATABASE_URL`
- `PRODUCTION_SESSION_SECRET`
- `PRODUCTION_ADMIN_EMAIL`
- `PRODUCTION_ADMIN_PASSWORD`
- `PRODUCTION_DEPLOY_WEBHOOK_URL`

Behavior:

- If the production DB secrets are present, the workflow runs `npm run db:push` and `npm run admin:seed`
- If the deploy webhook secret is present, the workflow triggers it after the image is published

If those secrets are missing, the workflow still publishes the image and skips the missing steps.

For Render specifically:

- `PRODUCTION_DATABASE_URL` should be the external Render Postgres connection string
- `PRODUCTION_DEPLOY_WEBHOOK_URL` should be the Render deploy hook URL if you want GitHub Actions to trigger deploys directly

If you use the included `render.yaml` with `autoDeployTrigger: checksPass`, Render can deploy after GitHub checks pass without the deploy-hook secret. In that setup, the GitHub secrets above are optional rather than required.

## Local Container Smoke Test

Build the production image:

```bash
docker build -t gazelle-brand-site .
```

Run it:

```bash
docker run --rm -p 5000:5000 --env-file .env gazelle-brand-site
```

Health check:

```bash
curl http://localhost:5000/api/health
```

## Hosting Notes

This setup is host-agnostic. Any platform that can run a Docker image and provide environment variables will work.

Typical options:

- Render
- Railway
- Fly.io
- DigitalOcean App Platform
- a VM or VPS pulling from GHCR

The app serves both the frontend and backend from the same container.
