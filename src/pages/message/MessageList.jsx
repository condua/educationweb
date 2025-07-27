// src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, themeColor, currentUser, onImageClick }) => {
  const listContainerRef = useRef(null);

  // Cải thiện: Tự động cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop =
        listContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={listContainerRef}
      className="flex-1 space-y-4 p-4 overflow-y-auto transition-colors duration-500"
      style={{ background: themeColor || "#1f2937" }}
    >
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
