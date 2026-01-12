# Specification: Maximum SEO Optimization (Pravinkanna Portfolio)

## Overview
This track focuses on a comprehensive, high-level SEO overhaul of the portfolio and tools suite. The goal is to achieve "Elite" status in search engine rankings and performance metrics, ensuring the site is discoverable and professionally presented across search engines and social media.

## Functional Requirements
- **Standardized Branding:** Update all instances of "Pravin Kanna" to "Pravinkanna" across the site (titles, meta tags, content).
- **Curated Meta Tags:**
    - Manually craft unique `<title>` and `<meta name="description">` tags for every page (`index.html`, `/tools/index.html`, etc.).
    - Implement keyword-rich descriptions for specific tools:
        - Wealth Journey -> "Financial Planner" / "Wealth Visualization"
        - JSON Editor -> "JSON Editor" / "JSON Formatter"
        - Mongo Object Time -> "MongoDB ID Converter" / "ObjectId Timestamp"
- **Social Sharing (Open Graph & Twitter Cards):**
    - Add `og:title`, `og:description`, `og:image`, `og:url`, and `og:type` to all pages.
    - Add `twitter:card`, `twitter:title`, and `twitter:description`.
- **Structured Data (JSON-LD):**
    - Implement `Schema.org/Person` on the homepage.
    - Implement detailed `Schema.org/SoftwareApplication` for each tool (Wealth Journey, JSON Editor, Mongo Object Time) including `applicationCategory`, `operatingSystem`, and `offers`.
    - Implement `Schema.org/BreadcrumbList` for navigation structure.
- **Technical SEO:**
    - Create a static `sitemap.xml` file listing all accessible pages.
    - Create a `robots.txt` file directing search engines and pointing to the sitemap.
    - Add `<link rel="canonical">` tags to prevent duplicate content issues.

## Non-Functional Requirements
- **Performance & Accessibility:**
    - Achieve a score of 100 (or near 100) in all Google Lighthouse categories (Performance, Accessibility, Best Practices, SEO).
    - Ensure 100% semantic HTML usage.
    - Add descriptive `alt` text to all images.
    - Ensure sufficient color contrast and ARIA labels where necessary.

## Acceptance Criteria
- [ ] All pages have unique, manually curated meta titles and descriptions.
- [ ] Name standardized to "Pravinkanna" throughout the codebase.
- [ ] Google Lighthouse reports 90+ (target 100) across all 4 categories for main pages.
- [ ] `sitemap.xml` and `robots.txt` are present and valid.
- [ ] JSON-LD structured data is valid according to Google's Rich Results Test.
- [ ] Open Graph tags are correctly interpreted by social media debuggers (e.g., LinkedIn/Facebook).

## Out of Scope
- Automated sitemap generation scripts (manual creation only).
- Content rewriting of the blog posts (if any exist) beyond SEO metadata.
