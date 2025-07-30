# Design Document

## Overview

This design addresses two critical aspects of the portfolio website: ensuring consistent and accessible theming across light and dark modes, and verifying that all content on the about and CV pages contains only verifiable, professional information. The solution involves a systematic audit and enhancement approach that maintains the site's professional appearance while ensuring content credibility.

## Architecture

### Theme Consistency System

The theme system is built on CSS custom properties (CSS variables) defined in `_sass/_themes.scss` with semantic color tokens. The architecture follows a two-layer approach:

1. **Semantic Color Tokens**: Modern color system with meaningful names (`--surface-primary`, `--text-primary`, etc.)
2. **Legacy Variable Mappings**: Backward compatibility layer for existing components

### Content Verification Framework

The content audit system focuses on two main pages:
- **About Page** (`_pages/about.md`): Personal introduction and professional summary
- **CV Page** (driven by `_data/cv.yml`): Detailed professional experience and achievements

## Components and Interfaces

### Theme Audit Components

1. **Color Contrast Validator**
   - Automated accessibility checking for WCAG compliance
   - Contrast ratio verification for all text/background combinations
   - Both light and dark theme validation

2. **Theme Consistency Checker**
   - Cross-page theme application verification
   - Interactive element state validation (hover, focus, active)
   - Component-specific theme support audit

3. **Visual Regression Testing**
   - Before/after comparison system
   - Cross-browser theme rendering validation
   - Mobile/desktop theme consistency

### Content Verification Components

1. **Content Analyzer**
   - Identifies claims requiring external verification
   - Flags specific company details or internal metrics
   - Suggests alternative phrasing for unverifiable statements

2. **Professional Tone Validator**
   - Ensures content maintains professional standards
   - Verifies factual vs. opinion-based statements
   - Checks for measurable vs. unmeasurable claims

## Data Models

### Theme Audit Results
```yaml
theme_audit:
  light_mode:
    contrast_issues: []
    missing_styles: []
    accessibility_score: number
  dark_mode:
    contrast_issues: []
    missing_styles: []
    accessibility_score: number
  cross_theme:
    consistency_issues: []
    transition_problems: []
```

### Content Verification Results
```yaml
content_audit:
  about_page:
    unverifiable_claims: []
    suggested_revisions: []
    professional_score: number
  cv_page:
    problematic_statements: []
    employer_dependent_claims: []
    suggested_alternatives: []
```

## Error Handling

### Theme Issues
- **Missing CSS Variables**: Fallback to default values with warning logs
- **Contrast Failures**: Automatic color adjustment suggestions
- **Browser Compatibility**: Progressive enhancement approach

### Content Issues
- **Unverifiable Claims**: Clear flagging with revision suggestions
- **Overly Specific Details**: Alternative phrasing recommendations
- **Professional Tone**: Style guide compliance checking

## Testing Strategy

### Theme Testing
1. **Automated Accessibility Testing**
   - WCAG 2.1 AA compliance verification
   - Color contrast ratio validation (4.5:1 minimum)
   - Keyboard navigation testing

2. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge compatibility
   - Mobile browser theme consistency
   - CSS custom property support validation

3. **Visual Regression Testing**
   - Screenshot comparison between themes
   - Component-level visual consistency
   - Interactive state verification

### Content Testing
1. **Content Analysis**
   - Automated scanning for verification-dependent claims
   - Professional tone assessment
   - Factual accuracy review

2. **Stakeholder Review**
   - Professional content validation
   - Industry-appropriate language verification
   - Legal/compliance review for claims

## Implementation Approach

### Phase 1: Theme Audit and Fixes
1. **Comprehensive Theme Analysis**
   - Audit all CSS custom properties for both themes
   - Identify missing or inconsistent color mappings
   - Test accessibility compliance across all components

2. **Theme Enhancement**
   - Fix contrast ratio issues
   - Ensure complete theme coverage for all components
   - Optimize theme switching transitions

### Phase 2: Content Verification and Revision
1. **Content Analysis**
   - Review about page for unverifiable claims
   - Audit CV content for employer-dependent statements
   - Identify overly specific internal details

2. **Content Revision**
   - Rewrite problematic statements as general capabilities
   - Replace specific metrics with percentage improvements
   - Ensure all claims are either factual or clearly presented as experience

### Phase 3: Quality Assurance
1. **Comprehensive Testing**
   - Full accessibility audit
   - Cross-device theme consistency verification
   - Content professional tone validation

2. **Documentation and Guidelines**
   - Theme maintenance guidelines
   - Content update standards
   - Future content verification checklist