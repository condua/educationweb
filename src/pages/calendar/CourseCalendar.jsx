import React, { useState, useMemo } from "react";
// BƯỚC 1: Import Link từ react-router-dom
import { Link } from "react-router-dom";
// Đảm bảo đường dẫn này đúng với cấu trúc dự án của bạn
import { MOCK_TESTS } from "../../json/mockTests";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { vi } from "date-fns/locale";

const getTestsForDay = (day, tests) => {
  return tests.filter((test) => {
    const startDate = parseISO(test.startDate);
    if (test.endDate) {
      const endDate = parseISO(test.endDate);
      return isWithinInterval(day, { start: startDate, end: endDate });
    }
    return isSameDay(day, startDate);
  });
};

const CourseCalendarFinal = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const testsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return getTestsForDay(selectedDate, MOCK_TESTS);
  }, [selectedDate, MOCK_TESTS]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDayClick = (day) => {
    if (isSameMonth(day, monthStart)) {
      setSelectedDate(day);
    }
  };

  return (
    <div className="p-2 sm:p-4 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg">
      {/* Header và Lưới Lịch (không thay đổi) */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="text-left">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
            {format(currentDate, "MMMM", { locale: vi })}
          </h2>
          <p className="text-gray-500 font-medium">
            {format(currentDate, "yyyy")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToToday}
            className="hidden sm:block px-4 py-2 text-sm font-semibold text-blue-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Hôm nay
          </button>
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-semibold text-gray-500 py-2 border-b-2 border-gray-100"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const testsOnDay = getTestsForDay(day, MOCK_TESTS);
          const hasTest = testsOnDay.length > 0;
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          return (
            <div
              key={day.toString()}
              onClick={() => handleDayClick(day)}
              className={`relative p-1 sm:p-2 border-t border-gray-100 h-16 sm:h-20 md:h-28 lg:h-32 transition-colors duration-300 ${
                isCurrentMonth
                  ? "cursor-pointer hover:bg-gray-50"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
              } ${isSelected ? "!bg-blue-50 border-l-4 border-blue-500" : ""}`}
            >
              <span
                className={`text-xs sm:text-sm ${
                  isToday(day) &&
                  "flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold"
                } ${
                  isSelected && !isToday(day) ? "text-blue-600 font-bold" : ""
                }`}
              >
                {format(day, "d")}
              </span>
              {isCurrentMonth && hasTest && (
                <div className="mt-1">
                  <div className="block lg:hidden">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto"></div>
                  </div>
                  <div className="hidden lg:block text-xs text-yellow-800 bg-yellow-100 p-1 rounded-md font-semibold truncate">
                    {testsOnDay[0].title}
                    {testsOnDay.length > 1 && ` +${testsOnDay.length - 1}`}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Khu vực hiển thị chi tiết - Nơi chúng ta thay đổi */}
      <div className="mt-4 lg:mt-6 pt-4 border-t border-gray-200 px-2">
        <h3 className="font-bold text-base sm:text-lg text-gray-800">
          Lịch trình ngày{" "}
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "..."}
        </h3>
        {testsForSelectedDate.length > 0 ? (
          <ul className="mt-2 space-y-3">
            {testsForSelectedDate.map((test) => (
              // BƯỚC 2: Bọc mỗi mục trong thẻ <Link> để có thể điều hướng
              // Thẻ <li> vẫn giữ key để React quản lý danh sách hiệu quả
              <li key={test.id}>
                <Link
                  to={`/test/${test.id}`}
                  className="block p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg hover:bg-yellow-100 transition-colors"
                >
                  <p className="font-semibold text-sm sm:text-base text-yellow-900">
                    {test.title}
                  </p>
                  <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                    Bắt đầu:{" "}
                    {format(parseISO(test.startDate), "HH:mm, dd/MM/yyyy")}
                  </p>
                  {test.endDate && (
                    <p className="text-xs sm:text-sm text-yellow-700">
                      Kết thúc:{" "}
                      {format(parseISO(test.endDate), "HH:mm, dd/MM/yyyy")}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Không có lịch trình.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCalendarFinal;
