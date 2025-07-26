"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Upload,
  Image,
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
import type { UploadFile } from "antd/es/upload/interface";
import "./styles.scss";
import { debounce } from "lodash";

const { confirm } = Modal;
const { TextArea } = Input;

const Testimonials = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaList, setMediaList] = useState<IMedia[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMedia, setEditingMedia] = useState<IMedia | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [form] = Form.useForm();
  const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);

  // Replace individual pagination states with meta object
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    itemCount: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  // Add debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchText(value);
      setMeta((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
    }, 500),
    []
  );

  useEffect(() => {
    fetchMedia();
  }, [meta.page, meta.limit, searchText]); // Add searchText dependency

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await mediaService.getAllMedia(
        meta.page,
        meta.limit,
        true, // isTestimonial
        searchText // search parameter
      );
      if (response.status) {
        setMediaList(response.data.data || response.data);
        // Update meta information
        setMeta(
          response.meta || {
            page: meta.page,
            limit: meta.limit,
            itemCount: response.data.total || response.data.length,
            totalPages: Math.ceil(
              (response.data.total || response.data.length) / meta.limit
            ),
            hasPreviousPage: meta.page > 1,
            hasNextPage:
              meta.page * meta.limit <
              (response.data.total || response.data.length),
          }
        );
      } else {
        message.error(response.message || "Failed to fetch testimonials");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch testimonials");
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingMedia(null);
    form.resetFields();
    form.setFieldsValue({
      isActive: true,
      isTestimonial: true,
      order: 1,
    });
    setThumbnailFile([]);
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
        setThumbnailFile(
          response.data.thumbnail
            ? [
                {
                  uid: "-1",
                  name: "thumbnail.jpg",
                  status: "done",
                  url: response.data.thumbnail,
                },
              ]
            : []
        );
        setIsModalVisible(true);
      } else {
        message.error(response.message || "Failed to load testimonials data");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to load testimonials data");
      console.error("Error loading testimonials data:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = (record: IMedia) => {
    confirm({
      title: "Are you sure you want to delete this testimonial?",
      content: `This will permanently delete "${record.description}"`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await mediaService.deleteMedia(record.id);

          if (response.status) {
            // Optimistically update UI
            setMediaList((prev) =>
              prev.filter((item) => item.id !== record.id)
            );
            setTotalItems((prev) => prev - 1);

            // If this was the last item on the current page, go to previous page
            const isLastItemOnPage = mediaList.length === 1 && currentPage > 1;
            if (isLastItemOnPage) {
              setCurrentPage((prev) => prev - 1);
              // fetchMedia will be triggered by useEffect when currentPage changes
            }

            message.success("Testimonial deleted successfully");
          } else {
            // Show error message and refetch to ensure UI is in sync
            message.error(response.message || "Failed to delete testimonial");
            fetchMedia();
          }
        } catch (error: any) {
          console.error("Error deleting testimonial:", error);
          message.error("Failed to delete testimonial");
          // Refetch data if deletion failed to ensure UI is in sync
          fetchMedia();
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      form.setFields([{ name: "thumbnail", touched: true }]);
      const values = await form.validateFields();
      setModalLoading(true);

      // Handle thumbnail upload
      let thumbnailUrl = values.thumbnail;
      const newFile = thumbnailFile.find((file) => file.originFileObj);
      if (newFile && newFile.originFileObj) {
        thumbnailUrl = await mediaService.uploadSingleImage(
          newFile.originFileObj as File
        );
      } else if (thumbnailFile.length > 0 && thumbnailFile[0].url) {
        thumbnailUrl = thumbnailFile[0].url;
      } else {
        thumbnailUrl = undefined;
      }
      values.thumbnail = thumbnailUrl;

      if (editingMedia) {
        // Update existing testimonials
        const response = await mediaService.updateMedia(
          editingMedia.id,
          values
        );
        if (response.status) {
          message.success(response.message || "Media updated successfully");
          setIsModalVisible(false);
          fetchMedia();
        } else {
          message.error(response.message || "Failed to update testimonials");
        }
      } else {
        // Create new testimonials
        const response = await mediaService.createMedia(values);
        if (response.status) {
          message.success(response.message || "Media created successfully");
          setIsModalVisible(false);
          fetchMedia();
        } else {
          message.error(response.message || "Failed to create testimonials");
        }
      }
    } catch (error: any) {
      if (error.errorFields) {
        // Form validation error
        return;
      }
      message.error(error.message || "Failed to save testimonials");
      console.error("Error saving testimonials:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingMedia(null);
    form.resetFields();
    setThumbnailFile([]);
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
  };

  const handleThumbnailChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setThumbnailFile(fileList.slice(-1));
    form.setFieldsValue({ thumbnail: fileList.length > 0 ? "uploaded" : "" });
    form.setFields([{ name: "thumbnail", touched: true }]);
    form.validateFields(["thumbnail"]);
  };
  const uploadProps = {
    beforeUpload: (file: File) => {
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
      return false; // Manual upload
    },
    fileList: thumbnailFile,
    onChange: handleThumbnailChange,
    multiple: false,
    listType: "picture-card" as const,
    accept: ".jpg,.jpeg,.png,.gif,.webp",
    maxCount: 1,
  };

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
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      ellipsis: true,
      render: (url) =>
        url ? <Image src={url} alt="thumbnail" width={50} height={50} /> : null,
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
      value: meta.itemCount,
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
        <h1>Testimonials</h1>
        <p>Manage your video content and testimonials</p>
      </div>

      <div className="media-controls">
        <Input
          placeholder="Search media by description..."
          prefix={<SearchOutlined />}
          onChange={(e) => debouncedSearch(e.target.value)}
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
        dataSource={mediaList} // Use mediaList directly since filtering is done on server
        rowKey="id"
        loading={loading}
        pagination={{
          current: meta.page,
          pageSize: meta.limit,
          total: meta.itemCount,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => {
            setMeta((prev) => ({
              ...prev,
              page: page,
              limit: pageSize || prev.limit,
            }));
          },
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
        <Spin spinning={modalLoading} tip="Loading testimonials data...">
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
                placeholder="Enter testimonials description..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              label="Thumbnail Image"
              required
              name="thumbnail"
              dependencies={["thumbnail"]}
              rules={[
                {
                  validator: () => {
                    if (thumbnailFile && thumbnailFile.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Please upload a thumbnail image")
                    );
                  },
                },
              ]}
              validateStatus={
                form.isFieldTouched("thumbnail") &&
                form.getFieldError("thumbnail").length
                  ? "error"
                  : ""
              }
              help={
                form.isFieldTouched("thumbnail") &&
                form.getFieldError("thumbnail").length
                  ? form.getFieldError("thumbnail")[0]
                  : "Upload a thumbnail image (max 5MB)"
              }
            >
              <Upload {...uploadProps}>
                {thumbnailFile.length === 0 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              name="video"
              label="Video URL"
              rules={[{ required: true, message: "Please enter video URL" }]}
            >
              <Input
                placeholder="dQw4w9WgXcQ"
                prefix={<PlayCircleOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="thumbnail"
              rules={[
                {
                  validator: () => {
                    if (thumbnailFile && thumbnailFile.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Please upload a thumbnail image")
                    );
                  },
                },
              ]}
              style={{ display: "none" }}
            >
              <Input type="hidden" />
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
                    type="number"
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
              label=""
              valuePropName="checked"
              initialValue={true}
            >
              {/* <Switch
                defaultChecked={true}
                // disabled
                checkedChildren="Yes"
                unCheckedChildren="No"
              /> */}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Testimonials;
