import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/attempts`;

// Helper functions (giữ nguyên)
const getToken = (state) => state.auth.token;
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

/**
 * 🎯 Nộp bài test - ĐÃ CẬP NHẬT
 * Gửi lên testId, các câu trả lời và thời điểm bắt đầu làm bài.
 */
export const submitTestAttempt = createAsyncThunk(
  "testAttempts/submit",
  async ({ testId, userAnswers, startedAt }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/submit/${testId}`,
        { userAnswers, startedAt }, // Thêm startedAt vào body
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi nộp bài");
    }
  }
);

/**
 * 🎯 Lấy kết quả chi tiết của một lần làm bài - ĐÃ TỐI ƯU
 * Endpoint này đã trả về đủ cả thông tin attempt và test gốc.
 */
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

/**
 * 🎯 Lấy toàn bộ lịch sử làm bài của người dùng hiện tại (giữ nguyên).
 */
export const fetchUserAttempts = createAsyncThunk(
  "testAttempts/fetchHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/my-history`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tải lịch sử");
    }
  }
);

/**
 * 🎯 Lấy các lần làm bài của user cho MỘT BÀI TEST (giữ nguyên).
 */
export const fetchMyAttemptsForTest = createAsyncThunk(
  "testAttempts/fetchMyForTest",
  async (testId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/my-attempts-for-test/${testId}`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi tải lịch sử của bài test"
      );
    }
  }
);

/**
 * 🎯 ACTION MỚI: Lấy bảng xếp hạng (tất cả attempts) cho một bài test.
 */
export const fetchLeaderboardForTest = createAsyncThunk(
  "testAttempts/fetchLeaderboard",
  async (testId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/by-test/${testId}`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi tải bảng xếp hạng"
      );
    }
  }
);

const testAttemptSlice = createSlice({
  name: "testAttempts",
  initialState: {
    userAttempts: [], // Lịch sử TẤT CẢ các lần làm bài của người dùng
    attemptsForSingleTest: [], // Lịch sử làm bài cho một bài test đang xem
    leaderboard: [], // Bảng xếp hạng cho một bài test
    currentAttemptResult: null, // Kết quả của lần làm bài đang xem chi tiết
    status: "idle", // 'idle' | 'submitting' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentAttempt: (state) => {
      state.currentAttemptResult = null;
      state.status = "idle";
    },
    clearAttemptsForTest: (state) => {
      state.attemptsForSingleTest = [];
    },
    clearLeaderboard: (state) => {
      state.leaderboard = [];
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
        state.userAttempts.unshift(action.payload);
        state.attemptsForSingleTest.unshift(action.payload);
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

      // Fetch User History (tất cả)
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
      })

      // Fetch Attempts for a single Test
      .addCase(fetchMyAttemptsForTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyAttemptsForTest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attemptsForSingleTest = action.payload;
      })
      .addCase(fetchMyAttemptsForTest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Leaderboard for a test
      .addCase(fetchLeaderboardForTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeaderboardForTest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboardForTest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentAttempt, clearAttemptsForTest, clearLeaderboard } =
  testAttemptSlice.actions;
export default testAttemptSlice.reducer;
