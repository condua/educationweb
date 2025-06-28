// src/pages/StudentManagement.js
import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

// Đảm bảo đường dẫn này đúng với cấu trúc thư mục của bạn
import { students as initialStudents } from "./studentMockData";
import StudentFormModal from "./StudentFormModal";

// Số lượng mục hiển thị trên mỗi trang
const ITEMS_PER_PAGE = 5;

const StudentManagement = () => {
  // State để lưu danh sách sinh viên
  const [students, setStudents] = useState(initialStudents);
  // State cho chức năng tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  // State cho chức năng phân trang
  const [currentPage, setCurrentPage] = useState(1);
  // State để quản lý trạng thái mở/đóng của modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State để lưu thông tin sinh viên đang được chỉnh sửa. Nếu là null, modal sẽ ở chế độ "Thêm mới"
  const [editingStudent, setEditingStudent] = useState(null);

  // --- LOGIC LỌC VÀ TÌM KIẾM ---
  // Sử dụng useMemo để tối ưu, chỉ tính toán lại khi students hoặc searchTerm thay đổi
  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // --- LOGIC PHÂN TRANG ---
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  // Lấy ra danh sách sinh viên cho trang hiện tại
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // --- CÁC HÀM XỬ LÝ HÀNH ĐỘNG (CRUD) ---

  // Mở modal. Nếu không có 'student', mặc định là chế độ thêm mới.
  const handleOpenModal = (student = null) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  // Đóng modal và reset trạng thái
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  // Lưu thông tin (thêm mới hoặc cập nhật)
  const handleSaveStudent = (studentData) => {
    if (studentData._id) {
      // Chế độ Sửa: Cập nhật sinh viên trong danh sách
      setStudents((prev) =>
        prev.map((s) => (s._id === studentData._id ? studentData : s))
      );
    } else {
      // Chế độ Thêm: Tạo sinh viên mới và thêm vào đầu danh sách
      const newStudent = {
        ...studentData,
        _id: `user${Date.now()}`, // Tạo ID tạm thời, duy nhất
        avatar: `https://placehold.co/40x40/f39c12/ffffff?text=${studentData.fullName
          .charAt(0)
          .toUpperCase()}`,
        enrolledCourses: 0,
        createdAt: new Date().toISOString(),
      };
      setStudents((prev) => [newStudent, ...prev]);
    }
    handleCloseModal(); // Đóng modal sau khi lưu thành công
  };

  // Xóa một sinh viên
  const handleDelete = (studentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa học viên này không?")) {
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
    }
  };

  // --- GIAO DIỆN COMPONENT ---
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Quản lý Học viên
      </h1>

      {/* Thanh công cụ: Tìm kiếm và Thêm mới */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
            }}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Thêm Học viên
        </button>
      </div>

      {/* Bảng dữ liệu */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold">Họ và Tên</th>
              <th className="p-4 font-semibold">Số điện thoại</th>
              <th className="p-4 font-semibold">Số khóa học</th>
              <th className="p-4 font-semibold">Ngày tham gia</th>
              <th className="p-4 font-semibold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr
                key={student._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4 flex items-center">
                  <img
                    src={student.avatar}
                    alt={student.fullName}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{student.fullName}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </td>
                <td className="p-4">{student.phone}</td>
                <td className="p-4 text-center">{student.enrolledCourses}</td>
                <td className="p-4">
                  {new Date(student.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleOpenModal(student)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Hiển thị {currentStudents.length} trên tổng số{" "}
          {filteredStudents.length} học viên
        </p>
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Trước
          </button>
          <span className="px-4">
            Trang {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Render Modal Form */}
      <StudentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveStudent}
        student={editingStudent}
      />
    </div>
  );
};

export default StudentManagement;
