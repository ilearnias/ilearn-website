"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardOutlined,
  TeamOutlined,
  BankOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./AdminSidebar.scss";

interface SubMenuItem {
  href: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems: SubMenuItem[];
}

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("dashboard");

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      href: "/admin/dashboard",
      subItems: [],
    },
    {
      id: "team",
      label: "Team Management",
      icon: <TeamOutlined />,
      href: "/admin/team",
      subItems: [],
    },
    // Add more menu items here as needed
  ];

  const toggleMenu = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">
            <BankOutlined />
          </span>
          <span className="logo-text">iLearn Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              {item.subItems.length > 0 ? (
                // Menu with sub-items
                <div className="menu-group">
                  <button
                    className={`menu-button ${
                      openMenu === item.id ? "open" : ""
                    }`}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-arrow">▼</span>
                  </button>

                  {openMenu === item.id && (
                    <ul className="sub-menu">
                      {item.subItems.map((subItem: SubMenuItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={`sub-menu-link ${
                              isActive(subItem.href) ? "active" : ""
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                // Single menu item
                <Link
                  href={item.href}
                  className={`menu-link ${isActive(item.href) ? "active" : ""}`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-info">
          <span className="info-label">Admin Panel</span>
          <span className="info-version">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
