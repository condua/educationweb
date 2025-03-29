import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEnrolledCourse, enrollCourse } from "../redux/userSlice";
import { ImSpinner2 } from "react-icons/im";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(
    (state) => state.user?.enrolledCourses || []
  );
  const { isAuthen } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNavigate = () => {
    if (course?._id) {
      navigate(`/course/${course._id}`);
    } else {
      console.error("Lỗi: course._id không hợp lệ", course);
    }
  };

  const isEnrolled = enrolledCourses.some(
    (c) => String(c) === String(course?._id)
  );

  const handleEnroll = async (e) => {
    e.stopPropagation();
    if (isEnrolled || !course?._id) return;
    if (isAuthen === false) {
      navigate("/login");
    }
    setLoading(true);

    try {
      const resultAction = await dispatch(enrollCourse(course._id)).unwrap();
      console.log("Kết quả từ enrollCourse:", resultAction);

      if (!resultAction) {
        console.error(
          "Lỗi: Kết quả từ enrollCourse không hợp lệ",
          resultAction
        );
        return;
      }

      // Cập nhật Redux store ngay lập tức
      dispatch(addEnrolledCourse(course._id));

      setSuccess(true);
    } catch (error) {
      console.error("Đăng ký khóa học thất bại:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-11/12 bg-white rounded-2xl shadow-md p-4 sm:w-80 hover:shadow-lg transition"
      // onClick={handleNavigate}
    >
      {course?.thumbnail ? (
        <img
          src={course.thumbnail}
          alt={course.title || "Khóa học"}
          className="rounded-lg w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="mt-4">
        <span className="text-sm text-gray-500">
          {course?.category || "N/A"} • {course?.chapters?.length || 0} chương
        </span>
        <h3 className="font-semibold text-lg mt-2">
          {course?.title || "Khóa học không có tiêu đề"}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {course?.description || "Không có mô tả."}
        </p>

        <div className="flex items-center mt-4">
          {course?.mentor?.avatar ? (
            <img
              src={course.mentor.avatar}
              alt={course.mentor.name || "Mentor"}
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
          )}
          <span className="text-sm">{course?.mentor?.name || "N/A"}</span>
          <span className="ml-auto text-lg font-bold text-blue-500">
            {course?.price || "Miễn phí"}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 text-gray-600 text-sm">
          <span>⭐ {course?.rating || "N/A"}</span>
          <span>👨‍🎓 {course?.students?.toLocaleString() || "0"}</span>
        </div>

        {/* Nút Đăng ký */}
        <button
          onClick={handleEnroll}
          className={`mt-3 cursor-pointer w-full py-2 rounded-lg text-white flex items-center justify-center ${
            isEnrolled || success
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isEnrolled || success || loading}
        >
          {loading ? <ImSpinner2 className="animate-spin mr-2" /> : null}
          {isEnrolled || success ? "Đã đăng ký" : "Đăng ký khóa học"}
        </button>

        {/* Thông báo đăng ký thành công */}
        {success && (
          <p className="text-center text-green-500 mt-2 text-sm">
            Bạn đã đăng ký thành công!
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
