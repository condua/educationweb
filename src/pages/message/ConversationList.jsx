// src/components/chat/ConversationList.jsx

import React, { useState, useMemo } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

// Hàm tiện ích không thay đổi
const removeAccents = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const ConversationList = ({
  conversations = [],
  onSelectConversation,
  activeConversationId,
  currentUser,
  allUsers = [],
  onOpenCreateGroup,
  onStartNewConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ SỬA LỖI 1: Tạo một bản đồ (map) để tra cứu thông tin user hiệu quả
  // Điều này giúp chúng ta luôn có thông tin đầy đủ bất kể memberIds là string hay object.
  const usersMap = useMemo(
    () =>
      allUsers.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {}),
    [allUsers]
  );

  // ✅ SỬA LỖI 2: Viết lại hàm lấy thông tin hiển thị một cách an toàn
  const getConversationDisplayInfo = (convo) => {
    if (convo.type === "group") {
      return {
        name: convo.name,
        avatar:
          convo.avatarUrl || `https://ui-avatars.com/api/?name=${convo.name}`,
      };
    }

    // --- Logic tìm "người kia" mạnh mẽ hơn ---
    // 1. Tìm ra ID của người còn lại, bất kể memberIds là [object] hay [string]
    const otherMemberIdString = convo.memberIds.find((member) => {
      const memberId = typeof member === "object" ? member._id : member;
      return memberId !== currentUser?._id;
    });

    // 2. Dùng ID tìm được để tra cứu thông tin đầy đủ trong `usersMap`
    const otherUser = usersMap[otherMemberIdString];

    if (otherUser) {
      return { name: otherUser.fullName, avatar: otherUser.avatar };
    }

    // Fallback an toàn nếu không tìm thấy user
    return {
      name: "Trò chuyện bị ẩn",
      avatar: "https://via.placeholder.com/100",
    };
  };

  const getLastMessageText = (convo) => {
    const lastMsg = convo.lastMessage;
    if (!lastMsg) return "Chưa có tin nhắn.";

    let displayMsg = "";
    switch (lastMsg.type) {
      case "image":
        displayMsg = "Đã gửi một ảnh";
        break;
      case "file":
        displayMsg = "Đã gửi một tệp";
        break;
      default:
        displayMsg = lastMsg.content?.text || "";
        break;
    }

    if (!currentUser || !lastMsg.senderId) return displayMsg;

    const prefix = lastMsg.senderId._id === currentUser._id ? "Bạn: " : "";
    return `${prefix}${displayMsg}`;
  };

  const filteredConversations = useMemo(
    () =>
      conversations.filter((convo) => {
        if (!searchTerm) return true;
        const { name } = getConversationDisplayInfo(convo);
        return removeAccents(name).includes(removeAccents(searchTerm));
      }),
    [conversations, searchTerm, currentUser]
  );

  // ✅ **THAY ĐỔI CHÍNH: Cập nhật logic lọc người dùng**
  const filteredUsers = useMemo(() => {
    // 1. Lấy ID của những người dùng đã có cuộc trò chuyện riêng
    const existingPrivateChatUserIds = new Set(
      conversations
        .filter((c) => c.type === "private")
        .flatMap((c) => c.memberIds.map((m) => m._id))
    );

    // 2. Lọc toàn bộ danh sách người dùng
    return allUsers.filter((user) => {
      // Điều kiện 1: Loại bỏ người dùng hiện tại và những người đã có chat riêng
      const isUnavailable =
        user._id === currentUser?._id ||
        existingPrivateChatUserIds.has(user._id);

      if (isUnavailable) {
        return false;
      }

      // Điều kiện 2: Nếu có tìm kiếm, thì lọc theo tên.
      // Nếu không, không cần lọc gì thêm.
      if (searchTerm) {
        return removeAccents(user.fullName).includes(removeAccents(searchTerm));
      }

      // Nếu không có tìm kiếm và user hợp lệ, luôn hiển thị
      return true;
    });
  }, [searchTerm, allUsers, conversations, currentUser]);

  const handleSelectNewUser = (userId) => {
    onStartNewConversation(userId);
    setSearchTerm("");
  };

  return (
    <div className="flex h-full flex-col bg-slate-800 text-white">
      <div className="flex-shrink-0 p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Tin nhắn</h1>
          <button
            onClick={onOpenCreateGroup}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors"
            title="Tạo nhóm mới"
          >
            <UserPlusIcon className="h-6 w-6" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm hoặc bắt đầu trò chuyện mới"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Danh sách các cuộc trò chuyện */}
        {filteredConversations.map((convo) => {
          const { name, avatar } = getConversationDisplayInfo(convo);
          const lastMessageText = getLastMessageText(convo);
          const isActive = convo._id === activeConversationId;
          return (
            <div
              key={convo._id}
              onClick={() => onSelectConversation(convo._id)}
              className={`flex items-center p-3 cursor-pointer transition-colors duration-200 border-b border-slate-700/50 ${
                isActive ? "bg-blue-600/30" : "hover:bg-slate-700/50"
              }`}
            >
              <img
                src={avatar}
                alt={name}
                className="h-12 w-12 rounded-full mr-4 object-cover flex-shrink-0"
              />
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-white truncate">{name}</p>
                <p
                  className={`text-sm truncate ${
                    isActive ? "text-slate-200" : "text-slate-400"
                  }`}
                >
                  {lastMessageText}
                </p>
              </div>
            </div>
          );
        })}

        {/* Danh sách người dùng để bắt đầu chat mới */}
        {filteredUsers.length > 0 && (
          <div>
            <h3 className="p-3 text-xs font-bold uppercase text-slate-400">
              Mọi người
            </h3>
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleSelectNewUser(user._id)}
                className="flex items-center p-3 cursor-pointer transition-colors duration-200 hover:bg-slate-700/50 border-b border-slate-700/50"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="h-12 w-12 rounded-full mr-4 object-cover flex-shrink-0"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-white truncate">
                    {user.fullName}
                  </p>
                  <p className="text-sm text-slate-400">
                    Bắt đầu cuộc trò chuyện mới
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
