#!/usr/bin/env node

/**
 * Comprehensive Validation Suite
 * 
 * This tool provides automated testing for:
 * - WCAG 2.1 AA accessibility compliance
 * - Theme consistency across light/dark modes
 * - Content verification and professional standards
 * - Performance and maintenance checks
 * 
 * Based on research from:
 * - W3C Web Accessibility Initiative (WAI)
 * - Deque Systems axe-core accessibility engine
 * - Pa11y automated accessibility testing
 * - BrowserStack accessibility testing best practices
 * - Microsoft Edge DevTools accessibility features
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Import existing validation modules
const { runAccessibilityAudit } = require('./accessibility_audit_tool.js');
const { runThemeValidation } = require('./theme_consistency_validator.js');

// Comprehensive validation configuration
const VALIDATION_CONFIG = {
  // Test suites to run
  suites: {
    accessibility: true,
    themeConsistency: true,
    contentVerification: true,
    performance: true,
    maintenance: true
  },
  
  // Accessibility testing configuration (based on axe-core and Pa11y research)
  accessibility: {
    // WCAG 2.1 AA compliance rules
    wcagLevel: 'AA',
    wcagVersion: '2.1',
    rules: {
      // Color and contrast
      'color-contrast': { enabled: true, level: 'AA' },
      'color-contrast-enhanced': { enabled: false, level: 'AAA' },
      
      // Keyboard navigation
      'focus-order-semantics': { enabled: true },
      'tabindex': { enabled: true },
      'accesskeys': { enabled: true },
      
      // Structure and semantics
      'landmark-one-main': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true },
      'skip-link': { enabled: true },
      'heading-order': { enabled: true },
      
      // ARIA and labels
      'aria-allowed-attr': { enabled: true },
      'aria-required-attr': { enabled: true },
      'aria-valid-attr-value': { enabled: true },
      'aria-valid-attr': { enabled: true },
      'button-name': { enabled: true },
      'form-field-multiple-labels': { enabled: true },
      'label': { enabled: true },
      'link-name': { enabled: true },
      
      // Images and media
      'image-alt': { enabled: true },
      'input-image-alt': { enabled: true },
      'frame-title': { enabled: true },
      
      // Language and internationalization
      'html-has-lang': { enabled: true },
      'html-lang-valid': { enabled: true }
    },
    
    // Test tags for comprehensive coverage
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
    
    // Minimum contrast ratios
    contrastRatios: {
      normal: 4.5,    // Normal text (WCAG AA)
      large: 3.0,     // Large text (WCAG AA)
      enhanced: 7.0,  // Enhanced contrast (WCAG AAA)
      ui: 3.0         // UI components
    }
  },
  
  // Theme consistency validation (based on CSS custom properties research)
  themeConsistency: {
    // Required CSS custom properties for both themes
    requiredProperties: [
      // Surface colors
      '--surface-primary',
      '--surface-secondary', 
      '--surface-elevated',
      '--surface-overlay',
      
      // Text colors
      '--text-primary',
      '--text-secondary',
      '--text-tertiary',
      '--text-inverse',
      
      // Interactive colors
      '--interactive-primary',
      '--interactive-primary-hover',
      '--interactive-primary-active',
      '--interactive-secondary',
      '--interactive-secondary-hover',
      
      // Border and divider colors
      '--border-primary',
      '--border-secondary',
      '--divider',
      
      // Status colors
      '--status-success',
      '--status-warning',
      '--status-error',
      '--status-info',
      
      // Legacy compatibility
      '--global-bg-color',
      '--global-text-color',
      '--global-theme-color'
    ],
    
    // Theme switching tests
    switchingTests: [
      'data-theme attribute presence',
      'theme toggle functionality',
      'CSS custom property inheritance',
      'prefers-color-scheme media query support',
      'theme transition animations'
    ],
    
    // Files to analyze
    scssFiles: [
      '_sass/_themes.scss',
      '_sass/_variables.scss',
      '_sass/_base.scss',
      '_sass/_layout.scss',
      '_sass/_cv.scss'
    ]
  },
  
  // Content verification (based on professional standards research)
  contentVerification: {
    // Pages to verify
    pages: [
      '_pages/about.md',
      '_data/cv.yml'
    ],
    
    // Patterns that indicate unverifiable claims
    problematicPatterns: [
      /\d+%\s*(increase|improvement|growth)/i,
      /saved\s*\$[\d,]+/i,
      /reduced.*by\s*\d+/i,
      /increased.*by\s*\d+/i,
      /proprietary|confidential|internal/i,
      /specific client|client name/i
    ],
    
    // Professional tone indicators
    professionalIndicators: [
      /experience with|skilled in|proficient in/i,
      /contributed to|participated in|involved in/i,
      /developed|created|implemented|designed/i,
      /analyzed|evaluated|assessed|reviewed/i
    ]
  },
  
  // Performance checks
  performance: {
    // File size limits (in KB)
    fileSizeLimits: {
      css: 100,
      js: 200,
      images: 500
    },
    
    // Asset optimization checks
    optimizationChecks: [
      'CSS minification',
      'JavaScript minification',
      'Image compression',
      'WebP format usage',
      'Unused CSS removal'
    ]
  },
  
  // Maintenance guidelines
  maintenance: {
    // Required documentation files
    requiredDocs: [
      'README.md',
      'THEME_AUDIT_INFRASTRUCTURE.md'
    ],
    
    // Git hooks and CI/CD integration
    automationChecks: [
      'Pre-commit hooks',
      'GitHub Actions workflow',
      'Automated testing',
      'Dependency updates'
    ]
  }
};

/**
 * Content Verification Suite
 * Analyzes content for verifiable claims and professional tone
 */
