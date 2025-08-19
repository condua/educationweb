import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
// --- Âm thanh ---
const correctSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1755585617/Sound%20effects/correctSound_exwgii.mp3"
);
correctSound.volume = 0.5;
// Danh sách từ vựng cho trò chơi
const wordList = [
  "ability",
  "about",
  "above",
  "accept",
  "across",
  "action",
  "admit",
  "affect",
  "again",
  "agree",
  "ahead",
  "allow",
  "almost",
  "alone",
  "along",
  "always",
  "amount",
  "animal",
  "answer",
  "appear",
  "apply",
  "around",
  "arrive",
  "article",
  "attack",
  "author",
  "avoid",
  "beautiful",
  "become",
  "because",
  "before",
  "begin",
  "behave",
  "behind",
  "believe",
  "benefit",
  "between",
  "beyond",
  "billion",
  "blood",
  "board",
  "bring",
  "build",
  "business",
  "camera",
  "cancer",
  "capital",
  "career",
  "carry",
  "catch",
  "cause",
  "center",
  "central",
  "century",
  "certain",
  "chair",
  "challenge",
  "chance",
  "change",
  "charge",
  "check",
  "child",
  "choice",
  "choose",
  "church",
  "citizen",
  "claim",
  "clear",
  "close",
  "coach",
  "collect",
  "college",
  "color",
  "come",
  "common",
  "community",
  "company",
  "compare",
  "computer",
  "concern",
  "condition",
  "conference",
  "consider",
  "contain",
  "continue",
  "control",
  "could",
  "country",
  "couple",
  "course",
  "court",
  "cover",
  "create",
  "crime",
  "culture",
  "current",
  "customer",
  "dark",
  "data",
  "daughter",
  "death",
  "debate",
  "decade",
  "decide",
  "decision",
  "deep",
  "degree",
  "democrat",
  "describe",
  "design",
  "despite",
  "detail",
  "determine",
  "develop",
  "die",
  "difference",
  "difficult",
  "dinner",
  "direction",
  "discover",
  "discuss",
  "disease",
  "doctor",
  "drive",
  "during",
  "early",
  "east",
  "easy",
  "economic",
  "economy",
  "edge",
  "education",
  "effect",
  "effort",
  "either",
  "election",
  "employee",
  "energy",
  "enjoy",
  "enough",
  "enter",
  "entire",
  "environment",
  "especially",
  "establish",
  "evening",
  "event",
  "every",
  "evidence",
  "exactly",
  "example",
  "exist",
  "expect",
  "experience",
  "expert",
  "explain",
  "family",
  "father",
  "federal",
  "feel",
  "field",
  "fight",
  "figure",
  "fill",
  "final",
  "financial",
  "find",
  "fine",
  "finish",
  "firm",
  "first",
  "floor",
  "focus",
  "follow",
  "force",
  "foreign",
  "forget",
  "form",
  "former",
  "forward",
  "friend",
  "front",
  "fund",
  "future",
  "game",
  "garden",
  "general",
  "generation",
  "give",
  "glass",
  "goal",
  "good",
  "government",
  "great",
  "green",
  "ground",
  "group",
  "grow",
  "growth",
  "guess",
  "happy",
  "hard",
  "have",
  "head",
  "health",
  "hear",
  "heart",
  "help",
  "herself",
  "high",
  "history",
  "hold",
  "home",
  "hope",
  "hospital",
  "hotel",
  "hour",
  "house",
  "however",
  "human",
  "hundred",
  "husband",
  "idea",
  "identify",
  "image",
  "imagine",
  "impact",
  "important",
  "improve",
  "include",
  "increase",
  "indeed",
  "indicate",
  "industry",
  "information",
  "inside",
  "instead",
  "interest",
  "international",
  "interview",
  "into",
  "investment",
  "involve",
  "issue",
  "item",
  "itself",
  "join",
  "just",
  "keep",
  "kill",
  "kind",
  "kitchen",
  "know",
  "knowledge",
  "land",
  "language",
  "large",
  "last",
  "late",
  "later",
  "laugh",
  "launch",
  "lead",
  "leader",
  "learn",
  "least",
  "leave",
  "left",
  "legal",
  "less",
  "letter",
  "level",
  "life",
  "light",
  "like",
  "line",
  "list",
  "listen",
  "live",
  "local",
  "long",
  "look",
  "lose",
  "love",
  "machine",
  "magazine",
  "main",
  "maintain",
  "major",
  "make",
  "manage",
  "manager",
  "many",
  "market",
  "marriage",
  "material",
  "matter",
  "maybe",
  "mean",
  "measure",
  "media",
  "medical",
  "meet",
  "meeting",
  "member",
  "memory",
  "mention",
  "message",
  "method",
  "middle",
  "might",
  "military",
  "million",
  "mind",
  "minute",
  "miss",
  "mission",
  "model",
  "modern",
  "moment",
  "money",
  "month",
  "more",
  "morning",
  "most",
  "mother",
  "mouth",
  "move",
  "movement",
  "movie",
  "music",
  "myself",
  "name",
  "nation",
  "national",
  "natural",
  "nature",
  "near",
  "nearly",
  "necessary",
  "need",
  "network",
  "never",
  "news",
  "newspaper",
  "next",
  "nice",
  "night",
  "north",
  "note",
  "nothing",
  "notice",
  "number",
  "occur",
  "offer",
  "office",
  "officer",
  "official",
  "often",
  "once",
  "only",
  "open",
  "operation",
  "opportunity",
  "option",
  "order",
  "organization",
  "other",
  "others",
  "outside",
  "over",
  "owner",
  "page",
  "pain",
  "painting",
  "paper",
  "parent",
  "part",
  "participant",
  "particular",
  "partner",
  "party",
  "pass",
  "past",
  "patient",
  "pattern",
  "peace",
  "people",
  "performance",
  "perhaps",
  "period",
  "person",
  "personal",
  "phone",
  "physical",
  "pick",
  "picture",
  "piece",
  "place",
  "plan",
  "plant",
  "play",
  "player",
  "point",
  "police",
  "policy",
  "political",
  "politics",
  "poor",
  "popular",
  "population",
  "position",
  "positive",
  "possible",
  "power",
  "practice",
  "prepare",
  "present",
  "president",
  "pressure",
  "pretty",
  "prevent",
  "price",
  "private",
  "probably",
  "problem",
  "process",
  "produce",
  "product",
  "production",
  "professional",
  "professor",
  "program",
  "project",
  "property",
  "protect",
  "prove",
  "provide",
  "public",
  "pull",
  "purpose",
  "push",
  "put",
  "quality",
  "question",
  "quickly",
  "quite",
  "race",
  "radio",
  "raise",
  "range",
  "rate",
  "rather",
  "reach",
  "read",
  "ready",
  "real",
  "reality",
  "realize",
  "really",
  "reason",
  "receive",
  "recent",
  "recently",
  "recognize",
  "record",
  "reduce",
  "reflect",
  "region",
  "relate",
  "relationship",
  "religious",
  "remain",
  "remember",
  "remove",
  "report",
  "represent",
  "republican",
  "require",
  "research",
  "resource",
  "respond",
  "response",
  "responsibility",
  "rest",
  "result",
  "return",
  "reveal",
  "rich",
  "right",
  "rise",
  "risk",
  "road",
  "rock",
  "role",
  "room",
  "rule",
  "safe",
  "same",
  "save",
  "school",
  "science",
  "scientist",
  "score",
  "sea",
  "season",
  "seat",
  "second",
  "section",
  "security",
  "see",
  "seek",
  "seem",
  "sell",
  "send",
  "senior",
  "sense",
  "series",
  "serious",
  "serve",
  "service",
  "set",
  "seven",
  "several",
  "shake",
  "share",
  "shoot",
  "short",
  "shot",
  "should",
  "shoulder",
  "show",
  "side",
  "sign",
  "significant",
  "similar",
  "simple",
  "simply",
  "since",
  "sing",
  "single",
  "sister",
  "site",
  "situation",
  "size",
  "skill",
  "skin",
  "small",
  "smile",
  "social",
  "society",
  "soldier",
  "some",
  "somebody",
  "someone",
  "something",
  "sometimes",
  "song",
  "soon",
  "sort",
  "sound",
  "source",
  "south",
  "southern",
  "space",
  "speak",
  "special",
  "specific",
  "speech",
  "spend",
  "sport",
  "spring",
  "staff",
  "stage",
  "stand",
  "standard",
  "star",
  "start",
  "state",
  "statement",
  "station",
  "stay",
  "step",
  "still",
  "stock",
  "stop",
  "store",
  "story",
  "strategy",
  "street",
  "strong",
  "structure",
  "student",
  "study",
  "stuff",
  "style",
  "subject",
  "success",
  "successful",
  "such",
  "suddenly",
  "suffer",
  "suggest",
  "summer",
  "support",
  "sure",
  "surface",
  "system",
  "table",
  "take",
  "talk",
  "task",
  "teach",
  "teacher",
  "team",
  "technology",
  "television",
  "tell",
  "tend",
  "term",
  "test",
  "than",
  "thank",
  "that",
  "their",
  "them",
  "themselves",
  "then",
  "theory",
  "there",
  "these",
  "they",
  "thing",
  "think",
  "third",
  "this",
  "those",
  "though",
  "thought",
  "thousand",
  "threat",
  "three",
  "through",
  "throughout",
  "throw",
  "thus",
  "time",
  "today",
  "together",
  "tonight",
  "total",
  "tough",
  "toward",
  "town",
  "trade",
  "traditional",
  "training",
  "travel",
  "treat",
  "treatment",
  "tree",
  "trial",
  "trip",
  "trouble",
  "true",
  "truth",
  "turn",
  "type",
  "under",
  "understand",
  "unit",
  "until",
  "upon",
  "usually",
  "value",
  "various",
  "very",
  "victim",
  "view",
  "violence",
  "visit",
  "voice",
  "vote",
  "wait",
  "walk",
  "wall",
  "want",
  "watch",
  "water",
  "weapon",
  "wear",
  "week",
  "weight",
  "well",
  "west",
  "western",
  "what",
  "whatever",
  "when",
  "where",
  "whether",
  "which",
  "while",
  "white",
  "whole",
  "whom",
  "whose",
  "wide",
  "wife",
  "will",
  "wind",
  "window",
  "with",
  "within",
  "without",
  "woman",
  "wonder",
  "word",
  "work",
  "worker",
  "world",
  "worry",
  "would",
  "write",
  "writer",
  "wrong",
  "yard",
  "yeah",
  "year",
  "young",
  "your",
  "yourself",
];

