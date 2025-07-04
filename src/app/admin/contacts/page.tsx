"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Space,
  Tag,
  Modal,
  Form,
  message,
  Select,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { contactService, IContact } from "@/services/contacts.service";
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
      if (response.status) {
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

  const handleEdit = (record: IContact) => {
    setSelectedContact(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone,
      description: record.description,
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
          if (response.status) {
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
        if (response.status) {
          message.success(response.message || 'Contact updated successfully');
          setIsModalVisible(false);
          fetchContacts();
        } else {
          message.error(response.message || 'Failed to update contact');
        }
      } else {
        const response = await contactService.createContact(values);
        if (response.status) {
          message.success(response.message || 'Contact created successfully');
          setIsModalVisible(false);
          fetchContacts();
        } else {
          message.error(response.message || 'Failed to create contact');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to save contact');
      console.error('Error saving contact:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedContact(null);
    form.resetFields();
  };

  const handleAdd = () => {
    setSelectedContact(null);
    form.resetFields();
    form.setFieldsValue({ status: 'pending' });
    setIsModalVisible(true);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchText.toLowerCase())
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: '15%',
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: '20%',
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: '15%',
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: '25%',
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: '15%',
      render: (status) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: '10%',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="contacts-page">
      <Card>
        <div className="table-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Input
            placeholder="Search contacts..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Contact
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredContacts}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} contacts`,
          }}
        />

        <Modal
          title={selectedContact ? "Edit Contact" : "Add New Contact"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ status: 'pending' }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter the email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter the phone number' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status' }]}
            >
              <Select>
                <Option value="pending">Pending</Option>
                <Option value="resolved">Resolved</Option>
                <Option value="important">Important</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Contacts; 