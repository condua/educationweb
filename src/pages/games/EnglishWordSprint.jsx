import React, { useEffect, useRef, useState, useCallback } from "react";

// --- Ngân hàng từ vựng ---
const WORD_BANK = [
  {
    word: "weather",
    ipa: "/ˈweð.ər/",
    meaning: "thời tiết",
    options: ["weather", "whether", "feather", "leather"],
    hint: "It rains a lot in the hot ___.",
  },
  {
    word: "bicycle",
    ipa: "/ˈbaɪ.sɪ.kəl/",
    meaning: "xe đạp",
    options: ["bicycle", "article", "vehicle", "icicle"],
    hint: "Two wheels, human powered.",
  },
  {
    word: "computer",
    ipa: "/kəmˈpjuː.tər/",
    meaning: "máy tính",
    options: ["computer", "commuter", "competitor", "compiler"],
    hint: "You are using one now.",
  },
  {
    word: "mountain",
    ipa: "/ˈmaʊn.tɪn/",
    meaning: "núi",
    options: ["mountain", "fountain", "curtain", "certain"],
    hint: "Very high landform.",
  },
  {
    word: "strawberry",
    ipa: "/ˈstrɔːˌber.i/",
    meaning: "dâu tây",
    options: ["strawberry", "rosemary", "blackberry", "library"],
    hint: "A red fruit with seeds outside.",
  },
  {
    word: "difficult",
    ipa: "/ˈdɪf.ɪ.kəlt/",
    meaning: "khó",
    options: ["difficult", "different", "deficit", "diligent"],
    hint: "Not easy.",
  },
  {
    word: "environment",
    ipa: "/ɪnˈvaɪ.rən.mənt/",
    meaning: "môi trường",
    options: ["environment", "environ", "envelopment", "investment"],
    hint: "The natural world around us.",
  },
  {
    word: "language",
    ipa: "/ˈlæŋ.ɡwɪdʒ/",
    meaning: "ngôn ngữ",
    options: ["language", "languish", "luggage", "lineage"],
    hint: "English, Vietnamese, Korean…",
  },
  {
    word: "rhythm",
    ipa: "/ˈrɪð.əm/",
    meaning: "nhịp điệu",
    options: ["rhythm", "rithem", "rythm", "rythem"],
    hint: "Beat in music.",
  },
  {
    word: "beautiful",
    ipa: "/ˈbjuː.tɪ.fəl/",
    meaning: "đẹp",
    options: ["beautiful", "beautifull", "beautifal", "beutiful"],
    hint: "Pretty, lovely.",
  },
];

// --- Các hàm tiện ích ---
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const msg = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const enVoice =
    voices.find((v) => v.lang.startsWith("en-")) ||
    voices.find((v) => v.lang.startsWith("en"));
  if (enVoice) msg.voice = enVoice;
  msg.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

const LS_KEY = "word-sprint-scores";
function loadScores() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveScore(entry) {
  const scores = loadScores();
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(LS_KEY, JSON.stringify(scores.slice(0, 15)));
}

