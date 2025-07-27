import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGroupInfo,
  removeMemberFromGroup,
  deleteGroup,
  inviteToGroup,
} from "../../redux/conversationSlice";
import {
  XMarkIcon,
  TrashIcon,
  UserPlusIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

const GroupSettingsModal = ({
  isOpen,
  onClose,
  conversation,
  currentUser,
  isOwner,
}) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.conversations.users);

  const [groupName, setGroupName] = useState(conversation.name);
  const [avatarUrl, setAvatarUrl] = useState(conversation.avatarUrl);
  const [userToInvite, setUserToInvite] = useState("");

  const handleUpdateInfo = () => {
    dispatch(
      updateGroupInfo({
        conversationId: conversation._id,
        groupData: { name: groupName, avatarUrl },
      })
    );
    // Thêm feedback cho người dùng sau này (ví dụ: toast notification)
  };

  const handleRemoveMember = (memberId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm?")) {
      dispatch(
        removeMemberFromGroup({
          conversationId: conversation._id,
          memberIdToRemove: memberId,
        })
      );
    }
  };

  const handleDeleteGroup = () => {
    if (
      window.confirm(
        "CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn nhóm này? Hành động này không thể hoàn tác."
      )
    ) {
      dispatch(deleteGroup(conversation._id));
      onClose();
    }
  };

  const handleInviteUser = () => {
    if (userToInvite) {
      dispatch(
        inviteToGroup({
          conversationId: conversation._id,
          userIdToInvite: userToInvite,
        })
      );
      setUserToInvite("");
    }
  };

  const potentialMembers = allUsers.filter(
    (user) => !conversation.memberIds.some((member) => member._id === user._id)
  );

  if (!isOpen) return null;

  return (
    // Lớp phủ nền mờ
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Thân Modal */}
      <div
        className="relative flex flex-col w-full max-w-md max-h-[90vh] rounded-2xl bg-gray-800 text-gray-100 shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold">Cài đặt nhóm</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Nội dung có thể cuộn */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Phần Chỉnh sửa thông tin (chỉ Owner) */}
          {isOwner && (
            <section aria-labelledby="edit-group-heading">
              <h3
                id="edit-group-heading"
                className="text-sm font-semibold text-gray-400 uppercase mb-3"
              >
                Chỉnh sửa thông tin
              </h3>
              <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg">
                <div>
                  <label
                    htmlFor="groupName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Tên nhóm
                  </label>
                  <input
                    id="groupName"
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Tên nhóm"
                    className="w-full bg-gray-700 p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="avatarUrl"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    URL Avatar
                  </label>
                  <input
                    id="avatarUrl"
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="URL Avatar"
                    className="w-full bg-gray-700 p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleUpdateInfo}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-md font-semibold transition-colors"
                >
                  <CheckIcon className="h-5 w-5" /> Lưu thay đổi
                </button>
              </div>
            </section>
          )}

          {/* Phần Thêm thành viên (chỉ Owner) */}
          {isOwner && (
            <section aria-labelledby="invite-member-heading">
              <h3
                id="invite-member-heading"
                className="text-sm font-semibold text-gray-400 uppercase mb-3"
              >
                Thêm thành viên
              </h3>
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={userToInvite}
                    onChange={(e) => setUserToInvite(e.target.value)}
                    className="flex-grow bg-gray-700 p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn người để mời</option>
                    {potentialMembers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleInviteUser}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-semibold transition-colors flex-shrink-0"
                  >
                    <UserPlusIcon className="h-5 w-5" /> Mời
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Phần Danh sách thành viên */}
          <section aria-labelledby="member-list-heading">
            <h3
              id="member-list-heading"
              className="text-sm font-semibold text-gray-400 uppercase mb-3"
            >
              Thành viên ({conversation.memberIds.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2">
              {conversation.memberIds.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.fullName}
                      className="h-9 w-9 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="truncate">
                      {member.fullName}{" "}
                      {member._id === conversation.ownerId._id && (
                        <span className="text-xs text-yellow-400 ml-1">
                          (Chủ nhóm)
                        </span>
                      )}
                    </span>
                  </div>
                  {isOwner && member._id !== currentUser._id && (
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      title="Xóa khỏi nhóm"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Phần Xóa nhóm (chỉ Owner) */}
          {isOwner && (
            <section
              aria-labelledby="delete-group-heading"
              className="border-t border-red-500/20 pt-6 mt-6"
            >
              <button
                onClick={handleDeleteGroup}
                className="w-full bg-red-600 hover:bg-red-700 p-2 rounded-md flex items-center justify-center gap-2 font-semibold transition-colors"
              >
                <TrashIcon className="h-5 w-5" /> Xóa nhóm vĩnh viễn
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupSettingsModal;
