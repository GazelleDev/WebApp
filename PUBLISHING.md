# Publishing

This repo is set up to publish as a containerized full-stack app.

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

## Optional GitHub Secrets For CD

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
