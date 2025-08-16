// src/components/chat/MessageInput.jsx
import React, { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  FaceSmileIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
    setShowPicker(false);
  };

  /**
   * **THAY ĐỔI 1: Gửi tin nhắn văn bản dưới dạng FormData**
   * Khi người dùng gửi tin nhắn, tạo một FormData object,
   * thêm nội dung text và type, sau đó gọi onSendMessage.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const formData = new FormData();
      formData.append("content", text);
      formData.append("type", "text"); // Thêm type để backend biết đây là text
      onSendMessage(formData);
      setText("");
    }
  };

  /**
   * **THAY ĐỔI 2: Gửi file dưới dạng FormData**
   * Khi người dùng chọn một file (ảnh hoặc tài liệu),
   * tạo FormData và chỉ cần thêm file vào đó.
   * Backend sẽ tự xử lý việc lưu file và xác định loại tin nhắn.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // Key 'file' phải khớp với middleware 'upload.single("file")' ở backend
    onSendMessage(formData);

    // Reset input để người dùng có thể chọn lại cùng một file nếu muốn
    event.target.value = null;
  };

  return (
    <div className=" relative flex-shrink-0 border-t border-gray-700 bg-gray-900 p-4">
      {showPicker && (
        <div className="absolute bottom-full right-0 md:left-0 mb-2 z-10">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="dark"
            pickerStyle={{ border: "1px solid #374151" }}
          />
        </div>
      )}
      <div className="flex items-center rounded-full bg-gray-700 px-3 py-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="p-2 text-gray-400 hover:text-white"
          title="Chọn biểu tượng cảm xúc"
        >
          <FaceSmileIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => imageInputRef.current.click()}
          className="p-2 text-gray-400 hover:text-white"
          title="Gửi ảnh"
        >
          <PhotoIcon className="h-6 w-6" />
        </button>
        {/* <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-400 hover:text-white"
          title="Đính kèm tệp"
        >
          <PaperClipIcon className="h-6 w-6" />
        </button> */}

        {/* Gộp 2 input file và dùng một hàm xử lý duy nhất */}
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <form onSubmit={handleSubmit} className="flex-1 ml-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setShowPicker(false)} // Ẩn emoji picker khi focus vào input
            placeholder="Nhập tin nhắn..."
            className="w-full bg-transparent text-white outline-none placeholder-gray-400"
            autoComplete="off"
          />
        </form>
        <button
          type="submit"
          onClick={handleSubmit} // Thêm type="submit" để có thể gửi bằng phím Enter
          className="ml-3 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={!text.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
