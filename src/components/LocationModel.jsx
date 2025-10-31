import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { acceptMeeting, getConflicts } from "../services/meetings";
import { rejectMeeting } from "../services/meetings";

const LocationModel = ({ isOpen, onClose, invite, myMeetings }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hasConflict, setHasConflict] = useState(false);
  const [showLocationFields, setShowLocationFields] = useState(false);
  const [pendingConflicts, setPendingConflicts] = useState([]);
  const [LatLong, setLatLong] = useState({});
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const checkConflicts = async (meetingId) => {
    try {
      const response = await getConflicts(meetingId);
      const data = await response.data;

      if (data.success && data.data.conflicts.length > 0) {
        setHasConflict(true);
        setPendingConflicts(data.data.conflicts);
        setShowLocationFields(false);
      } else {
        setHasConflict(false);
        setPendingConflicts([]);
        setShowLocationFields(true);
      }
    } catch (error) {
      console.error("Error fetching conflicts:", error.message);
    }
  };

  // Check for conflicts whenever invite changes
  useEffect(() => {
    // if (invite && myMeetings) {
    //   // Check confirmed conflicts
    //   const confirmedConflict = myMeetings.some(
    //     (meeting) =>
    //       meeting.date === invite.date &&
    //       meeting.time === invite.time &&
    //       meeting.status === "Confirmed"
    //   );
    //   setHasConflict(confirmedConflict);

    //   // Check pending conflicts (show automatically if exist)
    //   const pending = myMeetings.filter(
    //     (meeting) =>
    //       meeting.date === invite.date &&
    //       meeting.time === invite.time &&
    //       meeting.status === "Pending"
    //   );
    //   setPendingConflicts(pending);

    //   if (!confirmedConflict) setShowLocationFields(true);
    //   else setShowLocationFields(false);
    // }
    if (isOpen && invite.id) {
      checkConflicts(invite.id);
    }
  }, [isOpen, invite]);

  const handleConfirm = async () => {
    try {
      const acceptedConflicts = pendingConflicts.filter(
        (meeting) => meeting.status === "accepted"
      );
      await Promise.all(
        acceptedConflicts.map((m) => rejectMeeting(m.meeting._id))
      );
      setShowLocationFields(true);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleAccepted = async () => {
    try {
      const { lat, lon } = LatLong;
      const meetingData = {
        meetingId: invite.id,
        lat,
        lng: lon,
        placeName: query,
      };
      const response = await acceptMeeting(meetingData);
      const data = await response.data;
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Fetch location suggestions
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  // Browser geolocation
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLatLong({ lat: latitude, lon: longitude });
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        setQuery(data.display_name || "Current Location");
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg relative w-96 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <IoClose size={22} />
            </button>

            <h2 className="text-lg font-bold mb-4">
              Accept Invitation {invite?.title ? ` - ${invite.title}` : ""}
            </h2>

            {/* Conflict Message (Confirmed Meetings) */}
            {hasConflict && !showLocationFields ? (
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
                ⚠️ You already have a meeting scheduled at {invite?.date},{" "}
                {invite?.time}. Do you want to continue?
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    Yes, continue
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Current Location */}
                <button
                  onClick={useCurrentLocation}
                  className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600"
                >
                  Use My Current Location
                </button>

                {/* Location Search */}
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Enter your location"
                  className="w-full border p-2 rounded mb-2"
                />

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <ul className="border rounded max-h-40 overflow-y-auto">
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setLatLong({
                            lat: parseFloat(s.lat),
                            lon: parseFloat(s.lon),
                          });
                          setQuery(s.display_name);
                          setSuggestions([]);
                        }}
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Pending Conflicts Section */}
            {!showLocationFields && pendingConflicts.length > 0 && (
              <div className="mt-4 p-3 border rounded bg-gray-50">
                <h3 className="font-semibold text-red-600 mb-2">
                  ⚠️ You also have other meetings at the same time that are
                  still pending:
                </h3>
                <ul className="space-y-2">
                  {pendingConflicts.map((meeting, idx) => (
                    <li
                      key={idx}
                      className="p-2 border rounded bg-white shadow-sm"
                    >
                      <div className="font-bold">{meeting.meeting.title}</div>
                      <div className="text-sm text-gray-600">
                        {formatDate(meeting.meeting.scheduledAt)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {meeting.status}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confirm Button (always visible) */}
            {showLocationFields && (
              <button
                onClick={handleAccepted}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Confirm
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationModel;
