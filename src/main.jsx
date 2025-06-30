import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./redux/store.js"; // Import store và persistor
import { GoogleOAuthProvider } from "@react-oauth/google";
// Trong file src/index.js hoặc src/App.js
import "katex/dist/katex.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
);
