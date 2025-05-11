import React, { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseById } from "../redux/coursesSlice";
import { useNavigate } from "react-router-dom";
const CourseCard = ({ courseId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Lấy dữ liệu khóa học từ Redux store
  // Truy xuất khóa học theo ID
  const course = useSelector((state) => state.courses.courseDetails[courseId]);
  const status = useSelector((state) => state.courses.status);

  useEffect(() => {
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

  if (status === "loading") return <div>Loading...</div>;
  if (!course) return <div>Không tìm thấy khóa học</div>;

  return (
    <div className="bg-white px-4 pt-4 pb-30 rounded-2xl shadow-md relative">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="rounded-lg mb-2 w-full h-40 object-cover"
      />
      <p className="text-sm text-gray-500 my-1">
        {course?.category || "N/A"} • {course?.chapters?.length || 0} chương
      </p>
      <h3 className="font-semibold text-lg">{course.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2 absolute bottom-19 pr-0.5">
        {course?.description || ""}
      </p>

      <div className="absolute bottom-5 w-11/12 right-3">
        <div className="flex items-center justify-between mt-2">
          <div className=" flex items-center">
            <img
              src={course.mentor.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <p className="text-sm text-gray-600">{course.mentor.name}</p>
          </div>

          <button
            onClick={handleNavigate}
            className="bg-blue-400 px-2 py-1 rounded-lg text-white text-center hover:bg-blue-500 sm:text-sm text-xs"
          >
            Vào học ngay
          </button>
        </div>
        {/* <div className="mt-2">
          <div className="h-1 bg-gray-300 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">Lesson 5 of 7</p>
        </div> */}
      </div>
    </div>
  );
};

const CourseDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;
  const enrolledCourses = useSelector(
    (state) => state.user?.enrolledCourses || []
  );
  const filteredCourses = enrolledCourses.filter(Boolean);

  const totalPages = Math.ceil(enrolledCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  console.log(filteredCourses);
  return (
    <div className="p-8 bg-blue-50">
      {enrolledCourses.length === 0 ? (
        <p className="text-center font-bold text-xl md:text-2xl">
          Bạn chưa có khóa học nào.
        </p>
      ) : (
        <>
          <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-4">
            <h2 className="md:text-2xl text-lg font-bold">
              Chào bạn trở lại, sẵn sàng học những bài học tiếp theo ?
            </h2>
            <a href="#" className="text-blue-500 font-medium">
              Khóa học của bạn
            </a>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 overflow-x-auto justify-center">
            {currentCourses.map((courseId) => (
              <CourseCard key={courseId} courseId={courseId} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 cursor-pointer"
              >
                &lt;
              </button>
              <span className="text-lg font-semibold">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 cursor-pointer"
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
      <CourseList />
    </div>
  );
};

export default CourseDashboard;
