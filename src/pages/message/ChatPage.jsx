// src/pages/ChatPage.jsx

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { conversations as initialConversations, users } from "./mockData"; // Import mock data

const MOCK_USER_ID_FOR_DEV = "user1";

const ChatPage = () => {
  const { user: currentUser } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const userConversations = initialConversations.filter((c) =>
        c.memberIds.includes(MOCK_USER_ID_FOR_DEV)
      );
      setConversations(userConversations);
    }
  }, [currentUser]);

  const handleSendMessage = (content, type) => {
    if (!activeConversationId) return;
    const newMessage = {
      id: `msg${Date.now()}`,
      senderId: MOCK_USER_ID_FOR_DEV,
      type: type,
      content: content,
      timestamp: new Date().toISOString(),
    };
    const updatedConversations = conversations.map((convo) => {
      if (convo.id === activeConversationId) {
        return { ...convo, messages: [...convo.messages, newMessage] };
      }
      return convo;
    });
    setConversations(updatedConversations);

    if (type === "text" && content.toLowerCase().includes("chúc mừng")) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleChangeThemeColor = (conversationId, newColor) => {
    const updatedConversations = conversations.map((convo) => {
      if (convo.id === conversationId) {
        return { ...convo, themeColor: newColor };
      }
      return convo;
    });
    setConversations(updatedConversations);
  };

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  if (!currentUser) {
    return (
      <div className="flex h-[calc(100vh-145px)] items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const displayUser =
    users.find((user) => user.id === MOCK_USER_ID_FOR_DEV) || currentUser;

  return (
    <main className="relative flex h-[calc(100vh-145px)] overflow-hidden bg-gray-800 font-sans text-white">
      {showConfetti && <Confetti recycle={false} numberOfPieces={250} />}
      <div
        className={`absolute top-0 left-0 z-10 h-full w-full transform transition-transform duration-300 ease-in-out md:static md:w-1/3 md:flex-shrink-0 md:translate-x-0 ${
          activeConversationId ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <ConversationList
          conversations={conversations}
          onSelectConversation={setActiveConversationId}
          activeConversationId={activeConversationId}
          currentUser={displayUser}
          allUsers={users}
        />
      </div>
      <div
        className={`absolute top-0 left-0 h-full w-full transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          activeConversationId ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ChatWindow
          conversation={activeConversation}
          onSendMessage={handleSendMessage}
          currentUser={displayUser}
          allUsers={users}
          onChangeThemeColor={handleChangeThemeColor}
          onBack={() => setActiveConversationId(null)}
        />
      </div>
    </main>
  );
};

export default ChatPage;
