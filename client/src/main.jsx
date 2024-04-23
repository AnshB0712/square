import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./app/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

import {AuthContextProvider} from "./context/authContext.jsx"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
