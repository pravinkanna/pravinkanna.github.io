# Plan: Refactor Portfolio to Tech-Centric & Modern Design

## Phase 1: Setup and Foundation [checkpoint: b2648ce]
- [x] Task: Initialize Tailwind CSS ab472a8
    - [ ] Sub-task: Set up Tailwind CSS (via CDN for simplicity or minimal CLI if build is preferred).
    - [ ] Sub-task: Create a minimal `tailwind.config.js` to define the custom color palette (dark theme) and font family (monospace).
    - [ ] Sub-task: Create a new `index.html` structure to replace the old one (keep the old one as backup temporarily).
- [x] Task: Implement Global Styles & Typography 31a6a96
    - [ ] Sub-task: Apply base styles (dark background, text colors) to the `<body>`.
    - [ ] Sub-task: Import and configure Google Fonts (e.g., Fira Code/Roboto Mono).
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Core Layout and Hero Section [checkpoint: 26614ae]
- [x] Task: Build Navigation Bar e8cea18
    - [ ] Sub-task: Create a responsive navbar with links (Home, About, Skills, Projects, Blog).
    - [ ] Sub-task: Implement mobile menu toggle using Vanilla JS (replace logic from `js/main.js`).
- [x] Task: Build Hero Section b259f06
    - [ ] Sub-task: Create the introductory hero section with name, title, and a brief "console.log" style intro.
    - [ ] Sub-task: Ensure responsive scaling for mobile devices.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Content Sections (Timeline & Skills) [checkpoint: f2219e7]
- [x] Task: Implement Skills Matrix 39f9364
    - [ ] Sub-task: Create a grid layout for skills.
    - [ ] Sub-task: Style skill items as "tags" or "chips" with terminal-like aesthetics.
- [x] Task: Implement Professional Timeline dfe098c
    - [ ] Sub-task: Build a vertical timeline component using Tailwind flex/grid utilities.
    - [ ] Sub-task: Migrate content from the old `index.html` to the new structure.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Footer and Cleanup [checkpoint: e53328a]
- [x] Task: Build Footer 19d7dec
    - [ ] Sub-task: Add social media links (GitHub, LinkedIn) and copyright info.
- [x] Task: Final Review and Cleanup 7ece020
    - [ ] Sub-task: Remove old SCSS files and `node-sass` dependency from `package.json`.
    - [ ] Sub-task: Delete old `index.html` (backup first if needed) and rename new file to `index.html`.
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
