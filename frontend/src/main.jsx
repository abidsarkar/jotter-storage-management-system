import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { store } from "./store/store.js";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </StrictMode>
);
