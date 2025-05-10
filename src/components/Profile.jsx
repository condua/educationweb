import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/userSlice";
import CustomDateInput from "../utils/CustomDateInput";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token); // Lấy token từ state
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Lưu file gốc
  const [profile, setProfile] = useState({
    avatar: "",
    fullName: "",
    email: "",
    birthDate: new Date(),
    phone: "",
    gender: "",
    address: "",
  });

  // Chỉ gọi fetchUser nếu token có sự thay đổi và người dùng chưa được lấy
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser(token)); // Truyền token vào fetchUser
    }
  }, [dispatch, token, user]); // Thêm user vào dependency array để tránh gọi lại không cần thiết

  // Khi user thay đổi, cập nhật profile
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        avatar: user.avatar || "https://i.pravatar.cc/150",
        fullName: user.fullName || "",
        email: user.email || "",
        birthDate: user.birthDate ? new Date(user.birthDate) : new Date(), // Convert string to Date
        phone: user.phone || "",
        gender: user.gender || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  const parseDate = (dateStr) => {
    try {
      return parse(dateStr, "dd/MM/yyyy", new Date());
    } catch {
      return new Date();
    }
  };

  const formatDate = (dateObj) => {
    try {
      return format(dateObj, "dd/MM/yyyy");
    } catch {
      return "";
    }
  };

  // Không cần parse/format ngày nữa — trực tiếp set Date object
  const handleDateChange = (date) => {
    setProfile((prev) => ({ ...prev, birthDate: date }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: imageUrl })); // Hiển thị preview
      setImageFile(file); // Lưu file để upload sau
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = profile.avatar; // Giữ nguyên avatar hiện tại

    // Nếu người dùng chọn ảnh mới (imageFile khác null), upload lên server
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.imageUrl) {
          imageUrl = data.imageUrl;
        } else {
          throw new Error("Image upload failed.");
        }
      } catch (error) {
        console.error("Upload image error:", error);
        alert("Image upload failed.");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    // Sau khi xử lý ảnh, gọi updateUser
    const userData = { ...profile, avatar: imageUrl };

    try {
      await dispatch(updateUser({ id: user._id, data: userData }));
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Failed to update profile.");
    }
  };

  // if (status === "loading") {
  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
  //     </div>
  //   );
  // }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex flex-col items-center">
          <label className="relative cursor-pointer group">
            <img
              src={profile.avatar || "https://i.pravatar.cc/150"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover"
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
          <h2 className="text-xl font-bold mt-3">{profile.fullName}</h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <InputField
            label="Full Name"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
          />
          <InputField
            label="Email (Read-Only)"
            name="email"
            value={profile.email}
            readOnly
          />

          <div className="mb-4 w-full">
            <label className="block font-semibold mb-1">Date of birth:</label>
            <DatePicker
              selected={profile.birthDate}
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
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />
          <TextareaField
            label="Address"
            name="address"
            value={profile.address}
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
