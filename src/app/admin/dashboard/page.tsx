"use client";

import React from "react";
import { useSelector } from 'react-redux';
import Link from "next/link";
import { Card, Row, Col, Button } from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  SmileOutlined,
  CrownOutlined,
  TeamOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  HistoryOutlined,
  ReadOutlined,
  MessageOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./styles.scss";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);

  const renderSingleCard = (card: any) => (
    <Link href={card.href} style={{ textDecoration: 'none' }}>
      <Card className="dashboard-card">
        <div className="card-content">
          <div className="card-icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="card-text">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );

  const renderDoubleCard = (card: any) => (
    <Card className="dashboard-card">
      <div className="card-content">
        <div className="card-icon" style={{ color: card.color }}>
          {card.icon}
        </div>
        <div className="card-text">
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
          
          <div className="card-links">
            {card.links.map((link: any, linkIndex: number) => (
              <Link key={linkIndex} href={link.href} style={{ textDecoration: 'none' }}>
                <Button 
                  type="default" 
                  size="small"
                  icon={link.icon}
                  style={{ 
                    borderColor: card.color, 
                    color: card.color,
                    marginRight: linkIndex === 0 ? '8px' : '0'
                  }}
                  className="card-link-button"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  const dashboardCards = [
    {
      title: "Programmes",
      description: "Manage educational programmes and courses",
      icon: <BookOutlined />,
      href: "/admin/programmes",
      color: "#3b82f6",
      type: "single",
    },
    {
      title: "Results",
      description: "View and manage student results",
      icon: <TrophyOutlined />,
      color: "#10b981",
      type: "double",
      links: [
        {
          label: "Results List",
          href: "/admin/results",
          icon: <TrophyOutlined />,
        },
        {
          label: "Results Summary",
          href: "/admin/results/summary",
          icon: <BarChartOutlined />,
        },
      ],
    },
    {
      title: "Success Stories",
      description: "Manage success stories and testimonials",
      icon: <SmileOutlined />,
      href: "/admin/success-stories",
      color: "#f59e0b",
      type: "single",
    },
    {
      title: "Achievers",
      description: "Manage top achievers and their profiles",
      icon: <CrownOutlined />,
      href: "/admin/achievers",
      color: "#8b5cf6",
      type: "single",
    },
    {
      title: "Team",
      description: "Manage team members and faculty",
      icon: <TeamOutlined />,
      href: "/admin/team",
      color: "#ef4444",
      type: "single",
    },
    {
      title: "Gallery",
      description: "Manage images and media gallery",
      icon: <PictureOutlined />,
      href: "/admin/gallery",
      color: "#06b6d4",
      type: "single",
    },
    {
      title: "Media",
      description: "Manage videos and media content",
      icon: <VideoCameraOutlined />,
      href: "/admin/media",
      color: "#84cc16",
      type: "single",
    },
    {
      title: "Journey",
      description: "Manage company journey and milestones",
      icon: <HistoryOutlined />,
      href: "/admin/journey",
      color: "#f97316",
      type: "single",
    },
    {
      title: "Blog",
      description: "Manage blog posts and categories",
      icon: <ReadOutlined />,
      color: "#ec4899",
      type: "double",
      links: [
        {
          label: "Blog Posts",
          href: "/admin/blog/posts",
          icon: <ReadOutlined />,
        },
        {
          label: "Blog Categories",
          href: "/admin/blog/categories",
          icon: <FileTextOutlined />,
        },
      ],
    },
    {
      title: "Testimonials",
      description: "Manage customer testimonials and reviews",
      icon: <MessageOutlined />,
      href: "/admin/testimonials",
      color: "#8b5a2b",
      type: "single",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here&apos;s what&apos;s happening with your admin panel today.</p>
      </div>

      <Row gutter={[20, 20]} className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            {card.type === "single" ? renderSingleCard(card) : renderDoubleCard(card)}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard; 