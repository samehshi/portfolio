# Portfolio Projects Documentation

This directory contains all project files for the portfolio website. This README provides guidance on managing project content, ensuring consistency, and following best practices.

## Project Structure

Projects can be structured in three ways:

1. **Simple Markdown Projects** - Single `.md` file (e.g., `10_customer-segmentation-financial-services.md`)
2. **Jupyter Notebook Projects** - `.ipynb` file with a `.ipynb.frontmatter` file (e.g., `7_predictive-modeling-air-quality-nairobi-kenya.ipynb`)
3. **Complex Directory Projects** - Directory containing multiple files with a `frontmatter.yml` file (e.g., `9_bankruptcy-in-poland/`)

## Creating New Projects

### Using the Template Generator

The easiest way to create a new project is using the template generator script:

```bash
ruby scripts/project-template-generator.rb
```

This interactive script will:
- Generate a properly numbered filename
- Create the appropriate file structure
- Add required frontmatter
- Update project categories

For Jupyter notebook projects, use the `--jupyter` flag:

```bash
ruby scripts/project-template-generator.rb --jupyter
```

### Manual Creation

If creating a project manually:

1. Copy `_project_template.md` to a new file with format `[number]_[slug].md`
2. Update the frontmatter with your project details
3. Add the project to `_data/project_categories.yml`

## Project Frontmatter

The frontmatter at the top of each project file controls how it's displayed and categorized:

```yaml
---
layout: project
title: "Project Title"
description: "Business-focused description"
img: assets/img/project-image.jpg
importance: 1
category: data-analytics
secondary_categories: ["category1", "category2"]
business_objective: "Clear business goal"
methodology: "Technical approach"
strategic_outcome: "Business impact"
tools: ["Tool1", "Tool2", "Tool3"]
business_impact: ["impact1", "impact2"]
complexity: "intermediate"
kpi: "Key performance indicators"
---
```

### Required Fields

- `title`: Project title
- `description`: Brief business-focused description
- `category`: Primary category (from `project_categories.yml`)
- `importance`: Priority ranking (1-5, lower is more important)

### Recommended Fields

- `img`: Project image path
- `business_objective`: Clear business goal
- `methodology`: Technical approach
- `strategic_outcome`: Measurable results
- `tools`: Array of tools used
- `business_impact`: Array of business impact categories
- `complexity`: Complexity level (basic, intermediate, advanced, expert)

## Project Content Structure

For optimal presentation, include these sections:

```markdown
## Business Objective

Detailed explanation of the business problem or opportunity.

## Action & Methodology

Description of the technical approach and methods used.

## Strategic Outcome

Detailed explanation of results and business significance.

## Business Impact & Strategic Value

Quantification of business impact and discussion of strategic value.

## Project Visualizations

<!-- Include relevant visualizations -->
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/project-image1.jpg" title="Visualization Title" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```

## Project Categories

Projects are categorized according to the taxonomy defined in `_data/project_categories.yml`:

### Primary Categories

- `business-intelligence`: Business Intelligence & Visualization
- `data-analytics`: Data Analytics & Strategy
- `machine-learning`: Machine Learning & Predictive Analytics
- `real-estate`: Real Estate & Market Analysis

### Secondary Categories

Each project can have multiple secondary categories that provide more specific classification.

### Tools and Technologies

Assign relevant tools from the predefined list to enable filtering by technology.

### Business Impact

Categorize projects by their business impact to highlight value creation.

## Validating Project Content

Use the validation script to check for consistency and completeness:

```bash
ruby scripts/validate-project-content.rb
```

For automatic fixing of common issues:

```bash
ruby scripts/validate-project-content.rb --fix
```

## Best Practices

1. **Business Focus**: Emphasize business objectives and outcomes over technical details
2. **Quantified Results**: Include specific metrics and KPIs where possible
3. **Consistent Categorization**: Follow the established taxonomy for categories
4. **High-Quality Images**: Use professional images that represent the project
5. **Comprehensive Metadata**: Complete all recommended frontmatter fields
6. **Regular Validation**: Run the validation script after making changes

## Additional Resources

- See the [Project Categorization Guide](.kiro/specs/portfolio-modernization/project_categorization_guide.md) for detailed taxonomy information
- Review existing projects for examples of effective presentation
- Use the template generator for consistent project creation