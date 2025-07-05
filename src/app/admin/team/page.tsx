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
  InputNumber,
  Switch,
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
      if (response.status) {
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
          if (response.status) {
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
      values.order = Number(values.order);
      values.isActive = Boolean(values.isActive);
      if (editingMember) {
        const response = await teamService.updateTeamMember(editingMember.id, values);
        if (response.status) {
          message.success(response.message || 'Team member updated successfully');
          setIsModalVisible(false);
          fetchTeamMembers();
        } else {
          message.error(response.message || 'Failed to update team member');
        }
      } else {
        const response = await teamService.createTeamMember(values);
        if (response.status) {
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

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image) => (
    //     <img src={image || "/placeholder.png"} alt="Image" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }} />
    //   ),
    // },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "LinkedIn",
      dataIndex: "linkedin",
      key: "linkedin",
      render: (url) => url ? <a href={url} target="_blank" rel="noopener noreferrer">LinkedIn</a> : null,
    },
    {
      title: "Twitter",
      dataIndex: "twitter",
      key: "twitter",
      render: (url) => url ? <a href={url} target="_blank" rel="noopener noreferrer">Twitter</a> : null,
    },
    {
      title: "Facebook",
      dataIndex: "facebook",
      key: "facebook",
      render: (url) => url ? <a href={url} target="_blank" rel="noopener noreferrer">Facebook</a> : null,
    },
    {
      title: "Instagram",
      dataIndex: "instagram",
      key: "instagram",
      render: (url) => url ? <a href={url} target="_blank" rel="noopener noreferrer">Instagram</a> : null,
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
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
          initialValues={{ isActive: true }}
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
                name="designation"
                label="Designation"
                rules={[{ required: true, message: "Please enter designation" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true, message: "Please enter image URL" }]}
              >
                <Input placeholder="https://example.com/image.jpg" />
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
                name="phone"
                label="Phone"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Order"
                rules={[{ required: true, message: "Please enter order" }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="linkedin"
                label="LinkedIn"
                rules={[{ type: "url", message: "LinkedIn must be a URL address" }]}
              >
                <Input placeholder="https://linkedin.com/in/username" type="url" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="twitter"
                label="Twitter"
                rules={[{ type: "url", message: "Twitter must be a URL address" }]}
              >
                <Input placeholder="https://twitter.com/username" type="url" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="facebook"
                label="Facebook"
                rules={[{ type: "url", message: "Facebook must be a URL address" }]}
              >
                <Input placeholder="https://facebook.com/username" type="url" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="instagram"
                label="Instagram"
                rules={[{ type: "url", message: "Instagram must be a URL address" }]}
              >
                <Input placeholder="https://instagram.com/username" type="url" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="isActive"
            label="Active Status"
            valuePropName="checked"
            rules={[{ required: true, message: "Please select active status" }]}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Team;
