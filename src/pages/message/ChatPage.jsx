import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import CreateGroupModal from "./CreateGroupModal";
import {
  fetchConversations,
  fetchAllUsersForChat,
  sendMessage,
  findOrCreatePrivateConversation,
  setCurrentConversation,
  createGroupConversation,
  // Actions cho real-time
  addMessageToConversation,
  addConversation,
  updateConversation,
  removeConversation,
} from "../../redux/conversationSlice";

const ENDPOINT = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { conversations, users, currentConversation, status } = useSelector(
    (state) => state.conversations
  );

  // ✅ Quản lý socket bằng state để đảm bảo sự ổn định
  const [socket, setSocket] = useState(null);
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);

  // --- 1. THIẾT LẬP VÀ QUẢN LÝ KẾT NỐI SOCKET.IO ---
  useEffect(() => {
    if (!currentUser?._id) return;

    // Khởi tạo kết nối và lưu vào state
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    // Lắng nghe sự kiện 'connect' để đảm bảo đã kết nối thành công
    newSocket.on("connect", () => {
      console.log(`✅ [Socket] Đã kết nối với server! ID: ${newSocket.id}`);
      newSocket.emit("joinUserRoom", currentUser._id);
    });

    // --- Lắng nghe tất cả sự kiện real-time từ server ---
    newSocket.on("newMessage", (newMessage) => {
      dispatch(addMessageToConversation(newMessage));
    });
    newSocket.on("new conversation", (newConversation) => {
      dispatch(addConversation(newConversation));
    });
    newSocket.on("invitedToGroup", (newGroup) => {
      dispatch(addConversation(newGroup));
      // Cân nhắc dùng thông báo (toast) thay vì alert
      // alert(`Bạn vừa được mời vào nhóm: ${newGroup.name}`);
    });
    newSocket.on("conversation updated", (updatedConvo) => {
      dispatch(updateConversation(updatedConvo));
    });
    newSocket.on("removed from group", ({ conversationId }) => {
      dispatch(removeConversation({ conversationId }));
      // alert("Bạn đã bị xóa khỏi một nhóm.");
    });
    newSocket.on("group deleted", ({ conversationId }) => {
      dispatch(removeConversation({ conversationId }));
      // alert("Một nhóm bạn tham gia đã bị chủ nhóm xóa.");
    });

    // Dọn dẹp kết nối khi component bị hủy
    return () => {
      newSocket.disconnect();
    };
  }, [currentUser, dispatch]);

  // --- 2. THAM GIA PHÒNG CHAT KHI CHỌN MỘT CUỘC TRÒ CHUYỆN ---
  useEffect(() => {
    if (socket && currentConversation.details?._id) {
      socket.emit("joinConversation", currentConversation.details._id);
    }
  }, [currentConversation.details, socket]);

  // --- 3. LẤY DỮ LIỆU BAN ĐẦU ---
  useEffect(() => {
    dispatch(fetchConversations());
    dispatch(fetchAllUsersForChat());
  }, [dispatch]);

  // --- 4. CÁC HÀM XỬ LÝ SỰ KIỆN ---
  const handleSendMessage = (formData) => {
    if (!currentConversation.details?._id) return;
    dispatch(
      sendMessage({ conversationId: currentConversation.details._id, formData })
    );
  };
  const handleCreateGroup = (groupData) => {
    dispatch(createGroupConversation(groupData));
    setCreateGroupModalOpen(false);
  };
  const handleStartNewConversation = (userId) => {
    dispatch(findOrCreatePrivateConversation(userId));
  };
  const handleSelectConversation = (conversationId) => {
    const selectedConvo = conversations.find((c) => c._id === conversationId);
    if (selectedConvo) {
      dispatch(setCurrentConversation(selectedConvo));
    }
  };

  // --- 5. GIAO DIỆN ---
  if (status === "loading" && conversations.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <main className="flex h-screen overflow-hidden bg-slate-900 font-sans text-white">
        <div
          className={`h-full bg-slate-800 transition-transform duration-300 ease-in-out absolute w-full z-10 md:static md:w-80 lg:w-96 md:flex-shrink-0 md:border-r md:border-slate-700 md:translate-x-0 ${
            currentConversation.details ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <ConversationList
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
            activeConversationId={currentConversation.details?._id}
            currentUser={currentUser}
            allUsers={users}
            onOpenCreateGroup={() => setCreateGroupModalOpen(true)}
            onStartNewConversation={handleStartNewConversation}
          />
        </div>

        <div className="flex-1 flex flex-col h-full bg-slate-900">
          <ChatWindow
            conversation={currentConversation.details}
            messages={currentConversation.messages}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
            onBack={() => dispatch(setCurrentConversation(null))}
          />
        </div>
      </main>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setCreateGroupModalOpen(false)}
        allUsers={users}
        currentUser={currentUser}
        onCreateGroup={handleCreateGroup}
      />
    </>
  );
};

export default ChatPage;
