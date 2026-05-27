# Dependency Audit

**Date:** 2026-05-27

## Security Scan Results
- **npm audit:** Found 9 vulnerabilities (7 high, 2 moderate).
- **Critical Issues:** None found.
- **High Issues:** Primarily related to ESLint configurations and ReDoS risks in `minimatch`.

## Outdated Packages Analysis
The project is using modern versions of core dependencies (Next.js 16, React 19), but some dev dependencies are trailing behind.

### Major Updates Required
- `@rocketseat/eslint-config`: 2.2.2 -> 3.0.12 (High Priority - Security)

## Recommendations
1. Update `@rocketseat/eslint-config` immediately to resolve most high-severity vulnerabilities.
2. Ensure `postcss` is updated to at least `8.5.10` to mitigate XSS risks.
3. Monitor `shadcn` updates for any component-level vulnerabilities.
