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
import conversationReducer from "./conversationSlice";

// Cấu hình Redux Persist cho các slice
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

// ✅ **BƯỚC 1: Thêm cấu hình persist cho conversation**
const conversationPersistConfig = {
  key: "conversations",
  storage,
  // Chỉ lưu danh sách các cuộc trò chuyện và danh sách người dùng.
  // Không nên lưu `currentConversation` để tránh hiển thị dữ liệu cũ khi mở lại app.
  whitelist: ["conversations", "users"],
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
// ✅ **BƯỚC 2: Tạo persisted reducer cho conversation**
const persistedConversationReducer = persistReducer(
  conversationPersistConfig,
  conversationReducer
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
    // ✅ **BƯỚC 3: Thay thế reducer cũ bằng persisted reducer**
    conversations: persistedConversationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tạo Persistor
const persistor = persistStore(store);

export { store, persistor };
