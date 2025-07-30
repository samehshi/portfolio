// Has to be in the head tag, otherwise a flicker effect will occur.

// Toggle through light and dark theme settings.
// Has to be in the head tag, otherwise a flicker effect will occur.

// Toggle through light and dark theme settings.
let toggleThemeSetting = () => {
  let themeSetting = determineThemeSetting();
  console.log("toggleThemeSetting - current theme:", themeSetting);
  if (themeSetting == "light") {
    console.log("Switching to dark theme");
    setThemeSetting("dark");
  } else {
    console.log("Switching to light theme");
    setThemeSetting("light");
  }
};

// Change the theme setting and apply the theme.
let setThemeSetting = (themeSetting) => {
  console.log("setThemeSetting called with:", themeSetting);
  localStorage.setItem("theme", themeSetting);
  console.log("localStorage updated to:", localStorage.getItem("theme"));

  document.documentElement.setAttribute("data-theme-setting", themeSetting);
  console.log("data-theme-setting set to:", document.documentElement.getAttribute("data-theme-setting"));

  applyTheme();
};

// Apply the computed dark or light theme to the website.
let applyTheme = () => {
  let theme = determineComputedTheme();
  console.log("applyTheme called with computed theme:", theme);

  transTheme();
  setHighlight(theme);
  setGiscusTheme(theme);
  setSearchTheme(theme);

  // if mermaid is not defined, do nothing
  if (typeof mermaid !== "undefined") {
    setMermaidTheme(theme);
  }

  // if diff2html is not defined, do nothing
  if (typeof Diff2HtmlUI !== "undefined") {
    setDiff2htmlTheme(theme);
  }

  // if echarts is not defined, do nothing
  if (typeof echarts !== "undefined") {
    setEchartsTheme(theme);
  }

  // if vegaEmbed is not defined, do nothing
  if (typeof vegaEmbed !== "undefined") {
    setVegaLiteTheme(theme);
  }

  document.documentElement.setAttribute("data-theme", theme);

  // Add class to tables.
  let tables = document.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    if (theme == "dark") {
      tables[i].classList.add("table-dark");
    } else {
      tables[i].classList.remove("table-dark");
    }
  }

  // Set jupyter notebooks themes.
  let jupyterNotebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
  for (let i = 0; i < jupyterNotebooks.length; i++) {
    let bodyElement = jupyterNotebooks[i].getElementsByTagName("iframe")[0].contentWindow.document.body;
    if (theme == "dark") {
      bodyElement.setAttribute("data-jp-theme-light", "false");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Dark");
    } else {
      bodyElement.setAttribute("data-jp-theme-light", "true");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Light");
    }
  }

  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== "undefined") {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
    });
  }
};

let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
};

let setGiscusTheme = (theme) => {
  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
};

let addMermaidZoom = (records, observer) => {
  var svgs = d3.selectAll(".mermaid svg");
  svgs.each(function () {
    var svg = d3.select(this);
    svg.html("<g>" + svg.html() + "</g>");
    var inner = svg.select("g");
    var zoom = d3.zoom().on("zoom", function (event) {
      inner.attr("transform", event.transform);
    });
    svg.call(zoom);
  });
  observer.disconnect();
};

let setMermaidTheme = (theme) => {
  if (theme == "light") {
    // light theme name in mermaid is 'default'
    // https://mermaid.js.org/config/theming.html#available-themes
    theme = "default";
  }

  /* Re-render the SVG, based on https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_includes/mermaid.html */
  document.querySelectorAll(".mermaid").forEach((elem) => {
    // Get the code block content from previous element, since it is the mermaid code itself as defined in Markdown, but it is hidden
    let svgCode = elem.previousSibling.childNodes[0].innerHTML;
    elem.removeAttribute("data-processed");
    elem.innerHTML = svgCode;
  });

  mermaid.initialize({ theme: theme });
  window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));

  const observable = document.querySelector(".mermaid svg");
  if (observable !== null) {
    var observer = new MutationObserver(addMermaidZoom);
    const observerOptions = { childList: true };
    observer.observe(observable, observerOptions);
  }
};

let setDiff2htmlTheme = (theme) => {
  document.querySelectorAll(".diff2html").forEach((elem) => {
    // Get the code block content from previous element, since it is the diff code itself as defined in Markdown, but it is hidden
    let textData = elem.previousSibling.childNodes[0].innerHTML;
    elem.innerHTML = "";
    const configuration = { colorScheme: theme, drawFileList: true, highlight: true, matching: "lines" };
    const diff2htmlUi = new Diff2HtmlUI(elem, textData, configuration);
    diff2htmlUi.draw();
  });
};

let setEchartsTheme = (theme) => {
  document.querySelectorAll(".echarts").forEach((elem) => {
    // Get the code block content from previous element, since it is the echarts code itself as defined in Markdown, but it is hidden
    let jsonData = elem.previousSibling.childNodes[0].innerHTML;
    echarts.dispose(elem);

    if (theme === "dark") {
      var chart = echarts.init(elem, "dark-fresh-cut");
    } else {
      var chart = echarts.init(elem);
    }

    chart.setOption(JSON.parse(jsonData));
  });
};

