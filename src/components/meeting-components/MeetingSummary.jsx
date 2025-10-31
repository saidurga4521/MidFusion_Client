import React from "react";
import { useSelector } from "react-redux";

const MeetingSummary = ({ meetingData }) => {
  const { user } = useSelector((store) => store.authSlice);
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Review Meeting Details
        </h3>
        <p className="text-gray-600 mt-1">
          Please verify all information before confirming
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Meeting Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800">
              Meeting Information
            </h4>
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-gray-500 w-16 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Title:
              </span>
              <span className="text-gray-800 font-medium">
                {meetingData.info.title}
              </span>
            </div>

            <div className="flex items-start">
              <span className="text-gray-500 w-16 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Start:
              </span>
              <span className="text-gray-800">
                {formatDate(meetingData.info.startDate)}
              </span>
            </div>

            <div className="flex items-start">
              <span className="text-gray-500 w-16 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                End:
              </span>
              <span className="text-gray-800">
                {formatDate(meetingData.info.endDate)}
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-500 w-20 flex-shrink-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-1 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 22s8-7.333 8-14A8 8 0 004 8c0 6.667 8 14 8 14z"
                  />
                </svg>
                Address:
              </span>
              <span className="text-gray-800">
                {meetingData.adminAddress.address}
              </span>
            </div>
          </div>
        </div>

        {/* Participants Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                Participants
              </h4>
            </div>
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {meetingData.participants.length} invited
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div>
                <p className="text-gray-800 font-medium">{user?.name}</p>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                Organizer
              </span>
            </div>
          </div>
          {meetingData.participants.map((participant) => (
            <div key={participant.id} className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <p className="text-gray-800 font-medium">
                    {participant.name}
                  </p>
                  <p className="text-gray-500 text-sm">{participant.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps Card */}
      <div className="bg-blue-50 rounded-xl border border-blue-100 p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              Next Steps
            </h4>
            <p className="text-blue-700 leading-relaxed">
              After creating this meeting, participants will receive email
              invitations to join and provide their locations. Once everyone
              responds, you will be able to find the perfect meeting location
              and start voting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
