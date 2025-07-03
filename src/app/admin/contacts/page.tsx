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
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  MoreOutlined,
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { contactService, IContact } from "@/services/contacts.service";
import dayjs from 'dayjs';
import "./styles.scss";

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const Contacts = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAllContacts();
      if (response.success) {
        setContacts(response.data);
      } else {
        message.error(response.message || 'Failed to fetch contacts');
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch contacts');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (record: IContact) => {
    setSelectedContact(record);
    form.setFieldsValue({
      ...record,
      status: record.status || 'pending',
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: IContact) => {
    confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await contactService.deleteContact(record.id);
          if (response.success) {
            message.success(response.message || 'Contact deleted successfully');
            fetchContacts();
          } else {
            message.error(response.message || 'Failed to delete contact');
          }
        } catch (error: any) {
          message.error(error.message || 'Failed to delete contact');
          console.error('Error deleting contact:', error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (selectedContact) {
        const response = await contactService.updateContact(selectedContact.id, values);
        if (response.success) {
          message.success(response.message || 'Contact updated successfully');
          setIsModalVisible(false);
          fetchContacts();
        } else {
          message.error(response.message || 'Failed to update contact');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save contact');
      console.error('Error saving contact:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAdd = () => {
    setSelectedContact(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'green';
      case 'pending':
        return 'gold';
      case 'important':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      case 'important':
        return <ExclamationCircleOutlined />;
      default:
        return null;
    }
  };

  const columns: ColumnsType<IContact> = [
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <div style={{ fontWeight: 500 }}>{record.name}</div>
          <Space size="small" style={{ color: '#666' }}>
            <MailOutlined />
            {record.email}
          </Space>
          {record.phone && (
            <Space size="small" style={{ color: '#666' }}>
              <PhoneOutlined />
              {record.phone}
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: "Subject",
      key: "subject",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <div>{record.subject}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            {record.message.length > 100
              ? `${record.message.substring(0, 100)}...`
              : record.message}
          </div>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="view"
                icon={<MessageOutlined />}
                onClick={() => handleView(record)}
              >
                View Details
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

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <h1>Contact Messages</h1>
        <p>Manage and respond to contact form submissions</p>
      </div>

      <Row gutter={[16, 16]} className="contacts-stats">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Messages"
              value={contacts.length}
              prefix={<MessageOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Pending"
              value={contacts.filter(c => c.status === 'pending').length}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Resolved"
              value={contacts.filter(c => c.status === 'resolved').length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="contacts-controls">
        <Input
          placeholder="Search messages..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" onClick={handleAdd} style={{ marginLeft: 8 }}>
          Add Contact
        </Button>
      </div>

      <Table
        className="contacts-table"
        columns={columns}
        dataSource={filteredContacts}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={selectedContact ? "Contact Details" : "Add New Contact"}
        open={isModalVisible}
        onOk={async () => {
          if (selectedContact) {
            await handleModalOk();
          } else {
            // Add contact logic
            try {
              const values = await form.validateFields();
              const response = await contactService.createContact(values);
              if (response.success) {
                message.success(response.message || 'Contact added successfully');
                setIsModalVisible(false);
                fetchContacts();
              } else {
                message.error(response.message || 'Failed to add contact');
              }
            } catch (error: any) {
              message.error(error.message || 'Failed to add contact');
              console.error('Error adding contact:', error);
            }
          }
        }}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input readOnly={!!selectedContact} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input readOnly={!!selectedContact} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
              >
                <Input readOnly={!!selectedContact} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select disabled={false}>
                  <Option value="pending">Pending</Option>
                  <Option value="resolved">Resolved</Option>
                  <Option value="important">Important</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please enter subject" }]}
          >
            <Input readOnly={!!selectedContact} />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter message" }]}
          >
            <TextArea rows={4} readOnly={!!selectedContact} />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Admin Notes"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Contacts; 