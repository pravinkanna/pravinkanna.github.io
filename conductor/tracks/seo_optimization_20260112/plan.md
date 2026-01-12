# Plan: Maximum SEO Optimization

## Phase 1: Branding & Meta Tag Overhaul
- [x] Task: Project Search & Replace - "Pravin Kanna" -> "Pravinkanna"
    - [x] Sub-task: Update `index.html`, `tools/index.html`, `conductor/product.md`.
    - [x] Sub-task: Check tool sub-pages and other HTML files.
- [x] Task: Implement Curated Meta Tags & Canonical Links (Home & Hub)
    - [x] Sub-task: Update `<head>` in `index.html` (Home) with specific title/description.
    - [x] Sub-task: Update `<head>` in `tools/index.html` (Tools Hub).
    - [x] Sub-task: Add `<link rel="canonical">` to both.
- [x] Task: Implement Curated Meta Tags & Canonical Links (Individual Tools)
    - [x] Sub-task: Update `tools/wealth-journey/index.html` (Wealth Journey).
    - [x] Sub-task: Update `tools/json-editor/index.html` (JSON Editor).
    - [x] Sub-task: Update `tools/mongo-object-time/index.html` (Mongo Object).
- [x] Task: Implement Open Graph & Twitter Card Data
    - [x] Sub-task: Add OG and Twitter tags to `index.html`.
    - [x] Sub-task: Add OG and Twitter tags to `tools/index.html` and tool sub-pages.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Technical SEO & Structured Data
- [ ] Task: Create `robots.txt`
    - [ ] Sub-task: Define user-agents and sitemap location.
- [ ] Task: Create `sitemap.xml`
    - [ ] Sub-task: List all URLs with `lastmod`, `changefreq`, and `priority`.
- [ ] Task: Implement JSON-LD Structured Data
    - [ ] Sub-task: Add `Schema.org/Person` to `index.html`.
    - [ ] Sub-task: Add `Schema.org/SoftwareApplication` and `BreadcrumbList` to each tool page.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Performance & Accessibility (Lighthouse Elite)
- [ ] Task: Accessibility Audit & Fixes
    - [ ] Sub-task: Run Lighthouse audit on Home. Fix semantic HTML, ARIA labels, contrast.
    - [ ] Sub-task: Run Lighthouse audit on Tools. Fix semantic HTML, ARIA labels, contrast.
- [ ] Task: Performance Tuning
    - [ ] Sub-task: Optimize images (size/format) if flagged.
    - [ ] Sub-task: Ensure text compression and efficient asset loading (check build output).
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
