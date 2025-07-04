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
  Image,
  DatePicker,
  Switch,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  StarOutlined,
  UserOutlined,
  LikeOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { successStoryService, ISuccessStory } from "@/services/success-stories.service";
import dayjs from 'dayjs';
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const SuccessStories = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState<ISuccessStory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStory, setEditingStory] = useState<ISuccessStory | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await successStoryService.getAllSuccessStories();
      if (response.status) {
        setStories(response.data);
      } else {
        message.error(response.message || 'Failed to fetch success stories');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch success stories');
      console.error('Error fetching success stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: ISuccessStory) => {
    setEditingStory(record);
    form.setFieldsValue({
      ...record,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: ISuccessStory) => {
    confirm({
      title: 'Are you sure you want to delete this success story?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await successStoryService.deleteSuccessStory(record.id);
          if (response.status) {
            message.success(response.message || 'Success story deleted successfully');
            fetchStories();
          } else {
            message.error(response.message || 'Failed to delete success story');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete success story');
          console.error('Error deleting success story:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.isActive = Boolean(values.isActive);
      values.order = Number(values.order);
      if (editingStory) {
        const response = await successStoryService.updateSuccessStory(editingStory.id, values);
        if (response.status) {
          message.success(response.message || 'Success story updated successfully');
          setIsModalVisible(false);
          fetchStories();
        } else {
          message.error(response.message || 'Failed to update success story');
        }
      } else {
        const response = await successStoryService.createSuccessStory(values);
        if (response.status) {
          message.success(response.message || 'Success story created successfully');
          setIsModalVisible(false);
          fetchStories();
        } else {
          message.error(response.message || 'Failed to create success story');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save success story');
      console.error('Error saving success story:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredStories = stories.filter(
    (story) =>
      (story.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (story.description?.toLowerCase() || "").includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<ISuccessStory> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image src={image || "/placeholder-image.png"} alt="Image" width={80} height={80} style={{ objectFit: 'cover', borderRadius: 4 }} fallback="/placeholder-image.png" />
      ),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Status",
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
    <div className="success-stories-page">
      <div className="success-stories-header">
        <h1>Success Stories</h1>
        <p>Manage and showcase student achievements and success stories</p>
      </div>

      <Row gutter={[16, 16]} className="success-stories-stats">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Stories"
              value={stories.length}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Stories"
              value={stories.filter(s => s.isActive).length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="success-stories-controls">
        <Input
          placeholder="Search stories..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Story
        </Button>
      </div>

      <Table
        className="success-stories-table"
        columns={columns}
        dataSource={filteredStories}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingStory ? "Edit Success Story" : "Add New Success Story"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
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
                name="image"
                label="Image URL"
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
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="details"
            label="Details"
          >
            <TextArea rows={4} placeholder="Additional details (optional)" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Order"
                rules={[{ required: true, message: "Please enter order" }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isActive"
                label="Status"
                valuePropName="checked"
                rules={[{ required: true, message: "Please select status" }]}
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

export default SuccessStories; 