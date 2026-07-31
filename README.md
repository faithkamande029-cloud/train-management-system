# Train Management System

A modern React-based train management application for managing trains, stations, schedules, bookings, and administrative reporting. The project is designed as a demo-ready dashboard with a mock backend so it can be run locally without a separate API service.

## Features

- User authentication and role-based access
- Dashboard overview for operational insights
- Train management including add, view, and update workflows
- Station administration
- Schedule management and assignment views
- Ticket booking experience with seat selection
- Booking history and confirmation flow
- Admin pages for users and reports

## Tech Stack

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Chart.js / Recharts
- Axios
- Express mock server
- ESLint

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Run the application

Start the mock API server:

```bash
npm run mock
```

In a second terminal, start the frontend:

```bash
npm run dev
```

The app will be available at:

- Frontend: http://localhost:5173
- Mock API: http://localhost:3001

## Deploy the frontend and API on Render

The frontend reads its API base URL from `VITE_API_URL`. This workspace is configured to use the deployed backend at `https://train-management-backend.onrender.com/api` via the local `.env` file.

1. Push this repository to GitHub and create a **Web Service** in Render for the API.
   - Runtime: `Node`
   - Build command: `npm install`
   - Start command: `npm run mock`
   - Health check path: `/health`
2. Once it deploys, copy its URL, for example `https://train-api.onrender.com`. Confirm that opening `https://train-api.onrender.com/health` returns `{"status":"ok"}`. If the backend uses an `/api` prefix (as this project's deployed backend does), include `/api` in `VITE_API_URL`.
3. In the Flask API service's Environment settings, set `ALLOWED_ORIGINS` to the exact frontend origins, for example `https://train-management.vercel.app`. For local development include `http://127.0.0.1:5173,http://localhost:5173`. Origins are comma-separated and must not have trailing slashes. Redeploy the API after changing this value.
4. Create a **Static Site** in Render from the same repository for the React app.
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Add the environment variable `VITE_API_URL` with the API URL from step 2 (no trailing slash).
   - Add a rewrite rule: source `/*`, destination `/index.html`, status `200`. This lets React Router routes work on refresh.
5. Redeploy the static site after saving `VITE_API_URL`. Vite replaces this variable during the build, so changing it always requires a new frontend build.

For local work, copy `.env.example` to `.env` and use `VITE_API_URL=/api` (or omit the variable). Vite proxies this to the included mock API at `http://localhost:3001`, so the browser does not make a cross-origin request. Restart Vite after changing it.

> This repository's API is an in-memory mock server: all changes reset when it restarts. It is suitable for demos, but a production backend should use a persistent database and real authentication.

### Demo Login

The mock server includes sample users for testing. For example:

- Admin: admin@railms.com
- Manager: manager@railms.com
- Agent: agent@railms.com

## Available Scripts

```bash
npm run dev      # start the Vite development server
npm run mock     # start the mock API server
npm run build    # build the production bundle
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project Structure

- src/pages - application pages and screens
- src/components - reusable UI and feature components
- src/services - API and HTTP service layer
- src/hooks - custom hooks
- src/context - global state providers
- mock-server.cjs - local mock backend for development

## Notes

This project uses an in-memory mock API for demonstration purposes. Data resets when the mock server restarts.
