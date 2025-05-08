import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// API giả lập
// const API_URL = "http://192.168.2.57:5000/api/auth";
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// Async Thunks cho login & register
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  }
);

// Thêm Google Login Async Thunk
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (token, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/google-login`, { token });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthen: false,
    enrolledCourses: [], // Danh sách khóa học đã đăng ký
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthen = false;
      state.enrolledCourses = [];
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthen = true;
        state.status = "succeeded";
        state.enrolledCourses = action.payload.user.enrolledCourses || [];
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthen = true;
        state.status = "succeeded";
        state.enrolledCourses = action.payload.user.enrolledCourses || [];
      })
      // Thêm xử lý cho Google Login
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthen = true;
        state.status = "succeeded";
        state.enrolledCourses = action.payload.user.enrolledCourses || [];
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Đăng nhập Google không thành công.";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
