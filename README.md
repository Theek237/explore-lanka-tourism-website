# Explore Lanka — Travel Planner Feature

This adds a beginner-friendly Travel Planner to generate tailored itineraries with Gemini AI while keeping the existing site look & feel unchanged.

## What you get
- A new navbar link “TRAVEL PLANNER” that opens a friendly form
- Client-side validation and server-side sanitization
- Server endpoint that calls Gemini using your API key from environment variables
- A rendered travel plan (overview, daily itinerary, costs, accommodations, transport, packing list, links)
- Graceful UX for long responses (loading state + retry)
- Tests for the API endpoint and the form validation

## API key placement (never commit secrets)
- Local: create a `.env` file in `backend/` with:
  
  GEMINI_API_KEY=sk-...
  NODE_ENV=development
  
  Ensure `backend/.gitignore` includes `.env` (it already does).
- Production: set an environment variable named `GEMINI_API_KEY` in your hosting provider (e.g. Docker, Vercel, Netlify, Heroku, Kubernetes). Do not store it in the repo.

The backend reads the key via `process.env.GEMINI_API_KEY`.

## Run locally
1. Backend
   - Install deps: from `backend/` run `npm install`
   - Create `backend/.env` with your `GEMINI_API_KEY`
   - Start API: `npm run server` (or `npm start`)
2. Frontend
   - Install deps: from `frontend/` run `npm install`
   - Optionally set `VITE_API_URL` in `.env` (defaults to `http://localhost:5000` during local dev)
   - Start app: `npm run dev`

Or with Docker Compose (requires GEMINI_API_KEY in your shell or `./.env` for Compose):

- In the project root:
  - PowerShell: `$env:GEMINI_API_KEY = 'sk-...'`; then `docker compose up --build`

## Deploy notes (quick)
- Vercel: set `GEMINI_API_KEY` in Project Settings → Environment Variables (Preview + Production). Use the existing backend server or a serverless route for `/api/travel-plan`.
- Netlify: Site Settings → Build & deploy → Environment → `GEMINI_API_KEY`.
- Heroku: `heroku config:set GEMINI_API_KEY=...`
- Docker: pass `-e GEMINI_API_KEY=...` to your backend container; our `docker-compose.prod.yml` reads `${GEMINI_API_KEY}`.
- Kubernetes: use Secrets and expose as an env var to the backend Deployment.

## How it works
- Frontend (`/src/pages/TravelPlanner.jsx`) submits the form to `POST /api/travel-plan`.
- Backend (`/routes/travelPlanRoutes.js` → controller) validates input, builds a concise prompt, and calls Gemini via REST using the key from `process.env.GEMINI_API_KEY`.
- The response is formatted as JSON and rendered with existing styles.

## Tests
- Backend: Node’s test runner + Supertest (`backend/tests/travelPlan.test.js`) → `npm test` in `backend/`.
- Frontend: Vitest for the validation helper (`frontend/src/utils/travelPlanValidation.test.js`) → `npm run test` in `frontend/`.

## Notes on streaming
Gemini’s REST API supports streaming. This implementation uses a simple request/response for clarity and reliability. You can extend the server endpoint to proxy a streaming response (SSE/chunked) and update the UI incrementally if desired.
