import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/blogSlice";
import BlogCard from "./BlogCard";

// Hàm loại bỏ dấu và chuyển về chữ thường
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export default function BlogList() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs: {error}</p>;

  const filteredBlogs = blogs.filter((blog) =>
    normalizeText(blog.title).includes(normalizeText(searchTerm))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Các bài viết hay</h1>

      {/* Thanh tìm kiếm với gợi ý */}
      <div className="mb-8 text-center relative w-full mx-auto">
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)} // Delay nhỏ để cho phép click gợi ý
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {isFocused && searchTerm && filteredBlogs.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-b-lg shadow-md mt-1 max-h-60 overflow-y-auto text-left">
            {filteredBlogs.slice(0, 5).map((blog) => (
              <li
                key={blog.id}
                onMouseDown={() => setSearchTerm(blog.title)} // dùng onMouseDown để xử lý trước onBlur
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {blog.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Danh sách blog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy bài viết nào.
          </p>
        )}
      </div>
    </div>
  );
}
