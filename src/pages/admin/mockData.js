// src/data/mockData.js

// Dữ liệu này mô phỏng những gì API của bạn sẽ trả về

export const statsCards = [
  {
    title: "Tổng Doanh Thu",
    value: "1,250,000,000₫",
    change: "+15.2%",
    changeType: "increase",
    icon: "revenue",
  },
  {
    title: "Học Viên Mới",
    value: "352",
    change: "+21.7%",
    changeType: "increase",
    icon: "users",
  },
  {
    title: "Lượt Ghi Danh",
    value: "819",
    change: "-2.1%",
    changeType: "decrease",
    icon: "enrollments",
  },
  {
    title: "Khóa Học Chờ Duyệt",
    value: "5",
    change: "0",
    changeType: "neutral",
    icon: "pending",
  },
];

export const revenueData = [
  { month: "Thg 1", revenue: 45000000 },
  { month: "Thg 2", revenue: 52000000 },
  { month: "Thg 3", revenue: 78000000 },
  { month: "Thg 4", revenue: 65000000 },
  { month: "Thg 5", revenue: 88000000 },
  { month: "Thg 6", revenue: 95000000 },
];

export const topCourses = [
  {
    id: "course001",
    title: "Lập trình ReactJS từ A đến Z",
    thumbnail: "https://placehold.co/100x60/3498db/ffffff?text=React",
    students: 1250,
    price: "799,000₫",
  },
  {
    id: "course002",
    title: "Mastering NodeJS & Express",
    thumbnail: "https://placehold.co/100x60/2ecc71/ffffff?text=Node",
    students: 980,
    price: "699,000₫",
  },
  {
    id: "course003",
    title: "Thiết kế UI/UX cho người mới bắt đầu",
    thumbnail: "https://placehold.co/100x60/9b59b6/ffffff?text=UI/UX",
    students: 2100,
    price: "499,000₫",
  },
];

export const recentActivities = [
  {
    id: "act001",
    user: {
      name: "Trần Văn Hoàng",
      avatar: "https://placehold.co/40x40/f1c40f/333333?text=H",
    },
    action: "đã ghi danh vào khóa học",
    target: "Lập trình ReactJS từ A đến Z",
    time: "5 phút trước",
  },
  {
    id: "act002",
    user: {
      name: "Lê Thị Thảo",
      avatar: "https://placehold.co/40x40/e74c3c/ffffff?text=T",
    },
    action: "đã hoàn thành bài kiểm tra",
    target: "Kiểm tra cuối khóa NodeJS",
    time: "2 giờ trước",
  },
  {
    id: "act003",
    user: {
      name: "Nguyễn Anh Dũng",
      avatar: "https://placehold.co/40x40/3498db/ffffff?text=D",
    },
    action: "đã đăng ký tài khoản mới",
    target: "",
    time: "3 giờ trước",
  },
];
