import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import CustomDateInput from "../utils/CustomDateInput";
const ProfilePage = () => {
  const [user, setUser] = useState({
    avatar: "https://i.pravatar.cc/150?img=32",
    fullName: "Nguyễn Duy Sil",
    email: "duysil@example.com",
    birthDate: "15/07/2001", // dd/mm/yyyy format
    phoneNumber: "0901234567",
    gender: "Male",
    address: "123 Lê Lợi, Quận 1, TP. HCM",
  });

  // Chuyển từ chuỗi dd/MM/yyyy → Date object
  const parseDate = (dateStr) => {
    try {
      return parse(dateStr, "dd/MM/yyyy", new Date());
    } catch {
      return new Date();
    }
  };

  // Chuyển từ Date → chuỗi dd/MM/yyyy
  const formatDate = (dateObj) => {
    try {
      return format(dateObj, "dd/MM/yyyy");
    } catch {
      return "";
    }
  };

  const handleDateChange = (date) => {
    const formatted = formatDate(date);
    setUser((prev) => ({ ...prev, birthDate: formatted }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", user);
    alert("Profile saved! (Check console)");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex flex-col items-center">
          <label className="relative cursor-pointer group">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition">
              Change
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
          <h2 className="text-xl font-bold mt-3">{user.fullName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <InputField
            label="Full Name"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
          <InputField
            label="Email (Read-Only)"
            name="email"
            value={user.email}
            readOnly
          />

          <div className="mb-4 w-full">
            <label className="block font-semibold mb-1">Date of birth</label>
            <DatePicker
              selected={parseDate(user.birthDate)}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              customInput={<CustomDateInput />}
            />
          </div>

          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />
          <TextareaField
            label="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  readOnly = false,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={`mt-1 w-full p-2 border rounded-md ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-2 border rounded-md bg-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="mt-1 w-full p-2 border rounded-md bg-white resize-none"
    />
  </div>
);

export default ProfilePage;
