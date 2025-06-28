import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/lesson`;

// Helper functions để lấy token và tạo headers
const getToken = (state) => state.auth.token;
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// 🎯 ACTION: Tạo một bài học mới
export const createLesson = createAsyncThunk(
  "lessons/create",
  async (lessonData, { getState, rejectWithValue }) => {
    // lessonData nên bao gồm: { title, chapter, lectureUrl, ... }
    try {
      const token = getToken(getState());
      const response = await axios.post(
        API_URL,
        lessonData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Cập nhật một bài học
export const updateLesson = createAsyncThunk(
  "lessons/update",
  async ({ lessonId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.put(
        `${API_URL}/${lessonId}`,
        updatedData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Xóa một bài học
export const deleteLesson = createAsyncThunk(
  "lessons/delete",
  async (lessonId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      await axios.delete(`${API_URL}/${lessonId}`, getAuthHeaders(token));
      return lessonId;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    // Tương tự chapterSlice, state của lesson được quản lý lồng trong chapter,
    // và chapter lại lồng trong course. Slice này chỉ quản lý trạng thái API.
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái chung cho các action
      .addMatcher(
        (action) =>
          action.type.startsWith("lessons/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("lessons/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("lessons/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default lessonSlice.reducer;
