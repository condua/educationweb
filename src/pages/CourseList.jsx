import { useState, useEffect } from "react";
import coursesData from "../json/listCourses.json";
import CourseCard from "./CourseCard";
import CategorySection from "./CategorySection";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const coursesPerPage = 4; // Số khóa học hiển thị trên mỗi trang

  useEffect(() => {
    setCourses(coursesData);
    setFilteredCourses(coursesData); // Ban đầu hiển thị tất cả khóa học
  }, []);

  // Lọc khóa học khi thay đổi category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.category.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  }, [selectedCategory, courses]);

  // Tính toán số trang
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Lấy danh sách khóa học cho trang hiện tại
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // Xử lý chuyển trang
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="py-10 bg-blue-50">
      {/* Category Section */}
      <CategorySection setSelectedCategory={setSelectedCategory} />

      <div className="flex justify-between items-center px-10">
        <h2 className="text-2xl font-semibold">Recommended for you</h2>
        <button className="text-blue-500 font-semibold">See all</button>
      </div>

      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="text-gray-500">No courses found in this category.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="text-lg font-semibold mx-4">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
