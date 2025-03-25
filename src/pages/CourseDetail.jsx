import { useState } from "react";
import { useParams } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react"; // Thêm icon menu, đóng, và mở rộng
import coursesData from "../json/listCourses.json";

const CourseDetail = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c._id === id);
  const [openChapters, setOpenChapters] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Mở sidebar mặc định trên desktop

  if (!course) return <div className="p-10">Khóa học không tồn tại</div>;

  const toggleChapter = (index) => {
    setOpenChapters((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setIsSidebarOpen(false); // Đóng sidebar khi chọn bài trên mobile
  };

  return (
    <div className="flex h-screen">
      {/* Nút toggle sidebar trên desktop */}
      <button
        className="hidden md:block absolute left-2 top-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-100 p-4 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-1/4 z-50 shadow-lg md:shadow-none`}
      >
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">{course.title}</h2>
        {course.chapters.map((chapter, chIndex) => (
          <div key={chIndex} className="mb-2">
            <button
              className="w-full text-left font-semibold flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
              onClick={() => toggleChapter(chIndex)}
            >
              <ChevronRight
                size={18}
                className={`transition-transform ${
                  openChapters[chIndex] ? "rotate-90" : ""
                }`}
              />
              <span className="ml-2">{chapter.title}</span>
            </button>
            {openChapters[chIndex] && (
              <div className="ml-4 mt-2">
                {chapter.lessons.map((lesson, lIndex) => (
                  <button
                    key={lIndex}
                    className={`block w-full text-left p-2 rounded-md ${
                      selectedLesson?._id === lesson._id
                        ? "bg-blue-200 font-semibold"
                        : "hover:bg-gray-300"
                    }`}
                    onClick={() => handleLessonSelect(lesson)}
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Nút mở sidebar trên mobile */}
        <button
          className="md:hidden mb-4 bg-gray-200 p-2 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        {selectedLesson ? (
          <>
            <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
            <iframe
              className="w-full h-64 md:h-96 mt-4 rounded-lg shadow-md"
              src={selectedLesson.youtubeUrl}
              title={selectedLesson.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="mt-4 space-y-2">
              <a
                href={selectedLesson.pdfUrl}
                className="text-blue-500 underline flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Tải bài giảng PDF
              </a>
              <a
                href={selectedLesson.exercisePdfUrl}
                className="text-blue-500 underline flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                📝 Tải bài tập PDF
              </a>
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            Chọn một bài giảng từ danh sách bên trái.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
