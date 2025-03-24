import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu trữ trong localStorage
import authReducer from "./authSlice"; // Import reducer của auth

// Cấu hình Redux Persist cho auth
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthen"], // Chỉ lưu những state này
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Tạo Redux Store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bỏ kiểm tra serialize của Redux Persist
    }),
});

// Tạo Persistor
const persistor = persistStore(store);

export { store, persistor };
