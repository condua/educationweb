import React, { useState } from "react";

const removeAccents = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const ConversationList = ({
  conversations,
  onSelectConversation,
  activeConversationId,
  currentUser,
  allUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const usersMap = allUsers.reduce(
    (acc, user) => ({ ...acc, [user.id]: user }),
    {}
  );

  const getConversationDisplayInfo = (convo) => {
    if (convo.type === "group") {
      return { name: convo.name, avatarUrl: convo.avatarUrl };
    }
    const otherUserId = convo.memberIds.find((id) => id !== currentUser.id);
    const otherUser = usersMap[otherUserId];
    return otherUser
      ? { name: otherUser.name, avatarUrl: otherUser.avatarUrl }
      : { name: "Unknown User", avatarUrl: "" };
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
        displayMsg = lastMsg.content;
    }
    const sender = usersMap[lastMsg.senderId];
    if (!sender) return displayMsg;
    const prefix = sender.id === currentUser.id ? "Bạn: " : "";
    return `${prefix}${displayMsg}`;
  };

  // CẬP NHẬT: Sắp xếp các cuộc trò chuyện trước, sau đó mới lọc
  // Điều này đảm bảo danh sách luôn được sắp xếp theo tin nhắn mới nhất
  const processedConversations = [...conversations] // Dùng spread (...) để không thay đổi mảng gốc
    .sort((a, b) => {
      const lastMsgA = a.messages[a.messages.length - 1];
      const lastMsgB = b.messages[b.messages.length - 1];

      // Đẩy các cuộc trò chuyện không có tin nhắn xuống cuối
      if (!lastMsgB) return -1;
      if (!lastMsgA) return 1;

      // So sánh timestamp, B - A để xếp mới nhất lên đầu
      return new Date(lastMsgB.timestamp) - new Date(lastMsgA.timestamp);
    })
    .filter((convo) => {
      const { name } = getConversationDisplayInfo(convo);
      const normalizedName = removeAccents(name);
      const normalizedSearchTerm = removeAccents(searchTerm);
      return normalizedName.includes(normalizedSearchTerm);
    });

  return (
    <div className="flex h-full flex-col border-r border-gray-700 bg-gray-900">
      <div className="flex-shrink-0 p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold mb-4">Tin nhắn</h1>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Sử dụng mảng đã được xử lý (sắp xếp và lọc) */}
        {processedConversations.map((convo) => {
          const { name, avatarUrl } = getConversationDisplayInfo(convo);
          const lastMessage = getLastMessage(convo.messages);
          const isActive = convo.id === activeConversationId;
          return (
            <div
              key={convo.id}
              onClick={() => onSelectConversation(convo.id)}
              className={`flex items-center p-3 cursor-pointer transition-colors duration-200 border-b border-gray-800 ${
                isActive ? "bg-blue-900/50" : "hover:bg-gray-700/50"
              }`}
            >
              <img
                src={avatarUrl}
                alt={name}
                className="h-12 w-12 rounded-full mr-4"
              />
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-white">{name}</p>
                <p
                  className={`text-sm truncate ${
                    isActive ? "text-gray-300" : "text-gray-400"
                  }`}
                >
                  {lastMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;
