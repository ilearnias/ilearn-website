"use client";

import React from "react";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import "./styles.scss";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AdminAuthProvider>
      <ProtectedRoute>
        <div className="admin-layout">
          <AdminSidebar />
          <div className="admin-main-container">
            <AdminHeader />
            <main className="admin-content">{children}</main>
          </div>
        </div>
      </ProtectedRoute>
    </AdminAuthProvider>
  );
};

export default AdminLayout;
