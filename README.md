# Flow Up Web

Frontend application for **Flow Up** — a real-time project management and Kanban-based task tracking system.

This application demonstrates a production-oriented React architecture with scalable state management, real-time updates, role-based access control, and advanced task management capabilities.

---

## Overview

Flow Up Web is a modern single-page application built with a strongly typed React stack.
It communicates with the backend via REST and WebSocket, supports authentication with JWT (access + refresh), and implements real-time collaborative updates.

---

## Tech Stack

- **Vite**
- **React**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **React Router**
- **i18next**
- **Tailwind CSS**
- **shadcn/ui**
- **socket.io-client**
- **@hello-pangea/dnd**
- **dayjs**
- **zod**

---

## Core Features

- Workspace management
- Kanban boards
- Tasks CRUD
- Drag & Drop (columns & tasks)
- Comments system
- File attachments
- Image cropping before upload
- Activity history tracking
- Statistics dashboard
- Role-based access control
- JWT authentication (access + refresh tokens)
- OAuth social login
- Real-time updates via WebSocket

---

## Architecture

The project follows a modular feature-oriented structure inspired by feature-based architecture principles.

Key architectural decisions:

- Centralized state management with **Redux Toolkit**
- API layer implemented via **RTK Query**
- Optimized caching and invalidation strategies
- Real-time synchronization using **Socket.IO**
- Strong runtime validation using **Zod**
- Domain-based feature separation
- Reusable UI components built with **shadcn/ui**
- Clean separation between UI, business logic, and API layer

---

## Getting Started

### Requirements

- Node.js v24.11.0
- npm

---

### Installation

```bash
npm install
```

---

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=http://localhost:5000
```

Adjust values according to your backend configuration.

---

### Run Development Server

```bash
npm run dev
```

---

### Build for Production

```bash
npm run build
```

---

### Preview Production Build

```bash
npm run preview
```

---

## Backend

This frontend is designed to work with the Flow Up API:

**flow-up-api**

Make sure the backend service is running before starting the frontend.

---

## Status

This project is actively maintained and serves as a portfolio demonstration of fullstack development with a frontend-focused architecture.
