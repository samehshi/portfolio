---
inclusion: always
---

# Technical Stack & Build System

## Core Technologies

- **Jekyll**: Static site generator (version specified in Gemfile)
- **Ruby**: Programming language required for Jekyll
- **Liquid**: Template language used in Jekyll
- **Markdown**: Content authoring format
- **SCSS/CSS**: Styling (with Bootstrap framework)
- **JavaScript**: Client-side interactivity

## Key Dependencies

### Jekyll Plugins
- jekyll-archives: For creating archive pages
- jekyll-scholar: For bibliography management
- jekyll-jupyter-notebook: For rendering Jupyter notebooks
- jekyll-imagemagick: For responsive image processing
- jekyll-minifier: For asset minification
- jekyll-toc: For table of contents generation

### Frontend Libraries
- Bootstrap: Core UI framework
- jQuery: JavaScript library
- MathJax: Mathematical notation rendering
- Masonry: Grid layout library
- Chart.js: Data visualization
- Medium Zoom: Image zoom functionality

## Common Commands

### Setup & Installation
```bash
# Install Ruby dependencies
bundle install

# Update dependencies
bundle update
```

### Development
```bash
# Start local development server
bundle exec jekyll serve

# Start with drafts enabled
bundle exec jekyll serve --drafts

# Start with livereload
bundle exec jekyll serve --livereload
```

### Build
```bash
# Build site for production
JEKYLL_ENV=production bundle exec jekyll build

# Build with specific config
bundle exec jekyll build --config _config.yml,_config_dev.yml
```

### Image Processing
```bash
# Process images with ImageMagick (automatic when building)
# Ensure ImageMagick is installed on your system
```

## Configuration Files

- **_config.yml**: Main Jekyll configuration
- **.prettierrc/.prettierignore**: Code formatting rules
- **.pre-commit-config.yaml**: Pre-commit hooks configuration

## Asset Management

- Images should be placed in `assets/img/` directory
- JavaScript files go in `assets/js/`
- CSS/SCSS files go in `assets/css/`
- PDF documents go in `assets/pdf/`

## Deployment

The site is deployed to GitHub Pages from the repository. Pushing to the main branch triggers the build and deployment process.