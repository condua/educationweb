import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/coursesSlice";
import CourseCard from "./CourseCard";
import CategorySection from "./CategorySection";
import { Search } from "lucide-react";

const removeAccents = (str) => {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
};

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const coursesPerPage = 4;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    let filtered = courses;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((course) =>
        removeAccents(course.category).includes(removeAccents(selectedCategory))
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((course) =>
        removeAccents(course.title).includes(removeAccents(searchTerm))
      );
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, courses]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <div className="py-5 flex flex-col justify-center items-center">
      <h2 className="mb-5 md:text-2xl text-lg font-semibold text-center">
        Chọn khóa học yêu thích của bạn
      </h2>
      <div className="w-full flex justify-center items-center relative">
        <div className="relative w-full">
          {/* Input field */}
          <input
            className="w-full sm:py-4 sm:px-6 py-2 px-3 bg-gray-200 rounded-full outline-0 text-lg sm:text-xl pr-14"
            placeholder="Bạn đang tìm kiếm khóa học nào?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Icon search với nền trắng */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white sm:w-12 w-8 sm:h-12 h-8 rounded-full flex justify-center items-center shadow">
            <Search className="text-gray-500 sm:w-6 w-4 sm:h-6 h-4" />
          </div>
        </div>
      </div>

      <CategorySection setSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 w-full">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="text-gray-500">Không tìm thấy khóa học phù hợp.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <span className="text-lg font-semibold mx-4">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
