// File này chứa dữ liệu chi tiết đầy đủ cho từng bài test.
export const ALL_TESTS = [
  {
    id: 1, // Khớp với id trong mockTests.js
    title: "Kiểm tra giữa kỳ - Toán cao cấp",
    description:
      "Bài kiểm tra bao gồm các câu hỏi về Giới hạn, Đạo hàm và Tích phân cơ bản. Sinh viên được sử dụng tài liệu.",
    durationInMinutes: 90,
    questionCount: 3, // Cập nhật số câu hỏi
    highestScore: 8.5,
    history: [
      {
        attemptId: "attempt-math-001",
        date: "2025-06-20T10:00:00Z",
        score: 8.5,
      },
    ],
    questionGroups: [
      {
        type: "single_question_group",
        id: "math_group_1",
        instructions: "Chọn đáp án đúng nhất cho các câu hỏi sau.",
        title: "Phần I: Câu hỏi trắc nghiệm",
        passage: null, // Không có đoạn văn cho dạng câu hỏi này
        group_questions: [
          {
            id: "math_q1",
            question: "Tính đạo hàm của hàm số f(x) = sin(2x)?",
            options: [
              "A. cos(2x)",
              "B. -cos(2x)",
              "C. 2cos(2x)",
              "D. -2cos(2x)",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Áp dụng quy tắc đạo hàm của hàm hợp (chain rule), (sin(u))' = u' * cos(u). Với u = 2x, u' = 2. Do đó, (sin(2x))' = 2cos(2x).",
          },
          {
            id: "math_q2",
            question: "Tính giới hạn lim(x->∞) (3x^2 + 2x) / (x^2 - 4)?",
            options: ["A. 0", "B. 3", "C. -1/2", "D. ∞"],
            correctAnswerIndex: 1,
            explanation:
              "Khi x tiến đến vô cùng, giới hạn của một phân thức hữu tỉ bằng tỉ số của các hệ số bậc cao nhất ở tử và mẫu. Ở đây là 3/1 = 3.",
          },
          {
            id: "math_q3",
            question: "Tính tích phân bất định của ∫(2x)dx?",
            options: ["A. 2", "B. 2x^2 + C", "C. x^2 + C", "D. x^2"],
            correctAnswerIndex: 2,
            explanation:
              "Nguyên hàm của 2x là (2 * x^(1+1))/(1+1) = x^2. Tích phân bất định luôn cần cộng thêm hằng số C.",
          },
        ],
      },
    ],
  },
  {
    id: 2, // Khớp với id trong mockTests.js
    title: "Nộp bài tập lớn - Lập trình Web",
    description:
      "Nộp dự án website cá nhân đã được giao. Hệ thống sẽ chấm tự động dựa trên các tiêu chí về HTML, CSS, và JavaScript.",
    durationInMinutes: 0,
    questionCount: 0,
    highestScore: 9.5,
    history: [
      {
        attemptId: "attempt-web-001",
        date: "2025-06-22T10:00:00Z",
        score: 9.5,
      },
    ],
    questionGroups: [], // Bài này không có câu hỏi trắc nghiệm
  },
  {
    id: 3, // Khớp với id trong mockTests.js
    title: "Kiểm tra 15 phút - Vật lý đại cương",
    description: "2 câu hỏi trắc nghiệm nhanh về các định luật Newton.",
    durationInMinutes: 15,
    questionCount: 2, // Cập nhật số câu hỏi
    highestScore: 10.0,
    history: [],
    questionGroups: [
      {
        type: "single_question_group",
        id: "phy_group_1",
        instructions: "Chọn đáp án đúng nhất cho các câu hỏi sau.",
        title: "Câu hỏi trắc nghiệm",
        passage: null,
        group_questions: [
          {
            id: "phy_q1",
            question:
              "Theo Định luật II Newton, gia tốc của một vật cùng hướng với...",
            options: [
              "A. vận tốc của vật.",
              "B. khối lượng của vật.",
              "C. trọng lượng của vật.",
              "D. lực tác dụng lên vật.",
            ],
            correctAnswerIndex: 3,
            explanation:
              "Định luật II Newton (F = ma) phát biểu rằng gia tốc (a) của một vật tỷ lệ thuận và cùng hướng với lực tổng hợp (F) tác dụng lên nó.",
          },
          {
            id: "phy_q2",
            question:
              "Một vật đang đứng yên trên mặt phẳng ngang. Lực ma sát nghỉ tác dụng lên vật có độ lớn bằng bao nhiêu?",
            options: [
              "A. Bằng 0",
              "B. Lớn hơn trọng lực",
              "C. Bằng lực kéo/đẩy tác dụng lên vật",
              "D. Bằng tích của hệ số ma sát và áp lực",
            ],
            correctAnswerIndex: 0,
            explanation:
              "Khi vật đứng yên và không có ngoại lực nào theo phương ngang tác dụng lên nó, lực ma sát nghỉ bằng 0.",
          },
        ],
      },
    ],
  },
  {
    id: 4, // Khớp với id trong mockTests.js
    title: "Thi cuối kỳ - Nhập môn AI",
    description: "Đề thi gồm 2 câu trắc nghiệm bao quát nội dung môn học.",
    durationInMinutes: 60,
    questionCount: 2, // Cập nhật số câu hỏi
    highestScore: 7.0,
    history: [
      { attemptId: "attempt-ai-001", date: "2025-06-19T10:00:00Z", score: 6.0 },
      { attemptId: "attempt-ai-002", date: "2025-06-21T15:00:00Z", score: 7.0 },
    ],
    questionGroups: [
      {
        type: "single_question_group",
        id: "ai_group_1",
        instructions: "Chọn đáp án đúng nhất cho các câu hỏi sau.",
        title: "Phần I: Các khái niệm cơ bản",
        passage: null,
        group_questions: [
          {
            id: "ai_q1",
            question:
              "Thuật toán nào sau đây thuộc loại học không giám sát (Unsupervised Learning)?",
            options: [
              "A. Hồi quy tuyến tính (Linear Regression)",
              "B. K-Means Clustering",
              "C. Máy vector hỗ trợ (Support Vector Machine)",
              "D. Cây quyết định (Decision Tree)",
            ],
            correctAnswerIndex: 1,
            explanation:
              "K-Means Clustering là thuật toán phân cụm dữ liệu không cần nhãn, đây là đặc trưng của học không giám sát. Các thuật toán còn lại đều là học có giám sát.",
          },
          {
            id: "ai_q2",
            question:
              "Trong xử lý ngôn ngữ tự nhiên (NLP), 'tokenization' là quá trình gì?",
            options: [
              "A. Dịch một câu sang ngôn ngữ khác.",
              "B. Tóm tắt một đoạn văn bản dài.",
              "C. Phân tích cú pháp của một câu.",
              "D. Tách một chuỗi văn bản thành các đơn vị nhỏ hơn (từ, ký tự).",
            ],
            correctAnswerIndex: 3,
            explanation:
              "Tokenization là bước tiền xử lý cơ bản trong NLP, nhằm mục đích tách văn bản thành các đơn vị (tokens) để máy tính có thể xử lý được.",
          },
        ],
      },
    ],
  },
];
