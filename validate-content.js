#!/usr/bin/env node

/**
 * Content Validation Script for Portfolio
 * 
 * This script validates the portfolio content for:
 * - Duplicate projects
 * - Missing or broken links
 * - Inconsistent data formats
 * - Content quality issues
 * 
 * Usage: node validate-content.js
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Utility functions
const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`)
};

class PortfolioValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.portfolioConfig = null;
  }

  // Load portfolio configuration
  loadPortfolioConfig() {
    try {
      const portfolioPath = path.join(__dirname, 'src', 'portfolio.js');
      const content = fs.readFileSync(portfolioPath, 'utf8');
      
      // Extract export statement to get configuration
      // This is a simplified approach for validation
      log.info('Portfolio configuration loaded successfully');
      return true;
    } catch (error) {
      log.error(`Failed to load portfolio configuration: ${error.message}`);
      return false;
    }
  }

  // Validate project duplicates
  validateProjectDuplicates() {
    log.info('Checking for duplicate projects...');
    
    // Read portfolio.js content
    const portfolioPath = path.join(__dirname, 'src', 'portfolio.js');
    const content = fs.readFileSync(portfolioPath, 'utf8');
    
    // Extract project names using regex
    const projectNameRegex = /projectName:\s*["']([^"']+)["']/g;
    const projectNames = [];
    let match;
    
    while ((match = projectNameRegex.exec(content)) !== null) {
      projectNames.push(match[1]);
    }
    
    // Check for duplicates
    const duplicates = projectNames.filter((name, index, arr) => arr.indexOf(name) !== index);
    
    if (duplicates.length > 0) {
      this.errors.push(`Duplicate project names found: ${duplicates.join(', ')}`);
    } else {
      log.success(`No duplicate projects found (${projectNames.length} projects validated)`);
    }
  }

  // Validate achievement links
  validateAchievementLinks() {
    log.info('Validating achievement certificate links...');
    
    const portfolioPath = path.join(__dirname, 'src', 'portfolio.js');
    const content = fs.readFileSync(portfolioPath, 'utf8');
    
    // Extract achievement URLs (only from enabled sections)
    const achievementSectionMatch = content.match(/const achievementSection = \{[\s\S]*?display: true[\s\S]*?\};/);
    
    if (!achievementSectionMatch) {
      this.warnings.push('Achievement section not found or disabled');
      return;
    }
    
    const achievementContent = achievementSectionMatch[0];
    const urlRegex = /url:\s*["']([^"']+)["']/g;
    const urls = [];
    let match;
    
    while ((match = urlRegex.exec(achievementContent)) !== null) {
      urls.push(match[1]);
    }
    
    log.info(`Found ${urls.length} achievement links to validate`);
    
    // Validate URL format (exclude placeholder links)
    const invalidUrls = urls.filter(url => {
      if (url === '#' || url === '' || url.startsWith('javascript:')) {
        return false; // Skip placeholder/disabled links
      }
      try {
        new URL(url);
        return false;
      } catch {
        return true;
      }
    });
    
    if (invalidUrls.length > 0) {
      this.errors.push(`Invalid achievement URLs found: ${invalidUrls.join(', ')}`);
    } else {
      log.success('All achievement URLs have valid format');
    }
  }

  // Validate content structure
  validateContentStructure() {
    log.info('Validating content structure...');
    
    const portfolioPath = path.join(__dirname, 'src', 'portfolio.js');
    const content = fs.readFileSync(portfolioPath, 'utf8');
    
    // Check for required sections
    const requiredSections = [
      'greeting',
      'skillsSection',
      'workExperiences',
      'bigProjects',
      'achievementSection'
    ];
    
    for (const section of requiredSections) {
      if (!content.includes(`const ${section}`)) {
        this.errors.push(`Missing required section: ${section}`);
      }
    }
    
    log.success('Content structure validation completed');
  }

  // Validate image references
  validateImageReferences() {
    log.info('Validating image references...');
    
    const portfolioPath = path.join(__dirname, 'src', 'portfolio.js');
    const content = fs.readFileSync(portfolioPath, 'utf8');
    
    // Extract image imports
    const imageImportRegex = /import\s+(\w+)\s+from\s+["']([^"']+)["']/g;
    const imageReferences = [];
    let match;
    
    while ((match = imageImportRegex.exec(content)) !== null) {
      if (match[2].includes('./assets/images/')) {
        imageReferences.push({
          name: match[1],
          path: match[2]
        });
      }
    }
    
    // Check if image files exist
    for (const img of imageReferences) {
      const fullPath = path.join(__dirname, 'src', img.path);
      if (!fs.existsSync(fullPath)) {
        this.errors.push(`Missing image file: ${img.path}`);
      }
    }
    
    log.success(`Validated ${imageReferences.length} image references`);
  }

  // Validate environment configuration
  validateEnvironmentConfig() {
    log.info('Validating environment configuration...');
    
    const workflowPath = path.join(__dirname, '.github', 'workflows', 'deploy.yml');
    
    if (!fs.existsSync(workflowPath)) {
      this.errors.push('GitHub Actions workflow file not found');
      return;
    }
    
    const workflowContent = fs.readFileSync(workflowPath, 'utf8');
    
    // Check for required environment variables
    const requiredEnvVars = [
      'GITHUB_USERNAME',
      'GITHUB_TOKEN',
      'USE_GITHUB_DATA',
      'USE_MEDIUM_DATA'
    ];
    
    for (const envVar of requiredEnvVars) {
      if (!workflowContent.includes(envVar)) {
        this.warnings.push(`Environment variable ${envVar} not found in workflow`);
      }
    }
    
    log.success('Environment configuration validation completed');
  }

  // Validate build scripts
  validateBuildScripts() {
    log.info('Validating build scripts...');
    
    const packageJsonPath = path.join(__dirname, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      this.errors.push('package.json not found');
      return;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check for required scripts
    const requiredScripts = ['build', 'start'];
    
    for (const script of requiredScripts) {
      if (!packageJson.scripts || !packageJson.scripts[script]) {
        this.errors.push(`Missing required script: ${script}`);
      }
    }
    
    // Check if fetch.js is included in build script
    if (packageJson.scripts && packageJson.scripts.build) {
      if (!packageJson.scripts.build.includes('fetch.js')) {
        this.warnings.push('Build script does not include fetch.js');
      }
    }
    
    log.success('Build scripts validation completed');
  }

  // Validate fetch.js script
  validateFetchScript() {
    log.info('Validating fetch.js script...');
    
    const fetchPath = path.join(__dirname, 'fetch.js');
    
    if (!fs.existsSync(fetchPath)) {
      this.errors.push('fetch.js script not found');
      return;
    }
    
    const content = fs.readFileSync(fetchPath, 'utf8');
    
    // Check for critical functions
    const requiredFunctions = [
      'validateEnvironment',
      'fetchWithRetry',
      'writeFileWithErrorHandling'
    ];
    
    for (const func of requiredFunctions) {
      if (!content.includes(func)) {
        this.errors.push(`Missing required function in fetch.js: ${func}`);
      }
    }
    
    // Check for proper error handling
    if (!content.includes('try') || !content.includes('catch')) {
      this.warnings.push('fetch.js may lack proper error handling');
    }
    
    log.success('fetch.js validation completed');
  }

  // Run all validations
  async runValidation() {
    console.log('🔍 Starting Portfolio Content Validation...\n');
    
    try {
      this.loadPortfolioConfig();
      this.validateProjectDuplicates();
      this.validateAchievementLinks();
      this.validateContentStructure();
      this.validateImageReferences();
      this.validateEnvironmentConfig();
      this.validateBuildScripts();
      this.validateFetchScript();
      
      this.printResults();
    } catch (error) {
      log.error(`Validation failed with error: ${error.message}`);
      process.exit(1);
    }
  }

  // Print validation results
  printResults() {
    console.log('\n📊 Validation Results:');
    console.log('═'.repeat(50));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      log.success('All validations passed! Portfolio content is in excellent condition.');
    } else {
      if (this.errors.length > 0) {
        console.log(`\n${colors.red}❌ Errors (${this.errors.length}):${colors.reset}`);
        this.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }
      
      if (this.warnings.length > 0) {
        console.log(`\n${colors.yellow}⚠️  Warnings (${this.warnings.length}):${colors.reset}`);
        this.warnings.forEach((warning, index) => {
          console.log(`   ${index + 1}. ${warning}`);
        });
      }
    }
    
    console.log('\n🏁 Validation completed.');
    
    // Exit with error code if there are errors
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  const validator = new PortfolioValidator();
  validator.runValidation();
}

module.exports = PortfolioValidator;