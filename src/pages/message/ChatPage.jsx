// src/pages/ChatPage.jsx
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
  addMessageToConversation,
} from "../../redux/conversationSlice";

const ENDPOINT = import.meta.env.VITE_API_URL || "http://localhost:5000";
let socket;

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { conversations, users, currentConversation, status } = useSelector(
    (state) => state.conversations
  );
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);

  // --- THIẾT LẬP SOCKET.IO ---
  useEffect(() => {
    if (currentUser?._id) {
      socket = io(ENDPOINT);

      // ✅ SỬA 1: Phát sự kiện `joinUserRoom` khớp với backend
      socket.emit("joinUserRoom", currentUser._id);

      // Lắng nghe sự kiện `newMessage` từ server
      socket.on("newMessage", (newMessage) => {
        dispatch(addMessageToConversation(newMessage));
      });

      // Lắng nghe sự kiện khi có người mời vào nhóm mới
      socket.on("invitedToGroup", (newGroup) => {
        // Tạm thời chỉ fetch lại danh sách cuộc trò chuyện
        // Nâng cao hơn: Thêm trực tiếp group mới vào state Redux
        dispatch(fetchConversations());
        alert(`Bạn vừa được mời vào nhóm: ${newGroup.name}`);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [currentUser, dispatch]);

  // --- THAM GIA PHÒNG CHAT KHI CHỌN CUỘC TRÒ CHUYỆN ---
  useEffect(() => {
    if (currentConversation.details?._id) {
      // ✅ SỬA 2: Phát sự kiện `joinConversation` khớp với backend
      socket.emit("joinConversation", currentConversation.details._id);
    }
  }, [currentConversation.details]);

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    dispatch(fetchConversations());
    dispatch(fetchAllUsersForChat());
  }, [dispatch]);

  // Các hàm handler không thay đổi...
  const handleSendMessage = (formData) => {
    if (!currentConversation.details?._id) return;
    dispatch(
      sendMessage({
        conversationId: currentConversation.details._id,
        formData,
      })
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

  if (status === "loading" && conversations.length === 0) {
    return <div className="...loading-spinner...">Đang tải...</div>;
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
            allUsers={users}
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
