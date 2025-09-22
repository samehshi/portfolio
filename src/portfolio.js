/* Optimized Personal Portfolio Config for Sameh Shehata Abdelaziz */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Import project images
import manOnTable from "./assets/images/manOnTable.svg";
import codeInLogo from "./assets/images/codeInLogo.webp";
import contactMail from "./assets/images/contactMail.webp";
import skill from "./assets/images/skill.svg";
import housingProject from "./assets/images/housingProject.webp";
import earthquakeProject from "./assets/images/earthquakeProject.jpeg";
import bankruptcyProject from "./assets/images/bankruptcyProject.webp";
import worldquantLogo from "./assets/images/worldquantLogo.webp";
import microsoftLogo from "./assets/images/microsoftLogo.webp";
import developerActivity from "./assets/images/developerActivity.svg";

// Splash Screen
const splashScreen = {
  enabled: false, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section
const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Sameh Shehata Abdelaziz",
  title: "Hi all, I'm Sameh",
  subTitle: emoji(
    "Experienced Data Scientist & BI Analyst with 15+ years of expertise transforming complex datasets into actionable business insights. 📊 Specializing in advanced analytics, AI/ML, and business intelligence solutions that drive organizational success and data-driven decision making."
  ),
  resumeLink: "/Abdelaziz_Sameh_Data_Resume.pdf", // CV Download Link
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links
const socialMediaLinks = {
  github: "https://github.com/samehshi",
  linkedin: "https://www.linkedin.com/in/sameh-shihata/",
  gmail: "samehshihata@gmail.com",
  medium: "https://medium.com/@sameh_shi",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section
const skillsSection = {
  title: "What I do",
  subTitle: "DATA SCIENTIST & BI ANALYST | AI/ML SPECIALIST",
  skills: [
    emoji(
      "⚡ Develop comprehensive data strategies including predictive analytics, customer segmentation, and statistical modeling"
    ),
    emoji(
      "⚡ Build and deploy AI & Machine Learning models for regression, classification, forecasting, and business optimization"
    ),
    emoji(
      "⚡ Design and implement BI solutions using Power BI, Tableau, and Looker for executive reporting and KPI tracking"
    ),
    emoji(
      "⚡ Orchestrate end-to-end data pipelines with cloud platforms (AWS, Azure) and modern tools (Python, R, SQL)"
    )
  ],
  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "R Programming",
      fontAwesomeClassname: "fab fa-r-project"
    },
    {
      skillName: "SQL",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Power BI",
      fontAwesomeClassname: "fas fa-chart-line"
    },
    {
      skillName: "Tableau",
      fontAwesomeClassname: "fas fa-chart-pie"
    },
    {
      skillName: "Looker",
      fontAwesomeClassname: "fas fa-chart-bar"
    },
    {
      skillName: "Microsoft Fabric",
      fontAwesomeClassname: "fab fa-microsoft"
    },
    {
      skillName: "Machine Learning",
      fontAwesomeClassname: "fas fa-robot"
    },
    {
      skillName: "BigQuery",
      fontAwesomeClassname: "fas fa-cloud"
    },
    {
      skillName: "AWS",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "Azure",
      fontAwesomeClassname: "fab fa-microsoft"
    },
    {
      skillName: "TensorFlow",
      fontAwesomeClassname: "fas fa-brain"
    },
    {
      skillName: "scikit-learn",
      fontAwesomeClassname: "fas fa-cogs"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git-alt"
    },
    {
      skillName: "Jupyter",
      fontAwesomeClassname: "fas fa-code"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section
const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Ain Shams University",
      logo: require("./assets/images/ainShamsLogo.png"),
      subHeader: "B.Sc. Chemistry and Microbiology",
      duration: "2004 — 2008",
      desc: "Graduated with a strong foundation in scientific research methodology, analytical chemistry, and statistical analysis.",
      descBullets: [
        "Developed expertise in quantitative analysis and experimental design",
        "Built a strong foundation in statistical methods and data interpretation"
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience
const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Data Science & Analytics",
      progressPercentage: "95%"
    },
    {
      Stack: "Business Intelligence & Visualization",
      progressPercentage: "90%"
    },
    {
      Stack: "AI/ML & Cloud Computing",
      progressPercentage: "85%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section
const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Freelance Data Scientist & BI Analyst",
      company: "Upwork & Independent Clients",
      companylogo: require("./assets/images/upworkLogo.png"),
      date: "2020 — Present",
      desc: "Delivering end-to-end data science solutions and business intelligence dashboards for global clients across finance, retail, healthcare, and technology sectors.",
      descBullets: [
        "Designed and deployed 50+ interactive Power BI and Tableau dashboards presenting KPIs for C-level executives and operational teams.",
        "Developed automated ETL/ELT data workflows using Python, R, and SQL, reducing data processing times by 30-40% and improving data quality.",
        "Built predictive models and ML algorithms that increased client ROI by up to 25% through customer segmentation, demand forecasting, and risk assessment.",
        "Implemented cloud-based analytics solutions on AWS, Azure, and Google Cloud, enabling scalable data processing for enterprise clients."
      ]
    },
    {
      role: "Data Services Officer - Aeronautical Navigation",
      company: "NANSC (National Air Navigation Services Company), Cairo",
      companylogo: require("./assets/images/nanscLogo.png"),
      date: "2009 — Present",
      desc: "Leading data analysis and systems optimization for critical air navigation infrastructure, ensuring operational safety and regulatory compliance in Egypt's airspace management.",
      descBullets: [
        "Analyzed complex air traffic and navigation datasets to identify operational bottlenecks, reducing communication risks by 15% and enhancing flight safety protocols.",
        "Developed data-driven insights and reporting systems that support mission-critical decision-making for air traffic control operations.",
        "Optimized air navigation systems through statistical analysis and process improvement methodologies, ensuring compliance with international aviation standards.",
        "Created automated monitoring and alerting systems for real-time air traffic data, improving response times and operational efficiency."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */
const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on
const bigProjects = {
  title: "Featured Projects",
  subtitle:
    "IMPACTFUL DATA SCIENCE PROJECTS ACROSS ANALYTICS, BUSINESS INTELLIGENCE & MACHINE LEARNING",
  projects: [
    // === DATA ANALYTICS & BUSINESS INTELLIGENCE ===
    {
      image: manOnTable,
      projectName:
        "Cyclistic Bike-Sharing Data Analysis for Marketing Strategy Development",
      projectDesc:
        "Comprehensive analysis of bike-sharing usage patterns to develop data-driven marketing strategies. This Google Data Analytics capstone project identifies key differences between casual riders and annual members, providing actionable insights to convert casual users into long-term subscribers and increase revenue.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/google-data-analytics-capstone-project-case-1"
        }
      ]
    },
    {
      image: codeInLogo,
      projectName: "Technology Trends Dashboard - Developer Survey Analysis",
      projectDesc:
        "Interactive BI dashboard analyzing global developer survey data to reveal technology adoption trends, skill demands, and industry insights. Features comprehensive visualizations of programming languages, frameworks, and tools usage across different regions and experience levels.",
      footerLink: [
        {
          name: "View Dashboard",
          url: "https://drive.google.com/file/d/1ly2cUboZKZucsAqcTIz7YonYMSLAJ1C0/preview"
        }
      ]
    },
    {
      image: contactMail,
      projectName:
        "Employee Turnover Analysis and Retention Strategy - Salifort Motors",
      projectDesc:
        "Advanced analytics project addressing high employee turnover through predictive modeling and statistical analysis. Developed data-driven retention strategies and identified key factors contributing to turnover, resulting in actionable recommendations for HR policy optimization.",
      footerLink: [
        {
          name: "View Analysis",
          url: "https://www.kaggle.com/samehshehata/google-advanced-da-salifort-motors-project"
        }
      ]
    },
    {
      image: skill,
      projectName: "Content Trends Analysis - Accenture Data Analytics Project",
      projectDesc:
        "Cleaned, modeled, and analyzed 7 datasets to uncover strategic content insights for Accenture. Delivered executive presentations with key findings on content performance, user engagement patterns, and strategic recommendations for content optimization.",
      footerLink: []
    },
    {
      image: microsoftLogo,
      projectName: "Power BI Dashboard Portfolio - Executive Reporting Suite",
      projectDesc:
        "Comprehensive collection of interactive business intelligence dashboards showcasing advanced Power BI capabilities. Features KPI tracking, executive reporting, financial analysis, and operational dashboards with modern design and seamless user experience.",
      footerLink: []
    },

    // === MACHINE LEARNING & PREDICTIVE ANALYTICS ===
    {
      image: earthquakeProject,
      projectName: "Earthquake Damage Prediction - Nepal Case Study",
      projectDesc:
        "Machine learning classification model predicting building damage levels from the 2015 Gorkha earthquake. Utilized ensemble methods and feature engineering to achieve high accuracy in disaster impact assessment, supporting emergency response and reconstruction planning.",
      footerLink: [
        {
          name: "View Project",
          url: "https://www.kaggle.com/samehshehata/predicting-earthquake-damage"
        }
      ]
    },
    {
      image: bankruptcyProject,
      projectName: "Corporate Bankruptcy Prediction - Polish Market Analysis",
      projectDesc:
        "Advanced machine learning model for financial risk assessment using ensemble techniques and feature selection. Achieved robust performance in predicting corporate bankruptcy using financial indicators, supporting investment decision-making and risk management.",
      footerLink: [
        {
          name: "View Analysis",
          url: "https://www.kaggle.com/samehshehata/predicting-corporate-bankruptcy-in-poland"
        }
      ]
    },
    {
      image: developerActivity,
      projectName: "Air Quality Prediction - Nairobi Environmental Analysis",
      projectDesc:
        "Time series forecasting model for air quality prediction using environmental sensors data. Implemented advanced regression techniques and feature engineering to predict PM2.5 levels, supporting environmental monitoring and public health initiatives.",
      footerLink: [
        {
          name: "View Project",
          url: "https://www.kaggle.com/samehshehata/predictive-modeling-of-air-quality-in-nairobi"
        }
      ]
    },
    {
      image: worldquantLogo,
      projectName: "Stock Volatility Forecasting - Financial Time Series",
      projectDesc:
        "Sophisticated quantitative model for predicting stock market volatility using GARCH models and machine learning techniques. Developed as part of WorldQuant Applied Data Science program, focusing on financial risk assessment and portfolio optimization.",
      footerLink: [
        {
          name: "View Analysis",
          url: "https://www.kaggle.com/samehshehata/stock-volatility-forecasting"
        }
      ]
    },

    // === REAL ESTATE & PRICING ANALYTICS ===
    {
      image: housingProject,
      projectName:
        "Real Estate Market Analysis - Mexico and Brazil Price Drivers",
      projectDesc:
        "Comprehensive market analysis identifying key factors influencing property prices across Mexican and Brazilian real estate markets. Used statistical modeling and comparative analysis to uncover regional pricing patterns and investment opportunities.",
      footerLink: [
        {
          name: "View Study",
          url: "https://www.kaggle.com/samehshehata/uncovering-price-drivers-in-mexico-and-brazil"
        }
      ]
    },
    {
      image: housingProject,
      projectName: "Apartment Price Prediction - Buenos Aires Market",
      projectDesc:
        "Machine learning model for real estate price prediction in Buenos Aires using property characteristics and location data. Implemented regression techniques with feature engineering to achieve accurate price forecasting for property investment decisions.",
      footerLink: [
        {
          name: "View Model",
          url: "https://www.kaggle.com/samehshehata/predicting-apartment-prices-in-buenos-aires"
        }
      ]
    },

    // === BUSINESS OPTIMIZATION ===
    {
      image: contactMail,
      projectName: "A/B Testing Optimization - Applicant Engagement Analysis",
      projectDesc:
        "Statistical analysis of user engagement optimization through controlled A/B testing. Identified key factors influencing applicant behavior and developed strategies for improving conversion rates and user experience metrics.",
      footerLink: [
        {
          name: "View Report",
          url: "https://www.kaggle.com/samehshehata/improving-applicant-engagement"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Professional Certifications, Awards, and Milestones in Data Analytics and AI",

  achievementsCards: [
    // === GOOGLE CERTIFICATIONS ===
    {
      title: "Data Analytics Professional Certificate",
      subtitle:
        "Google, 2023. Comprehensive certification covering data cleaning, visualization, SQL, and applied analytics.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      imageAlt: "Google Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.credly.com/badges/850db187-7a2d-408f-b780-da7cebda2f21/public_url"
        }
      ]
    },
    {
      title: "Advanced Data Analytics",
      subtitle:
        "Google, 2024. Advanced topics in statistical modeling, machine learning, and predictive analytics.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      imageAlt: "Google Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.credly.com/badges/1e7fec78-1157-48e6-90d9-5c8000198e33/public_url"
        }
      ]
    },
    {
      title: "Business Intelligence",
      subtitle:
        "Google, 2024. Professional certification in Business Intelligence, data warehousing, and enterprise analytics.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      imageAlt: "Google Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.credly.com/badges/afebee12-5f41-48d5-bb63-5ff08326eaba/public_url"
        }
      ]
    },
    {
      title: "Cloud Data Analytics",
      subtitle:
        "Google, 2024. Professional certification in Cloud Data Analytics, BigQuery, and GCP data services.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      imageAlt: "Google Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.credly.com/badges/bf286a16-3571-4f3b-875c-928694459894/public_url"
        }
      ]
    },

    // === MICROSOFT CERTIFICATIONS ===
    {
      title: "Power BI Data Analyst Associate (PL-300)",
      subtitle:
        "Microsoft, 2024. Demonstrates expertise in designing, building, and deploying BI solutions with Power BI.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      imageAlt: "Microsoft Logo",
      footerLink: [
        {
          name: "Verify Certificate",
          url: "https://learn.microsoft.com/api/credentials/share/en-us/SamehShehata-8562/9916649599296A4?sharingId=D0B225F017B4C349"
        }
      ]
    },
    {
      title: "Fabric Analytics Engineer Associate (DP-600)",
      subtitle:
        "Microsoft, 2025. Validates advanced skills in Microsoft Fabric for enterprise-scale analytics and AI.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      imageAlt: "Microsoft Fabric Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://learn.microsoft.com/api/credentials/share/en-us/SamehShehata-8562/8E39FFDEBB97FC47?sharingId=D0B225F017B4C349"
        }
      ]
    },

    // === INDUSTRY RECOGNITION & PROGRAMS ===
    {
      title: "Advanced Data Analytics",
      subtitle:
        "IBM, 2023. Advanced training in predictive modeling, statistical analysis, and business intelligence.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      imageAlt: "IBM Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.credly.com/badges/68a96644-fcc3-4340-85bf-d8f3f9de0339/public_url"
        }
      ]
    },
    {
      title: "Applied Data Science Labs",
      subtitle:
        "WorldQuant University, 2024. Hands-on application of machine learning to real-world financial and business problems.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/76/WQU_logo.jpg",
      imageAlt: "WorldQuant University Logo",
      footerLink: [
        {
          name: "Program Details",
          url: "https://www.credly.com/badges/927d2d78-8b77-4476-97eb-42386e9c2eee/public_url"
        }
      ]
    },
    {
      title: "Forward Program",
      subtitle:
        "McKinsey, 2024. A professional development program focusing on soft skills, leadership, and problem-solving methodologies.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/McKinsey_Quarterly_logo.png",
      imageAlt: "McKinsey Logo",
      footerLink: [
        {
          name: "About Program",
          url: "https://www.credly.com/badges/75daa6d5-a645-44c2-9488-a41a002c1a4e/public_url"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section
const blogSection = {
  title: "Blogs",
  subtitle:
    "Sharing knowledge and insights on data analytics, AI, and business intelligence.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://medium.com/@sameh_shi/predictive-analytics-in-aviation",
      title: "Predictive Analytics in Aviation: Enhancing Safety Through Data",
      description:
        "Exploring how advanced analytics and machine learning can revolutionize aviation safety and operational efficiency."
    },
    {
      url: "https://medium.com/@sameh_shi/power-bi-best-practices",
      title: "Power BI Best Practices for Enterprise Dashboards",
      description:
        "A comprehensive guide to building scalable, performant, and user-friendly business intelligence dashboards."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections
const talkSection = {
  title: "TALKS & PRESENTATIONS",
  subtitle: emoji("SHARING KNOWLEDGE ON DATA ANALYTICS AND AI 🎤"),
  talks: [
    {
      title: "AI in Aviation: Data-Driven Safety Enhancement",
      subtitle: "Cairo Data Science Meetup 2024",
      slides_url: "#",
      event_url: "#"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section
const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "DISCUSSING DATA ANALYTICS, AI, AND INDUSTRY INSIGHTS",
  podcast: [],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+201274766641",
  email_address: "samehshihata@gmail.com"
};

// Twitter Section
const twitterDetails = {
  userName: "sameh_shi", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set true if you are looking for opportunities

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
