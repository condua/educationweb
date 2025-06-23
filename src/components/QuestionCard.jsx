import React from "react";

// Icon cờ (giữ nguyên)
const FlagIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
    />
  </svg>
);

const QuestionCard = ({
  question,
  currentAnswer,
  onSelectOption,
  questionNumber,
  totalQuestions,
  isFlagged,
  onToggleFlag,
}) => {
  if (!question) return null;

  const getOptionLabel = (index) => String.fromCharCode(65 + index);

  // Hàm render nội dung câu hỏi
  const renderQuestionText = () => {
    // Nếu question.question là một mảng, map qua từng dòng
    if (Array.isArray(question.question)) {
      return question.question.map((line, index) => (
        <p key={index} className="mb-1">
          {" "}
          {/* Thêm mb-1 nếu muốn có khoảng cách nhỏ giữa các dòng */}
          {line || <>&nbsp;</>} {/* Hiển thị dòng trống nếu có */}
        </p>
      ));
    }
    // Nếu là chuỗi, hiển thị trực tiếp
    return <p>{question.question}</p>;
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full transition-all duration-300">
      {/* Header của Card */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Câu hỏi {questionNumber} / {totalQuestions}
          </p>
          {/* ---- THAY ĐỔI Ở ĐÂY ---- */}
          <div className="text-xl md:text-2xl font-bold text-gray-800 mt-2">
            {renderQuestionText()}
          </div>
        </div>
        <button
          onClick={onToggleFlag}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isFlagged
              ? "bg-red-100 text-red-500"
              : "bg-gray-100 hover:bg-gray-200 text-gray-500"
          }`}
          aria-label={
            isFlagged ? "Bỏ đánh dấu câu hỏi" : "Đánh dấu câu hỏi này"
          }
        >
          <FlagIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Danh sách lựa chọn (giữ nguyên) */}
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = currentAnswer === index;
          return (
            <button
              key={index}
              onClick={() => onSelectOption(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out flex items-center text-base md:text-lg
                ${
                  isSelected
                    ? "bg-blue-500 border-blue-600 text-white font-semibold shadow-md"
                    : "bg-gray-50 hover:bg-indigo-100 hover:border-indigo-400 border-gray-200 text-gray-700"
                }
              `}
            >
              <span
                className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-4 font-bold ${
                  isSelected
                    ? "bg-white text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {getOptionLabel(index)}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
