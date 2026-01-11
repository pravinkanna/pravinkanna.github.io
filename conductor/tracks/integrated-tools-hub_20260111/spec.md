# Specification: Integrated Tools Hub and Wealth Journey Tool

## Overview
This track involves creating a centralized "Tools" hub for the portfolio website. This includes a directory page at `/tools/` that lists available developer utilities and the integration of the "Wealth Journey" tool as the first entry in this hub.

## Functional Requirements
1.  **Navigation Integration:**
    *   Add a "Tools" link to the main navigation bar in `index.html`.
    *   Clicking "Tools" must navigate to the Tools Directory page.
2.  **Tools Directory Page (`/tools/index.html`):
    *   Serve as the main landing page for all utilities.
    *   Display a list of tools using a clean, responsive layout.
    *   For each tool, display:
        *   **Name:** e.g., "Wealth Journey"
        *   **Description:** e.g., "Simulate and visualize your wealth accumulation journey."
        *   **Launch Button:** A link to the tool's specific page.
3.  **Wealth Journey Integration:**
    *   Move or link the existing `wealth-journey/` folder contents to be accessible at `/tools/wealth-journey/".
    *   Ensure the tool is fully functional within its new path (relative links for CSS/JS).
4.  **Routing Structure:**
    *   Directory: `pravinkanna.com/tools/`
    *   Wealth Journey: `pravinkanna.com/tools/wealth-journey/`

## Non-Functional Requirements
*   **Consistency:** The Tools Directory page should match the visual style (fonts, colors, nav) of the main portfolio.
*   **Responsiveness:** The layout must work seamlessly on mobile and desktop.
*   **Maintainability:** Use a simple structure that makes it easy to add more tools in the future.

## Acceptance Criteria
- [ ] Nav bar has a "Tools" link.
- [ ] `/tools/` loads a page listing "Wealth Journey".
- [ ] Clicking "Launch" on the Wealth Journey card navigates to `/tools/wealth-journey/".
- [ ] The Wealth Journey tool is fully functional (calculations and charts work).
- [ ] All pages follow the site's existing design language.

## Out of Scope
*   Adding more tools beyond Wealth Journey in this track.
*   Implementing a search or filter for tools (initially).