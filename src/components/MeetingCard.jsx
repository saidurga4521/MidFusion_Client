import { useEffect, useState, useRef, useCallback } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";
import { IoMdGrid, IoMdTime } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";
import { getMymeetings } from "../services/meetings";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import getDuration from "../utils/getDuration";
import { setMeetings } from "../toolkit/authenticationSlice";

export default function MeetingList() {
  const { user } = useSelector((store) => store.authSlice);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isGrid, setIsGrid] = useState(false);
  const [myMeetings, setMyMeetings] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageNo, setPageNo] = useState(1);
  const items = 10;
  const [hasCompleted, setHasCompleted] = useState(false);

  const mainElement = useRef(null);
  const isFetching = useRef(false);

  const statusColors = {
    Accepted: "bg-green-100 text-green-800 border-2 border-green-300",
    Pending: "bg-yellow-100 text-yellow-800 border-2 border-yellow-300",
    Rejected: "bg-blue-100 text-blue-800 border-2 border-blue-300",
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

      const handleGetMyMeetings=useCallback(async () => {
        if (hasCompleted || isFetching.current) return;
    isFetching.current = true;

    try {
      const res = await getMymeetings({ pageNo, items });

      if (!res.data.data.meetings.length) {
        setHasCompleted(true);
        return;
      }

      setMyMeetings((prev) => [
        ...prev,
        ...res.data.data.meetings.map((participation) => {
          const createdDate = new Date(participation?.meeting?.scheduledAt);
          const duration = getDuration(
            participation?.meeting?.endsAt,
            createdDate
          );

          const date = createdDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const time = createdDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const people = (participation?.meeting?.participants || [])
            .map((ele) => ele?.name)
            .filter(Boolean);

          return {
            _id: participation?.meeting?._id,
            title: participation?.meeting?.title,
            description: participation?.meeting?.description,
            date,
            time,
            duration,
            Place:
              participation?.meeting?.locationSuggestion?.placeName ||
              "Pending",
            people,
            status: participation?.status,
          };
        }),
      ]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Fetch");
    } finally {
      isFetching.current = false;
    }
      },[hasCompleted,pageNo])


  useEffect(() => {
    if (user?.id) {
      handleGetMyMeetings();
    }
  }, [user?.id, pageNo, handleGetMyMeetings]);

  useEffect(() => {
    dispatch(setMeetings(myMeetings));
  }, [myMeetings, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        mainElement.current &&
        mainElement.current.scrollTop + mainElement.current.clientHeight >=
          mainElement.current.scrollHeight - 50
      ) {
        setPageNo((prev) => prev + 1);
      }
    };

    const el = mainElement.current;
    el?.addEventListener("scroll", handleScroll);

    return () => {
      el?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredMeetings = myMeetings.filter((meeting) => {
    const matchesSearch = meeting?.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || meeting.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <div className="p-5 bg-white border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">My meetings</h1>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[180px]">
            <CiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border pl-8 pr-2 py-1 rounded focus:outline-none text-sm sm:text-base"
            />
          </div>

          <div className="relative flex-1 min-w-[140px] sm:flex-none">
            <CiFilter className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border pl-8 pr-2 py-1 rounded appearance-none focus:outline-none text-sm sm:text-base"
            >
              <option value="All">Filter</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <IoMdGrid
            className={`cursor-pointer hidden md:block ${
              isGrid ? "text-blue-500" : ""
            }`}
            size={24}
            onClick={() => setIsGrid(true)}
          />
          <TfiMenuAlt
            className={`cursor-pointer hidden md:block ${
              !isGrid ? "text-blue-500" : ""
            }`}
            size={24}
            onClick={() => setIsGrid(false)}
          />
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5" ref={mainElement}>
        <div
          className={`grid gap-4 ${isGrid ? "md:grid-cols-2" : "grid-cols-1"}`}
        >
          {filteredMeetings.map((meeting, idx) => {
            const visiblePeople = meeting.people.slice(0, 3);
            const remainingCount = meeting.people.length - 3;

            return (
              <div
                key={idx}
                className="relative bg-white rounded-lg shadow-md p-5 flex flex-col gap-3 border border-gray-200"
              >
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold rounded-full ${
                    statusColors[meeting.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {meeting.status
                    ? meeting.status[0].toUpperCase() + meeting.status.slice(1)
                    : "Pending"}
                </span>

                <div>
                  <h2 className="text-lg font-bold">{meeting.title}</h2>
                  <p className="text-gray-600 text-sm">{meeting.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-500" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoMdTime className="text-gray-500" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-gray-500" />
                    <span>{meeting.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span>{meeting.Place}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaUserFriends className="text-gray-500" />
                  <div className="flex items-center">
                    {visiblePeople.map((person, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white -ml-2 first:ml-0"
                      >
                        {getInitials(person)}
                      </div>
                    ))}
                    {remainingCount > 0 && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold border-2 border-white -ml-2">
                        +{remainingCount}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    className="text-blue-600 hover:underline font-medium text-sm"
                    onClick={() =>
                      navigate(`/meeting/${meeting?._id}`, replace)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {hasCompleted && (
          <p className="text-center text-gray-500 mt-4">No more meetings</p>
        )}
      </div>
    </div>
  );
}
