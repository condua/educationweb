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
  HeartIcon, // 👈 Import icon trái tim
} from "@heroicons/react/24/solid";

// Mảng màu sắc và gradient không thay đổi
const THEME_COLORS = [
  // === Gam màu Xám & Trung tính (Grays & Neutrals) ===
  "#0f172a", // Gray-950
  "#111827", // Gray-900
  "#1f2937", // Gray-800
  "#374151", // Gray-700
  "#4b5563", // Gray-600
  "#6b7280", // Gray-500
  "#9ca3af", // Gray-400
  "#d1d5db", // Gray-300

  // === Gam màu Xanh dương & Lam (Blues & Cyans) ===
  "#0c4a6e", // Sky-900
  "#172554", // Blue-950
  "#1e3a8a", // Blue-900
  "#1e40af", // Blue-800
  "#2563eb", // Blue-600
  "#38bdf8", // Sky-400
  "#7dd3fc", // Sky-300
  "#bae6fd", // Sky-200

  // === Gam màu Chàm & Tím (Indigos & Purples) ===
  "#1e1b4b", // Indigo-950
  "#312e81", // Indigo-900
  "#4338ca", // Indigo-700
  "#4c1d95", // Violet-800
  "#581c87", // Purple-900
  "#6d28d9", // Violet-700
  "#7c3aed", // Violet-600
  "#a78bfa", // Violet-400
  "#c4b5fd", // Violet-300
  "#363062", // Tím than

  // === Gam màu Lục & Mòng két (Greens & Teals) ===
  "#042f2e", // Teal-950
  "#134e4a", // Teal-800
  "#065f46", // Green-800
  "#166534", // Green-700
  "#16a34a", // Green-600
  "#22c55e", // Green-500
  "#4ade80", // Green-400
  "#86efac", // Green-300

  // === Gam màu Đỏ & Hồng (Reds & Pinks) ===
  "#4d0d29", // Tím hồng đậm
  "#7f1d1d", // Red-900
  "#9f1239", // Rose-800
  "#be123c", // Rose-700
  "#e11d48", // Rose-600
  "#f43f5e", // Rose-500
  "#f87171", // Red-400
  "#fb7185", // Pink-400
  "#fda4af", // Pink-300
  "#86198f", // Fuchsia-800
  "#a21caf", // Fuchsia-700
  "#4a044e", // Fuchsia-950

  // === Gam màu Vàng & Nâu (Yellows & Browns) ===
  "#78350f", // Amber-900
  "#854d0e", // Amber-800
  "#92400e", // Amber-700
  "#b45309", // Amber-600
  "#f59e0b", // Amber-500
  "#facc15", // Yellow-400
  "#fde047", // Yellow-300
  "#fff176", // Vàng chanh nhạt
];

const THEME_GRADIENTS = [
  // === Original Gradients ===
  "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
  "linear-gradient(to right, #ed213a, #93291e)",
  "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
  "linear-gradient(to right, #ff7e5f, #feb47b)", // Peach
  "linear-gradient(to right, #ff9a9e 0%, #fecfef 100%)", // Soft Pink
  "linear-gradient(to right, #2c3e50, #4ca1af)", // Night Sky
  "linear-gradient(to right, #000000, #434343)", // Charcoal
  "linear-gradient(to right, #56ab2f, #a8e063)", // Fresh Lime
  "linear-gradient(to right, #eaafc8, #654ea3)", // Grapefruit
  "linear-gradient(to top, #1d976c, #93f9b9)", // Mojito

  // === New Additions ===
  "linear-gradient(to right, #ff6a00, #ee0979)", // Sunset
  "linear-gradient(to top, #8e2de2, #4a00e0)", // Purple Dream
  "linear-gradient(to right, #00b09b, #96c93d)", // Green Bliss
  "linear-gradient(to right, #f7971e, #ffd200)", // Warm Gold
  "linear-gradient(to right, #bdc3c7, #2c3e50)", // Silver Night
  "linear-gradient(to top, #f953c6, #b91d73)", // Candy Pink
  "linear-gradient(to right, #de6161, #2657eb)", // Raspberry Blue
  "linear-gradient(to top, #c6ffdd, #fbd786, #f7797d)", // Tropical
  "linear-gradient(to right, #fc466b, #3f5efb)", // Crimson Blue
  "linear-gradient(to top, #fd746c, #ff9068)", // Orange Smoothie
  "linear-gradient(to right, #ffecd2, #fcb69f)", // Light Cream
  "linear-gradient(to top, #667eea, #764ba2)", // Royal Purple
  "linear-gradient(to right, #43cea2, #185a9d)", // Ocean Breeze
  "linear-gradient(to top, #e0c3fc, #8ec5fc)", // Soft Violet
];
// ✅ THÊM MỚI: Định nghĩa một giá trị đặc biệt cho theme trái tim
const HEART_THEME = "linear-gradient(to top, #ff758c 0%, #ff7eb3 100%)";

// ✅ THÊM MỚI: Component con để hiển thị icon theme
// Component này có thể hiển thị màu trơn, gradient, hoặc theme đặc biệt có icon
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

  // ✅ **SỬA LỖI TẠI ĐÂY: Logic kiểm tra quyền Owner linh hoạt**
  // Lấy ra chuỗi ID của owner, bất kể ownerId là object hay string
  const ownerIdString =
    typeof conversation?.ownerId === "object"
      ? conversation.ownerId?._id
      : conversation?.ownerId;
  const isOwner = currentUser?._id === ownerIdString;

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
                  {/* Thêm theme trái tim */}
                  <ThemeIcon theme={HEART_THEME} onClick={handleThemeChange} />
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
