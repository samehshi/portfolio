# Removed JavaScript Files Documentation

This document records the JavaScript files that were removed during the portfolio visual modernization cleanup process.

## Files Removed

### 1. `assets/js/bibsearch.js`
**Purpose**: Provided bibliography search functionality for filtering bibliography entries on pages.
**Reason for Removal**: The `bib_search` feature is disabled in `_config.yml` (set to `false`), making this file unused.
**Dependencies**: Required `highlight-search-term.js` for search term highlighting functionality.
**Original Functionality**:
- Filtered bibliography entries based on search input
- Highlighted matching search terms in bibliography items
- Supported URL hash-based search persistence
- Used debounced search with 300ms delay for performance

### 2. `assets/js/highlight-search-term.js`
**Purpose**: Provided search term highlighting functionality using the CSS Custom Highlight API.
**Reason for Removal**: Only used by `bibsearch.js`, which is also being removed due to disabled bib_search feature.
**Original Functionality**:
- Highlighted search terms in selected DOM elements
- Used modern CSS Custom Highlight API when available
- Fell back to simple class-based hiding for unsupported browsers
- Modified version of the marmelab/highlight-search-term library

### 3. `assets/js/typograms.js`
**Purpose**: Rendered ASCII art diagrams as SVG graphics based on Google's typograms library.
**Reason for Removal**: No pages in the site currently use typograms (no pages have `typograms: true` in frontmatter).
**Original Functionality**:
- Converted ASCII art text into SVG diagrams
- Supported various ASCII characters for drawing lines, boxes, and shapes
- Based on Google's typograms library with CSS moved to separate SCSS file

## Files Kept (Active Usage Confirmed)

### Search System Files
- `assets/js/search/` directory - All files are part of the ninja-keys search system, but search is currently disabled (`search_enabled: false`)
- These files are kept as they may be enabled in the future and are part of a cohesive search system

### Distill Layout Files
- `assets/js/distillpub/` directory - Used by the distill layout for academic papers
- These files are kept as they may be used for future blog posts or academic content

### Core Functionality Files
All other JavaScript files in `assets/js/` are actively used:
- `common.js` - Core site functionality
- `theme.js` - Theme switching functionality
- `copy_code.js` - Code block copy functionality
- `zoom.js` - Image zoom functionality
- `masonry.js` - Grid layout functionality
- `tabs.min.js` - Tab component functionality
- `jupyter_new_tab.js` - Jupyter notebook link handling
- `shortcut-key.js` - Keyboard shortcuts
- `no_defer.js` - Script loading optimization
- `vanilla-back-to-top.min.js` - Back to top button
- `bootstrap-toc.min.js` - Table of contents generation
- `bootstrap.bundle.min.js` - Bootstrap framework

## Impact Assessment

### Performance Improvements
- Reduced JavaScript bundle size by removing unused files
- Eliminated unnecessary HTTP requests for disabled features
- Cleaner asset directory structure

### Maintainability Improvements
- Removed dead code that could cause confusion
- Simplified dependency tree
- Reduced potential security surface area

## Re-enabling Instructions

If these features need to be re-enabled in the future:

### Bibliography Search
1. Set `bib_search: true` in `_config.yml`
2. Restore `assets/js/bibsearch.js` and `assets/js/highlight-search-term.js`
3. Ensure bibliography pages include the `{% include bib_search.liquid %}` template

### Typograms
1. Add `typograms: true` to page frontmatter where needed
2. Restore `assets/js/typograms.js`
3. Include typogram ASCII art in page content within appropriate code blocks

## Removal Date
Removed on: Wed Jul 23 13:14:02 EEST 2025
Removed as part of: Portfolio Visual Modernization (Task 7)