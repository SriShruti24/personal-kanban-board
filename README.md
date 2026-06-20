# 📋 KanbanBoard — Real-Time Task Management

A professional, real-time Kanban board application built with React, WebSockets (Socket.IO), and Vite. Track assignments, projects, and daily tasks across **To Do**, **In Progress**, and **Done** columns with drag-and-drop functionality, live progress charts, file attachments, and more.

> **Built by Shruti Srivastava** | [sri.shruti24@gmail.com](mailto:sri.shruti24@gmail.com)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Kanban Board** | Three-column layout (To Do, In Progress, Done) with card-based tasks |
| **Drag & Drop** | Move tasks between columns using `@hello-pangea/dnd` |
| **Real-Time Sync** | WebSocket-powered updates via Socket.IO — changes reflect instantly |
| **Task CRUD** | Create, read, update, and delete tasks with a modal form |
| **Priority & Category** | Assign Low / Medium / High priority and Bug / Feature / Enhancement category |
| **File Attachments** | Upload images and PDFs with preview support |
| **Progress Chart** | Live Recharts bar chart showing task distribution and completion % |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile |
| **Neo-brutalist UI** | Bold borders, card shadows, dotted background, Outfit typography |
| **Portfolio Ready** | Professional footer with author info and Digital Heroes branding |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 6, JavaScript (ES Modules) |
| **Styling** | Vanilla CSS with CSS custom properties, Google Fonts (Outfit) |
| **Drag & Drop** | @hello-pangea/dnd |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Dropdowns** | React Select |
| **Real-Time** | Socket.IO Client |
| **Backend** | Node.js, Express, Socket.IO Server |
| **Testing** | Vitest, React Testing Library, Playwright |

---

## 🚀 Local Setup Instructions

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### 1. Clone the Repository

```bash
git clone https://github.com/SriShruti24/kanban-board.git
cd kanban-board
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Start the Backend Server

```bash
npm start
# Server runs on http://localhost:5000
```

### 4. Install Frontend Dependencies (new terminal)

```bash
cd frontend
npm install
```

### 5. Start the Frontend Dev Server

```bash
npm run dev
# App runs on http://localhost:3000
```

### 6. Run Tests

```bash
# Unit & Integration tests
npm test

# E2E tests (Playwright)
npm run test:e2e
```

---

## 🌐 Vercel Deployment Instructions

This project deploys the **frontend** as a static site on Vercel's free Hobby plan.

### Steps

1. **Push your code** to a GitHub repository.

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.

3. Click **"Add New Project"** and import your repository.

4. Configure build settings:
   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Vite |
   | **Root Directory** | `frontend` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |

5. Add environment variable (if using a custom backend):
   | Key | Value |
   |-----|-------|
   | `VITE_BACKEND_URL` | Your backend URL (e.g., `https://backend-kanban-gaf2.onrender.com/`) |

6. Click **Deploy** — Vercel will build and host your app automatically.

> **Note:** The backend (Node.js + Socket.IO) should be deployed separately on [Render](https://render.com), [Railway](https://railway.app), or a similar platform.

---

## 📸 Screenshots

> Replace the placeholders below with actual screenshots of your deployed application.

| View | Screenshot |
|------|-----------|
| **Desktop — Full Board** | _Add screenshot here_ |
| **Task Creation Modal** | _Add screenshot here_ |
| **Progress Chart** | _Add screenshot here_ |
| **Mobile Responsive** | _Add screenshot here_ |
| **Footer with Digital Heroes** | _Add screenshot here_ |

---

## ✅ Digital Heroes Compliance Checklist

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Tool is fully functional and produces real output | ✅ |
| 2 | "Built for Digital Heroes" button present with exact text | ✅ |
| 3 | Button links to `https://digitalheroesco.com` and opens in new tab | ✅ |
| 4 | Full name **Shruti Srivastava** clearly visible | ✅ |
| 5 | Email **sri.shruti24@gmail.com** clearly visible | ✅ |
| 6 | Deployable on Vercel's free Hobby plan | ✅ |
| 7 | Professional enough for a developer portfolio | ✅ |
| 8 | No existing functionality removed | ✅ |

---

## 📂 Project Structure

```
websocket-kanban-vitest-playwright/
├── backend/
│   ├── server.js              # Express + Socket.IO server
│   ├── socket/                # WebSocket event handlers
│   ├── store/                 # In-memory task storage
│   ├── services/              # Business logic
│   ├── utils/                 # Helper utilities
│   └── tests/                 # Backend tests
│
├── frontend/
│   ├── index.html             # HTML entry with SEO meta tags
│   ├── vite.config.js         # Vite + Vitest configuration
│   ├── src/
│   │   ├── App.jsx            # Root component
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Global styles + responsive design
│   │   ├── components/
│   │   │   ├── KanbanBoard.jsx    # Main board layout
│   │   │   ├── Column.jsx         # Droppable column
│   │   │   ├── TaskCard.jsx       # Draggable task card
│   │   │   ├── TaskModal.jsx      # Create/Edit task modal
│   │   │   ├── ProgressChart.jsx  # Recharts progress visualization
│   │   │   └── Footer.jsx         # Professional footer
│   │   ├── store/             # State management (useTaskStore)
│   │   ├── services/          # Socket.IO task service
│   │   ├── socket/            # Socket client configuration
│   │   └── tests/             # Unit, integration, and E2E tests
│   └── package.json
│
└── README.md
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>Shruti Srivastava</strong> for <a href="https://digitalheroesco.com" target="_blank">Digital Heroes</a>
</p>
