import React, { useState, useEffect, useRef, useCallback } from "react";

// Danh sách từ vựng
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

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const WORD_SPEED_START = 0.5;
const WORD_SPAWN_INTERVAL_START = 2000; // ms

function WordfallGame() {
  const [typedValue, setTypedValue] = useState("");
  const [fallingWords, setFallingWords] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameState, setGameState] = useState("ready"); // 'ready', 'playing', 'gameOver'

  const inputRef = useRef(null);
  const gameLoopRef = useRef();
  const wordSpawnerRef = useRef();

  // --- Hàm bắt đầu game ---
  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setLives(5);
    setFallingWords([]);
    setTypedValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // --- Logic chính của Game Loop ---
  useEffect(() => {
    const gameTick = () => {
      if (gameState !== "playing") return;

      setFallingWords((prevWords) => {
        const newWords = [];
        let lostLife = false;

        for (const word of prevWords) {
          const newY = word.y + word.speed;
          if (newY < GAME_HEIGHT) {
            newWords.push({ ...word, y: newY });
          } else {
            lostLife = true;
          }
        }

        if (lostLife) {
          setLives((prevLives) => {
            const newLives = prevLives - 1;
            if (newLives <= 0) {
              setGameState("gameOver");
            }
            return newLives;
          });
        }
        return newWords;
      });

      gameLoopRef.current = requestAnimationFrame(gameTick);
    };

    if (gameState === "playing") {
      gameLoopRef.current = requestAnimationFrame(gameTick);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState]);

  // --- Logic tạo từ mới rơi xuống ---
  useEffect(() => {
    if (gameState === "playing") {
      wordSpawnerRef.current = setInterval(() => {
        const randomWord =
          wordList[Math.floor(Math.random() * wordList.length)];
        const newWord = {
          id: Date.now(),
          text: randomWord,
          y: -20,
          x: Math.random() * (GAME_WIDTH - 100), // Để từ không bị sát mép
          speed: WORD_SPEED_START + Math.random() * 0.5 + score / 20, // Tốc độ tăng theo điểm
        };
        setFallingWords((prev) => [...prev, newWord]);
      }, Math.max(500, WORD_SPAWN_INTERVAL_START - score * 20)); // Tần suất tăng theo điểm
    }
    return () => {
      if (wordSpawnerRef.current) {
        clearInterval(wordSpawnerRef.current);
      }
    };
  }, [gameState, score]);

  // --- Xử lý khi người dùng gõ ---
  const handleInputChange = (e) => {
    setTypedValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!typedValue) return;

    let wordFound = false;
    setFallingWords((prev) => {
      const newWords = prev.filter((word) => {
        if (word.text === typedValue) {
          wordFound = true;
          return false; // Xóa từ khỏi mảng
        }
        return true;
      });
      return newWords;
    });

    if (wordFound) {
      setScore(score + 1);
      setTypedValue("");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 font-mono">
      <div
        className="relative bg-black rounded-lg shadow-2xl shadow-purple-500/30"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Lớp phủ màn hình bắt đầu / kết thúc */}
        {gameState !== "playing" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-80">
            <h1 className="text-6xl font-bold text-purple-400">
              Wordfall Challenge
            </h1>
            {gameState === "gameOver" && (
              <p className="mt-4 text-3xl text-white">Final Score: {score}</p>
            )}
            <button
              onClick={startGame}
              className="mt-8 rounded-lg bg-purple-600 px-8 py-4 text-2xl text-white transition-transform hover:scale-105"
            >
              {gameState === "ready" ? "Start Game" : "Play Again"}
            </button>
          </div>
        )}

        {/* Giao diện game */}
        <div className="absolute top-4 left-4 text-2xl text-white">
          Score: {score}
        </div>
        <div className="absolute top-4 right-4 text-2xl text-white">
          Lives: {"❤️".repeat(lives)}
        </div>

        {/* Từ rơi */}
        {fallingWords.map((word) => (
          <div
            key={word.id}
            className="absolute select-none text-2xl text-cyan-300"
            style={{ top: word.y, left: word.x }}
          >
            {word.text}
          </div>
        ))}

        {/* Ô nhập liệu */}
        <form
          onSubmit={handleSubmit}
          className="absolute bottom-4 left-0 right-0 px-4"
        >
          <input
            ref={inputRef}
            type="text"
            value={typedValue}
            onChange={handleInputChange}
            disabled={gameState !== "playing"}
            className="w-full rounded-lg border-2 border-purple-500 bg-gray-800 p-4 text-center text-2xl text-white outline-none focus:border-cyan-400"
            placeholder="Type a word and press Enter..."
            autoComplete="off"
            autoCorrect="off"
          />
        </form>
      </div>
    </div>
  );
}

export default WordfallGame;
