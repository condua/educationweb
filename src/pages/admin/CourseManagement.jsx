import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../../redux/coursesSlice";

const ITEMS_PER_PAGE = 6; // Tăng số lượng item để giao diện card đẹp hơn

//======================================================================
// ✅ COMPONENT MỚI: CARD HIỂN THỊ KHÓA HỌC TRÊN MOBILE
//======================================================================
const CourseCard = ({ course, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:scale-[1.02]">
      {/* Ảnh bìa */}
      <img
        src={
          course.thumbnail ||
          "https://via.placeholder.com/400x225?text=No+Image"
        }
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        {/* Tiêu đề và danh mục */}
        <p className="text-sm text-blue-600 font-semibold">{course.category}</p>
        <h3
          className="font-bold text-lg text-gray-800 mt-1 flex-grow"
          title={course.title}
        >
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          GV: {course.mentor?.name || "Chưa có"}
        </p>

        {/* Thông số */}
        <div className="flex items-center justify-between text-gray-600 mt-4 pt-3 border-t">
          <div className="flex items-center gap-2 text-sm">
            <FaUsers className="text-gray-400" />
            <span>{course.students?.toLocaleString() || 0}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-yellow-500">
            <FaStar />
            <span>{course.rating || "N/A"}</span>
          </div>
        </div>
      </div>
      {/* Nút hành động */}
      <div className="bg-gray-50 p-2 flex justify-end gap-2 border-t">
        <button
          onClick={() => navigate(`/admin/course/${course._id}`)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-100"
        >
          Chỉnh sửa
        </button>
        <button
          onClick={() => onDelete(course._id)}
          className="text-sm font-medium text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

//======================================================================
// COMPONENT CHÍNH: QUẢN LÝ KHÓA HỌC
//======================================================================
const CourseManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    courses: coursesFromStore,
    status,
    error,
  } = useSelector((state) => state.courses);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const categories = useMemo(() => {
    if (!coursesFromStore) return ["All"];
    const allCategories = coursesFromStore.map((course) => course.category);
    return ["All", ...new Set(allCategories)];
  }, [coursesFromStore]);

  const filteredCourses = useMemo(() => {
    if (!coursesFromStore) return [];
    return coursesFromStore
      .filter(
        (course) =>
          filterCategory === "All" || course.category === filterCategory
      )
      .filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [coursesFromStore, searchTerm, filterCategory]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset trang khi filter hoặc search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory]);

  const handleDelete = (courseId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      dispatch(deleteCourse(courseId));
    }
  };

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="text-center p-10 text-xl text-gray-600">
          Đang tải dữ liệu khóa học...
        </div>
      );
    }
    if (status === "failed") {
      return (
        <div className="text-center p-10 bg-red-50 text-red-700 rounded-lg">
          Lỗi: {error}
        </div>
      );
    }
    if (filteredCourses.length === 0) {
      return (
        <div className="text-center p-10 bg-white text-gray-500 rounded-lg shadow-md">
          Không tìm thấy khóa học nào phù hợp.
        </div>
      );
    }

    return (
      <>
        {/* ✅ Giao diện Thẻ cho Mobile và Tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:hidden">
          {currentCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* ✅ Giao diện Bảng cho Desktop */}
        <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 font-semibold min-w-[350px]">Khóa học</th>
                  <th className="p-4 font-semibold">Giảng viên</th>
                  <th className="p-4 font-semibold text-center">Học viên</th>
                  <th className="p-4 font-semibold text-center">Đánh giá</th>
                  <th className="p-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4 flex items-center">
                      <img
                        src={
                          course.thumbnail ||
                          "https://via.placeholder.com/400x225?text=No+Image"
                        }
                        alt={course.title}
                        className="w-28 h-16 rounded-md mr-4 object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-base text-gray-800">
                          {course.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {course.category}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">{course.mentor?.name || "N/A"}</td>
                    <td className="p-4 text-center">
                      {course.students?.toLocaleString() || 0}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center font-bold text-yellow-500">
                        <FaStar className="mr-1" />
                        <span>{course.rating || 0}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/admin/course/${course._id}`}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100"
                          title="Chỉnh sửa"
                        >
                          <FaEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100"
                          title="Xóa"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phân trang */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <p className="text-sm text-gray-600">
            Hiển thị {currentCourses.length} trên tổng số{" "}
            {filteredCourses.length} khóa học
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            <span className="px-2 font-medium text-gray-700">
              Trang {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 border rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Quản lý Khóa học
        </h1>
        <p className="text-gray-500 mt-1">
          Thêm, sửa, xóa và tìm kiếm các khóa học của bạn.
        </p>
      </header>

      {/* Thanh công cụ */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative w-full md:flex-grow">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khóa học..."
            className="w-full h-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full md:w-auto">
          <select
            className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "Tất cả Danh mục" : cat}
              </option>
            ))}
          </select>
          <button
            onClick={() => navigate("/admin/course/new")}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <FaPlus className="mr-2" /> Thêm Khóa học
          </button>
        </div>
      </div>

      {/* Nội dung chính */}
      {renderContent()}
    </div>
  );
};

export default CourseManagement;
