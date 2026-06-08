# 📊 React Admin Dashboard

Modern admin dashboard built with React, TypeScript, and Tailwind CSS. Features JWT auth, dark/light mode, data tables with charts, and role-based access control.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Zustand](https://img.shields.io/badge/Zustand-State-443E38)

## ✨ Features

- 🔐 **JWT Authentication** — Login/register with token management
- 🌗 **Dark/Light Mode** — One-click theme toggle
- 📱 **Responsive Layout** — Sidebar + topbar, works on all screens
- 📋 **Data Tables** — Sortable, filterable, paginated tables
- 📈 **Charts & Analytics** — Recharts-powered dashboards
- 🔗 **REST API Integration** — Axios + React Query for data fetching
- 👤 **Role-Based Access** — Admin, editor, viewer permissions
- ⚡ **State Management** — Zustand for lightweight global state

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| HTTP | Axios + React Query |
| Charts | Recharts |
| State | Zustand |
| Build | Vite 5 |

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages (Dashboard, Products, etc.)
├── hooks/          # Custom React hooks
├── services/       # API client functions
├── store/          # Zustand state stores
├── types/          # TypeScript type definitions
├── lib/            # Utility helpers
├── App.tsx         # Root component + routing
└── main.tsx        # Entry point
```

## 📄 License

MIT
