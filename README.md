# LoanCursor

LoanCursor is a scenario-based lending engine and UI built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

It’s designed to let you:
- create / edit a scenario
- evaluate lender rules against that scenario
- view ranked results and “why not” reasons

## Getting started (local)

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

Then open: `http://localhost:3000`

## Configuration (env variables)

Create a local env file named **`.env.local`** (this file is ignored by git):

```bash
COMM_CODE=1234
```

- `COMM_CODE` is used by the simple access gate in `app/api/auth/login/route.ts`.
- On Vercel, add the same variable in **Project → Settings → Environment Variables**.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # run production server
npm run lint    # lint
```

## Project structure

- `app/` — routes, pages, API routes (Next.js App Router)
- `components/` — UI components
- `core/` — core domain logic (scenario types, lender rule evaluation, ranking)
- `lib/` — stores and helpers (client state, utilities)
- `public/` — static assets

## Deployment notes (Vercel)

Recommended flow:
1. Push this repo to GitHub
2. Import it into Vercel
3. Add env vars (at least `COMM_CODE`)
4. Deploy

---

If you’re working on lender rules and ranking logic, start in `core/` first — that’s where the engine lives.


Test push from correct account