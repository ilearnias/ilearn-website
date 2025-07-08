"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Row,
  Col,
  Space,
  Dropdown,
  Menu,
  Modal,
  Form,
  message,
  Switch,
  InputNumber
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { blogService, IBlogCategory } from "@/services/blog.service";
import "./styles.scss";

const { confirm } = Modal;

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
      content: 'This action cannot be undone.',
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
      category.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IBlogCategory> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Switch checked={isActive} disabled />
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
    <div className="blog-categories-page">
      <div className="blog-categories-header">
        <h1>Blog Categories</h1>
        <p>Manage your blog categories</p>
      </div>

      <Row gutter={[16, 16]} className="blog-categories-stats">
        <Col xs={24}>
          <Card>
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
          </Card>
        </Col>
      </Row>

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
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ isActive: true, order: 1 }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter category title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="order"
            label="Display Order"
            rules={[{ required: true, message: "Please enter display order" }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Status"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogCategories; 