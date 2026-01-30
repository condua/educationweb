import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Sun,
  Moon,
  Trophy,
  Clock,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { EXAM_DATABASE } from "../data/examsList";

const ExamDashboard = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"}`}
    >
      <header
        className={`sticky top-0 z-0 shadow-sm backdrop-blur-md ${darkMode ? "bg-slate-900/80 border-b border-slate-700" : "bg-white/80 border-b border-gray-200"}`}
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none tracking-tight">
                MLPA E&T
              </h1>
              <p
                className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Hệ thống luyện thi Đại học
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${darkMode ? "bg-slate-800 text-yellow-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Thư viện đề thi
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Chọn đề thi để bắt đầu làm bài.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAM_DATABASE.map((exam) => (
            <div
              key={exam.id}
              className={`group relative flex flex-col rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkMode ? "bg-slate-800 border-slate-700 hover:border-indigo-500/50" : "bg-white border-slate-200 hover:border-indigo-200"}`}
            >
              <div
                className={`h-2 absolute top-0 left-0 right-0 rounded-t-2xl bg-gradient-to-r ${exam.subject.includes("Toán") ? "from-blue-500 to-cyan-400" : "from-purple-500 to-pink-500"}`}
              ></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"}`}
                  >
                    {exam.subject}
                  </span>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold ${exam.level === "Dễ" ? "text-emerald-500" : exam.level === "Trung bình" ? "text-yellow-500" : "text-rose-500"}`}
                  >
                    <Trophy size={14} /> {exam.level}
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold mb-3 leading-snug group-hover:text-indigo-500 transition-colors ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                >
                  {exam.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {exam.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-full border ${darkMode ? "border-slate-600 text-slate-400" : "border-slate-200 text-slate-500"}`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div
                  className={`mt-auto pt-4 border-t flex items-center justify-between text-sm ${darkMode ? "border-slate-700 text-slate-400" : "border-slate-100 text-slate-500"}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock size={16} /> {exam.duration}'
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={16} /> {exam.participants}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  className="w-full py-3 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Bắt đầu làm bài <ArrowLeft className="rotate-180" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;