class ContentVerificationSuite {
  constructor() {
    this.issues = [];
  }
  
  async verifyContent() {
    console.log('📝 Running Content Verification...');
    
    for (const pagePath of VALIDATION_CONFIG.contentVerification.pages) {
      if (fs.existsSync(pagePath)) {
        await this.analyzePage(pagePath);
      } else {
        this.issues.push({
          type: 'missing_file',
          file: pagePath,
          severity: 'medium',
          message: `Content file not found: ${pagePath}`
        });
      }
    }
    
    return {
      issues: this.issues,
      summary: {
        totalIssues: this.issues.length,
        highSeverity: this.issues.filter(i => i.severity === 'high').length,
        mediumSeverity: this.issues.filter(i => i.severity === 'medium').length,
        lowSeverity: this.issues.filter(i => i.severity === 'low').length
      }
    };
  }
  
  async analyzePage(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for problematic patterns
      VALIDATION_CONFIG.contentVerification.problematicPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          this.issues.push({
            type: 'unverifiable_claim',
            file: filePath,
            pattern: pattern.toString(),
            match: matches[0],
            severity: 'high',
            message: `Potentially unverifiable claim found: "${matches[0]}"`
          });
        }
      });
      
      // Check for professional tone
      const professionalMatches = VALIDATION_CONFIG.contentVerification.professionalIndicators
        .filter(pattern => content.match(pattern)).length;
      
      const totalPatterns = VALIDATION_CONFIG.contentVerification.professionalIndicators.length;
      const professionalScore = professionalMatches / totalPatterns;
      
      if (professionalScore < 0.3) {
        this.issues.push({
          type: 'professional_tone',
          file: filePath,
          score: professionalScore,
          severity: 'medium',
          message: `Low professional tone score: ${(professionalScore * 100).toFixed(1)}%`
        });
      }
      
    } catch (error) {
      this.issues.push({
        type: 'content_analysis_error',
        file: filePath,
        error: error.message,
        severity: 'high',
        message: `Error analyzing content: ${error.message}`
      });
    }
  }
}

/**
 * Performance Validation Suite
 * Checks file sizes, optimization, and performance metrics
 */
class PerformanceValidationSuite {
  constructor() {
    this.issues = [];
  }
  
