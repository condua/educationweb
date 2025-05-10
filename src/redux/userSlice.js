import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;
// 🎯 **Hàm lấy token từ Redux State**
const getToken = (state) => state.auth.token;

// 🎯 **Tạo headers có Authorization**
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});
// 🎯 **Lấy thông tin người dùng**
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState()); // Lấy token từ Redux state
      const response = await axios.get(`${API_URL}/me`, getAuthHeaders(token)); // Gửi yêu cầu API với header Authorization
      console.log(response.data);
      return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra."); // Xử lý lỗi nếu có
    }
  }
);

// Tạo async thunk cho việc cập nhật user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState()); // Lấy token từ Redux state
      const response = await axios.put(
        `${API_URL}/${id}`, // Gửi yêu cầu PUT tới API
        data,
        getAuthHeaders(token)
      );
      return response.data; // Trả về dữ liệu người dùng mới
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra.");
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
        state.user = action.payload; // Gán toàn bộ dữ liệu user
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
      })
      // Xử lý việc cập nhật user
      .addCase(updateUser.fulfilled, (state, action) => {
        // Cập nhật thông tin người dùng sau khi cập nhật thành công
        state.user = {
          ...state.user,
          fullName: action.payload.fullName,
          phone: action.payload.phone,
          avatar: action.payload.avatar,
          gender: action.payload.gender,
          address: action.payload.address,
          birthDate: action.payload.birthDate,
        };
        state.status = "succeeded";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutUser, addEnrolledCourse } = userSlice.actions;
export default userSlice.reducer;
