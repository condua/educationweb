import React from "react";

// Icon cờ (sử dụng SVG)
const FlagIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
      clipRule="evenodd"
    />
  </svg>
);

const QuestionNavigator = ({
  questions,
  currentIndex,
  userAnswers,
  flaggedQuestions,
  onJumpToQuestion,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Danh sách câu hỏi
      </h3>
      {/* Lưới các câu hỏi, tự động điều chỉnh số cột */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-5 gap-2">
        {questions.map((q, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = userAnswers[q.id] !== undefined;
          const isFlagged = flaggedQuestions[q.id];

          // Xác định style cho từng nút
          let buttonClass =
            "w-full h-10 flex items-center justify-center rounded-md border-2 font-bold transition-all duration-200 relative";
          if (isCurrent) {
            buttonClass +=
              " bg-blue-500 border-blue-700 text-white ring-4 ring-blue-300";
          } else if (isAnswered) {
            buttonClass +=
              " bg-green-200 border-green-400 text-green-800 hover:bg-green-300";
          } else {
            buttonClass +=
              " bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200";
          }

          return (
            <button
              key={q.id}
              onClick={() => onJumpToQuestion(index)}
              className={buttonClass}
              aria-label={`Câu ${index + 1}`}
            >
              {index + 1}
              {isFlagged && (
                <FlagIcon className="w-4 h-4 text-red-500 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4" />
              )}
            </button>
          );
        })}
      </div>
      {/* Chú thích */}
      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-200 border-2 border-green-400 mr-2"></div>{" "}
          Đã trả lời
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-gray-100 border-2 border-gray-300 mr-2"></div>{" "}
          Chưa trả lời
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-700 mr-2"></div>{" "}
          Câu hiện tại
        </div>
        <div className="flex items-center">
          <FlagIcon className="w-4 h-4 text-red-500 mr-2" /> Đã đánh dấu
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;
