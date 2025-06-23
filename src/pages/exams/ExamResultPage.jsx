import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ExamResult from "../../components/ExamResult";

// Import all mock exam data
import examToan6 from "../../data/exam-toan6.json";
import examTiengAnh10 from "../../data/exam-tienganh10.json";
import examDanhGiaNangLuc from "../../data/exam-danhgianangluc.json";
import examToan12 from "../../data/exam-toan12.json";

// Combine all exam data for easy access
const allExamData = [
  ...examToan6,
  ...examTiengAnh10,
  ...examDanhGiaNangLuc,
  ...examToan12,
];

const ExamResultPage = () => {
  const { examId } = useParams();
  const location = useLocation(); // To get state passed from navigate
  const navigate = useNavigate();

  const [currentExam, setCurrentExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResult = () => {
      const exam = allExamData.find((e) => e.id === examId);
      if (exam) {
        setCurrentExam(exam);
        // Get user answers and score from navigation state if available
        if (
          location.state &&
          location.state.userAnswers &&
          location.state.score !== undefined
        ) {
          setUserAnswers(location.state.userAnswers);
          setScore(location.state.score);
        } else {
          // If state is not available (e.g., direct access), try to recalculate or default
          // For a real app, you'd fetch results from backend or store them more persistently
          let correctCount = 0;
          const defaultUserAnswers = {};
          exam.questions.forEach((q) => {
            // Mock: if no state, assume no answers or incorrect
            defaultUserAnswers[q.id] = -1; // Default to not answered or incorrect
          });
          setUserAnswers(defaultUserAnswers);
          setScore(correctCount);
          console.warn(
            "User answers or score not found in navigation state. Displaying default/recalculated results."
          );
        }
        setLoading(false);
      } else {
        navigate("/exams"); // Redirect if exam not found
      }
    };
    loadResult();
  }, [examId, location.state, navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  if (!currentExam) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">Không tìm thấy kết quả bài thi.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex flex-col items-center justify-center">
      <ExamResult exam={currentExam} userAnswers={userAnswers} score={score} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <button
          onClick={() => navigate("/exams")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Chọn Bài Thi Khác
        </button>
        <button
          onClick={() => navigate(`/exams/do/${examId}`)} // Retake the same exam
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Làm Lại Bài Thi Này
        </button>
      </div>
    </div>
  );
};

export default ExamResultPage;
