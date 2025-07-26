"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Statistic,
  Tooltip,
} from "antd";
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  BookOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "./styles.scss";
import {
  resultService,
  IResultSummary,
  IResultSummaryCreate,
} from "@/services/results.service";

const ResultsSummary = () => {
  const [data, setData] = useState<IResultSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<IResultSummary | null>(
    null
  );
  const [form] = Form.useForm();
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    itemCount: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    fetchData(meta.page, meta.limit);
  }, []);

  const fetchData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await resultService.getAllResultSummaries(page, limit);

      if (response.status) {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.data)) {
          setData(responseData.data);
          setMeta(responseData.meta || {});
        } else if (Array.isArray(responseData)) {
          setData(responseData);
          setMeta((prev) => ({
            ...prev,
            itemCount: responseData.length,
            page: 1,
            limit: 10,
          }));
        } else {
          setData([]);
          setMeta((prev) => ({
            ...prev,
            itemCount: 0,
          }));
        }
      } else {
        message.error(response.message || "Failed to fetch result summaries");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching result summaries:", error);
      message.error("Failed to fetch result summaries");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: IResultSummary) => {
    setEditingRecord(record);
    form.setFieldsValue({
      year: record.year,
      totalSelection: record.totalSelection,
      topRanks: record.topRanks,
      order: record.order,
      pcmClassroom: record.pcmClassroom,
      firstAttempt: record.firstAttempt,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await resultService.deleteResultSummary(id);
      if (response.status) {
        message.success("Result summary deleted successfully");
        fetchData();
      }
    } catch (error) {
      message.error("Failed to delete result summary");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingRecord) {
        // Update
        const response = await resultService.updateResultSummary(
          editingRecord.id,
          values
        );
        if (response.status) {
          message.success("Result summary updated successfully");
          setModalVisible(false);
          fetchData();
        }
      } else {
        // Create
        const response = await resultService.createResultSummary(values);
        if (response.status) {
          message.success("Result summary created successfully");
          setModalVisible(false);
          fetchData();
        }
      }
    } catch (error) {
      message.error("Failed to save result summary");
    }
  };

  const columns: ColumnsType<IResultSummary> = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (year) => <Tag color="blue">{year}</Tag>,
    },
    {
      title: "Total Selection",
      dataIndex: "totalSelection",
      key: "totalSelection",
      render: (value) => (
        <Statistic
          value={value}
          prefix={<UserOutlined />}
          valueStyle={{ fontSize: "14px" }}
        />
      ),
    },
    {
      title: "Top Ranks",
      dataIndex: "topRanks",
      key: "topRanks",
      render: (value) => (
        <Statistic
          value={value}
          prefix={<TrophyOutlined />}
          valueStyle={{ fontSize: "14px", color: "#faad14" }}
        />
      ),
    },
    {
      title: "PCM Classroom",
      dataIndex: "pcmClassroom",
      key: "pcmClassroom",
      render: (value) => (
        <Statistic
          value={value}
          prefix={<BookOutlined />}
          valueStyle={{ fontSize: "14px", color: "#52c41a" }}
        />
      ),
    },
    {
      title: "First Attempt",
      dataIndex: "firstAttempt",
      key: "firstAttempt",
      render: (value) => (
        <Statistic
          value={value}
          prefix={<CheckCircleOutlined />}
          valueStyle={{ fontSize: "14px", color: "#1890ff" }}
        />
      ),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      render: (order) => <Tag color="purple">{order}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size="small"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Calculate summary statistics
  const totalSelections = data.reduce(
    (sum, item) => sum + item.totalSelection,
    0
  );
  const totalTopRanks = data.reduce((sum, item) => sum + item.topRanks, 0);
  const totalPCMClassroom = data.reduce(
    (sum, item) => sum + item.pcmClassroom,
    0
  );
  const totalFirstAttempts = data.reduce(
    (sum, item) => sum + item.firstAttempt,
    0
  );

  return (
    <div className="results-summary-page">
      <div className="results-summary-header">
        <h1>Results Summary Management</h1>
        <p>Manage result summary data and statistics</p>
      </div>

      {/* Action Button */}
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add New
        </Button>
      </div>

      {/* Data Table */}
      <Card className="results-summary-table">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={{
            current: meta.page,
            pageSize: meta.limit,
            total: meta.itemCount,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, pageSize) => fetchData(page, pageSize),
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Result Summary" : "Add New Result Summary"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText={editingRecord ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            year: "",
            totalSelection: 0,
            topRanks: 0,
            order: 1,
            pcmClassroom: 0,
            firstAttempt: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Year"
                rules={[{ required: true, message: "Please enter the year" }]}
              >
                <Input placeholder="e.g., 2023" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Order"
                rules={[{ required: true, message: "Please enter the order" }]}
              >
                <InputNumber
                  min={1}
                  placeholder="Order"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="totalSelection"
                label="Total Selection"
                rules={[
                  { required: true, message: "Please enter total selection" },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="Total Selection"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="topRanks"
                label="Top Ranks"
                rules={[{ required: true, message: "Please enter top ranks" }]}
              >
                <InputNumber
                  min={0}
                  placeholder="Top Ranks"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pcmClassroom"
                label="PCM Classroom"
                rules={[
                  { required: true, message: "Please enter PCM classroom" },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="PCM Classroom"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstAttempt"
                label="First Attempt"
                rules={[
                  { required: true, message: "Please enter first attempt" },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="First Attempt"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ResultsSummary;