  async validatePerformance() {
    console.log('⚡ Running Performance Validation...');
    
    // Check CSS file sizes
    await this.checkAssetSizes('assets/css', 'css', VALIDATION_CONFIG.performance.fileSizeLimits.css);
    
    // Check JavaScript file sizes
    await this.checkAssetSizes('assets/js', 'js', VALIDATION_CONFIG.performance.fileSizeLimits.js);
    
    // Check image optimization
    await this.checkImageOptimization();
    
    return {
      issues: this.issues,
      summary: {
        totalIssues: this.issues.length,
        highSeverity: this.issues.filter(i => i.severity === 'high').length,
        mediumSeverity: this.issues.filter(i => i.severity === 'medium').length,
        lowSeverity: this.issues.filter(i => i.severity === 'low').length
      }
    };
  }
  
  async checkAssetSizes(directory, fileType, sizeLimit) {
    if (!fs.existsSync(directory)) return;
    
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      if (file.endsWith(`.${fileType}`)) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        const sizeKB = stats.size / 1024;
        
        if (sizeKB > sizeLimit) {
          this.issues.push({
            type: 'file_size_exceeded',
            file: filePath,
            actualSize: `${sizeKB.toFixed(1)}KB`,
            limit: `${sizeLimit}KB`,
            severity: sizeKB > sizeLimit * 2 ? 'high' : 'medium',
            message: `File size ${sizeKB.toFixed(1)}KB exceeds limit of ${sizeLimit}KB`
          });
        }
      }
    });
  }
  
  async checkImageOptimization() {
    const imageDir = 'assets/img';
    if (!fs.existsSync(imageDir)) return;
    
    const images = fs.readdirSync(imageDir, { recursive: true })
      .filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));
    
    // Check for WebP versions
    const webpImages = images.filter(img => img.endsWith('.webp'));
    const nonWebpImages = images.filter(img => !img.endsWith('.webp') && !/\.(svg)$/i.test(img));
    
    if (webpImages.length === 0 && nonWebpImages.length > 0) {
      this.issues.push({
        type: 'missing_webp_optimization',
        severity: 'medium',
        message: 'No WebP images found - consider adding WebP versions for better performance'
      });
    }
    
    // Check for large images
    images.forEach(image => {
      const imagePath = path.join(imageDir, image);
      if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        const sizeKB = stats.size / 1024;
        
        if (sizeKB > VALIDATION_CONFIG.performance.fileSizeLimits.images) {
          this.issues.push({
            type: 'large_image',
            file: imagePath,
            actualSize: `${sizeKB.toFixed(1)}KB`,
            limit: `${VALIDATION_CONFIG.performance.fileSizeLimits.images}KB`,
            severity: 'medium',
            message: `Image size ${sizeKB.toFixed(1)}KB exceeds recommended limit`
          });
        }
      }
    });
  }
}

/**
 * Maintenance Guidelines Suite
 * Validates project maintenance and documentation
 */
class MaintenanceValidationSuite {
  constructor() {
    this.issues = [];
  }
  
  async validateMaintenance() {
    console.log('🔧 Running Maintenance Validation...');
    
    // Check required documentation
    VALIDATION_CONFIG.maintenance.requiredDocs.forEach(doc => {
      if (!fs.existsSync(doc)) {
        this.issues.push({
          type: 'missing_documentation',
          file: doc,
          severity: 'medium',
          message: `Required documentation file missing: ${doc}`
        });
      }
    });
    
    // Check for automation setup
    await this.checkAutomationSetup();
    
    // Check dependency management
    await this.checkDependencyManagement();
    
    return {
      issues: this.issues,
      summary: {
        totalIssues: this.issues.length,
        highSeverity: this.issues.filter(i => i.severity === 'high').length,
        mediumSeverity: this.issues.filter(i => i.severity === 'medium').length,
        lowSeverity: this.issues.filter(i => i.severity === 'low').length
      }
    };
  }
  
