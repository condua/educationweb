// src/pages/admin/CourseNewPage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createCourse } from "../../redux/coursesSlice";

const CourseNewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State cho dữ liệu form
  const [courseData, setCourseData] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  // ✅ State để quản lý lỗi validation
  const [errors, setErrors] = useState({});

  // ✅ State để theo dõi form đã được chỉnh sửa hay chưa
  const [isDirty, setIsDirty] = useState(false);

  // State cho trạng thái loading khi submit
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Cảnh báo người dùng khi rời trang mà chưa lưu
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        // Dòng này cần thiết cho một số trình duyệt
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // Xử lý khi người dùng thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Đánh dấu form đã bị thay đổi
    setIsDirty(true);
    // Xóa lỗi của trường đang nhập
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // ✅ Hàm kiểm tra dữ liệu form
  const validateForm = () => {
    const newErrors = {};
    if (!courseData.title.trim()) {
      newErrors.title = "Tên khóa học không được để trống.";
    }
    if (!courseData.category.trim()) {
      newErrors.category = "Danh mục không được để trống.";
    }
    return newErrors;
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chạy validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      const newCourse = await dispatch(createCourse(courseData)).unwrap();

      // Tắt cảnh báo khi đã submit thành công
      setIsDirty(false);

      alert("Tạo khóa học thành công!");
      navigate(`/admin/course/${newCourse._id}`);
    } catch (error) {
      alert(`Tạo khóa học thất bại: ${error.message || "Lỗi không xác định"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/admin/courses"
            className="flex items-center text-blue-600 hover:underline font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Quay lại Quản lý Khóa học
          </Link>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Tạo Khóa Học Mới
          </h1>
          <p className="text-gray-500 mt-1">
            Điền các thông tin cơ bản. Bạn có thể thêm chương và bài học sau khi
            tạo.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* Tên khóa học */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Tên khóa học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={courseData.title}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.title
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Danh mục */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Danh mục <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={courseData.category}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.category
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Mô tả khóa học */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Mô tả khóa học
              </label>
              <textarea
                name="description"
                id="description"
                value={courseData.description}
                onChange={handleChange}
                rows="5"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* URL Ảnh bìa và Xem trước */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL Ảnh bìa
              </label>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {courseData.thumbnail && (
                  <img
                    src={courseData.thumbnail}
                    alt="Xem trước ảnh bìa"
                    className="w-full sm:w-48 h-auto sm:h-28 object-cover rounded-lg border bg-gray-200 flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.target.style.display = "block";
                    }}
                  />
                )}
                <div className="flex-grow w-full">
                  <input
                    type="text"
                    name="thumbnail"
                    id="thumbnail"
                    value={courseData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dán một liên kết hình ảnh trực tiếp vào đây để xem trước.
                  </p>
                </div>
              </div>
            </div>

            {/* Nút Submit */}
            <div className="pt-4 flex justify-end border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    <span>Tạo và Tiếp tục</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseNewPage;