const GAME_DURATION = 600; // Thời gian chơi: 600 giây

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function TypingGame() {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedValue, setTypedValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const inputRef = useRef(null);

  const startGame = useCallback(() => {
    const shuffledWords = shuffleArray(wordList);
    setWords(shuffledWords);
    setIsGameRunning(true);
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setCurrentWordIndex(0);
    setTypedValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Xử lý bộ đếm thời gian
  useEffect(() => {
    let interval;
    if (isGameRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameRunning) {
      setIsGameRunning(false);
    }
    return () => clearInterval(interval);
  }, [isGameRunning, timeLeft]);

  // Tự động focus vào ô input
  useEffect(() => {
    if (isGameRunning) {
      inputRef.current?.focus();
    }
  }, [isGameRunning]);

  // ✨ LOGIC MỚI: Tự động chuyển từ khi gõ đúng
  useEffect(() => {
    if (
      isGameRunning &&
      words.length > 0 &&
      typedValue === words[currentWordIndex]
    ) {
      correctSound.currentTime = 0;
      correctSound.play();
      setScore((prevScore) => prevScore + 1);
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setTypedValue("");
    }
  }, [typedValue, currentWordIndex, words, isGameRunning]);

  const handleInputChange = (e) => {
    if (!isGameRunning) return;
    // Chỉ cho phép gõ chữ cái, không cho gõ space
    const newTypedValue = e.target.value.trim();
    setTypedValue(newTypedValue);
  };

  const currentWord = words[currentWordIndex];

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4 font-mono">
      <div className="w-full max-w-3xl text-white">
        {/* Màn hình bắt đầu / kết thúc */}
        <AnimatePresence>
          {!isGameRunning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Typing Sprint
              </h1>
              {timeLeft === 0 ? (
                <div className="mt-8">
                  <h2 className="text-3xl font-bold text-green-400">
                    Time's up!
                  </h2>
                  <p className="mt-4 text-xl">Your final score is:</p>
                  <p className="my-6 text-8xl font-bold">{score}</p>
                  <p className="text-lg text-slate-400">
                    That's approximately{" "}
                    <span className="text-yellow-400 font-bold">
                      {score} WPM
                    </span>{" "}
                    (Words Per Minute)!
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mt-4 text-lg text-slate-300">
                    Type the words as fast as you can in {GAME_DURATION}{" "}
                    seconds.
                  </p>
                  <p className="mt-2 text-slate-400">
                    The next word appears automatically when you type correctly.
                  </p>
                </div>
              )}
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 rounded-full bg-cyan-400 px-10 py-4 text-2xl font-bold text-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]"
              >
                {timeLeft === 0 ? "Play Again" : "Start Game"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Giao diện chơi game */}
        <AnimatePresence>
          {isGameRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8 flex justify-around text-2xl">
                <div className="text-center">
                  <p className="text-slate-400">Time Left</p>
                  <p className="text-5xl font-bold text-yellow-400">
                    {timeLeft}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">Score</p>
                  <p className="text-5xl font-bold text-green-400">{score}</p>
                </div>
              </div>

              <div className="relative mb-8 rounded-2xl bg-black/30 backdrop-blur-sm ring-1 ring-white/10 p-6 text-center text-4xl tracking-[0.2em]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWord}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentWord?.split("").map((char, index) => {
                      let charClass = "text-slate-500";
                      if (index < typedValue.length) {
                        charClass =
                          typedValue[index] === char
                            ? "text-green-400"
                            : "text-red-500 underline decoration-2";
                      }
                      return (
                        <span key={index} className={charClass}>
                          {char}
                        </span>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={typedValue}
                onChange={handleInputChange}
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-800 p-4 text-center text-3xl text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
