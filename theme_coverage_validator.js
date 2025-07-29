/**
 * Theme Coverage Validator
 * 
 * This script validates that all components properly use CSS custom properties
 * for theming instead of hardcoded colors. It checks for:
 * - Hardcoded hex colors
 * - Hardcoded RGB/RGBA values
 * - Direct color names (white, black, etc.)
 * - Missing theme support in interactive elements
 */

const fs = require('fs');
const path = require('path');

class ThemeCoverageValidator {
  constructor() {
    this.issues = [];
    this.scannedFiles = 0;
    this.excludePatterns = [
      /node_modules/,
      /_site/,
      /\.git/,
      /\.min\./,
      /bootstrap/,
      /pygments/,
      /academicons/,
      /font-awesome/,
      /tabler-icons/
    ];
  }

  /**
   * Check if a file should be excluded from scanning
   */
  shouldExcludeFile(filePath) {
    return this.excludePatterns.some(pattern => pattern.test(filePath));
  }

  /**
   * Scan a file for hardcoded colors and theme issues
   */
  scanFile(filePath) {
    if (this.shouldExcludeFile(filePath)) {
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      this.scannedFiles++;
      
      // Check for hardcoded hex colors
      const hexColorRegex = /#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/g;
      const hexMatches = content.match(hexColorRegex);
      if (hexMatches) {
        hexMatches.forEach(match => {
          // Skip if it's in a comment or URL
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (line.includes(match) && !line.trim().startsWith('//') && !line.trim().startsWith('*') && !line.includes('url(')) {
              this.issues.push({
                file: filePath,
                line: index + 1,
                type: 'hardcoded-hex',
                value: match,
                suggestion: 'Replace with CSS custom property like var(--color-name)'
              });
            }
          });
        });
      }

      // Check for hardcoded RGB/RGBA values (excluding CSS custom property usage)
      const rgbRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g;
      const rgbMatches = content.match(rgbRegex);
      if (rgbMatches) {
        rgbMatches.forEach(match => {
          // Skip if it's part of a CSS custom property or in specific contexts
          if (!match.includes('var(') && !content.includes(`${match}, 0.`) && !content.includes('rgba(255, 255, 255, 0.')) {
            const lines = content.split('\n');
            lines.forEach((line, index) => {
              if (line.includes(match) && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
                this.issues.push({
                  file: filePath,
                  line: index + 1,
                  type: 'hardcoded-rgb',
                  value: match,
                  suggestion: 'Replace with CSS custom property or use theme-aware color'
                });
              }
            });
          }
        });
      }

      // Check for hardcoded color names (excluding white-space, etc.)
      const colorNameRegex = /\b(white|black)\b/g;
      const colorMatches = content.match(colorNameRegex);
      if (colorMatches) {
        colorMatches.forEach(match => {
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (line.includes(`color: ${match}`) || line.includes(`background: ${match}`) || line.includes(`background-color: ${match}`)) {
              this.issues.push({
                file: filePath,
                line: index + 1,
                type: 'hardcoded-color-name',
                value: match,
                suggestion: 'Replace with var(--text-inverse) or appropriate theme variable'
              });
            }
          });
        });
      }

      // Check for missing CSS custom property usage in color properties
      const colorPropertyRegex = /(color|background|border-color|fill|stroke):\s*(?!var\()/g;
      const propertyMatches = content.match(colorPropertyRegex);
      if (propertyMatches && filePath.endsWith('.scss')) {
        propertyMatches.forEach(match => {
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (line.includes(match) && !line.includes('var(') && !line.includes('transparent') && !line.includes('inherit') && !line.includes('currentColor')) {
              // Skip if it's a Sass variable or function
              if (!line.includes('$') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
                this.issues.push({
                  file: filePath,
                  line: index + 1,
                  type: 'missing-css-custom-property',
                  value: line.trim(),
                  suggestion: 'Consider using CSS custom properties for better theme support'
                });
              }
            }
          });
        });
      }

    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}: ${error.message}`);
    }
  }

  /**
   * Recursively scan a directory
   */
  scanDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      
      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanDirectory(fullPath);
        } else if (stat.isFile()) {
          // Only scan relevant file types
          if (/\.(scss|css|js|liquid|html|md)$/.test(item)) {
            this.scanFile(fullPath);
          }
        }
      });
    } catch (error) {
      console.warn(`Warning: Could not scan directory ${dirPath}: ${error.message}`);
    }
  }

  /**
   * Generate a comprehensive report
   */
  generateReport() {
    const report = {
      summary: {
        totalFiles: this.scannedFiles,
        totalIssues: this.issues.length,
        issuesByType: {}
      },
      issues: this.issues,
      recommendations: []
    };

    // Group issues by type
    this.issues.forEach(issue => {
      if (!report.summary.issuesByType[issue.type]) {
        report.summary.issuesByType[issue.type] = 0;
      }
      report.summary.issuesByType[issue.type]++;
    });

    // Add recommendations based on findings
    if (report.summary.issuesByType['hardcoded-hex'] > 0) {
      report.recommendations.push('Convert hardcoded hex colors to CSS custom properties for better theme support');
    }
    
    if (report.summary.issuesByType['hardcoded-rgb'] > 0) {
      report.recommendations.push('Replace hardcoded RGB values with theme-aware color variables');
    }
    
    if (report.summary.issuesByType['hardcoded-color-name'] > 0) {
      report.recommendations.push('Replace color names like "white" and "black" with semantic theme variables');
    }

    if (report.summary.issuesByType['missing-css-custom-property'] > 0) {
      report.recommendations.push('Consider using CSS custom properties for better maintainability and theme support');
    }

    return report;
  }

  /**
   * Run the validation
   */
  validate() {
    console.log('🔍 Starting theme coverage validation...');
    
    // Scan the main directories
    const dirsToScan = ['_sass', 'assets/css', 'assets/js', '_includes', '_layouts'];
    
    dirsToScan.forEach(dir => {
      if (fs.existsSync(dir)) {
        console.log(`📁 Scanning ${dir}...`);
        this.scanDirectory(dir);
      }
    });

    const report = this.generateReport();
    
    console.log('\n📊 Theme Coverage Validation Report');
    console.log('=====================================');
    console.log(`📄 Files scanned: ${report.summary.totalFiles}`);
    console.log(`⚠️  Total issues: ${report.summary.totalIssues}`);
    
    if (report.summary.totalIssues === 0) {
      console.log('✅ No theme coverage issues found!');
      return true;
    }

    console.log('\n📋 Issues by type:');
    Object.entries(report.summary.issuesByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });

    console.log('\n🔧 Recommendations:');
    report.recommendations.forEach(rec => {
      console.log(`   • ${rec}`);
    });

    console.log('\n📝 Detailed Issues:');
    report.issues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line} - ${issue.type}`);
      console.log(`      Value: ${issue.value}`);
      console.log(`      Suggestion: ${issue.suggestion}`);
      console.log('');
    });

    // Save detailed report to file
    fs.writeFileSync('theme_coverage_report.json', JSON.stringify(report, null, 2));
    console.log('💾 Detailed report saved to theme_coverage_report.json');

    return report.summary.totalIssues === 0;
  }
}

// Run the validator if this script is executed directly
if (require.main === module) {
  const validator = new ThemeCoverageValidator();
  const success = validator.validate();
  process.exit(success ? 0 : 1);
}

module.exports = ThemeCoverageValidator;