fs = require("fs");
const https = require("https");
process = require("process");
require("dotenv").config();

const ERR = {
  noUserName:
    "Github Username was found to be undefined. Please set all relevant environment variables.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct."
};

// Environment validation function
function validateEnvironment() {
  const errors = [];
  const warnings = [];
  
  const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
  const USE_MEDIUM_DATA = process.env.USE_MEDIUM_DATA;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;
  
  console.log("🔍 Validating environment configuration...");
  console.log(`USE_GITHUB_DATA: ${USE_GITHUB_DATA}`);
  console.log(`USE_MEDIUM_DATA: ${USE_MEDIUM_DATA}`);
  console.log(`GITHUB_USERNAME: ${GITHUB_USERNAME ? 'Set' : 'Not set'}`);
  console.log(`GITHUB_TOKEN: ${GITHUB_TOKEN ? 'Set' : 'Not set'}`);
  console.log(`MEDIUM_USERNAME: ${MEDIUM_USERNAME ? 'Set' : 'Not set'}`);
  
  // Validate GitHub configuration
  if (USE_GITHUB_DATA === "true") {
    if (!GITHUB_USERNAME) {
      errors.push("GITHUB_USERNAME is required when USE_GITHUB_DATA=true");
    }
    if (!GITHUB_TOKEN) {
      errors.push("GITHUB_TOKEN is required when USE_GITHUB_DATA=true");
    }
  }
  
  // Validate Medium configuration
  if (USE_MEDIUM_DATA === "true") {
    if (!MEDIUM_USERNAME) {
      warnings.push("MEDIUM_USERNAME not set, Medium integration will be disabled");
    }
  }
  
  // Log results
  if (errors.length > 0) {
    console.error("❌ Environment validation failed:");
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }
  
  if (warnings.length > 0) {
    console.warn("⚠️  Environment validation warnings:");
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  console.log("✅ Environment validation completed successfully");
  return { USE_GITHUB_DATA, USE_MEDIUM_DATA, GITHUB_USERNAME, GITHUB_TOKEN, MEDIUM_USERNAME };
}

// Enhanced error handling with retry logic
function fetchWithRetry(requestOptions, data, maxRetries = 3, baseDelay = 1000) {
  return new Promise((resolve, reject) => {
    let attempt = 0;
    
    function makeRequest() {
      attempt++;
      console.log(`🔄 Attempt ${attempt}/${maxRetries}`);
      
      const req = https.request(requestOptions, res => {
        let responseData = "";
        
        console.log(`statusCode: ${res.statusCode}`);
        
        if (res.statusCode !== 200 && res.statusCode !== 422) {
          const error = new Error(`Request failed with status code: ${res.statusCode}`);
          error.statusCode = res.statusCode;
          
          if (attempt < maxRetries) {
            const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
            console.warn(`⚠️  Request failed, retrying in ${delay}ms...`);
            setTimeout(makeRequest, delay);
            return;
          } else {
            console.error(`❌ Max retries (${maxRetries}) reached. Request failed.`);
            res.resume();
            reject(error);
            return;
          }
        }
        
        res.on("data", d => {
          responseData += d;
        });
        
        res.on("end", () => {
          console.log("✅ Request completed successfully");
          resolve(responseData);
        });
      });
      
      req.on("error", error => {
        console.error(`❌ Request error on attempt ${attempt}:`, error.message);
        
        if (attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          console.warn(`⚠️  Retrying in ${delay}ms...`);
          setTimeout(makeRequest, delay);
        } else {
          console.error(`❌ Max retries (${maxRetries}) reached. Giving up.`);
          reject(error);
        }
      });
      
      if (data) {
        req.write(data);
      }
      req.end();
    }
    
    makeRequest();
  });
}

// Safe file writing with error handling
function writeFileWithErrorHandling(filePath, data, description) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, function (err) {
      if (err) {
        console.error(`❌ Error writing ${description}:`, err);
        reject(err);
      } else {
        console.log(`✅ Successfully saved ${description} to ${filePath}`);
        resolve();
      }
    });
  });
}

// Validate environment before proceeding
const env = validateEnvironment();

// Main execution function
async function fetchAllData() {
  try {
    // Fetch GitHub data if enabled
    if (env.USE_GITHUB_DATA === "true") {
      await fetchGitHubData();
    } else {
      console.warn("⚠️  USE_GITHUB_DATA is set to false. Skipping GitHub data fetching.");
    }
    
    // Fetch Medium data if enabled
    if (env.USE_MEDIUM_DATA === "true" && env.MEDIUM_USERNAME) {
      await fetchMediumData();
    } else {
      console.warn("⚠️  USE_MEDIUM_DATA is set to false or MEDIUM_USERNAME is not defined. Skipping Medium blog data fetching.");
    }
    
    console.log("✨ All data fetching completed successfully!");
  } catch (error) {
    console.error("❌ Fatal error during data fetching:", error);
    process.exit(1);
  }
}

// GitHub data fetching function
async function fetchGitHubData() {
  console.log(`📈 Fetching GitHub profile data for ${env.GITHUB_USERNAME}`);
  
  const graphqlQuery = JSON.stringify({
    query: `
{
  user(login:"${env.GITHUB_USERNAME}") { 
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
}
`
  });
  
  const requestOptions = {
    hostname: "api.github.com",
    path: "/graphql",
    port: 443,
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "User-Agent": "Node",
      "Content-Type": "application/json"
    }
  };
  
  try {
    const data = await fetchWithRetry(requestOptions, graphqlQuery);
    await writeFileWithErrorHandling("./public/profile.json", data, "GitHub profile data");
  } catch (error) {
    console.error("❌ Failed to fetch GitHub data:", error.message);
    throw error;
  }
}

// Medium data fetching function
async function fetchMediumData() {
  console.log(`📝 Fetching Medium blogs data for ${env.MEDIUM_USERNAME}`);
  
  const requestOptions = {
    hostname: "api.rss2json.com",
    path: `/v1/api.json?rss_url=${encodeURIComponent(
      `https://medium.com/feed/@${env.MEDIUM_USERNAME}`
    )}`,
    port: 443,
    method: "GET"
  };
  
  try {
    const data = await fetchWithRetry(requestOptions, null, 2, 2000); // Fewer retries for Medium API
    await writeFileWithErrorHandling("./public/blogs.json", data, "Medium blog data");
  } catch (error) {
    console.error("❌ Failed to fetch Medium data:", error.message);
    // Don't throw for Medium errors - it's non-critical
    console.warn("⚠️  Continuing without Medium data...");
  }
}

// Start the data fetching process
fetchAllData();
