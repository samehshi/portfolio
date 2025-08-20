# Jekyll Portfolio Project Structure

## Directory Layout

```
portfolio/
├── _config.yml              # Main configuration file
├── _data/                   # Data files (cv.yml)
├── _includes/               # Reusable components
├── _layouts/                # Page templates
├── _pages/                  # Main pages (about, projects, cv, etc.)
├── _projects/               # Published projects
├── _projects_new/           # New projects in development
├── _sass/                   # Sass stylesheets
├── assets/                  # Static assets (images, css, js)
├── specs/                   # Project specifications (this directory)
└── _config.yml              # Jekyll configuration
```

## Key Components

### 1. Pages (`_pages/`)
- `about.md` - Main about page with profile and contact info
- `projects.md` - Project listing page
- `cv.md` - Resume/CV page
- `Certs & badges.md` - Certifications and credential display

### 2. Projects (`_projects/` and `_projects_new/`)
- Each project is a markdown file with YAML frontmatter
- Projects are categorized (Study, work, business-intelligence, etc.)
- Projects include images and detailed descriptions
- New projects follow a template in `_projects_new/_project_template.md`

### 3. Data (`_data/`)
- `cv.yml` - Resume data in structured YAML format

### 4. Configuration
- `_config.yml` - Main site configuration
- `Gemfile` - Ruby dependencies
- `package.json` - Node.js dependencies (prettier)

## Project Frontmatter Structure

```yaml
layout: page
title: "Project Title"
description: "Brief description"
img: assets/img/project-image.png
importance: 1  # Ordering (lower = higher priority)
category: business-intelligence
secondary_categories: ["category1", "category2"]
business_objective: "Business goal addressed"
methodology: "Technical approach"
strategic_outcome: "Business value delivered"
tools: ["Tool1", "Tool2"]
business_impact: ["impact1", "impact2"]
complexity: "intermediate"
kpi: "Key performance indicators"
quantified_results: "Measurable outcomes"
github_link: "Link to repository"
```