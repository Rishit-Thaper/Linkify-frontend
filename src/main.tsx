import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { Slide, ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
        <ToastContainer position="top-right" theme="dark" transition={Slide} />
      </React.StrictMode>
    </QueryClientProvider>
  </AuthContextProvider>
);
