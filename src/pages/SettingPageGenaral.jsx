import React from "react";

const SettingPageGeneral = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        General Settings
      </h2>

      {/* Theme (full width at top) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Theme
        </label>
        <input
          type="text"
          placeholder="Enter theme name"
          className="w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Grid Layout for 4 fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language */}
        <div className="relative">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Language
          </label>
          <div className="relative">
            <select
              id="language"
              name="language"
              defaultValue=""
              className="appearance-none block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="" disabled>
                Language
              </option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="ml">Malayalam</option>
              <option value="kn">Kannada</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        {/* Timezone */}
        <div className="relative">
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Timezone
          </label>
          <div className="relative">
            <select
              id="timezone"
              name="timezone"
              defaultValue=""
              className="appearance-none block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="" disabled>
                Select a time zone
              </option>
              <option value="Asia/Kolkata">India</option>
              <option value="America/New_York">Eastern</option>
              <option value="Europe/London">Greenwich</option>
              <option value="Asia/Tokyo">Japan</option>
              <option value="Australia/Sydney">Australia</option>
              <option value="UTC">Coordinated</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        {/* Date Format */}
        <div className="relative">
          <label
            htmlFor="date-format"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date Format
          </label>
          <div className="relative">
            <select
              id="date-format"
              name="date-format"
              defaultValue=""
              className="appearance-none block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="" disabled>
                Select a format
              </option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (20/08/2025)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (08/20/2025)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2025-08-20)</option>
              <option value="DD MMM YYYY">DD MMM YYYY (20 Aug 2025)</option>
              <option value="MMM DD, YYYY">MMM DD, YYYY (Aug 20, 2025)</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        {/* Time Format */}
        <div className="relative">
          <label
            htmlFor="time-format"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Time Format
          </label>
          <div className="relative">
            <select
              id="time-format"
              name="time-format"
              defaultValue=""
              className="appearance-none block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="" disabled>
                Select a format
              </option>
              <option value="12">12-hour (6:30 PM)</option>
              <option value="24">24-hour (18:30)</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPageGeneral;
