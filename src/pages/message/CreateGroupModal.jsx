import React, { useState, useMemo } from "react";

/**
 * Component hiển thị một cửa sổ (modal) để người dùng tạo một cuộc trò chuyện nhóm mới.
 *
 * @param {object} props - Props cho component.
 * @param {boolean} props.isOpen - Cờ để xác định modal có được hiển thị hay không.
 * @param {Function} props.onClose - Hàm callback được gọi khi người dùng đóng modal.
 * @param {Array} props.allUsers - Mảng chứa tất cả đối tượng người dùng trong hệ thống (từ Redux).
 * @param {object} props.currentUser - Đối tượng người dùng hiện tại đang đăng nhập (từ Redux).
 * @param {Function} props.onCreateGroup - Hàm callback được gọi khi người dùng nhấn "Tạo nhóm".
 * @returns {React.ReactElement|null}
 */
const CreateGroupModal = ({
  isOpen,
  onClose,
  allUsers,
  currentUser,
  onCreateGroup,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [error, setError] = useState("");

  // **THAY ĐỔI 1: Lọc người dùng bằng `_id`**
  const otherUsers = useMemo(
    () =>
      allUsers.filter((user) => currentUser && user._id !== currentUser._id),
    [allUsers, currentUser]
  );

  // Xử lý việc chọn hoặc bỏ chọn một người dùng
  const handleToggleUser = (userId) => {
    setSelectedUserIds(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // Bỏ chọn
          : [...prev, userId] // Chọn
    );
  };

  // Xử lý khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      setError("Vui lòng nhập tên nhóm.");
      return;
    }
    // Backend yêu cầu nhóm có ít nhất 3 thành viên (bao gồm người tạo)
    // => cần chọn ít nhất 2 người khác.
    if (selectedUserIds.length < 2) {
      setError("Vui lòng chọn ít nhất 2 thành viên.");
      return;
    }

    // Gọi hàm từ component cha để xử lý việc tạo nhóm
    onCreateGroup({
      name: groupName,
      memberIds: selectedUserIds,
    });

    // Reset trạng thái và đóng modal
    setGroupName("");
    setSelectedUserIds([]);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6 mx-4 bg-gray-800 rounded-lg shadow-xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Tạo nhóm mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Tên nhóm
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên nhóm của bạn"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Chọn thành viên (cần ít nhất 2 người)
            </label>
            <div className="max-h-60 overflow-y-auto p-2 bg-gray-900 rounded-lg border border-gray-600">
              {/* **THAY ĐỔI 2: Sử dụng đúng thuộc tính user trong JSX** */}
              {otherUsers.map((user) => (
                <div
                  key={user._id} // Dùng `_id` cho key
                  onClick={() => handleToggleUser(user._id)} // Dùng `_id`
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    selectedUserIds.includes(user._id) // Dùng `_id`
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img
                    src={user.avatar} // Dùng `avatar`
                    alt={user.fullName} // Dùng `fullName`
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                  <span>{user.fullName}</span> {/* Dùng `fullName` */}
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-lg hover:bg-gray-500 focus:outline-none"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Tạo nhóm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
