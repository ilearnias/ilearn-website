"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import Loader from "@/app/loader/page";

export const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  isLoading: true,
  setLoading: () => {},
});

export function useLoading() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if the document and window are fully loaded
    const handleLoad = () => {
      setIsReady(true);
    };

    // Set a maximum loading time of 5 seconds as a fallback
    const maxLoadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
    }

    return () => {
      clearTimeout(maxLoadingTimer);
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  // Once the page is ready, start fading out the loader
  useEffect(() => {
    if (isReady) {
      const minLoadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Minimum loading time of 1 second for better UX

      return () => clearTimeout(minLoadingTimer);
    }
  }, [isReady]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
}
