import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { grammarTopics } from "./grammarQuestions"; // Import dữ liệu từ file riêng

// --- Âm thanh ---
const sounds = {
  correct: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
  ),
  incorrect: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
  ),
  start: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754664206/gamestart-272829_ccnfqa.mp3"
  ),
  gameOver: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1721554585/success-fanfare-trumpets-6185_wkvhpf.mp3"
  ),
  next: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3"
  ),
};
Object.values(sounds).forEach((s) => (s.volume = 0.5));

const playSound = (sound, volume) => {
  try {
    if (!sound) return;
    if (typeof volume === "number") sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch (_) {}
};

// Trộn Fisher–Yates (ổn định hơn sort+random)
const shuffleArray = (array) => {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// --- Component Progress Bar ---
const ProgressBar = ({ current, total }) => {
  const percentage = total ? (current / total) * 100 : 0;
  return (
    <div
      className="w-full bg-slate-700/50 rounded-full h-2.5 relative overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-lime-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default function GrammarGame() {
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(false);

  const [gameState, setGameState] = useState("topic_selection"); // topic_selection, playing, finished
  const [activeTopic, setActiveTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  // Phím tắt: 1–4 / A–D để chọn; Enter để Next
  useEffect(() => {
    if (gameState !== "playing") return;
    const onKeyDown = (e) => {
      const key = e.key?.toLowerCase();
      if (!currentQuestion) return;

      // số 1..n
      const digit = parseInt(key, 10);
      if (
        !isNaN(digit) &&
        digit >= 1 &&
        digit <= currentQuestion.options.length
      ) {
        e.preventDefault();
        handleAnswerClick(currentQuestion.options[digit - 1]);
        return;
      }

      // a..f
      const idx = ["a", "b", "c", "d", "e", "f"].indexOf(key);
      if (idx > -1 && idx < currentQuestion.options.length) {
        e.preventDefault();
        handleAnswerClick(currentQuestion.options[idx]);
        return;
      }

      if ((key === "enter" || key === " ") && isAnswered) {
        e.preventDefault();
        handleNextQuestion();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameState, currentQuestion, isAnswered]);

  const safePlay = useCallback(
    (audio, vol) => {
      if (muted) return;
      playSound(audio, vol);
    },
    [muted]
  );

  const handleTopicSelect = (topic) => {
    safePlay(sounds.start);
    setActiveTopic(topic);
    setQuestions(shuffleArray(topic.questions));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setGameState("playing");
    window?.scrollTo?.({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handleAnswerClick = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      safePlay(sounds.correct);
      setScore((s) => s + 1);
      try {
        navigator.vibrate?.(10);
      } catch (_) {}
    } else {
      safePlay(sounds.incorrect);
      try {
        navigator.vibrate?.(30);
      } catch (_) {}
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      safePlay(sounds.next, 0.3);
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
      window?.scrollTo?.({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    } else {
      safePlay(sounds.gameOver);
      setGameState("finished");
    }
  };

  // ---------------- Topic selection ----------------
  if (gameState === "topic_selection") {
    return (
      <div className="min-h-dvh w-full bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-4 font-sans flex flex-col items-center justify-center pb-[env(safe-area-inset-bottom)]">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
              Grammar Gym
            </span>{" "}
            💪
          </h1>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">
            Choose a muscle group (grammar topic) to train your English skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {grammarTopics.map((topic) => (
            <motion.button
              key={topic.slug}
              onClick={() => handleTopicSelect(topic)}
              initial={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 text-xl font-semibold hover:bg-cyan-500/10 hover:ring-cyan-400 transition-all flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="text-4xl" aria-hidden>
                {topic.icon}
              </span>
              <span className="truncate">{topic.topic}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 text-xs text-slate-400">
          Tip: bạn có thể trả lời bằng phím 1–4 / A–D
        </div>
      </div>
    );
  }

  // ---------------- Finished ----------------
  if (gameState === "finished") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-slate-900 text-white text-center p-4 pb-[env(safe-area-inset-bottom)]">
        <motion.div
          initial={
            reduceMotion ? { opacity: 1, scale: 1 } : { scale: 0.7, opacity: 0 }
          }
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-2xl bg-slate-800/50 ring-1 ring-white/10 p-8 shadow-lg">
            <h2 className="text-5xl font-bold">Workout Complete!</h2>
            <p className="mt-4 text-2xl">
              Your score for{" "}
              <span className="text-cyan-400">{activeTopic?.topic}</span>:
            </p>
            <p className="my-8 text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
              {score} / {questions.length}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                onClick={() => handleTopicSelect(activeTopic)}
                className="rounded-full bg-cyan-500 px-8 py-4 text-xl font-semibold text-slate-900 shadow-lg shadow-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Làm lại
              </motion.button>
              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                onClick={() => setGameState("topic_selection")}
                className="rounded-full bg-white/10 px-8 py-4 text-xl font-semibold text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Trở về trang chủ
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------------- Playing ----------------
  return (
    <div className="flex min-h-dvh items-center justify-center p-4 bg-slate-900 text-white font-sans pb-24 sm:pb-8 pb-[env(safe-area-inset-bottom)]">
      <div className="w-full max-w-2xl">
        <header className="mb-6 flex justify-between items-start sm:items-center gap-3 text-lg">
          <div>
            <button
              onClick={() => setGameState("topic_selection")}
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Back to topics"
            >
              ← Topics
            </button>
            <h1 className="mt-2 font-bold text-cyan-400 text-2xl">
              {activeTopic?.topic}
            </h1>
            <p className="text-slate-400 text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setMuted((m) => !m)}
                className="text-xs px-2 py-1 rounded-full bg-white/10 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-pressed={muted}
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? "🔇" : "🔈"}
              </button>
              <div
                className="inline-flex flex-col items-end"
                aria-live="polite"
              >
                <p className="font-semibold text-2xl text-lime-400">{score}</p>
                <p className="text-slate-400 text-xs">SCORE</p>
              </div>
            </div>
          </div>
        </header>

        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 rounded-lg bg-black/20 p-6 text-center text-2xl md:text-3xl text-slate-100 min-h-[10rem] flex items-center justify-center">
                <p>
                  <span>{currentQuestion?.preBlank}</span>
                  <span
                    className="inline-block w-24 md:w-32 border-b-2 border-slate-500 border-dashed align-middle mx-2"
                    aria-hidden
                  ></span>
                  <span>{currentQuestion?.postBlank}</span>
                </p>
              </div>

              {/* Answer options */}
              <div
                role="radiogroup"
                aria-label="Answer choices"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {currentQuestion?.options?.map((option) => {
                  const isTheCorrectAnswer =
                    option === currentQuestion.correctAnswer;
                  const isTheSelectedAnswer = option === selectedAnswer;
                  let buttonClass =
                    "bg-slate-700/80 hover:bg-slate-600/80 text-white";
                  if (isAnswered) {
                    if (isTheCorrectAnswer)
                      buttonClass =
                        "bg-green-500 text-white ring-2 ring-white/80";
                    else if (isTheSelectedAnswer)
                      buttonClass = "bg-red-500 text-white";
                    else
                      buttonClass = "bg-slate-700/50 text-slate-400 opacity-60";
                  }
                  return (
                    <motion.button
                      key={option}
                      role="radio"
                      aria-checked={isTheSelectedAnswer}
                      whileHover={isAnswered ? undefined : { scale: 1.03 }}
                      whileTap={isAnswered ? undefined : { scale: 0.97 }}
                      onClick={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                      className={`rounded-lg p-4 text-xl font-medium shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${buttonClass}`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="min-h-[200px] mt-6">
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={
                  reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }
                }
                animate={
                  reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }
                }
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`rounded-lg p-5 text-white overflow-hidden ${
                  isCorrect
                    ? "bg-green-600/20 ring-1 ring-green-500"
                    : "bg-red-600/20 ring-1 ring-red-500"
                }`}
                role="status"
                aria-live="polite"
              >
                <h3 className="text-xl font-bold mb-2">
                  {isCorrect ? "Correct! 👍" : "Not quite..."}
                </h3>
                <p className="text-lg">
                  <span className="font-bold">Correct answer:</span>{" "}
                  {currentQuestion?.correctAnswer}
                </p>
                {currentQuestion?.explanation && (
                  <p className="mt-2 text-base opacity-90">
                    <span className="font-bold">Explanation:</span>{" "}
                    {currentQuestion.explanation}
                  </p>
                )}
                <button
                  onClick={handleNextQuestion}
                  className="mt-5 w-full rounded-lg bg-white px-8 py-3 text-lg font-semibold text-slate-800 shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Next Question →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky Next trên mobile cho ergonomics */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 sm:hidden p-3 bg-gradient-to-t from-slate-900/90 to-transparent backdrop-blur"
          >
            <div className="mx-auto max-w-2xl">
              <button
                onClick={handleNextQuestion}
                className="w-full rounded-xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
