import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Sử dụng Link để điều hướng
import { motion, useReducedMotion } from "framer-motion";

export default function TopicSelectionPage() {
  const [allTopics, setAllTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/grammar.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllTopics(data);
      } catch (error) {
        console.error("Could not fetch grammar topics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-dvh w-full bg-gradient-to-br from-slate-900 to-indigo-900 text-white flex items-center justify-center">
        <p className="text-2xl animate-pulse">Loading Grammar Gym...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh w-full bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-4 font-sans flex flex-col items-center justify-center pb-[env(safe-area-inset-bottom)]">
      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
            Grammar Gym
          </span>{" "}
          💪
        </h1>
        <p className="text-slate-300 mt-4 max-w-xl mx-auto">
          Choose a muscle group (grammar topic) to train your English skills.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {allTopics.map((topic) => (
          // Thay thế button bằng Link
          <Link to={`/grammar-game/${topic.slug}`} key={topic.slug}>
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 h-full rounded-2xl bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 text-xl font-semibold hover:bg-cyan-500/10 hover:ring-cyan-400 transition-all flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="text-4xl" aria-hidden>
                {topic.icon}
              </span>
              <span className="truncate">{topic.topic}</span>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-xs text-slate-400">
        Tip: bạn có thể trả lời bằng phím 1–4 / A–D
      </div>
    </div>
  );
}
