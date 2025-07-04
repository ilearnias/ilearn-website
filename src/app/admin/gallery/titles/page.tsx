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
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  FontSizeOutlined,
  OrderedListOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { galleryService, IGalleryTitle } from "@/services/gallery.service";
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

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
      if (response.success) {
        setTitles(response.data);
      } else {
        message.error(response.message || 'Failed to fetch titles');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch titles');
      console.error('Error fetching titles:', error);
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
          if (response.success) {
            message.success(response.message || 'Title deleted successfully');
            fetchTitles();
          } else {
            message.error(response.message || 'Failed to delete title');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete title');
          console.error('Error deleting title:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingTitle) {
        const response = await galleryService.updateTitle(editingTitle.id, values);
        if (response.success) {
          message.success(response.message || 'Title updated successfully');
          setIsModalVisible(false);
          fetchTitles();
        } else {
          message.error(response.message || 'Failed to update title');
        }
      } else {
        const response = await galleryService.createTitle(values);
        if (response.success) {
          message.success(response.message || 'Title created successfully');
          setIsModalVisible(false);
          fetchTitles();
        } else {
          message.error(response.message || 'Failed to create title');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save title');
      console.error('Error saving title:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredTitles = titles.filter(
    (title) =>
      title.text.toLowerCase().includes(searchText.toLowerCase()) ||
      title.description.toLowerCase().includes(searchText.toLowerCase()) ||
      title.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IGalleryTitle> = [
    {
      title: "Title",
      key: "title",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <div style={{ fontWeight: 500 }}>{record.text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.description}
          </div>
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
      title: "Order",
      dataIndex: "displayOrder",
      key: "displayOrder",
      sorter: (a, b) => a.displayOrder - b.displayOrder,
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
    <div className="gallery-titles-page">
      <div className="gallery-titles-header">
        <h1>Gallery Titles</h1>
        <p>Manage your gallery section titles</p>
      </div>

      <Row gutter={[16, 16]} className="gallery-titles-stats">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Titles"
              value={titles.length}
              prefix={<FontSizeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Categories"
              value={new Set(titles.map(t => t.category)).size}
              prefix={<OrderedListOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Titles"
              value={titles.filter(t => t.isActive).length}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="gallery-titles-controls">
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
      </div>

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
          initialValues={{ isActive: true }}
        >
          <Form.Item
            name="text"
            label="Title Text"
            rules={[{ required: true, message: "Please enter title text" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} />
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
                name="displayOrder"
                label="Display Order"
                rules={[{ required: true, message: "Please enter display order" }]}
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
            name="style"
            label="CSS Style"
          >
            <TextArea rows={3} placeholder="color: #000; font-size: 24px;" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryTitles; 