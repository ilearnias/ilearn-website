"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Space,
  Dropdown,
  Menu,
  Modal,
  Form,
  message,
  Switch,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { galleryService, IGalleryTitle } from "@/services/gallery.service";
import "./styles.scss";

const { confirm } = Modal;

const GalleryTitles = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<IGalleryTitle[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTitle, setEditingTitle] = useState<IGalleryTitle | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = async () => {
    try {
      setLoading(true);
      const response = await galleryService.getAllTitles();
      if (response.status) {
        setTitles(response.data);
      } else {
        message.error(response.message || 'Failed to fetch titles');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch titles');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingTitle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IGalleryTitle) => {
    setEditingTitle(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: IGalleryTitle) => {
    confirm({
      title: 'Are you sure you want to delete this title?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await galleryService.deleteTitle(record.id);
          if (response.status) {
            message.success('Title deleted successfully');
            fetchTitles();
          } else {
            message.error(response.message || 'Failed to delete title');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete title');
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingTitle) {
        const response = await galleryService.updateTitle(editingTitle.id, values);
        if (response.status) {
          message.success('Title updated successfully');
          setIsModalVisible(false);
          fetchTitles();
        } else {
          message.error(response.message || 'Failed to update title');
        }
      } else {
        const response = await galleryService.createTitle(values);
        if (response.status) {
          message.success('Title created successfully');
          setIsModalVisible(false);
          fetchTitles();
        } else {
          message.error(response.message || 'Failed to create title');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save title');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredTitles = searchText
    ? titles.filter((title) =>
        title.title?.toLowerCase().includes(searchText.toLowerCase())
      )
    : titles;

  const columns: ColumnsType<IGalleryTitle> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <div style={{ fontWeight: 500 }}>{text}</div>
      ),
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
    <div className="gallery-titles-page">
      <div className="gallery-titles-header">
        <h1>Gallery Titles</h1>
        <p>Manage your gallery section titles</p>
      </div>

      <Card className="gallery-titles-controls">
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Input
            placeholder="Search titles..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Title
          </Button>
        </Space>
      </Card>

      <Table
        className="gallery-titles-table"
        columns={columns}
        dataSource={filteredTitles}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingTitle ? "Edit Title" : "Add New Title"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ isActive: true, order: 1 }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
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

export default GalleryTitles; 