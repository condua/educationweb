import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialSentences } from "./initialSentences"; // Import dữ liệu mới

// --- Âm thanh ---
const sounds = {
  select: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3"
  ),
  correct: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
  ),
  incorrect: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
  ),
  win: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754926334/winning_ywueii.mp3"
  ),
};
Object.values(sounds).forEach((s) => (s.volume = 0.5));

// --- Component chính ---
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function SentenceScrambleGame() {
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [wordBank, setWordBank] = useState([]);
  const [userSentence, setUserSentence] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(() => {
    const savedSoundSetting = localStorage.getItem("sentenceScrambleSound");
    return savedSoundSetting ? JSON.parse(savedSoundSetting) : true;
  });

  const playSound = useCallback(
    (sound) => {
      if (isSoundOn) {
        sound.currentTime = 0;
        sound.play();
      }
    },
    [isSoundOn]
  );

  useEffect(() => {
    localStorage.setItem("sentenceScrambleSound", JSON.stringify(isSoundOn));
  }, [isSoundOn]);

  const setupNewSentence = useCallback((index, sentenceList) => {
    const currentData = sentenceList[index];
    if (!currentData) return;
    // ✅ SỬA LỖI: Truy cập vào thuộc tính .sentence
    const words = currentData.sentence.split(" ").filter((word) => word);
    setWordBank(shuffleArray(words));
    setUserSentence([]);
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    const shuffledSentences = shuffleArray(initialSentences);
    setSentences(shuffledSentences);
    setCurrentSentenceIndex(0);
    setScore(0);
    setIsQuizOver(false);
    setupNewSentence(0, shuffledSentences);
  }, [setupNewSentence]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleSelectWord = (word, index) => {
    playSound(sounds.select);
    setUserSentence([...userSentence, word]);
    const newWordBank = [...wordBank];
    newWordBank.splice(index, 1);
    setWordBank(newWordBank);
    setFeedback(null);
  };

  const handleReturnWord = (word, index) => {
    if (feedback === "correct") return;
    playSound(sounds.select);
    setWordBank([...wordBank, word]);
    const newUserSentence = [...userSentence];
    newUserSentence.splice(index, 1);
    setUserSentence(newUserSentence);
    setFeedback(null);
  };

  const handleCheckAnswer = () => {
    const builtSentence = userSentence.join(" ").replace(/[.,!?]/g, "");
    // ✅ SỬA LỖI: Truy cập vào thuộc tính .sentence để so sánh
    const correctSentence = sentences[currentSentenceIndex].sentence.replace(
      /[.,!?]/g,
      ""
    );

    if (builtSentence === correctSentence) {
      playSound(sounds.correct);
      setFeedback("correct");
      setScore(score + 1);
    } else {
      playSound(sounds.incorrect);
      setFeedback("incorrect");
    }
  };

  const handleNext = () => {
    playSound(sounds.select);
    const nextIndex = currentSentenceIndex + 1;
    if (nextIndex < sentences.length) {
      setCurrentSentenceIndex(nextIndex);
      setupNewSentence(nextIndex, sentences);
    } else {
      playSound(sounds.win);
      setIsQuizOver(true);
    }
  };

  if (sentences.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-green-800 via-slate-900 to-green-900 text-white p-4">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold">Excellent Work!</h2>
          <p className="mt-4 text-2xl">Your final score is:</p>
          <p className="my-8 text-7xl font-bold">
            {score} / {sentences.length}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-slate-900 shadow-lg"
          >
            Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 font-sans">
      <div className="w-full max-w-3xl rounded-2xl bg-black/30 backdrop-blur-sm ring-1 ring-white/10 p-6 md:p-8 shadow-2xl">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Sentence Scramble
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-white">Score: {score}</p>
              <p className="text-sm text-slate-400">
                Sentence {currentSentenceIndex + 1} of {sentences.length}
              </p>
            </div>
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="text-2xl"
            >
              {isSoundOn ? "🔊" : "🔇"}
            </button>
          </div>
        </header>

        <div className="mb-6 flex min-h-[8rem] flex-wrap items-center gap-3 rounded-lg border-2 border-dashed border-slate-600 bg-black/20 p-4">
          <AnimatePresence>
            {userSentence.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-500"
              >
                Click words below to build the sentence here...
              </motion.p>
            )}
            {userSentence.map((word, index) => (
              <motion.button
                key={`${word}-${index}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => handleReturnWord(word, index)}
                className={`rounded-lg bg-cyan-500 px-4 py-2 text-lg font-semibold text-slate-900 shadow-md ${
                  feedback === "correct" ? "cursor-default" : "cursor-pointer"
                }`}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="mb-6 flex min-h-[8rem] flex-wrap items-center justify-center gap-3 rounded-lg bg-black/20 p-4">
          <AnimatePresence>
            {wordBank.map((word, index) => (
              <motion.button
                key={`${word}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectWord(word, index)}
                className="cursor-pointer rounded-lg bg-slate-700 px-4 py-2 text-lg font-semibold text-white shadow-md"
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* ✨ KHU VỰC ĐIỀU KHIỂN VÀ PHẢN HỒI ĐÃ ĐƯỢC NÂNG CẤP */}
        <div className="mt-6 min-h-[150px]">
          <AnimatePresence mode="wait">
            {feedback === "correct" ? (
              <motion.div
                key="correct-feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-600/30 ring-1 ring-green-500 text-white"
              >
                <h3 className="text-xl font-bold text-green-300">
                  🎉 Correct!
                </h3>
                <p className="mt-2 text-slate-300">
                  <strong className="text-white">Nghĩa:</strong> "
                  {sentences[currentSentenceIndex].meaning}"
                </p>
                <p className="mt-2 text-slate-300">
                  <strong className="text-white">Điểm ngữ pháp:</strong>{" "}
                  {sentences[currentSentenceIndex].grammarPoint}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full rounded-lg bg-slate-100 py-3 text-lg font-bold text-slate-900 transition-colors hover:bg-white"
                >
                  Next Sentence →
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="check-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between"
              >
                <div>
                  {feedback === "incorrect" && (
                    <p className="text-2xl font-bold text-red-400">
                      🤔 Not quite, try again!
                    </p>
                  )}
                </div>
                <button
                  onClick={handleCheckAnswer}
                  disabled={
                    userSentence.length === 0 || feedback === "incorrect"
                  }
                  className="rounded-lg bg-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:bg-slate-600"
                >
                  Check
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
