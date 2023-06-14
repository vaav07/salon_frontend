import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
