"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Image,
  Modal,
  Form,
  message,
  Upload,
  Input,
  Spin,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useRouter, useParams } from "next/navigation";
import { galleryService, IGalleryItem } from "@/services/gallery.service";
import "../styles.scss";

const { Title, Text } = Typography;

const GalleryItemPage = () => {
  const router = useRouter();
  const params = useParams();
  const galleryId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [galleryItem, setGalleryItem] = useState<IGalleryItem | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (galleryId) {
      fetchGalleryItem();
    }
  }, [galleryId]);

  const fetchGalleryItem = async () => {
    try {
      setLoading(true);
      const response = await galleryService.getItemById(galleryId);
      if (response.status) {
        setGalleryItem(response.data);
      } else {
        message.error(response.message || 'Failed to fetch gallery item');
        router.push('/admin/gallery');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch gallery item');
      router.push('/admin/gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/admin/gallery');
  };

  const handleAddPhotos = () => {
    setIsAddModalVisible(true);
    setUploadedFiles([]);
    form.resetFields();
  };

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      setLoading(true);
      // Remove the image from the gallery item
      const updatedImages = galleryItem!.images.filter(img => img !== imageUrl);
      
      const updateData = {
        title: galleryItem!.title,
        order: galleryItem!.order,
        isActive: galleryItem!.isActive,
        images: updatedImages
      };

      const response = await galleryService.updateItem(galleryId, updateData);
      if (response.status) {
        message.success('Image removed successfully');
        setGalleryItem(prev => prev ? { ...prev, images: updatedImages } : null);
      } else {
        throw new Error(response.message || 'Failed to remove image');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to remove image');
    } finally {
      setLoading(false);
    }
  };

  // Helper to upload a single image and return its URL
  const uploadImageToApi = async (file: File): Promise<string> => {
    const response = await galleryService.uploadSingleImage(file);
    return response;
  };

  const handleAddModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (uploadedFiles.length === 0) {
        message.error('Please select at least one image');
        return;
      }

      setUploading(true);

      // Upload new images and get their URLs
      const newFiles = uploadedFiles.filter(file => file.originFileObj);
      const filesToUpload = newFiles
        .map(file => file.originFileObj as File)
        .filter(Boolean);

      if (filesToUpload.length === 0) {
        message.error('No valid files to upload');
        return;
      }

      // Upload each file and collect URLs
      const uploadedImageUrls: string[] = [];
      for (const file of filesToUpload) {
        const url = await uploadImageToApi(file);
        uploadedImageUrls.push(url);
      }

      // Add new images to existing gallery item
      const updatedImages = [...(galleryItem?.images || []), ...uploadedImageUrls];
      
      const updateData = {
        title: galleryItem!.title,
        order: galleryItem!.order,
        isActive: galleryItem!.isActive,
        images: updatedImages
      };

      const response = await galleryService.updateItem(galleryId, updateData);
      if (response.status) {
        message.success('Images added successfully');
        setGalleryItem(prev => prev ? { ...prev, images: updatedImages } : null);
        setIsAddModalVisible(false);
        form.resetFields();
        setUploadedFiles([]);
      } else {
        throw new Error(response.message || 'Failed to add images');
      }
    } catch (error: any) {
      console.error('Error in handleAddModalOk:', error);
      message.error(error.message || 'Failed to add images');
    } finally {
      setUploading(false);
    }
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
    setUploadedFiles([]);
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    // Filter out invalid files
    const validFiles = fileList.filter(file => {
      // Check file size
      if (file.size && file.size > 5 * 1024 * 1024) {
        message.error(`${file.name} is larger than 5MB`);
        return false;
      }

      // Check file type if it's a new upload
      if (file.originFileObj) {
        const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!acceptedFormats.includes(file.type || '')) {
          message.error(`${file.name} is not a valid image format`);
          return false;
        }
      }

      return true;
    });

    setUploadedFiles(validFiles);
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      // Check if file is an accepted image format
      const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const isAcceptedFormat = acceptedFormats.includes(file.type);
      if (!isAcceptedFormat) {
        message.error('You can only upload JPG, PNG, GIF or WebP files!');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }

      return false; // Return false to handle upload manually
    },
    fileList: uploadedFiles,
    onChange: handleUploadChange,
    multiple: true,
    listType: "picture-card" as const,
    accept: '.jpg,.jpeg,.png,.gif,.webp',
    maxCount: 10,
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!galleryItem) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Text>Gallery item not found</Text>
        <br />
        <Button type="primary" onClick={handleBack} style={{ marginTop: 16 }}>
          Back to Gallery
        </Button>
      </div>
    );
  }

  return (
    <div className="gallery-item-page">
      <div className="gallery-item-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          style={{ marginBottom: 16 }}
        >
          Back to Gallery
        </Button>
        
        <Title level={2}>{galleryItem.title}</Title>
        
        <div style={{ marginTop: 16 }}>
          <Space>
            <Text>Order: {galleryItem.order}</Text>
            <Text>Status: {galleryItem.isActive ? 'Active' : 'Inactive'}</Text>
            <Text>Images: {galleryItem.images.length}</Text>
          </Space>
        </div>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4}>Images ({galleryItem.images.length})</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddPhotos}
          >
            Add New Photos
          </Button>
        </div>

        {galleryItem.images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Text type="secondary">No images found. Click "Add New Photos" to upload images.</Text>
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {galleryItem.images.map((imageUrl, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  hoverable
                  cover={
                    <Image
                      src={imageUrl}
                      alt={`Gallery ${index + 1}`}
                      style={{ height: 200, objectFit: 'cover' }}
                      preview={{
                        src: imageUrl,
                      }}
                    />
                  }
                  actions={[
                    <Button
                      key="delete"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteImage(imageUrl)}
                      loading={loading}
                    >
                      Remove
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={`Image ${index + 1}`}
                    description={`Uploaded image ${index + 1}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>

      {/* Add Photos Modal */}
      <Modal
        title="Add New Photos"
        open={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        confirmLoading={uploading}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Upload Images (size:800x800)"
            required
            help="Upload one or more images. Maximum size: 5MB per image."
          >
            <Upload {...uploadProps}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryItemPage; 