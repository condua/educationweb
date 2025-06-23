import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage"; // Chúng ta sẽ tạo hook này ở bước tiếp theo

// Dữ liệu tĩnh có thể được import trực tiếp vào hook
import examToan6 from "../data/exam-toan6.json";
import examTiengAnh10 from "../data/exam-tienganh10.json";
import examDanhGiaNangLuc from "../data/exam-danhgianangluc.json";
import examToan12 from "../data/exam-toan12.json";

const allExamData = [
  ...examToan6,
  ...examTiengAnh10,
  ...examDanhGiaNangLuc,
  ...examToan12,
];

/**
 * Một custom hook để quản lý toàn bộ logic của một bài thi.
 * @param {string} examId - ID của bài thi cần xử lý.
 */
export const useExam = (examId) => {
  const navigate = useNavigate();

  const [currentExam, setCurrentExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Sử dụng custom hook để tự động đồng bộ với Local Storage
  const [userAnswers, setUserAnswers] = useLocalStorage(
    `answers_${examId}`,
    {}
  );
  const [flaggedQuestions, setFlaggedQuestions] = useLocalStorage(
    `flags_${examId}`,
    {}
  );

  // Tải dữ liệu bài thi khi component được mount hoặc examId thay đổi
  useEffect(() => {
    const exam = allExamData.find((e) => e.id === examId);
    if (exam) {
      setCurrentExam(exam);
    } else {
      navigate("/exams"); // Nếu không tìm thấy, điều hướng đi
    }
    setLoading(false);
  }, [examId, navigate]);

  // Các giá trị được tính toán, chỉ tính lại khi cần thiết với useMemo
  const currentQuestion = useMemo(
    () => currentExam?.questions[currentQuestionIndex],
    [currentExam, currentQuestionIndex]
  );

  const totalQuestions = useMemo(
    () => currentExam?.questions.length || 0,
    [currentExam]
  );

  const isLastQuestion = useMemo(
    () => currentQuestionIndex === totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );

  // Các hàm xử lý được bọc trong useCallback để tránh re-render không cần thiết
  const handleOptionSelect = useCallback(
    (optionIndex) => {
      if (!currentQuestion) return;
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionIndex,
      }));
    },
    [currentQuestion, setUserAnswers]
  );

  const toggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  }, [currentQuestion, setFlaggedQuestions]);

  const jumpToQuestion = useCallback(
    (index) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentQuestionIndex(index);
      }
    },
    [totalQuestions]
  );

  const goToPreviousQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const submitExam = useCallback(() => {
    if (!currentExam) return;
    const correctCount = currentExam.questions.reduce((count, q) => {
      return userAnswers[q.id] === q.correctAnswerIndex ? count + 1 : count;
    }, 0);

    // Xóa tiến trình đã lưu
    localStorage.removeItem(`answers_${examId}`);
    localStorage.removeItem(`flags_${examId}`);

    navigate(`/exams/result/${examId}`, {
      state: { userAnswers, score: correctCount, totalQuestions },
    });
  }, [currentExam, userAnswers, examId, navigate, totalQuestions]);

  const goToNextQuestion = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
    } else {
      submitExam();
    }
  }, [isLastQuestion, totalQuestions, submitExam]);

  // Trả về tất cả state và hàm cần thiết cho UI
  return {
    loading,
    currentExam,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isLastQuestion,
    userAnswers,
    flaggedQuestions,
    actions: {
      handleOptionSelect,
      toggleFlag,
      jumpToQuestion,
      goToPreviousQuestion,
      goToNextQuestion,
    },
  };
};
