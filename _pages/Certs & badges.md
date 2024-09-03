---
layout: page
title: Certifications & Cradly badges
permalink: /Certs & badges/
description:
nav: true
nav_order: 3
display_categories: [Badges, Certifications]
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>

  <!-- Add specific content for each category -->

{% case category %}
{% when "Badges" %}

<div class="row justify-content-sm-center" style="max-width: 400px;">
<div data-iframe-width="400" data-iframe-height="270" data-share-badge-id="1e7fec78-1157-48e6-90d9-5c8000198e33" data-share-badge-host="https://www.credly.com"></div>
<script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
</div>

{% when "Certifications" %}

  <div class="row justify-content-sm-center" style="max-width: 400px;">
      <img src="path-to-your-image.jpg" alt="Certification Image" />
  </div>

{% endcase %}

{% endfor %}
{% endif %}

</div>
