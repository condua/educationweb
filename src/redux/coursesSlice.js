import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.2.57:5000/api/course";

// 🎯 **Hàm lấy token từ Redux State**
const getToken = (state) => state.auth.token;

// 🎯 **Tạo headers có Authorization**
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

// 🎯 **Lấy danh sách khóa học**
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(API_URL, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tải khóa học");
    }
  }
);

// 🎯 **Lấy khóa học theo ID**
export const fetchCourseById = createAsyncThunk(
  "course/fetchCourseById",
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/${courseId}`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tải khóa học");
    }
  }
);

// 🎯 **Tạo khóa học mới**
export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        API_URL,
        courseData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tạo khóa học");
    }
  }
);

// 🎯 **Cập nhật khóa học**
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.put(
        `${API_URL}/${id}`,
        updatedData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi cập nhật khóa học"
      );
    }
  }
);

// 🎯 **Xóa khóa học**
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi xóa khóa học");
    }
  }
);

// ✅ **Tạo Slice**
const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    selectedCourse: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(
          (course) => course._id === action.payload._id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload
        );
      });
  },
});

export default coursesSlice.reducer;
