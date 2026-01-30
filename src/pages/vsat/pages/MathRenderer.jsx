import React, { useEffect, useRef } from "react";

const MathRenderer = ({ content, className = "", block = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !content) return;

    const processedContent = content
      .replace(/\$\$([^$]+)\$\$/g, "\\[$1\\]")
      .replace(/\$([^$]+)\$/g, "\\($1\\)");

    el.innerHTML = processedContent;

    const typeset = () => {
      if (
        window.MathJax &&
        typeof window.MathJax.typesetPromise === "function"
      ) {
        el.removeAttribute("data-mathjax-typeset");
        window.MathJax.typesetPromise([el]).catch((err) => {
          if (!err.message.includes("promise")) console.warn(err);
        });
      }
    };

    if (window.MathJax && window.MathJax.typesetPromise) {
      typeset();
    } else {
      const interval = setInterval(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          typeset();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [content]);

  const Tag = block ? "div" : "span";
  return (
    <Tag
      ref={containerRef}
      className={`math-content ${className} ${block ? "text-center my-3 block overflow-x-auto max-w-full no-scrollbar" : "inline-block break-words"}`}
    />
  );
};

export default MathRenderer;
