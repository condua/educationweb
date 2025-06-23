import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

// Import tất cả dữ liệu đề thi
import examToan6 from "../../data/exam-toan6.json";
import examTiengAnh10 from "../../data/exam-tienganh10.json";
import examDanhGiaNangLuc from "../../data/exam-danhgianangluc.json";
import examToan12 from "../../data/exam-toan12.json";
import examTiengAnh12 from "../../data/exam-tienganh12.json";

// Gộp tất cả dữ liệu đề thi
const allExamData = [
  ...examToan6,
  ...examTiengAnh10,
  ...examDanhGiaNangLuc,
  ...examToan12,
  ...examTiengAnh12,
];

// Component ExamList đã được nâng cấp
const ExamList = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [allExams, setAllExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // --- CẢI TIẾN: TỰ ĐỘNG TẠO DANH MỤC TỪ DỮ LIỆU ---
  const dynamicCategories = useMemo(() => {
    // Lấy tất cả các giá trị 'grade' duy nhất từ dữ liệu
    const grades = [...new Set(allExams.map((exam) => exam.grade))];

    // Sắp xếp các lớp theo số thứ tự và các danh mục khác theo chữ cái
    grades.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)); // Trích xuất số từ chuỗi, ví dụ "Lớp 12" -> 12
      const numB = parseInt(b.match(/\d+/));

      if (numA && numB) return numA - numB; // Sắp xếp các lớp có số
      if (numA) return -1; // Ưu tiên các lớp có số lên trước
      if (numB) return 1; // Các mục không có số ra sau
      return a.localeCompare(b); // Sắp xếp các mục còn lại theo alphabet
    });

    // Thêm "Tất cả" vào đầu danh sách
    return ["Tất cả", ...grades];
  }, [allExams]);

  // --- EFFECTS ---
  useEffect(() => {
    setAllExams(allExamData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let results = allExams;

    // 1. Lọc theo danh mục (dựa vào tên danh mục được chọn)
    if (selectedCategory !== "Tất cả") {
      results = results.filter((exam) => exam.grade === selectedCategory);
    }

    // 2. Lọc theo từ khóa tìm kiếm (dựa vào tên đề thi)
    if (searchTerm) {
      results = results.filter((exam) =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExams(results);
  }, [searchTerm, selectedCategory, allExams]);

  // --- HÀM HỖ TRỢ ---
  const calculateTotalQuestions = (exam) => {
    return exam.questions.reduce((total, currentItem) => {
      if (
        currentItem.group_questions &&
        Array.isArray(currentItem.group_questions)
      ) {
        return total + currentItem.group_questions.length;
      }
      return total + 1;
    }, 0);
  };

  const handleStartExam = (examId) => {
    navigate(`/exams/do/${examId}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Danh Sách Đề Thi
      </h2>

      <div className="w-full max-w-4xl mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên đề thi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Render các nút danh mục được tạo tự động */}
        <div className="flex flex-wrap justify-center gap-2">
          {dynamicCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex-grow">
                {exam.title}
              </h3>
              <div className="border-t border-gray-100 my-3"></div>
              <p className="text-gray-600 text-sm">
                Môn:{" "}
                <span className="font-medium text-gray-800">
                  {exam.subject}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Khối:{" "}
                <span className="font-medium text-gray-800">{exam.grade}</span>
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Số câu hỏi:{" "}
                <span className="font-medium text-gray-800">
                  {calculateTotalQuestions(exam)}
                </span>
              </p>
              <button
                onClick={() => handleStartExam(exam.id)}
                className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md"
              >
                Bắt đầu
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-gray-500 text-xl">
              Không tìm thấy đề thi nào phù hợp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamList;
