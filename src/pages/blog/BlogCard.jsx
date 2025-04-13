// components/BlogCard.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/blog/${blog.id}`)} // hàm callback
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{blog.date}</p>
        <Link
          to={`/blog/${blog.id}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
