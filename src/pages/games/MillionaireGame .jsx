import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import logo from "../../assets/millionaire.png";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Minimize, HelpCircle, Users } from "lucide-react";

import allQuestions from "./milionaire";

// --- Âm thanh ---
const playSound = (src, volume = 0.5) => {
  const sound = new Audio(src);
  sound.volume = volume;
  sound.play().catch((e) => console.error("Audio play failed:", e));
};

const sounds = {
  incorrect:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3",
  correct:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3",
  suspense:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754664209/the-suspenseful-braam-334309_ggotug.mp3",
  start:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754664206/gamestart-272829_ccnfqa.mp3",
  win: "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754926334/winning_ywueii.mp3",
};

// --- Dữ liệu Game ---
const prizeLevels = [
  "100.000",
  "200.000",
  "300.000",
  "500.000",
  "1.000.000",
  "2.000.000",
  "3.000.000",
  "6.000.000",
  "10.000.000",
  "14.000.000",
  "22.000.000",
  "30.000.000",
  "40.000.000",
  "60.000.000",
  "150.000.000",
].reverse();

const easyQuestions = allQuestions.filter((q) => q.level === "Dễ");
const mediumQuestions = allQuestions.filter((q) => q.level === "Trung bình");
const hardQuestions = allQuestions.filter((q) => q.level === "Khó");
const veryHardQuestions = allQuestions.filter((q) => q.level === "Rất khó");

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// ==========================================
// COMPONENT ĐẶC TRƯNG: KHUNG LỤC GIÁC (LOZENGE)
// ==========================================
const HexagonBox = ({ text, letter, state, onClick, disabled, isQuestion }) => {
  let fill = "#000022"; // Nền mặc định (Xanh đen đậm)
  let stroke = "#3b82f6"; // Viền mặc định (Xanh dạ quang)
  let textColor = "text-white";
  let letterColor = "text-yellow-400";
  let glow = "drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]";

  // Các trạng thái màu sắc chuẩn TV
  if (state === "selected") {
    fill = "#d97706"; // Cam
    stroke = "#fde68a"; // Vàng sáng
    glow = "drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]";
  } else if (state === "correct") {
    fill = "#16a34a"; // Xanh lá
    stroke = "#bbf7d0";
    glow = "drop-shadow-[0_0_20px_rgba(34,197,94,1)]";
  } else if (state === "wrong") {
    fill = "#dc2626"; // Đỏ
    stroke = "#fecaca";
    glow = "drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]";
  } else if (state === "disabled") {
    fill = "#000011";
    stroke = "#334155"; // Xám
    textColor = "text-gray-600";
    letterColor = "text-gray-600";
    glow = "";
  }

  // Polygon points cho câu hỏi (to hơn) và đáp án
  const points = isQuestion
    ? "40,2 960,2 998,40 960,78 40,78 2,40"
    : "30,2 470,2 498,30 470,58 30,58 2,30";

  return (
    <div
      className={`relative w-full ${isQuestion ? "h-24 md:h-28" : "h-16 md:h-20"} flex items-center justify-center group ${disabled ? "pointer-events-none" : "cursor-pointer"}`}
      onClick={disabled ? null : onClick}
    >
      <svg
        className={`absolute inset-0 w-full h-full ${glow} transition-all duration-300 ${!disabled && !state && !isQuestion ? "group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,1)]" : ""}`}
        preserveAspectRatio="none"
        viewBox={isQuestion ? "0 0 1000 80" : "0 0 500 60"}
      >
        <polygon
          points={points}
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
          className={`transition-all duration-300 ${!disabled && !state && !isQuestion ? "group-hover:fill-[#1e3a8a]" : ""}`}
        />
        {/* Đường line hai bên mép khung */}
        <line
          x1="0"
          y1={isQuestion ? "40" : "30"}
          x2={isQuestion ? "40" : "30"}
          y2={isQuestion ? "40" : "30"}
          stroke={stroke}
          strokeWidth="3"
        />
        <line
          x1={isQuestion ? "960" : "470"}
          y1={isQuestion ? "40" : "30"}
          x2={isQuestion ? "1000" : "500"}
          y2={isQuestion ? "40" : "30"}
          stroke={stroke}
          strokeWidth="3"
        />
      </svg>

      <div className="relative z-10 flex items-center px-10 md:px-14 w-full h-full">
        {letter && (
          <span className={`font-bold mr-4 text-xl md:text-2xl ${letterColor}`}>
            {letter}:
          </span>
        )}
        <span
          className={`font-medium text-base md:text-xl ${isQuestion ? "text-xl md:text-2xl text-center w-full" : ""} ${textColor}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

// ==========================================
// GAME CHÍNH
// ==========================================
export default function MillionaireGame() {
  const [gameState, setGameState] = useState("ready");
  const [level, setLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lockedAnswer, setLockedAnswer] = useState(null);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    audience: true,
  });
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [audiencePoll, setAudiencePoll] = useState(null);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const gameContainerRef = useRef(null);
  const availableQuestionsRef = useRef(null);
  const SAFE_LEVELS = [4, 9, 14];

  const getPayout = (gameState, level) => {
    if (gameState === "won") return prizeLevels[0];
    if (level === 0) return "0";
    const lastCleared = level - 1;
    const lastSafe = SAFE_LEVELS.filter((i) => i <= lastCleared).pop();
    const paidIndex = lastSafe !== undefined ? lastSafe : lastCleared;
    return prizeLevels[prizeLevels.length - 1 - paidIndex];
  };

  const resetQuestionPools = () => {
    availableQuestionsRef.current = {
      easy: shuffleArray(easyQuestions),
      medium: shuffleArray(mediumQuestions),
      hard: shuffleArray(hardQuestions),
      veryHard: shuffleArray(veryHardQuestions),
    };
  };

  if (availableQuestionsRef.current === null) {
    resetQuestionPools();
  }

  const generateAndSetQuestions = useCallback(() => {
    const pools = availableQuestionsRef.current;
    if (
      pools.easy.length < 5 ||
      pools.medium.length < 5 ||
      pools.hard.length < 3 ||
      pools.veryHard.length < 2
    ) {
      resetQuestionPools();
    }
    const currentPools = availableQuestionsRef.current;
    const questionsForGame = [
      ...currentPools.easy.splice(0, 5),
      ...currentPools.medium.splice(0, 5),
      ...currentPools.hard.splice(0, 3),
      ...currentPools.veryHard.splice(0, 2),
    ];
    if (questionsForGame.length < 15) return resetGame();
    setGameQuestions(questionsForGame);
  }, []);

  useEffect(() => {
    generateAndSetQuestions();
  }, [generateAndSetQuestions]);

  const currentQuestion = useMemo(
    () => gameQuestions[level],
    [gameQuestions, level],
  );

  const resetForNextLevel = useCallback(() => {
    setSelectedAnswer(null);
    setLockedAnswer(null);
    setDisabledOptions([]);
    setAudiencePoll(null);
  }, []);

  const handleAnswerSelect = useCallback(
    (option) => {
      if (!lockedAnswer) setSelectedAnswer(option);
    },
    [lockedAnswer],
  );

  const handleLockAnswer = useCallback(() => {
    if (!selectedAnswer) return;
    setLockedAnswer(selectedAnswer);
    playSound(sounds.suspense, 0.3);

    setTimeout(() => {
      const isCorrect = selectedAnswer === currentQuestion.answer;
      if (isCorrect) {
        playSound(sounds.correct);
        if (level === 14) {
          setTimeout(() => {
            playSound(sounds.win, 0.5);
            setGameState("won");
          }, 2000);
        } else {
          setTimeout(() => {
            setLevel((prevLevel) => prevLevel + 1);
            resetForNextLevel();
          }, 2000);
        }
      } else {
        playSound(sounds.incorrect);
        setTimeout(() => setGameState("gameOver"), 2000);
      }
    }, 3500); // 3.5s hồi hộp
  }, [selectedAnswer, currentQuestion, level, resetForNextLevel]);

  const useLifeline = useCallback(
    (type) => {
      if (type === "fiftyFifty" && lifelines.fiftyFifty) {
        const incorrect = currentQuestion.options.filter(
          (o) => o !== currentQuestion.answer,
        );
        const toRemove = incorrect.sort(() => 0.5 - Math.random()).slice(0, 2);
        setDisabledOptions(toRemove);
        setLifelines((l) => ({ ...l, fiftyFifty: false }));
      }
      if (type === "audience" && lifelines.audience) {
        const poll = {};
        const correctAnswer = currentQuestion.answer;
        let remainingPct = 100;
        const options = currentQuestion.options.filter(
          (o) => !disabledOptions.includes(o),
        );

        options.forEach((opt) => {
          if (opt === correctAnswer) {
            const pct = 40 + Math.floor(Math.random() * 35); // Khán giả có thể đúng hoặc sai, tỷ lệ đúng cao
            poll[opt] = pct;
            remainingPct -= pct;
          }
        });
        options
          .filter((o) => o !== correctAnswer)
          .forEach((opt, idx, arr) => {
            if (idx === arr.length - 1) {
              poll[opt] = remainingPct;
            } else {
              const pct = Math.floor(
                (Math.random() * remainingPct) / (arr.length - idx),
              );
              poll[opt] = pct;
              remainingPct -= pct;
            }
          });
        setAudiencePoll(poll);
        setLifelines((l) => ({ ...l, audience: false }));
      }
    },
    [lifelines, currentQuestion, disabledOptions],
  );

  const toggleFullscreen = useCallback(() => {
    const elem = gameContainerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const resetGame = useCallback(() => {
    playSound(sounds.start);
    generateAndSetQuestions();
    setGameState("playing");
    setLevel(0);
    resetForNextLevel();
    setLifelines({ fiftyFifty: true, audience: true });
  }, [resetForNextLevel, generateAndSetQuestions]);

  const getAnswerState = (option) => {
    if (disabledOptions.includes(option)) return "disabled";
    if (lockedAnswer) {
      if (option === currentQuestion.answer) return "correct";
      if (option === lockedAnswer) return "wrong";
      return null;
    }
    if (selectedAnswer === option) return "selected";
    return null;
  };

  if (!currentQuestion) {
    return (
      <div className="h-screen w-full bg-[#000011] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // --- MÀN HÌNH CHỜ / KẾT THÚC ---
  if (gameState !== "playing") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_center,_#0a2e5c_0%,_#000011_100%)] text-white font-sans">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center z-10"
        >
          <div className="w-60 h-60 mx-auto mb-8  rounded-full flex items-center justify-center border-4 border-yellow-200 shadow-[0_0_50px_rgba(250,204,21,0.8)]">
            <img
              src={logo}
              alt="Ai Là Triệu Phú"
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-lg mb-8 uppercase tracking-widest">
            Ai Là Triệu Phú
          </h1>

          {gameState !== "ready" && (
            <div className="mb-10">
              <p className="text-xl text-blue-300 uppercase tracking-widest">
                Tiền thưởng nhận được
              </p>
              <p className="text-6xl font-bold text-yellow-400 mt-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                {getPayout(gameState, level)}
              </p>
            </div>
          )}

          <button
            onClick={resetGame}
            className="relative px-10 py-4 font-bold text-2xl uppercase tracking-widest rounded-full bg-gradient-to-b from-blue-500 to-blue-900 border-2 border-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all transform hover:scale-105"
          >
            {gameState === "ready" ? "Chơi ngay" : "Chơi lại"}
          </button>
        </motion.div>

        {/* Vòng tròn nền trang trí */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/20 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-400/20 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>
      </div>
    );
  }

  // --- MÀN HÌNH CHƠI ---
  return (
    <div
      ref={gameContainerRef}
      className="flex w-full flex-col lg:flex-row bg-[radial-gradient(circle_at_center,_#0a2e5c_0%,_#000011_100%)] text-white font-sans overflow-hidden"
    >
      {/* KHU VỰC TRUNG TÂM (CÂU HỎI & ĐÁP ÁN) */}
      <div className="flex flex-col flex-grow relative justify-between pb-8 pt-4 px-2 md:px-10 lg:pl-12 lg:pr-6">
        {/* Header - Lifelines */}
        <div className="flex justify-between items-center z-20">
          <div className="flex gap-4">
            <button
              onClick={() => useLifeline("fiftyFifty")}
              disabled={!lifelines.fiftyFifty || lockedAnswer}
              className={`w-14 h-10 md:w-20 md:h-12 border-2 rounded-[50%] flex items-center justify-center font-bold text-lg md:text-xl shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all
                ${lifelines.fiftyFifty ? "border-blue-400 bg-blue-900/80 text-white hover:bg-blue-600" : "border-gray-600 bg-transparent text-gray-600 grayscale pointer-events-none"}`}
            >
              50:50
            </button>
            <button
              onClick={() => useLifeline("audience")}
              disabled={!lifelines.audience || lockedAnswer}
              className={`w-14 h-10 md:w-20 md:h-12 border-2 rounded-[50%] flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all
                ${lifelines.audience ? "border-blue-400 bg-blue-900/80 text-white hover:bg-blue-600" : "border-gray-600 bg-transparent text-gray-600 grayscale pointer-events-none"}`}
            >
              <Users size={24} />
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 text-gray-400"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>

        {/* Khán giả bình chọn */}
        {audiencePoll && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-blue-950/90 border-2 border-blue-500 rounded-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50 w-[90%] max-w-sm"
          >
            <h3 className="text-center text-blue-200 mb-4 font-bold uppercase tracking-widest text-sm">
              Khán giả trường quay
            </h3>
            <div className="flex justify-center items-end gap-6 h-32 border-b border-blue-800 pb-2">
              {Object.entries(audiencePoll).map(([opt, pct], index) => (
                <div
                  key={opt}
                  className="flex flex-col items-center justify-end h-full w-10"
                >
                  <span className="text-xs mb-1 font-mono text-blue-100">
                    {pct}%
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    className="w-full bg-blue-400 rounded-t-sm shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                  ></motion.div>
                  <span className="mt-2 font-bold text-yellow-400">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setAudiencePoll(null)}
              className="w-full mt-4 bg-red-600/80 hover:bg-red-500 text-sm py-2 rounded font-bold uppercase tracking-wider"
            >
              Đóng
            </button>
          </motion.div>
        )}

        {/* Khu vực Question & Answers */}
        <div className="relative flex flex-col justify-end gap-6 w-full max-w-5xl mx-auto mt-auto">
          {/* Câu hỏi */}
          <div className="relative w-full z-10">
            <HexagonBox text={currentQuestion.question} isQuestion={true} />
          </div>

          {/* Đáp án */}
          <div className="relative w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 mt-4 md:mt-8">
            <AnimatePresence>
              {currentQuestion.options.map((option, i) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: i * 0.1 } }}
                >
                  <HexagonBox
                    text={option}
                    letter={String.fromCharCode(65 + i)}
                    state={getAnswerState(option)}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={lockedAnswer}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Đường gạch ngang ở giữa các đáp án (Chỉ hiện trên desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[3px] bg-blue-600 -z-10 -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          </div>
        </div>

        {/* Nút Chốt */}
        <div className="mt-8 flex justify-center h-16 z-20">
          <AnimatePresence>
            {selectedAnswer && !lockedAnswer && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={handleLockAnswer}
                className="px-10 py-3 rounded-full bg-yellow-500 text-black font-extrabold uppercase tracking-widest text-lg hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.6)]"
              >
                Chốt Đáp Án!
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* THANG TIỀN THƯỞNG (SIDEBAR - Cột phải) */}
      <div className="hidden lg:flex flex-col w-[300px] flex-shrink-0 bg-black/60 border-l border-blue-900/50 p-6 z-20">
        <div className="w-full ml-2 mb-5 flex items-center justify-center">
          <img src={logo} className="w-32 h-32" />
        </div>
        <ul className="flex flex-col gap-y-1 flex-grow justify-end font-mono">
          {prizeLevels.map((prize, i) => {
            const prizeIndex = prizeLevels.length - 1 - i;
            const isCurrent = level === prizeIndex;
            const isSafe = SAFE_LEVELS.includes(prizeIndex);
            const isPassed = level > prizeIndex;

            return (
              <li
                key={prize}
                className={`flex items-center px-4 py-[6px] rounded-lg transition-all duration-300
                  ${
                    isCurrent
                      ? "bg-yellow-500 text-black font-extrabold scale-105 shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                      : isPassed
                        ? "text-blue-500 opacity-60"
                        : isSafe
                          ? "text-white font-bold"
                          : "text-yellow-500/80"
                  }
                `}
              >
                <div className="w-8 text-left">{prizeLevels.length - i}</div>
                <div className="flex-grow text-right text-lg">
                  {isSafe && !isCurrent ? (
                    <span className="mr-2 text-white">♦</span>
                  ) : null}
                  {prize}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* THANG TIỀN THƯỞNG CHO MOBILE (Dải ngang phía dưới) */}
      <div className="lg:hidden w-full h-14 bg-black/80 border-t border-blue-900/50 flex items-center z-20">
        <ul className="flex flex-row-reverse overflow-x-auto w-full no-scrollbar items-center px-2 py-1 gap-2">
          {prizeLevels.map((prize, i) => {
            const prizeIndex = prizeLevels.length - 1 - i;
            const isCurrent = level === prizeIndex;
            const isSafe = SAFE_LEVELS.includes(prizeIndex);
            const isPassed = level > prizeIndex;

            return (
              <li
                key={prize}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-mono flex items-center
                  ${
                    isCurrent
                      ? "bg-yellow-500 text-black font-bold shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                      : isPassed
                        ? "bg-blue-900/40 text-blue-400"
                        : isSafe
                          ? "bg-white/10 text-white font-bold"
                          : "text-yellow-500/70"
                  }
                `}
              >
                <span className="mr-1">{prizeLevels.length - i}.</span> {prize}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
