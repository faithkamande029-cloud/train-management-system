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
- Mock API: http://localhost:5000

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
