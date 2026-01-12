# Project Context: pravinkanna-portfolio

## Project Overview
This is a personal portfolio website for Pravinkanna, hosted on GitHub Pages. It showcases the developer's projects, education, and contact information. The project is a static site built with HTML, Tailwind CSS (v4), and Vanilla JavaScript.

## Technology Stack
- **Frontend:** HTML5, Tailwind CSS (v4), Vanilla JavaScript.
- **Styling:** Tailwind CSS compiled via CLI. Custom styles defined in `src/input.css`.
- **Package Manager:** npm.
- **Build Tool:** Tailwind CLI.

## Key Files & Directories
- **`index.html`**: The main entry point for the website (Home page).
- **`src/`**: Contains the source CSS.
  - `input.css`: The main entry point for styles, including Tailwind imports and custom `@theme` configuration.
- **`dist/`**: Contains the compiled assets.
  - `output.css`: The compiled, minified CSS file used by the HTML.
- **`package.json`**: Manages dependencies and build scripts.
- **`js/`**: Contains `theme.js` (custom scripts).
- **`tools/`**: Directory containing various standalone sub-projects/tools.
- **`conductor/`**: Contains project management and documentation files.

## Build & Run Instructions

### Prerequisites
- Node.js and npm installed.

### Setup
```bash
npm install
```

### Development
To compile CSS and watch for changes:
```bash
npm run watch
```
This command runs the Tailwind CLI in watch mode, updating `dist/output.css` whenever source files change.

### Build
To create a minified production build:
```bash
npm run build
```

## Development Conventions
- **Styling:** Use Tailwind CSS utility classes directly in the HTML.
- **Custom Styles:** Add custom CSS or theme configuration (colors, fonts) to `src/input.css`.
- **Responsiveness:** Use Tailwind's responsive prefixes (e.g., `md:`, `lg:`).
- **Build:** Always run `npm run build` before committing to ensure the latest styles are available in `dist/`.

## Current State Notes
- The site has been migrated from a CDN-based Tailwind setup to a local CLI build (v4).
- The `css/` directory has been removed in favor of `src/` and `dist/`.
- Navigation links for sub-pages (like `/tools`) point to existing directories.
