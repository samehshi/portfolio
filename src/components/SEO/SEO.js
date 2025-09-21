import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
  title,
  description,
  keywords,
  author,
  type = 'website',
  image,
  url,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleTags = [],
  noIndex = false,
  canonicalUrl,
  structuredData,
  additionalMetaTags = [],
  additionalLinkTags = [],
}) => {
  // Default values
  const defaultTitle = 'Sameh Shehata Abdelaziz | Data Scientist & BI Analyst Portfolio';
  const defaultDescription = 'Experienced Data Scientist & BI Analyst with 15+ years in transforming complex datasets into actionable business insights. Expert in Python, R, Power BI, AI/ML, and cloud analytics.';
  const defaultKeywords = 'data scientist, business intelligence, data analyst, machine learning, AI, Power BI, Tableau, Python, R, SQL, analytics, big data, data visualization, predictive modeling';
  const defaultAuthor = 'Sameh Shehata Abdelaziz';
  const defaultImage = 'https://samehshi.github.io/portfolio/og-image.png';
  const defaultUrl = 'https://samehshi.github.io/portfolio/';
  const siteName = 'Sameh Shehata Portfolio';

  // Final values with fallbacks
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalAuthor = author || defaultAuthor;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  const finalCanonicalUrl = canonicalUrl || finalUrl;

  // Generate page title with site name
  const pageTitle = title && title !== defaultTitle
    ? `${title} | ${siteName}`
    : finalTitle;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={finalAuthor} />

      {/* Robots Meta Tag */}
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />
      <meta
        name="googlebot"
        content={noIndex
          ? 'noindex, nofollow'
          : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Open Graph Image Details */}
      {finalImage && (
        <>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={`${finalTitle} - Preview Image`} />
        </>
      )}

      {/* Article-specific Open Graph tags */}
      {type === 'article' && (
        <>
          {articlePublishedTime && (
            <meta property="article:published_time" content={articlePublishedTime} />
          )}
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleAuthor && (
            <meta property="article:author" content={articleAuthor} />
          )}
          {articleSection && (
            <meta property="article:section" content={articleSection} />
          )}
          {articleTags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:creator" content="@sameh_shi" />
      <meta name="twitter:site" content="@sameh_shi" />
      {finalImage && (
        <meta name="twitter:image:alt" content={`${finalTitle} - Preview Image`} />
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Sameh Portfolio" />

      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="EG" />
      <meta name="geo.country" content="Egypt" />

      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}

      {/* Additional Link Tags */}
      {additionalLinkTags.map((link, index) => (
        <link key={index} {...link} />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'profile']),
  image: PropTypes.string,
  url: PropTypes.string,
  articlePublishedTime: PropTypes.string,
  articleModifiedTime: PropTypes.string,
  articleAuthor: PropTypes.string,
  articleSection: PropTypes.string,
  articleTags: PropTypes.arrayOf(PropTypes.string),
  noIndex: PropTypes.bool,
  canonicalUrl: PropTypes.string,
  structuredData: PropTypes.object,
  additionalMetaTags: PropTypes.arrayOf(PropTypes.object),
  additionalLinkTags: PropTypes.arrayOf(PropTypes.object),
};

// Predefined SEO configurations for different sections
export const seoConfigs = {
  home: {
    title: 'Sameh Shehata Abdelaziz | Data Scientist & BI Analyst Portfolio',
    description: 'Experienced Data Scientist & BI Analyst with 15+ years in transforming complex datasets into actionable business insights. Expert in Python, R, Power BI, AI/ML, and cloud analytics.',
    keywords: 'data scientist, business intelligence, data analyst, machine learning, AI, Power BI, Tableau, Python, R, SQL, analytics, big data, data visualization, predictive modeling, cloud analytics',
    type: 'website',
  },

  about: {
    title: 'About Sameh Shehata - Data Science Expert',
    description: 'Learn about Sameh Shehata Abdelaziz, a seasoned Data Scientist with 15+ years of experience in business intelligence, machine learning, and advanced analytics across various industries.',
    keywords: 'about sameh shehata, data scientist experience, business intelligence expert, machine learning specialist, analytics professional',
    type: 'profile',
  },

  projects: {
    title: 'Data Science Projects Portfolio',
    description: 'Explore comprehensive data science and business intelligence projects including predictive analytics, machine learning models, dashboard development, and statistical analysis.',
    keywords: 'data science projects, machine learning portfolio, business intelligence dashboards, predictive analytics, statistical modeling, data visualization projects',
    type: 'website',
  },

  skills: {
    title: 'Technical Skills & Expertise',
    description: 'Comprehensive overview of technical skills including Python, R, SQL, Power BI, Tableau, machine learning frameworks, cloud platforms, and business intelligence tools.',
    keywords: 'data science skills, Python programming, R statistics, SQL database, Power BI dashboards, Tableau visualization, machine learning expertise, cloud analytics',
    type: 'website',
  },

  experience: {
    title: 'Professional Experience & Career',
    description: 'Detailed work experience showcasing 15+ years in data science, business intelligence, and analytics roles across diverse industries and organizations.',
    keywords: 'data scientist experience, business intelligence career, analytics professional background, data science work history',
    type: 'website',
  },

  achievements: {
    title: 'Certifications & Achievements',
    description: 'Professional certifications from Google, Microsoft, IBM, and other leading organizations in data science, business intelligence, and cloud analytics.',
    keywords: 'data science certifications, Google Analytics certificate, Microsoft certifications, IBM data science, professional achievements, analytics credentials',
    type: 'website',
  },

  blog: {
    title: 'Data Science Blog & Articles',
    description: 'Insights, tutorials, and thought leadership articles on data science, machine learning, business intelligence, and analytics trends.',
    keywords: 'data science blog, machine learning articles, business intelligence insights, analytics tutorials, data visualization guides',
    type: 'website',
  },

  contact: {
    title: 'Contact Sameh Shehata - Data Science Consultant',
    description: 'Get in touch for data science consulting, business intelligence solutions, analytics projects, or collaboration opportunities.',
    keywords: 'contact data scientist, hire business intelligence expert, data science consulting, analytics collaboration, machine learning consultant',
    type: 'website',
  },
};

export default SEO;
