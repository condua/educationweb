// src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageItem from "./MessageItem";
import { ChatBubbleLeftRightIcon, HeartIcon } from "@heroicons/react/24/solid";
const HEART_THEME = "linear-gradient(to top, #ff758c 0%, #ff7eb3 100%)";

const MessageList = ({ messages, themeColor, currentUser, onImageClick }) => {
  const listContainerRef = useRef(null);

  // Cải thiện: Tự động cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop =
        listContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const isHeartTheme = themeColor === HEART_THEME;

  return (
    <div
      ref={listContainerRef}
      // ✅ THAY ĐỔI: Thêm `relative` để làm gốc cho icon trái tim
      className="relative flex-1 space-y-2 p-4 overflow-y-auto transition-colors duration-500"
      style={{ background: themeColor || "#1f2937" }}
    >
      {isHeartTheme && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <HeartIcon className="h-64 w-64 sm:h-80 sm:w-80 text-white/80" />
        </div>
      )}
      <AnimatePresence>
        {/*
          **THAY ĐỔI 1: Xóa bỏ `usersMap` và truyền thẳng `message.senderId`**
          - Vì backend đã populate `senderId`, nó giờ là một object user đầy đủ.
          - So sánh `_id` để xác định `isCurrentUser`.
        */}
        {messages.map((message) => (
          <MessageItem
            key={message._id}
            message={message}
            sender={message.senderId} // Truyền thẳng object sender đã được populate
            isCurrentUser={message.senderId?._id === currentUser?._id}
            onImageClick={onImageClick}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
