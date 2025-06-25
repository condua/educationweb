import React from "react";
import { useParams, Link } from "react-router-dom";
// Component này import từ file allTests.js
import { ALL_TESTS } from "../../json/allTests";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const TestOverview = () => {
  const { testId } = useParams();

  // Dùng `testId` từ URL để TÌM bài test trong mảng ALL_TESTS
  // Chúng ta dùng `==` thay vì `===` để không bị lỗi so sánh number và string
  const test = ALL_TESTS.find((t) => t.id == testId);

  // Xử lý trường hợp không tìm thấy bài test
  if (!test) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">Lỗi 404</h1>
          <p className="text-gray-500 mt-2">
            Không tìm thấy bài kiểm tra bạn yêu cầu.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Nếu tìm thấy, JSX bên dưới sẽ hiển thị đúng dữ liệu chi tiết
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {test.title}
        </h1>
        <p className="mt-2 text-gray-600">{test.description}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-600">Thời gian</p>
            <p className="text-xl font-bold text-blue-900">
              {test.durationInMinutes} phút
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-600">Số câu hỏi</p>
            <p className="text-xl font-bold text-green-900">
              {test.questionCount}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-yellow-600">Điểm cao nhất</p>
            <p className="text-xl font-bold text-yellow-900">
              {test.highestScore.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to={`/test/${test.id}/take`}
            className="w-full sm:w-auto inline-block bg-blue-600 text-white font-bold text-lg px-12 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Bắt đầu làm bài
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800">Lịch sử làm bài</h2>
          <div className="mt-4 flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {test.history.length > 0 ? (
                test.history.map((attempt) => (
                  <li
                    key={attempt.attemptId}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        Lần làm bài ngày{" "}
                        {format(new Date(attempt.date), "dd/MM/yyyy HH:mm", {
                          locale: vi,
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {attempt.score.toFixed(1)} điểm
                      </p>
                      <Link
                        to={`/test/${test.id}/results/${attempt.attemptId}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">
                  Bạn chưa làm bài kiểm tra này lần nào.
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOverview;
