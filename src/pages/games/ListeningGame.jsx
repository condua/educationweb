import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Âm thanh ---
const sounds = {
  correct: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
  ),
  incorrect: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
  ),
  click: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3"
  ),
};
Object.values(sounds).forEach((sound) => (sound.volume = 0.5));

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

const speakWord = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    const voices = speechSynthesis.getVoices();
    utterance.voice =
      voices.find((v) => v.lang.startsWith("en-")) ||
      voices.find((v) => v.lang === "en-US");
    speechSynthesis.speak(utterance);
  }
};

export default function ListeningGame() {
  const [gameState, setGameState] = useState("loading"); // loading, topic_selection, playing, finished
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Tải dữ liệu từ file JSON
  useEffect(() => {
    fetch("/vocabulary.json")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics);
        setGameState("topic_selection");
      })
      .catch((error) => {
        console.error("Failed to load vocabulary data:", error);
        setGameState("error");
      });

    // Tải giọng đọc
    speechSynthesis.getVoices();
  }, []);

  const handleTopicSelect = (topic) => {
    playSound(sounds.click);
    setQuestions(topic.words.sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setGameState("playing");
  };

  const handleAnswerClick = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].word) {
      playSound(sounds.correct);
      setScore(score + 1);
    } else {
      playSound(sounds.incorrect);
    }
  };

  const handleNextQuestion = () => {
    playSound(sounds.click);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameState("finished");
    }
  };

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  // ✅ THAY ĐỔI: Tạo một danh sách các lựa chọn đã được xáo trộn
  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const isCorrect = selectedAnswer === currentQuestion?.word;

  // --- Giao diện các màn hình ---

  if (gameState === "loading" || gameState === "error") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white text-2xl">
        {gameState === "loading"
          ? "Loading Vocabulary..."
          : "Error: Could not load data."}
      </div>
    );
  }

  if (gameState === "topic_selection") {
    return (
      <div className="min-h-screen w-full bg-slate-900 p-4 sm:p-8">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-white mb-8">
          Choose a Topic
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {topics.map((topic) => (
            <motion.button
              key={topic.slug}
              onClick={() => handleTopicSelect(topic)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 text-white text-3xl font-bold hover:bg-violet-600 transition-colors"
            >
              {topic.name}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-white text-center p-4">
        <h2 className="text-5xl font-bold">Topic Complete!</h2>
        <p className="mt-4 text-2xl">Your final score is:</p>
        <p className="my-8 text-7xl font-extrabold">
          {score} / {questions.length}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setGameState("topic_selection")}
            className="rounded-full bg-white px-8 py-4 text-xl font-semibold text-slate-900 shadow-xl transition-transform hover:scale-105"
          >
            Choose Another Topic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 bg-slate-900">
      <div className="w-full max-w-xl rounded-2xl bg-gray-900 p-6 sm:p-8 text-white shadow-2xl shadow-violet-500/20">
        <header className="mb-6 sm:mb-8 flex justify-between items-center text-lg">
          <button
            onClick={() => setGameState("topic_selection")}
            className="text-violet-400 hover:text-violet-300"
          >
            ← Back to Topics
          </button>
          <p>
            Score: <span className="font-bold">{score}</span>
          </p>
        </header>

        {!isAnswered && (
          <div className="text-center">
            <p className="mb-4 text-gray-300">
              Listen carefully and choose the correct word:
            </p>
            <motion.button
              onClick={() => speakWord(currentQuestion.word)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group rounded-full bg-violet-600 p-6 text-white shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 8.464a5 5 0 000 7.072m2.828 9.9a9 9 0 000-12.728M12 12h.01M8 12h.01M16 12h.01"
                />
              </svg>
            </motion.button>
          </div>
        )}

        <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* ✅ THAY ĐỔI: Render từ mảng shuffledOptions */}
          {shuffledOptions.map((option) => {
            let buttonClass = "bg-gray-700 hover:bg-violet-500";
            if (isAnswered) {
              if (option === currentQuestion.word) buttonClass = "bg-green-500";
              else if (option === selectedAnswer) buttonClass = "bg-red-500";
              else buttonClass = "bg-gray-700 opacity-50";
            }
            return (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
                className={`rounded-lg p-4 text-xl font-medium shadow-md transition-all duration-300 ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-lg bg-gray-800 p-5"
            >
              <div className="mb-4 flex items-baseline justify-between border-b border-gray-700 pb-2">
                <h2 className="text-3xl font-bold text-white">
                  {currentQuestion.word}
                </h2>
                <span className="text-lg text-cyan-400 font-mono">
                  {currentQuestion.ipa}
                </span>
              </div>
              <div className="space-y-3 text-lg">
                <p>
                  <strong className="w-24 inline-block text-violet-400">
                    Meaning:
                  </strong>{" "}
                  {currentQuestion.meaning}
                </p>
                <div>
                  <strong className="w-24 inline-block text-violet-400 align-top">
                    Example:
                  </strong>
                  <em className="inline-block max-w-[calc(100%-6.5rem)]">
                    "{currentQuestion.example}"
                  </em>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={handleNextQuestion}
                  className={`w-full rounded-lg px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
                    isCorrect ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {isCorrect ? "Correct! Next →" : "Incorrect. Next →"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
