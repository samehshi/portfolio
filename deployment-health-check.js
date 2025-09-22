#!/usr/bin/env node

/**
 * Deployment Health Check Script
 * Validates the deployment readiness and monitors deployment health
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ANSI color codes for enhanced terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m"
};

const log = {
  info: msg => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: msg => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: msg => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  error: msg => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  header: msg =>
    console.log(`${colors.bright}${colors.cyan}${msg}${colors.reset}`)
};

class DeploymentHealthChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.buildPath = path.join(process.cwd(), "build");
    this.publicPath = path.join(process.cwd(), "public");
  }

  // Check if all required files exist
  validateFileStructure() {
    log.header("🏗️ Validating File Structure");

    const requiredFiles = [
      {path: "package.json", critical: true},
      {path: "src/App.js", critical: true},
      {path: "src/portfolio.js", critical: true},
      {path: "public/index.html", critical: true},
      {path: "fetch.js", critical: true}
    ];

    const buildFiles = [
      {path: "build/index.html", critical: true},
      {path: "build/static", critical: true, isDirectory: true}
    ];

    // Check development files
    requiredFiles.forEach(({path: filePath, critical}) => {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        log.success(`Found: ${filePath}`);
      } else {
        const message = `Missing: ${filePath}`;
        if (critical) {
          this.errors.push(message);
          log.error(message);
        } else {
          this.warnings.push(message);
          log.warning(message);
        }
      }
    });

    // Check build files if build directory exists
    if (fs.existsSync(this.buildPath)) {
      buildFiles.forEach(({path: filePath, critical, isDirectory}) => {
        const fullPath = path.join(process.cwd(), filePath);
        const exists = isDirectory
          ? fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()
          : fs.existsSync(fullPath);

        if (exists) {
          log.success(`Build file found: ${filePath}`);
        } else {
          const message = `Missing build file: ${filePath}`;
          if (critical) {
            this.errors.push(message);
            log.error(message);
          } else {
            this.warnings.push(message);
            log.warning(message);
          }
        }
      });
    } else {
      log.warning("Build directory not found - run 'npm run build' first");
    }
  }

  // Validate environment configuration
  validateEnvironment() {
    log.header("🌐 Validating Environment Configuration");

    const requiredEnvVars = [
      {name: "USE_GITHUB_DATA", required: false},
      {name: "USE_MEDIUM_DATA", required: false},
      {name: "GITHUB_USERNAME", required: false},
      {name: "GITHUB_TOKEN", required: false}
    ];

    let envConfigured = false;

    requiredEnvVars.forEach(({name, required}) => {
      const value = process.env[name];
      if (value) {
        log.success(`${name}: Set`);
        envConfigured = true;
      } else {
        const message = `${name}: Not set`;
        if (required) {
          this.errors.push(message);
          log.error(message);
        } else {
          log.info(message);
        }
      }
    });

    if (!envConfigured) {
      log.warning("No environment variables configured - using defaults");
    }

    // Check .env file
    const envFile = path.join(process.cwd(), ".env");
    if (fs.existsSync(envFile)) {
      log.success("Found .env file");
    } else {
      log.info("No .env file found (optional)");
    }
  }

  // Validate package.json configuration
  validatePackageConfiguration() {
    log.header("📦 Validating Package Configuration");

    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

      // Check homepage
      if (packageJson.homepage) {
        log.success(`Homepage configured: ${packageJson.homepage}`);
      } else {
        this.warnings.push("No homepage configured in package.json");
        log.warning("No homepage configured in package.json");
      }

      // Check scripts
      const requiredScripts = ["build", "start", "deploy"];
      requiredScripts.forEach(script => {
        if (packageJson.scripts && packageJson.scripts[script]) {
          log.success(`Script configured: ${script}`);
        } else {
          this.errors.push(`Missing script: ${script}`);
          log.error(`Missing script: ${script}`);
        }
      });

      // Check dependencies
      const criticalDeps = ["react", "react-dom", "react-scripts"];
      criticalDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
          log.success(`Dependency found: ${dep}`);
        } else {
          this.errors.push(`Missing critical dependency: ${dep}`);
          log.error(`Missing critical dependency: ${dep}`);
        }
      });

      // Check if dotenv is in dependencies (not devDependencies)
      if (packageJson.dependencies && packageJson.dependencies.dotenv) {
        log.success("dotenv in dependencies (correct for CI/CD)");
      } else if (
        packageJson.devDependencies &&
        packageJson.devDependencies.dotenv
      ) {
        this.errors.push(
          "dotenv should be in dependencies, not devDependencies"
        );
        log.error("dotenv should be in dependencies, not devDependencies");
      } else {
        this.warnings.push("dotenv dependency not found");
        log.warning("dotenv dependency not found");
      }
    } catch (error) {
      this.errors.push(`Error reading package.json: ${error.message}`);
      log.error(`Error reading package.json: ${error.message}`);
    }
  }

  // Validate build output
  validateBuildOutput() {
    log.header("🔍 Validating Build Output");

    if (!fs.existsSync(this.buildPath)) {
      this.warnings.push(
        "Build directory not found - skipping build validation"
      );
      log.warning("Build directory not found - skipping build validation");
      return;
    }

    try {
      // Check index.html
      const indexPath = path.join(this.buildPath, "index.html");
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf8");
        if (
          content.includes("<title>") &&
          content.includes('<div id="root">')
        ) {
          log.success("Build index.html contains required elements");
        } else {
          this.warnings.push("Build index.html missing required elements");
          log.warning("Build index.html missing required elements");
        }
      }

      // Check static files
      const staticPath = path.join(this.buildPath, "static");
      if (fs.existsSync(staticPath)) {
        const jsFiles = fs
          .readdirSync(path.join(staticPath, "js"))
          .filter(f => f.endsWith(".js"));
        const cssFiles = fs
          .readdirSync(path.join(staticPath, "css"))
          .filter(f => f.endsWith(".css"));

        log.success(
          `Build contains ${jsFiles.length} JS files and ${cssFiles.length} CSS files`
        );

        if (jsFiles.length === 0) {
          this.errors.push("No JavaScript files found in build");
          log.error("No JavaScript files found in build");
        }

        if (cssFiles.length === 0) {
          this.warnings.push("No CSS files found in build");
          log.warning("No CSS files found in build");
        }
      }

      // Calculate build size
      const buildSize = this.calculateDirectorySize(this.buildPath);
      log.success(`Build size: ${(buildSize / 1024 / 1024).toFixed(2)} MB`);
    } catch (error) {
      this.errors.push(`Error validating build: ${error.message}`);
      log.error(`Error validating build: ${error.message}`);
    }
  }

  // Calculate directory size recursively
  calculateDirectorySize(dirPath) {
    let size = 0;
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        size += this.calculateDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    });

    return size;
  }

  // Test deployment URL accessibility
  async testDeploymentURL() {
    log.header("🌐 Testing Deployment URL Accessibility");

    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
      const homepage = packageJson.homepage;

      if (!homepage) {
        log.warning("No homepage URL configured - skipping URL test");
        return;
      }

      const url = new URL(homepage);

      return new Promise(resolve => {
        const request = https.get(homepage, res => {
          if (res.statusCode === 200) {
            log.success(`Deployment URL accessible: ${homepage}`);
          } else {
            log.warning(
              `Deployment URL returned status ${res.statusCode}: ${homepage}`
            );
          }
          resolve();
        });

        request.on("error", error => {
          log.warning(`Could not access deployment URL: ${error.message}`);
          resolve();
        });

        request.setTimeout(10000, () => {
          request.destroy();
          log.warning("Deployment URL test timed out");
          resolve();
        });
      });
    } catch (error) {
      log.warning(`Error testing deployment URL: ${error.message}`);
    }
  }

  // Generate health report
  generateReport() {
    log.header("📊 Deployment Health Report");

    console.log(`${colors.cyan}${"=".repeat(50)}${colors.reset}`);

    if (this.errors.length === 0 && this.warnings.length === 0) {
      log.success("🎉 Perfect! No issues found. Deployment ready!");
    } else {
      if (this.errors.length > 0) {
        console.log(
          `${colors.red}${colors.bright}Critical Issues (${this.errors.length}):${colors.reset}`
        );
        this.errors.forEach(error => log.error(error));
        console.log("");
      }

      if (this.warnings.length > 0) {
        console.log(
          `${colors.yellow}${colors.bright}Warnings (${this.warnings.length}):${colors.reset}`
        );
        this.warnings.forEach(warning => log.warning(warning));
        console.log("");
      }

      if (this.errors.length > 0) {
        log.error("❌ Deployment readiness: FAILED");
        log.error("Fix critical issues before deploying");
      } else {
        log.success("✅ Deployment readiness: READY");
        log.warning("Consider addressing warnings for optimal deployment");
      }
    }

    console.log(`${colors.cyan}${"=".repeat(50)}${colors.reset}`);

    return this.errors.length === 0;
  }

  // Run all health checks
  async runHealthCheck() {
    log.header("🚀 Starting Deployment Health Check");
    console.log("");

    this.validateFileStructure();
    console.log("");

    this.validateEnvironment();
    console.log("");

    this.validatePackageConfiguration();
    console.log("");

    this.validateBuildOutput();
    console.log("");

    await this.testDeploymentURL();
    console.log("");

    const isHealthy = this.generateReport();

    // Exit with appropriate code
    process.exit(isHealthy ? 0 : 1);
  }
}

// Run the health check if this file is executed directly
if (require.main === module) {
  const checker = new DeploymentHealthChecker();
  checker.runHealthCheck().catch(error => {
    log.error(`Health check failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = DeploymentHealthChecker;
