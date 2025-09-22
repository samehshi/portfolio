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

const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;

if (USE_GITHUB_DATA === "true") {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

  if (GITHUB_USERNAME === undefined || GITHUB_TOKEN === undefined) {
    throw new Error(ERR.noUserName);
  }

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  var data = JSON.stringify({
    query: `
{
  user(login:"${GITHUB_USERNAME}") { 
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
  const default_options = {
    hostname: "api.github.com",
    path: "/graphql",
    port: 443,
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node"
    }
  };

  const req = https.request(default_options, res => {
    let data = "";

    console.log(`statusCode: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      console.error(
        `Request to GitHub failed with status code: ${res.statusCode}. Check if GitHub token in your .env file is correct.`
      );
      res.resume(); // Consume the response to free up memory.
      process.exit(1); // Exit with a non-zero code to indicate failure
    }

    res.on("data", d => {
      data += d;
    });
    res.on("end", () => {
      fs.writeFile("./public/profile.json", data, function (err) {
        if (err) {
          console.error("Error writing profile.json:", err);
          process.exit(1);
        }
        console.log("saved file to public/profile.json");
      });
    });
  });

  req.on("error", error => {
    console.error("Error during GitHub API request:", error);
    process.exit(1);
  });

  req.write(data);
  req.end();
} else {
  console.warn("USE_GITHUB_DATA is set to false. Skipping GitHub data fetching.");
}

const USE_MEDIUM_DATA = process.env.USE_MEDIUM_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

if (USE_GITHUB_DATA === "true") {
  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
  const options = {
    hostname: "api.rss2json.com",
    path: `/v1/api.json?rss_url=${encodeURIComponent(
      `https://medium.com/feed/@${MEDIUM_USERNAME}`
    )}`,
    port: 443,
    method: "GET"
  };

  const req = https.request(options, res => {
    let mediumData = "";

    console.log(`statusCode: ${res.statusCode}`);
    if (res.statusCode !== 200 && res.statusCode !== 422) {
      console.error(
        `Request to Medium failed with status code: ${res.statusCode}. Check if Medium username in your .env file is correct.`
      );
      res.resume();
      process.exit(1);
    }

    res.on("data", d => {
      mediumData += d;
    });
    res.on("end", () => {
      fs.writeFile("./public/blogs.json", mediumData, function (err) {
        if (err) {
          console.error("Error writing blogs.json:", err);
          process.exit(1);
        }
        console.log("saved file to public/blogs.json");
      });
    });
  });

  req.on("error", error => {
    console.error("Error during Medium API request:", error);
    process.exit(1);
  });

  req.end();
} else {
  console.warn("USE_MEDIUM_DATA is set to false or MEDIUM_USERNAME is not defined. Skipping Medium blog data fetching.");
}
