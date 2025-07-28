"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Row,
  Col,
  Space,
  Dropdown,
  Menu,
  Modal,
  Form,
  message,
  Switch,
  InputNumber,
  Select,
  Upload,
  UploadFile,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { blogService, IBlogPost, IBlogCategory } from "@/services/blog.service";
import { galleryService } from "@/services/gallery.service";
import "./styles.scss";

const { confirm } = Modal;
const { TextArea } = Input;

const BlogPosts = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [categories, setCategories] = useState<IBlogCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<IBlogPost | null>(null);
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState<UploadFile[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // Initial fetch
  useEffect(() => {
    fetchPosts(page, pageSize);
    fetchCategories();
  }, [page, pageSize]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1); // Reset to first page when searching
      fetchPosts(1, pageSize); // Call fetchPosts directly to ensure search works
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const fetchPosts = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await blogService.getAllPosts({ 
        page, 
        limit,
        ...(searchText.trim() && { search: searchText.toLowerCase().trim() }) // Only add search if there's a search term
      });
      if (response.status) {
        setPosts(response.data);
        setTotal(
          response.meta?.itemCount ||
            response.meta?.totalItems ||
            response.total ||
            0
        );
      } else {
        message.error(response.message || "Failed to fetch blog posts");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch blog posts");
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await blogService.getAllCategories();
      if (response.status) {
        setCategories(response.data);
      } else {
        message.error(response.message || "Failed to fetch categories");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch categories");
      console.error("Error fetching categories:", error);
    }
  };

  const handleAdd = () => {
    setEditingPost(null);
    form.resetFields();
    setUploadedImage([]);
    setIsModalVisible(true);
  };

  const handleEdit = (record: IBlogPost) => {
    setEditingPost(record);
    form.setFieldsValue(record);
    setUploadedImage(
      record.image
        ? [
            {
              uid: "-1",
              name: record.image.split("/").pop() || "image",
              status: "done",
              url: record.image,
            },
          ]
        : []
    );
    setIsModalVisible(true);
  };

  const handleDelete = (record: IBlogPost) => {
    confirm({
      title: "Are you sure you want to delete this post?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await blogService.deletePost(record.id);
          if (response.status) {
            message.success(response.message || "Post deleted successfully");
            fetchPosts(page, pageSize);
          } else {
            message.error(response.message || "Failed to delete post");
          }
        } catch (error: any) {
          message.error(error.message || "Failed to delete post");
          console.error("Error deleting post:", error);
        }
      },
    });
  };

  const handleImageUploadChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    // Only allow one image
    setUploadedImage(fileList.slice(-1));
  };

  const uploadImageToApi = async (file: File): Promise<string> => {
    return await galleryService.uploadSingleImage(file);
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
    fileList: uploadedImage,
    onChange: handleImageUploadChange,
    multiple: false,
    listType: "picture-card" as const,
    accept: ".jpg,.jpeg,.png,.gif,.webp",
    maxCount: 1,
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      let imageUrl = values.image;
      // If a new file is uploaded, upload it and get the URL
      const newFile = uploadedImage.find((file) => file.originFileObj);
      if (newFile && newFile.originFileObj) {
        imageUrl = await uploadImageToApi(newFile.originFileObj as File);
      } else if (uploadedImage.length > 0 && uploadedImage[0].url) {
        imageUrl = uploadedImage[0].url as string;
      } else {
        imageUrl = "";
      }
      const postData = { ...values, image: imageUrl };
      if (editingPost) {
        const response = await blogService.updatePost(editingPost.id, postData);
        if (response.status) {
          message.success(response.message || "Post updated successfully");
          setIsModalVisible(false);
          fetchPosts(page, pageSize);
        } else {
          message.error(response.message || "Failed to update post");
        }
      } else {
        const response = await blogService.createPost(postData);
        if (response.status) {
          message.success(response.message || "Post created successfully");
          setIsModalVisible(false);
          fetchPosts(page, pageSize);
        } else {
          message.error(response.message || "Failed to create post");
        }
      }
    } catch (error: any) {
      message.error(error.message || "Failed to save post");
      console.error("Error saving post:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns: ColumnsType<IBlogPost> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "category",
      render: (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.title : "";
      },
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => <Switch checked={isActive} disabled />,
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

  return (
    <div className="blog-posts-page">
      <div className="blog-posts-header">
        <h1>Blog Posts</h1>
        <p>Manage your blog posts</p>
      </div>

      <Row gutter={[16, 16]} className="blog-posts-stats">
        <Col xs={24}>
          <Card>
            <div className="blog-posts-controls">
              <Input
                placeholder="Search posts by title, description, or tags..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ maxWidth: 300 }}
                allowClear
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Add Post
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Table
        className="blog-posts-table"
        columns={columns}
        dataSource={posts}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          position: ["bottomCenter"],
          responsive: true,
        }}
        onChange={(pagination) => {
          setPage(pagination.current || 1);
          setPageSize(pagination.pageSize || 10);
          // fetchPosts will be called by useEffect when page or pageSize changes
        }}
      />

      <Modal
        title={editingPost ? "Edit Post" : "Add New Post"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ isActive: true, order: 1 }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select>
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="subTitle"
            label="Subtitle"
            rules={[{ required: true, message: "Please enter subtitle" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={5} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Image"
                required
                help="Upload a blog post image. Maximum size: 3MB."
              >
                <Upload {...uploadProps}>
                  {uploadedImage.length >= 1 ? null : (
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
                name="link"
                label="Link "
                rules={[{ required: true, message: "Please enter link " }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tags"
                label="Tags"
                rules={[{ required: true, message: "Please enter tags" }]}
              >
                <Input placeholder="Comma separated tags" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="order"
                label="Display Order"
                rules={[
                  { required: true, message: "Please enter display order" },
                ]}
              >
                <InputNumber type="number" min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="isActive" label="Status" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogPosts;
