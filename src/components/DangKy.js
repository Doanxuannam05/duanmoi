import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

function DangKy() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleDangKy = (values) => {
    localStorage.setItem("username", values.username);
    localStorage.setItem("password", values.password);
    message.success("Đăng ký thành công!");
    navigate("/dangnhap");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Đăng Ký</h2>
      <Form form={form} layout="vertical" onFinish={handleDangKy}>
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
          Đăng Ký
        </Button>
      </Form>
    </div>
  );
}

export default DangKy;
