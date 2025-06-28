import { FaTachometerAlt, FaUsers, FaBook, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-10">Admin Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 bg-gray-700 rounded-md"
            >
              <FaTachometerAlt className="mr-3" /> Tổng quan
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded-md"
            >
              <FaUsers className="mr-3" /> Quản lý Học viên
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded-md"
            >
              <FaBook className="mr-3" /> Quản lý Khóa học
            </a>
          </li>
          {/* Thêm các menu khác ở đây */}
        </ul>
      </nav>
      <div className="mt-auto">
        <a
          href="#"
          className="flex items-center p-2 hover:bg-gray-700 rounded-md"
        >
          <FaCog className="mr-3" /> Cài đặt
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
