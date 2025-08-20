# Project Structure

## Core Jekyll Directories

### Content Collections
- `_projects/` - Project showcase pages with frontmatter metadata
  - Each project uses `layout: page` with custom fields (title, description, img, importance, category)
  - Images referenced from `assets/img/` directory
  - Support for embedded visualizations and Kaggle notebooks

- `_pages/` - Static pages (About, CV, Projects, Certifications)
  - `about.md` - Main landing page
  - `cv.md` - Professional CV with dynamic components
  - `projects.md` - Project listing page
  - `404.md` - Custom error page

- `_data/` - YAML data files
  - `cv.yml` - Structured CV data with nested sections
  - `cv_revised.yml` - Alternative CV format

### Theme Components
- `_includes/` - Reusable Liquid templates
  - `cv/` - CV-specific components (professional_header, testimonials, etc.)
  - `scripts/` - JavaScript integration templates
  - `repository/` - GitHub repository widgets

- `_layouts/` - Page layout templates (inherited from al-folio theme)

- `_sass/` - SCSS stylesheets with modern design tokens
  - `_variables.scss` - Design system variables
  - `_cv.scss` - CV-specific styling
  - `_projects.scss` - Project showcase styling
  - Component-specific SCSS files

### Assets Organization
- `assets/`
  - `img/` - Images with responsive variants (WebP conversion)
  - `css/` - Compiled stylesheets and main.scss
  - `js/` - JavaScript files and libraries
  - `pdf/` - Downloadable documents (CV, certificates)
  - `json/` - Data files for dynamic content
  - `video/` - Media files
  - `audio/` - Audio assets

### Configuration & Build
- `_config.yml` - Main Jekyll configuration with theme settings
- `_config_dev.yml` - Development environment overrides
- `_plugins/` - Custom Jekyll plugins for extended functionality
- `_site/` - Generated static site (build output)

## File Naming Conventions

### Projects
- Use descriptive filenames: `1_project.md`, `2_project.md`, etc.
- Include importance ranking in frontmatter for ordering
- Categories: "Study", "Professional", "Personal"

### Images
- Use descriptive names with project prefixes
- Multiple formats supported: PNG, JPG, WebP
- Responsive variants generated automatically

### Data Files
- YAML format for structured content
- Nested structure for complex CV sections
- Semantic naming for content types

## Content Guidelines

### Project Pages
- Required frontmatter: layout, title, description, img, importance, category
- Use Liquid templates for image galleries
- Embed external content (Kaggle, GitHub) via iframes
- Include impact metrics and technical details

### CV Structure
- Modular components in `_includes/cv/`
- Data-driven content from `_data/cv.yml`
- Professional formatting with modern design tokens
- Responsive layout for mobile/desktop

### Styling Architecture
- Component-based SCSS organization
- Modern design tokens in `_variables.scss`
- Consistent spacing system (4px grid)
- Dark/light mode support via CSS custom properties