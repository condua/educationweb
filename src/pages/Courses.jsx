import React, { useState, useEffect } from "react";
import CourseList from "./CourseList"; // Giả sử bạn có component này
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseById } from "../redux/coursesSlice"; // Giả sử bạn có action này
import { useNavigate } from "react-router-dom";

// --- Component CourseCard với hiệu ứng ---
const CourseCard = ({ courseId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy dữ liệu khóa học từ Redux store
  const course = useSelector((state) => state.courses.courseDetails[courseId]);
  const status = useSelector((state) => state.courses.status);

  useEffect(() => {
    // Chỉ fetch dữ liệu nếu khóa học chưa có trong store
    if (!course) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId, course]);

  const handleNavigate = () => {
    if (courseId) {
      navigate(`/course/${courseId}`);
    } else {
      console.error("Lỗi: courseId không hợp lệ", courseId);
    }
  };

  // Các trạng thái loading và lỗi
  if (status === "loading" && !course)
    return <div className="text-center p-4">Đang tải...</div>;
  if (!course)
    return <div className="text-center p-4">Không tìm thấy khóa học</div>;

  return (
    // Thêm hiệu ứng chuyển đổi, phóng to và đổ bóng khi di chuột
    <div
      className="bg-white px-4 pt-4 pb-28 rounded-2xl shadow-md relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="w-full h-40 rounded-lg overflow-hidden mb-2">
        <img
          src={course.thumbnail}
          alt={course.title || "Khóa học"}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-sm text-gray-500 my-1">
        {course?.category || "N/A"} • {course?.chapters?.length || 0} chương
      </p>
      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2">
        {course?.description || "Không có mô tả cho khóa học này."}
      </p>

      {/* Phần thông tin mentor và nút được đặt ở dưới cùng */}
      <div className="absolute bottom-5 w-full px-4 left-0">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <img
              src={course.mentor.avatar}
              alt={course.mentor.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <p className="text-sm text-gray-600">{course.mentor.name}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click của thẻ cha
              handleNavigate();
            }}
            className="bg-blue-400 px-3 py-1.5 rounded-lg text-white text-center hover:bg-blue-500 transform hover:-translate-y-1 transition-all duration-300 sm:text-sm text-xs"
          >
            Vào học ngay
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Component CourseDashboard với phân trang ---
const CourseDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  // Lấy danh sách ID khóa học đã đăng ký từ Redux
  const enrolledCourses = useSelector(
    (state) => state.user?.enrolledCourses || []
  );

  // Lọc ra các ID hợp lệ (loại bỏ null, undefined)
  const filteredCourses = enrolledCourses.filter(Boolean);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  // Lấy danh sách khóa học cho trang hiện tại
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-center font-bold text-xl md:text-2xl">
            Bạn chưa đăng ký khóa học nào.
          </p>
          {/* Có thể thêm nút để khám phá khóa học mới */}
        </div>
      ) : (
        <>
          <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-6">
            <h2 className="md:text-2xl text-xl font-bold text-gray-800">
              Chào bạn trở lại, sẵn sàng học bài mới chứ?
            </h2>
            <a href="#" className="text-blue-500 font-medium hover:underline">
              Tất cả khóa học
            </a>
          </div>

          {/* Grid chứa các thẻ khóa học */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
            {currentCourses.map((courseId) => (
              <CourseCard key={courseId} courseId={courseId} />
            ))}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                &lt;
              </button>
              <span className="text-lg font-semibold text-gray-700">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
      {/* Component CourseList có thể được hiển thị ở đây nếu cần */}
      <div className="mt-12">
        <CourseList />
      </div>
    </div>
  );
};

export default CourseDashboard;
