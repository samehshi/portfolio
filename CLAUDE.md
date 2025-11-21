# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📋 Project Overview

This is a **React-based portfolio website** for Sameh Shehata Abdelaziz, a Data Scientist and Business Intelligence Analyst. The site showcases professional experience, projects, skills, and achievements with advanced analytics and AI/ML capabilities.

**Key Features:**
- Dynamic content loading from GitHub and Medium APIs
- Dark/light theme toggle with localStorage persistence
- Comprehensive Google Analytics 4 tracking
- Intersection Observer for section visibility tracking
- Responsive design with modern React patterns
- Automated data fetching and validation

## 🏗️ Architecture & Structure

### Core Files
- `src/portfolio.js` - Main configuration file with all content (greeting, skills, projects, etc.)
- `src/App.js` - Root component with analytics initialization
- `src/containers/Main.js` - Main layout with section routing
- `src/utils/analytics.js` - GA4 tracking utilities (288 lines)
- `fetch.js` - External API data fetching (GitHub/Medium)

### Directory Structure
```
src/
├── containers/     # Page sections (Main, WorkExperience, Projects, etc.)
├── components/    # Reusable UI components
├── utils/         # Analytics, validation, helpers
├── hooks/        # Custom hooks (useLocalStorage)
├── contexts/     # Theme context
└── assets/       # Images, animations, styles
```

### Key Architecture Patterns
1. **Centralized Configuration**: All content in `portfolio.js`
2. **Analytics-First**: Every interaction tracked via GA4
3. **Dynamic Data**: GitHub/Medium integration via `fetch.js`
4. **Theme System**: Context + localStorage for dark mode
5. **Section-Based**: Intersection Observer for engagement tracking

## 🚀 Essential Commands

### Development
```bash
npm start              # Start dev server (runs fetch.js + react-scripts)
npm run build         # Build for production (with data fetching)
npm run validate-build # Format check + build
npm test              # Run tests
```

### Code Quality
```bash
npm run format        # Prettier formatting
npm run check-format  # Format validation
npm run health-check  # Content and SEO validation
```

### Deployment
```bash
npm run predeploy     # Build before deploy
npm run deploy        # Deploy to GitHub Pages
npm run deployment-health # Post-deployment validation
```

### Data Management
```bash
# Environment setup required for data fetching
npm start  # Triggers fetch.js automatically
```

## 🔧 Environment Variables

Required for GitHub integration:
```env
GITHUB_USERNAME=samehshi
GITHUB_TOKEN=your_token
USE_GITHUB_DATA=true
MEDIUM_USERNAME=sameh_shi
USE_MEDIUM_DATA=true
```

## 🎯 Common Tasks

### Updating Content
1. **All content**: Edit `src/portfolio.js`
2. **Analytics events**: Modify `src/utils/analytics.js`
3. **Styling**: Update `src/_globalColor.scss` for colors
4. **Components**: Located in `src/containers/` by section

### Adding Projects
Edit `bigProjects` array in `src/portfolio.js`:
```javascript
{
  image: importedImage,
  projectName: "Project Title",
  projectDesc: "Description",
  footerLink: [{ name: "View", url: "link" }]
}
```

### Customizing Analytics
- Events: `src/utils/analytics.js:portfolioEvents`
- Initialize: `src/App.js:useEffect`
- Track sections: `src/containers/Main.js:IntersectionObserver`

### Theme Customization
- Colors: `src/_globalColor.scss`
- Toggle logic: `src/containers/Main.js:changeTheme`
- Context: `src/contexts/StyleContext`

## 📊 Analytics Implementation

The portfolio has comprehensive tracking:
- **Page views** and **engagement time**
- **Section visibility** via Intersection Observer
- **Project interactions** and **social clicks**
- **Theme changes** and **resume downloads**
- **Error tracking** and **performance metrics**

All events use GA4 with privacy-compliant configuration.

## ⚠️ Important Notes

1. **fetch.js runs on every build** - ensures fresh GitHub/Medium data
2. **Analytics initialized in App.js** - tracks everything from load
3. **Theme persists via localStorage** - use `useLocalStorage` hook
4. **All sections tracked** - Intersection Observer in Main.js
5. **Prettier enforced** - run `npm run format` before commits

## 🔍 File Locations by Function

- **Content**: `src/portfolio.js` (all text/content)
- **Layout**: `src/containers/Main.js`
- **Analytics**: `src/utils/analytics.js`
- **Data Fetching**: `fetch.js`
- **Theme**: `src/_globalColor.scss` + `src/contexts/`
- **Tests**: `src/App.test.js`, `src/setupTests.js`
- **Validation**: `validate-seo.js`, `validate-content.js`

## 🛠️ Dependencies

- React 16.10.2 with Hooks
- react-ga4 for Google Analytics
- lottie-react for animations
- react-helmet-async for SEO
- gh-pages for deployment
- Prettier for formatting