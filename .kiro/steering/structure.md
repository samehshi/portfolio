---
inclusion: always
---

# Project Structure & Organization

## Directory Structure

### Core Directories
- **_data/**: Contains data files (YAML, JSON) used by the site
  - `cv.yml`: CV/Resume data structure
- **_includes/**: Reusable components and templates
  - `cv/`: CV-specific components
  - `repository/`: GitHub repository components
  - `resume/`: Resume-specific components
  - `scripts/`: JavaScript includes
- **_layouts/**: Page layout templates
- **_pages/**: Main content pages (about, cv, projects, etc.)
- **_projects/**: Individual project files and directories
- **_sass/**: SCSS style partials
- **assets/**: Static assets (images, CSS, JS, PDFs, etc.)
- **_site/**: Generated site (do not edit directly)
- **.kiro/**: Kiro AI assistant configuration

### Project Files
Projects are stored in the `_projects/` directory with two main formats:
1. Markdown files (`.md`) for standard projects
2. Jupyter notebooks (`.ipynb`) for interactive data science projects
3. Project directories containing multiple files for complex projects

## Naming Conventions

### Files & Directories
- Project files: `[number]_[project-name].[extension]`
  - Example: `12_stock-volatility-forecasting-india.md`
- Project directories: `[number]_[project-name]`
  - Example: `12_volatility-forecasting-in-india/`
- Supporting files: Use descriptive names with hyphens
  - Example: `frontmatter.yml`

### Front Matter
All content pages and projects must include YAML front matter with:
- `layout`: Page layout template
- `title`: Page/project title
- `description`: Brief description
- `img`: Featured image path (for projects)
- `importance`: Numeric ordering value
- `category`: Primary category
- Additional optional fields based on content type

## Content Organization

### CV/Resume
- CV data is centralized in `_data/cv.yml`
- Rendered using components in `_includes/cv/`
- Main CV page is `_pages/cv.md`

### Projects
- Projects are organized by categories defined in front matter
- Each project should have its own file or directory
- Complex projects may include:
  - Jupyter notebooks
  - Python scripts
  - Data files
  - Configuration files
  - Front matter in separate YAML files

### Assets
- Images: `assets/img/`
- JavaScript: `assets/js/`
- CSS/SCSS: `assets/css/`
- PDFs: `assets/pdf/`
- Audio: `assets/audio/`
- Video: `assets/video/`

## Jekyll Collections
The site uses Jekyll collections for organizing content:
- `_projects`: For portfolio projects
- `_news`: For news/updates (if enabled)

## Build Output
The generated site is output to the `_site/` directory, which should not be edited directly as changes will be overwritten during the build process.