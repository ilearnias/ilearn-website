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
  Image,
  Upload,
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
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import {
  journeyService,
  IJourney,
  IJourneyCreate,
  IJourneyUpdate,
} from "@/services/journey.service";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;

const Journey = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [journeyList, setJourneyList] = useState<IJourney[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJourney, setEditingJourney] = useState<IJourney | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
  const [form] = Form.useForm();
  const token = localStorage.getItem("adminToken");
  const [isImageFilter, setIsImageFilter] = useState<boolean | undefined>(
    undefined
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Initial fetch
  useEffect(() => {
    fetchJourney();
  }, [currentPage, pageSize]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      fetchJourney(); // Call fetchJourney directly to ensure search works
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const fetchJourney = async () => {
    try {
      setLoading(true);
      const response: any = await journeyService.getAllJourney({
        page: currentPage,
        limit: pageSize,
        isImage: isImageFilter,
        ...(searchText.trim() && { search: searchText.toLowerCase().trim() }), // Only add search if there's a search term
      });
      if (response.status) {
        setJourneyList(response.data);
        setTotalItems(response.meta?.itemCount || response.data.length);
        setCurrentPage(response.meta?.page || 1);
        setPageSize(response.meta?.limit || 10);
      } else {
        message.error(response.message || "Failed to fetch journey items");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch journey items");
      console.error("Error fetching journey items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingJourney(null);
    setUploadedFile(null);
    form.resetFields();
    form.setFieldsValue({
      isActive: true,
      order: 1,
    });
    setIsModalVisible(true);
  };

  const handleEdit = async (record: IJourney) => {
    try {
      setModalLoading(true);
      // Preload data for editing
      const response: any = await journeyService.getJourneyById(record.id);
      if (response.status) {
        setEditingJourney(response.data);

        // If there is an image, show it in the Upload preview
        if (response.data.media) {
          setUploadedFile({
            uid: "-1",
            name: "image.jpg",
            status: "done",
            url: response.data.media,
          });
        } else {
          setUploadedFile(null);
        }

        // Determine if media is an image or YouTube link
        const isImageMedia =
          response.data.media &&
          !/^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(
            response.data.media
          );

        form.setFieldsValue({
          year: response.data.year,
          title: response.data.title || "",
          description: response.data.description,
          media: response.data.media,
          order: response.data.order,
          isActive: response.data.isActive,
          isImage: isImageMedia,
        });
        setIsModalVisible(true);
      } else {
        message.error(response.message || "Failed to load journey data 1");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to load journey data 2");
      console.error("Error loading journey data:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = (record: IJourney) => {
    confirm({
      title: "Are you sure you want to delete this journey item?",
      content: `This will permanently delete "${record.description}"`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await journeyService.deleteJourney(record.id);

          if (response.status) {
            // Optimistically update UI
            setJourneyList((prev) =>
              prev.filter((item) => item.id !== record.id)
            );
            setTotalItems((prev) => prev - 1);

            // If this was the last item on the current page, go to previous page
            const isLastItemOnPage =
              journeyList.length === 1 && currentPage > 1;
            if (isLastItemOnPage) {
              setCurrentPage((prev) => prev - 1);
              // fetchJourney will be triggered by useEffect when currentPage changes
            }

            message.success("Journey item deleted successfully");
          } else {
            // Show error message and refetch to ensure UI is in sync
            message.error(response.message || "Failed to delete journey item");
            fetchJourney();
          }
        } catch (error: any) {
          console.error("Error deleting journey item:", error);
          message.error("Failed to delete journey item");
          // Refetch data if deletion failed to ensure UI is in sync
          fetchJourney();
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Helper to upload a single image and return its URL
  const uploadImageToApi = async (file: File): Promise<string> => {
    const response = await journeyService.uploadSingleImage(file);
    return response;
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.isActive = Boolean(values.isActive);
      values.order = Number(values.order);
      values.isImage = Boolean(values.isImage); // Always boolean, defaults to false
      values.title = values.title || "";

      // Handle image upload if a new file is selected
      if (uploadedFile && uploadedFile.originFileObj) {
        try {
          const imageUrl: any = await uploadImageToApi(
            uploadedFile.originFileObj
          );

          values.media = imageUrl?.data;
        } catch (error: any) {
          message.error(error.message || "Failed to upload image");
          return;
        }
      }

      if (editingJourney) {
        // Update existing journey
        const response = await journeyService.updateJourney(
          editingJourney.id,
          values
        );
        if (response.status) {
          message.success(
            response.message || "Journey item updated successfully"
          );
          setIsModalVisible(false);
          fetchJourney();
        } else {
          message.error(response.message || "Failed to update journey item");
        }
      } else {
        // Create new journey
        const response = await journeyService.createJourney(values, config);
        if (response.status) {
          message.success(
            response.message || "Journey item created successfully"
          );
          setIsModalVisible(false);
          fetchJourney();
        } else {
          message.error(response.message || "Failed to create journey item");
        }
      }
    } catch (error: any) {
      if (error.errorFields) {
        // Form validation error
        return;
      }
      message.error(error.message || "Failed to save journey item");
      console.error("Error saving journey item:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingJourney(null);
    form.resetFields();
    setUploadedFile(null);
  };

  const handleUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0];

      // Validate file
      try {
        if (file.originFileObj) {
          journeyService.validateImageFile(file.originFileObj as File);
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

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
    // fetchJourney will be called by useEffect when currentPage or pageSize changes
  };

  // Remove in-memory filtering for pagination
  // const filteredJourney = journeyList.filter(
  //   (item) =>
  //     item.description.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item.year.toLowerCase().includes(searchText.toLowerCase())
  // );
  // Use journeyList directly

  const columns: ColumnsType<IJourney> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 100,
      sorter: (a, b) => a.year.localeCompare(b.year),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Media",
      dataIndex: "media",
      key: "media",
      render: (media) => {
        // If media is an image, show the image. Otherwise, show the YouTube link as a clickable URL.
        const isYouTube =
          typeof media === "string" &&
          /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(
            media
          );
        if (!media) return null;
        if (isYouTube) {
          return (
            <a href={media} target="_blank" rel="noopener noreferrer">
              {media}
            </a>
          );
        }
        return (
          <Image
            src={media || "/placeholder-image.png"}
            alt="Journey Media"
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: 4 }}
            fallback="/placeholder-image.png"
          />
        );
      },
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      // width: 80,
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Status",
      key: "status",
      // width: 100,
      render: (_, record) => (
        <Tag color={record.isActive ? "green" : "red"}>
          {record.isActive ? "Active" : "Inactive"}
        </Tag>
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
        //         key="preview"
        //         icon={<EyeOutlined />}
        //         onClick={() => window.open(record.media, "_blank")}
        //       >
        //         Preview
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
    <div className="journey-page">
      <div className="journey-header">
        <h1>Journey Management</h1>
        <p>Manage your company journey and milestones</p>
      </div>

      <div className="journey-controls">
        <Input
          placeholder="Search journey by title, description, or year..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Journey
        </Button>
      </div>

      <Table
        className="journey-table"
        columns={columns}
        dataSource={journeyList}
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
        title={editingJourney ? "Edit Journey Item" : "Add New Journey Item"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={modalLoading}
        width={600}
        okText={editingJourney ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Spin spinning={modalLoading} tip="Loading journey data...">
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              isActive: true,
              order: 1,
              isImage: false,
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input placeholder="Enter journey title" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="year"
                  label="Year"
                  rules={[
                    { required: true, message: "Please enter year" },
                    {
                      pattern: /^\d{4}$/,
                      message: "Please enter a valid 4-digit year",
                    },
                  ]}
                >
                  <Input type="number" placeholder="2023" />
                </Form.Item>
              </Col>
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
            </Row>

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
                rows={4}
                placeholder="Enter journey description..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="isImage"
              label="Media Type"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Image"
                unCheckedChildren="YouTube"
                defaultChecked={false}
              />
            </Form.Item>

            <Form.Item
              shouldUpdate={(prev, curr) => prev.isImage !== curr.isImage}
            >
              {({ getFieldValue }) =>
                getFieldValue("isImage") ? (
                  <>
                    <Form.Item
                      label="Media (size: 1920x1080px)"
                      name="media"
                      rules={[
                        {
                          validator: (_, value) => {
                            if (
                              uploadedFile &&
                              (uploadedFile.status === "done" ||
                                uploadedFile.originFileObj)
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Please upload an image")
                            );
                          },
                        },
                      ]}
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
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB
                      </div>
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item
                    label="Video URL"
                    name="media"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a YouTube video URL",
                      },
                      {
                        pattern:
                          /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[\w-]{11}(\?.*)?$/,
                        message: "Enter a valid YouTube URL",
                      },
                    ]}
                  >
                    <Input placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..." />
                  </Form.Item>
                )
              }
            </Form.Item>

            <Form.Item name="isActive" label="Status" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Journey;
