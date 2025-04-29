import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createBlog } from "./../../redux/blogSlice";
import DOMPurify from "dompurify";
import Quill from "quill";
import Table from "quill/modules/table";
import TableUI from "quill-table-ui";
import "quill/dist/quill.snow.css";
import "quill-table-ui/dist/index.css";
import KaTeX from "katex";
import "katex/dist/katex.min.css";

// Register table module
Quill.register(
  {
    "modules/table": Table,
    "modules/tableUI": TableUI,
  },
  true
);

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [editorHtml, setEditorHtml] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [htmlPaste, setHtmlPaste] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["table"], // Add table creation button
      [{ math: "math" }], // Thêm tùy chọn cho toán học
    ],
    table: true,
    tableUI: true,
    math: true, // Đăng ký module math
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "align",
  ];

  const { quill, quillRef } = useQuill({ modules, formats });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setEditorHtml(quill.root.innerHTML);

        // Automatically render math expressions after text-change
        const mathElements = quill.root.querySelectorAll("span.katex");
        mathElements.forEach((element) => {
          KaTeX.render(element.innerText, element);
        });
      });

      quill.root.classList.add("text-justify");

      if (htmlPaste) {
        const sanitized = DOMPurify.sanitize(htmlPaste, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: [
            "allow",
            "allowfullscreen",
            "frameborder",
            "scrolling",
            "src",
            "height",
            "width",
          ],
        });

        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitized, "text/html");
        const mathElements = doc.querySelectorAll("span.katex");

        mathElements.forEach((element) => {
          KaTeX.render(element.innerText, element);
        });

        quill.root.innerHTML = doc.body.innerHTML;
        setEditorHtml(doc.body.innerHTML);
      }

      // Ensure math content is rendered on paste
      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node) => {
        if (node.nodeName === "SPAN" && node.classList.contains("katex")) {
          KaTeX.render(node.innerText, node);
        }
        return node;
      });
    }
  }, [quill, htmlPaste]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!author.trim()) newErrors.author = "Author is required.";
    if (!editorHtml || editorHtml === "<p><br></p>")
      newErrors.content = "Content is required.";
    if (!imageFile) newErrors.image = "Image is required."; // Validate image
    return newErrors;
  };

  const handleSaveBlog = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let imageUrl = null;

    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.imageUrl) {
          imageUrl = data.imageUrl;
        } else {
          throw new Error("Image upload failed.");
        }
      } catch (error) {
        console.error("Upload image error:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Image upload failed.",
        }));
      } finally {
        setUploading(false);
      }
    }

    const sanitizedContent = DOMPurify.sanitize(editorHtml, {
      ADD_TAGS: ["iframe", "table", "thead", "tbody", "tr", "td", "th"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "src",
        "height",
        "width",
      ],
    });

    const blogData = {
      title,
      content: sanitizedContent,
      author,
      imageTitle: imageUrl,
    };

    console.log("Blog data before dispatch:", blogData);
    dispatch(createBlog(blogData));

    // Reset form
    setTitle("");
    setAuthor("");
    setEditorHtml("");
    setImageFile(null);
    setPreviewUrl(null);
    setHtmlPaste("");
    if (quill) quill.setContents([]);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Create Blog</h2>

      <input
        type="text"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      <input
        type="text"
        placeholder="Enter author's name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-64 h-40 object-cover rounded-md border"
        />
      )}
      {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

      {/* Textarea to paste HTML */}
      <textarea
        placeholder="Paste HTML content here..."
        value={htmlPaste}
        onChange={(e) => setHtmlPaste(e.target.value)}
        className="w-full h-32 p-2 border rounded-md"
      />

      <div
        ref={quillRef}
        className="h-72 bg-white rounded-md shadow overflow-auto"
      />
      {errors.content && (
        <p className="text-red-500 text-sm mt-1">{errors.content}</p>
      )}

      <button
        onClick={handleSaveBlog}
        className="mt-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Save Blog"}
      </button>
    </div>
  );
};

export default CreateBlog;
