import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/userSlice"; // chỉnh lại path nếu khác

const StudentManagement = () => {
  const dispatch = useDispatch();
  const { usersList, status, currentPage, totalPages } = useSelector(
    (state) => state.user
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch user list when component mounts or search/page changes
  useEffect(() => {
    dispatch(fetchAllUsers({ page, limit: 10, search }));
  }, [dispatch, page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Quản lý Học viên</h2>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc email..."
        value={search}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />

      {status === "loading" ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : (
        <ul className="space-y-3">
          {usersList.length === 0 ? (
            <li className="text-center text-gray-500">Không có người dùng.</li>
          ) : (
            usersList.map((user) => (
              <li
                key={user._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className="mt-2 sm:mt-0 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {user.role}
                </span>
              </li>
            ))
          )}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Trang trước
          </button>
          <span className="px-3 py-1 text-sm text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
