// src/pages/TestResults.js
import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// THÊM MỚI: Import thư viện và component cần thiết
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// Import các actions từ Redux slices
import {
  fetchAttemptResult,
  clearCurrentAttempt,
} from "../../redux/testAttemptSlice";
import { fetchTestWithAnswers, clearCurrentTest } from "../../redux/testSlice";

// THÊM MỚI: Component MathRenderer để xử lý và hiển thị LaTeX
const MathRenderer = ({ text }) => {
  if (typeof text !== "string" || !text) return null;
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
  const parts = text.split(mathRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        } else {
          // Thay thế \n bằng <br /> cho văn bản thường
          return (
            <span key={index}>
              {part.split("\n").map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          );
        }
      })}
    </>
  );
};

// ----- Các component phụ -----
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

// THAY ĐỔI: Component QuestionResult giờ sẽ sử dụng MathRenderer
const QuestionResult = ({ question, userAnswer, questionNumber }) => {
  const isAnswered =
    userAnswer !== undefined && userAnswer.selectedAnswer !== null;
  const isCorrect =
    isAnswered && userAnswer.selectedAnswer === question.correctAnswer;

  return (
    <div className="py-6">
      <div className="flex justify-between items-start">
        <div className="font-semibold text-gray-800 mb-3 flex-grow">
          {`Câu ${questionNumber}: `}
          <MathRenderer text={question.question} />
        </div>
        {isCorrect ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
        )}
      </div>

      <div
        className="mt-2 text-sm space-y-2 pl-4 border-l-4 rounded"
        style={{ borderColor: isCorrect ? "#22c55e" : "#ef4444" }}
      >
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
              <MathRenderer
                text={question.options[userAnswer.selectedAnswer]}
              />
            </span>
          </p>
        ) : (
          <p className="font-bold text-gray-500">
            Bạn đã không trả lời câu này.
          </p>
        )}

        {!isCorrect && (
          <p>
            <b>Đáp án đúng:</b>{" "}
            <span className="text-green-600 font-bold">
              <MathRenderer text={question.options[question.correctAnswer]} />
            </span>
          </p>
        )}

        {question.explanation && (
          <div className="text-gray-600 pt-2 italic">
            <b>Giải thích:</b> <MathRenderer text={question.explanation} />
          </div>
        )}
      </div>
    </div>
  );
};

// ----- Component chính -----
const TestAttemptResults = () => {
  const { testId, attemptId, courseId } = useParams();
  const dispatch = useDispatch();

  const { currentTest: test, status: testStatus } = useSelector(
    (state) => state.tests
  );
  const { currentAttemptResult: attempt, status: attemptStatus } = useSelector(
    (state) => state.testAttempts
  );

  useEffect(() => {
    if (attemptId) dispatch(fetchAttemptResult(attemptId));
    if (testId) dispatch(fetchTestWithAnswers(testId));
    return () => {
      dispatch(clearCurrentAttempt());
      dispatch(clearCurrentTest());
    };
  }, [dispatch, testId, attemptId]);

  const flatQuestions = useMemo(() => {
    if (!test?.questionGroups) return [];
    return test.questionGroups.flatMap((group) => group.group_questions);
  }, [test]);

  const userAnswersMap = useMemo(() => {
    if (!attempt?.userAnswers) return new Map();
    return new Map(attempt.userAnswers.map((a) => [a.questionId, a]));
  }, [attempt]);

  if (
    testStatus === "loading" ||
    attemptStatus === "loading" ||
    !test ||
    !attempt
  ) {
    return <LoadingSpinner />;
  }

  if (testStatus === "failed" || attemptStatus === "failed") {
    return <ErrorDisplay message="Không thể tải dữ liệu kết quả." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="text-center p-8 border-b-2 border-dashed">
            <h1 className="text-3xl font-bold text-gray-800">
              Kết quả bài làm
            </h1>
            <p className="mt-1 text-base text-gray-500">
              <MathRenderer text={test.title} />
            </p>
            <div className="mt-6">
              <p className="text-6xl font-bold text-blue-600">
                {attempt.score.toFixed(0)}
              </p>
              <p className="text-lg text-gray-600 mt-2">
                ({attempt.correctAnswersCount} / {attempt.totalQuestions} câu
                đúng)
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Đáp án chi tiết
            </h2>
            {test.questionGroups?.map((group) => (
              <div key={group.id} className="mb-8 p-4 bg-slate-50 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
                  <MathRenderer text={group.title} />
                </h3>
                {group.passage && (
                  <div className="prose prose-sm max-w-none mb-6">
                    <MathRenderer text={group.passage} />
                  </div>
                )}
                <div className="divide-y divide-gray-200">
                  {group.group_questions.map((q) => {
                    const questionNumber =
                      flatQuestions.findIndex((fq) => fq.id === q.id) + 1;
                    return (
                      <QuestionResult
                        key={q.id}
                        question={q}
                        userAnswer={userAnswersMap.get(q.id)}
                        questionNumber={questionNumber}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 rounded-b-xl border-t flex justify-center space-x-4">
            <Link
              to={`/admin/course/${courseId}/test/${testId}/attempts`}
              className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAttemptResults;
