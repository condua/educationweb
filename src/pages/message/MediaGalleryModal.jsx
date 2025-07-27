import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/solid";

const MediaGalleryModal = ({ images, onClose, onImageSelect }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex flex-col w-full max-w-4xl h-[80vh] rounded-2xl bg-gray-800 text-gray-100 shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold">Thư viện Ảnh & Video</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Thân Modal (Nội dung) */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6">
          <AnimatePresence>
            {images && images.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4"
              >
                {images.map((img, index) => (
                  <motion.div
                    layout
                    key={img.id || index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="aspect-square group cursor-pointer overflow-hidden rounded-lg bg-gray-700 shadow-md"
                    onClick={() => onImageSelect(img.id)}
                  >
                    <img
                      src={img.src}
                      alt={`media-${index}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <PhotoIcon className="h-16 w-16 mb-4" />
                <p className="text-lg font-medium">Chưa có ảnh nào</p>
                <p className="text-sm">
                  Tất cả ảnh bạn gửi sẽ xuất hiện ở đây.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MediaGalleryModal;
