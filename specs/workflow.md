# Development & Deployment Workflow

## Local Development

### Prerequisites
- Ruby 2.5.0 or higher
- Bundler gem
- Node.js (for prettier)

### Setup
```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies (if needed)
npm install

# Serve locally
bundle exec jekyll serve
```

### Development Process
1. Create feature branch for new projects
2. Add content to `_projects_new/` directory
3. Test locally with `bundle exec jekyll serve`
4. Validate links and images
5. Check responsive design on different screen sizes
6. Run prettier formatting if needed

## Project Creation Workflow

### 1. Create New Project
```bash
# Copy template
cp _projects_new/_project_template.md _projects_new/NEW_PROJECT_NUMBER_project.md

# Create project directory (if needed)
mkdir _projects_new/NEW_PROJECT_NUMBER_project_name
```

### 2. Fill in Content
- Complete all frontmatter fields
- Write detailed project description
- Add images to `assets/img/`
- Include visualizations and results

### 3. Test Locally
```bash
bundle exec jekyll serve --drafts
```

### 4. Publish Project
```bash
# Move from _projects_new to _projects
mv _projects_new/NEW_PROJECT_NUMBER_project.md _projects/
```

## Content Updates

### CV Updates
1. Edit `_data/cv.yml`
2. Test locally to verify formatting
3. Commit and push to trigger GitHub Pages build

### About Page Updates
1. Edit `_pages/about.md`
2. Update profile information, skills, or contact details
3. Test locally and deploy

## Image Processing

### Adding New Images
1. Place images in `assets/img/`
2. Use descriptive filenames
3. Optimize for web (compress, resize appropriately)

### Responsive Images
The site uses ImageMagick to automatically generate responsive versions:
- Widths: 480px, 800px, 1400px
- Formats: Original + WebP

Ensure ImageMagick is installed:
```bash
# Check if installed
convert -version

# Install on macOS
brew install imagemagick
```

## Deployment

### GitHub Pages
- Site automatically builds and deploys on push to main branch
- Check build status in GitHub Actions
- Monitor for build errors in GitHub Pages settings

### Custom Domain
- Configured through CNAME file
- DNS managed through domain registrar

## Testing

### Link Checking
```bash
# Install htmlproofer
gem install htmlproofer

# Check links (locally built site)
htmlproofer ./_site --disable-external
```

### Browser Testing
- Test in latest Chrome, Firefox, Safari
- Check mobile responsiveness
- Verify dark/light mode functionality

### Performance
- Use Lighthouse for performance auditing
- Optimize images for web
- Minimize external asset loading

## Troubleshooting

### Common Issues
1. **Build failures**: Check GitHub Actions logs
2. **Missing images**: Verify file paths and names
3. **Formatting issues**: Check YAML frontmatter syntax
4. **Layout problems**: Validate HTML structure

### Ruby Dependencies
If experiencing gem issues:
```bash
# Update bundler
gem update bundler

# Reinstall dependencies
bundle install --force
```

### Theme Updates
To update the al-folio theme:
1. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/alshedivat/al-folio.git
   ```
2. Fetch and merge updates:
   ```bash
   git fetch upstream
   git merge upstream/master
   ```