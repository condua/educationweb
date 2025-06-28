// src/data/fullCoursesDatabase.js
// File này đóng vai trò như một cơ sở dữ liệu hoặc một API endpoint trả về dữ liệu chi tiết.

const fullCoursesData = [
  {
    _id: "67e7eb75d6e33c5a021867d5",
    mentor: {
      name: "Phan Hoàng Phúc",
      avatar: "https://i.imgur.com/PsYO8z3.jpeg",
    },
    title: "Ngữ Pháp Tiếng Anh Toàn Diện",
    description:
      "Khóa học giúp bạn nắm vững toàn bộ ngữ pháp tiếng Anh từ cơ bản đến nâng cao.",
    thumbnail:
      "https://img.freepik.com/free-vector/hand-drawn-english-school-background_23-2149482186.jpg?semt=ais_hybrid",
    chapters: [
      {
        _id: "chapter_eng_1",
        title: "Chương 1: Các thì cơ bản",
        lessons: [
          {
            _id: "lesson_eng_1_1",
            title: "Bài 1: Thì Hiện tại đơn và Hiện tại tiếp diễn",
          },
        ],
      },
    ],
    category: "Language",
    price: "Free",
    rating: 4.8,
    students: 1200,
    tests: [],
  },
  {
    _id: "67e9872909978a01ea8a3d23",
    mentor: {
      name: "Lê Vũ Hà",
      avatar:
        "https://image.voh.com.vn/voh/Image/2022/07/29/ten-ha-voh-10.jpg?t=o",
    },
    title: "Hóa Hữu Cơ",
    description:
      "Nắm vững các khái niệm và phản ứng quan trọng trong Hóa học hữu cơ.",
    thumbnail:
      "https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-polygonal-chemical-molecule-poster-background-image_125106.jpg",
    chapters: [
      {
        _id: "chapter_chem_1",
        title: "Chương 1: Đại cương về Hóa hữu cơ",
        lessons: [
          {
            _id: "lesson_chem_1_1",
            title: "Bài 1: Hợp chất hữu cơ và phân loại",
          },
        ],
      },
      {
        _id: "chapter_chem_2",
        title: "Chương 2: Hydrocarbon",
        lessons: [
          { _id: "lesson_chem_2_1", title: "Bài 2: Ankan và Xicloankan" },
        ],
      },
    ],
    category: "Chemistry",
    price: "Free",
    rating: 5,
    students: 15000,
    tests: [],
  },
  {
    _id: "67ea48922b034cf65a7861c0",
    mentor: {
      name: "Phan Hoàng Phúc",
      avatar: "https://i.imgur.com/PsYO8z3.jpeg",
    },
    title: "Ôn tập tiếng Anh lớp 10",
    description:
      "Khóa học giúp bạn nắm vững toàn bộ ngữ pháp tiếng Anh từ cơ bản đến nâng cao.",
    thumbnail:
      "https://img.freepik.com/free-vector/flat-design-english-school-background_23-2149487419.jpg",
    chapters: [
      {
        _id: "67ea505e0c79880c23c26b0f",
        title: "Chương 1: Các thì trong tiếng anh",
        lessons: [
          {
            _id: "67ea521c0c79880c23c26b15",
            title: "Bài 1. Tổng hợp các thì trong tiếng Anh",
          },
        ],
      },
      {
        _id: "67ec31760b984f09fccd2b87",
        title: "Chương 2: Câu tường thuật trong tiếng Anh",
        lessons: [
          {
            _id: "67ec33d80b984f09fccd2b8b",
            title: "Bài 2. Câu tường thuật trong tiếng Anh",
          },
        ],
      },
    ],
    category: "Language",
    price: "Free",
    rating: 5,
    students: 100,
    tests: [
      {
        _id: "685c44ba188b20737e53efa0",
        title: "Kiểm tra 15 phút - Chương 1",
        durationInMinutes: 15,
      },
    ],
  },
  {
    _id: "67eff824807c321b4913ef19",
    mentor: {
      name: "Phan Hoàng Phúc",
      avatar: "https://i.imgur.com/PsYO8z3.jpeg",
    },
    title: "Ôn thi Đánh giá năng lực ĐHQG-HCM",
    description:
      "Khóa học hỗ trợ học viên cải thiện điểm thi đánh giá năng lực",
    thumbnail:
      "https://res.cloudinary.com/dy9yts4fa/image/upload/v1743779652/courses/%C4%91%C3%A1nh%20gi%C3%A1%20n%C4%83ng%20l%E1%BB%B1c/Slide1_k8o0us.jpg",
    chapters: [],
    category: "ĐGNL",
    price: "Free",
    rating: 5,
    students: 100,
    tests: [],
  },
  {
    _id: "685e67c50fbd6ed35ed1a49f",
    mentor: {
      name: "Phan Hoàng Phúc",
      avatar: "https://i.imgur.com/PsYO8z3.jpeg",
    },
    title: "Tiếng Anh 8: Chinh phục Ngữ pháp và Từ vựng",
    description:
      "Khóa học bám sát chương trình sách giáo khoa mới, giúp học sinh nắm vững kiến thức ngữ pháp trọng tâm và mở rộng vốn từ vựng theo từng chủ đề.",
    thumbnail:
      "https://res.cloudinary.com/dy9yts4fa/image/upload/v1751017313/thumbnail_igz4oc.png",
    chapters: [],
    category: "Language",
    price: "Free",
    rating: 5,
    students: 100,
    tests: [
      {
        _id: "685e6a430fbd6ed35ed1a4a3",
        title: "Kiểm tra giữa kì",
        durationInMinutes: 45,
      },
    ],
  },
];

// Hàm này mô phỏng việc gọi API để lấy chi tiết khóa học theo ID
export const fetchCourseById = (id) => {
  console.log(`Fetching course with ID: ${id}`);
  // Trả về một Promise để mô phỏng tính bất đồng bộ của API
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = fullCoursesData.find((c) => c._id === id);
      resolve(course);
    }, 500); // Giả lập độ trễ 0.5 giây
  });
};
