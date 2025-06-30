"use client";

import React from "react";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

interface AdminLoginLayoutProps {
  children: React.ReactNode;
}

const AdminLoginLayout: React.FC<AdminLoginLayoutProps> = ({ children }) => {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
};

export default AdminLoginLayout;
