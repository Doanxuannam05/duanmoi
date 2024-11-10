import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
  Tag,
  Select,
  Card,
  Row,
  Col,
} from "antd";
import moment from "moment";

function QuanLyChuyenBay() {
  const [chuyenBays, setChuyenBays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Predefined options for airplane type and airline
  const airplaneTypes = ["Boeing 737", "Airbus A320", "Embraer 175"];
  const airlines = ["VietJet Air", "Vietnam Airlines", "Bamboo Airways"];

  // Thêm chuyến bay mới
  const handleThemChuyenBay = (values) => {
    const newChuyenBay = {
      ...values,
      ngayBay: values.ngayBay ? values.ngayBay.format("DD-MM-YYYY") : "",
      trangThai: "Bình thường",
    };
    setChuyenBays([...chuyenBays, newChuyenBay]);
    message.success("Thêm chuyến bay thành công!");
    setIsModalOpen(false);
    form.resetFields();
  };

  // Cập nhật thông tin chuyến bay
  const handleCapNhatChuyenBay = (values) => {
    const updatedChuyenBays = [...chuyenBays];
    updatedChuyenBays[selectedIndex] = {
      ...updatedChuyenBays[selectedIndex],
      ...values,
      ngayBay: values.ngayBay ? values.ngayBay.format("DD-MM-YYYY") : "",
    };
    setChuyenBays(updatedChuyenBays);
    message.success("Cập nhật chuyến bay thành công!");
    setIsUpdateModalOpen(false);
    updateForm.resetFields();
  };

  // Mở modal cập nhật chuyến bay
  const handleOpenUpdateModal = (index) => {
    setSelectedIndex(index);
    const chuyenBay = chuyenBays[index];
    updateForm.setFieldsValue({
      ...chuyenBay,
      ngayBay: moment(chuyenBay.ngayBay, "DD-MM-YYYY"),
    });
    setIsUpdateModalOpen(true);
  };

  // Xóa chuyến bay
  const handleXoaChuyenBay = (index) => {
    const newChuyenBays = chuyenBays.filter((_, i) => i !== index);
    setChuyenBays(newChuyenBays);
    message.success("Hủy chuyến bay thành công!");
  };

  // Hoãn hoặc hủy hoãn chuyến bay
  const handleHoanChuyenBay = (index) => {
    const updatedChuyenBays = [...chuyenBays];
    if (updatedChuyenBays[index].trangThai === "Hoãn") {
      updatedChuyenBays[index].trangThai = "Bình thường"; // Cancel postponement
      message.info("Chuyến bay đã được hủy hoãn.");
    } else {
      updatedChuyenBays[index].trangThai = "Hoãn"; // Postpone flight
      message.info("Chuyến bay đã được hoãn.");
    }
    setChuyenBays(updatedChuyenBays);
  };

  const columns = [
    { title: "Nơi đi", dataIndex: "Nơi đi" },
    { title: "Nơi đến", dataIndex: "Nơi đến" },
    { title: "Giá", dataIndex: "Giá" },
    { title: "Số ghế", dataIndex: "Số ghế" },
    { title: "Loại máy bay", dataIndex: "Loại máy bay" },
    { title: "Hãng máy bay", dataIndex: "Hãng máy bay" },
    {
      title: "Ngày bay",
      dataIndex: "Ngày bay",
      render: (ngayBay) => ngayBay || "Chưa xác định",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (trangThai) => (
        <Tag color={trangThai === "Hoãn" ? "red" : "green"}>{trangThai}</Tag>
      ),
    },
    {
      title: "Hành động",
      render: (_, record, index) => (
        <>
          <Button type="link" onClick={() => handleOpenUpdateModal(index)}>
            Cập nhật
          </Button>
          <Button type="link" danger onClick={() => handleXoaChuyenBay(index)}>
            Hủy Vé
          </Button>
          <Button type="link" onClick={() => handleHoanChuyenBay(index)}>
            {record.trangThai === "Hoãn" ? "Hủy hoãn" : "Hoãn"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#1890ff" }}>
        Quản Lý Chuyến Bay
      </h2>
      <Card style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ marginBottom: 20 }}
        >
          Thêm Chuyến Bay
        </Button>
        <Table
          dataSource={chuyenBays}
          columns={columns}
          rowKey={(record, index) => index}
          style={{ marginTop: "20px" }}
        />
      </Card>

      {/* Modal Thêm Chuyến Bay */}
      <Modal
        title="Thêm Chuyến Bay"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Thêm
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleThemChuyenBay}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Nơi đi"
                label="Nơi đi"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Nơi đến"
                label="Nơi đến"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Giá" label="Giá" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Số ghế"
                label="Số ghế"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Loại máy bay"
                label="Loại máy bay"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn loại máy bay">
                  {airplaneTypes.map((type) => (
                    <Select.Option key={type} value={type}>
                      {type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Hãng máy bay"
                label="Hãng máy bay"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn hãng máy bay">
                  {airlines.map((airline) => (
                    <Select.Option key={airline} value={airline}>
                      {airline}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Ngày bay"
                label="Ngày bay"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Modal Cập Nhật Chuyến Bay */}
      <Modal
        title="Cập Nhật Chuyến Bay"
        open={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        onOk={() => updateForm.submit()}
        footer={[
          <Button key="cancel" onClick={() => setIsUpdateModalOpen(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => updateForm.submit()}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          form={updateForm}
          layout="vertical"
          onFinish={handleCapNhatChuyenBay}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="noiDi"
                label="Nơi đi"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="noiDen"
                label="Nơi đến"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gia" label="Giá" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="soGhe"
                label="Số ghế"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="loaiMayBay"
                label="Loại máy bay"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn loại máy bay">
                  {airplaneTypes.map((type) => (
                    <Select.Option key={type} value={type}>
                      {type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hangMayBay"
                label="Hãng máy bay"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn hãng máy bay">
                  {airlines.map((airline) => (
                    <Select.Option key={airline} value={airline}>
                      {airline}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ngayBay"
                label="Ngày bay"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default QuanLyChuyenBay;
