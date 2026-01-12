# Project Context: pravinkanna-portfolio

## Project Overview
This is a personal portfolio website for Pravin Kanna, hosted on GitHub Pages. It showcases the developer's projects, education, and contact information. The project is a static site built with HTML, Tailwind CSS (via CDN), and Vanilla JavaScript.

## Technology Stack
- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript.
- **Styling:** Tailwind CSS (loaded via CDN) with custom configuration in `index.html`.
- **Package Manager:** None (Libraries are loaded via CDNs).

## Key Files & Directories
- **`index.html`**: The main entry point for the website (Home page).
- **`css/`**: Contains `theme.css` (custom styles).
- **`js/`**: Contains `theme.js` (custom scripts).
- **`tools/`**: Directory containing various standalone sub-projects/tools (e.g., `json-editor`, `wealth-journey`).
- **`conductor/`**: Contains project management and documentation files.

## Build & Run Instructions

### Prerequisites
- A modern web browser.
- A simple static file server (optional, but recommended for development).

### Setup
No installation required.

### Development
Since the project uses Tailwind CSS via CDN, there is no build step.
Simply open `index.html` in a browser or serve the directory using a static server:

```bash
# Example using python
python3 -m http.server
```

## Development Conventions
- **Styling:** Use Tailwind CSS utility classes directly in the HTML.
- **Scripts:** Keep JavaScript logic inline or in `js/` directory if it grows complex.
- **Responsiveness:** Use Tailwind's responsive prefixes (e.g., `md:`, `lg:`).

## Current State Notes
- The site uses a single-page layout with smooth scrolling to sections (`#home`, `#about`, etc.).
- Navigation links for sub-pages (like `/tools`) should point to existing directories or HTML files.
- Google Analytics and Clarity tracking are integrated.