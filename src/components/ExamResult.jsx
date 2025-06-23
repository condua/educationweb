import React from "react";

const ExamResult = ({ exam, userAnswers, score }) => {
  const totalQuestions = exam.questions.length;
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 50; // Ngưỡng đỗ đơn giản

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center">
      <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
        Kết Quả Bài Thi
      </h2>
      <p className="text-2xl font-semibold text-indigo-700 mb-4">
        {exam.title}
      </p>
      <div className="my-8">
        <p className="text-xl text-gray-700">
          Bạn đã trả lời đúng{" "}
          <span className="font-bold text-green-600">{score}</span> trên tổng số{" "}
          <span className="font-bold text-gray-800">{totalQuestions}</span> câu
          hỏi.
        </p>
        <p
          className={`text-3xl font-bold mt-4 ${
            passed ? "text-green-600" : "text-red-600"
          }`}
        >
          Điểm của bạn: {percentage.toFixed(2)}%
        </p>
        {passed ? (
          <p className="text-green-500 text-lg mt-2">
            Chúc mừng! Bạn đã vượt qua bài thi!
          </p>
        ) : (
          <p className="text-red-500 text-lg mt-2">
            Bạn cần cố gắng hơn. Hãy thử lại!
          </p>
        )}
      </div>

      <div className="mt-10 border-t pt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Chi tiết đáp án:
        </h3>
        <ul className="text-left space-y-4">
          {exam.questions.map((q, index) => (
            <li
              key={q.id}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="font-medium text-lg text-gray-900 mb-2">
                Câu {index + 1}: {q.questionText}
              </p>
              <p className="text-gray-700">
                Đáp án của bạn:{" "}
                <span
                  className={`font-semibold ${
                    userAnswers[q.id] === q.correctAnswerIndex
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {q.options[userAnswers[q.id]] || "Chưa chọn"}
                </span>
              </p>
              <p className="text-gray-700">
                Đáp án đúng:{" "}
                <span className="font-semibold text-blue-600">
                  {q.options[q.correctAnswerIndex]}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamResult;
