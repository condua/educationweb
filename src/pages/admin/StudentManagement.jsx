import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../../redux/userSlice";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import StudentFormModal from "./StudentFormModal";

const ITEMS_PER_PAGE = 9;

const StudentManagement = () => {
  const dispatch = useDispatch();

  const { usersList, totalUsers, status, error } = useSelector(
    (state) => state.user
  );

  // State tìm kiếm và phân trang
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal quản lý
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Gọi API khi page hoặc searchTerm thay đổi
  useEffect(() => {
    dispatch(
      fetchAllUsers({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchTerm,
      })
    );
  }, [dispatch, currentPage, searchTerm]);

  const handleOpenModal = (student = null) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleDelete = (studentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa học viên này không?")) {
      dispatch(deleteUser(studentId));
    }
  };

  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý Học viên</h1>

      {/* Thanh tìm kiếm và thêm */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Thêm Học viên
        </button>
      </div>

      {/* Danh sách học viên */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Họ và Tên</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Số khóa học</th>
              <th className="p-3">Ngày tham gia</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : usersList.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Không có học viên nào.
                </td>
              </tr>
            ) : (
              usersList.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 border-t">
                  <td className="p-4 flex items-center">
                    <img
                      src={student.avatar}
                      alt={student.fullName}
                      className="w-9 h-9 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{student.fullName}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </td>
                  <td className="p-4">{student.phone || "-"}</td>
                  <td className="p-4 text-center">
                    {student.enrolledCourses?.length || 0}
                  </td>
                  <td className="p-4">
                    {new Date(student.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleOpenModal(student)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
        <p className="text-sm text-gray-600 mb-2 sm:mb-0">
          Hiển thị {usersList.length} trên tổng {totalUsers} học viên
        </p>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Modal thêm/sửa học viên (tuỳ bạn triển khai) */}
      {/* <StudentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        student={editingStudent}
        onSave={() => {
          handleCloseModal();
          dispatch(fetchAllUsers({ page: currentPage, limit: ITEMS_PER_PAGE, search: searchTerm }));
        }}
      /> */}
    </div>
  );
};

export default StudentManagement;
