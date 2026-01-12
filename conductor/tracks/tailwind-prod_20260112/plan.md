# Implementation Plan - Production-Ready Tailwind CSS Setup

## Phase 1: Environment & Dependency Setup
- [x] Task: Initialize NPM Project
    - [x] Sub-task: Run `npm init -y` if `package.json` does not exist (it currently does not).
    - [x] Sub-task: Install `tailwindcss` as a dev dependency (`npm install -D tailwindcss`).
- [x] Task: Initialize Tailwind Configuration
    - [x] Sub-task: Create `src/input.css` and add Tailwind v4 directives (`@import "tailwindcss";`).
    - [x] Sub-task: Migrate the theme configuration (colors, fonts) from the inline script in `index.html` to `@theme` block in `src/input.css`.

## Phase 2: CSS Consolidation & Migration
- [ ] Task: Create Source CSS Structure
    - [x] Sub-task: Create directory `src`.
    - [x] Sub-task: Create file `src/input.css`.
    - [ ] Sub-task: Add standard Tailwind directives (`@import "tailwindcss";`) to `src/input.css`.
- [x] Task: Migrate Custom Styles
    - [x] Sub-task: Move styles from `css/theme.css` into `src/input.css`. Use `@layer base` or `@layer components` as appropriate.
    - [x] Sub-task: Move inline styles from the `<style>` block in `index.html` (e.g., `.code-container`, `.skill-card`) into `src/input.css`.
    - [x] Sub-task: Verify no styles are left behind in `css/theme.css` or `index.html`.
    - [ ] Sub-task: Verify no styles are left behind in `css/theme.css` or `index.html`.

## Phase 3: Build Scripts & HTML Update
- [x] Task: Configure NPM Scripts
    - [x] Sub-task: Add `"build": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify"` to `package.json`.
    - [x] Sub-task: Add `"watch": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch"` to `package.json`.
- [x] Task: Generate Initial Build
    - [x] Sub-task: Run `npm run build` to generate the `dist` directory and `output.css`.
- [x] Task: Update HTML References
    - [x] Sub-task: Remove the Tailwind CDN script tag from `index.html`.
    - [x] Sub-task: Remove the inline configuration script tag from `index.html`.
    - [x] Sub-task: Remove the reference to `css/theme.css` in `index.html`.
    - [x] Sub-task: Add a link to `<link href="./dist/output.css" rel="stylesheet">` in `index.html`.

## Phase 4: Verification & Cleanup
- [x] Task: Visual Regression Check
    - [x] Sub-task: Open `index.html` in a browser and verify that the layout, colors, and fonts match the original design.
    - [x] Sub-task: Check specific custom elements (mobile menu, code container glow, skill cards) to ensure migrated styles work correctly.
    - [ ] Sub-task: Check specific custom elements (mobile menu, code container glow, skill cards) to ensure migrated styles work correctly.
- [x] Task: Cleanup
    - [x] Sub-task: Delete `css/theme.css` and the `css` directory if empty.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Verification & Cleanup' (Protocol in workflow.md)
