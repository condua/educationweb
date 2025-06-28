import React from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaUsers,
  FaDollarSign,
  FaBookOpen,
  FaClock,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  statsCards,
  revenueData,
  topCourses,
  recentActivities,
} from "./mockData";

// Component Card thống kê
const StatCard = ({ icon, title, value, change, changeType }) => {
  const iconMap = {
    revenue: <FaDollarSign />,
    users: <FaUsers />,
    enrollments: <FaBookOpen />,
    pending: <FaClock />,
  };

  const colorMap = {
    increase: "text-green-500",
    decrease: "text-red-500",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex items-center text-sm mt-1">
          <span className={`${colorMap[changeType]} mr-1 flex items-center`}>
            {changeType === "increase" && <FaArrowUp size={12} />}
            {changeType === "decrease" && <FaArrowDown size={12} />}
            {change}
          </span>
          <span className="text-gray-500">so với tháng trước</span>
        </div>
      </div>
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        {iconMap[icon]}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Tổng quan
      </h1>

      {/* Grid for Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Phân tích Doanh thu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip formatter={(value) => `${value.toLocaleString()}₫`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Doanh thu"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Hoạt động Gần đây</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-start">
                <img
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-bold">{activity.user.name}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-bold text-blue-600">
                      {activity.target}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Selling Courses */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Khóa học Bán chạy nhất</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2 font-normal">Khóa học</th>
                  <th className="pb-2 font-normal">Học viên</th>
                  <th className="pb-2 font-normal">Giá</th>
                </tr>
              </thead>
              <tbody>
                {topCourses.map((course) => (
                  <tr key={course.id} className="border-t border-gray-200">
                    <td className="py-3 flex items-center">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-10 rounded-md mr-4 object-cover"
                      />
                      <span className="font-semibold">{course.title}</span>
                    </td>
                    <td className="py-3">{course.students.toLocaleString()}</td>
                    <td className="py-3 font-semibold">{course.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
