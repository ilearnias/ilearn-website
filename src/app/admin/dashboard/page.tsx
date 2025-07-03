"use client";

import React from "react";
import { useSelector } from 'react-redux';
import { Card, Statistic, List, Button, Row, Col, Space } from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ShoppingOutlined,
  PlusOutlined,
  BarChartOutlined,
  SettingOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./styles.scss";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);

  const stats = [
    {
      label: "Total Users",
      value: 1234,
      icon: <UserOutlined />,
      color: "#3b82f6",
      suffix: "",
    },
    {
      label: "Active Sessions",
      value: 89,
      icon: <CheckCircleOutlined />,
      color: "#10b981",
      suffix: "",
    },
    {
      label: "Total Revenue",
      value: 45678,
      icon: <DollarOutlined />,
      color: "#f59e0b",
      suffix: "$",
    },
    {
      label: "Pending Orders",
      value: 23,
      icon: <ShoppingOutlined />,
      color: "#ef4444",
      suffix: "",
    },
  ];

  const recentActivities = [
    {
      action: "New user registered",
      time: "2 minutes ago",
      user: "john@example.com",
      icon: <UserOutlined />,
    },
    {
      action: "Order completed",
      time: "5 minutes ago",
      user: "sarah@example.com",
      icon: <CheckCircleOutlined />,
    },
    {
      action: "Payment received",
      time: "10 minutes ago",
      user: "mike@example.com",
      icon: <DollarOutlined />,
    },
    {
      action: "Support ticket opened",
      time: "15 minutes ago",
      user: "lisa@example.com",
      icon: <MailOutlined />,
    },
  ];

  const quickActions = [
    { label: "Add New User", icon: <PlusOutlined />, type: "primary" as const },
    {
      label: "View Reports",
      icon: <BarChartOutlined />,
      type: "default" as const,
    },
    { label: "Settings", icon: <SettingOutlined />, type: "default" as const },
    { label: "Send Email", icon: <MailOutlined />, type: "default" as const },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's what's happening with your admin panel today.</p>
      </div>

      <Row gutter={[20, 20]} className="stats-grid">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <Statistic
                title={stat.label}
                value={stat.value}
                prefix={stat.icon}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]} className="dashboard-content">
        <Col xs={24} lg={16}>
          <Card
            title="Recent Activities"
            className="content-card"
            extra={<ClockCircleOutlined />}
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.action}
                    description={item.user}
                  />
                  <div className="activity-time">{item.time}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Quick Actions" className="content-card">
            <Space direction="vertical" style={{ width: "100%" }}>
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  type={action.type}
                  icon={action.icon}
                  size="large"
                  block
                  className="action-button"
                >
                  {action.label}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
