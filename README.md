# StudentHub v2

A modern Student Management System, built phase by phase as a full-stack portfolio project.

## Current Status

- ✅ Phase 1 Complete — Project Foundation

## Tech Stack

- React
- Vite
- JavaScript

## Project Structure

The project follows a clean, scalable folder organization designed to grow cleanly across phases:

- Component-level styles use **CSS Modules**, colocated with their component (e.g. `App.jsx` + `App.module.css`) so styles stay scoped and easy to trace.
- `src/styles/` holds only **global styling** — `global.css` (base reset and typography) and `variables.css` (shared design tokens) — nothing component-specific lives here.
- Feature areas (`components/`, `pages/`, `hooks/`, `context/`, `services/`, etc.) are separated by responsibility, keeping the codebase easy to navigate as it grows.