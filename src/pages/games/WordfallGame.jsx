import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Minimize } from "lucide-react";

// --- Âm thanh ---
const sounds = {
  correct: new Audio(
    "https://cdn.pixabay.com/audio/2022/03/19/audio_19c82b3539.mp3"
  ), // Laser sound
  explosion: new Audio(
    "https://cdn.pixabay.com/audio/2022/03/15/audio_1b3334e569.mp3"
  ),
  start: new Audio(
    "https://cdn.pixabay.com/audio/2022/05/23/audio_a29b35123d.mp3"
  ),
};
Object.values(sounds).forEach((s) => {
  s.volume = 0.4;
});

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play().catch((e) => console.error("Audio play failed:", e));
};

// --- Ngân hàng từ vựng ---
const wordList = [
  "react",
  "javascript",
  "tailwind",
  "component",
  "state",
  "props",
  "hook",
  "effect",
  "virtual",
  "render",
  "build",
  "deploy",
  "learn",
  "code",
  "develop",
  "project",
  "fun",
  "challenge",
  "speed",
  "type",
  "event",
  "node",
  "module",
  "package",
  "context",
  "reducer",
];

const WORD_SPEED_START = 0.1;
const WORD_SPAWN_INTERVAL_START = 2200; // ms

export default function WordfallGame() {
  const [typedValue, setTypedValue] = useState("");
  const [game, setGame] = useState({
    words: [],
    explosions: [],
    score: 0,
    lives: 5,
  });
  const [gameState, setGameState] = useState("ready"); // 'ready', 'playing', 'gameOver'
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const inputRef = useRef(null);
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef();

  // --- Lấy kích thước màn hình ---
  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry)
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
    });
    resizeObserver.observe(gameArea);
    return () => resizeObserver.unobserve(gameArea);
  }, []);

  // --- Xử lý Fullscreen ---
  const toggleFullscreen = useCallback(() => {
    if (!gameAreaRef.current) return;
    if (!document.fullscreenElement) {
      gameAreaRef.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
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

  const startGame = useCallback(() => {
    playSound(sounds.start);
    setGameState("playing");
    setGame({ words: [], explosions: [], score: 0, lives: 5 });
    setTypedValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // --- Game Loop (Logic chính) ---
  useEffect(() => {
    const gameTick = () => {
      if (gameState === "playing") {
        setGame((prev) => {
          let newLives = prev.lives;

          const updatedWords = prev.words.map((word) => ({
            ...word,
            y: word.y + word.speed,
          }));

          const remainingWords = updatedWords.filter((word) => {
            if (word.y > 105) {
              newLives--;
              return false;
            }
            return true;
          });

          if (newLives <= 0 && gameState === "playing") {
            setGameState("gameOver");
          }

          return { ...prev, words: remainingWords, lives: newLives };
        });
      }
      gameLoopRef.current = requestAnimationFrame(gameTick);
    };
    gameLoopRef.current = requestAnimationFrame(gameTick);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState]);

  // --- Logic tạo từ mới ---
  useEffect(() => {
    let spawner;
    if (gameState === "playing") {
      spawner = setInterval(() => {
        const randomWord =
          wordList[Math.floor(Math.random() * wordList.length)];
        const newWord = {
          id: Date.now(),
          text: randomWord,
          y: -10,
          x: Math.random() * (dimensions.width > 120 ? 90 : 80),
          speed: WORD_SPEED_START + Math.random() * 0.1 + game.score / 150,
        };
        setGame((g) => ({ ...g, words: [...g.words, newWord] }));
      }, Math.max(400, WORD_SPAWN_INTERVAL_START - game.score * 25));
    }
    return () => clearInterval(spawner);
  }, [gameState, game.score, dimensions.width]);

  // --- Logic xử lý gõ đúng từ ---
  useEffect(() => {
    if (!typedValue || gameState !== "playing") return;

    setGame((g) => {
      const matchedWord = g.words.find((word) => word.text === typedValue);
      if (matchedWord) {
        playSound(sounds.correct);
        playSound(sounds.explosion);

        const newWords = g.words.filter((word) => word.id !== matchedWord.id);
        const newExplosions = [
          ...g.explosions,
          { id: matchedWord.id, x: matchedWord.x, y: matchedWord.y },
        ];
        const newScore = g.score + matchedWord.text.length;

        setTypedValue("");

        return {
          ...g,
          words: newWords,
          explosions: newExplosions,
          score: newScore,
        };
      }
      return g;
    });
  }, [typedValue, gameState]);

  const handleInputChange = (e) => {
    if (gameState === "playing") {
      setTypedValue(e.target.value.toLowerCase().trim());
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-2 sm:p-4 font-mono">
      <div
        ref={gameAreaRef}
        className="relative w-full h-full bg-black/30 backdrop-blur-sm ring-1 ring-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden"
      >
        <AnimatePresence>
          {(gameState === "ready" || gameState === "gameOver") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 text-white p-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-center">
                Wordfall Challenge
              </h1>
              {gameState === "gameOver" && (
                <div className="mt-8 text-center">
                  <h2 className="text-3xl font-bold text-red-500">
                    Game Over!
                  </h2>
                  <p className="mt-2 text-xl">
                    Your final score is:{" "}
                    <span className="text-yellow-400 font-bold text-3xl">
                      {game.score}
                    </span>
                  </p>
                </div>
              )}
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 rounded-full bg-cyan-400 px-10 py-4 text-2xl font-bold text-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]"
              >
                {gameState === "ready" ? "Start Game" : "Play Again"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="w-full flex justify-between items-center text-white text-lg sm:text-2xl z-20">
          <div>
            Score:{" "}
            <span className="font-bold text-green-400">{game.score}</span>
          </div>
          <div className="flex items-center gap-4">
            <div>
              Lives:{" "}
              <span className="text-red-500 text-3xl">
                {"❤️".repeat(game.lives)}
              </span>
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </header>

        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence>
            {game.words.map((word) => (
              <motion.div
                key={word.id}
                className="absolute text-xl sm:text-2xl text-cyan-300 select-none shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                }}
              >
                {word.text}
              </motion.div>
            ))}
            {game.explosions.map((exp) => (
              <motion.div
                key={exp.id}
                className="absolute text-5xl sm:text-7xl"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onAnimationComplete={() =>
                  setGame((g) => ({
                    ...g,
                    explosions: g.explosions.filter((e) => e.id !== exp.id),
                  }))
                }
                style={{ top: `${exp.y}%`, left: `${exp.x}%` }}
              >
                💥
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="w-full flex-shrink-0 z-20">
          <input
            ref={inputRef}
            type="text"
            value={typedValue}
            onChange={handleInputChange}
            disabled={gameState !== "playing"}
            className="w-full rounded-2xl border-2 border-slate-700 bg-slate-800 p-4 text-center text-2xl sm:text-3xl text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
            placeholder="Type the falling words..."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
      </div>
    </div>
  );
}
