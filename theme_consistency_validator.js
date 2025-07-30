#!/usr/bin/env node

/**
 * Theme Consistency Validation Tool
 * Validates light/dark theme consistency across the portfolio website
 * Based on CSS custom properties and WCAG contrast requirements
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Theme validation configuration
const THEME_CONFIG = {
  // Minimum contrast ratios for WCAG 2.1 AA compliance
  contrastRatios: {
    normal: 4.5,    // Normal text
    large: 3.0,     // Large text (18pt+ or 14pt+ bold)
    ui: 3.0         // UI components
  },
  
  // CSS custom properties to validate
  requiredProperties: [
    '--global-bg-color',
    '--global-text-color',
    '--global-text-color-light',
    '--global-theme-color',
    '--global-hover-color',
    '--global-footer-bg-color',
    '--global-footer-text-color',
    '--global-distill-app-color',
    '--global-divider-color'
  ],
  
  // Files to analyze for theme consistency
  scssFiles: [
    '_sass/_themes.scss',
    '_sass/_variables.scss',
    '_sass/_base.scss',
    '_sass/_layout.scss',
    '_sass/_cv.scss'
  ],
  
  // HTML files to test (built site)
  testPages: [
    '_site/index.html',
    '_site/cv/index.html',
    '_site/projects/index.html'
  ]
};

/**
 * Parse CSS custom properties from SCSS files
 */
