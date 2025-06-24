import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ExamResult from "../../components/ExamResult"; // Giả sử component này được thiết kế để nhận props mới

// --- Dữ liệu tĩnh ---
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

// --- Các Component con cho UI ---

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
    <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <p className="text-xl text-red-600">{message}</p>
  </div>
);

// --- Component chính: ExamResultPage (phiên bản nâng cấp) ---

const ExamResultPage = () => {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // --- State ---
  const [currentExam, setCurrentExam] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu kết quả từ state của navigate
  const resultState = location.state;

  // --- Dữ liệu được tính toán ---

  // CẬP NHẬT: Logic làm phẳng câu hỏi, đồng bộ với component ExamDo
  const allQuestionsFlat = useMemo(() => {
    if (!currentExam) return [];
    const flatList = [];
    currentExam.questions.forEach((item) => {
      if (
        item.type === "passage_group" ||
        item.type === "rearrangement_group"
      ) {
        flatList.push(...item.group_questions);
      } else {
        flatList.push(item);
      }
    });
    return flatList;
  }, [currentExam]);

  // --- Effects ---
  useEffect(() => {
    // Tìm bài thi dựa trên ID
    const exam = allExamData.find((e) => e.id === examId);

    if (exam) {
      setCurrentExam(exam);
    } else {
      // Nếu không tìm thấy bài thi, điều hướng về trang danh sách
      navigate("/exams");
      return; // Dừng effect
    }

    // CẬP NHẬT: Logic xử lý kết quả rõ ràng hơn
    // Nếu không có state từ trang trước (ví dụ: người dùng truy cập trực tiếp URL),
    // không có kết quả để hiển thị, nên điều hướng đi.
    if (
      !resultState ||
      resultState.userAnswers === undefined ||
      resultState.score === undefined
    ) {
      console.warn("Result data not found in location state. Redirecting...");
      // Bạn có thể hiển thị một thông báo ngắn trước khi điều hướng
      navigate(`/exams/do/${examId}`); // Gợi ý làm lại bài thi
      return; // Dừng effect
    }

    setLoading(false);
  }, [examId, navigate, resultState]);

  // --- Render ---

  if (loading) {
    return <LoadingSpinner />;
  }

  // Nếu không có bài thi hoặc không có kết quả, hiển thị lỗi
  if (!currentExam || !resultState) {
    return <ErrorDisplay message="Không tìm thấy kết quả bài thi." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex flex-col items-center justify-center">
      {/* CẬP NHẬT: Truyền props một cách rõ ràng và nhất quán.
        Component ExamResult giờ đây sẽ nhận mảng câu hỏi đã được làm phẳng.
      */}
      <ExamResult
        examTitle={currentExam.title}
        examSubject={currentExam.subject}
        allQuestions={allQuestionsFlat} // Truyền mảng câu hỏi phẳng
        userAnswers={resultState.userAnswers}
        score={resultState.score}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <button
          onClick={() => navigate("/exams")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Chọn Bài Thi Khác
        </button>
        <button
          onClick={() => navigate(`/exams/do/${examId}`)} // Làm lại bài thi
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Làm Lại Bài Thi Này
        </button>
      </div>
    </div>
  );
};

export default ExamResultPage;
