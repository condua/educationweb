import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.2.57:5000/api/users";

// Async Thunks
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.token;
      if (!token) throw new Error("Token không tồn tại.");

      const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response?.data || "Có lỗi xảy ra.");
    }
  }
);

export const enrollCourse = createAsyncThunk(
  "user/enrollCourse",
  async (courseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.token;
      if (!token) throw new Error("Token không tồn tại.");

      const response = await axios.post(
        `${API_URL}/enroll`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Không thể đăng ký khóa học."
      );
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    enrolledCourses: [],
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.enrolledCourses = [];
      state.status = "idle";
      state.error = null;
    },
    addEnrolledCourse: (state, action) => {
      if (!action.payload) {
        console.error(
          "Lỗi: Không thể thêm giá trị null vào enrolledCourses",
          action.payload
        );
        return;
      }
      state.enrolledCourses.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = {
          _id: action.payload._id,
          fullName: action.payload.fullName,
          email: action.payload.email,
          avatar: action.payload.avatar,
          role: action.payload.role,
          createdAt: action.payload.createdAt,
        };
        state.enrolledCourses = action.payload.enrolledCourses || [];
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
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
