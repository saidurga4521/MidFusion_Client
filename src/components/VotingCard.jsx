import React, { use, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// import { toggleLikePlace } from "../services/meetings";
// import { suggestedPlaces } from "../../../Meet-in-the-middle-server/src/controllers/meeting.controller";
const VotingCard = ({ place, onLike, totalParticipants }) => {
  console.log({place})
  const totalVotes = totalParticipants;
  let likePercentage = 0 ? 0 : (place.likes / totalVotes) * 100;
  useEffect(() => {
    likePercentage = (place.likes / totalVotes) * 100;
  }, [place.likes]);
  // const handleLike = async (placeId) => {
  //   try {
  //     await toggleLikePlace(placeId);
  //     setLocations((prev) =>
  //       prev.map((loc) =>
  //         loc.id === placeId ? { ...loc, likes: loc.likes + 1 } : loc
  //       )
  //     );
  //   } catch (error) {
  //     console.log("Error Liking place", error);
  //   }
  // };
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center gap-3">
      {/* Image */}
      <img
        src={place.image}
        alt={place.title}
        className="w-full h-40 object-cover rounded-xl"
      />

      {/* Title */}
      <h2 className="text-lg font-semibold">{place.title}</h2>

      {/* Like / Dislike buttons */}
      <div className="flex gap-4 justify-end w-full ">
        <button onClick={() => onLike(place.id)} className="text-xl">
          {place.likes > 0 ? (
            <FaHeart className="text-2xl text-red-500" />
          ) : (
            <FaRegHeart className="text-2xl" />
          )}{" "}
          {place.likes}
        </button>
      </div>

      <div className="mt-2 w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
        <div
          className="h-3 bg-green-500 transition-all duration-500"
          style={{ width: `${likePercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VotingCard;
