"use client";

import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isInitialized } = useSelector(
    (state: any) => state.auth
  );
  console.log("ProtectedRoute: Auth state check", {
    isAuthenticated,
    isLoading,
    isInitialized,
  });
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're not loading and not authenticated
    if (isInitialized && !isLoading && !isAuthenticated) {
      router.push("/adminlogin");
    }
  }, [isAuthenticated, isLoading, isInitialized, router]);

  // Show loading while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading while redirecting
  if (!isAuthenticated) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
