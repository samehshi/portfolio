import React from "react";
import App from "./App";

// Simple smoke test - just check if App component can be imported
it("imports App component without crashing", () => {
  expect(App).toBeDefined();
});
