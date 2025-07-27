# Project Structure

## Core Jekyll Structure

### Configuration
- `_config.yml` - Main Jekyll configuration with site settings, plugins, and theme options
- `_config_dev.yml` - Development-specific overrides
- `Gemfile` - Ruby dependencies and Jekyll plugins

### Content Directories
- `_pages/` - Static pages (about.md, cv.md, projects.md, etc.)
- `_projects/` - Project portfolio items with frontmatter and markdown content
- `_data/` - Structured data files (cv.yml for resume data)
- `_includes/` - Reusable template components and partials
- `_layouts/` - Page layout templates
- `_sass/` - SCSS stylesheets organized by component

### Assets
- `assets/img/` - Images (auto-generates responsive WebP versions)
- `assets/css/` - Compiled CSS and main.scss
- `assets/js/` - JavaScript files for interactivity
- `assets/pdf/` - PDF documents (CV, certificates)
- `assets/json/` - JSON data files

### Build Output
- `_site/` - Generated static site (excluded from version control)

## Content Conventions

### Project Files (`_projects/`)
- Numbered naming: `1_project.md`, `2_project.md`, etc.
- Required frontmatter: `layout`, `title`, `description`, `img`, `importance`, `category`
- Use Liquid includes for images: `{% include figure.liquid %}`

### Page Structure (`_pages/`)
- Frontmatter with `layout`, `title`, `permalink`
- About page uses special profile configuration
- CV page pulls from `_data/cv.yml`

### Data Files (`_data/`)
- `cv.yml` - Structured resume data with sections: experience, education, skills, certifications
- Uses specific types: `map`, `list`, `time_table`, `nested_list`

### Styling (`_sass/`)
- Component-based organization: `_layout.scss`, `_projects.scss`, `_cv.scss`
- Theme variables in `_variables.scss` and `_themes.scss`
- Responsive improvements in `_responsive-improvements.scss`

## File Naming Conventions
- Projects: Numbered with descriptive names
- Images: Descriptive names, placed in `assets/img/`
- Pages: Lowercase with hyphens for multi-word names
- Includes: Descriptive names with `.liquid` extension