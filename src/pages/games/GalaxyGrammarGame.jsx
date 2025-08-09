import React, { useState, useEffect, useRef, useCallback } from "react";

// --- Dữ liệu câu hỏi (Không thay đổi) ---
const questions = [
  {
    sentence: "He ___ English very well.",
    options: ["speak", "speaks", "spoke"],
    answer: "speaks",
  },
  {
    sentence: "They ___ to the cinema yesterday.",
    options: ["go", "goes", "went"],
    answer: "went",
  },
  {
    sentence: "The book is ___ the table.",
    options: ["on", "in", "at"],
    answer: "on",
  },
  {
    sentence: "She is ___ than her brother.",
    options: ["tall", "taller", "tallest"],
    answer: "taller",
  },
  {
    sentence: "I am interested ___ learning new things.",
    options: ["in", "on", "with"],
    answer: "in",
  },
  {
    sentence: "If you heat water, it ___.",
    options: ["boil", "boils", "boiled"],
    answer: "boils",
  },
];

function GalaxyGrammarGame() {
  // ✅ SỬA LỖI 1: Bắt đầu state game là null để chờ có kích thước màn hình
  const [game, setGame] = useState(null);
  const [gameState, setGameState] = useState("ready");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const keysPressed = useRef({});
  const moveDirection = useRef(null);
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef();

  // Lấy kích thước màn hình một cách linh hoạt
  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(gameArea);
    return () => resizeObserver.unobserve(gameArea);
  }, []);

  // Tính toán cấu hình game dựa trên kích thước màn hình
  const config = React.useMemo(
    () => ({
      PLAYER_WIDTH: dimensions.width * 0.1,
      PLAYER_HEIGHT: dimensions.height * 0.07,
      ENEMY_WIDTH: dimensions.width * 0.2,
      ENEMY_HEIGHT: dimensions.height * 0.05,
      LASER_WIDTH: 5,
      LASER_HEIGHT: 20,
      PLAYER_SPEED: dimensions.width * 0.01,
      ENEMY_SPEED: dimensions.height * 0.0015,
      LASER_SPEED: dimensions.height * 0.012,
    }),
    [dimensions]
  );

  const getInitialState = useCallback(
    () => ({
      player: {
        x: dimensions.width / 2 - config.PLAYER_WIDTH / 2,
        y: dimensions.height - config.PLAYER_HEIGHT - 20,
      },
      lasers: [],
      enemies: [],
      score: 0,
      lives: 3,
      currentQuestion: null,
    }),
    [dimensions, config]
  );

  // ✅ SỬA LỖI 2: Hook mới để khởi tạo game SAU KHI có kích thước màn hình
  useEffect(() => {
    if (dimensions.width > 0 && !game) {
      setGame(getInitialState());
    }
  }, [dimensions, game, getInitialState]);

  const spawnNewWave = useCallback(() => {
    if (dimensions.width === 0) return; // Không tạo wave khi chưa có kích thước
    const question = questions[Math.floor(Math.random() * questions.length)];
    const shuffledOptions = [...question.options].sort(
      () => Math.random() - 0.5
    );
    const newEnemies = shuffledOptions.map((option, index) => ({
      id: Date.now() + index,
      text: option,
      x:
        (dimensions.width / (shuffledOptions.length + 1)) * (index + 1) -
        config.ENEMY_WIDTH / 2,
      y: -config.ENEMY_HEIGHT,
      isCorrect: option === question.answer,
    }));
    setGame((g) => ({ ...g, enemies: newEnemies, currentQuestion: question }));
  }, [dimensions, config]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setGame(getInitialState());
    spawnNewWave();
  }, [getInitialState, spawnNewWave]);

  const fireLaser = useCallback(() => {
    setGame((g) => {
      if (!g || !g.player) return g;
      return {
        ...g,
        lasers: [
          ...g.lasers,
          {
            id: Date.now(),
            x: g.player.x + config.PLAYER_WIDTH / 2 - config.LASER_WIDTH / 2,
            y: g.player.y,
          },
        ],
      };
    });
  }, [config]);

  // ✅ SỬA LỖI 3: Cập nhật dependency cho useEffect của bàn phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
      if (e.key === " " && gameState === "playing") {
        e.preventDefault();
        fireLaser();
      }
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState, fireLaser]);

  // --- Game Loop chính (Không thay đổi nhiều, nhưng giờ sẽ chạy với state đúng) ---
  useEffect(() => {
    if (gameState !== "playing" || !game) return;

    const gameTick = () => {
      setGame((prevGame) => {
        if (!prevGame) return prevGame;

        let newPlayerX = prevGame.player.x;
        if (
          keysPressed.current["ArrowLeft"] ||
          keysPressed.current["a"] ||
          moveDirection.current === "left"
        )
          newPlayerX -= config.PLAYER_SPEED;
        if (
          keysPressed.current["ArrowRight"] ||
          keysPressed.current["d"] ||
          moveDirection.current === "right"
        )
          newPlayerX += config.PLAYER_SPEED;
        newPlayerX = Math.max(
          0,
          Math.min(dimensions.width - config.PLAYER_WIDTH, newPlayerX)
        );

        const movedLasers = prevGame.lasers
          .map((l) => ({ ...l, y: l.y - config.LASER_SPEED }))
          .filter((l) => l.y > -config.LASER_HEIGHT);
        const movedEnemies = prevGame.enemies.map((e) => ({
          ...e,
          y: e.y + config.ENEMY_SPEED,
        }));

        let newScore = prevGame.score,
          newLives = prevGame.lives,
          remainingLasers = [],
          remainingEnemies = [...movedEnemies],
          waveCompleted = false;

        for (const laser of movedLasers) {
          let laserHit = false,
            hitEnemy = null;
          for (const enemy of remainingEnemies) {
            if (
              laser.x < enemy.x + config.ENEMY_WIDTH &&
              laser.x + config.LASER_WIDTH > enemy.x &&
              laser.y < enemy.y + config.ENEMY_HEIGHT &&
              laser.y + config.LASER_HEIGHT > enemy.y
            ) {
              laserHit = true;
              hitEnemy = enemy;
              break;
            }
          }
          if (laserHit) {
            if (hitEnemy.isCorrect) {
              newScore++;
              waveCompleted = true;
            } else {
              newLives--;
            }
            remainingEnemies = remainingEnemies.filter(
              (e) => e.id !== hitEnemy.id
            );
          } else {
            remainingLasers.push(laser);
          }
        }

        const finalEnemies = [];
        for (const enemy of remainingEnemies) {
          if (enemy.y > dimensions.height) {
            if (enemy.isCorrect) newLives--;
          } else {
            finalEnemies.push(enemy);
          }
        }

        if (newLives <= 0) {
          setGameState("gameOver");
          return {
            ...prevGame,
            lives: 0,
            player: { ...prevGame.player, x: newPlayerX },
          };
        }

        if (waveCompleted) {
          spawnNewWave();
        }

        return {
          ...prevGame,
          player: { ...prevGame.player, x: newPlayerX },
          lasers: remainingLasers,
          enemies: waveCompleted ? [] : finalEnemies,
          score: newScore,
          lives: newLives,
        };
      });
      gameLoopRef.current = requestAnimationFrame(gameTick);
    };

    gameLoopRef.current = requestAnimationFrame(gameTick);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, game, dimensions, config, spawnNewWave]);

  const ControlButton = ({ onTouchStart, onTouchEnd, children, className }) => (
    <button
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onTouchStart}
      onMouseUp={onTouchEnd}
      onMouseLeave={onTouchEnd}
      className={`select-none rounded-full bg-gray-500/50 w-20 h-20 flex items-center justify-center text-4xl text-white active:bg-gray-400/70 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 font-mono overflow-hidden">
      <div
        ref={gameAreaRef}
        className="relative w-full h-full bg-black shadow-2xl"
        style={{
          backgroundImage:
            "url(https://www.transparenttextures.com/patterns/stardust.png)",
        }}
      >
        {/* Chỉ render game khi state đã sẵn sàng */}
        {game && (
          <>
            {gameState !== "playing" && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-80 text-center p-4">
                <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 tracking-widest">
                  GALAXY GRAMMAR
                </h1>
                {gameState === "gameOver" && (
                  <p className="mt-4 text-xl md:text-3xl text-white">
                    Final Score: {game.score}
                  </p>
                )}
                <button
                  onClick={startGame}
                  className="mt-8 rounded-lg bg-cyan-500 px-8 py-4 text-xl md:text-2xl text-black transition-transform hover:scale-105"
                >
                  {gameState === "ready" ? "START" : "PLAY AGAIN"}
                </button>
              </div>
            )}

            <div className="absolute top-4 left-4 z-10 text-lg md:text-2xl text-white">
              Score: {game.score}
            </div>
            <div className="absolute top-4 right-4 z-10 text-lg md:text-2xl text-white">
              Lives: {"🚀".repeat(game.lives)}
            </div>
            <div className="absolute bottom-[15%] md:bottom-4 left-0 right-0 z-10 text-center text-base md:text-2xl text-yellow-300 p-2 bg-black/50 mx-2 rounded">
              {game.currentQuestion?.sentence.replace("___", "...")}
            </div>

            {gameState === "playing" && (
              <>
                <div
                  className="absolute"
                  style={{
                    left: game.player.x,
                    top: game.player.y,
                    width: config.PLAYER_WIDTH,
                    height: config.PLAYER_HEIGHT,
                    fontSize: config.PLAYER_WIDTH * 0.7,
                    lineHeight: 1,
                  }}
                >
                  🛸
                </div>
                {game.enemies.map((enemy) => (
                  <div
                    key={enemy.id}
                    className="absolute flex items-center justify-center rounded-md bg-red-800 text-white font-bold border border-red-500"
                    style={{
                      left: enemy.x,
                      top: enemy.y,
                      width: config.ENEMY_WIDTH,
                      height: config.ENEMY_HEIGHT,
                      fontSize: Math.min(config.ENEMY_HEIGHT * 0.5, 24),
                    }}
                  >
                    {enemy.text}
                  </div>
                ))}
                {game.lasers.map((laser) => (
                  <div
                    key={laser.id}
                    className="absolute rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(0,255,255,0.7)]"
                    style={{
                      left: laser.x,
                      top: laser.y,
                      width: config.LASER_WIDTH,
                      height: config.LASER_HEIGHT,
                    }}
                  ></div>
                ))}

                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center md:hidden">
                  <ControlButton
                    onTouchStart={() => (moveDirection.current = "left")}
                    onTouchEnd={() => (moveDirection.current = null)}
                  >
                    {"←"}
                  </ControlButton>
                  <ControlButton
                    onTouchStart={fireLaser}
                    className="w-24 h-24 bg-red-600/60 active:bg-red-500/80"
                  >
                    Bắn
                  </ControlButton>
                  <ControlButton
                    onTouchStart={() => (moveDirection.current = "right")}
                    onTouchEnd={() => (moveDirection.current = null)}
                  >
                    {"→"}
                  </ControlButton>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GalaxyGrammarGame;
