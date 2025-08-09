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

/**
 * GamesHome.jsx
 * A beautiful home page listing all learning games with search, tag filters, and motion effects.
 * - React + Tailwind CSS + framer-motion
 * - Drop-in component; requires react-router-dom for <Link>
 */

const GAMES = [
  {
    title: "Vocabulary Builder",
    path: "/vocabulary-game",
    description:
      "Practice and expand vocabulary through quick, fun challenges.",
    Icon: BookOpen,
    tags: ["Vocabulary", "Practice"],
  },
  {
    title: "Sentence Scramble",
    path: "/game2",
    description: "Reorder scrambled words to form correct sentences.",
    Icon: Shuffle,
    tags: ["Grammar", "Sentence"],
  },
  {
    title: "Listening Challenge",
    path: "/listening-game",
    description: "Sharpen listening skills and pick the right answer.",
    Icon: Headphones,
    tags: ["Listening"],
  },
  {
    title: "Typing Sprint",
    path: "/typing-game",
    description: "Race the clock while typing English words accurately.",
    Icon: Keyboard,
    tags: ["Typing", "Speed"],
  },
  {
    title: "Grammar Master",
    path: "/grammar-game",
    description: "Tackle grammar drills and level up your accuracy.",
    Icon: BadgeCheck,
    tags: ["Grammar"],
  },
  {
    title: "Matching Pairs",
    path: "/matching-game",
    description: "Match words with meanings to test your memory.",
    Icon: Puzzle,
    tags: ["Memory", "Vocabulary"],
  },
  {
    title: "Wordfall",
    path: "/wordfall-game",
    description: "Catch the right words before they fall — arcade style!",
    Icon: CloudRain,
    tags: ["Arcade", "Vocabulary"],
  },
  {
    title: "Galaxy Grammar",
    path: "/galaxy-grammar-game",
    description: "Travel the galaxy and conquer grammar missions.",
    Icon: Star,
    tags: ["Grammar", "Arcade"],
  },
  {
    title: "Grammar Detective",
    path: "/detective-game",
    description: "Solve cases by spotting grammar clues and patterns.",
    Icon: Brain,
    tags: ["Grammar", "Logic"],
  },
  {
    title: "English Word Sprint",
    path: "/english-word-sprint",
    description: "A 60s sprint: listen, think fast, and choose correctly.",
    Icon: Gamepad2,
    tags: ["Speed", "Vocabulary"],
  },
  {
    title: "Who Wants to Be a Millionaire?",
    path: "/millionaire-game",
    description: "15 questions, lifelines, and a ladder of prizes. Good luck!",
    Icon: Trophy,
    tags: ["Quiz", "General"],
  },
];

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
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTag = activeTag === "All" || g.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                English Learning Games
              </h1>
              <p className="mt-2 text-slate-300 max-w-2xl">
                Chọn một trò chơi để luyện từ vựng, ngữ pháp, nghe, và tốc độ.
                Mọi trò chơi đều thân thiện trên di động.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-96">
              <label className="relative block">
                <span className="sr-only">Search games</span>
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-slate-400" />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm kiếm trò chơi..."
                  className="w-full rounded-2xl bg-slate-900/60 ring-1 ring-white/10 focus:ring-indigo-500/40 outline-none py-2.5 pl-10 pr-3 text-sm"
                />
              </label>
            </div>
          </div>

          {/* Tag Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  activeTag === t
                    ? "bg-indigo-500 text-white shadow"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid of Games */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filtered.map(({ title, path, description, Icon, tags }) => (
              <motion.div
                key={path}
                variants={item}
                whileHover={{ y: -4 }}
                className="group rounded-3xl bg-white/5 ring-1 ring-white/10 hover:ring-indigo-500/30 transition overflow-hidden"
              >
                <Link to={path} className="block h-full">
                  <div className="p-5 sm:p-6 flex items-start gap-4">
                    <div className="shrink-0 rounded-2xl p-3 bg-indigo-500/15 ring-1 ring-indigo-400/20">
                      <Icon className="h-6 w-6 text-indigo-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-snug">
                          {title}
                        </h3>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-slate-400"
                        >
                          Play →
                        </motion.span>
                      </div>
                      <p className="mt-1.5 text-sm text-slate-300 line-clamp-2">
                        {description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tags.map((tg) => (
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

                  {/* Subtle progress/cta bar */}
                  <div className="flex items-center justify-between px-5 sm:px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 text-slate-300 text-xs">
                    <span className="opacity-90">Nhấn để chơi</span>
                    <span className="rounded-full px-2 py-0.5 bg-white/5 ring-1 ring-white/10 group-hover:bg-indigo-500/20 transition">
                      Bắt đầu
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-slate-400"
          >
            Không tìm thấy trò chơi phù hợp.
          </motion.div>
        )}

        {/* Footer hint */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Tip: Bạn có thể gõ từ khóa như “grammar”, “listening”, hoặc “speed”.
        </div>
      </div>
    </div>
  );
}
