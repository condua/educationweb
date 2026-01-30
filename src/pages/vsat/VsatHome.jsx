import React, { useState, useEffect } from "react";
import ExamDashboard from "./pages/ExamDashboard";
import ExamSession from "./pages/ExamSession";

export default function VsatHome() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load MathJax Script Global
  useEffect(() => {
    if (!document.getElementById("mathjax-script")) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
      script.async = true;
      script.id = "mathjax-script";
      document.head.appendChild(script);

      window.MathJax = {
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
        },
        svg: { fontCache: "global" },
        startup: { typeset: false },
      };
    }
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  if (selectedExam) {
    return (
      <ExamSession
        examData={selectedExam.data} // Truyền data chi tiết từ JSON
        onBack={() => setSelectedExam(null)}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <ExamDashboard
      onSelectExam={setSelectedExam}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />
  );
}
