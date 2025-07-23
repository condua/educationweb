// src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageItem from "./MessageItem";

const MessageList = ({
  messages,
  themeColor,
  currentUser,
  allUsers,
  onImageClick,
}) => {
  const listContainerRef = useRef(null);
  const usersMap = allUsers.reduce(
    (acc, user) => ({ ...acc, [user.id]: user }),
    {}
  );

  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  return (
    <div
      ref={listContainerRef}
      className="flex-1 space-y-4 p-4 overflow-y-auto transition-colors duration-500"
      style={{ backgroundColor: themeColor || "#1f2937" }}
    >
      <AnimatePresence>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            sender={usersMap[message.senderId]}
            isCurrentUser={message.senderId === currentUser.id}
            onImageClick={onImageClick}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
