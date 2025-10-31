import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const ProfileUpdateForm = ({
  isEditing,
  formData,
  formDataUnderEdit,
  setFormDataUnderEdit,
}) => {
  return (
    <>
      <form className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="fullName" className="font-medium">
              Full Name:
            </label>
            <div className="relative">
              <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={
                  isEditing ? formDataUnderEdit.fullName : formData.fullName
                }
                id="fullName"
                type="text"
                placeholder="Demo User"
                className={`border rounded px-3 py-2 pl-10 w-full ${!isEditing && "pointer-events-none"}`}
                onChange={(e) =>
                  setFormDataUnderEdit({
                    ...formDataUnderEdit,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="email" className="font-medium">
              Email Address:
            </label>
            <div className="relative">
              <MdOutlineMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={formData.email}
                id="email"
                type="email"
                placeholder="demo@meetinmiddle.com"
                className={`border rounded px-3 py-2 pl-10 w-full pointer-events-none ${isEditing && "border-2 border-red-400"}`}
                onChange={(e) =>
                  setFormDataUnderEdit({
                    ...formDataUnderEdit,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="phone" className="font-medium">
              Phone Number:
            </label>
            <div className="relative">
              <MdOutlinePhoneCallback className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={
                  isEditing
                    ? formDataUnderEdit.phoneNumber
                    : formData.phoneNumber
                }
                id="phone"
                type="tel"
                placeholder="91+(555) 123-4567"
                className={`border rounded px-3 py-2 pl-10 w-full ${!isEditing && "pointer-events-none"}`}
                maxLength={14}
                onChange={(e) =>
                  setFormDataUnderEdit({
                    ...formDataUnderEdit,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="Location" className="font-medium">
              Location:
            </label>
            <div className="relative">
              <MdOutlineLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={
                  isEditing ? formDataUnderEdit.location : formData.location
                }
                id="Location"
                type="text"
                placeholder="New York, NY"
                className={`border rounded px-3 py-2 pl-10 w-full ${!isEditing && "pointer-events-none"}`}
                onChange={(e) =>
                  setFormDataUnderEdit({
                    ...formDataUnderEdit,
                    location: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col">
          <label htmlFor="Bio" className="font-medium">
            Bio:
          </label>
          <textarea
            value={isEditing ? formDataUnderEdit.bio : formData.bio}
            id="Bio"
            placeholder="Demo user for Meet in Middle application"
            className={`border rounded px-3 py-2 pl-10 w-full ${!isEditing && "pointer-events-none"}`}
            onChange={(e) =>
              setFormDataUnderEdit({
                ...formDataUnderEdit,
                bio: e.target.value,
              })
            }
          />
        </div>
      </form>
    </>
  );
};

export default ProfileUpdateForm;
