import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../../redux/coursesSlice"; // Giả sử file slice của bạn ở đây

const ITEMS_PER_PAGE = 5;

const CourseManagement = () => {
  // --- Redux Integration ---
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    courses: coursesFromStore, // Đổi tên để tránh xung đột
    status,
    error,
  } = useSelector((state) => state.courses);

  // --- Component-level State for UI Controls ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // --- Fetch Data on Component Mount ---
  useEffect(() => {
    // Chỉ fetch khi component được tải lần đầu hoặc khi cần thiết
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  // --- Memoized Calculations based on data from Redux Store ---
  const categories = useMemo(() => {
    if (!coursesFromStore) return ["All"];
    const allCategories = coursesFromStore.map((course) => course.category);
    return ["All", ...new Set(allCategories)];
  }, [coursesFromStore]);

  const filteredCourses = useMemo(() => {
    if (!coursesFromStore) return [];
    let tempCourses = [...coursesFromStore];

    if (filterCategory !== "All") {
      tempCourses = tempCourses.filter(
        (course) => course.category === filterCategory
      );
    }

    if (searchTerm) {
      tempCourses = tempCourses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return tempCourses;
  }, [coursesFromStore, searchTerm, filterCategory]);

  // --- Pagination Logic (No change) ---
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // --- Action Handlers dispatching Redux Actions ---
  const handleAddCourse = () => {
    // Điều hướng đến trang tạo khóa học mới
    navigate("/admin/course/new");
  };

  const handleDelete = (courseId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      dispatch(deleteCourse(courseId));
    }
  };

  // --- Render Logic with Loading and Error States ---
  let content;

  if (status === "loading") {
    content = (
      <div className="text-center p-10">
        <p className="text-xl">Đang tải dữ liệu khóa học...</p>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 font-semibold min-w-[300px]">Khóa học</th>
                  <th className="p-4 font-semibold">Giảng viên</th>
                  <th className="p-4 font-semibold text-center">Học viên</th>
                  <th className="p-4 font-semibold text-center">Đánh giá</th>
                  <th className="p-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.length > 0 ? (
                  currentCourses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4 flex items-center">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-24 h-14 rounded-md mr-4 object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-base">
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
                        <div className="flex items-center justify-center text-yellow-500">
                          <FaStar className="mr-1" />
                          <span>{course.rating || 0}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          to={`/admin/course/${course._id}`}
                          className="text-blue-600 hover:text-blue-800 mr-4 inline-block"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-10">
                      Không tìm thấy khóa học nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phân trang */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-600">
            Hiển thị {currentCourses.length} trên tổng số{" "}
            {filteredCourses.length} khóa học
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
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      </>
    );
  } else if (status === "failed") {
    content = (
      <div className="text-center p-10 bg-red-100 text-red-700 rounded-lg">
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Quản lý Khóa học
      </h1>

      {/* Thanh công cụ */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="relative w-full sm:w-auto sm:flex-grow max-w-xs">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khóa học..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page khi tìm kiếm
            }}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1); // Reset page khi lọc
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "Tất cả Danh mục" : cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <FaPlus className="mr-2" /> Thêm Khóa học
          </button>
        </div>
      </div>

      {/* Bảng dữ liệu hoặc trạng thái loading/error */}
      {content}
    </div>
  );
};

export default CourseManagement;
