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
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  FileTextOutlined,
  EyeOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { blogService, IBlogPost, IBlogCategory } from "@/services/blog.service";
import dayjs from 'dayjs';
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const BlogPosts = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [categories, setCategories] = useState<IBlogCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<IBlogPost | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllPosts();
      if (response.success) {
        setPosts(response.data);
      } else {
        message.error(response.message || 'Failed to fetch blog posts');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch blog posts');
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await blogService.getAllCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        message.error(response.message || 'Failed to fetch categories');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch categories');
      console.error('Error fetching categories:', error);
    }
  };

  const handleAdd = () => {
    setEditingPost(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IBlogPost) => {
    setEditingPost(record);
    form.setFieldsValue({
      ...record,
      publishDate: record.publishDate ? dayjs(record.publishDate) : undefined,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: IBlogPost) => {
    confirm({
      title: 'Are you sure you want to delete this post?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await blogService.deletePost(record.id);
          if (response.success) {
            message.success(response.message || 'Post deleted successfully');
            fetchPosts();
          } else {
            message.error(response.message || 'Failed to delete post');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete post');
          console.error('Error deleting post:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Format dates
      if (values.publishDate) {
        values.publishDate = values.publishDate.format('YYYY-MM-DD');
      }

      if (editingPost) {
        const response = await blogService.updatePost(editingPost.id, values);
        if (response.success) {
          message.success(response.message || 'Post updated successfully');
          setIsModalVisible(false);
          fetchPosts();
        } else {
          message.error(response.message || 'Failed to update post');
        }
      } else {
        const response = await blogService.createPost(values);
        if (response.success) {
          message.success(response.message || 'Post created successfully');
          setIsModalVisible(false);
          fetchPosts();
        } else {
          message.error(response.message || 'Failed to create post');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save post');
      console.error('Error saving post:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.content.toLowerCase().includes(searchText.toLowerCase()) ||
      post.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'green';
      case 'draft':
        return 'gold';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<IBlogPost> = [
    {
      title: "Title",
      key: "title",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <div style={{ fontWeight: 500 }}>{record.title}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            By {record.author}
          </div>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "category",
      render: (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? <Tag color="blue">{category.name}</Tag> : null;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      sorter: (a, b) => (a.views || 0) - (b.views || 0),
      render: (views) => (
        <Space>
          <EyeOutlined />
          {views || 0}
        </Space>
      ),
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
      render: (date) => date ? dayjs(date).format('YYYY-MM-DD') : '-',
      sorter: (a, b) => {
        if (!a.publishDate) return -1;
        if (!b.publishDate) return 1;
        return dayjs(a.publishDate).unix() - dayjs(b.publishDate).unix();
      },
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
    <div className="blog-posts-page">
      <div className="blog-posts-header">
        <h1>Blog Posts</h1>
        <p>Manage your blog posts and articles</p>
      </div>

      <Row gutter={[16, 16]} className="blog-posts-stats">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Posts"
              value={posts.length}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Published Posts"
              value={posts.filter(p => p.status === 'published').length}
              prefix={<ReadOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Views"
              value={posts.reduce((sum, p) => sum + (p.views || 0), 0)}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="blog-posts-controls">
        <Input
          placeholder="Search posts..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Post
        </Button>
      </div>

      <Table
        className="blog-posts-table"
        columns={columns}
        dataSource={filteredPosts}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingPost ? "Edit Post" : "Add New Post"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: "draft" }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select>
                  {categories.map(category => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <TextArea rows={10} />
          </Form.Item>

          <Form.Item
            name="excerpt"
            label="Excerpt"
            rules={[{ required: true, message: "Please enter excerpt" }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="author"
                label="Author"
                rules={[{ required: true, message: "Please enter author" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="publishDate"
                label="Publish Date"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="featuredImage"
            label="Featured Image URL"
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Add tags">
              {/* Tags will be dynamically added by the user */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogPosts; 