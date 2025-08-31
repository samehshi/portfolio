# 🚀 Developer Portfolio - Sameh Shehata Abdelaziz

[![Build and Deploy Portfolio](https://github.com/samehshi/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/samehshi/portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-16.10.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)

A modern, responsive, and feature-rich developer portfolio showcasing skills, projects, and achievements. Built with React and deployed automatically to GitHub Pages.

## ✨ Live Demo

🌐 **Visit the live portfolio**: [samehshi.github.io/portfolio](https://samehshi.github.io/portfolio)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Customization](#customization)
- [API Integrations](#api-integrations)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## ✨ Features

### 🎨 **Design & UI**
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Dark/Light Theme**: Toggle between themes with preference persistence
- **Modern Animations**: Smooth Lottie animations and React transitions
- **Clean Typography**: Professional and readable font choices

### 📊 **Dynamic Content**
- **GitHub Integration**: Automatically fetches and displays pinned repositories
- **Medium Blog Integration**: Pulls latest blog posts from Medium
- **Social Media Links**: Integrated social media presence
- **Interactive Sections**: Skills, experience, education, and achievements

### 🚀 **Performance & SEO**
- **Fast Loading**: Optimized build and asset compression
- **SEO Friendly**: Meta tags, Open Graph, and structured data
- **Progressive Web App**: Offline capabilities and app-like experience
- **Analytics Ready**: Easy integration with Google Analytics

### 🔧 **Developer Experience**
- **Easy Configuration**: Single file configuration (`portfolio.js`)
- **Hot Reload**: Instant updates during development
- **Automated Deployment**: GitHub Actions for seamless deployment
- **Code Quality**: ESLint, Prettier, and automated formatting

## 🛠 Technologies Used

### **Frontend**
- **React** 16.10.2 - Component-based UI library
- **Sass** - Advanced CSS with variables and nesting
- **React Router** - Client-side routing
- **Lottie React** - High-quality animations

### **Build & Development**
- **Create React App** - Zero-configuration setup
- **Node.js** 18.x - JavaScript runtime
- **npm** - Package management
- **Prettier** - Code formatting

### **Deployment & CI/CD**
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated deployment pipeline
- **gh-pages** - Deployment utility

### **External APIs**
- **GitHub GraphQL API** - Repository and profile data
- **Medium RSS API** - Blog post integration
- **Font Awesome** - Icon library

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v6.9.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samehshi/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your values (see Configuration section)
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
# GitHub Integration (Required for GitHub features)
REACT_APP_GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_USERNAME=samehshi
USE_GITHUB_DATA=true

# Medium Integration (Optional)
MEDIUM_USERNAME=sameh_shi

# Build Configuration
CI=false
```

### GitHub Personal Access Token

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `public_repo` - Access public repositories
   - `read:user` - Read user profile data
4. Copy the token to your `.env` file

### Portfolio Configuration

Edit `src/portfolio.js` to customize your portfolio content:

```javascript
// Update with your information
const greeting = {
  username: "Your Name",
  title: "Hi all, I'm [Your Name]",
  subTitle: "Your professional summary here...",
  resumeLink: "link-to-your-resume",
  displayGreeting: true
};

// Add your skills
const skillsSection = {
  title: "What I do",
  subTitle: "YOUR TITLE HERE",
  skills: [
    "🚀 Your skill description 1",
    "⚡ Your skill description 2"
  ],
  // ... rest of configuration
};
```

## 🚀 Deployment

### Automatic Deployment (Recommended)

The portfolio automatically deploys to GitHub Pages using GitHub Actions:

1. **Fork/Clone this repository**
2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch
3. **Configure Secrets** (if needed):
   - Go to Settings > Secrets and variables > Actions
   - Add `GITHUB_TOKEN` (usually auto-generated)
4. **Push to main branch**:
   ```bash
   git push origin main
   ```

The workflow will:
- Install dependencies
- Fetch GitHub/Medium data
- Build the React application
- Deploy to `gh-pages` branch
- Update GitHub Pages

### Manual Deployment

```bash
# Build and deploy manually
npm run build
npm run deploy
```

### Custom Domain (Optional)

1. Add a `CNAME` file to the `public/` directory:
   ```
   yourdomain.com
   ```
2. Configure your domain's DNS settings
3. Update the `homepage` in `package.json`

## 🎨 Customization

### Theme Customization

Edit `src/_globalColor.scss` to customize colors:

```scss
/* Global Color Variables */
$primaryColor: #55198b;        // Primary brand color
$primaryColorDark: #003d82;    // Dark theme primary
$secondaryColor: #7209b7;      // Secondary accent color
$backgroundColor: #ffffff;      // Background color
$textColor: #000000;          // Text color

/* Add your custom color palette */
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Add corresponding styles in `src/components/[component]/[component].scss`
3. Import and use in `src/containers/Main.js`
4. Configure in `src/portfolio.js`

### Custom Animations

Replace or add Lottie animations:

1. Download animation from [LottieFiles](https://lottiefiles.com/)
2. Place in `src/assets/lottie/`
3. Import in `src/portfolio.js`:
   ```javascript
   import yourAnimation from "./assets/lottie/yourAnimation.json";
   ```

## 🔌 API Integrations

### GitHub Integration

Fetches and displays:
- Profile information (name, bio, avatar)
- Pinned repositories with stats
- Contribution activity

**Configuration in `fetch.js`:**
```javascript
// Customize GitHub data fetching
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
```

### Medium Integration

Displays recent blog posts with:
- Article titles and descriptions
- Publication dates
- Read time estimates
- Featured images

**Setup:**
1. Set `MEDIUM_USERNAME` in `.env`
2. Ensure public Medium profile
3. Enable RSS feed access

### Social Media Integration

Supported platforms:
- GitHub
- LinkedIn  
- Twitter
- Medium
- Instagram
- Email

Configure in `portfolio.js`:
```javascript
const socialMediaLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  gmail: "your.email@gmail.com",
  // ... other platforms
};
```

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # React components
│   ├── containers/        # Page containers
│   ├── contexts/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── assets/           # Images, animations, icons
│   ├── portfolio.js      # Main configuration file
│   ├── App.js           # Root component
│   └── index.js         # Application entry point
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── package.json         # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md          # Project documentation
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

### Mobile Optimizations
- Touch-friendly navigation
- Optimized image sizes
- Condensed layouts
- Fast loading times

## 🔧 Development

### Available Scripts

```bash
# Development
npm start              # Start development server
npm run build         # Build for production
npm test              # Run tests
npm run eject         # Eject from Create React App

# Code Quality
npm run format        # Format code with Prettier
npm run check-format  # Check code formatting

# Deployment  
npm run predeploy     # Pre-deployment build
npm run deploy        # Deploy to GitHub Pages
```

### Environment Setup

```bash
# Install Node.js dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development with hot reload
npm start

# Run tests in watch mode
npm test

# Build and serve production version locally
npm run build
npx serve -s build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Use descriptive commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Sameh Shehata Abdelaziz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 💬 Support

### Getting Help

- 📖 **Documentation**: Check this README and inline comments
- 🐛 **Issues**: [Create an issue](https://github.com/samehshi/portfolio/issues/new) for bugs
- 💡 **Feature Requests**: [Suggest new features](https://github.com/samehshi/portfolio/issues/new)
- 📧 **Contact**: samehshihata@gmail.com

### FAQ

**Q: Why isn't my GitHub data showing?**
A: Ensure your `REACT_APP_GITHUB_TOKEN` is valid and has the correct scopes.

**Q: How do I add a custom domain?**
A: Add a `CNAME` file to `public/` folder and configure DNS settings.

**Q: Can I use this for commercial projects?**
A: Yes, this project is MIT licensed.

**Q: How do I update my resume link?**
A: Edit the `resumeLink` property in `src/portfolio.js`.

### Troubleshooting

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Deployment Issues:**
```bash
# Check GitHub Actions logs
# Verify environment variables
# Ensure gh-pages branch exists
```

## 🙏 Acknowledgments

- **Original Template**: Based on [developerFolio](https://github.com/saadpasta/developerFolio)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Animations**: [LottieFiles](https://lottiefiles.com/)
- **Hosting**: [GitHub Pages](https://pages.github.com/)

---

## 🎯 What's Next?

### Planned Features
- [ ] Blog integration with multiple platforms
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Enhanced accessibility features
- [ ] Performance monitoring

### Recent Updates
- ✅ GitHub Actions CI/CD pipeline
- ✅ Responsive design improvements  
- ✅ Enhanced GitHub integration
- ✅ Medium blog integration

---

<div align="center">

**⭐ Star this repository if it helped you build your portfolio!**

Made with ❤️ by [Sameh Shehata Abdelaziz](https://github.com/samehshi)

</div>