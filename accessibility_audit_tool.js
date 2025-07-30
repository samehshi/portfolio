#!/usr/bin/env node

/**
 * Automated Accessibility Testing Tool
 * Uses axe-core library to test WCAG 2.1 AA compliance
 * Based on research from W3C WAI and Deque Systems
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration for accessibility testing
const ACCESSIBILITY_CONFIG = {
  // WCAG 2.1 AA compliance rules
  rules: {
    'color-contrast': { enabled: true },
    'color-contrast-enhanced': { enabled: false }, // AAA level
    'focus-order-semantics': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
    'skip-link': { enabled: true },
    'aria-allowed-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'button-name': { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'frame-title': { enabled: true },
    'html-has-lang': { enabled: true },
    'html-lang-valid': { enabled: true },
    'image-alt': { enabled: true },
    'input-image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true }
  },
  // Test only specific tags relevant to theme consistency
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  // Include/exclude specific elements
  include: [['html']],
  exclude: []
};

/**
 * Load and parse HTML files for testing
 */
function loadHTMLFiles() {
  const htmlFiles = [];
  const siteDir = '_site';
  
  if (!fs.existsSync(siteDir)) {
    console.warn('⚠️  _site directory not found. Run `bundle exec jekyll build` first.');
    return [];
  }
  
  // Recursively find HTML files
  function findHTMLFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findHTMLFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    });
  }
  
  findHTMLFiles(siteDir);
  return htmlFiles;
}

/**
 * Test accessibility for a single HTML file
 */
async function testHTMLFile(filePath) {
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(htmlContent, {
      url: 'http://localhost:4000',
      pretendToBeVisual: true,
      resources: 'usable'
    });
    
    const { window } = dom;
    global.window = window;
    global.document = window.document;
    
    // Load axe-core dynamically
    const axe = require('axe-core');
    
    // Configure axe for our specific needs (skip configuration for now)
    
    // Run accessibility tests
    const results = await axe.run(window.document, {
      tags: ACCESSIBILITY_CONFIG.tags
    });
    
    return {
      file: filePath,
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable
    };
    
  } catch (error) {
    console.error(`❌ Error testing ${filePath}:`, error.message);
    return {
      file: filePath,
      error: error.message,
      violations: [],
      passes: [],
      incomplete: [],
      inapplicable: []
    };
  }
}

/**
 * Generate accessibility report
 */
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: results.length,
      totalViolations: 0,
      totalPasses: 0,
      totalIncomplete: 0,
      filesWithErrors: 0
    },
    details: results,
    recommendations: []
  };
  
  // Calculate summary statistics
  results.forEach(result => {
    if (result.error) {
      report.summary.filesWithErrors++;
    } else {
      report.summary.totalViolations += result.violations.length;
      report.summary.totalPasses += result.passes.length;
      report.summary.totalIncomplete += result.incomplete.length;
    }
  });
  
  // Generate recommendations based on common violations
  const violationTypes = {};
  results.forEach(result => {
    result.violations.forEach(violation => {
      violationTypes[violation.id] = (violationTypes[violation.id] || 0) + 1;
    });
  });
  
  // Add recommendations for most common violations
  Object.entries(violationTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .forEach(([ruleId, count]) => {
      report.recommendations.push({
        rule: ruleId,
        occurrences: count,
        priority: count > 5 ? 'high' : count > 2 ? 'medium' : 'low'
      });
    });
  
  return report;
}

/**
 * Main execution function
 */
async function runAccessibilityAudit() {
  console.log('🔍 Starting Accessibility Audit...\n');
  
  // Load HTML files
  const htmlFiles = loadHTMLFiles();
  
  if (htmlFiles.length === 0) {
    console.log('❌ No HTML files found to test.');
    return;
  }
  
  console.log(`📄 Found ${htmlFiles.length} HTML files to test\n`);
  
  // Test each file
  const results = [];
  for (const file of htmlFiles.slice(0, 10)) { // Limit to first 10 files for performance
    console.log(`Testing: ${file}`);
    const result = await testHTMLFile(file);
    results.push(result);
    
    // Show immediate feedback
    if (result.error) {
      console.log(`  ❌ Error: ${result.error}`);
    } else {
      console.log(`  ✅ ${result.passes.length} passes, ⚠️  ${result.violations.length} violations, 🔍 ${result.incomplete.length} incomplete`);
    }
  }
  
  // Generate and save report
  const report = generateReport(results);
  const reportPath = 'accessibility_audit_report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Display summary
  console.log('\n📊 Accessibility Audit Summary:');
  console.log(`   Files tested: ${report.summary.totalFiles}`);
  console.log(`   Total violations: ${report.summary.totalViolations}`);
  console.log(`   Total passes: ${report.summary.totalPasses}`);
  console.log(`   Files with errors: ${report.summary.filesWithErrors}`);
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  // Show top recommendations
  if (report.recommendations.length > 0) {
    console.log('\n🎯 Top Recommendations:');
    report.recommendations.forEach(rec => {
      console.log(`   ${rec.priority.toUpperCase()}: Fix "${rec.rule}" (${rec.occurrences} occurrences)`);
    });
  }
  
  return report;
}

// Export for use as module or run directly
if (require.main === module) {
  runAccessibilityAudit().catch(console.error);
}

module.exports = { runAccessibilityAudit, testHTMLFile, generateReport };