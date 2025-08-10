import React, { useState, useEffect, useCallback } from "react";
import { FiVolume2, FiCheckCircle, FiXCircle } from "react-icons/fi"; // Dùng icon cho đẹp

// --- Dữ liệu & Helpers ---
import vocabImages from "./vocabImages"; // Đảm bảo file này ở đúng vị trí
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// --- Âm thanh ---
// Tạo đối tượng Audio bên ngoài component để không bị khởi tạo lại mỗi lần render
const correctSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
);
const wrongSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
);
const clickSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3"
);

export default function VocabularyGame() {
  // --- Quản lý trạng thái (State) của trò chơi ---
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizOver, setIsQuizOver] = useState(false);

  // --- Khởi tạo hoặc chơi lại trò chơi ---
  const startGame = useCallback(() => {
    setQuestions(shuffleArray(vocabImages));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizOver(false);
  }, []);

  // Bắt đầu game lần đầu
  useEffect(() => {
    startGame();
  }, [startGame]);

  // --- Xử lý phát âm từ vựng ---
  const handlePronounceWord = (word) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt của bạn không hỗ trợ tính năng phát âm.");
    }
  };

  // --- Xử lý khi người dùng chọn câu trả lời ---
  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
      correctSound.currentTime = 0;
      correctSound.play();
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }
  };

  // --- Xử lý chuyển câu hỏi tiếp theo ---
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    clickSound.currentTime = 0;
    clickSound.play();

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsQuizOver(true);
    }
  };

  // --- Hàm lấy class CSS cho các nút lựa chọn ---
  const getButtonClass = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrectAnswer = option === currentQuestion.correctAnswer;

    // Khi chưa trả lời
    if (!isAnswered) {
      return "bg-white text-slate-700 hover:bg-sky-100 ring-1 ring-slate-200";
    }

    // Khi đã trả lời
    if (isCorrectAnswer) {
      return "bg-green-500 text-white transform scale-105 shadow-lg";
    }
    if (option === selectedAnswer && !isCorrectAnswer) {
      return "bg-red-500 text-white";
    }

    return "bg-slate-100 text-slate-500 opacity-70 cursor-not-allowed";
  };

  // --- Giao diện (Render) ---
  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <p className="animate-pulse text-2xl font-semibold text-slate-600">
          Loading Game...
        </p>
      </div>
    );
  }

  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-indigo-600 p-4 text-center text-white">
        <h2 className="text-6xl font-extrabold drop-shadow-lg">
          🎉 Well Done! 🎉
        </h2>
        <p className="mt-4 text-2xl">Your final score is:</p>
        <p className="my-6 text-8xl font-bold drop-shadow-md">
          {score}{" "}
          <span className="text-4xl opacity-80">/ {questions.length}</span>
        </p>
        <button
          onClick={startGame}
          className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-indigo-600 shadow-2xl transition-transform hover:scale-105 active:scale-95"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-sky-100 to-indigo-200 p-4 pt-8 sm:p-8">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Header: Điểm số & Thanh tiến trình */}
        <div className="mb-4">
          <div className="mb-2 flex justify-between text-lg font-bold">
            <p className="text-indigo-600">Score: {score}</p>
            <p className="text-slate-500">
              {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Hình ảnh câu hỏi */}
        <div className="mb-6">
          <img
            src={currentQuestion.image}
            alt="Vocabulary to guess"
            className="h-52 w-full rounded-2xl object-cover shadow-lg sm:h-80"
          />
        </div>

        {/* Phần Lựa chọn & Chi tiết từ vựng */}
        <div className="min-h-[220px]">
          {!isAnswered ? (
            // Giao diện chọn đáp án
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={`rounded-xl p-4 text-center text-lg font-semibold shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${getButtonClass(
                    option
                  )}`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            // Giao diện hiển thị chi tiết từ sau khi trả lời
            <div className="animate-fade-in flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-6 text-center">
              <div className="mb-4 flex items-center gap-4">
                <h3 className="text-4xl font-bold text-slate-800">
                  {currentQuestion.correctAnswer}
                </h3>
                <button
                  onClick={() =>
                    handlePronounceWord(currentQuestion.correctAnswer)
                  }
                  className="text-3xl text-sky-500 transition-transform hover:scale-110"
                  aria-label="Pronounce word"
                >
                  <FiVolume2 />
                </button>
              </div>
              <p className="text-lg text-slate-600">{currentQuestion.ipa}</p>
              <p className="my-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                {currentQuestion.type}
              </p>
              <p className="mt-2 text-slate-700">{currentQuestion.meaning}</p>
              <p className="mt-2 text-slate-700 italic">
                "{currentQuestion.example}"
              </p>

              <button
                onClick={handleNextQuestion}
                className="mt-6 w-full rounded-full bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
