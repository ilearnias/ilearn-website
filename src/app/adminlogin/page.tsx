"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";
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
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [form] = Form.useForm();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true);

    try {
      // Make API call to login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        console.log("data1111", data);
        // Store token and user data in localStorage
        localStorage.setItem("adminToken", data.data.accessToken);
        localStorage.setItem("adminUser", JSON.stringify(data.data.user));

        // Store refresh token if provided
        if (data.data.refreshToken) {
          localStorage.setItem("refreshToken", data.data.refreshToken);
        }

        // Dispatch Redux action to update state
        dispatch(
          login({
            user: data.data.user,
            token: data.data.accessToken,
          })
        );

        message.success("Login successful!");
        router.push("/admin/dashboard");
      } else {
        message.error(data.message || "Invalid credentials");
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
