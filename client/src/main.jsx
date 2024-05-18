import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { AuthContextProvider } from "./context/authContext.jsx";
import "./app/globals.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        toast.error(`Error: ${error.message ?? "Something went wrong"}`);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: (_, error) => {
        const DO_NOT_RETRY_STATUS = [403, 404, 428];
        if (DO_NOT_RETRY_STATUS.includes(error.response?.status)) return false;

        return true;
      },
      throwOnError: (error) => {
        const STATUS_ON_NOT_TO_THROW = [401];

        if (STATUS_ON_NOT_TO_THROW.includes(error.response?.status))
          return false;

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
