import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Headphones,
  Keyboard,
  BadgeCheck,
  Puzzle,
  CloudRain,
  Star,
  Gamepad2,
  Brain,
  Shuffle,
  Search,
  Trophy,
} from "lucide-react";

// --- Dữ liệu trò chơi đã được đa ngôn ngữ hóa ---
const GAMES = [
  {
    title: { en: "Who Wants to Be a Millionaire?", vi: "Ai Là Triệu Phú?" },
    path: "/millionaire-game",
    description: {
      en: "15 questions, lifelines, and a ladder of prizes. Good luck!",
      vi: "15 câu hỏi, các quyền trợ giúp, và thang tiền thưởng. Chúc may mắn!",
    },
    Icon: Trophy,
    tags: ["Quiz", "General"],
  },
  {
    title: { en: "Listening Challenge", vi: "Thử Thách Nghe" },
    path: "/listening-game",
    description: {
      en: "Sharpen listening skills and pick the right answer.",
      vi: "Rèn luyện kỹ năng nghe và chọn đáp án đúng.",
    },
    Icon: Headphones,
    tags: ["Listening"],
  },
  {
    title: { en: "Vocabulary Builder", vi: "Xây Dựng Từ Vựng" },
    path: "/vocabulary-game",
    description: {
      en: "Practice and expand vocabulary through quick, fun challenges.",
      vi: "Luyện tập và mở rộng vốn từ vựng qua các thử thách nhanh và vui.",
    },
    Icon: BookOpen,
    tags: ["Vocabulary", "Practice"],
  },
  {
    title: { en: "Sentence Scramble", vi: "Sắp Xếp Câu" },
    path: "/game2",
    description: {
      en: "Reorder scrambled words to form correct sentences.",
      vi: "Sắp xếp lại các từ bị xáo trộn để tạo thành câu đúng.",
    },
    Icon: Shuffle,
    tags: ["Grammar", "Sentence"],
  },
  {
    title: { en: "Typing Sprint", vi: "Gõ Phím Nhanh" },
    path: "/typing-game",
    description: {
      en: "Race the clock while typing English words accurately.",
      vi: "Chạy đua với thời gian trong khi gõ các từ tiếng Anh một cách chính xác.",
    },
    Icon: Keyboard,
    tags: ["Typing", "Speed"],
  },
  {
    title: { en: "Grammar Master", vi: "Bậc Thầy Ngữ Pháp" },
    path: "/grammar-game",
    description: {
      en: "Tackle grammar drills and level up your accuracy.",
      vi: "Giải quyết các bài tập ngữ pháp và nâng cao độ chính xác của bạn.",
    },
    Icon: BadgeCheck,
    tags: ["Grammar"],
  },
  {
    title: { en: "Matching Pairs", vi: "Ghép Cặp" },
    path: "/matching-game",
    description: {
      en: "Match words with meanings to test your memory.",
      vi: "Nối từ với nghĩa của chúng để kiểm tra trí nhớ của bạn.",
    },
    Icon: Puzzle,
    tags: ["Memory", "Vocabulary"],
  },
  {
    title: { en: "Wordfall", vi: "Thác Chữ" },
    path: "/wordfall-game",
    description: {
      en: "Catch the right words before they fall — arcade style!",
      vi: "Bắt các từ đúng trước khi chúng rơi xuống — theo phong cách arcade!",
    },
    Icon: CloudRain,
    tags: ["Arcade", "Vocabulary"],
  },
  {
    title: { en: "Galaxy Grammar", vi: "Ngữ Pháp Ngân Hà" },
    path: "/galaxy-grammar-game",
    description: {
      en: "Travel the galaxy and conquer grammar missions.",
      vi: "Du hành thiên hà và chinh phục các nhiệm vụ ngữ pháp.",
    },
    Icon: Star,
    tags: ["Grammar", "Arcade"],
  },
  {
    title: { en: "Grammar Detective", vi: "Thám Tử Ngữ Pháp" },
    path: "/detective-game",
    description: {
      en: "Solve cases by spotting grammar clues and patterns.",
      vi: "Giải quyết các vụ án bằng cách phát hiện các manh mối và quy tắc ngữ pháp.",
    },
    Icon: Brain,
    tags: ["Grammar", "Logic"],
  },
  {
    title: { en: "English Word Sprint", vi: "Nước Rút Từ Vựng" },
    path: "/english-word-sprint",
    description: {
      en: "A 60s sprint: listen, think fast, and choose correctly.",
      vi: "Chạy nước rút 60 giây: nghe, suy nghĩ nhanh và chọn đúng.",
    },
    Icon: Gamepad2,
    tags: ["Speed", "Vocabulary"],
  },
];

