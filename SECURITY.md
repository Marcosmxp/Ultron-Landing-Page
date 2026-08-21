# Security Policy

## Source-control rules

This repository must never contain production credentials, API keys, private keys, service-account files, database URLs with passwords, access tokens, or Vercel project metadata.

Use environment variables for any future integration. Local secret files are ignored by Git and production secrets must be configured through the deployment platform's environment-variable settings.

## Before every release

- Review staged changes before committing.
- Search the diff for credentials, tokens and private endpoints.
- Keep dependencies pinned to explicit versions.
- Run type checking and a production build.
- Verify production security headers after deployment.

## Vulnerabilities

Do not publish exploitable vulnerability details, credentials, or proof-of-concept secrets in public issues. Handle security reports privately until a disclosure channel is defined.
