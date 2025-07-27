import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import coursesReducer from "./coursesSlice";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import testReducer from "./testSlice";
import testAttemptReducer from "./testAttemptSlice";
import chapterReducer from "./chapterSlice";
import lessonReducer from "./lessonSlice";
// ✅ 1. Import reducer của conversation
import conversationReducer from "./conversationSlice";

// Cấu hình Redux Persist
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthen"],
};

const coursesPersistConfig = {
  key: "courses",
  storage,
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
  whitelist: ["testsByCourse"],
};

const testAttemptPersistConfig = {
  key: "testAttempts",
  storage,
  whitelist: ["userAttempts"],
};

// Cấu hình Redux Persist cho conversationReducer
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
    chapters: chapterReducer,
    lessons: lessonReducer,
    // ✅ 2. Thêm conversationReducer vào store (không cần persist)
    conversations: conversationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable cho redux-persist
    }),
});

// Tạo Persistor
const persistor = persistStore(store);

export { store, persistor };
