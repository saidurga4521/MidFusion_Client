import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import SettingPageNotification from "../components/SettingPageNotification";
import SettingPagePrivacy from "./SettingPagePrivacy";
import SettingPageGenaral from "./SettingPageGenaral";
import SettingPageAccount from "./SettingPageAccount";
import SettingsPageHelp from "./SettingsPageHelp";
import { useNotification } from "../hooks/useNotification";

const SettingsPage = () => {
  const [currWindow, setCurrWindow] = useState(0);

  const { subscribeToPush, isSubscribed } = useNotification();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">
          Manage your account preferences and application settings

        </p>

        {isSubscribed ? (
          <p>Push notifications enabled ✅</p>
        ) : (
          <button
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${currWindow === 0
              ? "text-rose-500 border-b-2 border-rose-500"
              : "text-gray-600 hover:text-gray-800"
              }`}
            type="button"
            onClick={subscribeToPush}>Enable Push Notifications</button>
        )}
      </div>

      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-4 sm:gap-8 ">
          <button
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${currWindow === 0
              ? "text-rose-500 border-b-2 border-rose-500"
              : "text-gray-600 hover:text-gray-800"
              }`}
            type="button"
            onClick={() => setCurrWindow(0)}
          >
            <IoIosNotifications className="text-xl" />
            Notifications
          </button>

          <button
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${currWindow === 1
              ? "text-rose-500 border-b-2 border-rose-500"
              : "text-gray-600 hover:text-gray-800"
              }`}
            type="button"
            onClick={() => setCurrWindow(1)}
          >
            <MdOutlinePrivacyTip className="text-xl" />
            Privacy & Security
          </button>

          <button
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${currWindow === 2
              ? "text-rose-500 border-b-2 border-rose-500"
              : "text-gray-600 hover:text-gray-800"
              }`}
            type="button"
            onClick={() => setCurrWindow(2)}
          >
            <AiOutlineGlobal className="text-xl" />
            General
          </button>

          <button
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${currWindow === 3
              ? "text-rose-500 border-b-2 border-rose-500"
              : "text-gray-600 hover:text-gray-800"
              }`}
            type="button"
            onClick={() => setCurrWindow(3)}
          >
            <RiAccountPinCircleLine className="text-xl" />
            Account
          </button>

          <button
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${currWindow === 4
              ? "text-rose-500 border-b-2 border-rose-500"
              : "text-gray-600 hover:text-gray-800"
              }`}
            type="button"
            onClick={() => setCurrWindow(4)}
          >
            <IoIosHelpCircleOutline className="text-xl" />
            Help & Support
          </button>
        </div>

        {/* Content Area */}
        <div>
          {currWindow === 0 && <SettingPageNotification />}
          {currWindow === 1 && <SettingPagePrivacy />}
          {currWindow === 2 && <SettingPageGenaral />}
          {currWindow === 3 && <SettingPageAccount />}
          {currWindow === 4 && <SettingsPageHelp />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
