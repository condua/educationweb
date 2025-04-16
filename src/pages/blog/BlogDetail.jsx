import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../../redux/blogSlice"; // Assuming you have a fetchBlogById action
import DOMPurify from "dompurify"; // For sanitizing the HTML content
import { Helmet } from "react-helmet"; // For handling metadata

export default function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch the specific blog by ID from the Redux store
  const { blog, loading, error } = useSelector((state) => state.blog); // Assuming blogSlice is named 'blog'

  // Hàm tính thời gian đọc
  const getReadingTime = (content) => {
    const words = content.split(/\s+/).length; // Đếm số từ
    const wordsPerMinute = 200; // Số từ đọc trung bình mỗi phút
    const minutes = Math.ceil(words / wordsPerMinute); // Thời gian đọc làm tròn lên phút
    return minutes;
  };

  // Lấy thời gian đọc từ nội dung bài blog
  const readingTime = blog && blog.content ? getReadingTime(blog.content) : 0;

  useEffect(() => {
    dispatch(fetchBlogById(id)); // Dispatch the action to fetch blog by ID
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading blog...</p>;
  }

  if (error) {
    return <p>Error loading blog: {error}</p>;
  }

  if (!blog) {
    return <div className="p-10">Blog not found.</div>;
  }

  // Định dạng ngày tháng
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long", // "Thứ ba"
    day: "numeric", // "15"
    month: "numeric", // "4"
    year: "numeric", // "2025"
    hour: "2-digit", // "21"
    minute: "2-digit", // "57"
  }).format(new Date(blog.createdAt));

  // Structured data (Schema.org) for SEO
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.imageTitle,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    description: blog.summary || "Default description",
    articleBody: blog.content,
  };

  return (
    <>
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.summary || "Default summary"} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={blog.summary || "Default summary"}
        />
        <meta property="og:image" content={blog.imageTitle} />
        <meta
          property="og:url"
          content={`https://www.yoursite.com/blog/${id}`}
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          to="/blog"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Quay lại
        </Link>
        <img
          src={blog.imageTitle}
          alt={`Image for ${blog.title}`}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 bold text-sm my-3">
          {formattedDate} - {readingTime} phút đọc 👁
        </p>

        {/* Sanitizing and rendering Quill HTML content */}
        <div
          className="text-lg leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content), // Sanitize HTML before rendering
          }}
        />
        <p className="text-right bold text-xl">{blog.author}</p>
      </div>
    </>
  );
}
