import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdSecurity } from "react-icons/md";
import {
  getUserDefaultSettings,
  updateUserDefaultSettings,
} from "../services/userSettings";
const SettingPagePrivacy = () => {
  const [settings, setSettings] = useState({
    locationSharing: false,
    activityStatus: false,
    searchableProfile: false,
  });
  const saveDefaultSettings = async () => {
    try {
      const getSettings = await getUserDefaultSettings();
      setSettings(getSettings?.data.data);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSave = async () => {
    try {
      const res = await updateUserDefaultSettings(settings);
      setSettings({
        ...settings,
        ...res.data.data,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };
  useEffect(() => {
    saveDefaultSettings();
  }, []);

  const handleToggle = (e) => {
    setSettings((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.checked,
      };
    });
  };

  return (
    <div>
      <br />
      <div>
        <div className="p-6 bg-white rounded-2xl shadow-sm space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Privacy & security
          </h1>

          <div className="space-y-4">
            {/* Location Sharing */}
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="text-lg font-medium text-gray-700">
                  Location Sharing  <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Allow the app to access your location for meeting suggetions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  data-message={`Location Notification `}
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleToggle}
                  name="locationSharing"
                  checked={settings?.locationSharing}
                  disabled
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
              </label>
            </div>

            {/* Activity Status*/}
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="text-lg font-medium text-gray-700">
                  Activity Status  <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Show when you're online or offline to other users
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  data-message={`Activity Notification `}
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleToggle}
                  name="activityStatus"
                  checked={settings?.activityStatus}
                  disabled
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
              </label>
            </div>

            {/* Searchable Profile*/}
            <div className="flex items-center justify-between ">
              <div>
                <h2 className="text-lg font-medium text-gray-700">
                  Searchable Profile  <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Allow others to fin yoe by email or name
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  data-message={`Searchable Notification `}
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleToggle}
                  name="searchableProfile"
                  checked={settings?.searchableProfile}
                  disabled
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
              </label>
            </div>
            <div className="border-b pb-3"></div>
            <div className="flex justify-end ">
              <button
                type="button"
                className="mt-6 px-6 py-2 bg-gray-400 text-white font-medium rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-1 transition"
                onClick={handleSave}
                disabled
              >
                Save (Coming Soon..)
              </button>
            </div>
            <br />
            <div className="p-6 bg-amber-600 rounded-2xl shadow-sm border space-y-2">
              <h2 className="flex items-center text-lg font-semibold text-white gap-2">
                <MdSecurity className="text-xl" />
                Data Protection
              </h2>
              <p className="text-sm text-amber-100 leading-relaxed">
                We use industry-standard encryption to protect your data. Your
                location information is only shared with meeting participants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPagePrivacy;
