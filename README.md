# Arnav Soni — Portfolio

A responsive, two-dimensional space-opera portfolio built with Svelte 5 and Vite. It uses CSS artwork and animation only—no music, sound, 3D libraries, or licensed image assets.

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

- Project cards: `src/lib/components/Projects.svelte`
- Skills: `src/lib/components/Skills.svelte`
- Bio: `src/lib/components/About.svelte`
- Contact links: `src/lib/components/Contact.svelte`
- Hero copy: `src/lib/components/Hero.svelte`

The project and skill arrays are intentionally kept near the top of their components so they are easy to replace.
