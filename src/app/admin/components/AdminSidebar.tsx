"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardOutlined,
  TeamOutlined,
  BankOutlined,
  BookOutlined,
  TrophyOutlined,
  SmileOutlined,
  PictureOutlined,
  ContactsOutlined,
  CrownOutlined,
  ReadOutlined,
  BarChartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./AdminSidebar.scss";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      href: "/admin/dashboard",
      subItems: [],
    },
    {
      id: "programmes",
      label: "Programmes",
      icon: <BookOutlined />,
      href: "/admin/programmes",
      subItems: [],
    },
    {
      id: "results",
      label: "Results",
      icon: <TrophyOutlined />,
      href: "/admin/results",
      subItems: [
        {
          id: "results-list",
          label: "Results List",
          href: "/admin/results",
        },
        {
          id: "results-summary",
          label: "Results Summary",
          href: "/admin/results/summary",
        },
      ],
    },
    {
      id: "success-stories",
      label: "Success Stories",
      icon: <SmileOutlined />,
      href: "/admin/success-stories",
      subItems: [],
    },
    {
      id: "achievers",
      label: "Achievers",
      icon: <CrownOutlined />,
      href: "/admin/achievers",
      subItems: [],
    },
    {
      id: "team",
      label: "Team Management",
      icon: <TeamOutlined />,
      href: "/admin/team",
      subItems: [],
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: <ContactsOutlined />,
      href: "/admin/contacts",
      subItems: [],
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: <PictureOutlined />,
      href: "#",
      subItems: [
        {
          id: "gallery-titles",
          label: "Gallery Titles",
          href: "/admin/gallery/titles",
        },
        {
          id: "gallery-images",
          label: "Gallery Images",
          href: "/admin/gallery/images",
        },
      ],
    },
    {
      id: "blog",
      label: "Blog",
      icon: <ReadOutlined />,
      href: "#",
      subItems: [
        {
          id: "blog-posts",
          label: "Blogs",
          href: "/admin/blog/posts",
        },
        {
          id: "blog-categories",
          label: "Blog Categories",
          href: "/admin/blog/categories",
        },
      ],
    },
  ];

  const toggleMenu = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const isMenuActive = (item: any) => {
    if (item.subItems.length > 0) {
      return item.subItems.some((subItem: any) => pathname === subItem.href);
    }
    return pathname === item.href;
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
                <div className="menu-group">
                  <button
                    className={`menu-button ${
                      openMenu === item.id || isMenuActive(item) ? "open" : ""
                    }`}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-arrow">
                      <DownOutlined />
                    </span>
                  </button>

                  {(openMenu === item.id || isMenuActive(item)) && (
                    <ul className="sub-menu">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
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
