# Security Review

Security is treated as an ongoing part of development rather than a one-time release step.

## Review Areas

- Dependency vulnerabilities
- Authentication and authorization
- Server/client boundaries
- Environment variables
- Input validation
- Database access controls
- Public exposure of sensitive data
- Deployment configuration

## Release Principle

Before publishing a release, verify that:

1. No credentials or private keys are committed.
2. Privileged services remain server-only.
3. User input is validated.
4. Protected routes enforce authorization.
5. Database policies are appropriate for the data being accessed.
6. Build and type checks pass.

Specific internal findings and historical remediation details are intentionally excluded from the public repository.
