# GEMINI.md

## Project Overview

This project is a personal portfolio website for Sameh Shehata Abdelaziz, a Data Scientist and Business Intelligence Analyst. It is built with React.js and showcases his skills, experience, projects, and achievements. The portfolio is designed to be easily configurable by editing a single JavaScript file (`src/portfolio.js`).

The project automatically fetches the latest project information from GitHub and blog posts from Medium, ensuring the portfolio is always up-to-date.

**Key Technologies:**

*   **Frontend:** React.js, Sass, Lottie for animations
*   **Data Fetching:** Node.js, GitHub GraphQL API, `rss2json` (for Medium feed)
*   **Deployment:** GitHub Actions for CI/CD, GitHub Pages for hosting

**Architecture:**

The application follows a standard Create React App structure. The core content of the portfolio is managed in a single configuration file, `src/portfolio.js`. A pre-build script, `fetch.js`, runs in Node.js to fetch dynamic data from the GitHub and Medium APIs. This data is then saved as JSON files in the `public` directory, which are then consumed by the React components.

## Building and Running

### Prerequisites

*   Node.js and npm
*   A `.env` file with the following variables:
    *   `REACT_APP_GITHUB_TOKEN`: A GitHub personal access token with `repo` and `user` scopes.
    *   `GITHUB_USERNAME`: The GitHub username to fetch data from.
    *   `USE_GITHUB_DATA`: Set to `true` to enable fetching data from GitHub.
    *   `MEDIUM_USERNAME`: The Medium username to fetch blog posts from.

### Key Commands

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Start the development server:**
    ```bash
    npm start
    ```
*   **Build the application for production:**
    ```bash
    npm run build
    ```
*   **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```
*   **Run tests:**
    ```bash
    npm test
    ```
*   **Format code:**
    ```bash
    npm run format
    ```

## Development Conventions

*   **Configuration:** The primary method of customizing the portfolio is by editing the `src/portfolio.js` file. This file contains all the text and data for the different sections of the website.
*   **Styling:** The project uses Sass for styling. Global color variables are defined in `src/_globalColor.scss`.
*   **CI/CD:** The project uses GitHub Actions for continuous integration and deployment. The workflow is defined in `.github/workflows/deploy.yml`. The site is automatically deployed to GitHub Pages on pushes to the `main` branch.
*   **Data Fetching:** Dynamic data from GitHub and Medium is fetched during the build process by the `fetch.js` script. This means that the data is static on the deployed site and will only be updated when the site is rebuilt.
