"use client";

import { Provider } from "react-redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import store from "@/redux/store";
import { ReactNode, useEffect, useState } from "react";
import { initializeAuth } from "@/redux/slices/authSlice";
import { setStore } from "@/config/apiRequest";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set the store reference for API requests
    setStore(store);

    // Initialize auth state from localStorage
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    console.log("Providers: Initializing auth state", {
      token: !!token,
      userData: !!userData,
    });

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        console.log(
          "Providers: Dispatching initializeAuth with user data",
          user
        );
        store.dispatch(initializeAuth({ user, token }));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        store.dispatch(initializeAuth(null));
      }
    } else {
      console.log(
        "Providers: No auth data found, dispatching initializeAuth(null)"
      );
      store.dispatch(initializeAuth(null));
    }

    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <AntdRegistry>{children}</AntdRegistry>
    </Provider>
  );
};

export default Providers;
