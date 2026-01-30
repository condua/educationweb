import mathData from "./exam_math_2025.json";

export const EXAM_DATABASE = [
  {
    id: "vsat-math-2025",
    title: "ĐỀ THI MINH HỌA VSAT 2025",
    subject: "Toán học",
    duration: 90,
    level: "Trung bình",
    participants: 4521,
    tags: ["VSAT", "Đại học", "2025"],
    data: mathData, // Link tới file JSON
  },
  {
    id: "vsat-math-mock-02",
    title: "ĐỀ LUYỆN TẬP SỐ 02",
    subject: "Toán học",
    duration: 60,
    level: "Khó",
    participants: 120,
    tags: ["Luyện tập"],
    data: mathData, // Demo
  },
];
