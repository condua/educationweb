// src/components/MathRenderer.jsx
import React, { useRef, useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css"; // Đảm bảo CSS được import, có thể đã có ở file chính

const MathRenderer = ({ latex, displayMode = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && latex) {
      try {
        katex.render(latex, containerRef.current, {
          throwOnError: false, // Không ném lỗi mà hiển thị lỗi LaTeX
          displayMode: displayMode, // true cho block, false cho inline
          // Các tùy chọn KaTeX khác nếu cần
        });
      } catch (e) {
        // Xử lý lỗi nếu KaTeX không thể render (ví dụ: cú pháp LaTeX sai)
        console.error("KaTeX rendering error:", e);
        containerRef.current.innerHTML = `<span style="color:red;">Lỗi LaTeX: ${e.message}</span>`;
      }
    } else if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Xóa nội dung nếu không có latex
    }
  }, [latex, displayMode]);

  return <span ref={containerRef} />; // Sử dụng span cho inline, div cho block nếu displayMode là true
};

export default MathRenderer;
