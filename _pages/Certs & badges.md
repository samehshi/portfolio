---
layout: page
title: Digital Badges & Professional Certifications 
permalink: /certifications/
description: Below is a curated collection of my digital badges and professional certificationsthat validate my expertise in data analytics, business intelligence, and cloud technologies. These credentials demonstrate my commitment to continuous learning and staying current with industry best practices.
nav: true
nav_order: 4
---

<div class="certifications-page">

  <!-- Credly Badges Section -->
  <section class="section-badges">
    <h2 class="section-title">Digital Badges</h2>
    <p class="section-description">
      Industry-recognized digital credentials that showcase my skills and achievements in data science and analytics.
    </p>
    
    <div class="badges-grid">
      {% assign badge_ids = 
        "1e7fec78-1157-48e6-90d9-5c8000198e33,
         afebee12-5f41-48d5-bb63-5ff08326eaba,
         927d2d78-8b77-4476-97eb-42386e9c2eee,
         bf286a16-3571-4f3b-875c-928694459894,
         75daa6d5-a645-44c2-9488-a41a002c1a4e,
         850db187-7a2d-408f-b780-da7cebda2f21,
         68a96644-fcc3-4340-85bf-d8f3f9de0339" | split: "," %}
      
      {% for id in badge_ids %}
        <div class="badge-container">
          <div class="badge-credly" 
               data-iframe-width="100%" 
               data-iframe-height="270"
               data-share-badge-id="{{ id | strip }}"
               data-share-badge-host="https://www.credly.com">
          </div>
        </div>
      {% endfor %}
    </div>
    
    <div class="credly-profile-link">
      <p>
        <i class="fas fa-external-link-alt"></i>
        View all my digital badges on my 
        <a href="https://www.credly.com/users/sameh_shehata" target="_blank" rel="noopener noreferrer">Credly Profile</a>
      </p>
    </div>
  </section>

  <!-- Certifications Section -->
  <section class="section-certifications">
    <h2 class="section-title">Professional Certifications</h2>
    <p class="section-description">
      Formal certifications from leading technology providers that validate my expertise in data analytics and business intelligence platforms.
    </p>
    
    <div class="certifications-list">
      {% assign certs = 
        "Microsoft Certified: Fabric Analytics Engineer Associate DP-600|1xQmqwyQHlNB_zmVRipM8I8hcqtwI8m_R,
         Microsoft Certified: Power BI Data Analyst Associate PL-300|17MJIXzvnzBtO4-ttrnnbVYZIK2NRTmrX,
         Google Data Analytics Certificate|1cwHNXgUjQ0Z5CS4yur-RTQ8OELdMzT98,
         IBM Data Analyst Certificate|1l25oicUw18P0_LIQCTa9xIb92Qdys_3N,
         Google Business Intelligence Certificate|19YvLYZHM0guohSn_y6TP1z10BsgqcTZA,
         Google Advanced Data Analytics Professional Certificate|1aj8OWhT3-hFImV_ELzyqzUHcxLi6SNWB" | split: "," %}

      {% for cert in certs %}
        {% assign parts = cert | split: "|" %}
        <div class="certification-card">
          <figure class="certification-figure">
            <iframe src="https://drive.google.com/file/d/{{ parts[1] | strip }}/preview" 
                    width="100%" 
                    height="400"
                    loading="lazy"
                    title="{{ parts[0] | strip }}"></iframe>
            <figcaption class="certification-caption">{{ parts[0] | strip }}</figcaption>
          </figure>
        </div>
      {% endfor %}
    </div>
  </section>

  <!-- Credly Embed Script -->
  <script type="text/javascript" async src="https://cdn.credly.com/assets/utilities/embed.js"></script>
</div>
