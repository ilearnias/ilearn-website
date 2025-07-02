"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Modal, Button, Dropdown, Avatar, Space } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./AdminHeader.scss";

const AdminHeader: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const pathname = usePathname();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const getPageTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/programmes":
        return "Programmes Management";
      case "/admin/results":
        return "Results Management";
      case "/admin/results/summary":
        return "Results Summary";
      case "/admin/success-stories":
        return "Success Stories";
      case "/admin/achievers":
        return "Achievers";
      case "/admin/team":
        return "Team Management";
      case "/admin/contacts":
        return "Contacts Management";
      case "/admin/gallery/titles":
        return "Gallery Titles";
      case "/admin/gallery/images":
        return "Gallery Images";
      case "/admin/blog/posts":
        return "Blog Posts";
      case "/admin/blog/categories":
        return "Blog Categories";
      default:
        return "Dashboard";
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const profileMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogoutClick,
      danger: true,
    },
  ];

  return (
    <>
      <header className="admin-header">
        <div className="header-left">
          <h1 className="page-title">{getPageTitle()}</h1>
        </div>

        <div className="header-right">
          <Dropdown
            menu={{ items: profileMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              className="profile-button"
              icon={
                <Space>
                  <Avatar
                    icon={<UserOutlined />}
                    size="small"
                    className="profile-avatar"
                  />
                  <div className="profile-info">
                    <span className="profile-name">{user?.name}</span>
                    <span className="profile-role">Administrator</span>
                  </div>
                  <DownOutlined className="profile-arrow" />
                </Space>
              }
            />
          </Dropdown>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={showLogoutConfirm}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        okText="Logout"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        centered
      >
        <p>Are you sure you want to logout from the admin panel?</p>
      </Modal>
    </>
  );
};

export default AdminHeader;
