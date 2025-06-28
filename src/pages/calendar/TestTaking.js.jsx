import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// BƯỚC 1: IMPORT CÁC ACTION TỪ REDUX
import { fetchTestForTaking, clearCurrentTest } from "../../redux/testSlice";
import { submitTestAttempt } from "../../redux/testAttemptSlice";
import { ClockIcon } from "@heroicons/react/24/outline"; // <-- Thêm import icon này

// --- COMPONENT MỚI: MODAL CẢNH BÁO ---
const IncompleteWarningModal = ({ onClose, unansweredCount }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 animate-fade-in"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4 transform text-center transition-all duration-300 animate-scale-up">
        <div className="p-8">
          {/* Icon cảnh báo */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
              />
            </svg>
          </div>

          {/* Nội dung thông báo */}
          <h3
            className="mt-5 text-2xl font-bold leading-6 text-gray-800"
            id="modal-title"
          >
            Chưa hoàn thành bài thi
          </h3>
          <div className="mt-3">
            <p className="text-base text-gray-600">
              Bạn còn{" "}
              <span className="font-bold text-red-500">
                {unansweredCount} câu hỏi
              </span>{" "}
              chưa được trả lời.
              <br />
              Vui lòng hoàn thành tất cả trước khi nộp bài.
            </p>
          </div>
        </div>

        {/* Nút đóng */}
        <div className="bg-gray-50 px-8 py-4 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CÁC COMPONENT PHỤ (KHÔNG ĐỔI) ---
const FlagIcon = ({ flagged }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-5 h-5 transition-colors ${
      flagged ? "text-red-500" : "text-gray-400 hover:text-red-400"
    }`}
  >
    <path
      fillRule="evenodd"
      d="M3 3a.75.75 0 0 1 .75.75v.19l1.41-1.053a.75.75 0 0 1 .82 0l1.41 1.053V3.75A.75.75 0 0 1 8.25 3h12a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H9.31l-1.41 1.053a.75.75 0 0 1-.82 0L5.69 15H3.75A.75.75 0 0 1 3 14.25V3Z"
      clipRule="evenodd"
    />
  </svg>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-red-600">Lỗi</h1>
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  </div>
);

const QuestionNavigation = ({
  questions,
  answers,
  flaggedQuestions,
  currentVisibleIndex,
  onNavigate,
  onSubmit,
  isSubmitting,
}) => {
  // Component này gần như giữ nguyên, chỉ thêm prop 'isSubmitting'
  return (
    <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0">
      <div className="bg-white rounded-xl shadow-lg flex flex-col w-full lg:fixed lg:top-49 lg:w-[320px] xl:w-[350px] lg:max-h-[calc(100vh-8rem)]">
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-bold text-center">Danh sách câu hỏi</h3>
        </div>
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2 mb-4">
            {questions.map((q, index) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];
              const isCurrent = index === currentVisibleIndex;

              let buttonClass = "border-gray-300 bg-gray-50 hover:bg-gray-100";
              if (isAnswered)
                buttonClass = "border-green-400 bg-green-100 text-green-800";
              if (isCurrent)
                buttonClass =
                  "border-blue-500 bg-blue-500 text-white ring-2 ring-blue-300";

              return (
                <button
                  key={q.id}
                  onClick={() => onNavigate(q.id)}
                  className={`relative h-10 w-10 rounded-md border text-sm font-semibold transition-all flex items-center justify-center ${buttonClass}`}
                >
                  {index + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M3.082 1.114A.75.75 0 0 1 4 1.5V13a.5.5 0 0 0 .787.414L8 11.232l3.213 2.182a.5.5 0 0 0 .787-.414V1.5a.75.75 0 0 1 1.5 0V13a2 2 0 0 1-3.148 1.657L8 12.478l-2.852 1.936A2 2 0 0 1 2 13V1.5a.75.75 0 0 1 1.082-.663Z" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="text-xs space-y-2 text-gray-600">
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-green-100 border border-green-400 mr-2"></span>{" "}
              Đã trả lời
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-gray-50 border border-gray-300 mr-2"></span>{" "}
              Chưa trả lời
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-blue-500 border border-blue-500 mr-2"></span>{" "}
              Câu hiện tại
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 text-red-500 mr-2 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M3.082 1.114A.75.75 0 0 1 4 1.5V13a.5.5 0 0 0 .787.414L8 11.232l3.213 2.182a.5.5 0 0 0 .787-.414V1.5a.75.75 0 0 1 1.5 0V13a2 2 0 0 1-3.148 1.657L8 12.478l-2.852 1.936A2 2 0 0 1 2 13V1.5a.75.75 0 0 1 1.082-.663Z" />
                </svg>
              </span>{" "}
              Đã đánh dấu
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang nộp bài..." : "Nộp bài"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TestTaking = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { startedAt } = location.state || {};

  const questionRefs = useRef({});

  const {
    currentTest: test,
    status: testStatus,
    error: testError,
  } = useSelector((state) => state.tests);
  const { status: attemptStatus, currentAttemptResult } = useSelector(
    (state) => state.testAttempts
  );

  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  // THAY ĐỔI: Thêm state để quản lý modal cảnh báo
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);

  const courseId = useParams().courseId; // Lấy courseId từ params
  useEffect(() => {
    if (!startedAt) {
      alert(
        "Vui lòng bắt đầu bài kiểm tra từ trang tổng quan để tính thời gian chính xác."
      );
      navigate(`/test/${testId}`);
    }
  }, [startedAt, testId, navigate]);

  useEffect(() => {
    if (testId) {
      dispatch(fetchTestForTaking(testId));
    }
    return () => {
      dispatch(clearCurrentTest());
    };
  }, [dispatch, testId]);

  useEffect(() => {
    if (test && timeLeft === null) {
      setTimeLeft(test.durationInMinutes * 60);
    }
  }, [test, timeLeft]);

  // Chuẩn hóa danh sách câu hỏi (giữ nguyên)
  const flatQuestions = useMemo(() => {
    if (!test?.questionGroups) return [];
    return test.questionGroups.flatMap((group) =>
      group.group_questions.map((q) => ({
        ...q,
        groupInfo: {
          type: group.type,
          id: group.id,
          instructions: group.instructions,
          title: group.title,
          passage: group.passage,
        },
      }))
    );
  }, [test]);

  // THAY ĐỔI: Cập nhật hàm nộp bài
  const handleSubmit = useCallback(() => {
    // THAY ĐỔI: Kiểm tra trước khi nộp bài
    if (Object.keys(answers).length < flatQuestions.length) {
      setShowIncompleteWarning(true); // Hiển thị modal cảnh báo
      return; // Dừng hàm tại đây
    }

    if (attemptStatus === "submitting" || !startedAt) return;

    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId,
      selectedAnswer: answers[questionId],
    }));

    dispatch(
      submitTestAttempt({
        testId,
        userAnswers: formattedAnswers,
        startedAt: startedAt,
      })
    );
  }, [dispatch, testId, answers, attemptStatus, startedAt, flatQuestions]); // THAY ĐỔI: Thêm flatQuestions vào dependencies

  // Logic đếm ngược và tự nộp bài (sử dụng handleSubmit đã được cập nhật)
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
    if (timeLeft === null || timeLeft < 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]); // Thêm handleSubmit vào dependencies

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const qId = entry.target.dataset.questionId;
            const index = flatQuestions.findIndex((q) => q.id === qId);
            if (index > -1) setCurrentVisibleIndex(index);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    Object.values(questionRefs.current).forEach(
      (ref) => ref && observer.observe(ref)
    );
    return () => observer.disconnect();
  }, [flatQuestions]);

  useEffect(() => {
    if (attemptStatus === "succeeded" && currentAttemptResult?._id) {
      navigate(
        `/course/${courseId}/test/${testId}/results/${currentAttemptResult._id}`
      );
    }
  }, [attemptStatus, currentAttemptResult, navigate, testId]);

  const handleSelectOption = (questionId, optionIndex) =>
    setAnswers({ ...answers, [questionId]: optionIndex });
  const handleToggleFlag = (questionId) =>
    setFlaggedQuestions((prev) => {
      const newFlags = { ...prev };
      if (newFlags[questionId]) delete newFlags[questionId];
      else newFlags[questionId] = true;
      return newFlags;
    });
  const handleNavigateToQuestion = (questionId) => {
    const ref = questionRefs.current[questionId];
    if (ref) ref.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (testStatus === "loading") return <LoadingSpinner />;
  if (testStatus === "failed")
    return (
      <ErrorDisplay
        message={testError?.message || "Không thể tải bài kiểm tra."}
      />
    );
  if (!test || flatQuestions.length === 0)
    return (
      <ErrorDisplay message="Bài kiểm tra này không có câu hỏi hoặc không tồn tại." />
    );
  if (timeLeft === null) return <LoadingSpinner />;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    // THAY ĐỔI: Thêm modal vào cuối JSX
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Header cố định */}

        <div className="sticky md:top-24 top-19 z-20  bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Sử dụng gap để tạo khoảng cách và căn giữa các item */}
            <div className="flex justify-between items-center py-3 gap-4">
              {/* 1. Tinh chỉnh Tiêu đề: nhỏ hơn và tự động cắt ngắn trên mobile */}
              <h1 className="text-base sm:text-xl font-bold text-gray-800 truncate">
                {test.title}
              </h1>

              {/* 2. Tối ưu Đồng hồ: dùng icon trên mobile, chữ trên desktop */}
              <div className="flex-shrink-0 flex items-center text-red-500 font-bold text-sm sm:text-lg bg-red-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg">
                {/* Icon chỉ hiển thị trên mobile */}
                <ClockIcon className="h-5 w-5 mr-1.5" />

                {/* Chữ "Thời gian còn lại" chỉ hiển thị trên desktop */}
                <span className="hidden sm:inline">Thời gian còn lại: </span>

                <span>
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8 items-start">
          {/* Cột trái: Nội dung câu hỏi */}
          <div className="w-full lg:flex-grow space-y-8">
            {test.questionGroups.map((group, groupIndex) => (
              <div
                key={group.id || groupIndex}
                className="bg-white rounded-xl shadow-lg"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800">
                    {group.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 italic">
                    {group.instructions}
                  </p>
                  {group.passage && (
                    <div
                      className="prose prose-sm max-w-none mt-4 text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: group.passage.replace(/\n/g, "<br />"),
                      }}
                    />
                  )}
                </div>
                <div className="divide-y">
                  {group.group_questions.map((question) => {
                    const questionIndex = flatQuestions.findIndex(
                      (q) => q.id === question.id
                    );
                    return (
                      <div
                        key={question.id}
                        ref={(el) => (questionRefs.current[question.id] = el)}
                        data-question-id={question.id}
                        className="p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-lg font-semibold text-gray-800">
                            <span className="text-blue-600">
                              Câu {questionIndex + 1}:{" "}
                            </span>
                            {Array.isArray(question.question) ? (
                              question.question.map((line, i) => (
                                <p key={i}>{line}</p>
                              ))
                            ) : (
                              <p>{question.question}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleToggleFlag(question.id)}
                            title="Đánh dấu câu hỏi"
                          >
                            <FlagIcon
                              flagged={!!flaggedQuestions[question.id]}
                            />
                          </button>
                        </div>
                        <div className="space-y-3">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleSelectOption(question.id, index)
                              }
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center ${
                                answers[question.id] === index
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-blue-400"
                              }`}
                            >
                              <span className="font-medium text-gray-700">
                                {option}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {/* Cột phải: Hộp điều hướng */}
          <QuestionNavigation
            questions={flatQuestions}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            currentVisibleIndex={currentVisibleIndex}
            onNavigate={handleNavigateToQuestion}
            onSubmit={handleSubmit}
            isSubmitting={attemptStatus === "submitting"}
          />
        </div>
      </div>

      {/* THAY ĐỔI: Render Modal nếu state là true */}
      {showIncompleteWarning && (
        <IncompleteWarningModal
          onClose={() => setShowIncompleteWarning(false)}
          unansweredCount={flatQuestions.length - Object.keys(answers).length}
        />
      )}
    </>
  );
};

export default TestTaking;
