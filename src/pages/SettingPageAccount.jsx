import React, { useState } from "react";
import { TfiImport } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  deleteUserAccount,
  generateUserReport,
} from "../services/userSettings";
import { replace, useNavigate, useParams } from "react-router-dom";
import { sendChangePasswordMail } from "../services/authentication";
import { generateMeetingsReport } from "../services/meetings";

const SettingPageAccount = () => {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async() => {
    console.log("handleChangePassword before")
  let response=await sendChangePasswordMail();
  console.log(response);
  if (response.data.success) {
    toast.success(response.data.message);
  } else {
    toast.error(response.data.message);
  }  
    console.log("handleChangePassword after")
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteUserAccount();
      toast.success(res.data.message);
      navigate("/login", replace);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <br />
      <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Account Management
        </h1>

        {/* Export Data */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <TfiImport className="text-2xl text-gray-600 flex-shrink-0 self-center" />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium text-gray-700">
                Export User Data
              </h2>
              <p className="text-sm text-gray-500">
                Download a copy of your account data
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-transparent border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
            onClick={() => {
              generateUserReport()
                .then((res) => {
                  console.log(res);
                  toast.success(res.data.message+". You will receive an email shortly.");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error(err.response.data.message);
                });
            }}
          >
            Export User
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <TfiImport className="text-2xl text-gray-600 flex-shrink-0 self-center" />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium text-gray-700">
                Export Meeting Data
              </h2>
              <p className="text-sm text-gray-500">
                Download a copy of all your meetings
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-transparent border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
            onClick={() => {
              generateMeetingsReport().then((res) => {
                console.log(res);
                toast.success(res.data.message+". You will receive an email shortly.");
              }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
              });
            }}
          >
            Export Meetings
          </button>
        </div>

        {/* Change Password */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <CiLock className="text-2xl text-gray-600 flex-shrink-0 self-center" />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium text-gray-700">
                Change Password
              </h2>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>
          <button 
          onClick={handleChangePassword}
          className="px-4 py-2 bg-transparent border border-black text-black rounded-lg hover:bg-black hover:text-white transition">
            Change
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <RiDeleteBin5Line className="text-2xl text-red-600 flex-shrink-0 self-center" />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium text-red-600">
                Delete Account
              </h2>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all data
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
        </div>

      {showConfirm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-20 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Are you sure?
      </h2>
      <p className="text-gray-600 mb-6">
        Do you really want to permanently delete your account? 
        
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowConfirm(false)}
          className="px-4 py-2 rounded border hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            setShowConfirm(false);
            await handleDeleteAccount();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}







      </div>
    </div>
  );
};

export default SettingPageAccount;
