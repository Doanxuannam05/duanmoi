import React from "react";
import { Routes, Route } from "react-router-dom";
import DangKy from "./components/DangKy";
import DangNhap from "./components/DangNhap";
import QuanLyChuyenBay from "./components/QuanLyChuyenBay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DangKy />} />
      <Route path="/dangnhap" element={<DangNhap />} />
      <Route path="/quanlychuyenbay" element={<QuanLyChuyenBay />} />
    </Routes>
  );
}

export default App;
