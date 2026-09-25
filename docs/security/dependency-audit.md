# Dependency Audit

Dependency security should be checked regularly as part of project maintenance.

## Recommended Checks

Run:

```bash
npm audit
npm outdated
```

Review dependency updates before applying them, paying particular attention to framework, build-tool and authentication-related packages.

## Project Policy

- Keep dependencies reasonably current.
- Prefer supported releases.
- Review security advisories before upgrading.
- Re-run lint, type-check and build after dependency changes.

Historical audit results are intentionally not retained in the public repository because they become stale as dependencies change.
