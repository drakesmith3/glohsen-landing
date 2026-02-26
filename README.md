# GLOHSEN Landing Page

Standalone Vite + React landing page for [glohsen.com](https://glohsen.com).

## Stack
- **Vite** + **React** + **TypeScript**
- **Tailwind CSS**
- **Three.js** (`@react-three/fiber`, `@react-three/drei`)
- **GSAP** for animations
- Zero backend dependencies on this branch

## Getting Started

```bash
npm install
npm run dev           # full app dev
npx vite --config vite.landing.config.ts   # landing page dev
```

## Build for Production (Landing Page Only)

```bash
npx vite build --config vite.landing.config.ts
# Output: dist-landing/
```

## Deploy to Vercel
1. Import this repo on [vercel.com](https://vercel.com)
2. Build command and output directory are auto-detected from `vercel.json`
3. Add custom domain `glohsen.com` in Vercel project settings

## Namecheap DNS Setup
| Type | Host | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

## Waitlist
The waitlist is currently a **UI placeholder**. To wire it up to a backend:
- Open `src/components/Waitlist.tsx`
- Replace the `handleSubmit` function with your preferred API (Supabase, Mailchimp, etc.)
