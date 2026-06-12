# Zahra Ahmadi — React Developer Portfolio

🚀 **Live Demo:** https://react-portfolio-part3.vercel.app

A professional developer portfolio built across 3 parts of a React learning journey — 
from a simple HTML page to a full React application with routing, global state, 
dynamic pages, and professional polish.

---

## ✨ Features

### React Architecture (Part 3)
- **React Router v6** — BrowserRouter with `<Routes>`, `<Route>`, `NavLink`, and active link styling
- **Dynamic Routes** — `/projects/:id` uses `useParams()` to load individual project detail pages
- **Custom 404** — `path="*"` catches all unknown URLs with a friendly error page
- **Code Splitting** — `React.lazy` + `Suspense` for performance-optimized route loading

### Global State (Context API)
- **AppContext** — `createContext()` / `useContext()` / `<AppProvider>` eliminates prop drilling
- **Favorites** — star any project; count persists in `localStorage` and shows in Navbar badge
- **Theme** — 3 themes (light / dark / sunset) stored in `localStorage` via `ThemeProvider`
- **Search** — global search query shared across pages via Context

### Components
- `ProjectCard` — image/initials, status badge, `role="progressbar"`, `aria-expanded`, View Project + View Code buttons
- `TechBadge` — reusable technology label
- `FeedbackCard` — reusable review card used inside `FeedbackWall`

### UI & Accessibility
- Responsive grid layouts (2-col desktop → 1-col mobile) via CSS Grid + media queries
- Skip-to-content link for keyboard users
- `aria-label` on all icon-only buttons
- `aria-expanded` on expandable sections
- `role="progressbar"` with `aria-valuenow` on completion bars
- Smooth scroll progress indicator
- Confetti on first visit 🎉

---

## 🗂 Project Structure
