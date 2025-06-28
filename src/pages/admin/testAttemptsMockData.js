// src/data/testAttemptsMockData.js
// Dữ liệu này mô phỏng các bản ghi TestAttempt trong DB, đã được chuyển đổi và làm đầy thông tin.

const testAttempts = [
  //--- Dữ liệu cho Test ID: 685c44ba188b20737e53efa0 (Kiểm tra 15 phút) ---
  {
    _id: "685c460e188b20737e53efa9",
    testId: "685c44ba188b20737e53efa0", // ID của bài test
    userId: "681a179197368890663250a8", // ID của người dùng
    fullName: "Phan Hoàng Phúc", // Dữ liệu đã được làm đầy
    email: "phanphuc111@gmail.com", // Dữ liệu đã được làm đầy
    score: 100,
    userAnswers: [
      { questionId: "question1_unique_id", selectedAnswer: 1, isCorrect: true },
      {
        questionId: "question2_unique_id",
        selectedAnswer: 0,
        isCorrect: false,
      },
      {
        questionId: "question3_unique_id",
        selectedAnswer: 2,
        isCorrect: false,
      },
    ],
    startedAt: "2025-06-26T01:50:00.000Z",
    timeTaken: 120, // Giả lập dữ liệu hợp lý
  },
  {
    _id: "685c499a6aedc636edeeffcc",
    testId: "685c44ba188b20737e53efa0",
    userId: "681a179197368890663250a8",
    fullName: "Phan Hoàng Phúc",
    email: "phanphuc111@gmail.com",
    score: 100,
    userAnswers: [
      { questionId: "question1_unique_id", selectedAnswer: 1, isCorrect: true },
    ],
    startedAt: "2025-06-26T01:50:00.000Z",
    timeTaken: 95,
  },
  {
    _id: "685cedb3e718c60d1f0f6661",
    testId: "685c44ba188b20737e53efa0",
    userId: "680738c5bc2ec30f5bc586d2", // User ID khác
    fullName: "Nguyễn Văn Tester", // Dữ liệu đã được làm đầy
    email: "tester.nguyen@example.com", // Dữ liệu đã được làm đầy
    score: 40,
    userAnswers: [
      { questionId: "q1", selectedAnswer: 3, isCorrect: false },
      { questionId: "q2", selectedAnswer: 1, isCorrect: false },
      { questionId: "q3", selectedAnswer: 2, isCorrect: true },
      { questionId: "q4", selectedAnswer: 2, isCorrect: true },
      { questionId: "q5", selectedAnswer: 3, isCorrect: false },
    ],
    startedAt: "2025-06-26T06:50:14.574Z",
    timeTaken: 13,
  },
  {
    _id: "685d01fce718c60d1f0f6a1a",
    testId: "685c44ba188b20737e53efa0",
    userId: "67e1aea8ba8065555bc61fd4", // User ID khác
    fullName: "Lê Thị Bình", // Dữ liệu đã được làm đầy
    email: "binh.le@example.com", // Dữ liệu đã được làm đầy
    score: 100,
    userAnswers: [
      { questionId: "question1_unique_id", selectedAnswer: 1, isCorrect: true },
    ],
    startedAt: "2025-06-26T08:16:48.931Z",
    timeTaken: 12,
  },
  {
    _id: "685d1d56e718c60d1f0f6af5",
    testId: "685c44ba188b20737e53efa0",
    userId: "67e1aea8ba8065555bc61fd4",
    fullName: "Lê Thị Bình",
    email: "binh.le@example.com",
    score: 100,
    userAnswers: [
      { questionId: "question1_unique_id", selectedAnswer: 1, isCorrect: true },
    ],
    startedAt: "2025-06-26T10:13:32.469Z",
    timeTaken: 10,
  },

  //--- Dữ liệu cho Test ID: 685c4b3ee4f8dffdc7a64254 (Một bài test khác) ---
  {
    _id: "685c4b8ae4f8dffdc7a64273",
    testId: "685c4b3ee4f8dffdc7a64254",
    userId: "681a179197368890663250a8",
    fullName: "Phan Hoàng Phúc",
    email: "phanphuc111@gmail.com",
    score: 80,
    userAnswers: [
      { questionId: "html_q1_header", selectedAnswer: 0, isCorrect: true },
      { questionId: "html_q2_nav", selectedAnswer: 2, isCorrect: true },
      { questionId: "html_q3_figure", selectedAnswer: 1, isCorrect: false },
      { questionId: "css_q1_selector", selectedAnswer: 2, isCorrect: true },
      { questionId: "css_q2_boxmodel", selectedAnswer: 1, isCorrect: true },
    ],
    startedAt: "2025-06-26T05:14:41.139Z",
    timeTaken: 12281,
  },
  {
    _id: "685ce6a4e718c60d1f0f5df7",
    testId: "685c4b3ee4f8dffdc7a64254",
    userId: "680738c5bc2ec30f5bc586d2",
    fullName: "Nguyễn Văn Tester",
    email: "tester.nguyen@example.com",
    score: 40,
    userAnswers: [
      { questionId: "html_q1_header", selectedAnswer: 3, isCorrect: false },
      { questionId: "html_q2_nav", selectedAnswer: 3, isCorrect: false },
      { questionId: "html_q3_figure", selectedAnswer: 3, isCorrect: false },
      { questionId: "css_q1_selector", selectedAnswer: 2, isCorrect: true },
      { questionId: "css_q2_boxmodel", selectedAnswer: 1, isCorrect: true },
    ],
    startedAt: "2025-06-26T06:20:21.094Z",
    timeTaken: 356,
  },
  {
    _id: "attempt001",
    testId: "685e6a430fbd6ed35ed1a4a3",
    fullName: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    score: 88,
    startedAt: "2025-06-28T10:30:00Z",
  },
  {
    _id: "attempt002",
    testId: "685e6a430fbd6ed35ed1a4a3",
    fullName: "Trần Thị Bình",
    email: "binh.tran@example.com",
    score: 95,
    startedAt: "2025-06-28T10:32:00Z",
  },

  // Các bài làm cho test ID "685c44ba188b20737e53efa0" (Kiểm tra 15 phút)
  {
    _id: "685e6b0bb41f2ab013a057aa",
    testId: "685c44ba188b20737e53efa0",
    fullName: "Phan Hoàng Phúc",
    email: "phanphuc111@gmail.com",
    score: 100,
    userAnswers: [{ questionId: "q1", selectedAnswer: 0, isCorrect: true }],
    startedAt: "2025-06-27T09:54:25.696Z",
  },
  {
    _id: "685ea294b41f2ab013a062bc",
    testId: "685c44ba188b20737e53efa0",
    fullName: "Only You",
    email: "phanhoangphuc0311@gmail.com",
    score: 63,
    userAnswers: [{ questionId: "q1", selectedAnswer: 1, isCorrect: false }],
    startedAt: "2025-06-27T13:54:00.454Z",
  },
  {
    _id: "685e753cb41f2ab013a06116",
    testId: "685c44ba188b20737e53efa0",
    fullName: "Lê Văn Cường",
    email: "cuong.le@example.com",
    score: 50,
    userAnswers: [{ questionId: "q1", selectedAnswer: 1, isCorrect: false }],
    startedAt: "2025-06-27T10:40:32.917Z",
  },
];

/**
 * Hàm này mô phỏng việc gọi API để lấy các bài làm theo testId.
 * Nó tìm kiếm trong mảng `testAttempts` ở trên.
 * @param {string} testId - ID của bài kiểm tra cần lấy kết quả.
 * @returns {Promise<Array>} - Một promise sẽ trả về mảng các lượt làm bài.
 */
export const fetchAttemptsByTestId = (testId) => {
  console.log(`Fetching attempts for Test ID: ${testId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = testAttempts.filter(
        (attempt) => attempt.testId === testId
      );
      resolve(results);
    }, 300); // Giả lập độ trễ mạng
  });
};
