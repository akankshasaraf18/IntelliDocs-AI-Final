import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "openid profile email",
      }}
      onRedirectCallback={(appState) => {
        // Log appState for debugging; then navigate to returnTo or /dashboard
        // If appState is missing, this will still send users to /dashboard
        try {
          // eslint-disable-next-line no-console
          console.debug("Auth0 onRedirectCallback appState:", appState);
        } catch (e) {}
        const target = appState?.returnTo || "/dashboard";
        // Use assign so navigation is recorded in session history
        window.location.assign(target);
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </StrictMode>
);
