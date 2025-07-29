# Technology Stack

## Framework & Build System
- **Jekyll** - Static site generator with Ruby
- **al-folio theme** - Academic portfolio theme based on Jekyll
- **GitHub Pages** - Hosting platform

## Languages & Markup
- **Ruby** - Jekyll plugins and configuration
- **Liquid** - Templating language for Jekyll
- **SCSS/Sass** - Styling with variables and mixins
- **HTML/Markdown** - Content structure
- **JavaScript** - Interactive features and analytics

## Key Dependencies
- **Jekyll plugins**: archives, scholar, minifier, imagemagick, jupyter-notebook
- **CSS frameworks**: Bootstrap for responsive design
- **Icons**: Font Awesome, Tabler Icons
- **Analytics**: Google Analytics integration
- **Forms**: Formspree for contact form handling

## Development Tools
- **Prettier** with Liquid plugin for code formatting
- **ImageMagick** for responsive image generation
- **PurgeCSS** for CSS optimization

## Common Commands

### Local Development
```bash
# Install dependencies
bundle install
npm install

# Serve locally with live reload
bundle exec jekyll serve --trace

# Build for production
bundle exec jekyll build
```

### Content Management
```bash
# Add new project
# Create file in _projects/ with proper frontmatter

# Update CV data
# Edit _data/cv.yml

# Add images
# Place in assets/img/ - ImageMagick will generate responsive versions
```

### Deployment
- Automatic deployment via GitHub Pages on push to main branch
- Site builds automatically using GitHub Actions