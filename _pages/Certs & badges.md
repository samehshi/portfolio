---
layout: page
title: Certifications & Credly Badges
permalink: /certs-badges/
description:
nav: true
nav_order: 3
display_categories: [Badges, Certifications]
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">

{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized sections -->
  {% for category in page.display_categories %}
    <a id="{{ category | downcase | replace: ' ', '-' }}" href="#{{ category | downcase | replace: ' ', '-' }}">
      <h2 class="category">{{ category }}</h2>
    </a>

    {% case category %}
    
    {% when "Badges" %}
    <div class="badges">
      {% assign badge_ids = 
        "1e7fec78-1157-48e6-90d9-5c8000198e33,
         afebee12-5f41-48d5-bb63-5ff08326eaba,
         927d2d78-8b77-4476-97eb-42386e9c2eee,
         bf286a16-3571-4f3b-875c-928694459894,
         75daa6d5-a645-44c2-9488-a41a002c1a4e,
         850db187-7a2d-408f-b780-da7cebda2f21,
         68a96644-fcc3-4340-85bf-d8f3f9de0339" | split: "," %}
      
      {% for id in badge_ids %}
        <div class="badge badge-credly">
          <div data-iframe-width="800" data-iframe-height="270"
               data-share-badge-id="{{ id | strip }}"
               data-share-badge-host="https://www.credly.com"></div>
        </div>
      {% endfor %}
    </div>

    <div class="credly-profile">
      <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
      <p>
        To see all badges, visit:
        <a href="https://www.credly.com/users/sameh_shehata" target="_blank">Credly Profile</a>
      </p>
    </div>

    {% when "Certifications" %}
    <div class="certifications">
      {% assign certs = 
        "Microsoft Certified: Fabric Analytics Engineer Associate DP-600|1xQmqwyQHlNB_zmVRipM8I8hcqtwI8m_R,
         Microsoft Certified: Power BI Data Analyst Associate PL-300|17MJIXzvnzBtO4-ttrnnbVYZIK2NRTmrX,
         Google Data Analytics Certificate|1cwHNXgUjQ0Z5CS4yur-RTQ8OELdMzT98,
         IBM Data Analyst Certificate|1l25oicUw18P0_LIQCTa9xIb92Qdys_3N,
         Google Business Intelligence Certificate|19YvLYZHM0guohSn_y6TP1z10BsgqcTZA,
         Google Advanced Data Analytics Professional Certificate|1aj8OWhT3-hFImV_ELzyqzUHcxLi6SNWB" | split: "," %}

      {% for cert in certs %}
        {% assign parts = cert | split: "|" %}
        <figure class="certification">
          <iframe src="https://drive.google.com/file/d/{{ parts[1] | strip }}/preview" width="100%" height="600px"></iframe>
          <figcaption>{{ parts[0] | strip }}</figcaption>
        </figure>
      {% endfor %}
    </div>

    {% endcase %}
  {% endfor %}
{% endif %}

</div>
