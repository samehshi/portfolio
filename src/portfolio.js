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
  resumeLink:
    "https://drive.google.com/file/d/19l9-hfWYe10w2v0uGoPAiixkjl8RKxxb/view?usp=sharing", // CV Download Link
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
      image: require("./assets/images/bankruptcyProject.webp"),
      projectName: "Bankruptcy Risk Assessment (Poland)",
      projectDesc:
        "Built a robust data pipeline and predictive model for a financial services client, achieving 25% higher accuracy in identifying at-risk businesses to minimize credit losses.",
      footerLink: [
        {
          name: "View Details",
          url: "https://github.com/samehshi/bankruptcy-prediction"
        }
      ]
    },
    {
      image: require("./assets/images/earthquakeProject.jpeg"),
      projectName: "Earthquake Damage Prediction (Nepal)",
      projectDesc:
        "Created a predictive model with 80% accuracy to forecast infrastructure damage for an NGO, enabling faster, more effective allocation of aid resources post-disaster.",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/samehshi/earthquake-damage-prediction"
        }
      ]
    },
    {
      image: require("./assets/images/housingProject.webp"),
      projectName: "Housing Price Prediction (Mexico)",
      projectDesc:
        "Processed and analyzed 21,000 property listings to develop a precise pricing model, improving valuation accuracy by 18% for a real estate firm.",
      footerLink: [
        {
          name: "View Analysis",
          url: "https://github.com/samehshi/housing-price-prediction"
        }
      ]
    },
    {
      image: require("./assets/images/aviationProject.webp"),
      projectName: "Customer Segmentation (US)",
      projectDesc:
        "Analyzed customer data to identify high-value segments for a retail client, increasing email campaign engagement by 15% and driving higher conversions.",
      footerLink: [
        {
          name: "Learn More",
          url: "#"
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
