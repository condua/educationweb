import React, { useState } from "react";
import coursesData from "../json/courses.json";
import phuc from "../../public/phuc.jpg";
const CourseCard = ({ course }) => (
  <div className="bg-white px-4 pt-4 pb-25 rounded-2xl shadow-md relative">
    <img
      src={course.image}
      alt={course.title}
      className="rounded-lg mb-2 w-full h-40 object-cover"
    />
    <h3 className="font-semibold text-lg">{course.title}</h3>
    <div className="absolute bottom-4 w-11/12 right-3">
      <div className="flex items-center mt-2">
        <img src={phuc} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
        <p className="text-sm text-gray-600">{course.instructor}</p>
      </div>
      <div className="mt-2">
        <div className="h-1 bg-gray-300 rounded-full">
          <div
            className="h-1 bg-blue-500 rounded-full"
            style={{ width: "60%" }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">Lesson 5 of 7</p>
      </div>
    </div>
  </div>
);

const CourseDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = coursesData.recent.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(coursesData.recent.length / coursesPerPage);

  return (
    <div className="p-8 bg-blue-50">
      <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-4">
        <h2 className="sm:text-2xl text-lg font-bold">
          Chào bạn trở lại, sẵn sàng học những bài học tiếp theo ?
        </h2>
        <a href="#" className="text-blue-500 font-medium">
          Khóa học của bạn
        </a>
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 overflow-x-auto justify-center">
        {currentCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
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
    </div>
  );
};

export default CourseDashboard;
