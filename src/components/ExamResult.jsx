import React from "react";

// Component con để hiển thị chi tiết từng câu, giúp code sạch hơn
const ResultDetailItem = ({ question, index, userAnswerIndex }) => {
  const isCorrect = userAnswerIndex === question.correctAnswerIndex;

  const userAnswerText =
    userAnswerIndex !== undefined && userAnswerIndex !== -1
      ? question.options[userAnswerIndex]
      : "Chưa trả lời";

  return (
    <li
      className="p-4 border-l-4 rounded-r-lg shadow-sm bg-gray-50/50"
      style={{ borderColor: isCorrect ? "#22c55e" : "#ef4444" }}
    >
      {/* <<< PHẦN CẬP NHẬT CHÍNH BẮT ĐẦU TỪ ĐÂY >>> */}
      <div className="font-semibold text-gray-900 mb-2">
        <span className="mr-2">Câu {index + 1}:</span>

        {/* KIỂM TRA XEM QUESTION LÀ MẢNG HAY CHUỖI */}
        {Array.isArray(question.question) ? (
          // Nếu là một mảng, map qua và hiển thị mỗi dòng trong một thẻ <p>
          <div className="mt-1 font-normal">
            {question.question.map((line, lineIndex) => (
              <p key={lineIndex} className="ml-2">
                {line}
              </p>
            ))}
          </div>
        ) : (
          // Nếu là một chuỗi, hiển thị như bình thường
          <span className="font-normal">{question.question}</span>
        )}
      </div>
      {/* <<< KẾT THÚC PHẦN CẬP NHẬT >>> */}

      {/* Đáp án của bạn */}
      <p className="text-sm text-gray-700">
        Đáp án của bạn:{" "}
        <span
          className={`font-semibold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {userAnswerText}
        </span>
      </p>

      {/* Chỉ hiển thị đáp án đúng nếu trả lời sai */}
      {!isCorrect && (
        <p className="text-sm text-gray-700">
          Đáp án đúng:{" "}
          <span className="font-semibold text-blue-600">
            {question.options[question.correctAnswerIndex]}
          </span>
        </p>
      )}

      {/* Hiển thị giải thích nếu có */}
      {question.explanation && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p>
            <span className="font-bold">Giải thích:</span>{" "}
            {question.explanation}
          </p>
        </div>
      )}
    </li>
  );
};

const ExamResult = ({
  examTitle,
  examSubject,
  allQuestions,
  userAnswers,
  score,
}) => {
  const totalQuestions = allQuestions.length;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const passed = percentage >= 50;

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl w-full">
      {/* PHẦN TÓM TẮT KẾT QUẢ */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Kết Quả Bài Thi
        </h2>
        <p className="text-lg font-semibold text-indigo-700 mb-4">
          {examTitle} - {examSubject}
        </p>
        <div className="my-6">
          <p className="text-xl text-gray-700">
            Bạn đã trả lời đúng{" "}
            <span className="font-bold text-green-600 text-2xl">{score}</span>{" "}
            trên tổng số{" "}
            <span className="font-bold text-gray-800 text-2xl">
              {totalQuestions}
            </span>{" "}
            câu.
          </p>
          <p
            className={`text-3xl font-bold mt-4 ${
              passed ? "text-green-600" : "text-red-600"
            }`}
          >
            Điểm: {percentage.toFixed(2)}%
          </p>
          {passed ? (
            <p className="text-green-500 text-lg mt-2">
              🎉 Chúc mừng! Bạn đã vượt qua bài thi!
            </p>
          ) : (
            <p className="text-red-500 text-lg mt-2">
              Bạn cần cố gắng hơn. Hãy thử lại!
            </p>
          )}
        </div>
      </div>

      {/* PHẦN XEM LẠI CHI TIẾT */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Chi tiết bài làm
        </h3>
        <ul className="text-left space-y-4">
          {allQuestions.map((question, index) => (
            <ResultDetailItem
              key={question.id}
              question={question}
              index={index}
              userAnswerIndex={userAnswers[question.id]}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamResult;
