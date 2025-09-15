import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

const getToken = (state) => state.auth?.token;

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

// 🎯 Lấy người dùng hiện tại
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(`${API_URL}/me`, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      console.error("Fetch user error:", error);
      return rejectWithValue(
        error?.response?.data || "Lỗi khi lấy thông tin người dùng."
      );
    }
  }
);

// 🎯 Lấy danh sách người dùng (admin)
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (
    { page = 1, limit = 10, search = "" },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(API_URL, {
        params: { page, limit, search },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Lỗi khi lấy danh sách người dùng."
      );
    }
  }
);

// 🎯 Xóa người dùng (admin)
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      await axios.delete(`${API_URL}/${userId}`, getAuthHeaders(token));
      return userId;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Lỗi khi xóa người dùng."
      );
    }
  }
);

// 🎯 Cập nhật người dùng
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.put(
        `${API_URL}/${id}`,
        data,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Lỗi khi cập nhật người dùng."
      );
    }
  }
);

// 🎯 Ghi danh khóa học
export const enrollCourse = createAsyncThunk(
  "user/enrollCourse",
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/enroll`,
        { courseId },
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Không thể đăng ký khóa học."
      );
    }
  }
);

// 📦 Slice

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    enrolledCourses: [],
    usersList: [],
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    userStatus: "idle", // riêng cho fetchUser, updateUser, enrollCourse
    adminStatus: "idle", // riêng cho fetchAllUsers, deleteUser
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      Object.assign(state, {
        user: null,
        enrolledCourses: [],
        usersList: [],
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        userStatus: "idle",
        adminStatus: "idle",
        error: null,
      });
    },
    addEnrolledCourse: (state, action) => {
      if (action.payload && !state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.enrolledCourses = action.payload.enrolledCourses || [];
        state.userStatus = "succeeded";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userStatus = "failed";
        state.error = action.payload;
      })

      // 🔹 fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.adminStatus = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalUsers = action.payload.totalUsers;
        state.adminStatus = "succeeded";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.adminStatus = "failed";
        state.error = action.payload;
      })

      // 🔹 updateUser
      .addCase(updateUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        Object.assign(state.user, action.payload);
        state.userStatus = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userStatus = "failed";
        state.error = action.payload;
      })

      // 🔹 deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.adminStatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersList = state.usersList.filter(
          (user) => user._id !== action.payload
        );
        state.totalUsers -= 1;
        state.adminStatus = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.adminStatus = "failed";
        state.error = action.payload;
      })

      // 🔹 enrollCourse
      .addCase(enrollCourse.fulfilled, (state, action) => {
        const newCourseId = action.payload.courseId;
        if (!state.enrolledCourses.includes(newCourseId)) {
          state.enrolledCourses.push(newCourseId);
        }
      });
  },
});

export const { logoutUser, addEnrolledCourse } = userSlice.actions;
export default userSlice.reducer;
