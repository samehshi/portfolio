#!/usr/bin/env node

/**
 * SEO Validation Script for Sameh Shehata Portfolio
 * This script validates the SEO implementation and GA4 configuration
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Helper functions
const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bold}${colors.blue}=== ${msg} ===${colors.reset}`)
};

// Validation functions
function validateFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(`${description} exists`);
    return true;
  } else {
    log.error(`${description} missing`);
    return false;
  }
}

function validateIndexHTML() {
  log.header('Validating index.html');

  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (!validateFile(indexPath, 'index.html')) return false;

  const content = fs.readFileSync(indexPath, 'utf8');

  // Check GA4 implementation
  if (content.includes('G-09NVE6K239')) {
    log.success('GA4 measurement ID found');
  } else {
    log.error('GA4 measurement ID not found');
  }

  // Check gtag implementation
  if (content.includes('gtag("config"')) {
    log.success('GA4 gtag configuration found');
  } else {
    log.error('GA4 gtag configuration missing');
  }

  // Check meta tags
  const requiredMetas = [
    'name="description"',
    'name="keywords"',
    'name="author"',
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    'name="twitter:card"'
  ];

  requiredMetas.forEach(meta => {
    if (content.includes(meta)) {
      log.success(`Meta tag found: ${meta}`);
    } else {
      log.error(`Meta tag missing: ${meta}`);
    }
  });

  // Check structured data
  if (content.includes('application/ld+json')) {
    log.success('Structured data (JSON-LD) found');
  } else {
    log.error('Structured data missing');
  }

  // Check preconnect hints
  if (content.includes('rel="preconnect"')) {
    log.success('Preconnect hints found');
  } else {
    log.warning('Preconnect hints missing');
  }

  return true;
}

function validateSEOFiles() {
  log.header('Validating SEO Files');

  const files = [
    { path: 'public/robots.txt', name: 'robots.txt' },
    { path: 'public/sitemap.xml', name: 'sitemap.xml' },
    { path: 'public/manifest.json', name: 'Web App Manifest' },
    { path: 'src/components/SEO/SEO.js', name: 'SEO Component' },
    { path: 'src/utils/analytics.js', name: 'Analytics Utility' }
  ];

  files.forEach(file => {
    validateFile(path.join(__dirname, file.path), file.name);
  });
}

function validateRobotsTxt() {
  log.header('Validating robots.txt');

  const robotsPath = path.join(__dirname, 'public', 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    log.error('robots.txt not found');
    return;
  }

  const content = fs.readFileSync(robotsPath, 'utf8');

  if (content.includes('User-agent: *')) {
    log.success('User-agent directive found');
  } else {
    log.error('User-agent directive missing');
  }

  if (content.includes('Sitemap:')) {
    log.success('Sitemap reference found');
  } else {
    log.error('Sitemap reference missing');
  }

  if (content.includes('Allow: /')) {
    log.success('Allow directive found');
  } else {
    log.warning('Allow directive missing');
  }
}

function validateSitemap() {
  log.header('Validating sitemap.xml');

  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    log.error('sitemap.xml not found');
    return;
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');

  if (content.includes('<?xml version="1.0"')) {
    log.success('XML declaration found');
  } else {
    log.error('XML declaration missing');
  }

  if (content.includes('<urlset xmlns=')) {
    log.success('URL set declaration found');
  } else {
    log.error('URL set declaration missing');
  }

  const urlCount = (content.match(/<url>/g) || []).length;
  log.info(`Found ${urlCount} URLs in sitemap`);

  if (urlCount > 0) {
    log.success('Sitemap contains URLs');
  } else {
    log.error('Sitemap is empty');
  }
}

function validateManifest() {
  log.header('Validating Web App Manifest');

  const manifestPath = path.join(__dirname, 'public', 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    log.error('manifest.json not found');
    return;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'theme_color', 'background_color', 'icons'];

    requiredFields.forEach(field => {
      if (manifest[field]) {
        log.success(`Manifest field found: ${field}`);
      } else {
        log.error(`Manifest field missing: ${field}`);
      }
    });

    if (manifest.icons && manifest.icons.length > 0) {
      log.success(`Found ${manifest.icons.length} icon(s) in manifest`);
    } else {
      log.error('No icons found in manifest');
    }

    if (manifest.shortcuts && manifest.shortcuts.length > 0) {
      log.success(`Found ${manifest.shortcuts.length} shortcut(s) in manifest`);
    } else {
      log.warning('No shortcuts found in manifest');
    }

  } catch (error) {
    log.error(`Invalid JSON in manifest.json: ${error.message}`);
  }
}

function validateEnvConfig() {
  log.header('Validating Environment Configuration');

  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    log.warning('.env file not found - using defaults');
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');

  if (content.includes('REACT_APP_GA4_MEASUREMENT_ID')) {
    if (content.includes('G-09NVE6K239')) {
      log.success('GA4 measurement ID configured');
    } else if (content.includes('G-XXXXXXXXXX')) {
      log.warning('GA4 measurement ID placeholder found - update with real ID');
    } else {
      log.error('GA4 measurement ID format invalid');
    }
  } else {
    log.error('GA4 measurement ID not configured');
  }

  const envVars = [
    'REACT_APP_GITHUB_TOKEN',
    'GITHUB_USERNAME',
    'MEDIUM_USERNAME'
  ];

  envVars.forEach(envVar => {
    if (content.includes(envVar)) {
      if (content.includes(`${envVar} = "YOUR`)) {
        log.warning(`${envVar} needs to be configured`);
      } else {
        log.success(`${envVar} is configured`);
      }
    } else {
      log.error(`${envVar} not found in .env`);
    }
  });
}

function validateAnalyticsImplementation() {
  log.header('Validating Analytics Implementation');

  const analyticsPath = path.join(__dirname, 'src', 'utils', 'analytics.js');
  if (!fs.existsSync(analyticsPath)) {
    log.error('Analytics utility not found');
    return;
  }

  const content = fs.readFileSync(analyticsPath, 'utf8');

  const requiredFunctions = [
    'initializeGA',
    'trackPageView',
    'trackEvent',
    'portfolioEvents'
  ];

  requiredFunctions.forEach(func => {
    if (content.includes(func)) {
      log.success(`Analytics function found: ${func}`);
    } else {
      log.error(`Analytics function missing: ${func}`);
    }
  });

  const eventTypes = [
    'viewSection',
    'viewProject',
    'clickSocialLink',
    'downloadResume',
    'toggleTheme'
  ];

  eventTypes.forEach(eventType => {
    if (content.includes(eventType)) {
      log.success(`Event tracking found: ${eventType}`);
    } else {
      log.error(`Event tracking missing: ${eventType}`);
    }
  });
}

function validateBuildOutput() {
  log.header('Validating Build Output');

  const buildPath = path.join(__dirname, 'build');
  if (!fs.existsSync(buildPath)) {
    log.warning('Build directory not found - run "npm run build" first');
    return;
  }

  const buildIndexPath = path.join(buildPath, 'index.html');
  if (!fs.existsSync(buildIndexPath)) {
    log.error('Built index.html not found');
    return;
  }

  const content = fs.readFileSync(buildIndexPath, 'utf8');

  if (content.includes('G-09NVE6K239')) {
    log.success('GA4 ID present in built files');
  } else {
    log.error('GA4 ID missing from built files');
  }

  if (content.includes('gtag(')) {
    log.success('GA4 tracking code present in built files');
  } else {
    log.error('GA4 tracking code missing from built files');
  }

  // Check if files are minified
  if (content.includes('\n') && content.length > 1000) {
    log.warning('Built HTML appears to not be minified');
  } else {
    log.success('Built HTML appears to be minified');
  }
}

function generateSEOReport() {
  log.header('SEO Implementation Report');

  console.log(`\n${colors.bold}Current Configuration:${colors.reset}`);
  console.log(`• GA4 Measurement ID: G-09NVE6K239`);
  console.log(`• Site URL: https://samehshi.github.io/portfolio/`);
  console.log(`• Twitter Handle: @sameh_shi`);

  console.log(`\n${colors.bold}Recommendations:${colors.reset}`);
  console.log(`• Create a professional 1200x630 social sharing image`);
  console.log(`• Configure GitHub token for dynamic project data`);
  console.log(`• Set up Medium username for blog integration`);
  console.log(`• Test GA4 tracking in production environment`);
  console.log(`• Validate structured data with Google's Rich Results Test`);
  console.log(`• Submit sitemap to Google Search Console`);

  console.log(`\n${colors.bold}Testing URLs:${colors.reset}`);
  console.log(`• Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/`);
  console.log(`• Twitter Card Validator: https://cards-dev.twitter.com/validator`);
  console.log(`• Google Rich Results Test: https://search.google.com/test/rich-results`);
  console.log(`• Google PageSpeed Insights: https://pagespeed.web.dev/`);
}

// Main execution
function main() {
  console.log(`${colors.bold}${colors.blue}SEO & Analytics Validation Tool${colors.reset}`);
  console.log(`${colors.blue}Portfolio: Sameh Shehata Abdelaziz${colors.reset}\n`);

  try {
    validateIndexHTML();
    validateSEOFiles();
    validateRobotsTxt();
    validateSitemap();
    validateManifest();
    validateEnvConfig();
    validateAnalyticsImplementation();
    validateBuildOutput();
    generateSEOReport();

    console.log(`\n${colors.green}${colors.bold}Validation Complete!${colors.reset}`);
    console.log(`Run this script after any SEO changes to verify implementation.\n`);

  } catch (error) {
    log.error(`Validation failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  validateIndexHTML,
  validateSEOFiles,
  validateRobotsTxt,
  validateSitemap,
  validateManifest,
  validateEnvConfig,
  validateAnalyticsImplementation,
  validateBuildOutput
};
