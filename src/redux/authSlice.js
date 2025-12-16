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

// --- 🟢 CÁC ASYNC THUNKS MỚI (PASSWORD RESET FLOW) ---

// 1. Gửi yêu cầu quên mật khẩu (Gửi email OTP)
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      // API backend nhận { email: "..." }
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      return response.data; // Trả về message từ server
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Không thể gửi yêu cầu, vui lòng thử lại."
      );
    }
  }
);

// 2. Xác thực OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Mã xác thực không đúng."
      );
    }
  }
);

// 3. Đặt lại mật khẩu mới
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, code, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        email,
        code,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Không thể đặt lại mật khẩu."
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
    message: null, // 🟢 Thêm trường này để lưu thông báo thành công (ví dụ: "Email đã gửi")
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
      })
      // 🟢 --- Xử lý Forgot Password ---
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message; // "Mã xác thực đã được gửi..."
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🟢 --- Xử lý Verify OTP ---
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message; // "Xác thực thành công"
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🟢 --- Xử lý Reset Password ---
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message; // "Đổi mật khẩu thành công..."
        // Lưu ý: Thường reset xong user phải login lại, nên không set isAuthen = true ở đây
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
