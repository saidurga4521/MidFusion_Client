import { useRef, useState,useEffect, useCallback } from "react";
import MeetingInfo from "../components/meeting-components/MeetingInfo";
import AddParticipant from "../components/meeting-components/AddParticipant";
import MeetingSummary from "../components/meeting-components/MeetingSummary";
import AdminAddress from "../components/meeting-components/AdminAddress";

import { createMeeting } from "../services/meetings";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





const MeetingForm = () => {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);


 const handleBackButton = useCallback((event) => {
    event.preventDefault();
    setShowConfirm(true);
  }, []);

useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBackButton);

    // Push initial state
    window.history.pushState(null, "", window.location.pathname);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [handleBackButton]);




  const [meetingData, setMeetingData] = useState({
    info: { title: "", description: "", startDate: "", endDate: "" },
    participants: [],
    adminAddress: { coords: [], address: "" },
  });
  const [errors, setErrors] = useState({
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const meetingInfoRef = useRef();
  const addParticipantRef = useRef();
  const items = [
    {
      id: 1,
      name: "1",
      label: "Meeting Info",
      component: (meetingData, setMeetingData) => (
        <MeetingInfo
          ref={meetingInfoRef}
          meetingData={meetingData}
          setMeetingData={setMeetingData}
        />
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      ),
    },
    {
      id: 2,
      name: "2",
      label: "Participants",
      component: (meetingData, setMeetingData) => (
        <AddParticipant
          ref={addParticipantRef}
          meetingData={meetingData}
          setMeetingData={setMeetingData}
        />
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      ),
    },
    {
      id: 3,
      name: "3",
      label: " User Location",
      component: (meetingData) => (
        <AdminAddress
          meetingData={meetingData}
          setMeetingData={setMeetingData}
          errors={errors}
          setErrors={setErrors}
        />
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: "4",
      label: "Summary",
      component: (meetingData) => <MeetingSummary meetingData={meetingData} />,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const handlePreviousClick = () =>
    setCurrentStep(Math.max(1, currentStep - 1));
  const handleNextClick = async () => {
    let valid = true;

    if (currentStep === 1 && meetingInfoRef.current) {
      valid = await meetingInfoRef.current.validate();
    }

    if (currentStep === 2 && addParticipantRef.current) {
      let flag = true;
      if (meetingData.participants.length > 0) {
        flag = false;
      }
      if (flag) {
        valid = await addParticipantRef.current.validate();
      } else {
        valid = true;
      }
    }
    if (currentStep === 3 && meetingData.adminAddress.address === "") {
      setErrors({ message: "This field is required" });
      valid = false;
    }

    if (!valid) return;
    setCurrentStep(Math.min(currentStep + 1, items.length));
  };

  const handleClick = async (e) => {
    // meetingData
    e.preventDefault(); // ✅ explicitly stop page refresh
    const data = {
      title: meetingData.info.title,
      description: meetingData.info.description,
      scheduledAt: meetingData.info.startDate,
      endsAt: meetingData.info.endDate,
      participants: meetingData.participants,
      creatorLocation: {
        lat: meetingData.adminAddress.coords[0],
        lng: meetingData.adminAddress.coords[1],
        placeName: meetingData.adminAddress.address,
      },
    };
    setIsLoading(true);
    try {
      const res = await createMeeting(data);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "create meeting failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-2xl mt-5 overflow-hidden">
        {/* Header with Progress Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Schedule a Meeting
          </h1>
          <p className="text-blue-100">
            Complete all steps to schedule your meeting
          </p>

          {/* Mobile Progress Bar */}
          <div className="mt-4 bg-blue-500 bg-opacity-30 rounded-full h-2 md:hidden">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / items.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Stepper Header - Desktop */}
          <div className="hidden md:flex justify-between items-center mb-8 relative">
            {/* Connector Line */}
            <div className="absolute top-6 left-16 right-16 h-0.5 bg-gray-300 z-0">
              <div
                className="h-0.5 bg-blue-600 transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (items.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all duration-300 ${
                    currentStep >= item.id
                      ? "bg-blue-600 text-white shadow-lg transform scale-110"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  } ${currentStep === item.id ? "ring-4 ring-blue-100" : ""}`}
                >
                  {currentStep > item.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    item.icon
                  )}
                </div>
                <span
                  className={`mt-3 text-sm font-medium text-center ${
                    currentStep >= item.id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Stepper Header - Mobile */}
          <div className="flex md:hidden justify-center mb-6">
            <div className="bg-blue-50 rounded-lg p-3 flex items-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                {currentStep}
              </div>
              <div>
                <p className="text-xs text-gray-500">Current Step</p>
                <p className="font-semibold text-blue-700">
                  {items[currentStep - 1].label}
                </p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[400px] transition-all duration-300">
            <div key={items[currentStep - 1].id}>
              {items[currentStep - 1].component(meetingData, setMeetingData)}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <button
                onClick={handlePreviousClick}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < items.length ? (
              <button
                onClick={handleNextClick}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition flex items-center gap-2"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ) : (
              <button
                disabled={isLoading}
                className="px-6 py-3 rounded-lg bg-green-600  text-white hover:bg-green-700 shadow-md transition flex items-center gap-2"
                onClick={handleClick}
              >
                {isLoading ? (
                  <div className="border-2 border-green-600 border-b-green-300 rounded-full w-4 h-4 animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                Schedule Meeting
              </button>
            )}
          </div>
        </div>
      </div>


 
        {showConfirm && (
  <div className="fixed inset-0 flex justify-center items-center mt-10 bg-black/30 bg-opacity-20">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[300px]">
      <p className="text-gray-800 font-medium">
        Are you sure you want to return back?
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => {
            setShowConfirm(false);
            window.removeEventListener("popstate", handleBackButton); // ✅ correct
            window.history.back(); // go back for real
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-4 py-2 rounded border hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}












    </div>
  );
};
export default MeetingForm;
