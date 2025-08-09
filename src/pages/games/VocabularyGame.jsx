import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vocabularies from "./vocabularies";

// --- Âm thanh ---
const playSound = (src, volume = 0.5) => {
  const sound = new Audio(src);
  sound.volume = volume;
  sound.play().catch((e) => console.error("Không thể phát âm thanh:", e));
};

const sounds = {
  correct:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3",
  incorrect:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3",
  start:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754664206/gamestart-272829_ccnfqa.mp3",
  gameOver:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1721554585/success-fanfare-trumpets-6185_wkvhpf.mp3",
};

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function VocabularyGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const startGame = () => {
    playSound(sounds.start);
    setQuestions(shuffleArray(vocabularies)); // Lấy 10 câu hỏi ngẫu nhiên để chơi
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizOver(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (isCorrect) {
      playSound(sounds.correct);
      setScore((prev) => prev + 1);
    } else {
      playSound(sounds.incorrect);
    }

    // Tăng thời gian chờ để người dùng đọc thông tin
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        playSound(sounds.gameOver);
        setIsQuizOver(true);
      }
    }, 4000); // Tăng lên 4 giây
  };

  // Hàm lấy class CSS cho các nút lựa chọn
  const getButtonClass = (option) => {
    if (!isAnswered) {
      return "bg-white/80 hover:bg-white text-indigo-800";
    }
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    const isSelected = option === selectedAnswer;

    if (isCorrect) return "bg-green-500 text-white border-green-500";
    if (isSelected && !isCorrect) return "bg-red-500 text-white border-red-500";

    return "bg-gray-300/50 text-gray-500 border-gray-300/50 pointer-events-none";
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Màn hình chờ tải
  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-200">
        <p className="text-2xl font-semibold animate-pulse">Loading Game...</p>
      </div>
    );
  }

  // Màn hình kết thúc game
  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md rounded-2xl bg-white/20 p-8 text-center shadow-2xl backdrop-blur-lg"
        >
          <h2 className="text-5xl font-bold">Game Over!</h2>
          <p className="mt-4 text-2xl">Your final score is:</p>
          <p className="my-6 text-7xl font-extrabold">
            {score} / {questions.length}
          </p>
          <button
            onClick={startGame}
            className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-indigo-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-100"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Màn hình chơi game chính
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 font-sans">
      <div className="w-full max-w-2xl">
        {/* Header: Điểm số và tiến trình */}
        <div className="mb-4 text-white">
          <div className="flex justify-between text-lg font-bold">
            <p>Score: {score}</p>
            <p>
              Question {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
          {/* Thanh tiến trình */}
          <div className="mt-2 h-3 w-full rounded-full bg-white/30">
            <motion.div
              className="h-3 rounded-full bg-green-400"
              initial={{ width: 0 }}
              animate={{
                width: `${(currentQuestionIndex / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Thẻ chính của game */}
        <div className="relative min-h-[550px] w-full rounded-2xl bg-white/90 p-6 shadow-2xl backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {!isAnswered ? (
              // --- Giao diện câu hỏi ---
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 h-64 w-full overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={currentQuestion.image}
                    alt="Vocabulary quiz"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      className={`rounded-lg border-2 border-transparent p-4 text-xl font-semibold shadow-md transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed ${getButtonClass(
                        option
                      )}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              // --- Giao diện hiển thị kết quả và thông tin chi tiết ---
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="flex h-full flex-col justify-center text-center"
              >
                <h2 className="text-4xl font-extrabold text-indigo-700">
                  {currentQuestion.correctAnswer}
                </h2>
                <div className="my-3 flex items-center justify-center gap-4 text-gray-500">
                  <span className="font-mono text-lg">
                    {currentQuestion.ipa}
                  </span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800">
                    {currentQuestion.partOfSpeech}
                  </span>
                </div>

                <div className="mt-4 space-y-4 text-left">
                  <div>
                    <h3 className="font-bold text-gray-700">📖 Giải thích:</h3>
                    <p className="mt-1 text-gray-600">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700">📝 Ví dụ:</h3>
                    <p className="mt-1 italic text-gray-600">
                      "{currentQuestion.example}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
