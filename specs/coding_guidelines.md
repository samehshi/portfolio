# Coding Guidelines for Jekyll Portfolio

## Markdown Standards

### Frontmatter
- Use consistent YAML formatting with proper indentation
- Quote string values that contain special characters
- Maintain consistent naming conventions for custom fields
- Required fields for projects:
  ```yaml
  layout: page
  title: "Project Title"
  description: "Brief description"
  img: assets/img/project-image.png
  importance: 1
  category: primary-category
  ```

### Content Structure
- Use heading levels consistently (H2 for main sections, H3 for subsections)
- Maintain consistent section naming:
  - Business Objective
  - Action & Methodology
  - Strategic Outcome
  - Business Impact & Strategic Value
  - Project Visualizations

## Image Handling

### Naming Convention
- Use descriptive names with underscores (e.g., `powerbi_dashboard_overview.png`)
- Include project number prefix when applicable (e.g., `p1_sales_dashboard.png`)

### Optimization
- Compress images before uploading
- Use appropriate dimensions (max 1400px width for full-size images)
- Include multiple sizes for responsive design when needed

### Inclusion in Content
```liquid
{% include figure.liquid 
   loading="eager" 
   path="assets/img/image-name.png" 
   title="Descriptive title" 
   class="img-fluid rounded z-depth-1" 
%}
```

## Project Template Usage

### Creating New Projects
1. Copy `_projects_new/_project_template.md` as starting point
2. Fill in all required frontmatter fields
3. Replace placeholder content with actual project details
4. Add relevant images to `assets/img/`
5. Test locally before publishing

### Content Guidelines
- Focus on business value rather than technical details
- Use bullet points for scannability
- Include quantified results where possible
- Link to external resources (GitHub, Kaggle, etc.)

## Liquid Template Standards

### Consistent Includes
- Use existing includes when possible (`figure.liquid`, `projects.liquid`)
- Pass parameters explicitly rather than relying on context
- Document custom includes with comments

### Conditional Logic
- Use consistent indentation for nested Liquid tags
- Comment complex conditionals
- Prefer early returns when possible

## SEO Best Practices

### Meta Tags
- Include relevant keywords in descriptions
- Use descriptive titles
- Specify appropriate categories

### Accessibility
- Always include alt text for images
- Use semantic HTML elements
- Maintain proper heading hierarchy

## Asset Management

### CSS
- Add custom styles to `_sass/_custom.scss`
- Use existing Bootstrap classes when possible
- Prefix custom classes with `portfolio-` to avoid conflicts

### JavaScript
- Add custom scripts to `_includes/scripts/`
- Use existing script includes in `default.liquid`
- Minimize external dependencies