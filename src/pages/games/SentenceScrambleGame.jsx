import React, { useState, useEffect } from "react";

// Dữ liệu các câu cho trò chơi
const initialSentences = [
  "The quick brown fox jumps over the lazy dog",
  "I love to learn English with fun games",
  "She reads a new book every week",
  "They are playing football in the park",
  "What is your favorite color",
  "The sun always shines brightly in the morning",
  "My brother works as a software engineer",
  "We are planning a trip to the mountains",
  "Can you please help me with my homework",
  "Elephants are the largest land animals",
];

// Hàm xáo trộn một mảng
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function SentenceScrambleGame() {
  // --- Quản lý trạng thái (State) của trò chơi ---
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [wordBank, setWordBank] = useState([]); // Các từ bị xáo trộn
  const [userSentence, setUserSentence] = useState([]); // Câu người dùng đang xây dựng
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [score, setScore] = useState(0);

  // --- Hàm thiết lập một câu hỏi mới ---
  const setupNewSentence = (index) => {
    const correctSentence = sentences[index];
    const words = correctSentence.split(" ");
    setWordBank(shuffleArray(words));
    setUserSentence([]);
    setFeedback(null);
  };

  // --- Bắt đầu hoặc chơi lại trò chơi ---
  const startGame = () => {
    const shuffledSentences = shuffleArray(initialSentences);
    setSentences(shuffledSentences);
    setCurrentSentenceIndex(0);
    setScore(0);
    setIsQuizOver(false);
    // Hàm setupNewSentence sẽ được gọi bởi useEffect bên dưới
  };

  // useEffect để bắt đầu game lần đầu tiên
  useEffect(() => {
    startGame();
  }, []);

  // useEffect để thiết lập câu mới khi index thay đổi
  useEffect(() => {
    if (sentences.length > 0 && currentSentenceIndex < sentences.length) {
      setupNewSentence(currentSentenceIndex);
    }
  }, [currentSentenceIndex, sentences]);

  // --- Xử lý logic trò chơi ---
  const handleSelectWord = (word, index) => {
    // Thêm từ vào câu của người dùng
    setUserSentence([...userSentence, word]);
    // Xóa từ khỏi ngân hàng từ
    const newWordBank = [...wordBank];
    newWordBank.splice(index, 1);
    setWordBank(newWordBank);
    setFeedback(null); // Reset feedback khi người dùng thay đổi câu trả lời
  };

  const handleReturnWord = (word, index) => {
    // Trả từ về ngân hàng từ
    setWordBank([...wordBank, word]);
    // Xóa từ khỏi câu của người dùng
    const newUserSentence = [...userSentence];
    newUserSentence.splice(index, 1);
    setUserSentence(newUserSentence);
    setFeedback(null); // Reset feedback
  };

  const handleCheckAnswer = () => {
    const builtSentence = userSentence.join(" ");
    if (builtSentence === sentences[currentSentenceIndex]) {
      setFeedback("correct");
      setScore(score + 1);
    } else {
      setFeedback("incorrect");
    }
  };

  const handleNext = () => {
    const nextIndex = currentSentenceIndex + 1;
    if (nextIndex < sentences.length) {
      setCurrentSentenceIndex(nextIndex);
    } else {
      setIsQuizOver(true);
    }
  };

  // --- Giao diện (Render) ---
  if (sentences.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        Loading Game...
      </div>
    );
  }

  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-green-500 text-white">
        <h2 className="text-5xl font-bold">Excellent Work!</h2>
        <p className="mt-4 text-2xl">Your final score is:</p>
        <p className="my-8 text-7xl font-extrabold">
          {score} / {sentences.length}
        </p>
        <button
          onClick={startGame}
          className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-green-500 shadow-xl transition-transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-800">
            Sentence Scramble
          </h1>
          <div className="text-right">
            <p className="font-semibold text-blue-600">Score: {score}</p>
            <p className="text-sm text-gray-500">
              Sentence {currentSentenceIndex + 1} of {sentences.length}
            </p>
          </div>
        </div>

        {/* Khu vực người dùng xây dựng câu */}
        <div className="mb-6 flex min-h-[7rem] flex-wrap items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
          {userSentence.length === 0 && (
            <p className="text-gray-400">
              Click words below to build the sentence here...
            </p>
          )}
          {userSentence.map((word, index) => (
            <button
              key={index}
              onClick={() => handleReturnWord(word, index)}
              className="transform cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-md transition hover:-translate-y-1"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Ngân hàng từ (Word Bank) */}
        <div className="mb-6 flex min-h-[7rem] flex-wrap items-center justify-center gap-3 rounded-lg bg-blue-100 p-4">
          {wordBank.map((word, index) => (
            <button
              key={index}
              onClick={() => handleSelectWord(word, index)}
              className="transform cursor-pointer rounded-lg bg-white px-4 py-2 text-lg font-semibold text-gray-700 shadow-md transition hover:-translate-y-1 hover:bg-blue-200"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Nút điều khiển và Feedback */}
        <div className="mt-6 flex items-center justify-between">
          <div className="h-8">
            {feedback === "correct" && (
              <p className="text-xl font-bold text-green-500">🎉 Correct!</p>
            )}
            {feedback === "incorrect" && (
              <p className="text-xl font-bold text-red-500">
                🤔 Not quite, try again!
              </p>
            )}
          </div>

          {feedback === "correct" ? (
            <button
              onClick={handleNext}
              className="rounded-lg bg-green-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleCheckAnswer}
              disabled={userSentence.length === 0}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Check
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