  async checkAutomationSetup() {
    // Check for GitHub Actions
    const githubActionsDir = '.github/workflows';
    if (!fs.existsSync(githubActionsDir)) {
      this.issues.push({
        type: 'missing_ci_cd',
        severity: 'medium',
        message: 'No GitHub Actions workflows found - consider adding CI/CD automation'
      });
    }
    
    // Check for pre-commit hooks
    const preCommitConfig = '.pre-commit-config.yaml';
    if (!fs.existsSync(preCommitConfig)) {
      this.issues.push({
        type: 'missing_pre_commit',
        severity: 'low',
        message: 'No pre-commit configuration found - consider adding pre-commit hooks'
      });
    }
  }
  
  async checkDependencyManagement() {
    // Check package.json for outdated dependencies
    if (fs.existsSync('package.json')) {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      if (!packageJson.scripts || !packageJson.scripts.test) {
        this.issues.push({
          type: 'missing_test_script',
          severity: 'medium',
          message: 'No test script found in package.json'
        });
      }
    }
    
    // Check Gemfile for Ruby dependencies
    if (fs.existsSync('Gemfile')) {
      const gemfile = fs.readFileSync('Gemfile', 'utf8');
      
      if (!gemfile.includes('jekyll')) {
        this.issues.push({
          type: 'missing_jekyll_dependency',
          severity: 'high',
          message: 'Jekyll dependency not found in Gemfile'
        });
      }
    }
  }
}

/**
 * Main Comprehensive Validation Runner
 */
