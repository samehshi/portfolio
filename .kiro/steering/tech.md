# Technology Stack

## Framework & Theme
- **Jekyll** - Static site generator for GitHub Pages
- **al-folio theme** - Academic portfolio theme via `remote_theme: alshedivat/al-folio`
- **Ruby** - Backend language for Jekyll plugins and build process

## Build System
- **Jekyll** with extensive plugin ecosystem
- **Sass/SCSS** - CSS preprocessing with modern design tokens
- **PurgeCSS** - CSS optimization and unused style removal
- **ImageMagick** - Responsive image generation (WebP conversion)

## Key Dependencies
### Jekyll Plugins
- `jekyll-scholar` - Bibliography and citation management
- `jekyll-jupyter-notebook` - Jupyter notebook integration
- `jekyll-imagemagick` - Image processing and optimization
- `jekyll-feed` - RSS feed generation
- `jekyll-sitemap` - XML sitemap generation
- `jekyll-seo-tag` - SEO meta tags

### Frontend Libraries
- **Bootstrap** - CSS framework for responsive design
- **jQuery** - JavaScript utilities
- **MathJax** - Mathematical notation rendering
- **Chart.js** - Data visualization charts
- **Leaflet** - Interactive maps
- **Mermaid** - Diagram and flowchart rendering

## Development Tools
- **Prettier** - Code formatting with Liquid template support
- **Node.js/npm** - Package management for frontend tools
- **Bundler** - Ruby gem dependency management

## Common Commands

### Development
```bash
# Install dependencies
bundle install
npm install

# Serve locally with live reload
bundle exec jekyll serve --config _config.yml,_config_dev.yml

# Build for production
bundle exec jekyll build

# Format code
npx prettier --write .
```

### Deployment
- **GitHub Pages** - Automatic deployment on push to main branch
- Uses `remote_theme` for proper GitHub Pages compatibility
- Production builds automatically optimize images and CSS

## Configuration Files
- `_config.yml` - Main Jekyll configuration
- `_config_dev.yml` - Development overrides
- `Gemfile` - Ruby dependencies
- `package.json` - Node.js dependencies
- `.prettierrc` - Code formatting rules
- `purgecss.config.js` - CSS optimization settings