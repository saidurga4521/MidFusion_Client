import React, { useEffect, useState, useRef } from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaCalendar, FaRegUser, FaTrash, FaRegStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { IoCameraSharp } from "react-icons/io5";
import { toast } from "react-toastify";

import ProfileUpdateForm from "../components/profileSettings-components/ProfileUpdateForm";
import MeetingHitoryCompnent from "../components/profileSettings-components/MeetingHitoryCompnent";
import StatisticsComponent from "../components/profileSettings-components/StatisticsComponent";
import StripePaymentSection from "../components/StripePaymentSection";
import CalendarComponent from "../components/profileSettings-components/CalendarComponent";

import {
  deleteAvatar,
  getUserProfileInfo,
  updateUserProfileInfo,
  uploadAvatar,
} from "../services/userSettings";

const ProfileSettingsPage = () => {
  const [currWindow, setCurrWindow] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [dpUploadLoading, setDpUploadLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    bio: "",
    avatar: "",
  });

  const [formDataUnderEdit, setFormDataUnderEdit] = useState(null);
  const fileInputRef = useRef(null);

  // 👇 Trigger hidden file input
  const handleClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  // 👇 Delete avatar
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const res = await deleteAvatar();
      toast.success(res.data.message);
      await getUserInfo(); // refresh after delete
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete avatar");
    }
  };

  // 👇 Handle file selection + preview
  const handleFileUpload = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(image);

    // Store the file temporarily
    setFormDataUnderEdit((prev) => ({
      ...prev,
      newAvatarFile: image,
    }));
  };

  // 👇 Save profile + upload image + REFRESH
  async function updateUserInfo() {
    try {
      setDpUploadLoading(true);

      // 1️⃣ Update text info
      const res = await updateUserProfileInfo({
        ...formDataUnderEdit,
        name: formDataUnderEdit.fullName,
        phone: formDataUnderEdit.phoneNumber,
      });
      // toast.success(res.data.message);

      // 2️⃣ Upload avatar if changed
      if (formDataUnderEdit?.newAvatarFile) {
        const formImageData = new FormData();
        formImageData.append("image", formDataUnderEdit.newAvatarFile);

        const imageRes = await uploadAvatar(formImageData);
        toast.success(imageRes.data.message);
      }

      // 3️⃣ Refetch updated user info from backend
      await getUserInfo();

      // 4️⃣ Reset state
      setIsEditing(false);
      setPreview(null);
      setFormDataUnderEdit(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setDpUploadLoading(false);
    }
  }

  // 👇 Fetch profile info
  async function getUserInfo() {
    try {
      const res = await getUserProfileInfo();
      setFormData({
        fullName: res.data.data.name,
        email: res.data.data.email,
        phoneNumber: res.data.data.phone,
        location: res.data.data.location,
        bio: res.data.data.bio,
        avatar: res.data.data.avatar,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load profile");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (formData) {
      setFormDataUnderEdit({ ...formData });
    }
  }, [formData]);

  return (
    <div className="max-w-3xl mx-auto p-3 select-none">
      {/* Header */}
      <div className="mb-6">
        <b className="text-xl block mb-1">Profile</b>
        <h5 className="text-gray-600">
          Manage your account settings and preferences
        </h5>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center w-full">
        <div className="flex flex-col sm:flex-row items-center w-full gap-5">
          <div
            className={`rounded-full bg-indigo-500 w-20 h-20 flex flex-col items-center justify-center text-2xl text-white mb-4 sm:mb-0 relative ${
              isEditing && "cursor-pointer"
            }`}
            onClick={handleClick}
          >
            {dpUploadLoading && (
              <div className="w-10 absolute h-10 border-4 top-1/2 left-1/2 -translate-1/2 rounded-full border-indigo-500 animate-spin border-b-transparent" />
            )}

            {preview || formData?.avatar ? (
              <img
                src={preview || formData?.avatar}
                className="w-18 h-18 rounded-full object-cover"
                alt="Avatar"
              />
            ) : (
              <div>{formData.fullName.slice(0, 2).toUpperCase()}</div>
            )}

            {isEditing && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                <IoCameraSharp
                  title="Update Avatar"
                  className="absolute bottom-1 right-1/2 translate-x-1/2 rounded-full bg-white/70 p-1 text-black/70 cursor-pointer"
                />
                <div
                  title="Delete Avatar"
                  className="border-2 border-white/25 absolute bottom-1 -right-1 translate-2 bg-black/30 rounded-full p-1 text-center cursor-pointer"
                  onClick={handleDelete}
                >
                  <FaTrash className="text-xs text-white" />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col text-center sm:text-left">
            <b className="text-lg">{formData.fullName}</b>
            <h6 className="text-gray-500">{formData.email}</h6>
            <h6 className="text-gray-500 flex items-center gap-1 justify-center sm:justify-start">
              <MdOutlineLocationOn />
              {formData.location || "Hyderabad"}
            </h6>
          </div>

          <div className="sm:ml-auto mt-4 sm:mt-0">
            {!isEditing && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-[5px] flex items-center gap-2 transition w-full sm:w-auto justify-center cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <BiEdit />
                Edit Profile
              </button>
            )}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-transparent text-black border border-gray-400 px-4 py-2 rounded hover:bg-gray-500 hover:text-white transition"
                  onClick={() => {
                    setIsEditing(false);
                    setFormDataUnderEdit(formData);
                    setPreview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-[5px] flex items-center gap-2 transition w-30 sm:w-auto justify-center cursor-pointer"
                  onClick={updateUserInfo}
                  disabled={dpUploadLoading}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <div className="flex justify-start gap-4 sm:gap-10 mb-6">
          {[
            ["Profile", FaRegUser],
            ["Meeting History", CiCalendar],
            ["Statistics", FaRegStar],
            ["Stripe", FaRegStar],
            ["Calendar", FaCalendar],
          ].map(([label, Icon], i) => (
            <button
              key={label}
              className={`cursor-pointer p-2 text-lg flex items-center gap-2 ${
                currWindow === i
                  ? "text-rose-400 border-b-2 border-rose-400"
                  : "text-black"
              }`}
              type="button"
              onClick={() => setCurrWindow(i)}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>

        {currWindow === 0 && (
          <ProfileUpdateForm
            isEditing={isEditing}
            formData={formData}
            formDataUnderEdit={formDataUnderEdit}
            setFormDataUnderEdit={setFormDataUnderEdit}
          />
        )}
        {currWindow === 1 && <MeetingHitoryCompnent />}
        {currWindow === 2 && <StatisticsComponent />}
        {currWindow === 3 && <StripePaymentSection />}
        {currWindow === 4 && <CalendarComponent />}
      </div>
    </div>
  );
};

export default ProfileSettingsPage;