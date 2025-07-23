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
import { galleryService, IGalleryItem } from "@/services/gallery.service";
import "./styles.scss";

const { confirm } = Modal;

const GalleryPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<IGalleryItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IGalleryItem | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchItems();
  }, []);

  // Only client-side pagination is supported
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await galleryService.getAllItems();
      if (response.status) {
        setItems(response.data);
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
    setUploadedFiles([]);
    setIsModalVisible(true);
  };

  const handleView = (record: IGalleryItem) => {
    router.push(`/admin/gallery/${record.id}`);
  };

  const handleEdit = (record: IGalleryItem) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      images: undefined, // Clear images field as we'll show existing images separately
    });
    setUploadedFiles(
      record.images.map((url, index) => ({
        uid: `-${index}`,
        name: url.split("/").pop() || "image",
        status: "done",
        url: url,
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
            // Update the local state to remove the item
            setItems((prev) => prev.filter((item) => item.id !== record.id));
          } else {
            throw new Error(
              response.message || "Failed to delete gallery item"
            );
          }
        } catch (error: any) {
          // If the item is not found (404), consider it a successful deletion
          if (error.status === 404 || error.statusCode === 404) {
            message.success("Gallery item removed successfully");
            // Update the local state to remove the item
            setItems((prev) => prev.filter((item) => item.id !== record.id));
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

      // Validate that at least one image is selected for new items
      const newFiles = uploadedFiles.filter((file) => file.originFileObj);
      const existingImages = uploadedFiles
        .filter((file) => !file.originFileObj)
        .map((file) => file.url as string);

      if (
        !editingItem &&
        newFiles.length === 0 &&
        existingImages.length === 0
      ) {
        message.error("Please select at least one image");
        return;
      }

      // Upload new images and get their URLs
      let uploadedImageUrls: string[] = [];
      if (newFiles.length > 0) {
        const filesToUpload = newFiles
          .map((file) => file.originFileObj as File)
          .filter(Boolean); // Remove any undefined/null values

        if (filesToUpload.length !== newFiles.length) {
          throw new Error("Some files are not properly loaded");
        }

        // Upload each file and collect URLs
        for (const file of filesToUpload) {
          const url = await uploadImageToApi(file);
          uploadedImageUrls.push(url);
        }
      }

      // Combine existing and newly uploaded image URLs
      const allImages = [...existingImages, ...uploadedImageUrls];

      // Prepare gallery item data
      const initialData = {
        title: values.title,
        order: values.order,
        isActive: values.isActive,
        images: allImages, // Only URLs
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
      setUploadedFiles([]);
      fetchItems();
    } catch (error: any) {
      console.error("Error in handleModalOk:", error);
      message.error(error.message || "Failed to save gallery item");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setUploadedFiles([]);
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    // Filter out invalid files
    const validFiles = fileList.filter((file) => {
      // Check file size
      if (file.size && file.size > 5 * 1024 * 1024) {
        message.error(`${file.name} is larger than 5MB`);
        return false;
      }

      // Check file type if it's a new upload
      if (file.originFileObj) {
        const acceptedFormats = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!acceptedFormats.includes(file.type || "")) {
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
    fileList: uploadedFiles,
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
          dataSource={paginatedItems}
          loading={loading}
          rowKey="id"
          style={{ marginTop: 16 }}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            position: ["bottomCenter"],
            responsive: true,
          }}
          onChange={(pagination) => {
            setPage(pagination.current || 1);
            setPageSize(pagination.pageSize || 10);
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
            label="Images"
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
