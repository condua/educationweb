import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InlineMath, BlockMath } from "react-katex";
// IMPORT ACTIONS TỪ REDUX
import {
  fetchAttemptResult,
  clearCurrentAttempt,
} from "../../redux/testAttemptSlice";
import { fetchTestWithAnswers, clearCurrentTest } from "../../redux/testSlice";
import {
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

// --- THÀNH PHẦN HỖ TRỢ: MathRenderer ---
// Xử lý và hiển thị LaTeX, in đậm (**text**), và xuống dòng
const MathRenderer = ({ text }) => {
  if (typeof text !== "string" || !text) return null;
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
  const parts = text.split(mathRegex);

  // Hàm xử lý text thường: in đậm và xuống dòng
  const formatPlainText = (str) => {
    // Chuyển **text** thành <strong>text</strong>
    const boldFormatted = str.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    return (
      <span
        dangerouslySetInnerHTML={{
          __html: boldFormatted.replace(/\n/g, "<br />"),
        }}
      />
    );
  };

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        } else {
          return (
            <React.Fragment key={index}>{formatPlainText(part)}</React.Fragment>
          );
        }
      })}
    </>
  );
};

// --- CÁC COMPONENT PHỤ (Loading, Error) ---
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

// --- COMPONENT CON: Hiển thị từng câu hỏi ---
const QuestionResult = ({ question, userAnswer, questionNumber }) => {
  const isAnswered = userAnswer !== undefined;
  const isCorrect =
    isAnswered && userAnswer.selectedAnswer === question.correctAnswer;

  return (
    <div className="py-6">
      <div className="flex justify-between items-start">
        <div className="font-semibold text-gray-800 mb-3 flex-grow">
          <span className="mr-2">{`Câu ${questionNumber}:`}</span>
          <MathRenderer text={question.question} />
        </div>

        {isCorrect ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 ml-4" />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 ml-4" />
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
              />{" "}
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
          <p className="text-gray-600 pt-2 italic">
            <b>Giải thích:</b> <MathRenderer text={question.explanation} />
          </p>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH: TestResults ---
const TestResults = () => {
  const { testId, attemptId, courseId } = useParams();
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux
  const { currentTest: test, status: testStatus } = useSelector(
    (state) => state.tests,
  );
  const { currentAttemptResult: attempt, status: attemptStatus } = useSelector(
    (state) => state.testAttempts,
  );

  // State quản lý AI Feedback
  const [aiFeedback, setAiFeedback] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Fetch dữ liệu khi mount
  useEffect(() => {
    if (attemptId) {
      dispatch(fetchAttemptResult(attemptId));
    }
    if (testId) {
      dispatch(fetchTestWithAnswers(testId));
    }

    // Dọn dẹp khi unmount
    return () => {
      dispatch(clearCurrentAttempt());
      dispatch(clearCurrentTest());
    };
  }, [dispatch, testId, attemptId]);

  // Xử lý dữ liệu dạng phẳng và ánh xạ câu trả lời
  const flatQuestions = useMemo(() => {
    if (!test?.questionGroups) return [];
    return test.questionGroups.flatMap((group) => group.group_questions);
  }, [test]);

  const userAnswersMap = useMemo(() => {
    if (!attempt?.userAnswers) return new Map();
    return new Map(attempt.userAnswers.map((a) => [a.questionId, a]));
  }, [attempt]);

  // --- HÀM TẠO NHẬN XÉT AI (PHIÊN BẢN PHÂN TÍCH SÂU) ---
  const generateAIFeedback = async () => {
    if (!test || !attempt) return;
    setIsGeneratingAI(true);

    try {
      // 1. Thu thập dữ liệu chi tiết: Tỷ lệ đúng từng phần & Nội dung câu sai
      let analysisText = "";
      let wrongQuestionsList = []; // Lưu nội dung câu sai để AI "bắt mạch"

      test.questionGroups.forEach((group) => {
        let groupTotal = group.group_questions.length;
        let groupCorrect = 0;
        let localWrong = [];

        group.group_questions.forEach((q) => {
          const ua = userAnswersMap.get(q.id);
          if (ua && ua.selectedAnswer === q.correctAnswer) {
            groupCorrect++;
          } else {
            // Lấy 150 ký tự đầu của câu sai để gửi cho AI, giới hạn 8 câu tránh tràn token
            if (wrongQuestionsList.length < 8) {
              localWrong.push(
                `- ${q.question.substring(0, 150).replace(/\n/g, " ")}...`,
              );
              wrongQuestionsList.push(q);
            }
          }
        });

        const accuracy = Math.round((groupCorrect / groupTotal) * 100) || 0;
        analysisText += `\n📌 Phần "${group.title}": Đúng ${groupCorrect}/${groupTotal} câu (Tỷ lệ: ${accuracy}%).\n`;

        if (localWrong.length > 0) {
          analysisText += `   Ví dụ nội dung học sinh làm sai ở phần này:\n   ${localWrong.join(
            "\n   ",
          )}\n`;
        }
      });

      // 2. Tạo System Prompt
      const systemPrompt = `Bạn là một chuyên gia giáo dục và tâm lý học hàng đầu tại MLPA. Nhiệm vụ của bạn là phân tích sâu năng lực của học sinh dựa trên dữ liệu bài kiểm tra, chỉ ra cốt lõi vấn đề và đưa ra chiến lược học tập cá nhân hóa.`;

      // 3. Tạo Prompt chi tiết bắt buộc AI trả về theo cấu trúc
      const prompt = `
Bạn là giáo viên có kinh nghiệm phân tích kết quả học tập.

Dữ liệu bài kiểm tra:
- Tên bài: ${test.title}
- Điểm: ${attempt.score.toFixed(2)}
- Số câu đúng: ${attempt.correctAnswersCount}/${attempt.totalQuestions}

Phân tích chi tiết:
${analysisText}

Dựa **chỉ trên dữ liệu trên**, hãy viết **BÁO CÁO PHÂN TÍCH NĂNG LỰC** gồm đúng 4 phần:

**1. Đánh giá tổng quan:** Nhận xét năng lực chung dựa trên điểm số và kết quả làm bài.

**2. Điểm mạnh:** Chỉ ra các kỹ năng/chuyên đề học sinh làm tốt, kèm dẫn chứng từ tỷ lệ đúng hoặc kết quả.

**3. Lỗ hổng kiến thức:** Phân tích các kỹ năng/chuyên đề còn yếu dựa trên các câu sai và tỷ lệ đúng thấp; xác định nguyên nhân và mức độ ưu tiên cải thiện. Không suy diễn ngoài dữ liệu.

**4. Chiến lược cải thiện:** Đề xuất 3–5 hành động cụ thể, khả thi cho tuần tới, ưu tiên khắc phục các điểm yếu quan trọng nhất.

Yêu cầu:
- Viết bằng tiếng Việt, giọng văn sư phạm, khách quan và khích lệ.
- Trình bày bằng Markdown, chỉ dùng tiêu đề in đậm (**...**) và gạch đầu dòng khi cần.
- Không bịa thêm thông tin, mọi nhận xét phải dựa trên dữ liệu đã cung cấp.
`;
      // 4. Gọi API
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chatgpt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          systemPrompt: systemPrompt,
        }),
      });

      const data = await res.json();
      const reply =
        data.reply || data.message || data.choices?.[0]?.message?.content;

      if (reply) {
        setAiFeedback(reply);
      } else {
        throw new Error("Không có phản hồi từ AI");
      }
    } catch (error) {
      console.error("Lỗi AI:", error);
      setAiFeedback(
        "Đã có lỗi xảy ra khi yêu cầu AI đánh giá. Vui lòng thử lại sau.",
      );
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // --- XỬ LÝ LOADING VÀ ERROR ---
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
          {/* --- Phần 1: TỔNG KẾT ĐIỂM --- */}
          <div className="text-center p-8 border-b-2 border-dashed">
            <h1 className="text-3xl font-bold text-gray-800">
              Kết quả bài làm
            </h1>
            <p className="mt-1 text-base text-gray-500">
              <MathRenderer text={test.title} />
            </p>

            <div className="mt-6">
              <p className="text-6xl font-bold text-blue-600">
                {attempt.score.toFixed(2)}
              </p>
              <p className="text-lg text-gray-600 mt-2">
                ({attempt.correctAnswersCount} / {attempt.totalQuestions} câu
                đúng)
              </p>
            </div>
          </div>

          {/* --- Phần 2: ĐÁNH GIÁ TỪ AI --- */}
          <div className="p-6 sm:px-8 border-b border-gray-100 bg-sky-50/50">
            <div className="flex items-center gap-2 mb-4">
              <SparklesIcon className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Nhận xét & Phân tích từ AI
              </h2>
            </div>

            {aiFeedback ? (
              <div className="p-5 bg-white border border-sky-100 rounded-xl shadow-sm text-gray-700 leading-relaxed text-sm space-y-3">
                <MathRenderer text={aiFeedback} />
              </div>
            ) : (
              <div className="text-center py-6 bg-white border border-dashed border-gray-300 rounded-xl">
                <p className="text-sm text-gray-500 mb-4 px-4">
                  Trí tuệ nhân tạo sẽ phân tích điểm mạnh, điểm yếu dựa trên
                  lịch sử câu đúng/sai để đưa ra lộ trình cải thiện cá nhân hóa
                  cho bạn.
                </p>
                <button
                  onClick={generateAIFeedback}
                  disabled={isGeneratingAI}
                  className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center mx-auto gap-2 disabled:bg-blue-400"
                >
                  {isGeneratingAI ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang phân tích bài làm...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5 text-amber-300" />
                      Yêu cầu AI phân tích năng lực
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* --- Phần 3: ĐÁP ÁN CHI TIẾT --- */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Đáp án chi tiết
            </h2>
            {test.questionGroups?.map((group) => (
              <div
                key={group.id}
                className="mb-8 p-4 bg-slate-50 rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
                  <MathRenderer text={group.title} />
                </h3>
                {group.passage && (
                  <div className="prose prose-sm max-w-none mb-6 p-4 bg-white border border-gray-200 rounded-md">
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

          {/* --- Phần 4: NÚT ĐIỀU HƯỚNG --- */}
          <div className="p-6 bg-gray-50 rounded-b-xl border-t flex justify-center space-x-4">
            <Link
              to={`/course/${courseId}/test/${testId}`}
              className="px-6 py-2.5 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition"
            >
              Quay về trang trước
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
