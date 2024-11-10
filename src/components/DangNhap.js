import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

function DangNhap() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleDangNhap = (values) => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (
      values.username === storedUsername &&
      values.password === storedPassword
    ) {
      message.success("Đăng nhập thành công!");
      navigate("/quanlychuyenbay");
    } else {
      message.error("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Đăng Nhập</h2>
      <Form form={form} layout="vertical" onFinish={handleDangNhap}>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input placeholder="Nhập tên đăng nhập" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Đăng Nhập
        </Button>
      </Form>
    </div>
  );
}

export default DangNhap;
