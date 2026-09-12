# BlackSentinel Vision — Free / Open-Source Edition

> **This is the free, limited edition.** It's a real, functioning threat
> intelligence platform — not a demo — but it is genuinely limited, not
> just flag-disabled: Dark Web Intel, AI Correlation, Threat Predictions,
> Attack Paths, AI Copilot, and Knowledge Graph are **not included in
> this repository's source at all**. For the full platform with those
> modules, see [blacksentinel.io](https://blacksentinel.io).
>
> Note: this app doesn't have a real per-tenant backend yet (only
> `/api/auth` and `/api/health` are real routes — everything else renders
> from local mock data), so unlike the other BlackSentinel free editions
> there's no server-side usage limit to enforce here; the module removal
> above is the whole story for this repo.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
