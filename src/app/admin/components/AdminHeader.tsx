"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
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
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
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
      case "/admin/media":
        return "Media Management";
      case "/admin/journey":
        return "Journey Management";
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
    // Clear localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    // Dispatch Redux logout action
    dispatch(logout());

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
      <header className="admin-header" style={{
        background: '#fff',
        padding: '16px 32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderRadius: '0 0 12px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 72,
      }}>
        <div className="header-left">
          <h1 className="page-title" style={{ margin: 0, fontWeight: 700, fontSize: 24, color: '#222' }}>{getPageTitle()}</h1>
        </div>

        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Dropdown
            menu={{ items: profileMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
            className="w-40"
          >
            <Button
              type="text"
              className="profile-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: 8,
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                height: 'auto',
              }}
              icon={
                <Space className="w-40" style={{ gap: 8 }}>
                  <Avatar
                    icon={<UserOutlined />}
                    size="small"
                    className="profile-avatar"
                    style={{ background: '#1890ff', color: '#fff' }}
                  />
                  <div className="profile-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className="profile-name" style={{ fontWeight: 500, color: '#222', fontSize: 15 }}>{user?.name}</span>
                  </div>
                  <DownOutlined className="profile-arrow" style={{ color: '#888', fontSize: 12 }} />
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
