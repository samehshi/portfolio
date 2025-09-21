/* Optimized Personal Portfolio Config for Sameh Shehata Abdelaziz */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

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
    "IMPACTFUL DATA SCIENCE PROJECTS DELIVERED ACROSS MULTIPLE INDUSTRIES",
  projects: [
    {
      image: require("./assets/images/manOnTable.svg"),
      projectName:
        "Cyclistic Bike-Sharing Data Analysis for Marketing Strategy Development",
      projectDesc:
        "This project, undertaken as part of the Google Data Analytics Professional Certificate, focuses on analyzing data from Cyclistic, a fictional bike-sharing company. The project's objective is to identify usage patterns among different customer types and leverage these insights to inform the development of a new marketing strategy. The primary goal of the new strategy is to convert casual riders into annual members, thereby increasing long-term customer engagement and revenue.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/google-data-analytics-capstone-project-case-1"
        }
      ]
    },
    {
      image: require("./assets/images/codeInLogo.webp"),
      projectName: "Technology Trends Dashboard",
      projectDesc:
        "This project aims to develop an interactive dashboard that provides valuable insights into current technology usage and future trends. Leveraging survey data collected from developers worldwide, the dashboard will offer a comprehensive overview of the evolving technology landscape. The dashboard will be structured into three main tabs, each focusing on a distinct perspective of technology trends.",
      footerLink: [
        {
          name: "View on Google Drive",
          url: "https://drive.google.com/file/d/1ly2cUboZKZucsAqcTIz7YonYMSLAJ1C0/preview"
        }
      ]
    },
    {
      image: require("./assets/images/contactMail.webp"),
      projectName:
        "Employee Turnover Analysis and Retention Strategy Development at Salifort Motors",
      projectDesc:
        "Salifort Motors is experiencing a high rate of employee turnover, impacting productivity, team morale, and overall business performance. This project aims to analyze the company's employee dataset to identify the key factors contributing to this turnover. The project's objective is to develop data-driven recommendations and strategies for improving employee retention and mitigating the negative impacts of turnover on the organization. This project is commissioned by the HR department.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/google-advanced-da-salifort-motors-project"
        }
      ]
    },
    {
      image: require("./assets/images/skill.svg"),
      projectName:
        "Accenture North America Data Analytics and Visualization Project",
      projectDesc:
        "As a Data Analyst at Accenture, I cleaned, modeled, and analyzed 7 datasets to uncover insights into content trends to inform strategic decisions. Prepared a PowerPoint deck and video presentation to communicate key insights for the client and internal stakeholders.",
      footerLink: []
    },
    {
      image: require("./assets/images/housingProject.webp"),
      projectName:
        "Real Estate Market Analysis Uncovering Price Drivers in Mexico and Brazil",
      projectDesc:
        "An analysis of the real estate markets in Mexico and Brazil to identify the key factors that influence property prices.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/uncovering-price-drivers-in-mexico-and-brazil"
        }
      ]
    },
    {
      image: require("./assets/images/housingProject.webp"),
      projectName: "Predicting Apartment Prices in Buenos Aires",
      projectDesc:
        "A machine learning project to predict apartment prices in Buenos Aires based on property listings.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/predicting-apartment-prices-in-buenos-aires"
        }
      ]
    },
    {
      image: require("./assets/images/aviationProject.webp"),
      projectName: "Predictive Modeling of Air Quality in Nairobi, Kenya",
      projectDesc:
        "A machine learning project to predict air quality in Nairobi, Kenya.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/predictive-modeling-of-air-quality-in-nairobi"
        }
      ]
    },
    {
      image: require("./assets/images/earthquakeProject.jpeg"),
      projectName: "Predicting Earthquake Damage: A Case Study in Nepal",
      projectDesc:
        "A machine learning project to predict the level of damage to buildings caused by the 2015 Gorkha earthquake in Nepal.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/predicting-earthquake-damage"
        }
      ]
    },
    {
      image: require("./assets/images/bankruptcyProject.webp"),
      projectName: "Predicting Corporate Bankruptcy in Poland",
      projectDesc:
        "A machine learning project to predict corporate bankruptcy using financial data from Polish companies.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/predicting-corporate-bankruptcy-in-poland"
        }
      ]
    },
    {
      image: require("./assets/images/contactMail.webp"),
      projectName:
        "Project Report: Improving Applicant Engagement through A/B Testing",
      projectDesc:
        "An analysis of factors influencing applicant engagement and strategies for optimization.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/improving-applicant-engagement"
        }
      ]
    },
    {
      image: require("./assets/images/worldquantLogo.webp"),
      projectName: "Stock Volatility Forecasting",
      projectDesc:
        "A machine learning project to predict stock volatility using various time series models.",
      footerLink: [
        {
          name: "View on Kaggle",
          url: "https://www.kaggle.com/samehshehata/stock-volatility-forecasting"
        }
      ]
    },
    {
      image: require("./assets/images/microsoftLogo.webp"),
      projectName: "Power BI Dashboard Portfolio",
      projectDesc:
        "Interactive business intelligence dashboards showcasing advanced Power BI capabilities for data visualization, KPI tracking, and executive reporting",
      footerLink: []
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
    {
      title: "Advanced Data Analytics",
      subtitle: "Google, 2024. Advanced topics in data analytics.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      imageAlt: "Google Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "#"
        }
      ]
    },
    {
      title: "Business Intelligence",
      subtitle:
        "Google, 2024. Professional certification in Business Intelligence.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      imageAlt: "Google Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "#"
        }
      ]
    },
    {
      title: "Cloud Data Analytics",
      subtitle:
        "Google, 2024. Professional certification in Cloud Data Analytics.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      imageAlt: "Google Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "#"
        }
      ]
    },
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
          url: "https://www.credly.com/badges/your-google-cert"
        }
      ]
    },
    {
      title: "Advanced Data Analytics",
      subtitle:
        "IBM, 2023. Advanced training in predictive modeling, statistical analysis, and business intelligence.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      imageAlt: "IBM Logo",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.credly.com/badges/your-ibm-cert"
        }
      ]
    },
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
          url: "https://learn.microsoft.com/api/credentials/share/your-link"
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
          url: "https://learn.microsoft.com/api/credentials/share/your-fabric-cert"
        }
      ]
    },
    {
      title: "Applied Data Science Labs",
      subtitle:
        "WorldQuant University, 2024. Hands-on application of machine learning to real-world business problems.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/76/WQU_logo.jpg",
      imageAlt: "WorldQuant University Logo",
      footerLink: [
        {
          name: "Program Details",
          url: "https://worldquantuniversity.org/data-science"
        }
      ]
    },
    {
      title: "Forward Program",
      subtitle:
        "McKinsey, 2024. A professional development program focusing on soft skills and problem-solving methodologies.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/McKinsey_Quarterly_logo.png",
      imageAlt: "McKinsey Logo",
      footerLink: [
        {
          name: "About Program",
          url: "https://www.mckinsey.com/capabilities/forward/overview"
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
