---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my cool projects.
nav: true
nav_order: 3
display_categories: [work, Study]
horizontal: true
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  <div class="project-list">
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
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->
  <div class="project-list">
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
