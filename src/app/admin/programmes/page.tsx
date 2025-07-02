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
  message,
  Modal,
  Form,
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
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  DollarOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { programmeService, IProgramme, IProgrammeCreate, IProgrammeUpdate } from "@/services/programmes.service";
import dayjs from 'dayjs';
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;

const Programmes = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState<IProgramme[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<IProgramme | null>(null);
  const [form] = Form.useForm();

  // Fetch programmes on component mount
  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const response = await programmeService.getAllProgrammes();
      if (response.success) {
        setProgrammes(response.data);
      } else {
        message.error(response.message || 'Failed to fetch programmes');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch programmes');
      console.error('Error fetching programmes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProgramme(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IProgramme) => {
    setEditingProgramme(record);
    form.setFieldsValue({
      ...record,
      startDate: record.startDate ? dayjs(record.startDate) : undefined,
      endDate: record.endDate ? dayjs(record.endDate) : undefined,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: IProgramme) => {
    confirm({
      title: 'Are you sure you want to delete this programme?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await programmeService.deleteProgramme(record.id);
          if (response.success) {
            message.success(response.message || 'Programme deleted successfully');
            fetchProgrammes();
          } else {
            message.error(response.message || 'Failed to delete programme');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete programme');
          console.error('Error deleting programme:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Format dates
      if (values.startDate) {
        values.startDate = values.startDate.format('YYYY-MM-DD');
      }
      if (values.endDate) {
        values.endDate = values.endDate.format('YYYY-MM-DD');
      }

      if (editingProgramme) {
        const response = await programmeService.updateProgramme(
          editingProgramme.id,
          values
        );
        if (response.success) {
          message.success(response.message || 'Programme updated successfully');
          setIsModalVisible(false);
          fetchProgrammes();
        } else {
          message.error(response.message || 'Failed to update programme');
        }
      } else {
        const response = await programmeService.createProgramme(values);
        if (response.success) {
          message.success(response.message || 'Programme created successfully');
          setIsModalVisible(false);
          fetchProgrammes();
        } else {
          message.error(response.message || 'Failed to create programme');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save programme');
      console.error('Error saving programme:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredProgrammes = programmes.filter(
    (programme) =>
      programme.title.toLowerCase().includes(searchText.toLowerCase()) ||
      programme.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Development: "blue",
      Marketing: "green",
      "Data Science": "purple",
      Design: "orange",
      Business: "cyan",
    };
    return colors[category] || "default";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Active: "green",
      Inactive: "red",
      Upcoming: "blue",
    };
    return colors[status] || "default";
  };

  const columns: ColumnsType<IProgramme> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={getCategoryColor(category)}>{category}</Tag>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => (
        <Space>
          <ClockCircleOutlined />
          {duration}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          icon={status === "Active" ? <CheckCircleOutlined /> : undefined}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Enrollments",
      dataIndex: "enrollments",
      key: "enrollments",
      sorter: (a, b) => (a.enrollments || 0) - (b.enrollments || 0),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
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
                onClick={() => handleDelete(record)}
                danger
              >
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="programmes-page">
      <div className="programmes-header">
        <h1>Programmes Management</h1>
        <p>Manage your educational programmes and courses</p>
      </div>

      <Row gutter={[16, 16]} className="programmes-stats">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Programmes"
              value={programmes.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Programmes"
              value={programmes.filter((p) => p.status === "Active").length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Enrollments"
              value={programmes.reduce((sum, p) => sum + (p.enrollments || 0), 0)}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Price"
              value={programmes.length ? programmes.reduce((sum, p) => sum + p.price, 0) / programmes.length : 0}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <div className="programmes-controls">
        <Input
          placeholder="Search programmes..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Programme
        </Button>
      </div>

      <Table
        className="programmes-table"
        columns={columns}
        dataSource={filteredProgrammes}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingProgramme ? "Edit Programme" : "Add New Programme"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: "Active" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select>
                  <Option value="Development">Development</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Data Science">Data Science</Option>
                  <Option value="Design">Design</Option>
                  <Option value="Business">Business</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[{ required: true, message: "Please enter duration" }]}
              >
                <Input placeholder="e.g., 12 weeks" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Upcoming">Upcoming</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxEnrollments"
                label="Maximum Enrollments"
                rules={[{ required: true, message: "Please enter maximum enrollments" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="instructor"
            label="Instructor"
            rules={[{ required: true, message: "Please enter instructor name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Programmes;