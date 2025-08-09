import React, { useState, useEffect } from "react";
import grammarQuestions from "./grammarQuestions";

// --- Phần Âm thanh ---
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
  next: "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3",
};

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function GrammarGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const startGame = () => {
    playSound(sounds.start); // Âm thanh bắt đầu game
    setQuestions(shuffleArray(grammarQuestions));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizOver(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleAnswerClick = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      playSound(sounds.correct); // Âm thanh trả lời đúng
      setScore(score + 1);
    } else {
      playSound(sounds.incorrect); // Âm thanh trả lời sai
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      playSound(sounds.next, 0.3); // Âm thanh chuyển câu
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound(sounds.gameOver); // Âm thanh kết thúc game
      setIsQuizOver(true);
    }
  };

  const getButtonClass = (option) => {
    if (!isAnswered) {
      return "bg-white hover:bg-indigo-100 text-slate-700";
    }
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    const isSelected = option === selectedAnswer;

    if (isCorrect) return "bg-green-500 text-white";
    if (isSelected && !isCorrect) return "bg-red-500 text-white";

    return "bg-white text-slate-700 opacity-60";
  };

  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        Loading Game...
      </div>
    );
  }

  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-indigo-600 text-white text-center p-4">
        <h2 className="text-5xl font-bold">Excellent Grammar!</h2>
        <p className="mt-4 text-2xl">Your final score is:</p>
        <p className="my-8 text-7xl font-extrabold">
          {score} / {questions.length}
        </p>
        <button
          onClick={startGame}
          className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-indigo-600 shadow-xl transition-transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex justify-between text-lg">
          <h1 className="font-bold text-indigo-700">Grammar Gap-fill</h1>
          <p className="font-semibold text-slate-600">Score: {score}</p>
        </div>

        {/* Câu hỏi */}
        <div className="mb-8 rounded-lg bg-slate-100 p-6 text-center text-2xl md:text-3xl text-slate-800">
          <span>{currentQuestion.preBlank}</span>
          <span className="inline-block w-28 border-b-2 border-slate-400 border-dashed align-middle mx-2"></span>
          <span>{currentQuestion.postBlank}</span>
        </div>

        {/* Lựa chọn */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
              className={`rounded-lg p-4 text-xl font-medium shadow-sm transition-all duration-300 ${getButtonClass(
                option
              )}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Bảng giải thích & Nút Next */}
        {isAnswered && (
          <div
            className={`mt-6 rounded-lg p-5 text-white ${
              isCorrect ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">
              {isCorrect ? "Correct! 👍" : "Not quite..."}
            </h3>
            <p className="text-lg">
              <span className="font-bold">Correct answer:</span>{" "}
              {currentQuestion.correctAnswer}
            </p>
            <p className="mt-2 text-base opacity-90">
              <span className="font-bold">Explanation:</span>{" "}
              {currentQuestion.explanation}
            </p>
            <button
              onClick={handleNextQuestion}
              className="mt-5 w-full rounded-lg bg-white px-8 py-3 text-lg font-semibold text-slate-800 shadow-lg transition-transform hover:scale-105"
            >
              Next Question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
