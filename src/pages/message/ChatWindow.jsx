import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import MediaGalleryModal from "./MediaGalleryModal";
import GroupSettingsModal from "./GroupSettingsModal";
import {
  fetchMessagesForConversation,
  updateGroupInfo,
} from "../../redux/conversationSlice";
import {
  ArrowLeftIcon,
  PaintBrushIcon,
  PhotoIcon as GalleryIcon,
  Cog6ToothIcon,
  HeartIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";

// Mảng màu sắc và gradient không thay đổi
const THEME_COLORS = [
  "#0f172a",
  "#111827",
  "#1f2937",
  "#374151",
  "#4b5563",
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
  "#0c4a6e",
  "#172554",
  "#1e3a8a",
  "#1e40af",
  "#2563eb",
  "#38bdf8",
  "#7dd3fc",
  "#bae6fd",
  "#1e1b4b",
  "#312e81",
  "#4338ca",
  "#4c1d95",
  "#581c87",
  "#6d28d9",
  "#7c3aed",
  "#a78bfa",
  "#c4b5fd",
  "#363062",
  "#042f2e",
  "#134e4a",
  "#065f46",
  "#166534",
  "#16a34a",
  "#22c55e",
  "#4ade80",
  "#86efac",
  "#4d0d29",
  "#7f1d1d",
  "#9f1239",
  "#be123c",
  "#e11d48",
  "#f43f5e",
  "#f87171",
  "#fb7185",
  "#fda4af",
  "#86198f",
  "#a21caf",
  "#4a044e",
  "#78350f",
  "#854d0e",
  "#92400e",
  "#b45309",
  "#f59e0b",
  "#facc15",
  "#fde047",
  "#fff176",
];
const THEME_GRADIENTS = [
  "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
  "linear-gradient(to right, #ed213a, #93291e)",
  "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
  "linear-gradient(to right, #ff7e5f, #feb47b)",
  "linear-gradient(to right, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(to right, #2c3e50, #4ca1af)",
  "linear-gradient(to right, #000000, #434343)",
  "linear-gradient(to right, #56ab2f, #a8e063)",
  "linear-gradient(to right, #eaafc8, #654ea3)",
  "linear-gradient(to top, #1d976c, #93f9b9)",
  "linear-gradient(to right, #ff6a00, #ee0979)",
  "linear-gradient(to top, #8e2de2, #4a00e0)",
  "linear-gradient(to right, #00b09b, #96c93d)",
  "linear-gradient(to right, #f7971e, #ffd200)",
  "linear-gradient(to right, #bdc3c7, #2c3e50)",
  "linear-gradient(to top, #f953c6, #b91d73)",
  "linear-gradient(to right, #de6161, #2657eb)",
  "linear-gradient(to top, #c6ffdd, #fbd786, #f7797d)",
  "linear-gradient(to right, #fc466b, #3f5efb)",
  "linear-gradient(to top, #fd746c, #ff9068)",
  "linear-gradient(to right, #ffecd2, #fcb69f)",
  "linear-gradient(to top, #667eea, #764ba2)",
  "linear-gradient(to right, #43cea2, #185a9d)",
  "linear-gradient(to top, #e0c3fc, #8ec5fc)",
];
const HEART_THEME = "linear-gradient(to top, #ff758c 0%, #ff7eb3 100%)";

const ThemeIcon = ({ theme, onClick }) => {
  const isHeartTheme = theme === HEART_THEME;
  return (
    <div
      onClick={() => onClick(theme)}
      className="h-8 w-8 cursor-pointer rounded-full relative flex items-center justify-center transition-transform hover:scale-110 border-2 border-transparent hover:border-white"
      style={{ background: theme }}
    >
      {isHeartTheme && <HeartIcon className="h-5 w-5 text-white/80" />}
    </div>
  );
};

const ChatWindow = ({
  conversation,
  messages,
  onSendMessage,
  currentUser,
  onBack,
}) => {
  const dispatch = useDispatch();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chatContainerRef = useRef(null);

  // --- THÊM MỚI: Ref để truy cập vào component MessageList ---
  const messageListRef = useRef(null);

  const handleToggleFullscreen = useCallback(() => {
    const elem = chatContainerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Lỗi khi bật fullscreen: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container || typeof window.visualViewport === "undefined") return;

    const handleViewportChange = () => {
      const viewportHeight = window.visualViewport.height;
      const keyboardHeight = window.innerHeight - viewportHeight;

      // Điều chỉnh kích thước và padding cho phù hợp
      container.style.height = `${viewportHeight}px`;
      container.style.paddingBottom =
        keyboardHeight > 0 ? `${keyboardHeight}px` : "0px";

      // Scroll nếu đang ở gần đáy
      if (messageListRef.current?.scrollToBottom) {
        setTimeout(() => {
          messageListRef.current.scrollToBottom();
        }, 50);
      }
    };

    window.visualViewport.addEventListener("resize", handleViewportChange);
    window.visualViewport.addEventListener("scroll", handleViewportChange);

    handleViewportChange();

    return () => {
      window.visualViewport.removeEventListener("resize", handleViewportChange);
      window.visualViewport.removeEventListener("scroll", handleViewportChange);
      container.style.height = "";
      container.style.paddingBottom = "";
    };
  }, []);

  useEffect(() => {
    if (conversation?._id) {
      dispatch(fetchMessagesForConversation(conversation._id));
    }
  }, [conversation?._id, dispatch]);
  useEffect(() => {
    if (messageListRef.current?.scrollToBottom) {
      setTimeout(() => {
        messageListRef.current.scrollToBottom();
      }, 100);
    }
  }, [conversation?._id]);

  const handleBackClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    onBack();
  };

  if (!conversation) {
    return (
      <div className="hidden h-full flex-col items-center justify-center bg-gray-800 text-gray-400 md:flex">
        <p className="mt-4 text-xl">Chọn một cuộc trò chuyện để bắt đầu</p>
      </div>
    );
  }

  const ownerIdString =
    typeof conversation?.ownerId === "object"
      ? conversation.ownerId?._id
      : conversation?.ownerId;
  const isOwner = currentUser?._id === ownerIdString;

  const imagesInConversation = messages
    .filter((msg) => msg.type === "image" && msg.content?.url)
    .map((msg) => ({
      id: msg._id,
      src: msg.content.url,
    }));

  const handleImageClick = (messageId) => {
    const imageIndex = imagesInConversation.findIndex(
      (img) => img.id === messageId
    );
    if (imageIndex > -1) {
      setCurrentImageIndex(imageIndex);
      setIsLightboxOpen(true);
    }
  };

  const handleSelectImageFromGallery = (messageId) => {
    setIsGalleryOpen(false);
    handleImageClick(messageId);
  };

  const handleThemeChange = (theme) => {
    dispatch(
      updateGroupInfo({
        conversationId: conversation._id,
        groupData: { themeColor: theme },
      })
    );
    setIsPaletteOpen(false);
  };

  const getHeaderInfo = () => {
    if (conversation.type === "group") {
      return { name: conversation.name, avatar: conversation.avatarUrl };
    }
    const otherMember = conversation.memberIds.find(
      (member) => currentUser && member._id !== currentUser._id
    );
    return otherMember
      ? { name: otherMember.fullName, avatar: otherMember.avatar }
      : {
          name: "Người dùng không tồn tại",
          avatar: "https://via.placeholder.com/100",
        };
  };

  const { name, avatar } = getHeaderInfo();

  return (
    <>
      <div
        ref={chatContainerRef}
        className="relative flex h-full w-full flex-col bg-gray-800 text-white overflow-hidden"
      >
        {/* Header */}
        <div className="relative flex flex-shrink-0 items-center border-b border-gray-700 bg-gray-900 p-2 md:p-3 shadow-md">
          <button
            onClick={handleBackClick}
            className="mr-2 rounded-full p-1.5 md:p-2 text-white hover:bg-gray-700 md:hidden"
          >
            <ArrowLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <img
            src={avatar}
            alt={name}
            className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
          />
          <div className="ml-3 flex-1 min-w-0">
            <h2 className="truncate text-base md:text-lg font-semibold text-white">
              {name}
            </h2>
          </div>

          {/* Các nút chức năng */}
          <div className="flex items-center">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="rounded-full p-1.5 md:p-2 text-white hover:bg-gray-700"
            >
              <GalleryIcon className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                className="rounded-full p-1.5 md:p-2 text-white hover:bg-gray-700"
              >
                <PaintBrushIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              {isPaletteOpen && (
                <div className="absolute top-full right-0 z-20 mt-2 w-max rounded-lg bg-gray-700 p-3 shadow-lg">
                  <div className="grid grid-cols-6 gap-2">
                    {THEME_COLORS.map((color) => (
                      <div
                        key={color}
                        onClick={() => handleThemeChange(color)}
                        className="h-8 w-8 cursor-pointer rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-6 gap-2 border-t border-gray-600 pt-2">
                    {THEME_GRADIENTS.map((gradient) => (
                      <div
                        key={gradient}
                        onClick={() => handleThemeChange(gradient)}
                        className="h-8 w-8 cursor-pointer rounded-full"
                        style={{ background: gradient }}
                      />
                    ))}
                    <ThemeIcon
                      theme={HEART_THEME}
                      onClick={handleThemeChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleToggleFullscreen}
              className="rounded-full p-1.5 md:p-2 text-white hover:bg-gray-700"
              title={isFullscreen ? "Thu nhỏ" : "Phóng to toàn màn hình"}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <ArrowsPointingOutIcon className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </button>
            {conversation.type === "group" && (
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="rounded-full p-1.5 md:p-2 text-white hover:bg-gray-700"
                title="Cài đặt nhóm"
              >
                <Cog6ToothIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            )}
          </div>
        </div>

        <MessageList
          ref={messageListRef}
          messages={messages}
          themeColor={conversation.themeColor}
          currentUser={currentUser}
          onImageClick={handleImageClick}
        />

        <div className="flex-shrink-0 border-t border-gray-700 bg-gray-900">
          <MessageInput
            onSendMessage={onSendMessage}
            onFocusInput={() => {
              messageListRef.current?.scrollToBottom?.();
            }}
          />
        </div>

        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={imagesInConversation}
          index={currentImageIndex}
        />
        {isGalleryOpen && (
          <MediaGalleryModal
            images={imagesInConversation}
            onClose={() => setIsGalleryOpen(false)}
            onImageSelect={handleSelectImageFromGallery}
          />
        )}
        {isSettingsModalOpen && (
          <GroupSettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
            conversation={conversation}
            currentUser={currentUser}
            isOwner={isOwner}
          />
        )}
      </div>
    </>
  );
};

export default ChatWindow;
