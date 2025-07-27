import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import MediaGalleryModal from "./MediaGalleryModal";
import GroupSettingsModal from "./GroupSettingsModal"; // 👈 Import component Modal mới
import {
  fetchMessagesForConversation,
  updateGroupInfo, // 👈 Import action để đổi màu
} from "../../redux/conversationSlice";
import {
  ArrowLeftIcon,
  PaintBrushIcon,
  PhotoIcon as GalleryIcon,
  Cog6ToothIcon, // 👈 Import icon Cài đặt
} from "@heroicons/react/24/solid";

// Mảng màu sắc và gradient không thay đổi
const THEME_COLORS = [
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
];
const THEME_GRADIENTS = [
  "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
  "linear-gradient(to right, #ed213a, #93291e)",
  "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
];

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

  useEffect(() => {
    if (conversation?._id) {
      dispatch(fetchMessagesForConversation(conversation._id));
    }
  }, [conversation?._id, dispatch]);

  if (!conversation) {
    return (
      <div className="hidden h-full flex-col items-center justify-center bg-gray-800 text-gray-400 md:flex">
        <p className="mt-4 text-xl">Chọn một cuộc trò chuyện để bắt đầu</p>
      </div>
    );
  }

  const isOwner = currentUser?._id === conversation?.ownerId?._id;

  // ✅ **THAY ĐỔI 1: Lọc và chuẩn hóa dữ liệu ảnh**
  // Lấy tất cả tin nhắn có type là 'image' từ prop `messages`
  const imagesInConversation = messages
    .filter((msg) => msg.type === "image" && msg.content?.url)
    .map((msg) => ({
      id: msg._id, // Dùng để xác định ảnh nào được click
      src: msg.content.url, // URL để hiển thị ảnh
    }));

  // Hàm được gọi khi người dùng click vào một ảnh trong MessageList
  const handleImageClick = (messageId) => {
    const imageIndex = imagesInConversation.findIndex(
      (img) => img.id === messageId
    );
    if (imageIndex > -1) {
      setCurrentImageIndex(imageIndex);
      setIsLightboxOpen(true);
    }
  };

  // Hàm được gọi khi người dùng chọn một ảnh từ thư viện (gallery)
  const handleSelectImageFromGallery = (messageId) => {
    setIsGalleryOpen(false); // Đóng gallery
    handleImageClick(messageId); // Mở lightbox tại ảnh đã chọn
  };

  const handleThemeChange = (theme) => {
    if (isOwner || conversation.type === "private") {
      dispatch(
        updateGroupInfo({
          conversationId: conversation._id,
          groupData: { themeColor: theme },
        })
      );
    }
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
                <div className="grid grid-cols-6 gap-2 mt-2 border-t border-gray-600 pt-2">
                  {THEME_GRADIENTS.map((gradient) => (
                    <div
                      key={gradient}
                      onClick={() => handleThemeChange(gradient)}
                      className="h-8 w-8 cursor-pointer rounded-full"
                      style={{ background: gradient }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {conversation.type === "group" && (
            <button
              onClick={() => setSettingsModalOpen(true)}
              className="rounded-full p-2 text-white hover:bg-gray-700"
              title="Cài đặt nhóm"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Message List */}
        <MessageList
          messages={messages}
          themeColor={conversation.themeColor}
          currentUser={currentUser}
          onImageClick={handleImageClick} // 👈 Truyền hàm này xuống
        />

        {/* Message Input */}
        <MessageInput onSendMessage={onSendMessage} />
      </div>

      {/* ✅ **THAY ĐỔI 2: Truyền đúng dữ liệu ảnh vào Lightbox và Gallery** */}
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
    </>
  );
};

export default ChatWindow;
