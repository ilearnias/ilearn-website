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
import { successStoriesService, ISuccessStory } from "@/services/success-stories.service";
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
      const response = await successStoriesService.getAllStories();
      if (response.success) {
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
      achievementDate: record.achievementDate ? dayjs(record.achievementDate) : undefined,
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
          const response = await successStoriesService.deleteStory(record.id);
          if (response.success) {
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
      
      // Format dates
      if (values.achievementDate) {
        values.achievementDate = values.achievementDate.format('YYYY-MM-DD');
      }

      if (editingStory) {
        const response = await successStoriesService.updateStory(editingStory.id, values);
        if (response.success) {
          message.success(response.message || 'Success story updated successfully');
          setIsModalVisible(false);
          fetchStories();
        } else {
          message.error(response.message || 'Failed to update success story');
        }
      } else {
        const response = await successStoriesService.createStory(values);
        if (response.success) {
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
      story.title.toLowerCase().includes(searchText.toLowerCase()) ||
      story.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      story.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<ISuccessStory> = [
    {
      title: "Story",
      key: "story",
      render: (_, record) => (
        <Space>
          <Image
            src={record.imageUrl}
            alt={record.title}
            width={80}
            height={80}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            fallback="/placeholder-image.png"
          />
          <Space direction="vertical" size={0}>
            <div style={{ fontWeight: 500 }}>{record.title}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.studentName}
            </div>
          </Space>
        </Space>
      ),
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
      title: "Achievement",
      dataIndex: "achievement",
      key: "achievement",
      render: (achievement) => (
        <Tag color="gold" icon={<StarOutlined />}>{achievement}</Tag>
      ),
    },
    {
      title: "Stats",
      key: "stats",
      render: (_, record) => (
        <Space>
          <Tag icon={<LikeOutlined />}>{record.likes}</Tag>
          <Tag icon={<EyeOutlined />}>{record.views}</Tag>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
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
              title="Total Views"
              value={stories.reduce((sum, s) => sum + s.views, 0)}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Likes"
              value={stories.reduce((sum, s) => sum + s.likes, 0)}
              prefix={<LikeOutlined />}
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
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentName"
                label="Student Name"
                rules={[{ required: true, message: "Please enter student name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

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
                name="achievement"
                label="Achievement"
                rules={[{ required: true, message: "Please enter achievement" }]}
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
            <TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="achievementDate"
                label="Achievement Date"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="likes"
                label="Likes"
                rules={[{ required: true, message: "Please enter likes count" }]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="views"
                label="Views"
                rules={[{ required: true, message: "Please enter views count" }]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="isActive"
            label="Status"
            valuePropName="checked"
          >
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="testimonial"
            label="Testimonial"
          >
            <TextArea rows={4} placeholder="Student's testimonial or quote" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SuccessStories; 