# Specification: Refactor Portfolio to Tech-Centric & Modern Design

## 1. Overview
The goal of this track is to completely overhaul the existing portfolio to align with a "Tech-Centric & Modern" aesthetic. This involves moving away from the current SCSS/Node-Sass setup to a streamlined stack using plain HTML5, Vanilla JavaScript, and Tailwind CSS (via CDN or simple build process if needed, but prioritizing simplicity as per "plain" request). The design will feature a dark mode theme, monospace typography for technical elements, and a clean, developer-focused interface.

## 2. Goals
- **Visual Overhaul:** Implement a dark-themed, "IDE-like" or terminal-inspired design.
- **Tech Stack Migration:** Replace custom SCSS with Tailwind CSS for utility-first styling.
- **Content Structure:** Reimplement the "Professional Timeline" and "Skills Matrix" using the new design system.
- **Responsive Design:** Ensure full responsiveness for mobile and desktop using Tailwind's responsive utilities.

## 3. Key Features
- **Dark Mode by Default:** The primary theme will be dark backgrounds (e.g., slate-900) with light text (e.g., slate-200) and accent colors (e.g., cyan or lime green).
- **Typography:** Use a monospace font (e.g., 'Fira Code', 'Roboto Mono', or system monospace) for headings, code snippets, and skills. Use a clean sans-serif for body text.
- **Navigation:** A simple, responsive navigation bar.
- **Hero Section:** A modern introduction section.
- **Timeline Component:** A vertical timeline component for professional history.
- **Skills Grid:** A grid layout for technical skills.
- **Footer:** Simple footer with social links.

## 4. Technical Constraints
- **Frameworks:** No heavy JS frameworks (React, Vue, etc.). strictly Vanilla JS.
- **CSS:** Tailwind CSS. Use CDN for rapid prototyping or a minimal PostCSS setup if customization is strictly required, but aim for standard Tailwind config.
- **Assets:** Reuse existing images where appropriate, or replace with CSS-based shapes/icons if needed.

## 5. Design Guidelines (from Product Guidelines)
- **Visual Identity:** Tech-Centric, Modern, Dark Mode, Monospace accents.
- **UX:** Utility-first, fast loading, intuitive.
