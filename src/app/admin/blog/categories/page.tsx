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
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  FolderOutlined,
  FileTextOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { blogService, IBlogCategory } from "@/services/blog.service";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;

const BlogCategories = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<IBlogCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<IBlogCategory | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllCategories();
      if (response.status) {
        setCategories(response.data);
      } else {
        message.error(response.message || 'Failed to fetch categories');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IBlogCategory) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: IBlogCategory) => {
    confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone. All posts in this category will be uncategorized.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await blogService.deleteCategory(record.id);
          if (response.status) {
            message.success(response.message || 'Category deleted successfully');
            fetchCategories();
          } else {
            message.error(response.message || 'Failed to delete category');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete category');
          console.error('Error deleting category:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingCategory) {
        const response = await blogService.updateCategory(editingCategory.id, values);
        if (response.status) {
          message.success(response.message || 'Category updated successfully');
          setIsModalVisible(false);
          fetchCategories();
        } else {
          message.error(response.message || 'Failed to update category');
        }
      } else {
        const response = await blogService.createCategory(values);
        if (response.status) {
          message.success(response.message || 'Category created successfully');
          setIsModalVisible(false);
          fetchCategories();
        } else {
          message.error(response.message || 'Failed to create category');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save category');
      console.error('Error saving category:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredCategories = categories.filter(
    (category) =>
      (category.name?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (category.description?.toLowerCase() || '').includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IBlogCategory> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <Space>
          <FolderOutlined style={{ color: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.description}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug) => (
        <Tag>{slug}</Tag>
      ),
    },
    {
      title: "Posts",
      key: "postCount",
      render: (_, record) => (
        <Space>
          <FileTextOutlined />
          {record.postCount || 0}
        </Space>
      ),
      sorter: (a, b) => (a.postCount || 0) - (b.postCount || 0),
    },
    {
      title: "Views",
      key: "views",
      render: (_, record) => (
        <Space>
          <EyeOutlined />
          {record.views || 0}
        </Space>
      ),
      sorter: (a, b) => (a.views || 0) - (b.views || 0),
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
    <div className="blog-categories-page">
      <div className="blog-categories-header">
        <h1>Blog Categories</h1>
        <p>Manage your blog categories and organization</p>
      </div>

      <Row gutter={[16, 16]} className="blog-categories-stats">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Categories"
              value={categories.length}
              prefix={<FolderOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Posts"
              value={categories.reduce((sum, c) => sum + (c.postCount || 0), 0)}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Views"
              value={categories.reduce((sum, c) => sum + (c.views || 0), 0)}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="blog-categories-controls">
        <Input
          placeholder="Search categories..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Category
        </Button>
      </div>

      <Table
        className="blog-categories-table"
        columns={columns}
        dataSource={filteredCategories}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add New Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: "Please enter category slug" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter category description" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="metaTitle"
            label="Meta Title"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="metaDescription"
            label="Meta Description"
          >
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogCategories; 