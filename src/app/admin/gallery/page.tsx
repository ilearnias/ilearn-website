"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Upload,
  Image,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";
import { galleryService, IGalleryItem, IGalleryImage } from "@/services/gallery.service";
import "./styles.scss";

const { confirm } = Modal;

const GalleryPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<IGalleryItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IGalleryItem | null>(null);
  const [uploadedImages, setUploadedImages] = useState<{
    file: UploadFile;
    subtitle: string;
    description: string;
  }[]>([]);
  const [form] = Form.useForm();
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    itemCount: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    fetchItems(meta.page, meta.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only client-side pagination is supported
  const fetchItems = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await galleryService.getAllItems(page, limit);
      if (response.status) {
        setItems(response.data);
        setMeta(response.meta || {});
      } else {
        message.error(response.message || "Failed to fetch gallery items");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch gallery items");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setUploadedImages([]);
    setIsModalVisible(true);
  };

  const handleView = (record: IGalleryItem) => {
    router.push(`/admin/gallery/${record.id}`);
  };

  const handleEdit = (record: IGalleryItem) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      images: undefined,
    });
    setUploadedImages(
      (record.images || []).map((img: IGalleryImage, index: number) => ({
        file: {
          uid: `-${index}`,
          name: img.image.split("/").pop() || "image",
          status: "done",
          url: img.image,
        },
        subtitle: img.subtitle,
        description: img.description,
      }))
    );
    setIsModalVisible(true);
  };

  const handleDelete = (record: IGalleryItem) => {
    confirm({
      title: "Are you sure you want to delete this gallery item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await galleryService.deleteItem(record.id);
          if (response.status) {
            message.success("Gallery item deleted successfully");
            // If the current page is now empty and not the first page, go to the previous page
            const isLastItemOnPage = items.length === 1 && meta.page > 1;
            if (isLastItemOnPage) {
              fetchItems(meta.page - 1, meta.limit);
            } else {
              fetchItems(meta.page, meta.limit);
            }
          } else {
            throw new Error(
              response.message || "Failed to delete gallery item"
            );
          }
        } catch (error: any) {
          // If the item is not found (404), consider it a successful deletion
          if (error.status === 404 || error.statusCode === 404) {
            message.success("Gallery item removed successfully");
            const isLastItemOnPage = items.length === 1 && meta.page > 1;
            if (isLastItemOnPage) {
              fetchItems(meta.page - 1, meta.limit);
            } else {
              fetchItems(meta.page, meta.limit);
            }
          } else {
            // For other errors, show detailed error message
            console.error("Delete error:", error);
            message.error(
              error.message ||
                "Failed to delete gallery item. Please try again."
            );
          }
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Helper to upload a single image and return its URL
  const uploadImageToApi = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file); // field name must be 'file'
    const response = await galleryService.uploadSingleImage(file);
    // If backend returns { url: ... } or { Location: ... }
    return response;
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      // Validate that all images have subtitle and description
      for (const img of uploadedImages) {
        if (!img.subtitle || !img.description) {
          message.error('Please provide subtitle and description for all images');
          return;
        }
      }
      if (uploadedImages.length === 0) {
        message.error('Please select at least one image');
        return;
      }
      // Upload images and collect URLs
      const uploadedImageObjs: IGalleryImage[] = [];
      for (const img of uploadedImages) {
        let imageUrl: string = img.file.url || '';
        if (img.file.originFileObj) {
          const uploaded = await uploadImageToApi(img.file.originFileObj as File);
          imageUrl = uploaded || '';
        }
        uploadedImageObjs.push({
          subtitle: img.subtitle,
          description: img.description,
          image: imageUrl,
        });
      }
      const initialData = {
        title: values.title,
        description: values.description,
        order: values.order,
        isActive: values.isActive,
        images: uploadedImageObjs,
      };
      let galleryItemId: string;
      if (editingItem) {
        galleryItemId = editingItem.id;
        await galleryService.updateItem(galleryItemId, initialData);
      } else {
        const createResponse = await galleryService.createItem(initialData);
        if (!createResponse.status) {
          throw new Error(
            createResponse.message || "Failed to create gallery item"
          );
        }
        galleryItemId = createResponse.data.id;
      }
      message.success(
        editingItem
          ? "Gallery item updated successfully"
          : "Gallery item created successfully"
      );
      setIsModalVisible(false);
      form.resetFields();
      setUploadedImages([]);
      fetchItems();
    } catch (error: any) {
      console.error("Error in handleModalOk:", error);
      message.error(error.message || "Failed to save gallery item");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setUploadedImages([]);
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setUploadedImages((prev) => {
      const newFiles = fileList.map((file) => {
        const existing = prev.find((img) => img.file.uid === file.uid);
        return existing || { file, subtitle: '', description: '' };
      });
      return newFiles;
    });
  };

  const handleImageMetaChange = (uid: string, field: 'subtitle' | 'description', value: string) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.file.uid === uid ? { ...img, [field]: value } : img
      )
    );
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      // Check if file is an accepted image format
      const acceptedFormats = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      const isAcceptedFormat = acceptedFormats.includes(file.type);
      if (!isAcceptedFormat) {
        message.error("You can only upload JPG, PNG, GIF or WebP files!");
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }

      return false; // Return false to handle upload manually
    },
    fileList: uploadedImages.map((img) => img.file),
    onChange: handleUploadChange,
    multiple: true,
    listType: "picture-card" as const,
    accept: ".jpg,.jpeg,.png,.gif,.webp", // Specify accepted file extensions
    maxCount: 10, // Maximum number of files
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // For client-side pagination only
  const paginatedItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const total = filteredItems.length;

  const columns: ColumnsType<IGalleryItem> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <div style={{ fontWeight: 500 }}>{text}</div>,
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      render: (order) => <span>{order}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => <span>{desc}</span>,
    },
    {
      title: "First Image Subtitle",
      key: "firstImageSubtitle",
      render: (_, record) => record.images && record.images[0] ? record.images[0].subtitle : '',
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="default"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Manage your gallery items</p>
      </div>

      <Card className="gallery-controls">
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Input
            placeholder="Search by title..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Gallery Item
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={items}
          loading={loading}
          rowKey="id"
          style={{ marginTop: 16 }}
          pagination={{
            current: meta.page,
            pageSize: meta.limit,
            total: meta.itemCount,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: (page, pageSize) => fetchItems(page, pageSize),
          }}
        />
      </Card>

      {/* Edit/Add Modal */}
      <Modal
        title={editingItem ? "Edit Gallery Item" : "Add Gallery Item"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Images"
            required
            help="Upload one or more images. Maximum size: 5MB per image."
          >
            <Upload
              beforeUpload={uploadProps.beforeUpload}
              fileList={uploadedImages.map((img) => img.file)}
              onChange={({ fileList }) => handleUploadChange({ fileList })}
              multiple
              listType="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.webp"
              maxCount={10}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          {uploadedImages.length > 0 && (
            <div style={{ marginTop: 16 }}>
              {uploadedImages.map((img, idx) => (
                <div key={img.file.uid} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <Image
                    src={img.file.thumbUrl || img.file.url}
                    alt={`Preview ${idx + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="Subtitle"
                      value={img.subtitle}
                      onChange={(e) => handleImageMetaChange(img.file.uid, 'subtitle', e.target.value)}
                      style={{ marginBottom: 8 }}
                    />
                    <Input.TextArea
                      placeholder="Description"
                      value={img.description}
                      onChange={(e) => handleImageMetaChange(img.file.uid, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Form.Item
            name="order"
            label="Order"
            rules={[{ required: true, message: "Please input the order!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryPage;
