import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu trữ trong localStorage
import authReducer from "./authSlice";
import coursesReducer from "./coursesSlice";
import userReducer from "./userSlice"; // Import userSlice

// Cấu hình Redux Persist cho auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthen"], // Chỉ lưu những state này
};

// Cấu hình Redux Persist cho courses
const coursesPersistConfig = {
  key: "courses",
  storage,
  whitelist: ["courses"], // Chỉ lưu danh sách khóa học
};

// Cấu hình Redux Persist cho user
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "enrolledCourses"], // Lưu thông tin người dùng & khóa học đã đăng ký
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCoursesReducer = persistReducer(
  coursesPersistConfig,
  coursesReducer
);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Tạo Redux Store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    courses: persistedCoursesReducer,
    user: persistedUserReducer, // Thêm user vào store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bỏ kiểm tra serialize của Redux Persist
    }),
});

// Tạo Persistor
const persistor = persistStore(store);

export { store, persistor };
