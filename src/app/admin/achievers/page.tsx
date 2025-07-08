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
  Upload,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { achieverService, IAchiever } from "@/services/achievers.service";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;

const Achievers = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [achievers, setAchievers] = useState<IAchiever[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState<IAchiever | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
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
    let mounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await achieverService.getAllAchievers();
        if (mounted && response.status) {
          setAchievers(response.data);
        } else if (mounted) {
          message.error(response.message || "Failed to fetch achievers");
        }
      } catch (error: any) {
        if (mounted) {
          message.error(error.message || "Failed to fetch achievers");
          console.error("Error fetching achievers:", error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = () => {
    setEditingAchiever(null);
    setUploadedFile(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true }); // Set default value for isActive
    setIsModalVisible(true);
  };

  const handleEdit = (record: IAchiever) => {
    setEditingAchiever(record);
    // If there is an image, show it in the Upload preview
    if (record.image) {
      setUploadedFile({
        uid: '-1',
        name: 'image.jpg',
        status: 'done',
        url: record.image,
      });
    } else {
      setUploadedFile(null);
    }
    form.setFieldsValue(record);
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
            message.success(response.message || "Achiever deleted successfully");
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

  // Helper to upload a single image and return its URL
  const uploadImageToApi = async (file: File): Promise<string> => {
    const response = await achieverService.uploadSingleImage(file);
    return response;
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.order = Number(values.order);
      values.isActive = Boolean(values.isActive);

      // Handle image upload if a new file is selected
      if (uploadedFile && uploadedFile.originFileObj) {
        try {
          const imageUrl = await uploadImageToApi(uploadedFile.originFileObj);
          console.log("hello====>>>>",imageUrl);
          values.image = imageUrl;
        } catch (error: any) {
          message.error(error.message || 'Failed to upload image');
          return;
        }
      }

      if (editingAchiever) {
        const response = await achieverService.updateAchiever(editingAchiever.id, values);
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
    form.resetFields();
    setUploadedFile(null);
  };

  const handleUploadChange: UploadProps['onChange'] = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      try {
        if (file.originFileObj) {
          achieverService.validateImageFile(file.originFileObj as File);
        }
        setUploadedFile(file);
      } catch (error: any) {
        message.error(error.message);
        return;
      }
    } else {
      setUploadedFile(null);
    }
  };

  // Memoize filtered achievers to prevent unnecessary recalculations
  const filteredAchievers = useMemo(() => {
    return achievers.filter(
      (achiever) =>
        achiever.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (achiever.details?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (achiever.description?.toLowerCase() || "").includes(searchText.toLowerCase())
    );
  }, [achievers, searchText]);

  const columns: ColumnsType<IAchiever> = [
    {
      title: "Name & Details",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <img
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
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.details}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
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
        <div className="table-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
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
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="details"
              label="Details"
              rules={[{ required: true, message: "Please enter details" }]}
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

            <Form.Item
              label="Image"
              name="image"
            >
              <Upload
                listType="picture-card"
                fileList={uploadedFile ? [uploadedFile] : []}
                onChange={handleUploadChange}
                beforeUpload={() => false} // Prevent auto upload
                accept="image/*"
                maxCount={1}
              >
                {!uploadedFile && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB
              </div>
            </Form.Item>

            <Form.Item
              name="order"
              label="Order"
              rules={[{ required: true, message: "Please enter order" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
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
