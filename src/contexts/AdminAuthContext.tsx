"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  login as loginAction,
  logout as logoutAction,
} from "@/redux/slices/authSlice";

interface AdminUser {
  id: number;
  email: string;
  name: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get auth state from Redux
  const { user, isAuthenticated, token } = useSelector(
    (state: any) => state.auth
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    // Dispatch Redux action
    dispatch(logoutAction());

    router.push("/adminlogin");
  }, [dispatch, router]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem("adminToken");
        const userData = localStorage.getItem("adminUser");

        if (storedToken && userData) {
          const parsedUser = JSON.parse(userData);
          // Dispatch Redux action to restore auth state
          dispatch(
            loginAction({
              user: parsedUser,
              token: storedToken,
            })
          );
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, logout]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with email:", email);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      console.log("Login response status:", response.status);

      const responseData = await response.json();
      console.log("Login response data:", responseData);

      if (!response.ok || !responseData.status) {
        throw new Error(responseData.message || "Login failed");
      }

      // Extract data from the nested structure
      const { user, accessToken: token } = responseData.data;

      if (token && user) {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(user));

        // Dispatch Redux action
        dispatch(
          loginAction({
            user,
            token,
          })
        );

        return true;
      } else {
        console.error("Invalid response format:", responseData);
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const value: AdminAuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
