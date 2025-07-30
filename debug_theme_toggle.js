// Debug script for theme toggle functionality
console.log("=== Theme Toggle Debug Script ===");

// Check if the theme toggle button exists
const themeToggle = document.getElementById("light-toggle");
console.log("Theme toggle button found:", !!themeToggle);

if (themeToggle) {
  console.log("Button element:", themeToggle);
  console.log("Button innerHTML:", themeToggle.innerHTML);

  // Check the icons
  const darkIcon = document.getElementById("light-toggle-dark");
  const lightIcon = document.getElementById("light-toggle-light");
  console.log("Dark icon found:", !!darkIcon);
  console.log("Light icon found:", !!lightIcon);

  if (darkIcon) {
    console.log("Dark icon display:", window.getComputedStyle(darkIcon).display);
    console.log("Dark icon visibility:", window.getComputedStyle(darkIcon).visibility);
  }

  if (lightIcon) {
    console.log("Light icon display:", window.getComputedStyle(lightIcon).display);
    console.log("Light icon visibility:", window.getComputedStyle(lightIcon).visibility);
  }
}

// Check HTML attributes
console.log("HTML data-theme:", document.documentElement.getAttribute("data-theme"));
console.log("HTML data-theme-setting:", document.documentElement.getAttribute("data-theme-setting"));

// Check localStorage
console.log("localStorage theme:", localStorage.getItem("theme"));

// Check if theme functions exist
console.log("toggleThemeSetting function exists:", typeof toggleThemeSetting !== "undefined");
console.log("setThemeSetting function exists:", typeof setThemeSetting !== "undefined");
console.log("applyTheme function exists:", typeof applyTheme !== "undefined");
console.log("determineThemeSetting function exists:", typeof determineThemeSetting !== "undefined");
console.log("determineComputedTheme function exists:", typeof determineComputedTheme !== "undefined");

// Test the functions if they exist
if (typeof determineThemeSetting !== "undefined") {
  console.log("Current theme setting:", determineThemeSetting());
}

if (typeof determineComputedTheme !== "undefined") {
  console.log("Current computed theme:", determineComputedTheme());
}

// Add a test click handler
if (themeToggle) {
  console.log("Adding test click handler...");
  themeToggle.addEventListener("click", function (e) {
    console.log("=== THEME TOGGLE CLICKED ===");
    console.log("Event:", e);
    console.log("Before toggle - theme setting:", determineThemeSetting());
    console.log("Before toggle - HTML data-theme:", document.documentElement.getAttribute("data-theme"));
    console.log("Before toggle - HTML data-theme-setting:", document.documentElement.getAttribute("data-theme-setting"));

    // Call the toggle function
    if (typeof toggleThemeSetting !== "undefined") {
      toggleThemeSetting();

      // Check after toggle
      setTimeout(() => {
        console.log("After toggle - theme setting:", determineThemeSetting());
        console.log("After toggle - HTML data-theme:", document.documentElement.getAttribute("data-theme"));
        console.log("After toggle - HTML data-theme-setting:", document.documentElement.getAttribute("data-theme-setting"));
        console.log("After toggle - localStorage:", localStorage.getItem("theme"));

        // Check icon visibility
        const darkIcon = document.getElementById("light-toggle-dark");
        const lightIcon = document.getElementById("light-toggle-light");
        if (darkIcon) {
          console.log("After toggle - Dark icon display:", window.getComputedStyle(darkIcon).display);
        }
        if (lightIcon) {
          console.log("After toggle - Light icon display:", window.getComputedStyle(lightIcon).display);
        }
      }, 100);
    } else {
      console.error("toggleThemeSetting function not found!");
    }
  });
}

// Check CSS rules
console.log("=== CSS Rules Check ===");
const styleSheets = document.styleSheets;
let foundThemeRules = false;

for (let i = 0; i < styleSheets.length; i++) {
  try {
    const rules = styleSheets[i].cssRules || styleSheets[i].rules;
    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j];
      if (
        rule.selectorText &&
        (rule.selectorText.includes("light-toggle") || rule.selectorText.includes("data-theme-setting") || rule.selectorText.includes("data-theme"))
      ) {
        console.log("Found theme-related CSS rule:", rule.selectorText, rule.cssText);
        foundThemeRules = true;
      }
    }
  } catch (e) {
    // Skip stylesheets we can't access (CORS)
    console.log("Skipped stylesheet due to CORS:", styleSheets[i].href);
  }
}

if (!foundThemeRules) {
  console.warn("No theme-related CSS rules found!");
}

console.log("=== End Debug Script ===");
