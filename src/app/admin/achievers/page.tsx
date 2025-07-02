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
      if (response.success) {
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
          if (response.success) {
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
      
      if (editingAchiever) {
        const response = await achieverService.updateAchiever(editingAchiever.id, values);
        if (response.success) {
          message.success(response.message || 'Achiever updated successfully');
          setIsModalVisible(false);
          fetchAchievers();
        } else {
          message.error(response.message || 'Failed to update achiever');
        }
      } else {
        const response = await achieverService.createAchiever(values);
        if (response.success) {
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
      achiever.name.toLowerCase().includes(searchText.toLowerCase()) ||
      achiever.achievement.toLowerCase().includes(searchText.toLowerCase()) ||
      achiever.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IAchiever> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <Space>
          <img 
            src={record.image} 
            alt={record.name}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.png'; // Replace with your placeholder image
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.institution}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Achievement",
      dataIndex: "achievement",
      key: "achievement",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Score/Rank",
      key: "score",
      render: (_, record) => (
        <Space>
          {record.score && <span>{record.score}%</span>}
          {record.rank && <Tag color="gold">Rank {record.rank}</Tag>}
        </Space>
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
              title="Categories"
              value={new Set(achievers.map(a => a.category)).size}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Average Score"
              value={achievers.reduce((sum, a) => sum + (a.score || 0), 0) / achievers.length || 0}
              precision={2}
              prefix={<UserOutlined />}
              suffix="%"
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
                name="achievement"
                label="Achievement"
                rules={[{ required: true, message: "Please enter achievement" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please enter category" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Year"
                rules={[{ required: true, message: "Please enter year" }]}
              >
                <InputNumber style={{ width: '100%' }} min={1900} max={2100} />
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
                name="institution"
                label="Institution"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="score"
                label="Score (%)"
              >
                <InputNumber style={{ width: '100%' }} min={0} max={100} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rank"
                label="Rank"
              >
                <InputNumber style={{ width: '100%' }} min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image URL"
              >
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="testimonial"
            label="Testimonial"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Achievers; 