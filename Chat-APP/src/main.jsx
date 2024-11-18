import { StrictMode } from "react";
import { Toaster } from "@/components/ui/sonner"
import { createRoot } from "react-dom/client";
import App from './App';
import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster richColors position="top-right"/>
  </>
);
