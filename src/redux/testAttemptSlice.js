// features/testAttempts/testAttemptSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Giả sử API cho việc làm bài test
const API_URL = `${import.meta.env.VITE_API_URL}/api/test-attempts`;

// Lấy token từ state
const getToken = (state) => state.auth.token;

// Tạo headers có Authorization
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

// 🎯 Nộp bài test và nhận kết quả
export const submitTestAttempt = createAsyncThunk(
  "testAttempts/submit",
  // Payload gồm: { testId, userAnswers: [{ questionId, selectedAnswer }] }
  async (attemptData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      // Backend sẽ tính điểm và trả về kết quả đầy đủ của TestAttempt
      const response = await axios.post(
        API_URL,
        attemptData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi nộp bài");
    }
  }
);

// 🎯 Lấy kết quả của một lần làm bài cụ thể
export const fetchAttemptResult = createAsyncThunk(
  "testAttempts/fetchResult",
  async (attemptId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/${attemptId}`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tải kết quả");
    }
  }
);

// 🎯 Lấy lịch sử làm bài của người dùng hiện tại
export const fetchUserAttempts = createAsyncThunk(
  "testAttempts/fetchHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      // Giả sử có endpoint để lấy tất cả bài làm của user đã đăng nhập
      const response = await axios.get(
        `${API_URL}/by-user/me`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tải lịch sử");
    }
  }
);

const testAttemptSlice = createSlice({
  name: "testAttempts",
  initialState: {
    userAttempts: [], // Lịch sử các lần làm bài của người dùng
    currentAttemptResult: null, // Kết quả của lần làm bài vừa xong hoặc đang xem
    status: "idle", // 'idle' | 'submitting' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentAttempt: (state) => {
      state.currentAttemptResult = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Test
      .addCase(submitTestAttempt.pending, (state) => {
        state.status = "submitting";
      })
      .addCase(submitTestAttempt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentAttemptResult = action.payload;
        // Thêm vào lịch sử nếu cần
        state.userAttempts.unshift(action.payload);
      })
      .addCase(submitTestAttempt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Result by ID
      .addCase(fetchAttemptResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttemptResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentAttemptResult = action.payload;
      })
      .addCase(fetchAttemptResult.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch User History
      .addCase(fetchUserAttempts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAttempts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAttempts = action.payload;
      })
      .addCase(fetchUserAttempts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentAttempt } = testAttemptSlice.actions;
export default testAttemptSlice.reducer;
