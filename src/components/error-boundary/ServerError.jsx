import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ServerError = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 text-center px-6">
    <div className="p-4 rounded-full bg-red-100 text-red-600 mb-4 shadow">
      <AlertTriangle className="h-10 w-10" />
    </div>

    <h1 className="text-7xl font-extrabold text-red-600 drop-shadow-sm">500</h1>

    <p className="text-lg text-gray-700 mt-2">
      Oops! Something went wrong on our end.
    </p>
    <p className="text-gray-500 text-sm max-w-md mt-1">
      Please try again later, or go back to the homepage.
    </p>

    <Link
      to="/"
      className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white text-sm font-medium rounded-lg shadow hover:bg-red-700 active:scale-[.97] transition"
    >
      ⬅ Back to Home
    </Link>
  </div>
);

export default ServerError;