export default function EnglishWordSprint() {
  const [screen, setScreen] = useState("menu");
  const [seconds, setSeconds] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState(() => WORD_BANK[0]);
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    shuffle(question.options)
  );
  const [lastCorrect, setLastCorrect] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState(() => loadScores());
  const timerRef = useRef(null);

  // ✅ SỬA LỖI: Di chuyển toàn bộ logic vào bên trong component, trước lệnh return

  const randomQuestion = useCallback((currentWord) => {
    let newQuestion;
    do {
      newQuestion = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    } while (currentWord && newQuestion.word === currentWord); // ✨ Cải tiến: không lặp lại câu hỏi cũ
    return newQuestion;
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setStreak(0);
    setSeconds(60);
    setQuestion(randomQuestion());
    setLastCorrect(null);
    setScreen("play");
  }, [randomQuestion]);

  const finishGame = useCallback(() => {
    setScreen("result");
  }, []);

  // Timer effect
  useEffect(() => {
    if (screen !== "play") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen, finishGame]);

  // Shuffle options when question changes
  useEffect(() => {
    setShuffledOptions(shuffle(question.options));
  }, [question]);

  // Speak the word when question changes
  useEffect(() => {
    if (screen === "play") {
      speak(question.word);
    }
  }, [screen, question.word]);

  const handleAnswer = useCallback(
    (choice) => {
      if (lastCorrect !== null) return; // Ngăn trả lời nhiều lần

      const correct = choice.toLowerCase() === question.word.toLowerCase();
      setLastCorrect(correct);

      if (correct) {
        setStreak((s) => {
          const newStreak = s + 1;
          const bonus = Math.min(3, Math.floor(newStreak / 3));
          setScore((sc) => sc + 10 * (1 + bonus));
          return newStreak;
        });
      } else {
        setStreak(0);
        setSeconds((s) => Math.max(0, s - 2));
      }

      setTimeout(() => {
        setQuestion((q) => randomQuestion(q.word));
        setLastCorrect(null);
      }, 350);
    },
    [lastCorrect, question.word, randomQuestion]
  );

  // Keyboard controls effect
  useEffect(() => {
    const onKey = (e) => {
      if (screen !== "play") return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (idx < shuffledOptions.length) {
          e.preventDefault();
          handleAnswer(shuffledOptions[idx]);
        }
      }
      if (e.key === " ") {
        e.preventDefault();
        speak(question.word);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, shuffledOptions, question.word, handleAnswer]);

  const saveToBoard = useCallback(() => {
    const name = playerName.trim() || "Player";
    saveScore({ name, score, date: new Date().toISOString() });
    setLeaderboard(loadScores());
    setPlayerName("");
  }, [playerName, score]);

  // --- Giao diện (JSX) ---
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            English Word Sprint
          </h1>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setScreen("menu");
            }}
            className="text-sm opacity-80 hover:opacity-100 underline decoration-dotted"
          >
            Menu
          </a>
        </header>

        {screen === "menu" && (
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-xl">
            <p className="text-slate-200 mb-4">
              Nghe phát âm và chọn từ đúng thật nhanh. 60 giây, tính điểm theo
              streak. Bấm{" "}
              <kbd className="px-1 py-0.5 bg-white/10 rounded">Space</kbd> để
              nghe lại,{" "}
              <kbd className="px-1 py-0.5 bg-white/10 rounded">1–4</kbd> để
              chọn.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <h2 className="font-semibold mb-2">Cách chơi</h2>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                  <li>
                    Nhấn <span className="font-semibold">Start</span> để bắt
                    đầu.
                  </li>
                  <li>Nghe máy đọc từ — chọn chính tả đúng.</li>
                  <li>Streak x3, x6, x9 tăng điểm thưởng.</li>
                  <li>Trừ 2 giây khi chọn sai.</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h2 className="font-semibold mb-2">Bảng xếp hạng</h2>
                <ol className="text-sm space-y-1 max-h-40 overflow-auto pr-1">
                  {leaderboard.length === 0 ? (
                    <li className="text-slate-400">
                      Chưa có điểm. Hãy chơi ngay!
                    </li>
                  ) : (
                    leaderboard.map((s, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span className="opacity-80">
                          {i + 1}. {s.name}
                        </span>
                        <span className="font-semibold">{s.score}</span>
                      </li>
                    ))
                  )}
                </ol>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={startGame}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold shadow"
              >
                Start ▶
              </button>
              <button
                onClick={() =>
                  speak("Hello! This is a sample word. Good luck!")
                }
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm"
              >
                Test voice 🔊
              </button>
            </div>
          </div>
        )}

        {screen === "play" && (
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-sm">
                  ⏱ {seconds}s
                </div>
                <div className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-sm">
                  ⭐ {score}
                </div>
                <div className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-sm">
                  🔥 Streak {streak}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speak(question.word)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                >
                  Repeat 🔊
                </button>
                <button
                  onClick={finishGame}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                >
                  Finish ⏹
                </button>
              </div>
            </div>

            <div className="text-center py-6">
              <div className="text-sm uppercase tracking-wider text-slate-300">
                Listen & choose the correct word
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Gợi ý: {question.hint || "—"}
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {shuffledOptions.map((opt, idx) => {
                  const isTheCorrectAnswer =
                    opt.toLowerCase() === question.word.toLowerCase();
                  const showFeedback = lastCorrect !== null;
                  let buttonClass =
                    "border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800";
                  if (showFeedback) {
                    if (isTheCorrectAnswer) {
                      buttonClass = "ring-2 ring-emerald-400"; // Hiện đáp án đúng
                    } else {
                      buttonClass += " opacity-60"; // Làm mờ đáp án sai
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className={`group px-4 py-4 rounded-2xl border text-left shadow-lg transition ${buttonClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">
                          {idx + 1}. {opt}
                        </span>
                        {showFeedback && isTheCorrectAnswer && (
                          <span className="text-emerald-400">✔</span>
                        )}
                      </div>
                      {showFeedback && isTheCorrectAnswer && (
                        <div className="text-xs text-emerald-300 mt-1">
                          Correct!
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 text-sm text-slate-300">
                <span className="mr-2">/ {question.word} /</span>
                {question.ipa && (
                  <span className="opacity-80">IPA: {question.ipa}</span>
                )}{" "}
                {question.meaning && (
                  <span className="opacity-60">• {question.meaning}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold">⏹ Hết giờ!</h2>
            <p className="mt-2 text-slate-300">
              Điểm của bạn:{" "}
              <span className="font-bold text-white">{score}</span>
            </p>
            <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-end">
              <div className="grow">
                <label className="block text-sm mb-1 opacity-80">
                  Tên của bạn (tùy chọn)
                </label>
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="VD: Phúc"
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveToBoard}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
                >
                  Lưu điểm
                </button>
                <button
                  onClick={startGame}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
                >
                  Chơi lại ▶
                </button>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">🏆 Bảng xếp hạng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {leaderboard.length > 0 ? (
                  leaderboard.slice(0, 10).map((s, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                    >
                      <span className="opacity-80">
                        {i + 1}. {s.name}
                      </span>
                      <span className="font-semibold">{s.score}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 md:col-span-2">
                    Chưa có dữ liệu.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-6 text-center text-xs text-slate-400">
          Tips: Bấm Space để nghe lại. Nhấn 1–4 để chọn nhanh.
        </footer>
      </div>
    </div>
  );
}
