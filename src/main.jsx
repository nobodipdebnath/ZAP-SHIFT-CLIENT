import { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/router";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
// Create Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer/>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
