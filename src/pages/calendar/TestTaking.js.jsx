import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ALL_TESTS } from "../../json/allTests";

// Biểu tượng lá cờ (không đổi)
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

// --- COMPONENT HỘP ĐIỀU HƯỚNG CÂU HỎI (ĐÃ CẬP NHẬT) ---
const QuestionNavigation = ({
  questions,
  answers,
  flaggedQuestions,
  currentVisibleIndex,
  onNavigate,
  onSubmit,
}) => {
  return (
    // Div này giữ không gian trong layout flexbox trên desktop
    <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0">
      {/* Div này là phần tử được định vị fixed */}
      <div
        className="
          bg-white rounded-xl shadow-lg flex flex-col
          w-full lg:fixed lg:top-28 lg:w-[320px] xl:w-[350px]
          lg:max-h-[calc(100vh-8rem)] 
        "
      >
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-bold text-center">Danh sách câu hỏi</h3>
        </div>

        {/* Phần thân có thể cuộn */}
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2 mb-4">
            {questions.map((q, index) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];
              const isCurrent = index === currentVisibleIndex;

              let buttonClass = "border-gray-300 bg-gray-50 hover:bg-gray-100";
              if (isAnswered) {
                buttonClass = "border-green-400 bg-green-100 text-green-800";
              }
              if (isCurrent) {
                buttonClass =
                  "border-blue-500 bg-blue-500 text-white ring-2 ring-blue-300";
              }

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

        {/* Phần chân cố định */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onSubmit}
            className="w-full px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT TESTTAKING (KHÔNG THAY ĐỔI CẤU TRÚC) ---
const TestTaking = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = ALL_TESTS.find((t) => t.id == testId);
  const questionRefs = useRef({});

  const flatQuestions = useMemo(() => {
    const flatList = [];
    if (!test?.questionGroups) return [];
    test.questionGroups.forEach((group) => {
      group.group_questions.forEach((q) => {
        flatList.push({
          ...q,
          groupInfo: {
            type: group.type,
            id: group.id,
            instructions: group.instructions,
            title: group.title,
            passage: group.passage,
          },
        });
      });
    });
    return flatList;
  }, [test]);

  const totalQuestions = flatQuestions.length;
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState((test?.durationInMinutes || 0) * 60);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  // --- LOGIC VÀ HOOKS (KHÔNG ĐỔI) ---
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, test]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const questionId = entry.target.dataset.questionId;
            const index = flatQuestions.findIndex((q) => q.id === questionId);
            if (index > -1) {
              setCurrentVisibleIndex(index);
            }
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    Object.values(questionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(questionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [flatQuestions, questionRefs]);

  const handleSubmit = () => {
    const newAttemptId = `attempt-${Date.now()}`;
    navigate(`/test/${testId}/results/${newAttemptId}`, {
      state: { userAnswers: answers },
    });
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleToggleFlag = (questionId) => {
    setFlaggedQuestions((prev) => {
      const newFlags = { ...prev };
      if (newFlags[questionId]) {
        delete newFlags[questionId];
      } else {
        newFlags[questionId] = true;
      }
      return newFlags;
    });
  };

  const handleNavigateToQuestion = (questionId) => {
    const ref = questionRefs.current[questionId];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  if (!test) {
    /* ... giữ nguyên code xử lý lỗi ... */
  }
  if (totalQuestions === 0) {
    /* ... giữ nguyên code xử lý không có câu hỏi ... */
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // --- PHẦN JSX RENDER (KHÔNG ĐỔI) ---
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header cố định */}
      <div className="sticky top-0 z-20 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <h1 className="text-xl font-bold text-gray-800">{test.title}</h1>
            <div className="text-red-500 font-bold text-lg bg-red-50 px-4 py-2 rounded-lg">
              <span>Thời gian còn lại: </span>
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
                          <FlagIcon flagged={!!flaggedQuestions[question.id]} />
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
        />
      </div>
    </div>
  );
};

export default TestTaking;
