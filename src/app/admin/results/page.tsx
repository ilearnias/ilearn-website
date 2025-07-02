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
      if (response.success) {
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
          if (response.success) {
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
      
      // Format dates
      if (values.examDate) {
        values.examDate = values.examDate.format('YYYY-MM-DD');
      }

      if (editingResult) {
        const response = await resultService.updateResult(editingResult.id, values);
        if (response.success) {
          message.success(response.message || 'Result updated successfully');
          setIsModalVisible(false);
          fetchResults();
        } else {
          message.error(response.message || 'Failed to update result');
        }
      } else {
        const response = await resultService.createResult(values);
        if (response.success) {
          message.success(response.message || 'Result created successfully');
          setIsModalVisible(false);
          fetchResults();
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
      if (response.success) {
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
      result.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      result.examType.toLowerCase().includes(searchText.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
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
      title: "Student",
      key: "student",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <div style={{ fontWeight: 500 }}>{record.studentName}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            ID: {record.studentId}
          </div>
        </Space>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (subject) => (
        <Tag color="blue">{subject}</Tag>
      ),
    },
    {
      title: "Exam Type",
      dataIndex: "examType",
      key: "examType",
    },
    {
      title: "Score",
      key: "score",
      render: (_, record) => (
        <Space>
          <span style={{ fontWeight: 500 }}>{record.score}%</span>
          <Tag color={getGradeColor(record.grade)}>{record.grade}</Tag>
        </Space>
      ),
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      key: "examDate",
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
      sorter: (a, b) => dayjs(a.examDate).unix() - dayjs(b.examDate).unix(),
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
                name="studentName"
                label="Student Name"
                rules={[{ required: true, message: "Please enter student name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentId"
                label="Student ID"
                rules={[{ required: true, message: "Please enter student ID" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: "Please enter subject" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="examType"
                label="Exam Type"
                rules={[{ required: true, message: "Please select exam type" }]}
              >
                <Select>
                  <Option value="Midterm">Midterm</Option>
                  <Option value="Final">Final</Option>
                  <Option value="Quiz">Quiz</Option>
                  <Option value="Assignment">Assignment</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="score"
                label="Score (%)"
                rules={[{ required: true, message: "Please enter score" }]}
              >
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="grade"
                label="Grade"
                rules={[{ required: true, message: "Please select grade" }]}
              >
                <Select>
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
                  <Option value="D">D</Option>
                  <Option value="F">F</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="examDate"
                label="Exam Date"
                rules={[{ required: true, message: "Please select exam date" }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="remarks"
            label="Remarks"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Results; 