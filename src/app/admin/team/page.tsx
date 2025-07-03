"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
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
  Modal,
  Form,
  message,
  Select,
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
import { teamService, ITeamMember } from "@/services/team.service";
import "./styles.scss";

const { confirm } = Modal;

const Team = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<ITeamMember | null>(null);
  const [form] = Form.useForm();

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamService.getAllTeamMembers();
      if (response.success) {
        setTeamMembers(response.data);
      } else {
        message.error(response.message || 'Failed to fetch team members');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch team members');
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingMember(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: ITeamMember) => {
    setEditingMember(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: ITeamMember) => {
    confirm({
      title: 'Are you sure you want to delete this team member?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await teamService.deleteTeamMember(record.id);
          if (response.success) {
            message.success(response.message || 'Team member deleted successfully');
            fetchTeamMembers();
          } else {
            message.error(response.message || 'Failed to delete team member');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete team member');
          console.error('Error deleting team member:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingMember) {
        const response = await teamService.updateTeamMember(editingMember.id, values);
        if (response.success) {
          message.success(response.message || 'Team member updated successfully');
          setIsModalVisible(false);
          fetchTeamMembers();
        } else {
          message.error(response.message || 'Failed to update team member');
        }
      } else {
        const response = await teamService.createTeamMember(values);
        if (response.success) {
          message.success(response.message || 'Team member created successfully');
          setIsModalVisible(false);
          fetchTeamMembers();
        } else {
          message.error(response.message || 'Failed to create team member');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save team member');
      console.error('Error saving team member:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.position.toLowerCase().includes(searchText.toLowerCase()) ||
      member.department.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'active' ? "green" : "red";
  };

  const columns: ColumnsType<ITeamMember> = [
    {
      title: "Member",
      key: "member",
      render: (_, record) => (
        <Space>
          <Avatar src={record.image} icon={<UserOutlined />} />
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (department) => (
        <Tag color="blue">{department}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          icon={status === "active" ? <CheckCircleOutlined /> : undefined}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
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

  return (
    <div className="team-page">
      <div className="team-header">
        <h1>Team Management</h1>
        <p>Manage your team members and their roles</p>
      </div>

      <Row gutter={[16, 16]} className="team-stats">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Members"
              value={teamMembers.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Members"
              value={teamMembers.filter((m) => m.status === 'active').length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Departments"
              value={new Set(teamMembers.map(m => m.department)).size}
              prefix={<CrownOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="team-controls">
        <Input
          placeholder="Search team members..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Member
        </Button>
      </div>

        <Table
        className="team-table"
          columns={columns}
          dataSource={filteredMembers}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingMember ? "Edit Team Member" : "Add New Team Member"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: "active" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: "Please enter position" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: "Please enter department" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="bio"
            label="Bio"
            rules={[{ required: true, message: "Please enter bio" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="image"
            label="Image URL"
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item label="Social Links" style={{ marginBottom: 0 }}>
            <Form.Item
              name={['socialLinks', 'linkedin']}
              label="LinkedIn"
              style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['socialLinks', 'twitter']}
              label="Twitter"
              style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['socialLinks', 'facebook']}
              label="Facebook"
              style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Team;
