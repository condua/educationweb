import React, { useState, useEffect } from "react";

// --- Dữ liệu câu hỏi ---
// Mỗi câu hỏi có phần trước và sau chỗ trống, các lựa chọn, đáp án và giải thích.
const initialQuestions = [
  {
    preBlank: "The cat is ",
    postBlank: " on the mat.",
    options: ["sit", "sits", "sitting", "sat"],
    correctAnswer: "sitting",
    explanation:
      "Sử dụng thì Hiện tại Tiếp diễn (is + V-ing) để diễn tả hành động đang xảy ra.",
  },
  {
    preBlank: "I haven't seen him ",
    postBlank: " last year.",
    options: ["for", "since", "ago", "in"],
    correctAnswer: "since",
    explanation:
      "'Since' được dùng với một mốc thời gian cụ thể (last year). 'For' được dùng với một khoảng thời gian (for two years).",
  },
  {
    preBlank: "She is the ",
    postBlank: " student in the class.",
    options: ["tall", "taller", "tallest", "more tall"],
    correctAnswer: "tallest",
    explanation:
      "Dùng dạng so sánh nhất (the + adj-est) để chỉ người cao nhất trong một nhóm.",
  },
  {
    preBlank: "If I were you, I ",
    postBlank: " study harder.",
    options: ["will", "would", "can", "should have"],
    correctAnswer: "would",
    explanation:
      "Đây là câu điều kiện loại 2 (If + S + V2/Ved, S + would + V), diễn tả một giả định không có thật ở hiện tại.",
  },
  {
    preBlank: "My keys are ",
    postBlank: " the table.",
    options: ["in", "at", "on", "under"],
    correctAnswer: "on",
    explanation: "Sử dụng giới từ 'on' để chỉ vị trí trên một bề mặt.",
  },
  {
    preBlank: "He bought ",
    postBlank: " new car yesterday.",
    options: ["a", "an", "the", "(no article)"],
    correctAnswer: "a",
    explanation:
      "Sử dụng mạo từ 'a' trước một danh từ đếm được số ít (car) được nhắc đến lần đầu tiên.",
  },
  {
    preBlank: "There isn't ",
    postBlank: " milk left in the fridge.",
    options: ["some", "any", "many", "a lot"],
    correctAnswer: "any",
    explanation: "'Any' thường được dùng trong câu phủ định và câu hỏi.",
  },
  {
    preBlank: "You speak English very ",
    postBlank: ".",
    options: ["good", "well", "best", "better"],
    correctAnswer: "well",
    explanation:
      "Dùng trạng từ 'well' để bổ nghĩa cho động từ 'speak'. 'Good' là một tính từ.",
  },
  {
    preBlank: "The train ",
    postBlank: " at 8 AM tomorrow.",
    options: ["leave", "is leaving", "left", "has left"],
    correctAnswer: "is leaving",
    explanation:
      "Sử dụng thì Hiện tại Tiếp diễn để nói về một lịch trình hoặc kế hoạch chắc chắn trong tương lai gần.",
  },
  {
    preBlank: "This book was written ",
    postBlank: " a famous author.",
    options: ["by", "with", "from", "for"],
    correctAnswer: "by",
    explanation:
      "Trong câu bị động, 'by' được dùng để chỉ tác nhân thực hiện hành động.",
  },
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function GrammarGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const startGame = () => {
    setQuestions(shuffleArray(initialQuestions));
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
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
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
    <div className="flex min-h-screen items-center justify-center p-4">
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
