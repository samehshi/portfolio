---
layout: page
title: Projects
permalink: /projects/
description: Explore my portfolio of data analytics and business intelligence projects that demonstrate my expertise in transforming complex data into actionable insights. Each project showcases a unique approach to solving real-world business challenges through data-driven solutions.
nav: true
nav_order: 3
display_categories: [PowerBI, Data Science Projects, work, Study]
horizontal: true
---

<div class="projects-page">

{% if site.enable_project_categories and page.display_categories %}
  <!-- Category Navigation -->
  <div class="category-navigation">
    <nav class="category-nav">
      <ul class="category-list">
        {% for category in page.display_categories %}
          <li class="category-item">
            <a class="category-link" href="#{{ category | slugify }}">
              {{ category }}
            </a>
          </li>
        {% endfor %}
      </ul>
    </nav>
  </div>

  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
    <section class="category-section" id="{{ category | slugify }}">
      <div class="category-header">
        <h2 class="category-title">{{ category }}</h2>
        <div class="category-divider"></div>
      </div>
      
      {% assign categorized_projects = site.projects | where: "category", category %}
      {% assign sorted_projects = categorized_projects | sort: "importance" %}
      
      <!-- Generate cards for each project -->
      <div class="projects-grid">
        {% for project in sorted_projects %}
          <div class="project-item">
            {% if page.horizontal %}
              {% include projects_horizontal.liquid %}
            {% else %}
              {% include projects.liquid %}
            {% endif %}
          </div>
        {% endfor %}
      </div>
    </section>
  {% endfor %}

{% else %}

<!-- Display projects without categories -->
<div class="category-header">
  <h2 class="category-title">All Projects</h2>
  <div class="category-divider"></div>
</div>

{% assign sorted_projects = site.projects | sort: "importance" %}

<!-- Generate cards for each project -->
<div class="projects-grid">
  {% for project in sorted_projects %}
    <div class="project-item">
      {% if page.horizontal %}
        {% include projects_horizontal.liquid %}
      {% else %}
        {% include projects.liquid %}
      {% endif %}
    </div>
  {% endfor %}
</div>

{% endif %}

</div>
