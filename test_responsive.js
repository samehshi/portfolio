/**
 * Responsive Design Test Script
 * 
 * This script tests various responsive design elements and provides
 * feedback on mobile-friendliness and accessibility.
 */

class ResponsiveDesignTester {
    constructor() {
        this.breakpoints = {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200
        };
        
        this.testResults = [];
        this.currentBreakpoint = this.getCurrentBreakpoint();
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width >= this.breakpoints.xl) return 'xl';
        if (width >= this.breakpoints.lg) return 'lg';
        if (width >= this.breakpoints.md) return 'md';
        if (width >= this.breakpoints.sm) return 'sm';
        return 'xs';
    }
    
    // Test touch target sizes (minimum 44px for accessibility)
    testTouchTargets() {
        const touchElements = document.querySelectorAll('button, a, input, .nav-link, .dropdown-item');
        const failedElements = [];
        
        touchElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(element);
            
            // Check if element is visible
            if (rect.width === 0 || rect.height === 0 || computedStyle.display === 'none') {
                return;
            }
            
            const minSize = 44;
            if (rect.width < minSize || rect.height < minSize) {
                failedElements.push({
                    element: element,
                    width: rect.width,
                    height: rect.height,
                    selector: this.getElementSelector(element)
                });
            }
        });
        
        this.testResults.push({
            test: 'Touch Targets',
            passed: failedElements.length === 0,
            details: failedElements.length === 0 
                ? 'All interactive elements meet minimum 44px touch target size'
                : `${failedElements.length} elements below minimum size`,
            failedElements: failedElements
        });
        
        return failedElements.length === 0;
    }
    
    // Test responsive typography
    testResponsiveTypography() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const issues = [];
        
        headings.forEach(heading => {
            const computedStyle = window.getComputedStyle(heading);
            const fontSize = parseFloat(computedStyle.fontSize);
            
            // Check if font size is appropriate for current breakpoint
            if (this.currentBreakpoint === 'xs' && fontSize > 32) {
                issues.push({
                    element: heading,
                    fontSize: fontSize,
                    issue: 'Font size may be too large for mobile'
                });
            }
            
            if (this.currentBreakpoint === 'xl' && fontSize < 16) {
                issues.push({
                    element: heading,
                    fontSize: fontSize,
                    issue: 'Font size may be too small for large screens'
                });
            }
        });
        
        this.testResults.push({
            test: 'Responsive Typography',
            passed: issues.length === 0,
            details: issues.length === 0 
                ? 'Typography scales appropriately across breakpoints'
                : `${issues.length} typography issues found`,
            issues: issues
        });
        
        return issues.length === 0;
    }
    
    // Test navigation responsiveness
    testNavigationResponsiveness() {
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        const issues = [];
        
        if (!navbar) {
            issues.push('Navigation bar not found');
            return false;
        }
        
        // Test mobile navigation
        if (this.currentBreakpoint === 'xs' || this.currentBreakpoint === 'sm') {
            if (!navToggle) {
                issues.push('Mobile navigation toggle not found');
            } else {
                const toggleRect = navToggle.getBoundingClientRect();
                if (toggleRect.width < 44 || toggleRect.height < 44) {
                    issues.push('Mobile navigation toggle too small');
                }
            }
            
            if (navCollapse) {
                const computedStyle = window.getComputedStyle(navCollapse);
                if (computedStyle.position !== 'static' && computedStyle.position !== 'relative') {
                    // Check if mobile menu is properly positioned
                }
            }
        }
        
        this.testResults.push({
            test: 'Navigation Responsiveness',
            passed: issues.length === 0,
            details: issues.length === 0 
                ? 'Navigation adapts properly to different screen sizes'
                : issues.join(', '),
            issues: issues
        });
        
        return issues.length === 0;
    }
    
    // Test card layout responsiveness
    testCardResponsiveness() {
        const cards = document.querySelectorAll('.card');
        const issues = [];
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(card);
            
            // Check card spacing on mobile
            if (this.currentBreakpoint === 'xs') {
                const marginBottom = parseFloat(computedStyle.marginBottom);
                if (marginBottom < 16) {
                    issues.push('Insufficient card spacing on mobile');
                }
            }
            
            // Check if cards are too wide on mobile
            if (this.currentBreakpoint === 'xs' && rect.width > window.innerWidth - 32) {
                issues.push('Cards may be too wide for mobile screens');
            }
        });
        
        this.testResults.push({
            test: 'Card Responsiveness',
            passed: issues.length === 0,
            details: issues.length === 0 
                ? 'Cards adapt properly to different screen sizes'
                : `${issues.length} card layout issues found`,
            issues: issues
        });
        
        return issues.length === 0;
    }
    
    // Test image responsiveness
    testImageResponsiveness() {
        const images = document.querySelectorAll('img');
        const issues = [];
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            
            // Check if images overflow container
            if (rect.width > window.innerWidth) {
                issues.push({
                    element: img,
                    issue: 'Image wider than viewport',
                    width: rect.width
                });
            }
            
            // Check if images have proper responsive attributes
            if (!img.hasAttribute('loading') && !img.hasAttribute('data-src')) {
                // Could suggest lazy loading
            }
        });
        
        this.testResults.push({
            test: 'Image Responsiveness',
            passed: issues.length === 0,
            details: issues.length === 0 
                ? 'Images scale properly across devices'
                : `${issues.length} image responsiveness issues found`,
            issues: issues
        });
        
        return issues.length === 0;
    }
    
    // Test form responsiveness
    testFormResponsiveness() {
        const forms = document.querySelectorAll('form');
        const issues = [];
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                const rect = input.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(input);
                
                // Check input sizing on mobile
                if (this.currentBreakpoint === 'xs') {
                    const fontSize = parseFloat(computedStyle.fontSize);
                    if (fontSize < 16) {
                        issues.push('Input font size below 16px may cause zoom on iOS');
                    }
                    
                    if (rect.height < 44) {
                        issues.push('Input height below recommended touch target size');
                    }
                }
            });
        });
        
        this.testResults.push({
            test: 'Form Responsiveness',
            passed: issues.length === 0,
            details: issues.length === 0 
                ? 'Forms are optimized for mobile interaction'
                : `${issues.length} form responsiveness issues found`,
            issues: issues
        });
        
        return issues.length === 0;
    }
    
    // Helper method to get element selector
    getElementSelector(element) {
        if (element.id) return `#${element.id}`;
        if (element.className) return `.${element.className.split(' ')[0]}`;
        return element.tagName.toLowerCase();
    }
    
    // Run all tests
    runAllTests() {
        console.log(`🔍 Running responsive design tests at ${this.currentBreakpoint} breakpoint (${window.innerWidth}px)`);
        
        this.testTouchTargets();
        this.testResponsiveTypography();
        this.testNavigationResponsiveness();
        this.testCardResponsiveness();
        this.testImageResponsiveness();
        this.testFormResponsiveness();
        
        return this.generateReport();
    }
    
    // Generate test report
    generateReport() {
        const passedTests = this.testResults.filter(test => test.passed).length;
        const totalTests = this.testResults.length;
        const score = Math.round((passedTests / totalTests) * 100);
        
        const report = {
            breakpoint: this.currentBreakpoint,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            score: score,
            passedTests: passedTests,
            totalTests: totalTests,
            results: this.testResults,
            summary: this.generateSummary(score)
        };
        
        this.displayReport(report);
        return report;
    }
    
    generateSummary(score) {
        if (score >= 90) return '✅ Excellent responsive design';
        if (score >= 75) return '✅ Good responsive design with minor issues';
        if (score >= 60) return '⚠️ Acceptable responsive design with some issues';
        return '❌ Responsive design needs improvement';
    }
    
    displayReport(report) {
        console.log('\n📊 RESPONSIVE DESIGN TEST REPORT');
        console.log('================================');
        console.log(`Breakpoint: ${report.breakpoint} (${report.viewport})`);
        console.log(`Score: ${report.score}% (${report.passedTests}/${report.totalTests} tests passed)`);
        console.log(`Summary: ${report.summary}\n`);
        
        report.results.forEach(result => {
            const icon = result.passed ? '✅' : '❌';
            console.log(`${icon} ${result.test}: ${result.details}`);
            
            if (!result.passed && result.issues) {
                result.issues.forEach(issue => {
                    console.log(`   - ${issue.issue || issue}`);
                });
            }
            
            if (!result.passed && result.failedElements) {
                result.failedElements.forEach(failed => {
                    console.log(`   - ${failed.selector}: ${failed.width}x${failed.height}px`);
                });
            }
        });
        
        console.log('\n💡 Recommendations:');
        if (report.score < 100) {
            console.log('- Review failed tests and implement suggested improvements');
            console.log('- Test across multiple devices and screen sizes');
            console.log('- Validate touch targets meet accessibility guidelines');
        } else {
            console.log('- Great job! Consider testing on actual devices');
            console.log('- Monitor performance on slower connections');
        }
    }
}

// Auto-run tests when page loads
document.addEventListener('DOMContentLoaded', function() {
    const tester = new ResponsiveDesignTester();
    window.responsiveTester = tester;
    
    // Run initial test
    tester.runAllTests();
    
    // Re-run tests on window resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.clear();
            const newTester = new ResponsiveDesignTester();
            newTester.runAllTests();
            window.responsiveTester = newTester;
        }, 500);
    });
});

// Export for manual testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveDesignTester;
}