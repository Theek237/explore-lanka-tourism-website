# Explore Lanka Frontend

Modern React (Vite) single-page application for the Explore Lanka tourism experience.

## Stack
- React 19 + React Router
- Vite 6
- Tailwind CSS (via `@tailwindcss/vite`)
- GSAP (animations)

## Design System (New)
We introduced lightweight design tokens and utility classes in `src/index.css` to modernize the UI without altering logic.

### Tokens
Defined under the `:root` selector:
- Colors: `--color-bg`, `--color-surface`, `--color-accent`, etc.
- Radius scale: `--radius-xs` … `--radius-xl`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Motion: `--dur-fast`, `--ease-out`
- Typography stacks: `--font-display`, `--font-base`

### Core Utilities Added
- `.app-container` – centered responsive layout wrapper
- `.surface` / `.surface-hover` – elevated glassy card surfaces
- `.btn-primary` – primary branded button
- `.heading-xl` / `.heading-gradient` – large hero display text
- `.animate-fade-up` – subtle entrance animation

### Updated Components
- `NavBar.jsx`: Sticky, blurred, responsive navigation with improved focus states.
- `LocationCard.jsx`: Elevated cards, lazy-loaded images, semantic `<article>` and `<footer>`.
- `Home.jsx`: Hero section using new heading and button styles.
- `Footer.jsx`: Modern responsive footer.

## Extending Styles
Use existing tokens rather than hard-coded colors. Example:
```css
.my-panel { background: var(--color-surface); border-radius: var(--radius-lg); }
```

For new buttons, extend `.btn-primary` or create a variant:
```css
.btn-outline { background: transparent; border:1px solid var(--color-border-accent); color: var(--color-text); }
.btn-outline:hover { border-color: var(--color-accent); }
```

## Running Locally
```powershell
npm install
npm run dev
```
App serves at the Vite dev URL (default: `http://localhost:5173`).

## Accessibility Notes
- Focus-visible styles preserved for interactive elements.
- Semantic elements (`header`, `footer`, `article`, `time`) improve screen reader context.

## Future Improvements
- Dark/light theme toggle (add `data-theme` swap + alternative token set)
- Skeleton loaders for image/card placeholders
- Centralized icon component set

## License
See project root for licensing details.
