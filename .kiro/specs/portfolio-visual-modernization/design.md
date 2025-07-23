# Design Document

## Overview

This design outlines the modernization of the Jekyll portfolio website through both visual improvements and code cleanup. The approach focuses on enhancing the existing design system with modern aesthetics while maintaining the current layout structure. The design will implement contemporary typography, improved color schemes, modern component styling, and comprehensive code cleanup to create a cohesive, professional portfolio experience.

## Architecture

### Design System Enhancement
The modernization will build upon the existing SCSS architecture:
- **Variables System**: Enhance `_variables.scss` with modern design tokens
- **Component Library**: Modernize existing components with contemporary styling
- **Theme System**: Improve the existing light/dark theme implementation
- **Typography Scale**: Implement a modern, accessible typography system

### Code Organization
- **Asset Cleanup**: Remove unused JavaScript files and references
- **SCSS Optimization**: Consolidate redundant styles and improve organization
- **Performance**: Reduce bundle size through selective asset loading

## Components and Interfaces

### Typography System
**Modern Font Stack**
- Primary: Inter or system fonts for better readability
- Monospace: JetBrains Mono or SF Mono for code
- Improved line heights and letter spacing
- Clear hierarchy with consistent sizing scale

**Implementation**
```scss
$font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
$font-family-monospace: "JetBrains Mono", "SF Mono", Monaco, Consolas, monospace;

// Modern typography scale
$font-size-xs: 0.75rem;   // 12px
$font-size-sm: 0.875rem;  // 14px
$font-size-base: 1rem;    // 16px
$font-size-lg: 1.125rem;  // 18px
$font-size-xl: 1.25rem;   // 20px
$font-size-2xl: 1.5rem;   // 24px
$font-size-3xl: 1.875rem; // 30px
```

### Color System Modernization
**Enhanced Color Palette**
- Refined primary colors with better contrast ratios
- Semantic color tokens for consistent usage
- Improved dark mode colors
- Better accessibility compliance

**Color Tokens**
```scss
// Modern color palette
$primary-50: #f0f9ff;
$primary-500: #3b82f6;
$primary-600: #2563eb;
$primary-900: #1e3a8a;

// Semantic tokens
$color-text-primary: var(--text-primary);
$color-text-secondary: var(--text-secondary);
$color-surface: var(--surface);
$color-surface-elevated: var(--surface-elevated);
```

### Component Modernization

**Cards**
- Subtle shadows with modern elevation system
- Rounded corners (8px border radius)
- Better hover states with smooth transitions
- Improved spacing and typography

**Buttons and Interactive Elements**
- Modern button styles with proper focus states
- Smooth hover transitions (200ms ease-out)
- Better accessibility with proper contrast ratios
- Consistent sizing and spacing

**Navigation**
- Cleaner navbar with better spacing
- Improved mobile navigation experience
- Modern dropdown styling
- Better active state indicators

### Layout Enhancements
**Spacing System**
- Consistent spacing scale based on 4px grid
- Better use of whitespace for visual breathing room
- Improved content hierarchy through spacing

**Grid and Layout**
- Enhanced responsive behavior
- Better content alignment
- Improved visual balance

## Data Models

### SCSS Variable Structure
```scss
// Design tokens organized by category
$spacing: (
  xs: 0.25rem,
  sm: 0.5rem,
  md: 1rem,
  lg: 1.5rem,
  xl: 2rem,
  xxl: 3rem
);

$border-radius: (
  sm: 0.25rem,
  md: 0.5rem,
  lg: 0.75rem,
  xl: 1rem
);

$shadows: (
  sm: 0 1px 2px rgba(0, 0, 0, 0.05),
  md: 0 4px 6px rgba(0, 0, 0, 0.07),
  lg: 0 10px 15px rgba(0, 0, 0, 0.1)
);
```

### Theme Configuration
```scss
// Light theme
:root {
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --surface: #ffffff;
  --surface-elevated: #f9fafb;
  --border: #e5e7eb;
  --accent: #3b82f6;
}

// Dark theme
[data-theme="dark"] {
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --surface: #111827;
  --surface-elevated: #1f2937;
  --border: #374151;
  --accent: #60a5fa;
}
```

## Error Handling

### Asset Loading
- Graceful fallbacks for web fonts
- Progressive enhancement for modern features
- Proper error handling for missing assets

### Browser Compatibility
- CSS custom properties with fallbacks
- Modern CSS features with progressive enhancement
- Consistent experience across browsers

## Testing Strategy

### Visual Regression Testing
- Before/after comparisons of key pages
- Cross-browser compatibility testing
- Mobile responsiveness verification

### Performance Testing
- Asset size reduction measurement
- Page load time improvements
- Core Web Vitals optimization

### Accessibility Testing
- Color contrast ratio verification
- Keyboard navigation testing
- Screen reader compatibility

## Implementation Approach

### Phase 1: Foundation
1. Update design tokens in `_variables.scss`
2. Implement modern typography system
3. Enhance color system with better accessibility

### Phase 2: Component Modernization
1. Update card components with modern styling
2. Enhance button and interactive element styles
3. Improve navigation and header styling

### Phase 3: Code Cleanup
1. Identify and remove unused JavaScript files
2. Clean up template references to removed assets
3. Consolidate redundant SCSS code
4. Optimize asset loading

### Phase 4: Polish and Optimization
1. Fine-tune spacing and visual hierarchy
2. Optimize performance through asset reduction
3. Ensure consistent theming across all components
4. Final accessibility and responsiveness review

## File Structure Impact

### Files to Modify
- `_sass/_variables.scss` - Enhanced design tokens
- `_sass/_base.scss` - Updated base styles
- `_sass/_themes.scss` - Improved theme system
- `_sass/_projects.scss` - Modernized project cards
- Template files - Remove unused JS references

### Files to Remove
- `assets/js/bibsearch.js` - Unused bibliography search
- `assets/js/highlight-search-term.js` - Unused search highlighting
- `assets/js/typograms.js` - Only used conditionally, can be loaded on-demand
- Other unused JavaScript files identified during cleanup

### Files to Optimize
- Consolidate similar SCSS partials
- Optimize CSS output through better organization
- Reduce redundant style declarations

## Success Metrics

### Visual Improvements
- Modern, cohesive design across all pages
- Improved typography readability
- Better color contrast and accessibility
- Enhanced user experience through better visual hierarchy

### Performance Improvements
- Reduced JavaScript bundle size
- Faster page load times
- Cleaner, more maintainable codebase
- Better Core Web Vitals scores

### Code Quality
- Organized, well-commented SCSS
- Eliminated redundant code
- Improved maintainability
- Better development experience