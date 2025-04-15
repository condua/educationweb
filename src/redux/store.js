import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import coursesReducer from "./coursesSlice";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";

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
  whitelist: ["blogs"], // Tùy tên state trong blogSlice
};

// Tạo persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCoursesReducer = persistReducer(
  coursesPersistConfig,
  coursesReducer
);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedBlogReducer = persistReducer(blogPersistConfig, blogReducer); // ✅ persist blog

// Tạo Redux Store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    courses: persistedCoursesReducer,
    user: persistedUserReducer,
    blog: persistedBlogReducer, // ✅ thêm blog vào store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tạo Persistor
const persistor = persistStore(store);

export { store, persistor };
