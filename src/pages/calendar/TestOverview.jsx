import React, { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestForTaking, clearCurrentTest } from "../../redux/testSlice";
import {
  fetchMyAttemptsForTest,
  clearAttemptsForTest,
} from "../../redux/testAttemptSlice";

import {
  ClockIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

// --- CÁC COMPONENT PHỤ (Không thay đổi) ---

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-600"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="text-center p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-red-700">Đã xảy ra lỗi</h1>
      <p className="text-gray-500 mt-2">
        {message || "Không thể tải dữ liệu. Vui lòng thử lại."}
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Quay về trang chủ
      </Link>
    </div>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// --- COMPONENT CHÍNH (Đã được tối ưu) ---

const TestOverview = () => {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    currentTest: test,
    status: testStatus,
    error: testError,
  } = useSelector((state) => state.tests);

  // ✅ BƯỚC 3: LẤY THÔNG TIN USER TỪ AUTH SLICE
  const { user } = useSelector((state) => state.auth);
  const { attemptsForSingleTest, status: attemptStatus } = useSelector(
    (state) => state.testAttempts
  );

  const courseId = useParams().courseId; // Lấy courseId từ test hoặc params

  useEffect(() => {
    if (testId) {
      dispatch(fetchTestForTaking(testId));
      dispatch(fetchMyAttemptsForTest(testId));
    }
    return () => {
      dispatch(clearCurrentTest());
      dispatch(clearAttemptsForTest());
    };
  }, [dispatch, testId]);

  // ✅ BƯỚC 4: THÊM useEffect ĐỂ KIỂM TRA QUYỀN TRUY CẬP
  // useEffect(() => {
  //   // Chỉ kiểm tra khi đã có đủ thông tin user và test
  //   if (user) {
  //     // Bỏ qua kiểm tra nếu là admin
  //     if (user.role === "admin") {
  //       return;
  //     }

  //     // Kiểm tra xem test.course có trong danh sách enrolledCourses của user không
  //     // Giả sử enrolledCourses là một mảng các ID của khóa học
  //     const isEnrolled = user.enrolledCourses?.includes(courseId);

  //     if (!isEnrolled) {
  //       // Nếu không, chuyển hướng về trang danh sách khóa học
  //       alert("Bạn chưa tham gia khóa học này. Đang chuyển hướng...");
  //       navigate("/courses");
  //     }
  //   }
  // }, [user, test, courseId, navigate]);
  const questionCount = useMemo(
    () =>
      test
        ? test.questionGroups.reduce(
            (acc, group) => acc + (group.group_questions?.length || 0),
            0
          )
        : 0,
    [test]
  );

  const highestScore = useMemo(() => {
    const history = attemptsForSingleTest || [];
    if (history.length === 0) {
      return 0;
    }
    return Math.max(...history.map((a) => a.score));
  }, [attemptsForSingleTest]);

  if (testStatus === "loading" || attemptStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (testStatus === "failed" || !test) {
    return (
      <ErrorDisplay
        message={
          testError?.message || "Không tìm thấy bài kiểm tra bạn yêu cầu."
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Phần Header: Giảm padding trên mobile */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            {/* Link quay về */}
            {test?.course && (
              <div className="mb-6">
                <Link
                  to={`/course/${test.course}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Quay về khóa học</span>
                </Link>
              </div>
            )}

            {/* Tiêu đề và icon */}
            <div className="flex items-start sm:items-center gap-4 mb-6">
              <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-xl p-2">
                <DocumentTextIcon className="h-7 w-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-snug">
                {test.title}
              </h1>
            </div>

            {/* Mô tả bài kiểm tra */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {test.description || "Không có mô tả cho bài kiểm tra này."}
            </p>
          </div>

          {/* Phần các thẻ thông số: Giảm padding và gap trên mobile */}
          <div className="p-6 md:p-8 bg-slate-50/70 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              icon={<ClockIcon className="h-10 w-10 text-sky-500" />}
              label="Thời gian làm bài"
              value={`${test.durationInMinutes} phút`}
            />
            <StatCard
              icon={
                <QuestionMarkCircleIcon className="h-10 w-10 text-teal-500" />
              }
              label="Tổng số câu hỏi"
              value={questionCount}
            />
            <StatCard
              icon={<StarIcon className="h-10 w-10 text-amber-500" />}
              label="Điểm cao nhất"
              value={`${highestScore.toFixed(1)}`}
            />
          </div>

          {/* Nút bắt đầu: Giảm padding trên mobile */}
          <div className="p-6 md:p-8 text-center">
            <Link
              to={`/course/${courseId}/test/${test._id}/take`}
              state={{ startedAt: new Date().toISOString() }}
              className="inline-flex items-center justify-center gap-x-3 w-full sm:w-auto bg-indigo-600 text-white font-bold text-base sm:text-lg px-8 py-3 sm:px-14 sm:py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Bắt đầu làm bài
              <ArrowRightIcon className="h-6 w-6" />
            </Link>
          </div>

          {/* Phần Lịch sử làm bài: Giảm padding và tối ưu layout item */}
          <div className="p-6 md:p-8 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <ClockIcon className="h-7 w-7 text-gray-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Lịch sử làm bài của bạn
              </h2>
            </div>
            <div className="space-y-4">
              {attemptsForSingleTest && attemptsForSingleTest.length > 0 ? (
                [...attemptsForSingleTest]
                  .sort(
                    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
                  )
                  .map((attempt) => (
                    <div
                      key={attempt._id}
                      // Tối ưu layout: căn trái trên mobile, căn giữa trên desktop
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 text-gray-700">
                        <CalendarDaysIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">
                          {format(
                            new Date(attempt.completedAt),
                            "HH:mm 'ngày' dd/MM/yyyy",
                            { locale: vi }
                          )}
                        </span>
                      </div>
                      {/* Tối ưu layout cho phần điểm và nút */}
                      <div className="w-full sm:w-auto flex flex-row items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                        <div className="flex items-center gap-2 text-lg">
                          <CheckCircleIcon className="h-6 w-6 text-green-500" />
                          <p className="font-bold text-gray-900">
                            {attempt.score.toFixed(1)} điểm
                          </p>
                        </div>
                        <Link
                          to={`/course/${courseId}/test/${test._id}/results/${attempt._id}`}
                          className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors whitespace-nowrap"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    Bạn chưa làm bài kiểm tra này lần nào.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOverview;
