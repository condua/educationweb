import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Send,
  Pin,
  Calculator,
  Sun,
  Moon,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import MathRenderer from "./MathRenderer";
import CustomDropdown from "./CustomDropdown";
import { EXAM_DATABASE } from "../data/examsList";

// --- HELPERS ---
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Hàm xáo trộn mảng (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- HÀM XỬ LÝ XÁO TRỘN ĐỀ THI ---
const randomizeExamData = (originalData) => {
  const newData = JSON.parse(JSON.stringify(originalData)); // Deep copy

  newData.parts = newData.parts.map((part) => {
    // 1. XÁO TRỘN THỨ TỰ CÂU HỎI TRONG PHẦN (Trừ phần 4 - Trả lời ngắn)
    // Logic: Nếu không phải phần 4 và không phải loại short-answer thì xáo trộn vị trí câu hỏi
    const isShufflePart = part.type !== "short-answer" && part.part !== 4;

    if (isShufflePart && part.questions) {
      part.questions = shuffleArray(part.questions);
    }

    // 2. XÁO TRỘN NỘI DUNG BÊN TRONG TỪNG CÂU HỎI
    if (part.questions) {
      part.questions = part.questions.map((q) => {
        // Phần 1: Đúng/Sai -> Xáo trộn các ý (statements)
        if (part.type === "true-false" && q.statements) {
          q.statements = shuffleArray(q.statements);
        }

        // Phần 2: Trắc nghiệm -> Xáo trộn 4 đáp án (options)
        if (part.type === "multiple-choice" && q.options) {
          q.options = shuffleArray(q.options);
        }

        // Phần 3: Ghép nối -> Xáo trộn cột trái (items) & cột phải (options)
        if (part.type === "matching" && q.items) {
          // A. GIỮ NGUYÊN MENU SELECT (Không xáo trộn q.options nữa)
          // q.options = shuffleArray(q.options);  <-- Đã bỏ dòng này để giữ thứ tự A, B, C, D...

          // B. Xáo trộn danh sách câu hỏi ghép (Cột trái)
          const originalIndices = q.items.map((_, i) => i);
          const shuffledIndices = shuffleArray(originalIndices);

          const newItems = shuffledIndices.map((oldIndex) => q.items[oldIndex]);

          // Map lại đáp án đúng
          const newAnswerKey = {};
          shuffledIndices.forEach((oldIndex, newIndex) => {
            newAnswerKey[newIndex] = q.answer[oldIndex];
          });

          q.items = newItems;
          q.answer = newAnswerKey;
        }

        return q;
      });
    }

    return part;
  });

  return newData;
};

// --- COMPONENT CHÍNH ---
const ExamSession = ({ darkMode, toggleTheme }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Biến dùng để đánh số thứ tự hiển thị (1, 2, 3...) thay vì dùng ID câu hỏi
  let globalQuestionIndex = 0;

  // --- 1. DATA FETCHING ---
  const originalExam = EXAM_DATABASE.find((e) => e.id === id);
  const STORAGE_KEY = `vsat_save_${id}`;

  const getSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  };
  const savedState = getSavedState();

  useEffect(() => {
    if (!originalExam) {
      alert("Không tìm thấy đề thi!");
      navigate("/vsat-home"); // Hoặc "/" tùy route của bạn
    }
  }, [originalExam, navigate]);

  if (!originalExam) return null;

  // --- 2. STATE INITIALIZATION ---

  // examData: Ưu tiên lấy từ LocalStorage (đề đã xáo trộn trước đó)
  // Nếu là lần đầu -> Thực hiện hàm randomizeExamData
  const [examData] = useState(() => {
    if (savedState && savedState.examData) {
      return savedState.examData;
    }
    return randomizeExamData({
      ...originalExam.data,
      duration: originalExam.duration || 90,
      title: originalExam.title,
      subject: originalExam.subject,
    });
  });

  const [answers, setAnswers] = useState(() => savedState?.answers || {});
  const [flagged, setFlagged] = useState(() => savedState?.flagged || {});
  const [submitted, setSubmitted] = useState(
    () => savedState?.submitted || false,
  );
  const [score, setScore] = useState(() => savedState?.score || 0);

  const [timeLeft, setTimeLeft] = useState(() => {
    if (savedState && typeof savedState.timeLeft === "number")
      return savedState.timeLeft;
    return examData.duration * 60;
  });

  const [totalPossibleScore, setTotalPossibleScore] = useState(0);

  // --- 3. EFFECTS (Logic Timer, Save, Score) ---

  useEffect(() => {
    let total = 0;
    if (examData.parts) {
      examData.parts.forEach((part) => part.questions.forEach(() => total++));
    }
    setTotalPossibleScore(total);
  }, [examData]);

  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [submitted]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) handleSubmit();
  }, [timeLeft, submitted]);

  // Auto Save: Lưu cả examData (cấu trúc đề đã xáo)
  useEffect(() => {
    const stateToSave = {
      examData,
      answers,
      flagged,
      submitted,
      score,
      timeLeft,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [examData, answers, flagged, submitted, score, timeLeft, STORAGE_KEY]);

  // --- 4. EVENT HANDLERS ---

  const handleAnswerChange = (qId, subId, value) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], [subId]: value },
    }));
  };

  const toggleFlag = (qId) => {
    if (submitted) return;
    setFlagged((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    let currentScore = 0;
    examData.parts.forEach((part) => {
      part.questions.forEach((q) => {
        // Logic chấm điểm đơn giản: Matching cần đúng hết các cặp
        if (part.type === "matching") {
          let isCorrect = true;
          // Kiểm tra xem người dùng đã chọn đủ và đúng chưa
          if (
            Object.keys(answers[q.id] || {}).length !==
            Object.keys(q.answer).length
          )
            isCorrect = false;
          else {
            Object.keys(q.answer).forEach((key) => {
              if (answers[q.id]?.[key] !== q.answer[key]) isCorrect = false;
            });
          }
          if (isCorrect) currentScore++;
        } else {
          // Các phần khác (P1, P2, P4): Có trả lời là tính (Cần sửa logic check đáp án thật ở đây)
          if (answers[q.id]) currentScore += 1;
        }
      });
    });
    setScore(currentScore);
    setSubmitted(true);
    clearInterval(timerRef.current);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn làm lại từ đầu? Đề thi sẽ được trộn lại.",
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const handleBack = () => navigate("/vsat-home"); // Sửa lại đường dẫn về trang chủ của bạn

  const scrollToQuestion = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const getNavBubbleClass = (q) => {
    const isFlagged = flagged[q.id];
    const hasAnswer = answers[q.id] && Object.keys(answers[q.id]).length > 0;
    if (submitted) return "bg-gray-300 text-gray-800";
    if (isFlagged)
      return "bg-yellow-400 text-yellow-900 ring-2 ring-yellow-200";
    if (hasAnswer) return "bg-blue-500 text-white";
    return `${darkMode ? "bg-slate-700 text-gray-100 dark:text-gray-300" : "bg-gray-200 text-gray-600"}`;
  };

  // --- 5. RENDER UI ---
  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 font-sans ${darkMode ? "bg-slate-900 text-slate-100" : "bg-indigo-50 text-slate-800"}`}
    >
      {/* HEADER */}
      <header
        className={`w-full fixed sm:py-3.5 top-0 z-50 shadow-md backdrop-blur-md transition-colors duration-300 ${darkMode ? "bg-slate-800/90 border-b border-slate-700" : "bg-white/90 border-b border-indigo-100"}`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              className={`p-2 rounded-full mr-2 transition-all hover:bg-opacity-80 ${darkMode ? "bg-slate-700 text-gray-300 hover:bg-slate-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <ArrowLeft size={20} />
            </button>
            <div
              className={`p-2 rounded-lg hidden sm:block ${darkMode ? "bg-indigo-600" : "bg-indigo-100"}`}
            >
              <Calculator
                size={24}
                className={darkMode ? "text-white" : "text-indigo-600"}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-base sm:text-lg leading-tight truncate max-w-[200px]">
                {examData.title}
              </h1>
              <span className="text-xs opacity-70">
                {examData.subject} • {examData.duration} Phút
              </span>
            </div>
          </div>

          <div
            className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono font-bold text-lg sm:text-xl tracking-wider shadow-inner ${timeLeft < 300 ? "bg-red-100 text-red-600 animate-pulse border border-red-200" : darkMode ? "bg-slate-950 text-emerald-400 border border-slate-700" : "bg-slate-100 text-indigo-600 border border-slate-200"}`}
          >
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg transform active:scale-95 transition-all font-bold text-sm"
              >
                <Send size={16} />{" "}
                <span className="hidden sm:inline">Nộp bài</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div
                  className={`font-bold text-sm sm:text-base text-emerald-500 px-2 sm:px-3 py-1 rounded-full border border-emerald-200 ${darkMode ? "bg-emerald-900/30" : "bg-emerald-100"}`}
                >
                  {score}/{totalPossibleScore}
                </div>
                <button
                  onClick={handleReset}
                  title="Làm lại"
                  className={`p-2 rounded-full ${darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${darkMode ? "bg-slate-700 text-yellow-300" : "bg-indigo-100 text-indigo-600"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="container mx-auto p-3 sm:p-6 pb-32">
        <main className="space-y-6 sm:space-y-10 w-full mx-auto max-w-5xl">
          {examData.parts.map((part, partIndex) => {
            // Setup màu sắc cho từng phần
            let colorClass = "";
            let descColor = "";
            switch (part.type) {
              case "true-false":
                colorClass = darkMode
                  ? "bg-orange-900/30 border-orange-500 text-orange-200"
                  : "bg-orange-100/50 border-orange-500 text-orange-800";
                descColor = darkMode ? "text-orange-300" : "text-orange-700";
                break;
              case "matching":
                colorClass = darkMode
                  ? "bg-purple-900/30 border-purple-500 text-purple-200"
                  : "bg-purple-100/50 border-purple-500 text-purple-800";
                descColor = darkMode ? "text-purple-300" : "text-purple-700";
                break;
              case "short-answer":
                colorClass = darkMode
                  ? "bg-cyan-900/30 border-cyan-500 text-cyan-200"
                  : "bg-cyan-100/50 border-cyan-500 text-cyan-800";
                descColor = darkMode ? "text-cyan-300" : "text-cyan-700";
                break;
              default:
                colorClass = darkMode
                  ? "bg-indigo-900/30 border-indigo-500 text-indigo-200"
                  : "bg-indigo-100/50 border-indigo-500 text-indigo-800";
                descColor = darkMode ? "text-indigo-300" : "text-indigo-700";
            }

            return (
              <div key={partIndex} className="space-y-4 sm:space-y-6">
                <div
                  className={`${colorClass} p-4 sm:p-5 rounded-xl border-l-4 shadow-sm`}
                >
                  <h3 className="font-bold text-lg sm:text-xl uppercase tracking-wide">
                    {part.title}
                  </h3>
                  <p
                    className={`${descColor} text-sm sm:text-base mt-2 font-medium`}
                  >
                    {part.description}
                  </p>
                </div>

                {/* RENDER CÂU HỎI */}
                {part.questions.map((q) => {
                  globalQuestionIndex++; // Tăng số thứ tự câu hỏi (1, 2, 3...) bất kể ID là gì
                  const displayNum = globalQuestionIndex;

                  const uVal = answers[q.id]?.[0] || "";
                  const image = q.image ? (
                    <div className="my-4 flex justify-center">
                      <img
                        src={q.image}
                        alt="hinh"
                        className={`max-h-48 sm:max-h-64 object-contain rounded-lg border shadow-sm ${darkMode ? "border-slate-600" : "border-gray-200"}`}
                      />
                    </div>
                  ) : null;

                  return (
                    <div
                      key={q.id}
                      id={q.id}
                      className={`rounded-xl shadow-sm border overflow-visible transition-shadow hover:shadow-md ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"} scroll-mt-28`}
                    >
                      {/* Question Header */}
                      <div
                        className={`flex justify-between items-center p-3 sm:p-4 border-b rounded-t-xl ${darkMode ? "border-slate-700 bg-slate-800/50" : "border-gray-100 bg-gray-50/50"}`}
                      >
                        <h4
                          className={`font-bold text-base sm:text-lg ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                        >
                          Câu {displayNum}
                        </h4>
                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={
                            flagged[q.id]
                              ? "text-red-500 transform rotate-12 transition-transform"
                              : "text-gray-400 hover:text-gray-600"
                          }
                        >
                          <Pin
                            size={18}
                            fill={flagged[q.id] ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      {/* Question Body */}
                      <div className="p-3 sm:p-5">
                        {/* THAY ĐỔI: Thêm break-words và overflow-x-auto để văn bản dài tự xuống dòng hoặc cuộn */}
                        <div
                          className={`text-sm sm:text-base leading-relaxed font-medium break-words overflow-x-auto ${darkMode ? "text-gray-200" : "text-gray-800"}`}
                        >
                          <MathRenderer content={q.text} />
                        </div>
                        {image}
                        {q.mathText && (
                          <div
                            className={`my-4 p-3 sm:p-4 rounded-lg text-center overflow-x-auto max-w-full ${darkMode ? "bg-slate-900/50" : "bg-gray-50"}`}
                          >
                            <MathRenderer
                              content={`$$${q.mathText}$$`}
                              block={true}
                            />
                          </div>
                        )}
                      </div>

                      {/* Interaction Area */}
                      <div
                        className={`p-3 sm:p-5 border-t rounded-b-xl ${darkMode ? "bg-slate-900/30 border-slate-700" : "bg-gray-50 border-gray-100"}`}
                      >
                        {/* 1. True/False */}
                        {part.type === "true-false" && (
                          <div
                            className={`overflow-x-auto rounded-lg border ${darkMode ? "border-slate-600 bg-slate-800" : "border-gray-200 bg-white"}`}
                          >
                            <table className="w-full text-sm min-w-[600px] sm:min-w-0">
                              <thead
                                className={`uppercase text-xs font-bold ${darkMode ? "bg-slate-700 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                              >
                                <tr>
                                  <th className="p-3 text-left w-full">
                                    Nội dung
                                  </th>
                                  <th className="p-3 w-16 text-center border-l border-gray-300">
                                    Đúng
                                  </th>
                                  <th className="py-3 px-4.5 w-16 text-center border-l border-gray-300">
                                    Sai
                                  </th>
                                </tr>
                              </thead>
                              <tbody
                                className={`divide-y ${darkMode ? "divide-slate-600" : "divide-gray-200"}`}
                              >
                                {q.statements.map((st, sIdx) => {
                                  const uAns = answers[q.id]?.[st.id];
                                  const isCorrect = uAns === st.answer;
                                  const rowClass = submitted
                                    ? isCorrect
                                      ? darkMode
                                        ? "bg-green-700/20"
                                        : "bg-emerald-50"
                                      : darkMode
                                        ? "bg-rose-900/20"
                                        : "bg-rose-50"
                                    : "";
                                  return (
                                    <tr key={st.id} className={rowClass}>
                                      <td className="p-3 align-middle break-words whitespace-normal min-w-[200px]">
                                        <span
                                          className={`font-bold mr-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                                        >
                                          {sIdx + 1}.
                                        </span>
                                        <MathRenderer content={st.text} />
                                      </td>
                                      <td className="p-3 text-center border-l border-gray-300">
                                        <input
                                          type="radio"
                                          checked={uAns === "T"}
                                          onChange={() =>
                                            handleAnswerChange(q.id, st.id, "T")
                                          }
                                          disabled={submitted}
                                          className="w-5 h-5 accent-indigo-600 cursor-pointer"
                                        />
                                      </td>
                                      <td className="p-3 text-center border-l border-gray-300">
                                        <input
                                          type="radio"
                                          checked={uAns === "F"}
                                          onChange={() =>
                                            handleAnswerChange(q.id, st.id, "F")
                                          }
                                          disabled={submitted}
                                          className="w-5 h-5 accent-indigo-600 cursor-pointer"
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* 2. Multiple Choice */}
                        {part.type === "multiple-choice" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            {q.options.map((opt, idx) => {
                              const isSelected = answers[q.id]?.[0] === opt;
                              const isCorrect = q.answer === opt;
                              let bgClass = darkMode
                                ? "bg-slate-800 border-slate-600 hover:border-indigo-400"
                                : "bg-white border-gray-200 hover:border-indigo-400 hover:shadow-sm";
                              if (submitted) {
                                if (isCorrect)
                                  bgClass = darkMode
                                    ? "bg-emerald-900/20 border-emerald-500 text-emerald-300"
                                    : "bg-emerald-50 border-emerald-500 text-emerald-700";
                                else if (isSelected)
                                  bgClass = darkMode
                                    ? "bg-rose-900/20 border-rose-500 text-rose-300"
                                    : "bg-rose-50 border-rose-500 text-rose-700";
                                else bgClass = "opacity-50 grayscale";
                              } else if (isSelected)
                                bgClass = darkMode
                                  ? "bg-indigo-900/30 border-indigo-500 ring-1 ring-indigo-500 text-indigo-100"
                                  : "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 text-indigo-900";
                              return (
                                <button
                                  key={idx}
                                  disabled={submitted}
                                  onClick={() =>
                                    handleAnswerChange(q.id, 0, opt)
                                  }
                                  className={`p-3 sm:p-4 text-left rounded-lg border transition-all flex items-start gap-3 sm:gap-4 ${bgClass} cursor-pointer`}
                                >
                                  <div
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex flex-shrink-0 items-center justify-center text-xs sm:text-sm font-bold ${isSelected || (submitted && isCorrect) ? "border-current" : "border-gray-300 text-gray-400"}`}
                                  >
                                    {String.fromCharCode(65 + idx)}
                                  </div>
                                  <div className="flex-1 text-sm sm:text-base break-words overflow-x-auto min-w-0">
                                    <MathRenderer content={opt} />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 3. Matching */}
                        {part.type === "matching" && (
                          <div className="space-y-3">
                            {q.items.map((item, idx) => {
                              const currentVal = answers[q.id]?.[idx] || "";
                              const correctVal = q.answer[idx]; // answer key đã được remap ở bước shuffle
                              return (
                                <div
                                  key={idx}
                                  className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-lg border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}
                                >
                                  <div className="flex-1 flex gap-3 min-w-0">
                                    <span
                                      className={`font-bold flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                      {idx + 1}.
                                    </span>
                                    {/* THAY ĐỔI: Thêm break-words và overflow-x-auto */}
                                    <div
                                      className={`break-words overflow-x-auto ${darkMode ? "text-gray-200" : "text-gray-800"}`}
                                    >
                                      <MathRenderer content={item} />
                                    </div>
                                  </div>
                                  <div className="w-full sm:w-1/3">
                                    <CustomDropdown
                                      options={q.options}
                                      value={currentVal}
                                      onChange={(val) =>
                                        handleAnswerChange(q.id, idx, val)
                                      }
                                      disabled={submitted}
                                      darkMode={darkMode}
                                    />
                                    {submitted && currentVal !== correctVal && (
                                      <div className="text-xs text-rose-500 mt-1 font-bold">
                                        Đáp án đúng: {correctVal}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            <div
                              className={`mt-4 p-4 rounded-lg border ${darkMode ? "bg-purple-900/20 border-purple-800" : "bg-purple-50 border-purple-100"}`}
                            >
                              <p
                                className={`text-sm font-bold mb-2 ${darkMode ? "text-purple-300" : "text-purple-800"}`}
                              >
                                Các lựa chọn:
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                {q.options.map((opt, i) => (
                                  /* THAY ĐỔI: Thêm break-words và overflow-x-auto */
                                  <div
                                    key={i}
                                    className="flex gap-2 break-words overflow-x-auto"
                                  >
                                    <MathRenderer content={opt} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. Short Answer (Không Xáo trộn) */}
                        {part.type === "short-answer" && (
                          <div className="flex flex-col sm:flex-row shadow-sm rounded-md overflow-hidden border sm:border-0 border-gray-300 dark:border-slate-500">
                            <div
                              className={`px-4 sm:px-5 py-2 sm:py-3 border-b sm:border-b-0 sm:border-r flex items-center justify-start sm:min-w-[100px] ${darkMode ? "bg-slate-700 border-slate-500" : "bg-gray-100 border-gray-300"}`}
                            >
                              <span
                                className={`font-bold text-sm uppercase ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              >
                                Trả lời
                              </span>
                            </div>
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                disabled={submitted}
                                value={uVal}
                                onChange={(e) =>
                                  handleAnswerChange(q.id, 0, e.target.value)
                                }
                                placeholder="Nhập kết quả"
                                className={`w-full h-full p-3 border-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-all font-mono text-base sm:text-lg ${darkMode ? "bg-slate-800 placeholder-slate-600" : "bg-white placeholder-gray-400"}`}
                              />
                              {submitted && (
                                <div
                                  className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2 ${darkMode ? "bg-slate-800" : "bg-white"}`}
                                >
                                  <span className="text-xs font-bold text-gray-500 hidden sm:inline">
                                    Đáp án:
                                  </span>
                                  <span
                                    className={`font-mono font-bold ${uVal.trim() === q.answer ? "text-emerald-500" : "text-rose-500"}`}
                                  >
                                    {q.answer}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </main>
      </div>

      {/* FOOTER NAV */}
      <div
        className={`fixed w-full bottom-0 left-0 right-0 z-40 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-indigo-100"}`}
      >
        <div className="container mx-auto">
          <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar scroll-smooth justify-start sm:justify-center">
            {(() => {
              let navIndex = 0;
              // Map qua examData.parts đã được shuffle để hiển thị Nav đúng thứ tự câu hỏi hiện tại
              return examData.parts
                .flatMap((p) => p.questions)
                .map((q) => {
                  navIndex++;
                  return (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(q.id)}
                      className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs font-bold border transition-all shadow-sm ${getNavBubbleClass(q)}`}
                    >
                      {navIndex}
                    </button>
                  );
                });
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSession;
