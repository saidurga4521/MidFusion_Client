import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaHourglassHalf,
  FaEdit,
  FaTrash,
  FaShareAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import getDuration from "../utils/getDuration";
import {
  deleteMeetingById,
  getFinalizedLocation,
  getMeetingById,
  getNearByPlaces,
  getSuggestedPlaces,
  populateSuggestedPlaces,
  // getNearByPlaces,
  rejectMeeting,
  toggleLikeDislikeBySuggestedPlaceId,
  updatemeetingDetails,
} from "../services/meetings";
import Modal from "../components/Modal";
import VotingCard from "../components/votingCard";
import VotingResults from "../components/VotingResults";
import VoteDistribution from "../components/VoteDistribution";
import MapContainer from "../components/MapContainer";
const ConfirmationModel = lazy(() => import("../components/ConfirmationModel"));
const LocationModel = lazy(() => import("../components/LocationModel"));
import { useNavigate } from "react-router-dom";

const MeetingsInfoPage = () => {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [meeting, setMeeting] = useState({});
  const [currentWindow, setcurrentWindow] = useState(0);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { id } = useParams();
  const { user } = useSelector((store) => store.authSlice);

  const [selectedCategory, setSelectedCategory] = useState("restaurants"); //category filte
  const [placesModalOpen, setPlacesModalOpen] = useState(false); //model
  const [selectedPlaces, setSelectedPlaces] = useState([]); //stote api results
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const dummyPlaces = {
    restaurants: ["Pizza Palace", "Spice Hub", "Burger Town", "Curry Corner"],
    bars: ["Cheers Bar", "Night Owl", "The Whiskey Jar"],
    hotels: ["Grand Palace", "Comfort Inn", "Ocean View Resort"],
  };
  const navigate=useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Edit modal
  const [isOpenMadal, setIsOpenMadal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryPlaces, setCategoryPlaces] = useState([]);
  // const categoryPlaces = {
  //   restaurants: [
  //     {
  //       id: 1,
  //       title: "Bryant Park Grills",
  //       image: "https://wallpapercave.com/wp/wp1874184.jpg",
  //     },
  //     {
  //       id: 2,
  //       title: "Central Park Picnic",
  //       image:
  //         "https://www.bing.com/th/id/OIP.ET_GDP6-6UtLgiNo3kpI8QHaE7?w=244&h=211",
  //     },

  //     {
  //       id: 3,
  //       title: "Rooftop Bar",
  //       image:
  //         "https://www.bing.com/th/id/OIP.LNcfkezrbzTJZUE1R5ibYQHaFj?w=236&h=211",
  //     },
  //   ],
  //   bars: [
  //     {
  //       id: 4,
  //       title: "Skyline Pub",
  //       image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846",
  //     },
  //     {
  //       id: 5,
  //       title: "Moonlight Bar",
  //       image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  //     },
  //   ],
  //   hotels: [
  //     {
  //       id: 6,
  //       title: "Grand Palace Hotel",
  //       image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  //     },
  //     {
  //       id: 7,
  //       title: "Ocean View Resort",
  //       image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2100d",
  //     },
  //   ],
  // };

  // Voting
  const [locations, setLocations] = useState([]);
  const [endVotingOpen, setEndVotingOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState(null);

  const handleLike = async (id) => {
    console.log({ id });
    await toggleLikeDislikeBySuggestedPlaceId(id);
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, likes: loc.likes ^ 1 } : loc
      )
    );
  };

  
  const ranked = [...locations].sort(
    (a, b) => b.likes - b.likes - (a.likes - a.likes)
  );

  const myParticipation = meeting?.participants?.find(
    (participant) => participant?.email === user?.email
  );

  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title || "");
      setDescription(meeting.description || "");
    }
  }, [meeting]);

  const handleDelete = () => {
    deleteMeetingById(meeting._id);
    setShowDeleteAlert(false);
    navigate("/home", { replace: true });
  };

  useEffect(() => {
    const fetchmeeting = async () => {
      const response = await getMeetingById(id);
      setMeeting(response.data.data.meeting);
    };
    fetchmeeting();
  }, [id]);

  const convertDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const convertTime = (date) =>
    date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const onClose = () => setIsOpenMadal(false);

  const updateMeeting = async () => {
    const response = await updatemeetingDetails(meeting?._id, {
      title,
      description,
    });
    if (response.data.success) toast.success(response.data.message);
    else toast.error(response.data.message);
  };

  const onCloseLocationModal = () => setIsOpen(false);

  const handleDecline = useCallback(async (id) => {
    try {
      const response = await rejectMeeting(id);
      const data = response.data;
      if (!data.success) throw new Error(data.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setShowDeclineModal(false);
  }, []);

  const handleSuggestedPlaces = async () => {
    try {
      const response = await getSuggestedPlaces(id);
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      const places = response.data.data.suggestedPlaces || [];
      if (places.length === 0) {
        toast.info("No Suggested Places Found");
        return;
      }
      console.log({ places });
      // format backend response into frontend format
      const formatted = places.map((p) => ({
        id: p._id, // map _id to id
        title: p.placeName || "Unnamed", // placeName → title
        image: p.images?.[0] || "https://wallpapercave.com/wp/wp1874184.jpg", // first image or fallback
        likes: p.voteCount || 0, // backend vote count
        dislikes: 0, // backend doesn’t give dislikes → set default
        lat: p.lat,
        lng: p.lng,
        address: p.address,
        rating: p.rating,
        voters: p.voters || [],
      }));

      setLocations(formatted);
      console.log("Suggested places (formatted):", formatted);
    } catch (error) {
      console.error("Error fetching suggested places", error);
      toast.error("Failed to fetch suggested places");
    }
  };

  const handleNearByPlaces = async () => {
    try {
      setLoadingPlaces(true);
      const response = await getNearByPlaces(meeting._id, [selectedCategory]);
      console.log(response, "res");
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      const places = response.data.data.places;
      if (!places || places.length === 0) {
        toast.info("No Suggested Places Found");
        setLocations([]);
        setPlacesModalOpen(true);
        return;
      }
      //setLocations(places);
      // categoryPlaces.restaurants = places;
      setCategoryPlaces(places);
      setPlacesModalOpen(true);
      console.log("Nearby places:", places);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoadingPlaces(false);
    }
  };
  const handlePopulatePlaces = async () => {
    try {
      const data = {
        places: selectedPlaces.map((ele) => {
          return {
            lat: ele.location.lat,
            lng: ele.location.lng,
            address: ele.address,
            placeName: ele.name,
            rating: ele.rating,
            images: ele.photos,
          };
        }),
      };
      const response = await populateSuggestedPlaces(meeting._id, data);
      // console.log(response, "populate");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error populating places:", error);
      toast.error("Failed to populate places");
    }
  };
  useEffect(() => {
    handleSuggestedPlaces();
  }, []);
  const handleFinalLocation = async (suggestedId) => {
    try {
      const data = {
        suggestedId,
      };
      const finalLocation = await getFinalizedLocation(meeting._id, data);

      toast.success(finalLocation.data.message);
    } catch (error) {
      console.error("Error populating places:", error);
      toast.error("Failed To Set Final Location");
    }
  };

  //deleted
  console.log("The meeting",meeting);
  return (
    <div className="p-6 bg-[#f4f6f9] min-h-screen relative">
      {/* Delete Confirmation */}
      {showDeleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              Do you really want to delete this meeting?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="px-5 py-2 bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
        {/* Info */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end">
            <span className="text-3xl font-bold text-white">
              {meeting.title}
            </span>
            <span className="rounded-2xl px-3 py-1 bg-yellow-400 text-gray-900 text-sm">
              Voting
            </span>
          </div>
          <p className="text-indigo-100 max-w-lg">{meeting.description}</p>

          <div className="flex flex-col gap-6 text-indigo-100 font-medium">
            <div className="flex flex-wrap  gap-2">
              <div className="flex items-center gap-2">
              <p>Starts On:</p>
              <FaCalendarAlt className="text-yellow-300" />
              <span>{convertDate(new Date(meeting.scheduledAt))}</span>
              </div>
              <div className="flex items-center gap-2">
              <FaClock className="text-pink-300" />
              <span>{convertTime(new Date(meeting.scheduledAt))}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
              <p>Ends On:</p>
              <FaCalendarAlt className="text-yellow-300" />
              <span>{convertDate(new Date(meeting.endsAt))}</span>
              </div>
              <div className="flex items-center gap-2">
              <FaClock className="text-pink-300" />
              <span>{convertTime(new Date(meeting.endsAt))}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <FaUsers className="text-green-300" />
              <span>{meeting?.participants?.length} participants</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 items-center">
          <button
            className="flex items-center gap-2 border border-green-300 text-green-100 px-3 py-2 rounded-md text-sm"
            onClick={() => {
              navigator.share({
                title: `Meeting Invite for ${meeting.title}`,
                text: "Join our meeting",
                url: meeting.meetingLink,
              });
            }}
          >
            <FaShareAlt className="text-base" /> Share
          </button>
          {user?.id === meeting?.creator?._id ? (
            <>
              <button
                onClick={() => setIsOpenMadal(true)}
                className="flex items-center gap-1 border border-blue-300 text-blue-100 px-2 py-1 rounded-md text-sm"
              >
                <FaEdit className="text-base" /> Edit
              </button>
              <button
                onClick={() => setShowDeleteAlert(true)}
                className="flex items-center gap-1 border border-red-300 text-red-100 px-2 py-1 rounded-md text-sm"
              >
                <FaTrash className="text-base" /> Cancel
              </button>
            </>
          ) : myParticipation?.status === "Pending" ? (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1 border border-green-300 text-blue-100 px-2 py-1 rounded-md text-sm"
              >
                Accept
              </button>
              <button
                onClick={() => setShowDeclineModal(true)}
                className="flex items-center gap-1 border border-red-300 text-red-100 px-2 py-1 rounded-md text-sm"
              >
                Reject
              </button>
            </>
          ) : (
            <button
              disabled
              className="flex cursor-not-allowed items-center gap-1 border border-blue-300 text-blue-100 px-2 py-1 rounded-md text-sm"
            >
              {myParticipation?.status}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="shadow bg-white rounded-2xl p-6">
        <div className="flex flex-wrap gap-4 border-b-2 border-gray-200 pb-3 mb-6 text-base sm:text-lg">
          <div
            onClick={() => setcurrentWindow(0)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentWindow === 0
                ? "text-indigo-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            <FaInfoCircle /> Overview
          </div>
          <div
            onClick={() => setcurrentWindow(1)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentWindow === 1
                ? "text-indigo-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            <FaUsers /> Participants
          </div>
          <div
            onClick={() => setcurrentWindow(2)}
            className={`cursor-pointer ${
              currentWindow === 2
                ? "text-indigo-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Voting
          </div>
          <div
            onClick={() => setcurrentWindow(3)}
            className={`cursor-pointer ${
              currentWindow === 3
                ? "text-indigo-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Map View
          </div>
        </div>

        {/* Content */}
        <div>
          {currentWindow === 0 && (
            <div className="px-4 text-gray-700">
              <p>
                Created by:{" "}
                <span className="font-medium">{meeting?.creator?.name}</span>
              </p>
              <p>
                Status:{" "}
                <span className="text-yellow-600 font-semibold">Voting</span>
              </p>
              <p>
                Duration:{" "}
                <span className="font-medium">
                  {getDuration(meeting.endsAt, meeting.scheduledAt)}
                </span>
              </p>
            </div>
          )}

          {currentWindow === 1 && (
            <div>
              <p className="text-gray-700 mb-4 font-bold text-lg">
                Participants ({meeting?.participants?.length})
              </p>
              <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto pr-2">
                {meeting.participants?.map((participant, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border rounded-2xl p-4 bg-indigo-50 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-lg w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold">
                        {participant?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-gray-800 text-lg font-medium">
                          {participant.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {participant.email}
                        </p>
                      </div>
                    </div>
                    {participant.status === "Accepted" ? (
                      <div className="text-green-600 font-semibold flex flex-col items-end">
                        <p>Location provided</p>
                        <div className="flex items-center gap-1 text-green-500">
                          <FaCheckCircle /> Confirmed
                        </div>
                      </div>
                    ) : participant.status === "Pending" ? (
                      <div className="text-yellow-600 font-semibold flex flex-col items-end">
                        <p>Location pending</p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaHourglassHalf /> Pending
                        </div>
                      </div>
                    ) : (
                      <div className="text-red-600 font-semibold flex flex-col items-end">
                        <p>Location not provided</p>
                        <div className="flex items-center gap-1 text-red-500">
                          <FaCircleXmark /> Rejected
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentWindow === 2 && (
            <div>
              {/* Heading + End Voting Button */}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Vote for a Place</h1>
                {meeting?.creator?.email === user.email && (
                  <button
                    onClick={() => setEndVotingOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    End Voting
                  </button>
                )}
              </div>

              {/* First row: 3 places */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {locations.length === 0 ? (
                  <div className="text-center text-xl font-bold">
                    NO SUGGESTED PLACES
                  </div>
                ) : (
                  locations.map((place) => (
                    <VotingCard
                      key={place.id}
                      place={place}
                      onLike={handleLike}
                      totalParticipants={meeting?.participants?.length || 1}
                    />
                  ))
                )}
              </div>

              {/* Second row: 2 places + Voting Results
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.slice(3, 5).map((place) => (
                  <VotingCard
                    key={place.id}
                    place={place}
                    onLike={handleLike}
                    totalParticipants={meeting?.participants?.length || 1}
                  />
                ))}
              </div> */}
              <div className="bg-white shadow-lg rounded-2xl p-4">
                <VotingResults locations={locations} />
              </div>

              {/* End Voting Modal */}
              {endVotingOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                    <h2 className="text-xl font-bold mb-4">
                      As per the voting
                    </h2>
                    <p className="mb-4 text-gray-600">
                      Select one of the ranked places for final confirmation:
                    </p>
                    <ul className="space-y-3">
                      {ranked.map((place, index) => (
                        <li
                          key={place.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            id={`place-${place.id}`}
                            name="selectedPlace"
                            value={place.id}
                            checked={selectPlace === place.id}
                            onChange={() => setSelectPlace(place.id)}
                          />
                          <label
                            htmlFor={`place-${place.id}`}
                            className="flex-1"
                          >
                            {index + 1}. {place.title}
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setEndVotingOpen(false)}
                        className="px-4 py-2 bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!selectPlace}
                        onClick={async () => {
                          console.log("Final confirmed place:", selectPlace);
                          await handleFinalLocation(selectPlace);
                          setEndVotingOpen(false);
                        }}
                        className={`px-4 py-2 text-white rounded ${
                          selectPlace
                            ? "bg-blue-500"
                            : "bg-blue-300 cursor-not-allowed"
                        }`}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Places Modal */}
          {/* Places Modal */}
          {currentWindow === 3 && (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">Map View</h2>

                {/* Dropdown + Button aligned right */}
                {user?.id === meeting?.creator?._id && (
                  <div className="flex items-center gap-4">
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-40 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="restaurants">Restaurants</option>
                      <option value="bars">Bars</option>
                      <option value="hotels">Hotels</option>
                    </select>
                    <button
                      onClick={() => {
                        handleNearByPlaces(); // fetch places
                        setPlacesModalOpen(true); // open modal
                      }}
                      className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                      disabled={loadingPlaces}
                    >
                      {loadingPlaces ? (
                        <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                      ) : null}
                      View Places
                    </button>
                  </div>
                )}
              </div>
              <MapContainer meeting={meeting}/>
              {/* Modal for selecting places */}
              {placesModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">
                      {selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)}
                    </h2>

                    <ul className="space-y-4">
                      {categoryPlaces.length > 0 ? (
                        categoryPlaces.map((place) => (
                          <li
                            key={place.placeId}
                            className="flex items-center gap-4 p-2 border-b cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              if (
                                selectedPlaces.some(
                                  (item) => item.placeId === place.placeId
                                )
                              ) {
                                setSelectedPlaces(
                                  selectedPlaces.filter(
                                    (ele) => ele.placeId !== place.placeId
                                  )
                                );
                              } else {
                                setSelectedPlaces([...selectedPlaces, place]);
                              }
                            }}
                          >
                            {/* Checkbox */}
                            <input
                              type="checkbox"
                              id={`modal-place-${place.placeId}`}
                              value={place.placeId}
                              checked={selectedPlaces.some(
                                (item) => item.placeId === place.placeId
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPlaces([...selectedPlaces, place]);
                                } else {
                                  setSelectedPlaces(
                                    selectedPlaces.filter(
                                      (ele) => ele.placeId !== place.placeId
                                    )
                                  );
                                }
                              }}
                            />

                            {/* Image */}
                            <img
                              src={
                                place.photos?.[0] ||
                                "https://via.placeholder.com/64"
                              }
                              alt={place.name}
                              className="w-16 h-16 object-cover rounded"
                            />

                            {/* Details */}
                            <div className="flex-1">
                              <label
                                htmlFor={`modal-place-${place.placeId}`}
                                className="block font-semibold text-gray-800"
                              >
                                {place.name || "Unnamed Place"}
                              </label>
                              <p className="text-sm text-gray-600">
                                {place.address || "No address available"}
                              </p>
                              <p className="text-sm text-yellow-600">
                                ⭐ {place.rating ?? "N/A"} (
                                {place.userRatingsTotal ?? 0} reviews)
                              </p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No places found</p>
                      )}
                    </ul>

                    {/* Footer buttons */}
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setPlacesModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          console.log("Selected places:", selectedPlaces);
                          await handlePopulatePlaces();
                          await handleSuggestedPlaces();
                          setPlacesModalOpen(false);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LocationModel
        isOpen={isOpen}
        onClose={onCloseLocationModal}
        invite={{ ...meeting, id: meeting._id }}
      />
      <ConfirmationModel
        idx={meeting._id}
        handleDecline={handleDecline}
        showDeclineModal={showDeclineModal}
        setShowDeclineModal={setShowDeclineModal}
      />
      <Modal open={isOpenMadal} onClose={onClose} save={updateMeeting}>
        <div>
          <label className="block text-sm font-medium mb-2">
            Meeting Title *
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter meeting title"
            className="w-full border rounded-lg px-4 py-3 mb-4"
          />
          <label className="block text-sm font-medium mb-2">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </Modal>
    </div>
  );
};

export default MeetingsInfoPage;
