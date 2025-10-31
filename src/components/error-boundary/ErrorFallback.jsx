import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const isNetworkError = error.message === "No internet connection";

  if (isNetworkError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center px-4">
        {/* Offline Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-6 animate-pulse"
          viewBox="0 0 24 24"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06a5 5 0 0 0-7.44 0" />
          <path d="M5.27 18a9 9 0 0 1 13.46 0" />
          <path d="M1 9a15 15 0 0 1 22 0" />
        </svg>

        <h2 className="text-2xl font-bold text-red-600 mb-2">
          No Internet Connection
        </h2>
        <p className="text-gray-700 text-sm max-w-md">
          Please check your connection and try again.
        </p>

        <pre className="mt-4 text-xs text-left text-red-700 bg-red-100 px-3 py-2 rounded border border-red-400 shadow-sm overflow-auto max-h-64 w-full max-w-2xl">
          {error.stack || error.message}
        </pre>

        <button
          onClick={resetErrorBoundary}
          className="mt-6 px-6 py-2 rounded-lg bg-red-600 text-white font-medium shadow hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Default error fallback for other errors
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-6 animate-bounce"
      >
        <path d="M2 20h20M6 16l4-9 5 9 2-5 5 5" />
        <circle cx="6.5" cy="16.5" r="0.5" />
        <circle cx="11.5" cy="16.5" r="0.5" />
      </svg>

      <h2 className="text-2xl font-semibold text-blue-600 mb-2">
        Something went wrong...
      </h2>
      {/*  show error details */}
      {import.meta.env.DEV && <div>
        <pre className="bg-gray-200 text-left p-3 rounded mt-4 text-xs text-red-700 overflow-auto mb-2">
          {error.stack}
        </pre>
      </div>
      }

      <p className="text-gray-600 max-w-md text-sm">
        Sorry, we're having some technical issues. <br />
        Try refreshing the page, sometimes it works :)
      </p>

      <button
        onClick={resetErrorBoundary}
        className="mt-6 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorFallback;
