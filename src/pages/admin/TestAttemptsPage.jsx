// src/pages/TestAttemptsPage.js
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSearch, FaEye, FaArrowLeft } from "react-icons/fa";
// Nhập các actions và hooks từ Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttemptsForTestInCourse,
  clearCourseTestAttempts,
} from "../../redux/testAttemptSlice"; // Giả sử file slice của bạn ở đây

const TestAttemptsPage = () => {
  const { courseId, testId } = useParams();
  const dispatch = useDispatch();

  // --- Lấy dữ liệu từ Redux Store ---
  const {
    courseTestAttempts, // Dữ liệu các lượt làm bài
    status,
    error,
  } = useSelector((state) => state.testAttempts);

  // --- State cục bộ cho các bộ lọc và sắp xếp trên UI ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("highest"); // 'highest', 'lowest', 'newest'

  // --- Fetch dữ liệu và dọn dẹp khi component unmount ---
  useEffect(() => {
    if (courseId && testId) {
      dispatch(fetchAttemptsForTestInCourse({ courseId, testId }));
    }

    // Hàm dọn dẹp: sẽ được gọi khi component unmount
    return () => {
      dispatch(clearCourseTestAttempts());
    };
  }, [courseId, testId, dispatch]);

  // --- Lọc và sắp xếp dữ liệu phía client ---
  const sortedAndFilteredAttempts = useMemo(() => {
    // Backend đã trả về dữ liệu được định dạng, chỉ cần lọc và sắp xếp lại
    if (!courseTestAttempts) return [];

    const filtered = courseTestAttempts.filter((att) =>
      // `att.user.fullName` đã được populate từ backend
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
        // Backend đã sắp xếp theo điểm cao nhất, nhưng vẫn cần sort lại sau khi lọc
        return [...filtered].sort((a, b) => b.score - a.score);
    }
  }, [courseTestAttempts, searchTerm, sortOrder]);

  // --- Render logic với các trạng thái loading, error ---
  let content;

  if (status === "loading") {
    content = (
      <div className="p-6 text-center text-lg">
        Đang tải danh sách bài làm...
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div className="p-6 text-center text-lg text-red-500">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold">Học viên</th>
              <th className="p-4 font-semibold text-center">Điểm số</th>
              <th className="p-4 font-semibold">Thời gian nộp bài</th>
              <th className="p-4 font-semibold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredAttempts.length > 0 ? (
              sortedAndFilteredAttempts.map((attempt) => (
                <tr key={attempt._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full object-cover mr-4"
                        // Giả sử đối tượng `attempt` có thuộc tính `avatarUrl`
                        // Thay thế URL placeholder bằng ảnh mặc định của bạn
                        src={
                          attempt.avatar || "https://via.placeholder.com/150"
                        }
                        alt={`Avatar của ${attempt.fullName}`}
                      />
                      <div>
                        <p className="font-semibold">{attempt.fullName}</p>
                        <p className="text-sm text-gray-500">{attempt.email}</p>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`p-4 text-center font-bold text-xl ${
                      attempt.score >= 50 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {attempt.score}
                  </td>
                  <td className="p-4">
                    {new Date(attempt.startedAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="p-4">
                    {/* Link đến trang chi tiết kết quả của attempt này */}
                    <Link
                      // ✅ SỬA LẠI ĐƯỜNG DẪN NÀY
                      to={`/admin/course/${courseId}/test/${testId}/attempt/${attempt._id}`}
                      className="text-gray-600 hover:text-blue-600 flex items-center justify-center"
                      title="Xem chi tiết bài làm"
                    >
                      <FaEye size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-10 text-gray-500">
                  Không có bài làm nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Link
          to={`/admin/course/${courseId}`}
          className="flex items-center text-blue-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Quay lại trang chỉnh sửa khóa học
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Kết quả Kiểm tra
      </h1>
      <p className="text-gray-500 mb-6">
        Danh sách các lượt làm bài của học viên cho bài kiểm tra này.
      </p>

      {/* Thanh công cụ */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Tìm theo tên học viên..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div>
          <label htmlFor="sortOrder" className="mr-2 text-sm font-medium">
            Sắp xếp theo:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="highest">Điểm cao nhất</option>
            <option value="lowest">Điểm thấp nhất</option>
            <option value="newest">Mới nhất</option>
          </select>
        </div>
      </div>

      {/* Bảng kết quả */}
      {content}
    </div>
  );
};

export default TestAttemptsPage;
