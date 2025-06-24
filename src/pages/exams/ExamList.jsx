import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

// Import dữ liệu
import examToan6 from "../../data/exam-toan6.json";
import examTiengAnh10 from "../../data/exam-tienganh10.json";
import examDanhGiaNangLuc from "../../data/exam-danhgianangluc.json";
import examToan12 from "../../data/exam-toan12.json";
import examTiengAnh12 from "../../data/exam-tienganh12.json";

const allExamData = [
  ...examToan6,
  ...examTiengAnh10,
  ...examDanhGiaNangLuc,
  ...examToan12,
  ...examTiengAnh12,
];

const removeAccents = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
};

const ExamList = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [allExams, setAllExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  // State cho gợi ý tìm kiếm
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dynamicCategories = useMemo(() => {
    const grades = [...new Set(allExams.map((exam) => exam.grade))];
    grades.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/));
      const numB = parseInt(b.match(/\d+/));
      if (numA && numB) return numA - numB;
      if (numA) return -1;
      if (numB) return 1;
      return a.localeCompare(b);
    });
    return ["Tất cả", ...grades];
  }, [allExams]);

  // --- EFFECTS ---
  useEffect(() => {
    setAllExams(allExamData);
    setLoading(false);
  }, []);

  // Effect tạo gợi ý khi gõ tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const normalizedSearchTerm = removeAccents(searchTerm);
    const matchingExams = allExams
      .filter((exam) =>
        removeAccents(exam.title).includes(normalizedSearchTerm)
      )
      .slice(0, 5); // Giới hạn 5 gợi ý

    setSuggestions(matchingExams);
    setShowSuggestions(matchingExams.length > 0);
  }, [searchTerm, allExams]);

  // Effect lọc kết quả chính để hiển thị
  useEffect(() => {
    let results = allExams;
    if (selectedCategory !== "Tất cả") {
      results = results.filter((exam) => exam.grade === selectedCategory);
    }
    if (searchTerm) {
      const normalizedSearchTerm = removeAccents(searchTerm);
      results = results.filter((exam) =>
        removeAccents(exam.title).includes(normalizedSearchTerm)
      );
    }
    setFilteredExams(results);
  }, [searchTerm, selectedCategory, allExams]);

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
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
              <ul className="divide-y divide-gray-100">
                {suggestions.map((exam) => (
                  <li
                    key={exam.id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm"
                    onMouseDown={() => {
                      setSearchTerm(exam.title);
                      setShowSuggestions(false);
                    }}
                  >
                    {exam.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {dynamicCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowSuggestions(false); // Ẩn gợi ý khi chọn category
              }}
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
              className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 flex flex-col"
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
