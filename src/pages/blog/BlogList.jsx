import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/blogSlice"; // Assuming you have a fetchBlogs action
import BlogCard from "./BlogCard";

export default function BlogList() {
  const dispatch = useDispatch();

  // Fetch the blogs from the Redux store
  const { blogs, loading, error } = useSelector((state) => state.blog); // Assuming blogSlice is named 'blog'

  useEffect(() => {
    dispatch(fetchBlogs()); // Dispatch the action to fetch blogs
  }, [dispatch]);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>Error loading blogs: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Các bài viết hay</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
}
