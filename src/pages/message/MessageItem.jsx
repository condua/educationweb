import React from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

// --- Component con để hiển thị nội dung tin nhắn ---
const MessageContent = ({ message, onImageClick }) => {
  switch (message.type) {
    case "image":
      return (
        <div
          className="relative group cursor-pointer"
          onClick={() => onImageClick(message._id)}
        >
          <img
            src={message.content.url}
            alt={message.content.name || "Hình ảnh được gửi"}
            // ✅ SỬA Ở ĐÂY: Thêm class responsive cho ảnh
            // - `max-w-[16rem]`: Chiều rộng tối đa là 256px trên màn hình nhỏ (mặc định).
            // - `sm:max-w-xs`: Trên màn hình từ small (640px) trở lên, chiều rộng tối đa là 320px.
            className="max-w-[16rem] sm:max-w-xs rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100">
            <PhotoIcon className="h-8 w-8 text-white" />
          </div>
        </div>
      );
    case "file":
      return (
        <a
          href={message.content.url || "#"}
          download={message.content.name}
          // ✅ SỬA Ở ĐÂY: Thêm class responsive cho khung file
          // - `w-56`: Chiều rộng là 224px trên màn hình nhỏ.
          // - `sm:w-64`: Trên màn hình từ small trở lên, chiều rộng là 256px.
          className="flex w-56 sm:w-64 items-center gap-3 rounded-lg bg-black/20 p-3 transition-colors hover:bg-black/30"
          title={`Tải xuống ${message.content.name}`}
        >
          <div className="flex-shrink-0 grid place-items-center bg-white/10 h-10 w-10 rounded-full">
            <DocumentTextIcon className="h-6 w-6 text-white" />
          </div>
          <div className="overflow-hidden flex-grow">
            <p className="font-medium truncate text-sm">
              {message.content.name}
            </p>
            {message.content.size && (
              <p className="text-xs text-gray-400">
                {Math.round(message.content.size / 1024)} KB
              </p>
            )}
          </div>
          <ArrowDownTrayIcon className="ml-auto h-5 w-5 flex-shrink-0 text-gray-400" />
        </a>
      );
    default:
      const textContent =
        typeof message.content === "string"
          ? message.content
          : message.content?.text;
      return (
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {textContent}
        </p>
      );
  }
};

// --- Component chính cho mỗi tin nhắn (không thay đổi) ---
const MessageItem = ({ message, sender, isCurrentUser, onImageClick }) => {
  const messageAlignment = isCurrentUser ? "ml-auto" : "mr-auto";
  const bubbleStyles = isCurrentUser
    ? "bg-blue-600 text-white rounded-l-xl rounded-br-xl"
    : "bg-gray-700 text-gray-200 rounded-r-xl rounded-bl-xl";
  const timeStyles = isCurrentUser ? "text-blue-200/70" : "text-gray-400";
  const bubblePadding = message.type === "text" ? "px-3.5 py-2.5" : "p-1";

  const senderName = sender ? sender.fullName : "Người dùng ẩn";
  const senderAvatar = sender
    ? sender.avatar
    : "https://via.placeholder.com/100";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      className={`flex items-start gap-2.5 w-full ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isCurrentUser && (
        <img
          src={senderAvatar}
          alt={senderName}
          className="h-8 w-8 flex-shrink-0 self-end rounded-full object-cover"
        />
      )}
      <div
        className={`flex flex-col gap-1 w-full max-w-[75%] sm:max-w-[60%] ${
          isCurrentUser ? "items-end" : "items-start"
        }`}
      >
        {!isCurrentUser && (
          <p className="text-xs text-gray-400 ml-3">{senderName}</p>
        )}
        <div
          className={`relative shadow-md ${messageAlignment} ${bubbleStyles} ${bubblePadding}`}
        >
          <MessageContent message={message} onImageClick={onImageClick} />
          {!isCurrentUser && (
            <div className="absolute left-[-7px] bottom-0">
              <svg
                width="8"
                height="11"
                viewBox="0 0 8 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 11C3.5 11 0 7.5 0 3V0L8 11Z" fill="#374151" />
              </svg>
            </div>
          )}
          {isCurrentUser && (
            <div className="absolute right-[-7px] bottom-0">
              <svg
                width="8"
                height="11"
                viewBox="0 0 8 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 11C4.5 11 8 7.5 8 3V0L0 11Z" fill="#2563eb" />
              </svg>
            </div>
          )}
        </div>
        <p className={`text-xs px-2 ${timeStyles}`}>
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageItem;
