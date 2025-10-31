import React from "react";
import { Link } from "react-router-dom";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

const SettingsPageHelp = () => {
  return (
    <div>
      <br />
      <div className="p-6 bg-white rounded-2xl shadow-sm space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Help & Support</h1>

        {/* Help Center */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
          <IoIosHelpCircleOutline className="text-gray-600 text-2xl flex-shrink-0 self-center" />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-medium text-gray-700">Help Center</h2>
            <p className="text-sm text-gray-500">
              Browse our knowledge base and FAQs
            </p>
            <Link to="/help" className="text-blue-600 hover:underline">
              Visit
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
          <FiMessageSquare className="text-gray-600 text-2xl flex-shrink-0 self-center" />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-medium text-gray-700">
              Contact Support
            </h2>
            <p className="text-sm text-gray-500">
              Get help from our support team
            </p>
          </div>
        </div>

        {/* Send Feedback */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
          <FiMessageSquare className="text-gray-600 text-2xl flex-shrink-0 self-center" />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-medium text-gray-700">Send Feedback</h2>
            <p className="text-sm text-gray-500">
              Help us improve the app with your suggestions
            </p>
          </div>
        </div>

        {/* App Information */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
          <IoIosHelpCircleOutline className="text-gray-600 text-2xl flex-shrink-0 self-center" />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-medium text-gray-700">
              App Information
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPageHelp;
