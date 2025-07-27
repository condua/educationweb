import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import MediaGalleryModal from "./MediaGalleryModal";
import { fetchMessagesForConversation } from "../../redux/conversationSlice"; // Đảm bảo đường dẫn chính xác
import {
  ArrowLeftIcon,
  PaintBrushIcon,
  PhotoIcon as GalleryIcon,
} from "@heroicons/react/24/solid";

// Mảng màu sắc và gradient không thay đổi
const THEME_COLORS = [
  "#ffffff",
  "#f8fafc",
  "#1f2937",
  "#374151",
  "#1e3a8a",
  "#312e81",
  "#581c87",
  "#9d174d",
  "#0c4a6e",
  "#065f46",
  "#854d0e",
  "#7f1d1d",
  "#4d0d29",
  "#363062",
  "#2c3e50",
  "#1a5276",
  "#2874a6",
  "#0a0a0a",
  "#1e1e1e",
  "#4a4e69",
  "#625e83",
  "#3a0ca3",
  "#4361ee",
  "#3f37c9",
  "#4895ee",
  "#7209b7",
  "#f72585",
  "#900020",
  "#c73e1d",
  "#e07a5f",
  "#3d405b",
  "#5d5d81",
  "#81b29a",
  "#3d5a80",
  "#8b6a6d",
  "#4a4a4a",
  "#1c7ed6",
];

const THEME_GRADIENTS = [
  "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(to right, #868f96 0%, #596164 100%)",
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
  "linear-gradient(to right, #f7971e, #ffd200)",
  "linear-gradient(to right, #ed213a, #93291e)",
  "linear-gradient(to right, #43e97b, #38f9d7)",
  "linear-gradient(to right, #ee0979, #ff6a00)",
  "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
  "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
];

const ChatWindow = ({
  conversation,
  messages,
  onSendMessage,
  currentUser,
  allUsers,
  onBack,
  onChangeThemeColor, // Prop này cần được xử lý ở ChatPage nếu muốn lưu vào DB
}) => {
  const dispatch = useDispatch();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // **THAY ĐỔI 1: Tự động lấy tin nhắn khi cuộc trò chuyện thay đổi**
  useEffect(() => {
    // Chỉ fetch khi có một cuộc trò chuyện hợp lệ và có _id
    if (conversation?._id) {
      dispatch(fetchMessagesForConversation(conversation._id));
    }
  }, [conversation?._id, dispatch]);

  // Giao diện chờ khi chưa chọn cuộc trò chuyện
  if (!conversation) {
    return (
      <div className="hidden h-full flex-col items-center justify-center bg-gray-800 text-gray-400 md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-24 w-24 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
        <p className="mt-4 text-xl">Chọn một cuộc trò chuyện</p>
      </div>
    );
  }

  // **THAY ĐỔI 2: Sử dụng `messages` từ props và chuẩn hóa `_id`**
  const imagesInConversation = messages
    .filter((msg) => msg.type === "image")
    .map((msg) => ({ id: msg._id, src: msg.content.url }));

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
    // Để lưu theme vào DB, bạn cần tạo một action mới trong slice
    // và gọi dispatch ở component cha (ChatPage)
    if (onChangeThemeColor) {
      onChangeThemeColor(conversation._id, theme);
    }
    setIsPaletteOpen(false);
  };

  // **THAY ĐỔI 3: Chuẩn hóa thuộc tính trong `getHeaderInfo`**
  const getHeaderInfo = () => {
    if (conversation.type === "group") {
      return { name: conversation.name, avatar: conversation.avatarUrl };
    }
    // `memberIds` trong slice đã được populate
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
    <div className="flex h-full w-full flex-col bg-gray-800 text-white">
      {/* Header */}
      <div className="relative flex flex-shrink-0 items-center border-b border-gray-700 bg-gray-900 p-3 shadow-md">
        <button
          onClick={onBack}
          className="mr-2 rounded-full p-2 text-white hover:bg-gray-700 md:hidden"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <img
          src={avatar}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="ml-3 flex-1">
          <h2 className="text-lg font-semibold text-white">{name}</h2>
        </div>
        <button
          onClick={() => setIsGalleryOpen(true)}
          className="rounded-full p-2 text-white hover:bg-gray-700"
        >
          <GalleryIcon className="h-6 w-6" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsPaletteOpen(!isPaletteOpen)}
            className="rounded-full p-2 text-white hover:bg-gray-700"
          >
            <PaintBrushIcon className="h-6 w-6" />
          </button>
          {isPaletteOpen && (
            <div className="absolute top-full right-0 z-20 mt-2 max-h-96 w-max overflow-y-auto rounded-lg bg-gray-700 p-3 shadow-lg">
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-300">Màu sắc</h4>
                <div className="mt-1 grid grid-cols-5 gap-2 border-t border-gray-600 pt-2">
                  {THEME_COLORS.map((color) => (
                    <div
                      key={color}
                      onClick={() => handleThemeChange(color)}
                      className="h-8 w-8 cursor-pointer rounded-full border-2 border-transparent transition-transform hover:scale-110 hover:border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300">
                  Gradient
                </h4>
                <div className="mt-1 grid grid-cols-5 gap-2 border-t border-gray-600 pt-2">
                  {THEME_GRADIENTS.map((gradient) => (
                    <div
                      key={gradient}
                      onClick={() => handleThemeChange(gradient)}
                      className="h-8 w-8 cursor-pointer rounded-full border-2 border-transparent transition-transform hover:scale-110 hover:border-white"
                      style={{ background: gradient }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto">
        <MessageList
          messages={messages}
          themeColor={conversation.themeColor}
          currentUser={currentUser}
          onImageClick={handleImageClick}
        />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-700 bg-gray-900">
        <MessageInput onSendMessage={onSendMessage} />
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
    </div>
  );
};
export default ChatWindow;
