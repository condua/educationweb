import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import coursesReducer from "./coursesSlice";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import testReducer from "./testSlice";
import testAttemptReducer from "./testAttemptSlice";
// ✅ 1. Import các reducer mới
import chapterReducer from "./chapterSlice"; // 👈 thêm dòng này
import lessonReducer from "./lessonSlice"; // 👈 thêm dòng này

// Cấu hình Redux Persist
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthen"],
};

const coursesPersistConfig = {
  key: "courses",
  storage,
  // Lưu danh sách khóa học và chi tiết khóa học đã fetch
  whitelist: ["courses", "courseDetails"],
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "enrolledCourses"],
};

const blogPersistConfig = {
  key: "blog",
  storage,
  whitelist: ["blogs"],
};

const testPersistConfig = {
  key: "tests",
  storage,
  whitelist: ["testsByCourse"], // Chỉ lưu danh sách test theo khóa học
};

const testAttemptPersistConfig = {
  key: "testAttempts",
  storage,
  whitelist: ["userAttempts"], // Chỉ lưu lịch sử làm bài của người dùng
};

// Tạo persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCoursesReducer = persistReducer(
  coursesPersistConfig,
  coursesReducer
);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedBlogReducer = persistReducer(blogPersistConfig, blogReducer);
const persistedTestReducer = persistReducer(testPersistConfig, testReducer);
const persistedTestAttemptReducer = persistReducer(
  testAttemptPersistConfig,
  testAttemptReducer
);

// Tạo Redux Store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    courses: persistedCoursesReducer,
    user: persistedUserReducer,
    blog: persistedBlogReducer,
    tests: persistedTestReducer,
    testAttempts: persistedTestAttemptReducer,
    // ✅ 2. Thêm các reducer mới (không cần persist) vào store
    chapters: chapterReducer, // 👈 thêm dòng này
    lessons: lessonReducer, // 👈 thêm dòng này
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable cho redux-persist
    }),
});

// Tạo Persistor
const persistor = persistStore(store);

export { store, persistor };
