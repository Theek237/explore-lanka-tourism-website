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

## API Base URL Configuration

The frontend picks the backend origin via `VITE_API_URL`.

Scenarios:
- Local (docker-compose): backend exposed at `http://localhost:5000`. You can set `VITE_API_URL=http://localhost:5000` or leave unset (defaults to that in code).
- Production behind Nginx reverse proxy: Nginx serves frontend and proxies `/api/` to backend. Set `VITE_API_URL=/` (or omit) so the app uses relative URLs like `/api/auth/register`.

The utility `src/utils/apiBase.js` normalizes the value (strips trailing slashes, converts single `/` to empty) to avoid malformed requests such as `http://api/...` that appear when a protocol-relative `//api/...` is constructed.

### Troubleshooting Registration/Login
If registration or login fails:
1. Open browser Network tab; locate `POST /api/auth/register` or `POST /api/auth/login`.
2. Verify the request URL begins with your site origin (e.g. `http://13.214.xx.xx/api/...`). If you see `http://api/...`, fix `VITE_API_URL` to `/` or a full origin.
3. Confirm response status (201 for register, 200 for login). If 401, token or cookie not sent: ensure `withCredentials: true` and same-origin configuration (relative URLs) or correct `CLIENT_URL` on backend CORS.
4. Check backend container logs for validation or DB errors.

### Environment Variables (Production Compose)
```yaml
frontend:
	environment:
		- VITE_API_URL=/
backend:
	environment:
		- MONGO_URI=mongodb://mongo:27017/explore_lanka
		- JWT_SECRET=${JWT_SECRET}
		# CLIENT_URL can be omitted when using same-origin reverse proxy
```

To deploy under a custom domain, set `VITE_API_URL=https://your-domain.com` and keep relative endpoint paths in code.


## Accessibility Notes
- Focus-visible styles preserved for interactive elements.
- Semantic elements (`header`, `footer`, `article`, `time`) improve screen reader context.

## Future Improvements
- Dark/light theme toggle (add `data-theme` swap + alternative token set)
- Skeleton loaders for image/card placeholders
- Centralized icon component set

## License
See project root for licensing details.
