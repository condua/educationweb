import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/userSlice";

// --- Import các icon cần thiết ---
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  LoaderCircle,
  Milestone,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// --- Component Alert được thiết kế riêng ---
const CustomAlert = ({ type, title, message, onClose, show }) => {
  if (!show) return null;

  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-11/12 max-w-md transform transition-all duration-300 scale-100">
        <div className="flex flex-col items-center text-center">
          <Icon
            className={`w-16 h-16 mb-4 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          />
          <h3
            className={`text-2xl font-bold ${
              isSuccess ? "text-slate-800" : "text-red-600"
            }`}
          >
            {title}
          </h3>
          <p className="text-slate-600 mt-2">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`mt-6 w-full font-semibold py-3 rounded-lg transition-colors duration-300 ${
            isSuccess
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          Đã hiểu
        </button>
      </div>
    </div>
  );
};

// --- Component Input ---
const InputField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <input
        {...props}
        className={`block w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 pl-10 text-gray-800 transition focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 ${
          props.readOnly ? "cursor-not-allowed" : ""
        }`}
      />
    </div>
  </div>
);

// --- Component Textarea ---
const TextareaField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute top-3 left-0 flex items-center pl-3">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <textarea
        {...props}
        rows={3}
        className="block w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 pl-10 text-gray-800 transition focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 resize-none"
      />
    </div>
  </div>
);

// --- Component Chính: ProfilePage ---
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [profile, setProfile] = useState({
    avatar: "",
    fullName: "",
    email: "",
    birthDate: null,
    phone: "",
    gender: "Nam",
    address: "",
  });

  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        avatar: user.avatar || "",
        fullName: user.fullName || "",
        email: user.email || "",
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        phone: user.phone || "",
        gender: user.gender || "Nam",
        address: user.address || "",
      });
    }
  }, [user]);

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
      setProfile((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    let finalAvatarUrl = user?.avatar || "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.imageUrl) {
          finalAvatarUrl = data.imageUrl;
        } else {
          throw new Error("Tải ảnh lên thất bại");
        }
      } catch (error) {
        console.error("Lỗi tải ảnh:", error);
        setAlertInfo({
          show: true,
          type: "error",
          title: "Tải ảnh thất bại",
          message: "Đã có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.",
        });
        setIsSaving(false);
        return;
      }
    }

    const updatedData = { ...profile, avatar: finalAvatarUrl };

    dispatch(updateUser({ id: user._id, data: updatedData }))
      .unwrap()
      .then(() => {
        setAlertInfo({
          show: true,
          type: "success",
          title: "Thành công!",
          message: "Hồ sơ của bạn đã được cập nhật.",
        });
      })
      .catch((error) => {
        console.error("Lỗi cập nhật hồ sơ:", error);
        setAlertInfo({
          show: true,
          type: "error",
          title: "Thất bại",
          message: "Không thể cập nhật hồ sơ. Vui lòng kiểm tra lại thông tin.",
        });
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (status === "loading" && !user) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <LoaderCircle className="w-16 h-16 animate-spin text-teal-600" />
      </div>
    );
  }

  if (status === "failed" && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Tải hồ sơ thất bại. Vui lòng làm mới trang.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <CustomAlert
        show={alertInfo.show}
        type={alertInfo.type}
        title={alertInfo.title}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ ...alertInfo, show: false })}
      />

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-2">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3"
          >
            {/* Cột Trái: Avatar & Info */}
            <div className="col-span-1 bg-slate-50/70 p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col items-center text-center">
              <div className="relative group w-40 h-40 mb-4">
                <img
                  src={
                    profile.avatar && profile.avatar.trim()
                      ? profile.avatar
                      : `https://ui-avatars.com/api/?name=${
                          profile.fullName || "User"
                        }&background=teal&color=fff&size=256`
                  }
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${
                      profile.fullName || "User"
                    }&background=teal&color=fff&size=256`;
                  }}
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
                >
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {profile.fullName || "Tên người dùng"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{profile.email}</p>
            </div>

            {/* Cột Phải: Form chỉnh sửa */}
            <div className="col-span-2 p-8">
              <h3 className="text-xl font-bold text-slate-700 mb-6">
                Chỉnh sửa thông tin
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="Họ và tên"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  icon={User}
                  placeholder="Nhập họ và tên"
                />
                <InputField
                  label="Email"
                  name="email"
                  value={profile.email}
                  icon={Mail}
                  readOnly
                />
                <InputField
                  label="Số điện thoại"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  icon={Phone}
                  placeholder="Nhập số điện thoại"
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Ngày sinh
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <DatePicker
                      selected={profile.birthDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày sinh"
                      showYearDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                      className="block w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 pl-10 text-gray-800 transition focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Giới tính
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Milestone className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      className="block w-full appearance-none rounded-lg border-gray-200 bg-gray-50 p-2.5 pl-10 text-gray-800 transition focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500"
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <TextareaField
                    label="Địa chỉ"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    icon={MapPin}
                    placeholder="Nhập địa chỉ của bạn"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center justify-center bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:bg-teal-700 hover:shadow-teal-300/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
