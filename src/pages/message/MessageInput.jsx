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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text, "text");
      setText("");
    }
  };
  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (!file) return;
    if (fileType === "image") {
      const imageUrl = URL.createObjectURL(file);
      onSendMessage({ url: imageUrl, name: file.name }, "image");
    } else {
      onSendMessage({ url: "#", name: file.name, size: file.size }, "file");
    }
    event.target.value = null;
  };

  return (
    <div className="relative flex-shrink-0 border-t border-gray-700 bg-gray-900 p-4">
      {showPicker && (
        <div className="absolute bottom-full mb-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}
      <div className="flex items-center rounded-full bg-gray-700 px-3 py-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="p-2 text-gray-400 hover:text-white"
        >
          <FaceSmileIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => imageInputRef.current.click()}
          className="p-2 text-gray-400 hover:text-white"
        >
          <PhotoIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-400 hover:text-white"
        >
          <PaperClipIcon className="h-6 w-6" />
        </button>
        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => handleFileChange(e, "image")}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e, "file")}
          className="hidden"
        />
        <form onSubmit={handleSubmit} className="flex-1 ml-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="w-full bg-transparent text-white outline-none placeholder-gray-400"
            autoComplete="off"
          />
        </form>
        <button
          onClick={handleSubmit}
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
