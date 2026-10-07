# SentinelAI - Frontend

AI-Powered Cyber Threat Detection & SOC Operations Platform Frontend built with React, Vite, Tailwind CSS, React Router, and Axios.

## Prerequisites

- Node.js (v18+)
- npm (v9+)

## Getting Started

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Folder Structure

```
frontend/
├── public/
├── src/
│   ├── api/          # Axios instance and API service modules
│   ├── components/   # Common, Layout, Dashboard, Incidents, Alerts, Admin components
│   ├── context/      # Auth and Theme context providers
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Page layout wrappers (Auth, Dashboard)
│   ├── pages/        # Route page views
│   ├── routes/       # Router, ProtectedRoute, RoleRoute definitions
│   └── utils/        # Helper functions, constants, validators
```
