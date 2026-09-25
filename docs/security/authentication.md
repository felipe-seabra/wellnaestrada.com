# Authentication & Security Overview

The application protects administrative functionality through authenticated server-side access and route protection.

## Principles

- Authentication state is validated on the server.
- Administrative routes are protected by Next.js middleware.
- Privileged database access is restricted to server-only code.
- Service-role credentials must never be exposed to client-side code.
- Environment-specific secrets belong in local or deployment configuration.
- External input is validated before persistence or business processing.

## Data Access

The application separates presentation from persistence through repositories and services.

Privileged operations use server-side clients only, while public-facing operations follow the database authorization model.

## Local Development

Local credentials should be supplied through `.env.local` and must never be committed.

For local setup, use the values documented in `.env.example`.

## Security Rule

Never commit:

- Production passwords
- API keys
- Service-role keys
- JWT secrets
- Private keys
- Personal customer data

This document intentionally avoids operational secrets and environment-specific authentication details.
