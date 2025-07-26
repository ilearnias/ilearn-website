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
  Switch,
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
import {
  programmeService,
  IProgramme,
  IProgrammeCreate,
  IProgrammeUpdate,
} from "@/services/programmes.service";
import dayjs from "dayjs";
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;

const Programmes = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState<IProgramme[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<IProgramme | null>(
    null
  );
  const [form] = Form.useForm();

  // Fetch programmes on component mount
  useEffect(() => {
    fetchProgrammes();
  }, []);

    const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const response = await programmeService.getAllProgrammes();
      if (response.status) {
        setProgrammes(response.data);
      } else {
        message.error(response.message || "Failed to fetch programmes");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch programmes");
      console.error("Error fetching programmes:", error);
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
      isActive: record.isActive !== undefined ? record.isActive : true, // Default to true if not provided
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: IProgramme) => {
    confirm({
      title: "Are you sure you want to delete this programme?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await programmeService.deleteProgramme(record.id);
          console.log("response", response);
          if (response.status) {
            message.success(
              response.message || "Programme deleted successfully"
            );
            // Optimistically remove the deleted record:
            setProgrammes((prev) => prev.filter((p) => p.id !== record.id));
          } else {
            console.error("Delete error:", response);
            message.error(response.message || "Failed to delete programme");
          }
        } catch (error: any) {
          message.error(error.message || "Failed to delete programme");
          console.error("Error deleting programme:", error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      // Format dates
      if (values.startDate) {
        values.startDate = values.startDate.format("YYYY-MM-DD");
      }
      if (values.endDate) {
        values.endDate = values.endDate.format("YYYY-MM-DD");
      }
      
      // Ensure isActive is boolean (default to true if not provided)
      values.isActive = values.isActive !== undefined ? Boolean(values.isActive) : true;
    
      // Only send allowed fields
      const allowedFields = [
        "title",
        "sub_title",
        "description",
        "duration",
        "status",
        
        "order",
        "isActive",
        "category",
        "startDate",
        "endDate",
        "instructor",
        "enrollments",
        "thumbnail",
      ];
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => allowedFields.includes(key) && value !== undefined
        )
      );
      if (editingProgramme) {
        const response = await programmeService.updateProgramme(
          editingProgramme.id,
          filteredValues as unknown as IProgrammeUpdate
        );
        if (response.status) {
          message.success(response.message || "Programme updated successfully");
          setIsModalVisible(false);
          fetchProgrammes();
        } else {
          console.error("Update error:", response);
          message.error(response.message || "Failed to update programme");
        }
      } else {
        const response = await programmeService.createProgramme(
          filteredValues as unknown as IProgrammeCreate
        );
        if (response.status) {
          message.success(response.message || "Programme created successfully");
          setIsModalVisible(false);
          fetchProgrammes();
        } else {
          message.error(response.message || "Failed to create programme");
        }
      }
    } catch (error: any) {
      message.error(error.message || "Failed to save programme");
      console.error("Error saving programme:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredProgrammes = programmes.filter(
    (programme) =>
      programme.title.toLowerCase().includes(searchText.toLowerCase()) ||
      (programme.description &&
        programme.description.toLowerCase().includes(searchText.toLowerCase()))
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Order",
      dataIndex: "order", // <-- Lowercase 'o'
      key: "order",
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   render: (category) => (
    //     <Tag color={getCategoryColor(category)}>{category}</Tag>
    //   ),
    // },
   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => {
        // Default to true if isActive is not provided (for future compatibility)
        const isActiveStatus = isActive !== undefined ? isActive : true;
        return (
          <Tag color={isActiveStatus ? "green" : "red"}>
            {isActiveStatus ? "Active" : "Inactive"}
          </Tag>
        );
      },
    },
    // {
    //   title: "Enrollments",
    //   dataIndex: "enrollments",
    //   key: "enrollments",
    //   sorter: (a, b) => (a.enrollments || 0) - (b.enrollments || 0),
    // },
  
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
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Enter programme title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Input placeholder="Enter status" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sub_title" label="Sub Title">
                <Input placeholder="Enter programme sub title (optional)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Order"
                rules={[{ required: true, message: "Please enter order" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  placeholder="Enter display order (1, 2, 3...)"
                />
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
                name="isActive"
                label="Is Active"
                valuePropName="checked"
                initialValue={true}
                extra="Note: This field will be functional when the backend supports it. Currently defaults to Active."
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

export default Programmes;
