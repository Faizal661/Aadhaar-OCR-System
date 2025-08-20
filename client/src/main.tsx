import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import LandingPage from "./pages/LandingPage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <LandingPage />
    </ErrorBoundary>
  </StrictMode>
);
