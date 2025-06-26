// features/tests/testSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Giả sử API của bạn được cấu hình như thế này
const API_URL = `${import.meta.env.VITE_API_URL}/api/tests`;

// Lấy token từ state (giống như trong courseSlice)
const getToken = (state) => state.auth.token;

// Tạo headers có Authorization
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

// 🎯 Lấy danh sách bài test của một khóa học
export const fetchTestsByCourse = createAsyncThunk(
  "tests/fetchByCourse",
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/by-course/${courseId}`,
        getAuthHeaders(token)
      );
      return { courseId, tests: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi tải danh sách bài test"
      );
    }
  }
);

// 🎯 Lấy một bài test để làm bài (đã ẩn đáp án)
export const fetchTestForTaking = createAsyncThunk(
  "tests/fetchForTaking",
  async (testId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/${testId}`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tải bài test");
    }
  }
);

// 🎯 Tạo bài test mới
export const createTest = createAsyncThunk(
  "tests/createTest",
  async ({ courseId, testData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/by-course/${courseId}`,
        testData,
        getAuthHeaders(token)
      );
      // Trả về cả courseId để reducer biết cập nhật vào đâu
      return { courseId, newTest: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tạo bài test");
    }
  }
);

// 🎯 Cập nhật bài test
export const updateTest = createAsyncThunk(
  "tests/updateTest",
  async ({ testId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.put(
        `${API_URL}/${testId}`,
        updatedData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi cập nhật bài test"
      );
    }
  }
);

// 🎯 Xóa bài test
export const deleteTest = createAsyncThunk(
  "tests/deleteTest",
  async ({ testId, courseId }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      await axios.delete(`${API_URL}/${testId}`, getAuthHeaders(token));
      // Trả về cả testId và courseId để reducer xử lý
      return { testId, courseId };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi xóa bài test");
    }
  }
);

// 🎯 Lấy chi tiết bài test với đầy đủ đáp án (dùng cho trang kết quả)
export const fetchTestWithAnswers = createAsyncThunk(
  "tests/fetchWithAnswers",
  // Giả sử backend có một endpoint đặc biệt cho việc này, ví dụ: /api/tests/:testId/full
  async (testId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      // LƯU Ý: Endpoint này có thể khác tùy vào thiết kế backend của bạn
      const response = await axios.get(
        `${API_URL}/${testId}/full`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi tải chi tiết bài test"
      );
    }
  }
);

const testSlice = createSlice({
  name: "tests",
  initialState: {
    // Lưu các bài test theo từng khóa học để quản lý dễ hơn
    testsByCourse: {}, // Ví dụ: { "courseId1": [...tests], "courseId2": [...tests] }
    currentTest: null, // Bài test đang được chọn để làm
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // (Tùy chọn) Xóa dữ liệu bài test hiện tại khi người dùng rời khỏi trang làm bài
    clearCurrentTest: (state) => {
      state.currentTest = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tests by Course
      .addCase(fetchTestsByCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestsByCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { courseId, tests } = action.payload;
        state.testsByCourse[courseId] = tests;
      })
      .addCase(fetchTestsByCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Test for Taking
      .addCase(fetchTestForTaking.pending, (state) => {
        state.status = "loading";
        state.currentTest = null;
      })
      .addCase(fetchTestForTaking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentTest = action.payload;
      })
      .addCase(fetchTestForTaking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create Test
      .addCase(createTest.fulfilled, (state, action) => {
        const { courseId, newTest } = action.payload;
        if (state.testsByCourse[courseId]) {
          state.testsByCourse[courseId].push(newTest);
        } else {
          state.testsByCourse[courseId] = [newTest];
        }
      })
      // Update Test
      .addCase(updateTest.fulfilled, (state, action) => {
        const updatedTest = action.payload;
        const courseId = updatedTest.course;
        if (state.testsByCourse[courseId]) {
          const index = state.testsByCourse[courseId].findIndex(
            (t) => t._id === updatedTest._id
          );
          if (index !== -1) {
            state.testsByCourse[courseId][index] = updatedTest;
          }
        }
      })
      // Delete Test
      .addCase(deleteTest.fulfilled, (state, action) => {
        const { testId, courseId } = action.payload;
        if (state.testsByCourse[courseId]) {
          state.testsByCourse[courseId] = state.testsByCourse[courseId].filter(
            (test) => test._id !== testId
          );
        }
      })
      .addCase(fetchTestWithAnswers.pending, (state) => {
        state.status = "loading";
        state.currentTest = null;
      })
      .addCase(fetchTestWithAnswers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentTest = action.payload; // Lưu vào cùng một state currentTest
      })
      .addCase(fetchTestWithAnswers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTest } = testSlice.actions;
export default testSlice.reducer;
