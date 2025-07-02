"use client";

import React, { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  Table,
  Input,
  Button,
  Card,
  Statistic,
  Row,
  Col,
  Space,
  Tag,
  Avatar,
  Dropdown,
  Menu,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "./styles.scss";

interface TeamMember {
  key: string;
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

const Team = () => {
  const { user } = useAdminAuth();
  const [searchText, setSearchText] = useState("");

  const teamMembers: TeamMember[] = [
    {
      key: "1",
      id: 1,
      name: "John Doe",
      email: "john@ilearn.com",
      role: "Admin",
      status: "Active",
      avatar: "👨‍💼",
    },
    {
      key: "2",
      id: 2,
      name: "Jane Smith",
      email: "jane@ilearn.com",
      role: "Manager",
      status: "Active",
      avatar: "👩‍💼",
    },
    {
      key: "3",
      id: 3,
      name: "Mike Johnson",
      email: "mike@ilearn.com",
      role: "Editor",
      status: "Inactive",
      avatar: "👨‍💻",
    },
    {
      key: "4",
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@ilearn.com",
      role: "Support",
      status: "Active",
      avatar: "👩‍💻",
    },
    {
      key: "5",
      id: 5,
      name: "David Brown",
      email: "david@ilearn.com",
      role: "Developer",
      status: "Active",
      avatar: "👨‍🔧",
    },
  ];

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.email.toLowerCase().includes(searchText.toLowerCase()) ||
      member.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "red";
      case "manager":
        return "blue";
      case "editor":
        return "orange";
      case "support":
        return "green";
      case "developer":
        return "purple";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "green" : "red";
  };

  const handleEdit = (record: TeamMember) => {
    console.log("Edit:", record);
  };

  const handleDelete = (record: TeamMember) => {
    console.log("Delete:", record);
  };

  const columns: ColumnsType<TeamMember> = [
    {
      title: "Member",
      key: "member",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {role === "Admin" && <CrownOutlined style={{ marginRight: 4 }} />}
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          icon={status === "Active" ? <CheckCircleOutlined /> : undefined}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(record)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const stats = [
    {
      title: "Total Members",
      value: teamMembers.length,
      icon: <TeamOutlined />,
      color: "#3b82f6",
    },
    {
      title: "Active Members",
      value: teamMembers.filter((m) => m.status === "Active").length,
      icon: <CheckCircleOutlined />,
      color: "#10b981",
    },
    {
      title: "Admins",
      value: teamMembers.filter((m) => m.role === "Admin").length,
      icon: <CrownOutlined />,
      color: "#ef4444",
    },
  ];

  return (
    <div className="team-page">
      <div className="team-header">
        <h1>Team Management</h1>
        <p>Manage your team members and their roles</p>
      </div>

      <div className="team-controls">
        <Input
          placeholder="Search team members..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 400 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Add Member
        </Button>
      </div>

      <Row gutter={[16, 16]} className="team-stats">
        {stats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="team-table">
        <Table
          columns={columns}
          dataSource={filteredMembers}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default Team;
