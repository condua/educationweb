import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
// THAY ĐỔI 1: Import từ file dữ liệu động allTests.js
import { ALL_TESTS } from "../../json/allTests";

// --- Component con đã được cải tiến ---

// Đổi tên thành StandardGroupResult để xử lý các dạng câu hỏi chuẩn (có hoặc không có đoạn văn)
const StandardGroupResult = ({ group, userAnswers }) => (
  <div className="mb-8 p-4 border border-gray-200 rounded-lg">
    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
      {group.title}
    </h3>

    {/* Cải tiến: Chỉ hiển thị đoạn văn nếu nó tồn tại (group.passage có giá trị) */}
    {group.passage && (
      <div className="prose prose-sm max-w-none mb-6 bg-gray-50 p-3 rounded-md">
        <div
          dangerouslySetInnerHTML={{
            __html: group.passage.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    )}

    <div className="space-y-6">
      {group.group_questions.map((q, index) => {
        const userAnswerIndex = userAnswers ? userAnswers[q.id] : undefined;
        const isAnswered = userAnswerIndex !== undefined;
        const isCorrect =
          isAnswered && userAnswerIndex === q.correctAnswerIndex;

        return (
          <div key={q.id}>
            <p className="font-semibold text-gray-800">{`Câu ${index + 1}: ${
              q.question
            }`}</p>
            <div className="mt-2 text-sm space-y-1">
              {isAnswered ? (
                <p>
                  <b>Đáp án của bạn:</b>{" "}
                  <span
                    className={
                      isCorrect
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {q.options[userAnswerIndex]}
                  </span>
                  {isCorrect ? " ✔" : " ❌"}
                </p>
              ) : (
                <p>
                  <b>Bạn đã không trả lời câu này.</b>
                </p>
              )}

              {!isCorrect && (
                <p>
                  <b>Đáp án đúng:</b>{" "}
                  <span className="text-green-600 font-bold">
                    {q.options[q.correctAnswerIndex]}
                  </span>
                </p>
              )}

              <p className="text-gray-500 pt-1">
                <i>
                  <b>Giải thích:</b> {q.explanation}
                </i>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Component cho dạng Rearrangement Group (giữ nguyên)
const RearrangementGroupResult = ({ group, userAnswers }) => (
  // ... code component này không thay đổi
  <div className="mb-8 p-4 border border-gray-200 rounded-lg">
    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
      {group.title || "Sắp xếp câu"}
    </h3>
    <p className="text-sm text-gray-500 mt-1 mb-4 italic">
      {group.instructions}
    </p>
    <div className="space-y-6">
      {group.group_questions.map((q, index) => {
        const userAnswerIndex = userAnswers ? userAnswers[q.id] : undefined;
        const isCorrect =
          userAnswerIndex !== undefined &&
          userAnswerIndex === q.correctAnswerIndex;
        return (
          <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold mb-2">
              Câu {index + 1}: Sắp xếp các câu sau:
            </p>
            <ul className="list-disc list-inside mb-4 pl-2 text-gray-700">
              {q.question.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            <div>
              <p>
                <b>Thứ tự bạn chọn:</b>{" "}
                <span
                  className={
                    isCorrect
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {userAnswerIndex !== undefined
                    ? q.options[userAnswerIndex]
                    : "Chưa trả lời"}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  <b>Thứ tự đúng:</b>{" "}
                  <span className="text-green-600 font-bold">
                    {q.options[q.correctAnswerIndex]}
                  </span>
                </p>
              )}
              <p className="text-gray-500 mt-1">
                <i>
                  <b>Giải thích:</b> {q.explanation}
                </i>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const TestResults = () => {
  const { testId, attemptId } = useParams();
  const location = useLocation();

  // THAY ĐỔI 2: Lấy dữ liệu test động
  const test = ALL_TESTS.find((t) => t.id == testId);

  // Xử lý trường hợp không tìm thấy test
  if (!test) {
    return <div>Không tìm thấy bài kiểm tra!</div>;
  }

  // Lấy đáp án từ state của navigate hoặc từ mock data (fallback)
  // Trong thực tế, bạn sẽ dùng attemptId để gọi API lấy đúng lịch sử câu trả lời
  const userAnswers =
    location.state?.userAnswers ||
    test.userAnswersForAttempt?.[`attempt-${testId}-001`] ||
    {};

  let score = 0;
  let correctCount = 0;
  if (test.questionGroups) {
    test.questionGroups.forEach((group) => {
      group.group_questions.forEach((q) => {
        if (userAnswers[q.id] === q.correctAnswerIndex) {
          correctCount++;
        }
      });
    });
  }
  // Tránh chia cho 0 nếu test không có câu hỏi
  score = test.questionCount > 0 ? (correctCount / test.questionCount) * 10 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Kết quả bài làm
          </h1>
          <p className="mt-4 text-4xl font-bold text-blue-600">
            {score.toFixed(2)}/10
          </p>
          <p className="text-lg text-gray-600">
            ({correctCount}/{test.questionCount} câu đúng)
          </p>
        </div>

        {/* THAY ĐỔI 3: Cập nhật switch...case */}
        {test.questionGroups?.map((group) => {
          switch (group.type) {
            case "passage_group":
            case "single_question_group": // Cả hai trường hợp đều dùng component chung
              return (
                <StandardGroupResult
                  key={group.id}
                  group={group}
                  userAnswers={userAnswers}
                />
              );

            case "rearrangement_group":
              return (
                <RearrangementGroupResult
                  key={group.id}
                  group={group}
                  userAnswers={userAnswers}
                />
              );

            default:
              return (
                <p key={group.id}>Loại câu hỏi không xác định: {group.type}</p>
              );
          }
        })}

        <div className="mt-8 pt-6 border-t flex justify-center space-x-4">
          <Link
            to={`/test/${testId}`}
            className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Quay về
          </Link>
          <Link
            to={`/test/${testId}/take`}
            className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Làm lại
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
