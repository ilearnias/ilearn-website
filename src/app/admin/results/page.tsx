"use client";

import React, { useState, useEffect } from "react";
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
import { resultService, IResult } from "@/services/results.service";
import dayjs from 'dayjs';
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const Results = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IResult[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingResult, setEditingResult] = useState<IResult | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await resultService.getAllResults();
      if (response.status) {
        setResults(response.data);
      } else {
        message.error(response.message || 'Failed to fetch results');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch results');
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingResult(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IResult) => {
    setEditingResult(record);
    form.setFieldsValue({
      ...record,
      examDate: record.examDate ? dayjs(record.examDate) : undefined,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: IResult) => {
    confirm({
      title: 'Are you sure you want to delete this result?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await resultService.deleteResult(record.id);
          if (response.status) {
            message.success(response.message || 'Result deleted successfully');
            fetchResults();
          } else {
            message.error(response.message || 'Failed to delete result');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete result');
          console.error('Error deleting result:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      // Ensure isActive is boolean (Switch already does this, but for safety)
      values.isActive = Boolean(values.isActive);
      
      // Format dates
      if (values.examDate) {
        values.examDate = values.examDate.format('YYYY-MM-DD');
      }

      if (editingResult) {
        const response = await resultService.updateResult(editingResult.id, values);
        if (response.status) {
          message.success(response.message || 'Result updated successfully');
          setIsModalVisible(false);
          fetchResults();
        } else {
          message.error(response.message || 'Failed to update result');
        }
      } else {
        const response = await resultService.createResult(values);
        if (response.status) {
          message.success(response.message || 'Result created successfully');
          setIsModalVisible(false);
          // If response.data is an array, update results with it, else refetch
          if (Array.isArray(response.data)) {
            setResults(response.data);
          } else {
            fetchResults();
          }
        } else {
          message.error(response.message || 'Failed to create result');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save result');
      console.error('Error saving result:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleExportResults = async () => {
    try {
      const response = await resultService.exportResults();
      if (response.status) {
        // Handle the export file download
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'results-export.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        message.success('Results exported successfully');
      } else {
        message.error(response.message || 'Failed to export results');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to export results');
      console.error('Error exporting results:', error);
    }
  };

  const filteredResults = results.filter(
    (result) =>
      (result.studentName || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (result.subject || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (result.examType || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    switch ((grade || '').toUpperCase()) {
      case 'A':
        return 'green';
      case 'B':
        return 'cyan';
      case 'C':
        return 'blue';
      case 'D':
        return 'orange';
      case 'F':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<IResult> = [
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
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
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

  const calculateAverageScore = () => {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
  };

  const calculatePassRate = () => {
    if (results.length === 0) return 0;
    const passCount = results.filter(r => r.grade !== 'F').length;
    return Math.round((passCount / results.length) * 100);
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Results Management</h1>
        <p>Manage student examination results and performance</p>
      </div>

      <Row gutter={[16, 16]} className="results-stats">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Results"
              value={results.length}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Score"
              value={calculateAverageScore()}
              prefix={<BarChartOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pass Rate"
              value={calculatePassRate()}
              prefix={<TrophyOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Subjects"
              value={new Set(results.map(r => r.subject)).size}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="results-controls">
        <Space>
          <Input
            placeholder="Search results..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button icon={<DownloadOutlined />} onClick={handleExportResults}>
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
        dataSource={filteredResults}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingResult ? "Edit Result" : "Add New Result"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
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
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please enter description" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Order"
                rules={[{ required: true, message: "Please enter order" }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isActive"
                label="Is Active"
                valuePropName="checked"
                rules={[{ required: true, message: "Please select isActive" }]}
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