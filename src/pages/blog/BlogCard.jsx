import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Điều hướng đến trang chi tiết bài blog khi click vào card
    navigate(`/blog/${blog._id}`); // Sử dụng _id từ MongoDB thay vì id
  };
  // Định dạng ngày tháng
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long", // "Thứ ba"
    day: "numeric", // "15"
    month: "numeric", // "4"
    year: "numeric", // "2025"
    hour: "2-digit", // "21"
    minute: "2-digit", // "57"
    // timeZoneName: "short", // "GMT+7"
    // timeZone: "Asia/Ho_Chi_Minh", // Đảm bảo múi giờ là GMT+7
  }).format(new Date(blog.createdAt));
  // Hàm tính thời gian đọc
  const getReadingTime = (content) => {
    const words = content.split(/\s+/).length; // Đếm số từ
    const wordsPerMinute = 200; // Số từ đọc trung bình mỗi phút
    const minutes = Math.ceil(words / wordsPerMinute); // Thời gian đọc làm tròn lên phút
    return minutes;
  };

  // Lấy thời gian đọc từ nội dung bài blog
  const readingTime = getReadingTime(blog.content); // Giả sử blog.content chứa nội dung bài viết

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl cursor-pointer"
      onClick={handleClick} // Sử dụng hàm handleClick khi click
    >
      <img
        src={blog.imageTitle}
        alt={blog.title}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = "/default-image.jpg")} // Xử lý khi ảnh không tìm thấy
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm">
          {formattedDate} - {readingTime} phút đọc 👁
        </p>
      </div>
      <p className="px-5 pb-5">{blog.author}</p>
    </div>
  );
}
