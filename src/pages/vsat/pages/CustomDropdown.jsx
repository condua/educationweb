import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import MathRenderer from "./MathRenderer";

const CustomDropdown = ({
  options,
  value,
  onChange,
  disabled,
  darkMode,
  placeholder = "Choose...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optFullString) => {
    if (disabled) return;
    const optValue = optFullString.split(".")[0];
    onChange(optValue);
    setIsOpen(false);
  };

  const selectedOptionText = options.find((opt) => opt.startsWith(value + "."));
  const baseBorder = darkMode ? "border-slate-600" : "border-gray-300";
  const bgClass = darkMode ? "bg-slate-700" : "bg-gray-50";
  const textClass = darkMode ? "text-white" : "text-gray-900";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full p-2.5 text-sm rounded-lg border ${baseBorder} ${bgClass} ${textClass} flex justify-between items-center focus:ring-2 focus:ring-purple-500 focus:outline-none text-left min-h-[42px] transition-colors`}
      >
        <div className="flex-1 mr-2 truncate">
          {selectedOptionText ? (
            <MathRenderer content={selectedOptionText} />
          ) : (
            <span className="opacity-50">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`opacity-50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-1 rounded-lg shadow-xl max-h-60 overflow-y-auto border animate-in fade-in zoom-in-95 duration-100 ${darkMode ? "bg-slate-800 border-slate-600" : "bg-white border-gray-200"}`}
        >
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(opt)}
              className={`p-3 text-sm cursor-pointer border-b last:border-b-0 transition-colors flex items-center ${darkMode ? "border-slate-700 hover:bg-slate-700 text-gray-200" : "border-gray-50 hover:bg-indigo-50 text-gray-800"}`}
            >
              <MathRenderer content={opt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
