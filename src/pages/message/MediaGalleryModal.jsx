// src/components/chat/MediaGalleryModal.jsx
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const MediaGalleryModal = ({ images, onClose, onImageSelect }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative h-[60vh] w-[90vw] max-w-4xl rounded-lg bg-gray-800 p-4 shadow-xl flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-700 pb-3 flex-shrink-0">
          <h2 className="text-xl font-bold">Thư viện ảnh</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 overflow-y-auto h-full pt-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="aspect-square cursor-pointer overflow-hidden rounded-md bg-gray-700"
              onClick={() => onImageSelect(img.id)}
            >
              <img
                src={img.src}
                alt={`media-${index}`}
                className="h-full w-full object-cover transition-transform hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaGalleryModal;
