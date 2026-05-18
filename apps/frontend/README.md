## Frontend App

Main scripts:

- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm check-types`

## Tracking

Meta Pixel and conversion event documentation lives in [docs/meta-tracking.md](docs/meta-tracking.md).

## Getting Started

Run the development server:

```bash
pnpm dev
```

The frontend app runs on `http://localhost:3010` by default.

Type checking:

```bash
pnpm check-types
```

Linting:

```bash
pnpm lint
```

## Learn More

Relevant references:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [App Router documentation](https://nextjs.org/docs/app)

## Notes

- PayPal flows rely on the environment variables in `apps/frontend/.env.local`.
- Meta Pixel is optional and only mounts when `NEXT_PUBLIC_META_PIXEL_ID` is set.

