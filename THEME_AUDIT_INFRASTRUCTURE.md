# Theme Audit Infrastructure

This document describes the automated theme audit infrastructure created for the portfolio website. The infrastructure includes tools for accessibility testing and theme consistency validation.

## Overview

The theme audit infrastructure consists of three main components:

1. **Codebase Indexing** - Semantic search capabilities using MCP code-context
2. **Accessibility Testing** - Automated WCAG 2.1 AA compliance testing
3. **Theme Consistency Validation** - CSS custom properties and theme switching validation

## Components

### 1. Codebase Indexing

The entire codebase has been indexed using the MCP code-context server for semantic search capabilities.

- **Status**: ✅ Complete
- **Files Indexed**: 73 files, 1212 chunks
- **Usage**: Enables semantic search across all project files for theme-related analysis

### 2. Browser-Based Accessibility Testing

**Tools**: Browser developer tools (Lighthouse, axe DevTools)

Automated accessibility testing tool based on axe-core library that tests WCAG 2.1 AA compliance.

#### Features:
- Tests HTML files for accessibility violations
- Focuses on WCAG 2.1 AA compliance standards
- Generates detailed reports with recommendations
- Supports batch testing of multiple HTML files
- Provides immediate feedback during testing

#### Usage:
```bash
# Run accessibility audit
node accessibility_audit_tool.js

# Or use npm script
npm run audit:accessibility
```

#### Configuration:
- **Target Standards**: WCAG 2.1 AA
- **Test Tags**: wcag2a, wcag2aa, wcag21aa
- **Output**: JSON report with violations, passes, and incomplete tests

#### Key Accessibility Rules Tested:
- Color contrast ratios (4.5:1 minimum)
- ARIA attributes and labels
- Form field labels
- Image alt text
- Page structure and landmarks
- Keyboard navigation support

### 3. Theme Consistency Validator

**File**: `theme_consistency_validator.js`

Validates theme consistency across light and dark modes, ensuring proper CSS custom properties and theme switching functionality.

#### Features:
- Parses CSS custom properties from SCSS files
- Validates theme completeness (required properties)
- Tests contrast ratios for accessibility compliance
- Validates theme switching functionality in HTML
- Generates comprehensive reports with severity levels

#### Usage:
```bash
# Run theme validation
node theme_consistency_validator.js

# Or use npm script
npm run audit:theme
```

#### Validation Areas:

**Theme Completeness**:
- Checks for required CSS custom properties in both themes
- Validates property consistency between light and dark modes

**Contrast Ratios**:
- Tests text/background color combinations
- Ensures WCAG 2.1 AA compliance (4.5:1 ratio minimum)
- Validates footer, main content, and UI element contrasts

**Theme Switching**:
- Verifies theme toggle button presence
- Checks data-theme attribute implementation
- Validates theme-related HTML structure

#### Required CSS Properties:
- `--global-bg-color`
- `--global-text-color`
- `--global-text-color-light`
- `--global-theme-color`
- `--global-hover-color`
- `--global-footer-bg-color`
- `--global-footer-text-color`
- `--global-distill-app-color`
- `--global-divider-color`

## Dependencies

The infrastructure requires the following npm packages:

```json
{
  "devDependencies": {
    "axe-core": "^4.8.0",
    "jsdom": "^23.0.0"
  }
}
```

## NPM Scripts

The following scripts are available in `package.json`:

```json
{
  "scripts": {
    "audit:accessibility": "node accessibility_audit_tool.js",
    "audit:theme": "node theme_consistency_validator.js",
    "audit:all": "npm run audit:accessibility && npm run audit:theme"
  }
}
```

## Reports Generated

### Accessibility Report
**File**: `accessibility_audit_report.json`

Contains:
- Summary statistics (total files, violations, passes)
- Detailed violation information with severity levels
- Recommendations for fixing common issues
- Pass/fail status for each tested rule

### Theme Consistency Report
**File**: `theme_consistency_report.json`

Contains:
- Theme property analysis (light/dark mode coverage)
- Completeness issues (missing properties)
- Contrast ratio violations
- Theme switching functionality problems
- Severity-based recommendations

## Current Status

### Codebase Indexing
- ✅ **Complete**: 73 files indexed with 1212 chunks
- ✅ **Semantic Search**: Available for theme-related code analysis

### Accessibility Testing
- ✅ **Tool Created**: Automated WCAG 2.1 AA testing
- ✅ **Dependencies Installed**: axe-core and jsdom configured
- ✅ **Testing Verified**: Successfully identifies accessibility issues
- ⚠️ **Site Testing**: Some external resource errors (non-blocking)

### Theme Consistency Validation
- ✅ **Tool Created**: CSS property and theme switching validation
- ✅ **Issue Detection**: Found 24 theme-related issues
- ⚠️ **High Priority Issues**: 21 high-severity issues identified
- ⚠️ **Missing Properties**: No CSS custom properties found in current theme files

## Identified Issues

### High Priority (21 issues)
- Missing required CSS custom properties in both light and dark themes
- No theme-related data attributes found in HTML structure

### Medium Priority (3 issues)
- Theme switching functionality issues
- Missing theme toggle elements

## Next Steps

1. **Address High Priority Issues**:
   - Implement missing CSS custom properties
   - Add proper theme switching infrastructure

2. **Fix Theme Implementation**:
   - Update SCSS files with required custom properties
   - Implement data-theme attribute system
   - Add theme toggle functionality

3. **Accessibility Improvements**:
   - Fix identified WCAG violations
   - Improve color contrast ratios
   - Add missing landmarks and ARIA labels

## Research Sources

The infrastructure was built based on current web standards and best practices:

- **WCAG 2.1 AA Guidelines**: W3C Web Accessibility Initiative
- **axe-core Library**: Deque Systems accessibility testing engine
- **CSS Custom Properties**: Modern theming approaches
- **Theme Switching Patterns**: Industry-standard implementations

## Maintenance

The audit tools should be run regularly to ensure ongoing compliance:

- **Before releases**: Run full audit suite
- **After theme changes**: Validate theme consistency
- **After content updates**: Check accessibility compliance
- **Monthly**: Full infrastructure review

This infrastructure provides a solid foundation for maintaining theme consistency and accessibility compliance across the portfolio website.