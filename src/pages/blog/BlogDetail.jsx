// pages/BlogDetail.jsx
import { useParams, Link } from "react-router-dom";
import { blogs } from "./blogData";

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <div className="p-10">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to="/blog"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to list
      </Link>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{blog.date}</p>
      <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
}
