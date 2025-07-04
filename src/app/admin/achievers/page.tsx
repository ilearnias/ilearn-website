"use client";

import React, { useState, useEffect } from "react";
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
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TrophyOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { achieverService, IAchiever } from "@/services/achievers.service";
import "./styles.scss";

const { confirm } = Modal;

const Achievers = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [achievers, setAchievers] = useState<IAchiever[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState<IAchiever | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAchievers();
  }, []);

  const fetchAchievers = async () => {
    try {
      setLoading(true);
      const response = await achieverService.getAllAchievers();
      if (response.status) {
        setAchievers(response.data);
      } else {
        message.error(response.message || 'Failed to fetch achievers');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch achievers');
      console.error('Error fetching achievers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingAchiever(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IAchiever) => {
    setEditingAchiever(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: IAchiever) => {
    confirm({
      title: 'Are you sure you want to delete this achiever?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await achieverService.deleteAchiever(record.id);
          if (response.status) {
            message.success(response.message || 'Achiever deleted successfully');
            fetchAchievers();
          } else {
            message.error(response.message || 'Failed to delete achiever');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete achiever');
          console.error('Error deleting achiever:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.order = Number(values.order);
      values.isActive = Boolean(values.isActive);
      if (editingAchiever) {
        const response = await achieverService.updateAchiever(editingAchiever.id, values);
        if (response.status) {
          message.success(response.message || 'Achiever updated successfully');
          setIsModalVisible(false);
          fetchAchievers();
        } else {
          message.error(response.message || 'Failed to update achiever');
        }
      } else {
        const response = await achieverService.createAchiever(values);
        if (response.status) {
          message.success(response.message || 'Achiever created successfully');
          setIsModalVisible(false);
          fetchAchievers();
        } else {
          message.error(response.message || 'Failed to create achiever');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save achiever');
      console.error('Error saving achiever:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredAchievers = achievers.filter(
    (achiever) =>
      (achiever.name || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (achiever.details || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (achiever.description || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IAchiever> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <img 
            src={record.image} 
            alt={record.name}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.png';
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{record.details}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image || "/placeholder.png"} alt="Image" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }} />
      ),
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
    <div className="achievers-page">
      <div className="achievers-header">
        <h1>Achievers Management</h1>
        <p>Manage student achievements and success stories</p>
      </div>

      <Row gutter={[16, 16]} className="achievers-stats">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Achievers"
              value={achievers.length}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Achievers"
              value={achievers.filter(a => a.isActive).length}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Highest Order"
              value={achievers.reduce((max, a) => a.order && a.order > max ? a.order : max, 0)}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="achievers-controls">
        <Input
          placeholder="Search achievers..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Achiever
        </Button>
      </div>

      <Table
        className="achievers-table"
        columns={columns}
        dataSource={filteredAchievers}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingAchiever ? "Edit Achiever" : "Add New Achiever"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
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
                name="image"
                label="Image URL"
                rules={[{ required: true, message: "Please enter image URL" }]}
              >
                <Input placeholder="https://example.com/image.jpg" />
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

          <Form.Item
            name="details"
            label="Details"
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Order"
                rules={[{ required: true, message: "Please enter order" }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isActive"
                label="Active Status"
                valuePropName="checked"
                rules={[{ required: true, message: "Please select active status" }]}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Achievers; 