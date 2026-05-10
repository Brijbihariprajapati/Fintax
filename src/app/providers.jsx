"use client";

import { Toaster } from "sonner";
import "sonner/dist/styles.css";

export function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        duration={5000}
        style={{ zIndex: 99999 }}
      />
    </>
  );
}