class ComprehensiveValidationSuite {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: 0,
        highSeverity: 0,
        mediumSeverity: 0,
        lowSeverity: 0,
        suitesRun: []
      },
      suiteResults: {},
      recommendations: []
    };
  }
  
  async runAllValidations() {
    console.log('🚀 Starting Comprehensive Validation Suite...\n');
    
    try {
      // Run accessibility validation
      if (VALIDATION_CONFIG.suites.accessibility) {
        console.log('1️⃣ Accessibility Validation');
        this.results.suiteResults.accessibility = await runAccessibilityAudit();
        this.results.summary.suitesRun.push('accessibility');
      }
      
      // Run theme consistency validation
      if (VALIDATION_CONFIG.suites.themeConsistency) {
        console.log('\n2️⃣ Theme Consistency Validation');
        this.results.suiteResults.themeConsistency = await runThemeValidation();
        this.results.summary.suitesRun.push('themeConsistency');
      }
      
      // Run content verification
      if (VALIDATION_CONFIG.suites.contentVerification) {
        console.log('\n3️⃣ Content Verification');
        const contentSuite = new ContentVerificationSuite();
        this.results.suiteResults.contentVerification = await contentSuite.verifyContent();
        this.results.summary.suitesRun.push('contentVerification');
      }
      
      // Run performance validation
      if (VALIDATION_CONFIG.suites.performance) {
        console.log('\n4️⃣ Performance Validation');
        const performanceSuite = new PerformanceValidationSuite();
        this.results.suiteResults.performance = await performanceSuite.validatePerformance();
        this.results.summary.suitesRun.push('performance');
      }
      
      // Run maintenance validation
      if (VALIDATION_CONFIG.suites.maintenance) {
        console.log('\n5️⃣ Maintenance Validation');
        const maintenanceSuite = new MaintenanceValidationSuite();
        this.results.suiteResults.maintenance = await maintenanceSuite.validateMaintenance();
        this.results.summary.suitesRun.push('maintenance');
      }
      
      // Calculate overall summary
      this.calculateOverallSummary();
      
      // Generate recommendations
      this.generateRecommendations();
      
      // Save comprehensive report
      const reportPath = 'comprehensive_validation_report.json';
      fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
      
      // Display final summary
      this.displaySummary(reportPath);
      
      return this.results;
      
    } catch (error) {
      console.error('❌ Error running comprehensive validation:', error);
      throw error;
    }
  }
  
  calculateOverallSummary() {
    Object.values(this.results.suiteResults).forEach(suiteResult => {
      if (suiteResult.summary) {
        this.results.summary.totalIssues += suiteResult.summary.totalIssues || 0;
        this.results.summary.highSeverity += suiteResult.summary.highSeverity || 0;
        this.results.summary.mediumSeverity += suiteResult.summary.mediumSeverity || 0;
        this.results.summary.lowSeverity += suiteResult.summary.lowSeverity || 0;
      }
    });
  }
  
  generateRecommendations() {
    const recommendations = [];
    
    // Priority-based recommendations
    if (this.results.summary.highSeverity > 0) {
      recommendations.push({
        priority: 'critical',
        message: `🚨 ${this.results.summary.highSeverity} critical issues require immediate attention`,
        action: 'Address high-severity accessibility and functionality issues first'
      });
    }
    
    // Accessibility recommendations
    const accessibilityIssues = this.results.suiteResults.accessibility?.summary?.totalViolations || 0;
    if (accessibilityIssues > 0) {
      recommendations.push({
        priority: 'high',
        message: `♿ ${accessibilityIssues} accessibility violations found`,
        action: 'Review WCAG 2.1 AA compliance and fix contrast/navigation issues'
      });
    }
    
    // Theme consistency recommendations
    const themeIssues = this.results.suiteResults.themeConsistency?.summary?.totalIssues || 0;
    if (themeIssues > 0) {
      recommendations.push({
        priority: 'medium',
        message: `🎨 ${themeIssues} theme consistency issues found`,
        action: 'Complete CSS custom properties and fix theme switching functionality'
      });
    }
    
    // Content verification recommendations
    const contentIssues = this.results.suiteResults.contentVerification?.summary?.totalIssues || 0;
    if (contentIssues > 0) {
      recommendations.push({
        priority: 'medium',
        message: `📝 ${contentIssues} content verification issues found`,
        action: 'Review and revise unverifiable claims with professional alternatives'
      });
    }
    
    // Performance recommendations
    const performanceIssues = this.results.suiteResults.performance?.summary?.totalIssues || 0;
    if (performanceIssues > 0) {
      recommendations.push({
        priority: 'low',
        message: `⚡ ${performanceIssues} performance optimization opportunities`,
        action: 'Optimize images, minify assets, and implement WebP format'
      });
    }
    
    // Maintenance recommendations
    const maintenanceIssues = this.results.suiteResults.maintenance?.summary?.totalIssues || 0;
    if (maintenanceIssues > 0) {
      recommendations.push({
        priority: 'low',
        message: `🔧 ${maintenanceIssues} maintenance improvements needed`,
        action: 'Set up CI/CD automation and improve documentation'
      });
    }
    
    this.results.recommendations = recommendations;
  }
  
  displaySummary(reportPath) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE VALIDATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`   Suites run: ${this.results.summary.suitesRun.join(', ')}`);
    console.log(`   Total issues: ${this.results.summary.totalIssues}`);
    console.log(`   🚨 Critical: ${this.results.summary.highSeverity}`);
    console.log(`   ⚠️  Medium: ${this.results.summary.mediumSeverity}`);
    console.log(`   ℹ️  Low: ${this.results.summary.lowSeverity}`);
    console.log(`\n📄 Detailed report: ${reportPath}`);
    
    if (this.results.recommendations.length > 0) {
      console.log('\n💡 TOP RECOMMENDATIONS:');
      this.results.recommendations.slice(0, 3).forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec.message}`);
        console.log(`      → ${rec.action}`);
      });
    }
    
    console.log('\n✅ Validation complete!');
  }
}

// Export for use as module or run directly
if (require.main === module) {
  const suite = new ComprehensiveValidationSuite();
  suite.runAllValidations().catch(console.error);
}

module.exports = { 
  ComprehensiveValidationSuite,
  ContentVerificationSuite,
  PerformanceValidationSuite,
  MaintenanceValidationSuite,
  VALIDATION_CONFIG
};