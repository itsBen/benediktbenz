# Personal Website

Personal portfolio site for Benedikt Benz, built with Next.js and deployed at [benediktbenz.de](https://benediktbenz.de).

## Technical Features

- Animated hero intro with a typing effect and reduced-motion support
- Fixed header with theme toggle and active section tracking
- Section dot navigation for quick jumping between page sections
- Interactive tech stack cards with hover-expand details
- Surf map section with a surfed/wishlist toggle and clustered map markers
- Contact section with social links
- Netlify-friendly static export setup

## Data Visualizations

- Interactive surf journey map powered by Leaflet and React Leaflet
- Marker clustering to keep the map readable at multiple zoom levels
- Toggle between surfed spots and wish list spots

## Tech Stack

The site is built as a single-page portfolio with anchored navigation, animated sections, and an interactive surf map.

- **Core:** Next.js 16.2.6, React 19.2.6, TypeScript
- **Styling and Motion:** Tailwind CSS 4, Framer Motion
- **Maps and Media:** Leaflet, React Leaflet, react-icons
- **Tooling and Deployment:** ESLint, Netlify static export

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

Useful scripts:

```bash
npm run build
npm run lint
```

## License

MIT License. See [LICENCE.md](LICENCE.md) for the full text.
