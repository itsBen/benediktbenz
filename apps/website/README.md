# website

Next.js portfolio site deployed at [benediktbenz.com](https://benediktbenz.com).

## Features

- Animated hero intro with a typing effect and reduced-motion support
- Fixed header with theme toggle and active section tracking
- Section dot navigation
- Interactive tech stack cards with hover-expand details
- Surf map - toggle between surfed spots and a wishlist, with marker clustering
- Contact section with social links

## Tech Stack

- **Core:** Next.js 16.2.6, React 19.2.6, TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion
- **Maps:** Leaflet, React Leaflet, leaflet.markercluster
- **Tooling:** ESLint, Netlify static export

## Getting Started

The surf map reads from `shared/data/visited_surf_spots.json`. Run `surf-api` first if you want up-to-date spot data, then:

```bash
npm install
npm run dev
```

The `predev` script automatically copies the latest spot data from `shared/data/` into `public/data/` before starting the dev server.

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Configuration

No environment variables required. Spot data is loaded at build time from `public/data/visited_surf_spots.json`.

## Scripts

```bash
npm run build   # production build (also copies spot data via prebuild)
npm run lint
```

## Deployment

Deployed to Netlify as a static export. Configuration is in [`netlify.toml`](../../netlify.toml) at the repo root.
