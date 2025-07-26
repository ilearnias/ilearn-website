"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Dropdown,
  Menu,
  Modal,
  Form,
  message,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Pagination,
  Upload,
  Image,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TrophyOutlined,
  FileTextOutlined,
  BarChartOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  resultService,
  IResult,
  IPaginationMeta,
} from "@/services/results.service";
import { UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const Results = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<IResult[]>([]);
  const [pagination, setPagination] = useState<IPaginationMeta>({
    limit: 10,
    itemCount: 0,
    page: 1,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingResult, setEditingResult] = useState<IResult | null>(null);
  const [form] = Form.useForm();
  const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);

  const fetchResults = useCallback(async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const response: any = await resultService.getAllResults(
        page,
        limit,
        search
      );
      if (response.status) {
        // Clear any previous errors
        setError(null);

        // Safely handle the response data
        // const responseData = response.data;
        if (response && response.data) {
          setResults(response.data);
        } else {
          setResults([]);
        }

        // Safely handle pagination meta
        if (response && response.meta) {
          setPagination(response.meta);
        } else {
          // Fallback to current pagination state if meta is missing
          setPagination((prev) => ({
            ...prev,
            itemCount: response?.data?.length || 0,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false,
          }));
        }
      } else {
        const errorMessage = response.message || "Failed to fetch results";
        message.error(errorMessage);
        setError(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.message || "Failed to fetch results";
      message.error(errorMessage);
      console.error("Error fetching results:", error);
      setError(errorMessage);
      // Set empty results on error
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(pagination?.page || 1, pagination?.limit || 10, searchText);
  }, [fetchResults, pagination?.page, pagination?.limit, searchText]);

  const handleTableChange = (pagination: any) => {
    if (
      pagination &&
      typeof pagination.current === "number" &&
      typeof pagination.pageSize === "number"
    ) {
      setPagination((prev) => ({
        ...prev,
        page: pagination.current,
        limit: pagination.pageSize,
      }));
    }
  };

  const handleAdd = () => {
    setEditingResult(null);
    form.resetFields();
    setThumbnailFile([]);
    setIsModalVisible(true);
  };

  const handleEdit = (record: any) => {
    if (record) {
      setEditingResult(record);
      form.setFieldsValue({
        ...record,
        title: record.title || '',
        aspectRatio: record.aspectRatio || '',
      });
      setThumbnailFile(
        record.thumbnail
          ? [
              {
                uid: "-1",
                name: "thumbnail.jpg",
                status: "done",
                url: record.thumbnail,
              },
            ]
          : []
      );
      setIsModalVisible(true);
    }
  };

  const handleDelete = (record: IResult) => {
    if (!record || !record.id) {
      message.error("Invalid result record");
      return;
    }

    confirm({
      title: "Are you sure you want to delete this result?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await resultService.deleteResult(record.id);
          if (response.status) {
            message.success(response.message || "Result deleted successfully");
            // If the current page is now empty and not the first page, go to the previous page
            const isLastItemOnPage = results.length === 1 && pagination?.page && pagination.page > 1;
            if (isLastItemOnPage) {
              fetchResults(pagination.page - 1, pagination.limit, searchText);
            } else {
              fetchResults(pagination?.page || 1, pagination?.limit || 10, searchText);
            }
          } else {
            message.error(response.message || "Failed to delete result");
          }
        } catch (error: any) {
          message.error(error.message || "Failed to delete result");
          console.error("Error deleting result:", error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      // Ensure isActive is boolean (Switch already does this, but for safety)
      values.isActive = Boolean(values.isActive);
      values.title = values.title || '';
      values.aspectRatio = values.aspectRatio || '';

      // Handle thumbnail upload
      let thumbnailUrl = values.thumbnail;
      const newFile = thumbnailFile.find((file) => file.originFileObj);
      if (newFile && newFile.originFileObj) {
        thumbnailUrl = await resultService.uploadSingleImage(
          newFile.originFileObj as File
        );
      } else if (thumbnailFile.length > 0 && thumbnailFile[0].url) {
        thumbnailUrl = thumbnailFile[0].url;
      } else {
        thumbnailUrl = undefined;
      }
      values.thumbnail = thumbnailUrl;

      console.log("Saving result with values:", values);

      if (editingResult && editingResult.id) {
        console.log("Updating result with ID:", editingResult.id);
        const response = await resultService.updateResult(
          editingResult.id,
          values
        );
        console.log("Update response:", response);
        if (response.status) {
          message.success(response.message || "Result updated successfully");
          setIsModalVisible(false);
          fetchResults(pagination?.page || 1, pagination?.limit || 10, searchText);
        } else {
          message.error(response.message || "Failed to update result");
        }
      } else {
        console.log("Creating new result");
        const response = await resultService.createResult(values);
        console.log("Create response:", response);
        if (response.status) {
          message.success(response.message || "Result created successfully");
          setIsModalVisible(false);
          fetchResults(1, pagination?.limit || 10, searchText); // Go to first page when creating new item
        } else {
          message.error(response.message || "Failed to create result");
        }
      }
    } catch (error: any) {
      console.error("Error saving result:", error);
      message.error(error.message || "Failed to save result");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setThumbnailFile([]);
  };

  const handleThumbnailChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setThumbnailFile(fileList.slice(-1)); // Only keep the latest file
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
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        message.error("Image must be smaller than 3MB!");
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

  const handleExportResults = async () => {
    try {
      const response = await resultService.exportResults();
      if (response.status) {
        // Handle the export file download
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "results-export.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        message.success("Results exported successfully");
      } else {
        message.error(response.message || "Failed to export results");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to export results");
      console.error("Error exporting results:", error);
    }
  };

  // Remove client-side filtering since search is now handled by API
  // const filteredResults = results.filter(
  //   (result) =>
  //     result &&
  //     ((result.year || "").toLowerCase().includes(searchText.toLowerCase()) ||
  //       (result.description || "")
  //         .toLowerCase()
  //         .includes(searchText.toLowerCase()))
  // );

  const columns: ColumnsType<IResult> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) =>
        url ? <Image src={url} alt="thumbnail" width={50} height={50} /> : null,
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
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

  const calculateTotalResults = () => {
    return results.length;
  };

  const calculateActiveResults = () => {
    return results.filter((r) => r && r.isActive).length;
  };

  // Safety check to ensure pagination is properly initialized
  if (!pagination) {
    return (
      <div className="results-page">
        <div className="results-header">
          <h1>Results Management</h1>
          <p>Manage student examination results and performance</p>
        </div>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Results Management</h1>
        <p>Manage student examination results and performance</p>
      </div>

      {error && (
        <div
          style={{
            margin: "16px 0",
            padding: "12px",
            backgroundColor: "#fff2f0",
            border: "1px solid #ffccc7",
            borderRadius: "6px",
            color: "#cf1322",
          }}
        >
          <strong>Error:</strong> {error}
          <Button
            type="link"
            size="small"
            onClick={() => {
              setError(null);
              fetchResults();
            }}
            style={{ marginLeft: "8px", padding: 0 }}
          >
            Retry
          </Button>
        </div>
      )}

      <div className="results-controls">
        <Space>
          <Input
            placeholder="Search results..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button hidden={true} icon={<DownloadOutlined />} onClick={handleExportResults}>
            Export
          </Button>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Result
        </Button>
      </div>

      <Table
        className="results-table"
        columns={columns}
        dataSource={results || []} // Use results directly since filtering is done on server
        rowKey="id"
        loading={loading}
        pagination={false} // Pagination is handled by Pagination component
        onChange={handleTableChange}
      />

      <Pagination
        className="results-pagination"
        current={pagination?.page || 1}
        total={pagination?.itemCount || 0}
        pageSize={pagination?.limit || 10}
        showSizeChanger={true}
        showQuickJumper={true}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={(page, pageSize) => {
          setPagination((prev) => ({
            ...prev,
            page: page,
            limit: pageSize || 10,
          }));
        }}
        style={{ textAlign: 'right', marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}
      />

      <Modal
        title={
          editingResult && editingResult.id ? "Edit Result" : "Add New Result"
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter result title" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Year"
                rules={[{ required: true, message: "Please enter year" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="order"
                label="Order"
                rules={[{ required: true, message: "Please enter order" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="thumbnail"
                  label="Thumbnail Image"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload A Thumbnail Image",
                    },
                  ]}
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
              </Col>
              <Col span={12}>
                <Form.Item
                  name="aspectRatio"
                  label="Aspect Ratio"
                  rules={[{ required: true, message: "Please select an aspect ratio" }]}
                >
                  <Select placeholder="Select aspect ratio">
                    <Select.Option value="landscape">Landscape</Select.Option>
                    <Select.Option value="portrait">Portrait</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Col span={24}>
              <Form.Item
                name="media"
                label="Media"
                rules={[{ required: false, message: "Please add video link" }]}
              >
                <Input
                  placeholder="Enter video link (optional)"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="isActive"
                label="Is Active"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Results;
