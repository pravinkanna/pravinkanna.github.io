# Project Context: pravinkanna-portfolio

## Project Overview
This is a personal portfolio website for Pravin Kanna, hosted on GitHub Pages. It showcases the developer's projects, education, and contact information. The project uses a simple structure with HTML, SCSS for styling, and vanilla JavaScript for interactivity.

## Technology Stack
- **Frontend:** HTML5, SCSS (Sass), Vanilla JavaScript.
- **Styling:** SCSS is compiled to CSS using `node-sass`. FontAwesome is used for icons.
- **Package Manager:** npm.

## Key Files & Directories
- **`index.html`**: The main entry point for the website (Home page).
- **`scss/`**: Contains the SASS source files.
  - `main.scss`: The main entry point for styles, importing other partials.
  - `_config.scss`, `_menu.scss`, `_mobile.scss`: Partials for configuration, menu styles, and responsiveness.
- **`js/main.js`**: Contains the JavaScript logic, primarily for the mobile navigation toggle.
- **`package.json`**: Manages dependencies and build scripts.
- **`dist/css/`**: The destination for compiled CSS files.
- **`app.js`**: Currently empty, listed as main in `package.json`.

## Build & Run Instructions

### Prerequisites
- Node.js and npm installed.

### Setup
```bash
npm install
```

### Development
To compile SASS to CSS (with watch mode):
```bash
npm run sass
```
This command runs `node-sass` in watch mode, compiling `scss/` files to `dist/css/`.

## Development Conventions
- **Styling:** Use SCSS for all styling changes. Do not edit `dist/css/main.css` directly.
- **Responsiveness:** Managed via `_mobile.scss` and media queries.
- **Naming:** BEM-like naming is used in some places (e.g., `menu-btn`, `menu-nav`).

## Current State Notes
- The navigation in `index.html` points to `/about`, `/contact`, etc., but these HTML files were not observed in the root directory scan. They may need to be created.
- `app.js` is present but unused.
