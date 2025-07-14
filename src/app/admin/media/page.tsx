"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Modal,
  Form,
  message,
  Switch,
  InputNumber,
  Dropdown,
  Menu,
  Space,
  Row,
  Col,
  Spin,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  LoadingOutlined,
  VideoCameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  mediaService,
  IMedia,
  IMediaCreate,
  IMediaUpdate,
} from "@/services/media.service";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;

const Media = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaList, setMediaList] = useState<IMedia[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMedia, setEditingMedia] = useState<IMedia | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMedia();
  }, [currentPage, pageSize]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await mediaService.getAllMedia(
        currentPage,
        pageSize,
        false
      );
      if (response.status) {
        setMediaList(response.data.data || response.data);
        setTotalItems(response.data.total || response.data.length);
      } else {
        message.error(response.message || "Failed to fetch media");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch media");
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingMedia(null);
    form.resetFields();
    form.setFieldsValue({
      isActive: true,
      isTestimonial: false,
      order: 1,
    });
    setIsModalVisible(true);
  };

  const handleEdit = async (record: IMedia) => {
    try {
      setModalLoading(true);
      // Preload data for editing
      const response = await mediaService.getMediaById(record.id);
      if (response.status) {
        setEditingMedia(response.data);
        form.setFieldsValue({
          description: response.data.description,
          video: response.data.video,
          order: response.data.order,
          isActive: response.data.isActive,
          isTestimonial: response.data.isTestimonial,
        });
        setIsModalVisible(true);
      } else {
        message.error(response.message || "Failed to load media data");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to load media data");
      console.error("Error loading media data:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = (record: IMedia) => {
    confirm({
      title: "Are you sure you want to delete this media?",
      content: `This will permanently delete "${record.description}"`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await mediaService.deleteMedia(record.id);
          if (response.status) {
            message.success(response.message || "Media deleted successfully");
            fetchMedia();
          } else {
            message.error(response.message || "Failed to delete media");
          }
        } catch (error: any) {
          message.error(error.message || "Failed to delete media");
          console.error("Error deleting media:", error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setModalLoading(true);

      if (editingMedia) {
        // Update existing media
        const response = await mediaService.updateMedia(
          editingMedia.id,
          values
        );
        if (response.status) {
          message.success(response.message || "Media updated successfully");
          setIsModalVisible(false);
          fetchMedia();
        } else {
          message.error(response.message || "Failed to update media");
        }
      } else {
        // Create new media
        const response = await mediaService.createMedia(values);
        if (response.status) {
          message.success(response.message || "Media created successfully");
          setIsModalVisible(false);
          fetchMedia();
        } else {
          message.error(response.message || "Failed to create media");
        }
      }
    } catch (error: any) {
      if (error.errorFields) {
        // Form validation error
        return;
      }
      message.error(error.message || "Failed to save media");
      console.error("Error saving media:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingMedia(null);
    form.resetFields();
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
  };

  const filteredMedia = mediaList.filter((item) =>
    item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IMedia> = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      width: 80,
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Video URL",
      dataIndex: "video",
      key: "video",
      ellipsis: true,
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url.length > 50 ? `${url.substring(0, 50)}...` : url}
        </a>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tag color={record.isActive ? "green" : "red"}>
            {record.isActive ? "Active" : "Inactive"}
          </Tag>
          {record.isTestimonial && <Tag color="blue">Testimonial</Tag>}
        </Space>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => new Date(date).toLocaleDateString(),
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
                key="preview"
                icon={<PlayCircleOutlined />}
                onClick={() => window.open(record.video, "_blank")}
              >
                Preview
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

  const stats = [
    {
      label: "Total Media",
      value: totalItems,
      icon: <VideoCameraOutlined />,
      color: "#3b82f6",
    },
    {
      label: "Active Media",
      value: mediaList.filter((item) => item.isActive).length,
      icon: <CheckCircleOutlined />,
      color: "#10b981",
    },
    {
      label: "Testimonials",
      value: mediaList.filter((item) => item.isTestimonial).length,
      icon: <EyeOutlined />,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="media-page">
      <div className="media-header">
        <h1>Media Management</h1>
        <p>Manage your video content and testimonials</p>
      </div>

      <div className="media-controls">
        <Input
          placeholder="Search media by description..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Media
        </Button>
      </div>

      <Table
        className="media-table"
        columns={columns}
        dataSource={filteredMedia}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          total: totalItems,
          pageSize: pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: handlePageChange,
          onShowSizeChange: handlePageChange,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />

      <Modal
        title={editingMedia ? "Edit Media" : "Add New Media"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={modalLoading}
        width={600}
        okText={editingMedia ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Spin spinning={modalLoading} tip="Loading media data...">
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              isActive: true,
              isTestimonial: false,
              order: 1,
            }}
          >
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter a description" },
                {
                  max: 500,
                  message: "Description cannot exceed 500 characters",
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Enter media description..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="video"
              label="Video URL"
              rules={[
                { required: true, message: "Please enter video URL" },
                { type: "url", message: "Please enter a valid URL" },
              ]}
            >
              <Input
                placeholder="https://example.com/video.mp4"
                prefix={<PlayCircleOutlined />}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="order"
                  label="Display Order"
                  rules={[
                    { required: true, message: "Please enter display order" },
                    {
                      type: "number",
                      min: 1,
                      message: "Order must be at least 1",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: "100%" }}
                    placeholder="1"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="isActive"
                  label="Status"
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="isTestimonial"
              label="Is Testimonial"
              valuePropName="checked"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Media;
