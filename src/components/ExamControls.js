import React from "react";

const ExamControls = ({ onPrevious, onNext, isFirst, isLast }) => {
  return (
    <div className="mt-8 flex w-full justify-between">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        Câu trước
      </button>
      <button
        onClick={onNext}
        className={`transform rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 ${
          isLast
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLast ? "Hoàn thành bài thi" : "Câu tiếp theo"}
      </button>
    </div>
  );
};

export default ExamControls;
