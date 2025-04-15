import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/blogs`; // Thay bằng URL API của bạn nếu khác

// 📌 Async Thunks

// Fetch tất cả blog
export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Fetch blog theo id
export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// Tạo blog mới
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, thunkAPI) => {
    try {
      console.log(blogData);
      // Send POST request with form data
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs`,
        blogData
      );

      // Return the response data from the backend if successful
      return res.data;
    } catch (err) {
      // Log any error that occurs during the request
      console.log("❌ Error:", err.response?.data || err.message);
      // Reject with the error message or response from the API
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Cập nhật blog
export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, blogData }) => {
    const response = await axios.put(`${API_URL}/${id}`, blogData);
    return response.data;
  }
);

// Xóa blog
export const deleteBlog = createAsyncThunk("blogs/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// 🧠 Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBlog: (state) => {
      state.blog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tất cả blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch blog theo id
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Tạo blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Cập nhật blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xóa blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearBlog } = blogSlice.actions;

export default blogSlice.reducer;
