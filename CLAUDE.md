# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

**Development:**
- `npm run dev` - Start development server (Vite on port 5173)
- `npm run build` - Build for production 
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Build & Quality Checks:**
Always run `npm run lint` after making code changes to ensure code quality.

## Architecture Overview

This is a React 19 + Vite 6 portfolio website using atomic design principles:

**Component Hierarchy:**
- `src/App.jsx` - Simple wrapper that renders the Portfolio template
- `src/components/templates/Portfolio/Portfolio.jsx` - Main page template with navigation, custom cursor, and all sections
- Atomic structure: `atoms/` → `molecules/` → `organisms/` → `templates/`

**Key Architectural Patterns:**

1. **Barrel Exports**: Each component level uses index.js files for clean imports
2. **Data Separation**: All default content lives in `src/data/defaultData.js` with structured exports (DEFAULT_ABOUT, DEFAULT_EXPERIENCES, DEFAULT_PROJECTS, etc.)
3. **Performance Optimization**: Custom cursor with RAF throttling, passive event listeners, and GPU acceleration
4. **Mobile-First**: Responsive design with mobile detection and conditional cursor behavior

**Tech Stack Integration:**
- **Styling**: Tailwind CSS with custom animations and mix-blend-mode effects
- **Icons**: Lucide React for consistent iconography
- **Build**: Vite with React plugin, optimized for modern browsers
- **Linting**: ESLint with React hooks and refresh plugins

**Section Structure:**
The Portfolio template renders sections in order: Navigation → Hero → About → Experience → Projects → Skills → Blog → Contact → Footer

**Content Management:**
To update portfolio content, modify the exported objects in `src/data/defaultData.js`. Each section pulls from its corresponding DEFAULT_* export.

**Performance Notes:**
- Custom cursor uses requestAnimationFrame with 60fps throttling
- Event listeners are passive for scroll performance
- GPU acceleration via transform3d and will-change properties
- Mobile detection disables cursor effects entirely