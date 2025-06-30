import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// --- CSS Imports ---
// Dòng này rất quan trọng để KaTeX có thể hiển thị công thức toán.
import "katex/dist/katex.min.css";
import "./index.css";

// --- Local Application Imports ---
import App from "./App.jsx";
import { store, persistor } from "./redux/store.js";

// Lấy phần tử gốc từ file HTML
const rootElement = document.getElementById("root");

// Tạo root cho ứng dụng React
const root = createRoot(rootElement);

// Render toàn bộ ứng dụng
root.render(
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
