import React, {useEffect, useState} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import SEO, {seoConfigs} from "../components/SEO/SEO";
import Analytics from "../utils/analytics";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import "./Main.scss";

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);
  // eslint-disable-next-line no-unused-vars
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  useEffect(() => {
    // Track section visibility using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName =
            entry.target.id || entry.target.className.split(" ")[0];
          setCurrentSection(sectionName);
          Analytics.portfolioEvents.viewSection(sectionName);
        }
      });
    }, observerOptions);

    // Observe all main sections
    const sections = document.querySelectorAll(
      "[id], section, .main-content > div"
    );
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [isShowingSplashAnimation]);

  const changeTheme = () => {
    setIsDark(!isDark);
    Analytics.portfolioEvents.toggleTheme(isDark ? "light" : "dark");
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        <SEO {...seoConfigs.home} />
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <section id="greeting">
              <Greeting />
            </section>
            <section id="skills">
              <Skills />
            </section>
            <section id="skillProgress">
              <StackProgress />
            </section>
            <section id="education">
              <Education />
            </section>
            <section id="experience">
              <WorkExperience />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="startupProjects">
              <StartupProject />
            </section>
            <section id="achievements">
              <Achievement />
            </section>
            <section id="blogs">
              <Blogs />
            </section>
            <section id="talks">
              <Talks />
            </section>
            <section id="twitter">
              <Twitter />
            </section>
            <section id="podcast">
              <Podcast />
            </section>
            <section id="contact">
              <Profile />
            </section>
            <Footer />
            <ScrollToTopButton />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
