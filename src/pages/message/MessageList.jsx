// src/components/chat/MessageList.jsx
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import MessageItem from "./MessageItem";
import { HeartIcon } from "@heroicons/react/24/solid";

const HEART_THEME = "linear-gradient(to top, #ff758c 0%, #ff7eb3 100%)";

const MessageList = forwardRef(
  ({ messages, themeColor, currentUser, onImageClick }, ref) => {
    const localListRef = useRef(null);

    // --- expose scrollToBottom ra ngoài để ChatWindow gọi được ---
    useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        const el = localListRef.current;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      },
    }));

    // --- Tự động cuộn xuống khi có tin nhắn mới (nếu đang ở cuối) ---
    useEffect(() => {
      const el = localListRef.current;
      if (!el) return;

      const isAtBottom =
        el.scrollHeight - el.scrollTop <= el.clientHeight + 100;

      if (isAtBottom) {
        // cuộn xuống nếu đang ở gần cuối
        el.scrollTop = el.scrollHeight;
      }
    }, [messages]);

    const isHeartTheme = themeColor === HEART_THEME;

    return (
      <div
        ref={localListRef}
        className="relative flex-1 min-h-0 space-y-2 p-4 overflow-y-auto transition-colors duration-500"
        style={{ background: themeColor || "#1f2937" }}
      >
        {isHeartTheme && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <HeartIcon className="h-64 w-64 sm:h-80 sm:w-80 text-white/80" />
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message._id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <MessageItem
                message={message}
                sender={message.senderId}
                isCurrentUser={message.senderId?._id === currentUser?._id}
                onImageClick={onImageClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

export default MessageList;
