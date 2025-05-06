import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../../redux/blogSlice";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet";
import "jspdf-autotable"; // hỗ trợ vẽ bảng

export default function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.blog);

  const getReadingTime = (content) => {
    const words = content.split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const readingTime = blog && blog.content ? getReadingTime(blog.content) : 0;

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [blog]);

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p>Error loading blog: {error}</p>;
  if (!blog) return <div className="p-10">Blog not found.</div>;

  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(blog.createdAt));

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

  const formattedContent = DOMPurify.sanitize(blog.content, {
    ADD_TAGS: [
      "iframe",
      "table",
      "th",
      "tr",
      "td",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul", // Add ul tag
      "ol", // Add ol tag
      "li", // Add li tag
      "p", // Add p tag for paragraphs
      "a", // Add a tag for links
      "div", // Add div tag
      "span", // Add span tag
      "strong", // Add strong tag for bold text
      "em", // Add em tag for italic text
      "b", // Add b tag for bold text
      "i", // Add i tag for italic text
      "hr", // Add hr tag for horizontal rules
      "img", // Add img tag for images
      "br", // Add br tag for line breaks
    ],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "height",
      "width",
      "class",
      "href", // Add href attribute for links
      "alt", // Add alt attribute for images
    ],
  })
    .replace(
      /<table>/g,
      '<table class="min-w-full table-auto border-collapse text-left text-gray-700 my-6" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<th>/g,
      '<th class="px-4 py-2 bg-gray-100 font-bold text-sm border-b text-left" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<td>/g,
      '<td class="px-4 py-2 border-b" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<tr>/g,
      '<tr class="hover:bg-gray-50" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h1>/g,
      '<h1 class="text-3xl font-bold my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h2>/g,
      '<h2 class="text-2xl font-bold my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h3>/g,
      '<h3 class="text-xl font-bold my-3" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h4>/g,
      '<h4 class="text-lg font-bold my-3" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h5>/g,
      '<h5 class="text-md font-bold my-2" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h6>/g,
      '<h6 class="text-sm font-bold my-2" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<ul>/g,
      '<ul class="list-inside list-disc pl-6 my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<ol>/g,
      '<ol class="list-inside list-decimal pl-6 my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<li>/g,
      '<li class="mb-2" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<p>/g,
      '<p class="my-4" style="font-family: \'Times New Roman\', serif;">' // Add styling for paragraphs
    )
    .replace(
      /<a>/g,
      '<a class="text-blue-500 hover:underline" style="font-family: \'Times New Roman\', serif;">' // Add styling for links
    )
    .replace(
      /<div>/g,
      "<div style=\"font-family: 'Times New Roman', serif;\">" // Default div styling
    )
    .replace(
      /<span>/g,
      "<span style=\"font-family: 'Times New Roman', serif;\">" // Default span styling
    )
    .replace(
      /<strong>/g,
      '<strong class="font-bold" style="font-family: \'Times New Roman\', serif;">' // Bold text styling
    )
    .replace(
      /<em>/g,
      '<em class="italic" style="font-family: \'Times New Roman\', serif;">' // Italic text styling
    )
    .replace(
      /<b>/g,
      '<b class="font-bold" style="font-family: \'Times New Roman\', serif;">' // Bold text styling
    )
    .replace(
      /<i>/g,
      '<i class="italic" style="font-family: \'Times New Roman\', serif;">' // Italic text styling
    )
    .replace(
      /<hr>/g,
      '<hr class="my-4 border-gray-300" style="font-family: \'Times New Roman\', serif;">' // Horizontal rule styling
    )
    .replace(
      /<img>/g,
      '<img class="my-4" style="font-family: \'Times New Roman\', serif;">' // Image styling
    )
    .replace(
      /<br>/g,
      "<br />" // Line break
    );

  const handlePrint = () => {
    const printContent = document.getElementById("printable-blog").innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
          <html>
            <head>
              <title>Printable Page</title>
              <style>
                body {
                  font-family: "Times New Roman", serif;
                  margin: 20mm;
                  position: relative;
                  color: #000;
                  line-height: 1.8;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
                h1, h2, h3, h4, h5, h6 {
                  margin-top: 1.5rem;
                  line-height: 1.4;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
                th, td {
                  border: 1px solid #ccc;
                  padding: 12px;
                  text-align: left;
                }
                p {
                  margin-bottom: 10px;
                }
              </style>
              <script type="text/javascript" async
                src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
              </script>
            </head>
            <body>
              <div>
                ${printContent}
              </div>
            </body>
          </html>
        `);
    iframeDoc.close();

    // Gọi lại MathJax để render công thức toán học
    iframe.contentWindow.onload = () => {
      iframe.contentWindow.MathJax.Hub.Queue([
        "Typeset",
        iframe.contentWindow.MathJax.Hub,
      ]);
    };

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  // const handleDownloadPDF = async () => {};

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
        <meta property="og:url" content={`https:/mlpa.site/blog/${id}`} />
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

        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {blog.title}
        </h1>
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center mb-4">
          <p className="text-gray-500 bold text-sm">
            {formattedDate} - {readingTime} phút đọc 👁
          </p>
          {/* Nút in bài viết */}
          <button
            onClick={handlePrint}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm font-medium "
          >
            🖨 Tải bài viết
          </button>
        </div>

        {/* Nội dung blog */}
        <div
          id="printable-blog"
          style={{ fontFamily: "'Times New Roman', serif" }}
          className="text-lg leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        <p className="text-right bold text-xl mt-6">{blog.author}</p>
      </div>
    </>
  );
}
