# Specification: Production-Ready Tailwind CSS Setup

## 1. Overview
The current project uses a CDN-based approach for Tailwind CSS, which is not recommended for production due to performance implications (large file size, runtime compilation) and lack of build-time optimizations. This track aims to migrate the project to a production-ready setup using the Tailwind CLI. This involves creating a build process to generate an optimized, minified CSS file, consolidating existing custom styles, and updating the project structure to support this workflow.

## 2. Functional Requirements
-   **Tailwind CLI Integration:** Implement the Tailwind CLI via `npm` to handle CSS compilation.
-   **Configuration File:** Create a `tailwind.config.js` file to replace the inline configuration in `index.html`. This config must replicate the current theme extensions (colors, fonts).
-   **CSS Consolidation:**
    -   Create a main source CSS file (e.g., `src/input.css`).
    -   Migrate styles from `css/theme.css` into `src/input.css`.
    -   Migrate inline styles from the `<style>` block in `index.html` into `src/input.css` using appropriate Tailwind directives (e.g., `@layer`).
-   **Build Process:**
    -   Implement an `npm run build` script to generate a minified, production-ready CSS file in `dist/output.css`.
    -   Implement an `npm run watch` script for development that watches for changes and recompiles the CSS.
-   **HTML Update:** Update `index.html` to reference the new local `dist/output.css` instead of the Tailwind CDN script and `css/theme.css`.

## 3. Non-Functional Requirements
-   **Performance:** The final `dist/output.css` should be minified and contain only the used CSS classes (tree-shaking).
-   **Maintainability:** The project structure should be clean, with source files separated from distribution files.
-   **Zero-Runtime:** Remove the runtime Tailwind script to eliminate client-side compilation overhead.

## 4. Out of Scope
-   Setting up a full bundler (Webpack, Vite, Parcel) or a live-reload development server (these are future enhancements).
-   Refactoring HTML class names or redesigning the UI (scope is strictly migration/setup).

## 5. Acceptance Criteria
-   `npm install` installs all necessary dependencies (tailwindcss).
-   `npm run build` successfully generates `dist/output.css`.
-   `npm run watch` successfully recompiles CSS on file changes.
-   `index.html` loads correctly without the Tailwind CDN script.
-   All existing styles (colors, fonts, layout, custom effects like the code container glow) remain visually identical to the CDN version.
-   `css/theme.css` and inline `<style>` blocks are removed/obsoleted in favor of the unified CSS file.
