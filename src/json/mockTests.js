export const MOCK_TESTS = [
  {
    id: 1,
    title: "Kiểm tra giữa kỳ - Toán cao cấp",
    // Bài kiểm tra chỉ diễn ra trong 1 ngày
    startDate: "2025-07-10T09:00:00.000Z",
    endDate: null, // Không có ngày kết thúc
    courseId: "COURSE_MATH_101",
  },
  {
    id: 2,
    title: "Nộp bài tập lớn - Lập trình Web",
    // Bài kiểm tra có khoảng thời gian để làm
    startDate: "2025-07-15T00:00:00.000Z",
    endDate: "2025-07-20T23:59:59.000Z",
    courseId: "COURSE_WEB_DEV_202",
  },
  {
    id: 3,
    title: "Kiểm tra 15 phút - Vật lý đại cương",
    startDate: "2025-07-21T14:00:00.000Z",
    endDate: null,
    courseId: "COURSE_PHY_101",
  },
  {
    id: 4,
    title: "Thi cuối kỳ - Nhập môn AI",
    startDate: "2025-06-28T08:00:00.000Z",
    endDate: null,
    courseId: "COURSE_AI_101",
  },
];
