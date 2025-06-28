// src/components/StudentFormModal.js
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const StudentFormModal = ({ isOpen, onClose, onSave, student }) => {
  // BƯỚC 1: Thêm 'password' vào state ban đầu
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "", // Thêm trường password
  });

  const isEditMode = Boolean(student);

  useEffect(() => {
    if (isEditMode && student) {
      // Ở chế độ sửa, không điền mật khẩu
      setFormData({
        fullName: student.fullName,
        email: student.email,
        phone: student.phone,
        password: "", // Luôn để trống khi sửa
      });
    } else {
      // BƯỚC 3: Reset cả trường password khi mở form thêm mới
      setFormData({ fullName: "", email: "", phone: "", password: "" });
    }
  }, [student, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Khi lưu, dữ liệu password sẽ tự động được gửi đi nếu người dùng đã nhập
    onSave({ ...student, ...formData });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditMode ? "Chỉnh sửa Học viên" : "Thêm Học viên mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Các trường fullName, email, phone giữ nguyên */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Họ và Tên
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BƯỚC 2: Thêm trường mật khẩu vào form, chỉ hiển thị ở chế độ "Thêm mới" */}
          {!isEditMode && (
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required // Mật khẩu là bắt buộc khi tạo mới
                minLength={6} // Thêm validation cơ bản
              />
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
