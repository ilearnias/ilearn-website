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
  Select,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { galleryService, IGalleryImage, IGalleryTitle } from "@/services/gallery.service";
import "./styles.scss";

const { confirm } = Modal;

const GalleryImages = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<IGalleryImage[]>([]);
  const [titles, setTitles] = useState<IGalleryTitle[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingImage, setEditingImage] = useState<IGalleryImage | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchImages();
    fetchTitles();
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
    } finally {
      setLoading(false);
    }
  };

  const fetchTitles = async () => {
    try {
      const response = await galleryService.getAllTitles();
      if (response.status) {
        setTitles(response.data);
      } else {
        message.error(response.message || 'Failed to fetch titles');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch titles');
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
            message.success('Image deleted successfully');
            fetchImages();
          } else {
            message.error(response.message || 'Failed to delete image');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete image');
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
          message.success('Image updated successfully');
          setIsModalVisible(false);
          fetchImages();
        } else {
          message.error(response.message || 'Failed to update image');
        }
      } else {
        const response = await galleryService.createImage(values);
        if (response.status) {
          message.success('Image created successfully');
          setIsModalVisible(false);
          fetchImages();
        } else {
          message.error(response.message || 'Failed to create image');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save image');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredImages = images.filter(
    (image) =>
      image.tags.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IGalleryImage> = [
    {
      title: "Image",
      key: "media",
      render: (_, record) => (
        <img 
          src={record.media} 
          alt="Gallery" 
          style={{ width: '100px', height: '60px', objectFit: 'cover' }} 
        />
      ),
    },
    {
      title: "Title",
      key: "titleId",
      render: (_, record) => {
        const title = titles.find(t => t.id === record.titleId);
        return title ? title.title : '-';
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
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
    <div className="gallery-images-page">
      <div className="gallery-images-header">
        <h1>Gallery Images</h1>
        <p>Manage your gallery images</p>
      </div>

      <Card className="gallery-images-controls">
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Input
            placeholder="Search by tags..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Image
          </Button>
        </Space>
      </Card>

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
          initialValues={{ isActive: true, order: 1 }}
        >
          <Form.Item
            name="titleId"
            label="Title"
            rules={[{ required: true, message: "Please select a title" }]}
          >
            <Select>
              {titles.map(title => (
                <Select.Option key={title.id} value={title.id}>
                  {title.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="media"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true, message: "Please enter tags" }]}
          >
            <Input placeholder="Comma separated tags (e.g., event,2023)" />
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

export default GalleryImages; 