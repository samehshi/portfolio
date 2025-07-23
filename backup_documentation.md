# Portfolio Backup Documentation

## Backup Information
- **Date**: 2025-01-22
- **Git Tag**: pre-cleanup-backup
- **Git Commit**: 3a946ae - "Add portfolio cleanup modernization spec files"

## Build Status
- **Build Command**: `bundle exec jekyll build --trace`
- **Status**: ✅ SUCCESS
- **Build Time**: ~3.4 seconds
- **Generated Files**: 9 responsive image files via ImageMagick

## Known Issues (Non-breaking)
1. YAML parsing warnings in:
   - `_projects/10_project.md` (line 3, column 22)
   - `_projects/8_project.md` (line 3, column 36)
2. ImageMagick deprecation warnings (convert → magick command)
3. Jekyll Twitter plugin ostruct warning

## Current File Structure

### Root Level
- Jekyll configuration: `_config.yml`, `_config_dev.yml`
- Ruby dependencies: `Gemfile`, `Gemfile.lock`, `.ruby-version`
- Build tools: `package.json`, `package-lock.json`, `purgecss.config.js`
- Documentation: `README.md`, `LICENSE`

### Content Directories
- `_pages/`: Static pages (about, cv, projects, 404, certs)
- `_projects/`: Project markdown files (12 projects)
- `_data/`: Data files (`cv.yml`)

### Theme Structure
- `_layouts/`: Page layouts (closed folder)
- `_includes/`: Reusable components and partials
- `_sass/`: SCSS stylesheets and theme files
- `_plugins/`: Custom Jekyll plugins (9 files)

### Assets
- `assets/css/`: Stylesheets and SCSS main file
- `assets/js/`: JavaScript files and libraries
- `assets/img/`: Images (projects, profile, placeholders, logos)
- `assets/fonts/`: Web fonts (academicons, tabler-icons)
- `assets/audio/`, `assets/video/`: Media files
- `assets/pdf/`: PDF documents (CVs, presentations)

### Generated/Build Files
- `_site/`: Generated Jekyll site (build output)
- `.jekyll-cache/`: Jekyll build cache

### Development Artifacts (Target for Cleanup)
- System files: `.DS_Store` files throughout project
- Analysis files: `corrupted_notebooks_analysis.md`, `cv_audit_report.md`
- Verification files: `production_verification_report.json`, `STRUCTURE_VALIDATION_REPORT.md`
- Scripts: `fix_notebooks.py`, `validate_structure.rb`, `verify_production_deployment.rb`
- Git info: `git_config_info.txt`

## Dependencies

### Ruby Gems (from Gemfile)
- Jekyll and related gems
- Theme: al-folio based
- Plugins: Various Jekyll plugins for enhanced functionality

### JavaScript Libraries
- Bootstrap
- jQuery
- Custom theme scripts
- Various utility libraries

### CSS Framework
- Bootstrap base
- Custom SCSS with theme variables
- Font Awesome and Tabler icons

### Image Processing
- Jekyll-imagemagick plugin
- Responsive image generation (480px, 800px, 1400px, WebP format)

## Theme Information
- **Base Theme**: al-folio (academic portfolio theme)
- **Customizations**: Extensive SCSS customizations and additional components
- **Responsive**: Mobile-first design with multiple breakpoints
- **Features**: Project showcase, CV display, responsive images, social links

## Current State Assessment
- ✅ Site builds successfully
- ✅ All pages accessible
- ✅ Responsive images generate properly
- ⚠️ Contains development artifacts ready for cleanup
- ⚠️ Some YAML formatting issues in project files (non-breaking)
- ⚠️ ImageMagick deprecation warnings (functional but outdated)

This documentation serves as a reference point for the cleanup and modernization process.