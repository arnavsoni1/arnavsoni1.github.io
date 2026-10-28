# Arnav Soni — Portfolio

An illustrated space-gallery portfolio built with Svelte 5 and Vite. The background Falcon is procedural Three.js geometry, GSAP drives scroll choreography, Lenis provides smooth scrolling, and Anime.js handles ambient character and exhibit motion.

## Local development

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` builds `dist/` and deploys it whenever `main` is updated.

For the compiled Svelte site to be the active Pages source, open:

**Repository Settings → Pages → Build and deployment → Source → GitHub Actions**

The repository root also contains a styled static fallback. If Pages is accidentally left on **Deploy from a branch**, visitors still get a useful portfolio screen instead of a blank page.

## Updating content

- Empty project exhibits: `src/lib/components/Projects.svelte`
- Skills: `src/lib/components/Skills.svelte`
- Bio: `src/lib/components/About.svelte`
- Contact links: `src/lib/components/Footer.svelte`
- Hero copy: `src/lib/components/Hero.svelte`

The project exhibits are intentionally empty until real work is ready to be added.

## Planet landing

In Explore mode, engage hyperdrive and click or tap the planet to land. The planet is also keyboard accessible with Tab and Enter or Space. The 24-second flight moves from orbit through an atmospheric cloud bank into a gradual surface approach and touchdown. Return to cockpit or Escape exits at any point.

`src/lib/three/planetLanding.js` owns the procedural terrain and camera path. The existing hyperdrive render loop drives the flight, pauses it in hidden tabs, and stops at touchdown. Reduced-motion preferences go directly to the stationary surface view, including when enabled mid-flight. The surface is built on the first planet click and its GPU resources are released when the experience closes.
