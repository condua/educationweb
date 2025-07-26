// src/components/chat/ConversationList.jsx

import React, { useState, useMemo } from "react";

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

  const usersMap = useMemo(
    () => allUsers.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
    [allUsers]
  );

  const getConversationDisplayInfo = (convo) => {
    if (convo.type === "group") {
      return { name: convo.name, avatarUrl: convo.avatarUrl };
    }
    const otherUserId = convo.memberIds.find(
      (id) => currentUser && id !== currentUser.id
    );
    const otherUser = usersMap[otherUserId];
    return otherUser
      ? { name: otherUser.name, avatarUrl: otherUser.avatarUrl }
      : {
          name: "Unknown User",
          avatarUrl: "https://placehold.co/100x100/666/FFF?text=?",
        };
  };

  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return "Chưa có tin nhắn.";
    const lastMsg = messages[messages.length - 1];
    let displayMsg = "";
    switch (lastMsg.type) {
      case "image":
        displayMsg = "Đã gửi một ảnh";
        break;
      case "file":
        displayMsg = "Đã gửi một tệp";
        break;
      default:
        displayMsg =
          typeof lastMsg.content === "string"
            ? lastMsg.content
            : lastMsg.content.text;
        break;
    }
    if (!currentUser) return displayMsg;
    const sender = usersMap[lastMsg.senderId];
    if (!sender) return displayMsg;
    const prefix = sender.id === currentUser.id ? "Bạn: " : "";
    return `${prefix}${displayMsg}`;
  };

  const processedConversations = useMemo(
    () =>
      [...conversations]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .filter((convo) => {
          if (!searchTerm) return true;
          const { name } = getConversationDisplayInfo(convo);
          const normalizedName = removeAccents(name);
          const normalizedSearchTerm = removeAccents(searchTerm);
          return normalizedName.includes(normalizedSearchTerm);
        }),
    [conversations, searchTerm, currentUser]
  );

  const processedUsers = useMemo(() => {
    const existingPrivateChatUserIds = new Set(
      conversations
        .filter((c) => c.type === "private")
        .flatMap((c) => c.memberIds)
    );

    return allUsers.filter((user) => {
      if (
        user.id === currentUser.id ||
        existingPrivateChatUserIds.has(user.id)
      ) {
        return false;
      }
      if (!searchTerm) return true;
      const normalizedName = removeAccents(user.name);
      const normalizedSearchTerm = removeAccents(searchTerm);
      return normalizedName.includes(normalizedSearchTerm);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
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
        {processedConversations.map((convo) => {
          const { name, avatarUrl } = getConversationDisplayInfo(convo);
          const lastMessageText = getLastMessage(convo.messages);
          const isActive = convo.id === activeConversationId;
          return (
            <div
              key={convo.id}
              onClick={() => onSelectConversation(convo.id)}
              className={`flex items-center p-3 cursor-pointer transition-colors duration-200 border-b border-slate-700/50 ${
                isActive ? "bg-blue-600/30" : "hover:bg-slate-700/50"
              }`}
            >
              <img
                src={avatarUrl}
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

        {processedUsers.length > 0 && (
          <div>
            <h3 className="p-3 text-xs font-bold uppercase text-slate-400">
              Mọi người
            </h3>
            {processedUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectNewUser(user.id)}
                className="flex items-center p-3 cursor-pointer transition-colors duration-200 hover:bg-slate-700/50 border-b border-slate-700/50"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-12 w-12 rounded-full mr-4 object-cover flex-shrink-0"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-white truncate">
                    {user.name}
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
