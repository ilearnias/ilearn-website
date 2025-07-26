"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Tag,
  Modal,
  Form,
  message,
  Select,
  InputNumber,
  Upload,
  UploadProps,
  Image,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { teamService, ITeamMember } from "@/services/team.service";
import { API_ENDPOINTS } from "@/config/api";
import { apiRequest } from "@/config/apiRequest";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;
const { Dragger } = Upload;

const Team = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<ITeamMember | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [form] = Form.useForm();

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  // Fetch team members on component mount
  const fetchTeamMembers = useCallback(async (page = 1, pageSize = 10, search = "") => {
    try {
      setLoading(true);
      const response: any = await teamService.getAllTeamMembers(page, pageSize, search.trim() || "");
      if (response.status) {
        setTeamMembers(response.data);

        // Update pagination state with metadata from response
        if (response.meta) {
          setPagination((prev) => ({
            ...prev,
            current: response.meta.page,
            total: response.meta.itemCount,
            pageSize: response.meta.limit,
          }));
        }
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

  // Initial fetch
  useEffect(() => {
    fetchTeamMembers(1, 10, "");
  }, [fetchTeamMembers]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTeamMembers(1, pagination.pageSize, searchText);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchText, fetchTeamMembers, pagination.pageSize]);

  const handleAdd = () => {
    setEditingMember(null);
    setUploadedImageUrl("");
    form.resetFields();
    form.setFieldsValue({ isActive: true });
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
            await fetchTeamMembers(pagination.current, pagination.pageSize, searchText);
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

      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        message.error("Image must be smaller than 3MB!");
        return false;
      }

      return true;
    },
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.order = Number(values.order);
      values.isActive = values.isActive === true ? true : false;

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
          await fetchTeamMembers(pagination.current, pagination.pageSize, searchText);
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
          await fetchTeamMembers(pagination.current, pagination.pageSize, searchText);
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

  // Handle pagination changes
  const handleTableChange = (paginationInfo: any) => {
    const { current, pageSize } = paginationInfo;
    setPagination((prev) => ({
      ...prev,
      current,
      pageSize,
    }));
    fetchTeamMembers(current, pageSize, searchText);
  };

  // Remove client-side filtering since we're using server-side search

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
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },

    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive === true ? "green" : "red"}>
          {isActive === true ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined color="red" />}
            onClick={() => handleDelete(record)}
          />
        </div>
        // <Dropdown
        //   overlay={
        //     <Menu>
        //       <Menu.Item
        //         key="edit"
        //         icon={<EditOutlined />}
        //         onClick={() => handleEdit(record)}
        //       >
        //         Edit
        //       </Menu.Item>
        //       <Menu.Item
        //         key="delete"
        //         icon={<DeleteOutlined />}
        //         danger
        //         onClick={() => handleDelete(record)}
        //       >
        //         Delete
        //       </Menu.Item>
        //     </Menu>
        //   }
        //   trigger={["click"]}
        // >
        //   <Button type="text" icon={<MoreOutlined />} />
        // </Dropdown>
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
          placeholder="Search team members by name..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Member
        </Button>
      </div>

      <Table
        className="team-table"
        columns={columns}
        dataSource={teamMembers}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
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
        <Form form={form} layout="vertical" initialValues={{ isActive: true }}>
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
                name="designation"
                label="Designation"
                rules={[
                  { required: true, message: "Please enter designation" },
                ]}
              >
                <Input placeholder="Enter designation" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item hidden name="bio" label="Bio">
            <TextArea
              rows={4}
              placeholder="Enter team member bio"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="Profile Image (size:300x250)"
            required
            help="Upload a profile image (JPG, PNG, GIF up to 3MB)"
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
                  Support for JPG, PNG, GIF up to 3MB
                </p>
              </Dragger>
            )}
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item hidden name="email" label="Email">
                <Input placeholder="Enter email address" type="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item hidden name="phone" label="Phone">
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
                  type="number"
                  style={{ width: "100%" }}
                  placeholder="Enter display order (1, 2, 3...)"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isActive" label="Status">
                <Select>
                  <Select.Option value={true}>Active</Select.Option>
                  <Select.Option value={false}>Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item hidden name="department" label="Department">
                <Input placeholder="Enter department" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                hidden
                name="linkedin"
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
                hidden
                name="twitter"
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
                hidden
                name="facebook"
                label="Facebook"
                rules={[
                  { type: "url", message: "Facebook must be a URL address" },
                ]}
              >
                <Input placeholder="https://facebook.com/username" type="url" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hidden
                name="instagram"
                label="Instagram"
                rules={[
                  { type: "url", message: "Instagram must be a URL address" },
                ]}
              >
                <Input
                  placeholder="https://instagram.com/username"
                  type="url"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Team;
