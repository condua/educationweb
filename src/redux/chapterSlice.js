import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/chapter`;

// Helper functions để lấy token và tạo headers
const getToken = (state) => state.auth.token;
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// 🎯 ACTION: Tạo một chương mới
export const createChapter = createAsyncThunk(
  "chapters/create",
  async ({ title, courseId }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        API_URL,
        { title, course: courseId },
        getAuthHeaders(token)
      );
      // Trả về chương vừa tạo để cập nhật state
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Cập nhật một chương
export const updateChapter = createAsyncThunk(
  "chapters/update",
  async ({ chapterId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.put(
        `${API_URL}/${chapterId}`,
        updatedData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Xóa một chương
export const deleteChapter = createAsyncThunk(
  "chapters/delete",
  async (chapterId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      await axios.delete(`${API_URL}/${chapterId}`, getAuthHeaders(token));
      // Trả về id của chapter đã xóa để cập nhật state
      return chapterId;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const chapterSlice = createSlice({
  name: "chapters",
  initialState: {
    // state của chapters sẽ được quản lý bên trong `courseDetails` của courseSlice
    // để mỗi khóa học có danh sách chương riêng.
    // Tuy nhiên, ta vẫn cần status và error để quản lý trạng thái của các action này.
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái chung cho các action
      .addMatcher(
        (action) =>
          action.type.startsWith("chapters/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("chapters/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("chapters/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default chapterSlice.reducer;
