// src/components/chat/MessageItem.jsx
import React from "react";
import { motion } from "framer-motion";
import { DocumentIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

const MessageContent = ({ message, onImageClick }) => {
  switch (message.type) {
    case "image":
      return (
        <img
          src={message.content.url}
          alt={message.content.name || "Hình ảnh được gửi"}
          className="max-w-xs cursor-pointer rounded-lg object-cover transition-transform hover:scale-105"
          onClick={() => onImageClick(message._id)} // Dùng _id
        />
      );
    case "file":
      return (
        <a
          href={message.content.url || "#"}
          download={message.content.name}
          className="flex min-w-[200px] items-center space-x-3 rounded-lg bg-gray-500/30 p-3 transition-colors hover:bg-gray-500/50"
          title={`Tải xuống ${message.content.name}`}
        >
          <DocumentIcon className="h-8 w-8 flex-shrink-0 text-white" />
          <div className="overflow-hidden">
            <p className="font-medium truncate">{message.content.name}</p>
            {message.content.size && (
              <p className="text-sm text-gray-400">
                {Math.round(message.content.size / 1024)} KB
              </p>
            )}
          </div>
          <ArrowDownTrayIcon className="ml-auto h-6 w-6 flex-shrink-0" />
        </a>
      );
    default:
      // **THAY ĐỔI 2: Xử lý `message.content` là object hoặc string**
      const textContent =
        typeof message.content === "string"
          ? message.content
          : message.content?.text;
      return (
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {textContent}
        </p>
      );
  }
};

const MessageItem = ({ message, sender, isCurrentUser, onImageClick }) => {
  const alignment = isCurrentUser ? "justify-end" : "justify-start";
  const bubbleColor = isCurrentUser
    ? "bg-blue-600 text-white"
    : "bg-gray-700 text-gray-200";
  const bubbleRadius = isCurrentUser
    ? "rounded-l-2xl rounded-tr-2xl"
    : "rounded-r-2xl rounded-tl-2xl";
  const bubbleClasses =
    message.type === "text"
      ? `${bubbleColor} ${bubbleRadius} p-3`
      : "p-0 bg-transparent";

  // **THAY ĐỔI 3: Chuẩn hóa thuộc tính và thêm fallback**
  const senderName = sender ? sender.fullName : "Người dùng ẩn";
  const senderAvatar = sender
    ? sender.avatar
    : "https://via.placeholder.com/100";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full items-end gap-2 ${alignment}`}
    >
      {!isCurrentUser && (
        <img
          src={senderAvatar}
          alt={senderName}
          className="h-8 w-8 flex-shrink-0 self-end rounded-full object-cover"
        />
      )}
      <div className={`max-w-[70%] shadow-md ${bubbleClasses}`}>
        {!isCurrentUser && message.type === "text" && (
          <p className="mb-1 text-xs font-bold text-indigo-300">{senderName}</p>
        )}
        <MessageContent message={message} onImageClick={onImageClick} />
        <p
          className={`mt-1 text-right text-xs ${
            message.type === "text" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            // Dùng createdAt
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageItem;
