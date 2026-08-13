import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Minimize } from "lucide-react"; // ✨ THÊM MỚI: Import icon

// --- Âm thanh ---
const playSound = (src, volume = 0.5) => {
  const sound = new Audio(src);
  sound.volume = volume;
  sound.play().catch((e) => console.error("Audio play failed:", e));
};

import allQuestions from "./milionaire";
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

const easyQuestions = allQuestions.slice(0, 40);
const mediumQuestions = allQuestions.slice(40, 65);
const hardQuestions = allQuestions.slice(65, 200);

// Hàm xáo trộn mảng (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function MillionaireGame() {
  const [gameState, setGameState] = useState("ready"); // ready, playing, gameOver, won
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
  // ✨ THÊM MỚI: State và Ref cho chế độ toàn màn hình
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);
  // Dùng useRef để lưu trữ kho câu hỏi và không bị reset giữa các lần render
  const availableQuestionsRef = useRef(null);
  const SAFE_LEVELS = [4, 9]; // làm đậm ở UI: [4,9,14] – 14 là câu cuối

  const getPayout = (gameState, level) => {
    // Đã thắng toàn bộ
    if (gameState === "won") return prizeLevels[0]; // 150.000.000

    // Thua ở level hiện tại -> nhận theo câu đã vượt qua gần nhất
    if (level === 0) return "0";

    const lastCleared = level - 1; // câu gần nhất đã đúng
    // Nếu muốn mốc an toàn:
    const lastSafe = SAFE_LEVELS.filter((i) => i <= lastCleared).pop();
    const paidIndex = lastSafe !== undefined ? lastSafe : lastCleared;

    // prizeLevels đang theo thứ tự: cao -> thấp, nên phải quy đổi chỉ số
    return prizeLevels[prizeLevels.length - 1 - paidIndex];
  };
  // Hàm khởi tạo hoặc reset lại kho câu hỏi
  const resetQuestionPools = () => {
    availableQuestionsRef.current = {
      easy: shuffleArray(easyQuestions),
      medium: shuffleArray(mediumQuestions),
      hard: shuffleArray(hardQuestions),
    };
  };

  // Khởi tạo kho câu hỏi lần đầu tiên
  if (availableQuestionsRef.current === null) {
    resetQuestionPools();
  }
  // Hàm tạo bộ câu hỏi ngẫu nhiên cho mỗi lượt chơi
  const generateAndSetQuestions = useCallback(() => {
    const pools = availableQuestionsRef.current;

    // Kiểm tra nếu không đủ câu hỏi, thì reset lại kho và thông báo
    if (
      pools.easy.length < 5 ||
      pools.medium.length < 5 ||
      pools.hard.length < 5
    ) {
      // alert(
      //   "Bạn đã chơi hết tất cả câu hỏi! Vòng chơi mới sẽ sử dụng lại bộ câu hỏi từ đầu."
      // );
      resetQuestionPools();
    }

    const currentPools = availableQuestionsRef.current;

    // Dùng splice để LẤY và XÓA câu hỏi khỏi kho
    const easyBatch = currentPools.easy.splice(0, 5);
    const mediumBatch = currentPools.medium.splice(0, 5);
    const hardBatch = currentPools.hard.splice(0, 5);

    const questionsForGame = [...easyBatch, ...mediumBatch, ...hardBatch];

    // Đảm bảo luôn có 15 câu hỏi
    if (questionsForGame.length < 15) {
      console.error("Không thể tạo đủ 15 câu hỏi, đang reset lại...");
      resetGame(); // Gọi lại hàm reset game nếu có lỗi
      return;
    }

    setGameQuestions(questionsForGame);
  }, []);

  // Tạo bộ câu hỏi khi game được tải lần đầu
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
      if (!lockedAnswer) {
        setSelectedAnswer(option);
      }
    },
    [lockedAnswer],
  );

  const handleLockAnswer = useCallback(() => {
    if (!selectedAnswer) return;

    setLockedAnswer(selectedAnswer);
    playSound(sounds.suspense, 0.3);

    // Tạo một timeout để mô phỏng sự hồi hộp
    setTimeout(() => {
      const isCorrect = selectedAnswer === currentQuestion.answer;

      if (isCorrect) {
        // Xử lý khi trả lời đúng
        playSound(sounds.correct);

        // Kiểm tra xem đây có phải là câu hỏi cuối cùng không
        if (level === 14) {
          // Nếu đúng, chờ một chút rồi chuyển sang trạng thái thắng cuộc
          setTimeout(() => {
            playSound(sounds.win, 0.5);
            setGameState("won");
          }, 1500);
        } else {
          // Nếu không phải câu cuối, chờ một chút rồi tăng level
          setTimeout(() => {
            setLevel((prevLevel) => prevLevel + 1);
            resetForNextLevel();
          }, 1500);
        }
      } else {
        // Xử lý khi trả lời sai
        playSound(sounds.incorrect);
        setTimeout(() => {
          setGameState("gameOver");
        }, 1500);
      }
    }, 3500); // Thời gian hồi hộp trước khi tiết lộ kết quả
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
            const pct = 50 + Math.floor(Math.random() * 25);
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
  // ✨ THÊM MỚI: Logic xử lý toàn màn hình
  const toggleFullscreen = useCallback(() => {
    const elem = gameContainerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => alert(`Error: ${err.message}`));
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
    generateAndSetQuestions(); // Tạo bộ câu hỏi mới khi chơi lại
    setGameState("playing");
    setLevel(0);
    resetForNextLevel();
    setLifelines({ fiftyFifty: true, audience: true });
  }, [resetForNextLevel, generateAndSetQuestions]);

  const getOptionClass = (option) => {
    if (lockedAnswer) {
      if (option === currentQuestion.answer)
        return "bg-green-600 animate-pulse ring-2 ring-white";
      if (option === lockedAnswer) return "bg-red-600";
    }
    if (selectedAnswer === option) return "bg-orange-500 ring-2 ring-white";
    if (disabledOptions.includes(option))
      return "opacity-40 pointer-events-none";
    return "bg-blue-800 hover:bg-blue-700";
  };

  // Màn hình chờ nếu câu hỏi chưa sẵn sàng
  if (!currentQuestion) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-white font-sans">
        <p className="text-2xl animate-pulse">Đang tải câu hỏi...</p>
      </div>
    );
  }

  // --- Màn hình Bắt đầu / Kết thúc ---
  if (gameState !== "playing") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-white font-sans">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8"
        >
          <h1 className="text-5xl font-bold">Ai Là Triệu Phú</h1>
          {gameState !== "ready" && (
            <div className="mt-6">
              <p className="text-3xl">Bạn đã giành được</p>
              <p className="text-6xl font-bold text-yellow-400 my-4">
                {getPayout(gameState, level)} VNĐ
              </p>
            </div>
          )}
          {gameState === "won" && (
            <p className="text-4xl text-green-400 mt-2">
              XIN CHÚC MỪNG BẠN LÀ TRIỆU PHÚ!
            </p>
          )}
          <button
            onClick={resetGame}
            className="mt-8 rounded-lg bg-blue-600 px-8 py-4 text-2xl hover:bg-blue-500 transition-colors"
          >
            {gameState === "ready" ? "Bắt đầu" : "Chơi lại"}
          </button>
        </motion.div>
      </div>
    );
  }

  // --- Giao diện chơi game chính ---
  return (
    <div
      ref={gameContainerRef}
      className="flex h-screen w-full flex-col lg:flex-row bg-slate-900 text-white font-sans p-2 sm:p-4 gap-4"
    >
      {/* Thang điểm được đưa lên đầu trên mobile, và là sidebar trên desktop */}
      <div className="w-full lg:order-last lg:w-72 lg:flex-shrink-0 lg:hidden">
        <div className="bg-slate-800/60 lg:h-full lg:p-4 rounded-b-lg lg:rounded-lg">
          {/* SỬA 2: Cho phép cuộn ngang trên mobile, và là danh sách dọc trên desktop */}
          <ul className="flex flex-row-reverse gap-x-2 p-2 overflow-x-auto lg:flex-col lg:gap-y-1 lg:overflow-x-hidden lg:p-0">
            {prizeLevels.map((prize, i) => {
              const prizeIndex = prizeLevels.length - 1 - i;
              return (
                <li
                  key={prize}
                  // SỬA 3: Thêm flex-shrink-0 trên mobile để các item không bị co lại
                  className={`flex-shrink-0 p-2 rounded-md text-sm sm:text-base text-right transition-colors duration-300 w-36 lg:w-full
                        ${
                          level === prizeIndex
                            ? "bg-orange-500 animate-pulse"
                            : ""
                        }
                        ${
                          [4, 9, 14].includes(prizeIndex)
                            ? "font-bold text-white"
                            : "text-gray-300"
                        }
                      `}
                >
                  <span className="text-gray-500 mr-2">
                    {prizeLevels.length - i}
                  </span>
                  {prize} VNĐ
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Cột chính (Câu hỏi & Trả lời) */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-around mb-4">
          {Object.entries(lifelines).map(([key, isAvailable]) => (
            <button
              key={key}
              onClick={() => useLifeline(key)}
              disabled={!isAvailable || lockedAnswer}
              className="p-3 text-2xl bg-purple-700 rounded-full disabled:opacity-40 disabled:bg-gray-600 transition-transform hover:scale-110"
            >
              {key === "fiftyFifty" ? "50:50" : "📊"}
            </button>
          ))}{" "}
          {/* ✨ THÊM MỚI: Nút toàn màn hình */}
          <button
            onClick={toggleFullscreen}
            className="p-3 text-2xl bg-purple-700 rounded-full transition-transform hover:scale-110"
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>

        {audiencePoll && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg mb-4 absolute top-16 left-4 right-4 lg:left-auto lg:right-auto z-10 w-auto"
          >
            <h3 className="text-center mb-2">Khán giả bình chọn:</h3>
            <div className="flex justify-around items-end gap-4 h-32">
              {Object.entries(audiencePoll).map(([opt, pct]) => (
                <div
                  key={opt}
                  className="text-center flex flex-col justify-end h-full"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    className="w-8 sm:w-12 bg-blue-500 rounded-t-md"
                  ></motion.div>
                  <p className="text-xs mt-1">{opt.substring(0, 5)}</p>
                  <p className="font-bold text-sm">{pct}%</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setAudiencePoll(null)}
              className="w-full mt-2 bg-red-600/80 text-xs py-1 rounded hover:bg-red-500"
            >
              Đóng
            </button>
          </motion.div>
        )}

        <motion.div
          key={level}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-900/50 ring-2 ring-blue-500 rounded-lg p-6 flex items-center justify-center text-center text-xl sm:text-3xl flex-grow"
        >
          <p>{currentQuestion.question}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <AnimatePresence>
            {currentQuestion.options.map((option, i) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                onClick={() => handleAnswerSelect(option)}
                disabled={lockedAnswer || disabledOptions.includes(option)}
                className={`p-4 rounded-lg text-lg text-left transition-all duration-300 ${getOptionClass(
                  option,
                )}`}
              >
                <span className="font-bold text-orange-400">
                  {String.fromCharCode(65 + i)}:
                </span>{" "}
                {option}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={handleLockAnswer}
          disabled={!selectedAnswer || lockedAnswer}
          className="w-full mt-6 bg-green-700 p-4 rounded-lg text-2xl font-bold hover:bg-green-600 disabled:bg-gray-600 transition-colors"
        >
          CHỐT ĐÁP ÁN
        </button>
      </div>

      {/* Cột phụ (Thang tiền thưởng) */}
      <div className="flex-shrink-0 w-full lg:w-72 bg-slate-800/60 p-4 rounded-lg mt-4 lg:mt-0 hidden lg:block">
        <ul className="flex flex-row-reverse flex-wrap justify-center lg:flex-col gap-1">
          {prizeLevels.map((prize, i) => (
            <motion.li
              key={prize}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: i * 0.05 } }}
              className={`p-2 rounded-md text-sm sm:text-base text-right transition-colors duration-300
                ${
                  level === prizeLevels.length - 1 - i
                    ? "bg-orange-500 animate-pulse"
                    : ""
                }
                ${
                  [4, 9, 14].includes(prizeLevels.length - 1 - i)
                    ? "font-bold text-white"
                    : "text-gray-300"
                }
              `}
            >
              <span className="text-gray-500 mr-2">
                {prizeLevels.length - i}
              </span>
              {prize} VNĐ
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
