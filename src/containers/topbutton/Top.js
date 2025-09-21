import React, {useEffect} from "react";
import "./Top.scss";
import Analytics from "../../utils/analytics";

export default function Top() {
  function TopEvent() {
    Analytics.portfolioEvents.clickScrollToTop();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  useEffect(() => {
    // When the user scrolls down 20px from the top of the document, show the button
    function scrollFunction() {
      const topButton = document.getElementById("topButton");
      if (topButton) {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          topButton.style.visibility = "visible";
        } else {
          topButton.style.visibility = "hidden";
        }
      }
    }

    window.onscroll = scrollFunction;
    window.onload = scrollFunction;

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", scrollFunction);
      window.removeEventListener("load", scrollFunction);
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  // When the user clicks on the button, scroll to the top of the document
  return (
    <button onClick={TopEvent} id="topButton" title="Go to top">
      <i className="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  );
}
