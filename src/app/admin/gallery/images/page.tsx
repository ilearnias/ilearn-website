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
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PictureOutlined,
  FolderOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { galleryService, IGalleryImage } from "@/services/gallery.service";
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const GalleryImages = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<IGalleryImage[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingImage, setEditingImage] = useState<IGalleryImage | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await galleryService.getAllImages();
      if (response.status) {
        setImages(response.data);
      } else {
        message.error(response.message || 'Failed to fetch images');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch images');
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingImage(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IGalleryImage) => {
    setEditingImage(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: IGalleryImage) => {
    confirm({
      title: 'Are you sure you want to delete this image?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await galleryService.deleteImage(record.id);
          if (response.status) {
            message.success(response.message || 'Image deleted successfully');
            fetchImages();
          } else {
            message.error(response.message || 'Failed to delete image');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete image');
          console.error('Error deleting image:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingImage) {
        const response = await galleryService.updateImage(editingImage.id, values);
        if (response.status) {
          message.success(response.message || 'Image updated successfully');
          setIsModalVisible(false);
          fetchImages();
        } else {
          message.error(response.message || 'Failed to update image');
        }
      } else {
        const response = await galleryService.createImage(values);
        if (response.status) {
          message.success(response.message || 'Image created successfully');
          setIsModalVisible(false);
          fetchImages();
        } else {
          message.error(response.message || 'Failed to create image');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save image');
      console.error('Error saving image:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredImages = images.filter(
    (image) =>
      image.title.toLowerCase().includes(searchText.toLowerCase()) ||
      image.description.toLowerCase().includes(searchText.toLowerCase()) ||
      image.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IGalleryImage> = [
    {
      title: "Image",
      key: "image",
      render: (_, record) => (
        <Space>
          <Image
            src={record.url}
            alt={record.title}
            width={80}
            height={80}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            fallback="/placeholder-image.png"
          />
          <Space direction="vertical" size={0}>
            <div style={{ fontWeight: 500 }}>{record.title}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.description}
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
    <div className="gallery-images-page">
      <div className="gallery-images-header">
        <h1>Gallery Images</h1>
        <p>Manage your gallery images and collections</p>
      </div>

      <Row gutter={[16, 16]} className="gallery-images-stats">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Images"
              value={images.length}
              prefix={<PictureOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Categories"
              value={new Set(images.map(i => i.category)).size}
              prefix={<FolderOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Images"
              value={images.filter(i => i.isActive).length}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="gallery-images-controls">
        <Input
          placeholder="Search images..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Image
        </Button>
      </div>

        <Table
        className="gallery-images-table"
          columns={columns}
          dataSource={filteredImages}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingImage ? "Edit Image" : "Add New Image"}
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="url"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
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
            name="altText"
            label="Alt Text"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryImages; 