function parseCSSProperties() {
  const properties = {
    light: {},
    dark: {}
  };
  
  THEME_CONFIG.scssFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  SCSS file not found: ${filePath}`);
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract light theme properties
    const lightThemeMatch = content.match(/html\[data-theme=light\]\s*{([^}]+)}/s);
    if (lightThemeMatch) {
      const lightProps = lightThemeMatch[1];
      extractProperties(lightProps, properties.light);
    }
    
    // Extract dark theme properties  
    const darkThemeMatch = content.match(/html\[data-theme=dark\]\s*{([^}]+)}/s);
    if (darkThemeMatch) {
      const darkProps = darkThemeMatch[1];
      extractProperties(darkProps, properties.dark);
    }
    
    // Also check for :root properties
    const rootMatch = content.match(/:root\s*{([^}]+)}/s);
    if (rootMatch) {
      const rootProps = rootMatch[1];
      extractProperties(rootProps, properties.light); // Default to light
    }
  });
  
  return properties;
}

/**
 * Extract CSS custom properties from CSS text
 */
function extractProperties(cssText, propertiesObj) {
  const propertyRegex = /--([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = propertyRegex.exec(cssText)) !== null) {
    const propName = `--${match[1].trim()}`;
    const propValue = match[2].trim();
    propertiesObj[propName] = propValue;
  }
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance for contrast ratio
 */
function getRelativeLuminance(rgb) {
  const { r, g, b } = rgb;
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return null;
  
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validate theme properties completeness
 */
function validateThemeCompleteness(properties) {
  const issues = [];
  
  // Check if all required properties exist in both themes
  THEME_CONFIG.requiredProperties.forEach(prop => {
    if (!properties.light[prop]) {
      issues.push({
        type: 'missing_property',
        theme: 'light',
        property: prop,
        severity: 'high',
        message: `Missing required property ${prop} in light theme`
      });
    }
    
    if (!properties.dark[prop]) {
      issues.push({
        type: 'missing_property',
        theme: 'dark',
        property: prop,
        severity: 'high',
        message: `Missing required property ${prop} in dark theme`
      });
    }
  });
  
  return issues;
}

/**
 * Validate contrast ratios for accessibility
 */
function validateContrastRatios(properties) {
  const issues = [];
  
  // Test key color combinations for both themes
  const colorTests = [
    {
      name: 'Main text on background',
      text: '--global-text-color',
      background: '--global-bg-color',
      minRatio: THEME_CONFIG.contrastRatios.normal
    },
    {
      name: 'Light text on background',
      text: '--global-text-color-light',
      background: '--global-bg-color',
      minRatio: THEME_CONFIG.contrastRatios.normal
    },
    {
      name: 'Footer text on footer background',
      text: '--global-footer-text-color',
      background: '--global-footer-bg-color',
      minRatio: THEME_CONFIG.contrastRatios.normal
    }
  ];
  
  ['light', 'dark'].forEach(theme => {
    colorTests.forEach(test => {
      const textColor = properties[theme][test.text];
      const bgColor = properties[theme][test.background];
      
      if (textColor && bgColor) {
        const ratio = getContrastRatio(textColor, bgColor);
        
        if (ratio && ratio < test.minRatio) {
          issues.push({
            type: 'contrast_ratio',
            theme: theme,
            test: test.name,
            textColor: textColor,
            backgroundColor: bgColor,
            actualRatio: ratio.toFixed(2),
            requiredRatio: test.minRatio,
            severity: ratio < 3.0 ? 'high' : 'medium',
            message: `${test.name} contrast ratio ${ratio.toFixed(2)} is below required ${test.minRatio} in ${theme} theme`
          });
        }
      }
    });
  });
  
  return issues;
}

/**
 * Test theme switching functionality in HTML
 */
async function testThemeSwitching() {
  const issues = [];
  
  for (const htmlFile of THEME_CONFIG.testPages) {
    if (!fs.existsSync(htmlFile)) {
      console.warn(`⚠️  HTML file not found: ${htmlFile}`);
      continue;
    }
    
    try {
      const htmlContent = fs.readFileSync(htmlFile, 'utf8');
      const dom = new JSDOM(htmlContent, {
        url: 'http://localhost:4000',
        pretendToBeVisual: true
      });
      
      const { document } = dom.window;
      
      // Check if theme toggle exists
      const themeToggle = document.querySelector('[data-toggle="tooltip"][title*="theme" i], .theme-toggle, #light-toggle');
      if (!themeToggle) {
        issues.push({
          type: 'missing_theme_toggle',
          file: htmlFile,
          severity: 'medium',
          message: `No theme toggle button found in ${htmlFile}`
        });
      }
      
      // Check if data-theme attribute is properly set
      const htmlElement = document.documentElement;
      const dataTheme = htmlElement.getAttribute('data-theme');
      if (!dataTheme) {
        issues.push({
          type: 'missing_data_theme',
          file: htmlFile,
          severity: 'high',
          message: `Missing data-theme attribute on html element in ${htmlFile}`
        });
      }
      
      // Check for theme-related CSS classes or attributes
      const themeElements = document.querySelectorAll('[class*="theme"], [data-theme]');
      if (themeElements.length === 0) {
        issues.push({
          type: 'no_theme_elements',
          file: htmlFile,
          severity: 'medium',
          message: `No theme-related elements found in ${htmlFile}`
        });
      }
      
    } catch (error) {
      issues.push({
        type: 'html_parse_error',
        file: htmlFile,
        severity: 'high',
        message: `Error parsing ${htmlFile}: ${error.message}`
      });
    }
  }
  
  return issues;
}

/**
 * Generate comprehensive theme validation report
 */
function generateThemeReport(properties, completenessIssues, contrastIssues, switchingIssues) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalIssues: completenessIssues.length + contrastIssues.length + switchingIssues.length,
      highSeverity: 0,
      mediumSeverity: 0,
      lowSeverity: 0,
      themesAnalyzed: ['light', 'dark'],
      propertiesFound: {
        light: Object.keys(properties.light).length,
        dark: Object.keys(properties.dark).length
      }
    },
    properties: properties,
    issues: {
      completeness: completenessIssues,
      contrast: contrastIssues,
      switching: switchingIssues
    },
    recommendations: []
  };
  
  // Calculate severity counts
  const allIssues = [...completenessIssues, ...contrastIssues, ...switchingIssues];
  allIssues.forEach(issue => {
    switch (issue.severity) {
      case 'high': report.summary.highSeverity++; break;
      case 'medium': report.summary.mediumSeverity++; break;
      case 'low': report.summary.lowSeverity++; break;
    }
  });
  
  // Generate recommendations
  if (report.summary.highSeverity > 0) {
    report.recommendations.push('🚨 Address high-severity issues first - these affect basic functionality');
  }
  
  if (contrastIssues.length > 0) {
    report.recommendations.push('🎨 Review color contrast ratios for WCAG 2.1 AA compliance');
  }
  
  if (completenessIssues.length > 0) {
    report.recommendations.push('🔧 Complete missing CSS custom properties for both themes');
  }
  
  if (switchingIssues.length > 0) {
    report.recommendations.push('⚡ Fix theme switching functionality and HTML structure');
  }
  
  return report;
}

/**
 * Main execution function
 */
async function runThemeValidation() {
  console.log('🎨 Starting Theme Consistency Validation...\n');
  
  // Parse CSS properties from SCSS files
  console.log('📄 Parsing CSS custom properties...');
  const properties = parseCSSProperties();
  console.log(`   Light theme: ${Object.keys(properties.light).length} properties`);
  console.log(`   Dark theme: ${Object.keys(properties.dark).length} properties\n`);
  
  // Validate theme completeness
  console.log('🔍 Validating theme completeness...');
  const completenessIssues = validateThemeCompleteness(properties);
  console.log(`   Found ${completenessIssues.length} completeness issues\n`);
  
  // Validate contrast ratios
  console.log('🌈 Validating contrast ratios...');
  const contrastIssues = validateContrastRatios(properties);
  console.log(`   Found ${contrastIssues.length} contrast issues\n`);
  
  // Test theme switching functionality
  console.log('⚡ Testing theme switching functionality...');
  const switchingIssues = await testThemeSwitching();
  console.log(`   Found ${switchingIssues.length} switching issues\n`);
  
  // Generate and save report
  const report = generateThemeReport(properties, completenessIssues, contrastIssues, switchingIssues);
  const reportPath = 'theme_consistency_report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Display summary
  console.log('📊 Theme Validation Summary:');
  console.log(`   Total issues: ${report.summary.totalIssues}`);
  console.log(`   High severity: ${report.summary.highSeverity}`);
  console.log(`   Medium severity: ${report.summary.mediumSeverity}`);
  console.log(`   Low severity: ${report.summary.lowSeverity}`);
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  // Show recommendations
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach(rec => {
      console.log(`   ${rec}`);
    });
  }
  
  return report;
}

// Export for use as module or run directly
if (require.main === module) {
  runThemeValidation().catch(console.error);
}

module.exports = { runThemeValidation, parseCSSProperties, validateContrastRatios };