// --- Dữ liệu dịch thuật ---
const translations = {
  en: {
    pageTitle: "English Learning Games",
    pageDescription:
      "Choose a game to practice vocabulary, grammar, listening, and speed. All games are mobile-friendly.",
    searchPlaceholder: "Search for games...",
    allTag: "All",
    playHint: "Click to play",
    startButton: "Start",
    emptyState: "No matching games found.",
    tip: "Tip: You can type keywords like “grammar”, “listening”, or “speed”.",
  },
  vi: {
    pageTitle: "Trò chơi học Tiếng Anh",
    pageDescription:
      "Chọn một trò chơi để luyện từ vựng, ngữ pháp, nghe, và tốc độ. Mọi trò chơi đều thân thiện trên di động.",
    searchPlaceholder: "Tìm kiếm trò chơi...",
    allTag: "Tất cả",
    playHint: "Nhấn để chơi",
    startButton: "Bắt đầu",
    emptyState: "Không tìm thấy trò chơi phù hợp.",
    tip: "Gợi ý: Bạn có thể gõ từ khóa như “grammar”, “listening”, hoặc “speed”.",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

export default function GamesHome() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [language, setLanguage] = useState("vi"); // 'vi' hoặc 'en'

  const t = translations[language]; // Lấy bộ ngôn ngữ hiện tại

  const tags = useMemo(() => {
    const set = new Set(["All"]);
    GAMES.forEach((g) => g.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GAMES.filter((g) => {
      const matchesQuery =
        !q ||
        g.title[language].toLowerCase().includes(q) ||
        g.description[language].toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTag = activeTag === "All" || g.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag, language]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-6 sm:p-8"
        >
          <div className="flex justify-between items-start">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.pageTitle}
            </h1>
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-slate-900/60 p-1 rounded-full">
              <button
                onClick={() => setLanguage("vi")}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  language === "vi"
                    ? "bg-indigo-500 text-white"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  language === "en"
                    ? "bg-indigo-500 text-white"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">
            <p className="text-slate-300 max-w-2xl">{t.pageDescription}</p>

            <div className="w-full md:w-96">
              <label className="relative block">
                <span className="sr-only">Search games</span>
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-slate-400" />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full rounded-2xl bg-slate-900/60 ring-1 ring-white/10 focus:ring-indigo-500/40 outline-none py-2.5 pl-10 pr-3 text-sm"
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  activeTag === tag
                    ? "bg-indigo-500 text-white shadow"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {tag === "All" ? t.allTag : tag}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filtered.map((game) => (
              <motion.div
                key={game.path}
                variants={item}
                whileHover={{ y: -4 }}
                className="group rounded-3xl bg-white/5 ring-1 ring-white/10 hover:ring-indigo-500/30 transition overflow-hidden"
              >
                <Link to={game.path} className="block h-full">
                  <div className="p-5 sm:p-6 flex items-start gap-4">
                    <div className="shrink-0 rounded-2xl p-3 bg-indigo-500/15 ring-1 ring-indigo-400/20">
                      <game.Icon className="h-6 w-6 text-indigo-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-snug">
                          {game.title[language]}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-sm text-slate-300 line-clamp-2">
                        {game.description[language]}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {game.tags.map((tg) => (
                          <span
                            key={tg}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10 text-slate-300"
                          >
                            {tg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 sm:px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 text-slate-300 text-xs">
                    <span className="opacity-90">{t.playHint}</span>
                    <span className="rounded-full px-2 py-0.5 bg-white/5 ring-1 ring-white/10 group-hover:bg-indigo-500/20 transition">
                      {t.startButton}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-slate-400"
          >
            {t.emptyState}
          </motion.div>
        )}

        <div className="mt-10 text-center text-xs text-slate-500">{t.tip}</div>
      </div>
    </div>
  );
}