let setVegaLiteTheme = (theme) => {
  document.querySelectorAll(".vega-lite").forEach((elem) => {
    // Get the code block content from previous element, since it is the vega lite code itself as defined in Markdown, but it is hidden
    let jsonData = elem.previousSibling.childNodes[0].innerHTML;
    elem.innerHTML = "";
    if (theme === "dark") {
      vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" });
    } else {
      vegaEmbed(elem, JSON.parse(jsonData));
    }
  });
};

let setSearchTheme = (theme) => {
  const ninjaKeys = document.querySelector("ninja-keys");
  if (!ninjaKeys) return;

  if (theme === "dark") {
    ninjaKeys.classList.add("dark");
  } else {
    ninjaKeys.classList.remove("dark");
  }
};

let transTheme = () => {
  // Add smooth transition class
  document.documentElement.classList.add("theme-transitioning");
  
  // Announce theme change to screen readers
  // announceThemeChange();
  
  window.setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, 300);
};

// Announce theme changes to screen readers for better accessibility
let announceThemeChange = () => {
  const theme = determineComputedTheme();
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = `Theme changed to ${theme} mode`;
  
  document.body.appendChild(announcement);
  
  // Remove announcement after screen reader has processed it
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Determine the expected state of the theme toggle, which can be "dark" or "light". Default is "light".
let determineThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  if (themeSetting != "dark" && themeSetting != "light") {
    // Force light theme if no theme is set
    themeSetting = "light";
  }
  return themeSetting;
};

// Determine the computed theme, which can be "dark" or "light".
let determineComputedTheme = () => {
  return determineThemeSetting();
};

// Update theme toggle button accessibility attributes
let updateThemeToggleAccessibility = () => {
  const mode_toggle = document.getElementById("light-toggle");
  const currentTheme = determineComputedTheme();
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  
  if (mode_toggle) {
    mode_toggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    mode_toggle.setAttribute("aria-pressed", currentTheme === "dark" ? "true" : "false");
    mode_toggle.title = `Switch to ${nextTheme} theme (current: ${currentTheme})`;
  }
};

let initTheme = () => {
  console.log("=== Theme System Debug ===");
  let themeSetting = determineThemeSetting();
  console.log("Initial theme setting:", themeSetting);

  setThemeSetting(themeSetting);
  console.log("After setThemeSetting - HTML data-theme:", document.documentElement.getAttribute("data-theme"));
  console.log("After setThemeSetting - HTML data-theme-setting:", document.documentElement.getAttribute("data-theme-setting"));

  // Add event listener to the theme toggle button.
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content Loaded - looking for theme toggle button");
    const mode_toggle = document.getElementById("light-toggle");

    if (!mode_toggle) {
      console.warn("Theme toggle button not found");
      return;
    }

    console.log("Theme toggle button found:", mode_toggle);
    console.log("Button innerHTML:", mode_toggle.innerHTML);

    // Check icons
    const darkIcon = document.getElementById("light-toggle-dark");
    const lightIcon = document.getElementById("light-toggle-light");
    console.log("Dark icon found:", !!darkIcon, darkIcon ? window.getComputedStyle(darkIcon).display : "N/A");
    console.log("Light icon found:", !!lightIcon, lightIcon ? window.getComputedStyle(lightIcon).display : "N/A");

    // Set initial accessibility attributes
    updateThemeToggleAccessibility();

    mode_toggle.addEventListener("click", function (e) {
      console.log("=== THEME TOGGLE CLICKED ===");
      console.log("Before toggle - theme:", determineThemeSetting());
      console.log("Before toggle - data-theme:", document.documentElement.getAttribute("data-theme"));
      console.log("Before toggle - data-theme-setting:", document.documentElement.getAttribute("data-theme-setting"));
      
      toggleThemeSetting();
      updateThemeToggleAccessibility();
      
      // Check after toggle
      setTimeout(() => {
        console.log("After toggle - theme:", determineThemeSetting());
        console.log("After toggle - data-theme:", document.documentElement.getAttribute("data-theme"));
        console.log("After toggle - data-theme-setting:", document.documentElement.getAttribute("data-theme-setting"));
        console.log("After toggle - localStorage:", localStorage.getItem("theme"));
        
        // Check icon visibility after toggle
        if (darkIcon) console.log("After toggle - Dark icon display:", window.getComputedStyle(darkIcon).display);
        if (lightIcon) console.log("After toggle - Light icon display:", window.getComputedStyle(lightIcon).display);
      }, 100);
    });

    // Handle keyboard navigation
    mode_toggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        console.log("Keyboard toggle activated");
        toggleThemeSetting();
        updateThemeToggleAccessibility();
      }
    });
  });

  // Add event listener to the system theme preference change.
  // window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
  //   applyTheme();
  // });
};

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
});
