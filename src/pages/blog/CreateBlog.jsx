import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createBlog } from "./../../redux/blogSlice";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [editorHtml, setEditorHtml] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false); // New state for uploading status

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
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
    "align",
  ];

  const { quill, quillRef } = useQuill({ modules, formats });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setEditorHtml(quill.root.innerHTML);
      });

      const editor = quill.root;
      editor.classList.add("text-justify");
    }
  }, [quill]);

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
      setUploading(true); // Set uploading to true
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.imageUrl) {
          imageUrl = data.imageUrl; // <- Đường dẫn cloudinary
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
        setUploading(false); // Set uploading to false
      }
    }

    const blogData = {
      title,
      content: editorHtml,
      author,
      imageTitle: imageUrl,
    };
    console.log("Blog data before dispatch:", blogData); // Add this line to inspect the data

    dispatch(createBlog(blogData));

    // Reset form
    setTitle("");
    setAuthor("");
    setEditorHtml("");
    setImageFile(null);
    setPreviewUrl(null);
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
        disabled={uploading} // Disable button while uploading
      >
        {uploading ? "Uploading..." : "Save Blog"}
      </button>
    </div>
  );
};

export default CreateBlog;
