import React, { useRef, useState } from "react";

const AdminAddress = ({ meetingData, setMeetingData, errors, setErrors }) => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);
  const handleChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (value.length > 2) {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
        );
        const data = await response.json();
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    }, 500);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const locationName = data?.display_name;

        setAddress(locationName);
        setMeetingData((prev) => ({
          ...prev,
          adminAddress: {
            ...prev.adminAddress,
            coords: [parseFloat(latitude), parseFloat(longitude)],
            address: locationName,
          },
        }));
      });
      setErrors({ message: "" });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={getCurrentLocation}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Use My Location
        </button>
      </div>

      <div className="relative">
        <input
          onChange={handleChange}
          value={address}
          placeholder="Enter your address manually"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                onClick={() => {
                  setAddress(s.display_name);
                  setMeetingData((prev) => ({
                    ...prev,
                    adminAddress: {
                      coords: [parseFloat(s.lat), parseFloat(s.lon)],
                      address: s.display_name,
                    },
                  }));
                  setErrors({ message: "" });
                  setSuggestions([]);
                }}
              >
                {s.display_name}
              </li>
            ))}
          </ul>
        )}
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>
    </div>
  );
};

export default AdminAddress;
