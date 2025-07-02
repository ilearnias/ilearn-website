"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Form, Input, Button, Card, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./styles.scss";

interface LoginForm {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { login } = useAdminAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true);

    try {
      const success = await login(values.email, values.password);

      if (success) {
        message.success("Login successful!");
        router.push("/admin/dashboard");
      } else {
        message.error("Invalid credentials");
      }
    } catch (err) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <Card className="login-container">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Access the admin panel</p>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              size="large"
              block
              className="login-button"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <Link href="/" className="back-link">
            <ArrowLeftOutlined /> Back to Website
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
