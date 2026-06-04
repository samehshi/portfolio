# AGENT.md - Portfolio Development Guide

## Build & Development Commands
- **Development server**: `jekyll serve --watch --port=8080 --host=0.0.0.0 --livereload --verbose --trace`
- **Build**: `bundle exec jekyll build`
- **Production build**: `JEKYLL_ENV=production bundle exec jekyll build`
- **CSS purge**: `npm install -g purgecss && purgecss -c purgecss.config.js`
- **Format HTML**: `npx prettier --write '**/*.html'`
- **Install dependencies**: `bundle install && npm install`

## Architecture & Structure
- **Jekyll-based** academic portfolio using al-folio theme
- **Content**: `_pages/` (static pages), `_projects/` (portfolio items), `_data/` (structured data)
- **Templates**: `_layouts/` (page layouts), `_includes/` (reusable components)
- **Styling**: `_sass/` (SCSS files), `assets/css/` (compiled CSS)
- **Output**: `_site/` (built site), served on GitHub Pages at `/portfolio` baseurl
- **Key configs**: `_config.yml` (main), `_config_dev.yml` (development)

## Code Style & Conventions
- **Liquid templating** for Jekyll, use `.liquid` extension for layouts/includes
- **SCSS** organized in `_sass/` with component-based structure
- **Prettier** formatting with liquid plugin, 150 char line width, trailing commas
- **Pre-commit hooks** for trailing whitespace, EOF, YAML validation, large files
- **File naming**: kebab-case for pages, snake_case for includes, PascalCase for layouts
- **Responsive design** with mobile-first approach, breakpoints in `_variables.scss`
