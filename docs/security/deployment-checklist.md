# Deployment Checklist

Use this checklist before deploying a new version.

## Security

- [ ] No production secrets are committed.
- [ ] Environment variables are configured in the deployment platform.
- [ ] Server-only credentials are not exposed to client bundles.
- [ ] Server Actions and protected routes validate authorization and input.

## Code Quality

- [ ] `npm run lint` passes.
- [ ] `npm run type-check` passes.
- [ ] `npm run build` passes.

## Performance

- [ ] Images use appropriate Next.js optimization.
- [ ] Metadata is configured.
- [ ] Public routes render correctly on mobile and desktop.

## Data

- [ ] Database migrations have been reviewed.
- [ ] Authorization policies are verified.
- [ ] No real customer or test credentials are included in seed data.

## Documentation

- [ ] README reflects the current architecture.
- [ ] Public documentation contains no private operational information.
