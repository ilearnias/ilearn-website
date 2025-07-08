"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Space,
  Tag,
  Modal,
  Form,
  message,
  InputNumber,
  Switch,
  Image,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  InboxOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { achieverService, IAchiever } from "@/services/achievers.service";
import { API_CONFIG, API_ENDPOINTS } from "@/config/api";
import { apiRequest } from "@/config/apiRequest";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;
const { Dragger } = Upload;

const Achievers = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [achievers, setAchievers] = useState<IAchiever[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState<IAchiever | null>(
    null
  );
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [form] = Form.useForm();

  const fetchAchievers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await achieverService.getAllAchievers();
      if (response.status) {
        setAchievers(response.data);
      } else {
        message.error(response.message || "Failed to fetch achievers");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch achievers");
      console.error("Error fetching achievers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievers();
  }, [fetchAchievers]);

  const handleAdd = () => {
    setEditingAchiever(null);
    setUploadedImageUrl("");
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setIsModalVisible(true);
  };

  const handleEdit = (record: IAchiever) => {
    setEditingAchiever(record);
    setUploadedImageUrl(record.image);
    form.setFieldsValue({
      ...record,
      image: undefined, // Don't set image field, we'll handle it separately
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: IAchiever) => {
    confirm({
      title: "Are you sure you want to delete this achiever?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await achieverService.deleteAchiever(record.id);
          if (response.status) {
            message.success(
              response.message || "Achiever deleted successfully"
            );
            await fetchAchievers();
          } else {
            message.error(response.message || "Failed to delete achiever");
          }
        } catch (error: any) {
          message.error(error.message || "Failed to delete achiever");
          console.error("Error deleting achiever:", error);
        }
      },
    });
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError, onProgress }) => {
      try {
        setUploadLoading(true);
        const formData = new FormData();
        formData.append("file", file as File);

        const result = await apiRequest.upload(
          API_ENDPOINTS.ADMIN.UPLOAD.IMAGE,
          formData,
          (progress) => {
            onProgress?.({ percent: progress });
          }
        );

        if (result.status) {
          setUploadedImageUrl(result.data.url || result.data);
          onSuccess?.(result);
          message.success("Image uploaded successfully!");
        } else {
          throw new Error(result.message || "Upload failed");
        }
      } catch (error: any) {
        onError?.(error);
        message.error(error.message || "Upload failed");
      } finally {
        setUploadLoading(false);
      }
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }

      return true;
    },
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.order = Number(values.order);
      values.isActive = Boolean(values.isActive);

      // Use uploaded image URL if available, otherwise use the existing image URL
      values.image = uploadedImageUrl || editingAchiever?.image || "";

      if (!values.image) {
        message.error("Please upload an image");
        return;
      }

      if (editingAchiever) {
        const response = await achieverService.updateAchiever(
          editingAchiever.id,
          values
        );
        if (response.status) {
          message.success(response.message || "Achiever updated successfully");
          setIsModalVisible(false);
          await fetchAchievers();
        } else {
          message.error(response.message || "Failed to update achiever");
        }
      } else {
        const response = await achieverService.createAchiever(values);
        if (response.status) {
          message.success(response.message || "Achiever created successfully");
          setIsModalVisible(false);
          await fetchAchievers();
        } else {
          message.error(response.message || "Failed to create achiever");
        }
      }
    } catch (error: any) {
      message.error(error.message || "Failed to save achiever");
      console.error("Error saving achiever:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setUploadedImageUrl("");
    form.resetFields();
  };

  const removeUploadedImage = () => {
    setUploadedImageUrl("");
    message.info("Image removed");
  };

  const filteredAchievers = useMemo(() => {
    return achievers.filter(
      (achiever) =>
        achiever.name.toLowerCase().includes(searchText.toLowerCase()) ||
        achiever.details.toLowerCase().includes(searchText.toLowerCase()) ||
        achiever.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [achievers, searchText]);

  const columns: ColumnsType<IAchiever> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "name",
      render: (_, record) => (
        <Space>
          <Image
            src={record.image}
            alt={record.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.png";
            }}
          />
        </Space>
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: 100,
    },

    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      // width: 100,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      // width: 100,
    },

    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      // width: 100,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="achievers-page">
      <Card>
        <div
          className="table-header"
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Input
            placeholder="Search achievers..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Achiever
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredAchievers}
          rowKey="id"
          loading={loading}
        />

        <Modal
          title={editingAchiever ? "Edit Achiever" : "Add New Achiever"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={700}
          okText={editingAchiever ? "Update" : "Create"}
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter achiever name" />
            </Form.Item>

            <Form.Item
              name="details"
              label="Details"
              rules={[{ required: true, message: "Please enter details" }]}
            >
              <Input placeholder="Enter achiever details" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <TextArea
                rows={4}
                placeholder="Enter detailed description"
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              label="Profile Image"
              required
              help="Upload a profile image (JPG, PNG, GIF up to 5MB)"
            >
              {uploadedImageUrl ? (
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Image
                      src={uploadedImageUrl}
                      alt="Uploaded"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.png";
                      }}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={removeUploadedImage}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        background: "#fff",
                        border: "1px solid #ff4d4f",
                        borderRadius: "50%",
                        width: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(uploadedImageUrl, "_blank")}
                    >
                      View Full Image
                    </Button>
                  </div>
                </div>
              ) : (
                <Dragger {...uploadProps} disabled={uploadLoading}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {uploadLoading
                      ? "Uploading..."
                      : "Click or drag image to this area to upload"}
                  </p>
                  <p className="ant-upload-hint">
                    Support for JPG, PNG, GIF up to 5MB
                  </p>
                </Dragger>
              )}
            </Form.Item>

            <Form.Item
              name="order"
              label="Display Order"
              rules={[
                { required: true, message: "Please enter display order" },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Enter display order (1, 2, 3...)"
              />
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Active Status"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Achievers;
