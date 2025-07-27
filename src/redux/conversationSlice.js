import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL cho các endpoint liên quan đến cuộc trò chuyện
const API_URL = `${import.meta.env.VITE_API_URL}/api/conversations`;

// Helper functions để lấy token và tạo headers (giống các slice khác)
const getToken = (state) => state.auth.token;
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// 🎯 ACTION: Lấy danh sách tất cả người dùng (để bắt đầu cuộc trò chuyện mới)
export const fetchAllUsersForChat = createAsyncThunk(
  "conversations/fetchAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/users`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Lấy danh sách các cuộc trò chuyện của người dùng hiện tại
export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(API_URL, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Tìm hoặc tạo một cuộc trò chuyện riêng tư (1-1)
export const findOrCreatePrivateConversation = createAsyncThunk(
  "conversations/findOrCreatePrivate",
  async (otherUserId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/create-or-get`,
        { otherUserId },
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Lấy tất cả tin nhắn của một cuộc trò chuyện cụ thể
export const fetchMessagesForConversation = createAsyncThunk(
  "conversations/fetchMessages",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.get(
        `${API_URL}/${conversationId}/messages`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION: Gửi một tin nhắn mới (hỗ trợ cả text và file)
export const sendMessage = createAsyncThunk(
  "conversations/sendMessage",
  async ({ conversationId, formData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/${conversationId}/messages`,
        formData, // Gửi FormData để hỗ trợ upload file
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Quan trọng khi upload file
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION MỚI: Tạo một cuộc trò chuyện nhóm mới
export const createGroupConversation = createAsyncThunk(
  "conversations/createGroup",
  async (groupData, { getState, rejectWithValue }) => {
    // groupData: { name, memberIds, avatarUrl? }
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/group`,
        groupData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION MỚI: Mời người dùng vào nhóm
export const inviteToGroup = createAsyncThunk(
  "conversations/inviteToGroup",
  async ({ conversationId, userIdToInvite }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/${conversationId}/invite`,
        { userIdToInvite },
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🎯 ACTION MỚI: Rời khỏi nhóm
export const leaveGroup = createAsyncThunk(
  "conversations/leaveGroup",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      await axios.post(
        `${API_URL}/${conversationId}/leave`,
        {},
        getAuthHeaders(token)
      );
      return conversationId; // Trả về ID để reducer biết xóa conversation nào
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ✅ **THÊM MỚI: Cập nhật thông tin nhóm (tên, avatar, theme)**
export const updateGroupInfo = createAsyncThunk(
  "conversations/updateGroup",
  async ({ conversationId, groupData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const response = await axios.put(
        `${API_URL}/${conversationId}/group`,
        groupData,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ✅ **THÊM MỚI: Xóa thành viên khỏi nhóm**
export const removeMemberFromGroup = createAsyncThunk(
  "conversations/removeMember",
  async (
    { conversationId, memberIdToRemove },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getToken(getState());
      const response = await axios.post(
        `${API_URL}/${conversationId}/remove-member`,
        { memberIdToRemove },
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ✅ **THÊM MỚI: Xóa hoàn toàn một nhóm**
export const deleteGroup = createAsyncThunk(
  "conversations/deleteGroup",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      await axios.delete(
        `${API_URL}/${conversationId}/group`,
        getAuthHeaders(token)
      );
      return { conversationId }; // Trả về ID để reducer xử lý
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
// 📦 Slice Definition
const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    users: [],
    conversations: [],
    currentConversation: {}, // <--- Sửa thành object rỗng thay vì có 'details: null'
    status: "idle",
    error: null,
  },
  reducers: {
    addConversation: (state, action) => {
      const newConvo = action.payload;
      // Tránh thêm trùng lặp nếu người dùng là người tạo
      if (!state.conversations.some((c) => c._id === newConvo._id)) {
        state.conversations.unshift(newConvo);
      }
    },
    addMessageToConversation: (state, action) => {
      const newMessage = action.payload;
      if (
        state.currentConversation.details?._id === newMessage.conversationId
      ) {
        if (
          !state.currentConversation.messages.find(
            (m) => m._id === newMessage._id
          )
        ) {
          state.currentConversation.messages.push(newMessage);
        }
      }
      const convoIndex = state.conversations.findIndex(
        (c) => c._id === newMessage.conversationId
      );
      if (convoIndex !== -1) {
        state.conversations[convoIndex].lastMessage = newMessage;
        const updatedConvo = state.conversations.splice(convoIndex, 1)[0];
        state.conversations.unshift(updatedConvo);
      }
    },
    // ✅ **THÊM MỚI: Reducer để cập nhật một cuộc trò chuyện**
    updateConversation: (state, action) => {
      const updatedConvo = action.payload;
      const index = state.conversations.findIndex(
        (c) => c._id === updatedConvo._id
      );
      if (index !== -1) {
        state.conversations[index] = updatedConvo;
      }
      if (state.currentConversation.details?._id === updatedConvo._id) {
        state.currentConversation.details = updatedConvo;
      }
    },
    // ✅ **THÊM MỚI: Reducer để xóa một cuộc trò chuyện**
    removeConversation: (state, action) => {
      const { conversationId } = action.payload;
      state.conversations = state.conversations.filter(
        (c) => c._id !== conversationId
      );
      if (state.currentConversation.details?._id === conversationId) {
        state.currentConversation = { details: null, messages: [] };
      }
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation.details = action.payload;
      state.currentConversation.messages = [];
      state.status = "idle";
      state.error = null;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = { details: null, messages: [] };
    },
  },
  // ✅✅✅ PHẦN SỬA LỖI NẰM Ở ĐÂY ✅✅✅
  extraReducers: (builder) => {
    builder
      // BƯỚC 1: Đặt tất cả .addCase lên trước
      .addCase(fetchAllUsersForChat.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(findOrCreatePrivateConversation.fulfilled, (state, action) => {
        const newConvo = action.payload;
        if (!state.conversations.some((c) => c._id === newConvo._id)) {
          state.conversations.unshift(newConvo);
        }
        state.currentConversation.details = newConvo;
        state.currentConversation.messages = [];
      })
      .addCase(fetchMessagesForConversation.fulfilled, (state, action) => {
        state.currentConversation.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        conversationSlice.caseReducers.addMessageToConversation(state, action);
      })
      .addCase(createGroupConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
      })
      .addCase(inviteToGroup.fulfilled, (state, action) => {
        const updatedConvo = action.payload;
        const index = state.conversations.findIndex(
          (c) => c._id === updatedConvo._id
        );
        if (index !== -1) {
          state.conversations[index] = updatedConvo;
        }
        if (state.currentConversation.details?._id === updatedConvo._id) {
          state.currentConversation.details = updatedConvo;
        }
      })
      .addCase(leaveGroup.fulfilled, (state, action) => {
        const conversationId = action.payload;
        state.conversations = state.conversations.filter(
          (c) => c._id !== conversationId
        );
        if (state.currentConversation.details?._id === conversationId) {
          state.currentConversation = { details: null, messages: [] };
        }
      })
      // ✅ **THÊM MỚI: Xử lý các action quản lý nhóm**
      .addCase(updateGroupInfo.fulfilled, (state, action) => {
        conversationSlice.caseReducers.updateConversation(state, action);
      })
      .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
        conversationSlice.caseReducers.updateConversation(state, action);
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        conversationSlice.caseReducers.removeConversation(state, action);
      })
      // BƯỚC 2: Đặt tất cả .addMatcher ở phía dưới
      .addMatcher(
        (action) =>
          action.type.startsWith("conversations/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("conversations/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("conversations/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const {
  addMessageToConversation,
  setCurrentConversation,
  clearCurrentConversation,
  addConversation,
  updateConversation,
  removeConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
