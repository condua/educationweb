import React, { useState, useEffect } from "react";
import vocabularies from "./vocabularies";

// --- Phần Âm thanh ---
// Hàm tiện ích để phát âm thanh
const playSound = (src, volume = 0.5) => {
  const sound = new Audio(src);
  sound.volume = volume;
  sound.play().catch((e) => console.error("Không thể phát âm thanh:", e));
};

// Lưu trữ các file âm thanh
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

// Hàm xáo trộn câu hỏi
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function VocabularyGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const startGame = () => {
    playSound(sounds.start); // <--- Âm thanh khi bắt đầu
    setQuestions(shuffleArray(vocabularies));
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
      playSound(sounds.correct); // <--- Âm thanh khi trả lời đúng
      setScore(score + 1);
    } else {
      playSound(sounds.incorrect); // <--- Âm thanh khi trả lời sai
    }

    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        playSound(sounds.gameOver); // <--- Âm thanh khi kết thúc game
        setIsQuizOver(true);
      }
    }, 1500);
  };

  const getButtonClass = (option) => {
    if (!isAnswered) {
      return "bg-white hover:bg-sky-100";
    }

    const isCorrectAnswer =
      option === questions[currentQuestionIndex].correctAnswer;
    const isSelectedAnswer = option === selectedAnswer;

    if (isCorrectAnswer) {
      return "bg-green-500 text-white";
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return "bg-red-500 text-white";
    }
    return "bg-white opacity-60";
  };

  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl">Loading Game...</p>
      </div>
    );
  }

  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-sky-500 text-white">
        <h2 className="text-5xl font-bold">Game Over!</h2>
        <p className="mt-4 text-2xl">Your final score is:</p>
        <p className="my-8 text-7xl font-extrabold">
          {score} / {questions.length}
        </p>
        <button
          onClick={startGame}
          className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-sky-500 shadow-xl transition-transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex justify-between text-lg font-semibold">
          <p className="text-sky-600">Score: {score}</p>
          <p className="text-gray-500">
            Question {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        <div className="mb-8">
          <img
            src={currentQuestion.image}
            alt="Quiz"
            className="h-64 w-full rounded-lg object-cover shadow-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
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
      </div>
    </div>
  );
}
