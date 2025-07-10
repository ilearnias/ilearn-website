"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
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
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Form,
  message,
  Select,
  InputNumber,
  Switch,
  Upload,
  UploadProps,
  Image,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  UploadOutlined,
  InboxOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { teamService, ITeamMember } from "@/services/team.service";
import { API_CONFIG, API_ENDPOINTS } from "@/config/api";
import { apiRequest } from "@/config/apiRequest";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;
const { Dragger } = Upload;

const Team = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<ITeamMember | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [form] = Form.useForm();

  // Fetch team members on component mount
  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await teamService.getAllTeamMembers();
      if (response.status) {
        setTeamMembers(response.data);
      } else {
        message.error(response.message || "Failed to fetch team members");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch team members");
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleAdd = () => {
    setEditingMember(null);
    setUploadedImageUrl("");
    form.resetFields();
    form.setFieldsValue({ status: "active" });
    setIsModalVisible(true);
  };

  const handleEdit = (record: ITeamMember) => {
    setEditingMember(record);
    setUploadedImageUrl(record.image || "");
    form.setFieldsValue({
      ...record,
      image: undefined, // Don't set image field, we'll handle it separately
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: ITeamMember) => {
    confirm({
      title: "Are you sure you want to delete this team member?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await teamService.deleteTeamMember(record.id);
          if (response.status) {
            message.success(
              response.message || "Team member deleted successfully"
            );
            await fetchTeamMembers();
          } else {
            message.error(response.message || "Failed to delete team member");
          }
        } catch (error: any) {
          message.error(error.message || "Failed to delete team member");
          console.error("Error deleting team member:", error);
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
      values.status = values.status === true ? "active" : "inactive";

      // Use uploaded image URL if available, otherwise use the existing image URL
      values.image = uploadedImageUrl || editingMember?.image || "";

      if (!values.image) {
        message.error("Please upload an image");
        return;
      }

      if (editingMember) {
        const response = await teamService.updateTeamMember(
          editingMember.id,
          values
        );
        if (response.status) {
          message.success(
            response.message || "Team member updated successfully"
          );
          setIsModalVisible(false);
          await fetchTeamMembers();
        } else {
          message.error(response.message || "Failed to update team member");
        }
      } else {
        const response = await teamService.createTeamMember(values);
        if (response.status) {
          message.success(
            response.message || "Team member created successfully"
          );
          setIsModalVisible(false);
          await fetchTeamMembers();
        } else {
          message.error(response.message || "Failed to create team member");
        }
      }
    } catch (error: any) {
      message.error(error.message || "Failed to save team member");
      console.error("Error saving team member:", error);
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

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.position.toLowerCase().includes(searchText.toLowerCase()) ||
        member.department.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [teamMembers, searchText]);

  const getStatusColor = (status: string) => {
    return status === "active" ? "green" : "red";
  };

  const columns: ColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <Image
          src={image || "/placeholder.png"}
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
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "LinkedIn",
      dataIndex: ["socialLinks", "linkedin"],
      key: "linkedin",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        ) : null,
    },
    {
      title: "Twitter",
      dataIndex: ["socialLinks", "twitter"],
      key: "twitter",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        ) : null,
    },
    {
      title: "Facebook",
      dataIndex: ["socialLinks", "facebook"],
      key: "facebook",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        ) : null,
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Active" : "Inactive"}
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
    <div className="team-page">
      <div className="team-header">
        <h1>Team Management</h1>
        <p>Manage your team members and their roles</p>
      </div>

      <div className="team-controls">
        <Input
          placeholder="Search team members..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Member
        </Button>
      </div>

      <Table
        className="team-table"
        columns={columns}
        dataSource={filteredMembers}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingMember ? "Edit Team Member" : "Add New Team Member"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText={editingMember ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: "active" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Enter team member name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: "Please enter position" }]}
              >
                <Input placeholder="Enter position" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="bio"
            label="Bio"
            rules={[{ required: true, message: "Please enter bio" }]}
          >
            <TextArea
              rows={4}
              placeholder="Enter team member bio"
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
                <div style={{ position: "relative", display: "inline-block" }}>
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input placeholder="Enter email address" type="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Display Order"
                rules={[{ required: true, message: "Please enter order" }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Enter display order (1, 2, 3...)"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="Department">
                <Input placeholder="Enter department" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["socialLinks", "linkedin"]}
                label="LinkedIn"
                rules={[
                  { type: "url", message: "LinkedIn must be a URL address" },
                ]}
              >
                <Input
                  placeholder="https://linkedin.com/in/username"
                  type="url"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["socialLinks", "twitter"]}
                label="Twitter"
                rules={[
                  { type: "url", message: "Twitter must be a URL address" },
                ]}
              >
                <Input placeholder="https://twitter.com/username" type="url" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["socialLinks", "facebook"]}
                label="Facebook"
                rules={[
                  { type: "url", message: "Facebook must be a URL address" },
                ]}
              >
                <Input placeholder="https://facebook.com/username" type="url" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="status" label="Status" initialValue="active">
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Team;
