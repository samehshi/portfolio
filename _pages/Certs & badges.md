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

<div class="badges">
    <div class="badge">
        <div data-iframe-width="400" data-iframe-height="270" data-share-badge-id="1e7fec78-1157-48e6-90d9-5c8000198e33" data-share-badge-host="https://www.credly.com"></div>
    </div>
    <div class="badge">
        <div data-iframe-width="400" data-iframe-height="270" data-share-badge-id="afebee12-5f41-48d5-bb63-5ff08326eaba" data-share-badge-host="https://www.credly.com"></div>
    </div>
    <div class="badge">
        <div data-iframe-width="400" data-iframe-height="270" data-share-badge-id="927d2d78-8b77-4476-97eb-42386e9c2eee" data-share-badge-host="https://www.credly.com"></div>
    </div>
    <div class="badge">
        <div data-iframe-width="400" data-iframe-height="270" data-share-badge-id="bf286a16-3571-4f3b-875c-928694459894" data-share-badge-host="https://www.credly.com"></div>
    </div>
    <div class="badge">
        <div data-iframe-width="400" data-iframe-height="270" data-share-badge-id="75daa6d5-a645-44c2-9488-a41a002c1a4e" data-share-badge-host="https://www.credly.com"></div>
    </div>
    <div class="badge">
        <div data-iframe-width="400" data-iframe-height="270" data-share-badge-id="850db187-7a2d-408f-b780-da7cebda2f21" data-share-badge-host="https://www.credly.com"></div>
    </div>
    <div class="badge">
        <div data-iframe-width="800" data-iframe-height="270" data-share-badge-id="68a96644-fcc3-4340-85bf-d8f3f9de0339" data-share-badge-host="https://www.credly.com"></div>
    </div>
</div>

<!-- Credly Profile on its own line -->
<div class="credly-profile"> 
  <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
  <p>To see all the badges visit the following link: <a href="https://www.credly.com/users/sameh_shehata" target="_blank">Credly Profile</a></p>
</div>

{% when "Certifications" %}

<div class="certifications">
    <figure>
        <iframe src="https://drive.google.com/file/d/17MJIXzvnzBtO4-ttrnnbVYZIK2NRTmrX/preview" width="100%" height="600px"></iframe>
        <figcaption>Microsoft Certified: Power BI Data Analyst Associate PL-300</figcaption>
    </figure>
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
        <figcaption>Google Business Intelligence Certificate</figcaption>
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
// SCSS styling for badges

.badges {
  // Container styling
  display: flex; // Ensures badges are laid out in a row
  flex-wrap: wrap; // Allows wrapping to the next line if space is insufficient
  gap: 0.5rem; // Space between badges
  padding: 0.5rem 0; // Space above and below badges container
  
  // Optional styling for alignment and appearance
  align-items: center;
  justify-content: center;
}

.badges span {
  // Individual badge styling
  display: inline-block;
  color: var(--global-text-color); // Set text color from variable
  background-color: var(--badge-background-color, #f0f0f0); // Set background color with fallback
  border-radius: 0.25rem; // Rounded corners
  padding: 0.2rem 0.5rem; // Padding inside each badge
  margin: 0; // Remove any default margins
  text-align: center; // Center text within the badge
  font-size: 0.875rem; // Font size for readability
  line-height: 1.2; // Line height for spacing
  border: 1px solid var(--badge-border-color, #ddd); // Border around badge with fallback color

  // Hover effect
  &:hover {
    text-decoration: underline; // Underline on hover
    cursor: pointer; // Pointer cursor on hover
  }
}

.badge div {
  border: 2px solid #ddd;
  width: 100%;
  height: 270px; /* Adjust height to match the iframe content */
  overflow: hidden; /* Hide anything outside the frame */
}

// Optional media query for responsive design
@media (max-width: 600px) {
  .badges {
    gap: 0.25rem; // Reduce gap on smaller screens
    padding: 0.25rem 0; // Adjust padding for small screens
  }
  
  .badges span {
    font-size: 0.75rem; // Adjust font size for small screens
  }
}

</style>
