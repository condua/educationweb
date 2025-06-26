import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import coursesReducer from "./coursesSlice";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
// ✅ 1. Import các reducer mới
import testReducer from "./testSlice";
import testAttemptReducer from "./testAttemptSlice";

// Cấu hình Redux Persist
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthen"],
};

const coursesPersistConfig = {
  key: "courses",
  storage,
  whitelist: ["courses"],
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

// ✅ 2. Thêm cấu hình persist cho test và testAttempt
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
// ✅ 3. Tạo persisted reducers cho slice mới
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
    // ✅ 4. Thêm các reducer đã persist vào store
    tests: persistedTestReducer,
    testAttempts: persistedTestAttemptReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tạo Persistor
const persistor = persistStore(store);

export { store, persistor };
