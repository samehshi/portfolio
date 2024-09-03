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

<div class="certifications">
    <figure>
        <iframe src="https://drive.google.com/file/d/1cwHNXgUjQ0Z5CS4yur-RTQ8OELdMzT98/preview" width="100%" height="600px"></iframe>
        <figcaption>Google Data Analytics Certificate</figcaption>
    </figure>
        <figure>
        <iframe src="https://drive.google.com/file/d/1l25oicUw18P0_LIQCTa9xIb92Qdys_3N/preview" width="100%" height="600px"></iframe>
        <figcaption>IBM Data Analyst Certificate</figcaption>
    </figure>
    <figure>
        <iframe src="https://drive.google.com/file/d/19YvLYZHM0guohSn_y6TP1z10BsgqcTZA/preview" width="100%" height="600px"></iframe>
        <figcaption> Google Business Intelligence Certificate</figcaption>
    </figure>

    <figure>
        <iframe src="https://drive.google.com/file/d/1aj8OWhT3-hFImV_ELzyqzUHcxLi6SNWB/preview" width="100%" height="600px"></iframe>
        <figcaption>Google Advanced Data Analytics Professional Certificate</figcaption>
    </figure>

</div>

{% endcase %}

{% endfor %}
{% endif %}

</div>

<style>
.certifications {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.certifications figure {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 400px;
}

.certifications figcaption {
    text-align: center;
    margin-top: 5px;
}

</style>
