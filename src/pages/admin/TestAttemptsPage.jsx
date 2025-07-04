// src/pages/TestAttemptsPage.js
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSearch, FaEye, FaArrowLeft, FaFileCsv } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttemptsForTestInCourse,
  clearCourseTestAttempts,
} from "../../redux/testAttemptSlice";

// --- Custom Hook để quản lý logic dữ liệu (lọc, sắp xếp, phân trang) ---
const useTestAttemptsData = (attempts, initialPage = 1, itemsPerPage = 10) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("highest"); // 'highest', 'lowest', 'newest'
  const [currentPage, setCurrentPage] = useState(initialPage);

  const sortedAndFilteredAttempts = useMemo(() => {
    if (!attempts) return [];

    const filtered = attempts.filter((att) =>
      att.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOrder) {
      case "lowest":
        return [...filtered].sort((a, b) => a.score - b.score);
      case "newest":
        return [...filtered].sort(
          (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
        );
      case "highest":
      default:
        return [...filtered].sort((a, b) => b.score - a.score);
    }
  }, [attempts, searchTerm, sortOrder]);

  const totalPages = Math.ceil(sortedAndFilteredAttempts.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    // Reset về trang 1 nếu kết quả lọc không có trang hiện tại
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredAttempts.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [currentPage, sortedAndFilteredAttempts, itemsPerPage, totalPages]);

  // Effect để reset trang khi bộ lọc thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  return {
    // States & Setters
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    // Dữ liệu đã xử lý
    paginatedData,
    sortedAndFilteredAttempts, // Dữ liệu đầy đủ để xuất CSV
    totalPages,
  };
};

// --- Component Phân trang ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trước
      </button>
      <span className="text-gray-700">
        Trang {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sau
      </button>
    </div>
  );
};

// --- Component chính của trang ---
const TestAttemptsPage = () => {
  const { courseId, testId } = useParams();
  const dispatch = useDispatch();

  const { courseTestAttempts, status, error } = useSelector(
    (state) => state.testAttempts
  );

  // Sử dụng custom hook để quản lý data
  const {
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    paginatedData,
    sortedAndFilteredAttempts,
    totalPages,
  } = useTestAttemptsData(courseTestAttempts);

  // Fetch dữ liệu
  useEffect(() => {
    if (courseId && testId) {
      dispatch(fetchAttemptsForTestInCourse({ courseId, testId }));
    }
    return () => {
      dispatch(clearCourseTestAttempts());
    };
  }, [courseId, testId, dispatch]);

  // Hàm xuất dữ liệu ra file CSV
  const exportToCSV = () => {
    const headers = ["Họ và tên", "Email", "Điểm số", "Thời gian nộp bài"];
    const rows = sortedAndFilteredAttempts.map((attempt) => [
      `"${attempt.fullName.replace(/"/g, '""')}"`, // Escape double quotes
      `"${attempt.email}"`,
      attempt.score,
      `"${new Date(attempt.startedAt).toLocaleString("vi-VN")}"`,
    ]);

    // Thêm BOM để Excel mở file UTF-8 đúng cách
    const BOM = "\uFEFF";
    const csvContent =
      BOM + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `ket_qua_${testId}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- Render logic ---
  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="p-10 text-center text-lg text-gray-600">
          Đang tải danh sách bài làm...
        </div>
      );
    }
    if (status === "failed") {
      return (
        <div className="p-10 text-center text-lg text-red-600 bg-red-50 rounded-lg">
          Lỗi khi tải dữ liệu: {error}
        </div>
      );
    }
    if (status === "succeeded" && sortedAndFilteredAttempts.length === 0) {
      return (
        <div className="text-center p-10 text-gray-500 bg-white rounded-lg shadow-md">
          Không tìm thấy bài làm nào.
        </div>
      );
    }

    return (
      <>
        {/* Giao diện Bảng cho Desktop (ẩn trên mobile) */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Học viên</th>
                <th className="p-4 font-semibold text-gray-700 text-center">
                  Điểm số
                </th>
                <th className="p-4 font-semibold text-gray-700">
                  Thời gian nộp bài
                </th>
                <th className="p-4 font-semibold text-gray-700 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((attempt) => (
                <tr
                  key={attempt._id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full object-cover mr-4"
                        src={
                          attempt.avatar ||
                          `https://ui-avatars.com/api/?name=${attempt.fullName}&background=random`
                        }
                        alt={`Avatar của ${attempt.fullName}`}
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {attempt.fullName}
                        </p>
                        <p className="text-sm text-gray-500">{attempt.email}</p>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`p-4 text-center font-bold text-xl ${
                      attempt.score >= 5 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {attempt.score}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(attempt.startedAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <Link
                        to={`/admin/course/${courseId}/test/${testId}/attempt/${attempt._id}`}
                        className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
                        title="Xem chi tiết bài làm"
                      >
                        <FaEye size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Giao diện Thẻ cho Mobile (ẩn trên desktop) */}
        <div className="block md:hidden space-y-4">
          {paginatedData.map((attempt) => (
            <div
              key={attempt._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={
                      attempt.avatar ||
                      `https://ui-avatars.com/api/?name=${attempt.fullName}&background=random`
                    }
                    alt={`Avatar của ${attempt.fullName}`}
                  />
                  <div>
                    <p className="font-bold text-gray-800">
                      {attempt.fullName}
                    </p>
                    <p className="text-sm text-gray-500">{attempt.email}</p>
                  </div>
                </div>
                <Link
                  to={`/admin/course/${courseId}/test/${testId}/attempt/${attempt._id}`}
                  className="text-gray-500 hover:text-blue-600 p-2 -mr-2 -mt-2"
                  title="Xem chi tiết bài làm"
                >
                  <FaEye size={20} />
                </Link>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Nộp lúc:</p>
                  <p className="font-medium text-gray-800">
                    {new Date(attempt.startedAt).toLocaleString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 text-right">Điểm:</p>
                  <p
                    className={`font-bold text-2xl ${
                      attempt.score >= 5 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {attempt.score}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Link
          to={`/admin/course/${courseId}`}
          className="flex items-center text-blue-600 hover:underline font-medium"
        >
          <FaArrowLeft className="mr-2" /> Quay lại chi tiết khóa học
        </Link>
      </div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Kết quả Kiểm tra
        </h1>
        <p className="text-gray-500 mt-1">
          Quản lý và xem lại các lượt làm bài của học viên.
        </p>
      </header>

      {/* Thanh công cụ */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-xs grow">
          <input
            type="text"
            placeholder="Tìm theo tên học viên..."
            className="w-full h-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-full"
          >
            <option value="highest">Điểm cao nhất</option>
            <option value="lowest">Điểm thấp nhất</option>
            <option value="newest">Mới nhất</option>
          </select>
          <button
            onClick={exportToCSV}
            className="flex items-center shrink-0 gap-2 px-3 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed h-full"
            title="Xuất danh sách ra file CSV"
            disabled={sortedAndFilteredAttempts.length === 0}
          >
            <FaFileCsv size={16} />
            <span className="hidden sm:inline">Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Nội dung chính: Bảng hoặc Thẻ */}
      {renderContent()}
    </div>
  );
};

export default TestAttemptsPage;
