import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthContextProvider } from "./context/authContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (_, error) => {
        if (error?.response?.status === 403) return false;
        if (error?.response?.status === 404) return false;
        if (error?.response?.status === 428) return false;

        return true;
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
