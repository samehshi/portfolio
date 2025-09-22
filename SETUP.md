# Quick Setup Guide

This guide will help you set up your portfolio in under 10 minutes.

## 🚀 Quick Start (5 minutes)

### 1. Get Your Portfolio Running Locally

```bash
# Clone and setup
git clone https://github.com/samehshi/portfolio.git
cd portfolio
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start
```

Your portfolio will be running at `http://localhost:3000` 🎉

### 2. Basic Customization

Edit `src/portfolio.js` and update:

```javascript
// Your basic info
const greeting = {
  username: "Your Name Here",
  title: "Hi all, I'm [Your Name]",
  subTitle: "Your professional summary...",
  resumeLink: "link-to-your-resume"
};

// Your social links
const socialMediaLinks = {
  github: "https://github.com/samehshi",
  linkedin: "https://linkedin.com/in/yourprofile",
  gmail: "your.email@gmail.com"
};
```

### 3. Deploy to GitHub Pages

```bash
# Build and deploy
npm run build
npm run deploy
```

Your site will be live at `https://yourusername.github.io/portfolio` 🚀

## ⚙️ Enable GitHub Integration (Optional)

### 1. Create GitHub Personal Access Token

1. Go to [GitHub Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`, `read:user`
4. Copy the token

### 2. Update Environment Variables

Edit `.env` file:
```env
REACT_APP_GITHUB_TOKEN=your_token_here
USE_GITHUB_DATA=true
```

### 3. Rebuild and Deploy

```bash
npm run build
npm run deploy
```

Now your portfolio will automatically show your GitHub repositories and profile! 🎊

## 📝 Next Steps

- [ ] Add your projects to the `bigProjects` section
- [ ] Upload your logo images to `src/assets/images/`
- [ ] Customize colors in `src/_globalColor.scss`
- [ ] Add your achievements and certifications
- [ ] Set up Medium blog integration (optional)

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Create an issue if you encounter problems
- Email: samehshihata@gmail.com

---

**🎯 Pro Tip**: Start with the basic customization first, then enable integrations. This way you can see your portfolio working immediately!