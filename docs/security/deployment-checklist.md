# Deployment Checklist

This checklist must be completed and verified before ANY production deployment.

## 1. Security & Vulnerability Audit
- [ ] Run `npm audit` and ensure no high/critical vulnerabilities remain.
- [ ] Verify no secrets are exposed in `.env.example` or client-side code.
- [ ] Review Server Actions for proper authorization and validation.

## 2. Code Quality & Standards
- [ ] `npm run lint` passes without errors.
- [ ] `npm run type-check` passes without errors.
- [ ] `npm run format` has been executed.

## 3. Build & Performance
- [ ] `npm run build` completes successfully.
- [ ] Lighthouse audit shows score > 90 for Performance, SEO, and Accessibility.
- [ ] Images are optimized and using `next/image`.
- [ ] Metadata is correctly configured for all pages.

## 4. Infrastructure & Database
- [ ] Docker configurations are stable and not exposing insecure ports.
- [ ] Database migrations are tested and ready to apply.
- [ ] Rate limiting is implemented for forms and API routes.

## 5. Documentation
- [ ] `CHANGELOG.md` updated with the new release info.
- [ ] `GEMINI.md` updated with any architectural changes.
- [ ] `docs/security/security-audit.md` updated with the latest results.
