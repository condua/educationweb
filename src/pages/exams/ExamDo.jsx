import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import QuestionNavigator from "../../components/QuestionNavigator";

// --- Dữ liệu tĩnh ---
// Cập nhật để import tất cả các tệp JSON cần thiết
import examToan6 from "../../data/exam-toan6.json";
import examTiengAnh10 from "../../data/exam-tienganh10.json";
import examDanhGiaNangLuc from "../../data/exam-danhgianangluc.json";
import examToan12 from "../../data/exam-toan12.json";
import examTiengAnh12 from "../../data/exam-tienganh12.json";
// Giả sử tệp JSON đầy đủ nhất của bạn có tên là 'exam-tienganh12-full.json'

const allExamData = [
  ...examToan6,
  ...examTiengAnh10,
  ...examDanhGiaNangLuc,
  ...examToan12,
  ...examTiengAnh12,
];

// --- Các Component con cho UI ---

const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-blue-600"></div>
  </div>
);

const ExamHeader = React.memo(({ title, subject, grade }) => (
  <header className="mb-8 text-center">
    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{title}</h1>
    <p className="text-md text-gray-500">
      {subject} - {grade}
    </p>
  </header>
));

// --- Component chính: ExamDo (phiên bản nâng cấp) ---

const ExamDo = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  // --- State ---
  const [currentExam, setCurrentExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [loading, setLoading] = useState(true);

  // --- Dữ liệu được tính toán ---

  // CẬP NHẬT: Mảng phẳng giờ đây nhận diện cả 'passage_group' và 'rearrangement_group'
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
    const exam = allExamData.find((e) => e.id === examId);
    if (exam) {
      setCurrentExam(exam);
      const savedAnswers =
        JSON.parse(localStorage.getItem(`answers_${examId}`)) || {};
      const savedFlags =
        JSON.parse(localStorage.getItem(`flags_${examId}`)) || {};
      setUserAnswers(savedAnswers);
      setFlaggedQuestions(savedFlags);
    } else {
      navigate("/exams");
    }
    setLoading(false);
  }, [examId, navigate]);

  useEffect(() => {
    if (!loading && currentExam) {
      localStorage.setItem(`answers_${examId}`, JSON.stringify(userAnswers));
      localStorage.setItem(`flags_${examId}`, JSON.stringify(flaggedQuestions));
    }
  }, [userAnswers, flaggedQuestions, examId, currentExam, loading]);

  // --- Memoized Callbacks ---

  const handleOptionSelect = useCallback((questionId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }, []);

  const toggleFlag = useCallback((questionId) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  }, []);

  const jumpToQuestion = useCallback(
    (index) => {
      const questionId = allQuestionsFlat[index]?.id;
      if (!questionId) return;

      const element = document.getElementById(`question-card-${questionId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("flash-effect");
        setTimeout(() => element.classList.remove("flash-effect"), 1000);
      }
    },
    [allQuestionsFlat]
  );

  const submitExam = useCallback(() => {
    if (!currentExam || !window.confirm("Bạn có chắc chắn muốn nộp bài không?"))
      return;

    const correctCount = allQuestionsFlat.reduce(
      (count, q) =>
        userAnswers[q.id] === q.correctAnswerIndex ? count + 1 : count,
      0
    );

    localStorage.removeItem(`answers_${examId}`);
    localStorage.removeItem(`flags_${examId}`);

    navigate(`/exams/result/${examId}`, {
      state: {
        userAnswers,
        score: correctCount,
        totalQuestions: allQuestionsFlat.length,
      },
    });
  }, [currentExam, userAnswers, examId, navigate, allQuestionsFlat]);

  // --- Render ---

  if (loading) return <LoadingSpinner />;
  if (!currentExam)
    return (
      <div className="p-8 text-center text-xl text-red-600">
        Không tìm thấy bài thi.
      </div>
    );

  let questionCounter = 0;

  return (
    <>
      <style>{`
        .flash-effect {
          animation: flash-animation 1s ease;
        }
        @keyframes flash-animation {
          0% { box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0px rgba(59, 130, 246, 0); }
        }
        .passage-content {
          white-space: pre-wrap;
          line-height: 1.7;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50/50 p-4 font-sans md:p-8">
        <div className="container mx-auto">
          <ExamHeader
            title={currentExam.title}
            subject={currentExam.subject}
            grade={currentExam.grade}
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* CỘT TRÁI: Logic render đã được cập nhật */}
            <main className="flex w-full flex-col lg:w-2/3">
              <div className="space-y-12">
                {currentExam.questions.map((item) => {
                  // XỬ LÝ 'passage_group'
                  if (item.type === "passage_group") {
                    return (
                      <div key={item.id} id={`passage-card-${item.id}`}>
                        <div className="rounded-t-lg bg-white p-6 shadow-md">
                          {item.title && (
                            <h3 className="text-xl font-bold text-gray-800">
                              {item.title}
                            </h3>
                          )}
                          <p className="mt-2 text-sm text-gray-600 italic">
                            {item.instructions}
                          </p>
                          <div className="passage-content mt-4 border-l-4 border-gray-200 pl-4 text-gray-700">
                            {item.passage}
                          </div>
                        </div>
                        <div className="space-y-1 rounded-b-lg bg-gray-50 pb-4 shadow-md">
                          {item.group_questions.map((subQuestion) => {
                            questionCounter++;
                            return (
                              <div
                                key={subQuestion.id}
                                id={`question-card-${subQuestion.id}`}
                                className="px-2 pt-6 md:px-6"
                              >
                                <QuestionCard
                                  question={subQuestion}
                                  questionNumber={questionCounter}
                                  totalQuestions={allQuestionsFlat.length}
                                  currentAnswer={userAnswers[subQuestion.id]}
                                  onSelectOption={(optionIndex) =>
                                    handleOptionSelect(
                                      subQuestion.id,
                                      optionIndex
                                    )
                                  }
                                  isFlagged={!!flaggedQuestions[subQuestion.id]}
                                  onToggleFlag={() =>
                                    toggleFlag(subQuestion.id)
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // CẬP NHẬT: XỬ LÝ 'rearrangement_group'
                  else if (item.type === "rearrangement_group") {
                    return (
                      <div key={item.id} id={`rearrangement-card-${item.id}`}>
                        <div className="rounded-t-lg bg-white p-6 shadow-md">
                          <p className="text-sm text-gray-600 italic">
                            {item.instructions}
                          </p>
                        </div>
                        <div className="space-y-1 rounded-b-lg bg-gray-50 pb-4 shadow-md">
                          {item.group_questions.map((subQuestion) => {
                            questionCounter++;
                            return (
                              <div
                                key={subQuestion.id}
                                id={`question-card-${subQuestion.id}`}
                                className="px-2 pt-6 md:px-6"
                              >
                                <QuestionCard
                                  question={subQuestion}
                                  questionNumber={questionCounter}
                                  totalQuestions={allQuestionsFlat.length}
                                  currentAnswer={userAnswers[subQuestion.id]}
                                  onSelectOption={(optionIndex) =>
                                    handleOptionSelect(
                                      subQuestion.id,
                                      optionIndex
                                    )
                                  }
                                  isFlagged={!!flaggedQuestions[subQuestion.id]}
                                  onToggleFlag={() =>
                                    toggleFlag(subQuestion.id)
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // XỬ LÝ CÂU HỎI ĐƠN LẺ (NẾU CÓ)
                  questionCounter++;
                  return (
                    <div
                      key={item.id}
                      id={`question-card-${item.id}`}
                      className="rounded-lg"
                    >
                      <QuestionCard
                        question={item}
                        questionNumber={questionCounter}
                        totalQuestions={allQuestionsFlat.length}
                        currentAnswer={userAnswers[item.id]}
                        onSelectOption={(optionIndex) =>
                          handleOptionSelect(item.id, optionIndex)
                        }
                        isFlagged={!!flaggedQuestions[item.id]}
                        onToggleFlag={() => toggleFlag(item.id)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Nút nộp bài */}
              <div className="mt-12 flex w-full items-center justify-center">
                <button
                  onClick={submitExam}
                  className="transform rounded-lg bg-green-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-green-700"
                >
                  Hoàn thành và Nộp bài
                </button>
              </div>
            </main>

            {/* CỘT PHẢI: Thanh điều hướng (sử dụng mảng phẳng) */}
            <aside className="hidden lg:sticky lg:top-8 lg:block lg:w-1/3">
              <QuestionNavigator
                questions={allQuestionsFlat}
                userAnswers={userAnswers}
                flaggedQuestions={flaggedQuestions}
                onJumpToQuestion={jumpToQuestion}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamDo;
