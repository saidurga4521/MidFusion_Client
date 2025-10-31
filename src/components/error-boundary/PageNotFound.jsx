import React from "react";
import { Home, ArrowLeft } from "lucide-react";

// Simple & Cute 404 Page — Red Theme
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 px-6 text-center">
      <h1 className="text-8xl font-extrabold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        Sorry, we can’t find the page you’re looking for.
      </p>

      {/* Cute Illustration */}
      <div className="mt-8">
        <span className="text-6xl">🐱‍🚀</span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition"
        >
          <Home className="h-4 w-4" />
          Go Home
        </button>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
