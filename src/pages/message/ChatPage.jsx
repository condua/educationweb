import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { users, conversations as initialConversations } from "./mockData";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import CreateGroupModal from "./CreateGroupModal";

const MOCK_USER_ID_FOR_DEV = "user1";

const ChatPage = () => {
  const currentUser = users.find((u) => u.id === MOCK_USER_ID_FOR_DEV);

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const userConversations = initialConversations
        .filter((c) => c.memberIds.includes(currentUser.id))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setConversations(userConversations);
      if (userConversations.length > 0 && !activeConversationId) {
        setActiveConversationId(userConversations[0].id);
      }
    }
  }, [currentUser]);

  const handleSendMessage = (content, type) => {
    if (!activeConversationId || !currentUser) return;

    const newMessage = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      type: type,
      content: content, // Không cần { text: content } nữa
      timestamp: new Date().toISOString(),
    };

    setConversations((prevConversations) =>
      [...prevConversations]
        .map((convo) =>
          convo.id === activeConversationId
            ? {
                ...convo,
                messages: [...convo.messages, newMessage],
                updatedAt: new Date().toISOString(),
              }
            : convo
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );

    if (
      type === "text" &&
      typeof content === "string" &&
      content.toLowerCase().includes("chúc mừng")
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleCreateGroup = ({ name, memberIds }) => {
    if (!currentUser) return;

    const newConversation = {
      id: `convo_${Date.now()}`,
      type: "group",
      name,
      avatarUrl: `https://placehold.co/100x100/8E94F2/FFFFFF?text=${name
        .substring(0, 2)
        .toUpperCase()}`,
      memberIds: [currentUser.id, ...memberIds],
      themeColor: "#1f2937",
      messages: [],
      updatedAt: new Date().toISOString(),
    };

    setConversations((prev) =>
      [newConversation, ...prev].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      )
    );
    setActiveConversationId(newConversation.id);
    setCreateGroupModalOpen(false);
  };

  const handleStartNewConversation = (userId) => {
    if (!currentUser) return;

    const existingConvo = conversations.find(
      (c) => c.type === "private" && c.memberIds.includes(userId)
    );

    if (existingConvo) {
      setActiveConversationId(existingConvo.id);
    } else {
      const newConversation = {
        id: `convo_${Date.now()}`,
        type: "private",
        memberIds: [currentUser.id, userId],
        messages: [],
        updatedAt: new Date().toISOString(),
      };
      setConversations((prev) =>
        [newConversation, ...prev].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
      setActiveConversationId(newConversation.id);
    }
  };

  const handleChangeThemeColor = (conversationId, newColor) => {
    setConversations((prevConversations) =>
      prevConversations.map((convo) =>
        convo.id === conversationId ? { ...convo, themeColor: newColor } : convo
      )
    );
  };

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  if (!currentUser) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      <main className="flex h-screen overflow-hidden bg-slate-900 font-sans text-white">
        {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

        <div
          className={`
            h-full bg-slate-800 transition-transform duration-300 ease-in-out
            absolute w-full z-10 
            md:static md:w-80 lg:w-96 md:flex-shrink-0
            md:border-r md:border-slate-700 md:translate-x-0
            ${activeConversationId ? "-translate-x-full" : "translate-x-0"}
          `}
        >
          <ConversationList
            conversations={conversations}
            onSelectConversation={setActiveConversationId}
            activeConversationId={activeConversationId}
            currentUser={currentUser}
            allUsers={users}
            onOpenCreateGroup={() => setCreateGroupModalOpen(true)}
            onStartNewConversation={handleStartNewConversation}
          />
        </div>

        <div className="flex-1 flex flex-col h-full bg-slate-900">
          <ChatWindow
            key={activeConversationId}
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
            allUsers={users}
            onChangeThemeColor={handleChangeThemeColor}
            onBack={() => setActiveConversationId(null)}
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
