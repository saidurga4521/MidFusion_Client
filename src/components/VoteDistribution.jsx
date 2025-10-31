import React from "react";

const VoteDistribution = ({ locations }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Vote Distribution</h2>
      <div className="space-y-4">
        {locations.map((place) => {
          const totalVotes = place.likes + place.dislikes;
          const likesPercentage =
            totalVotes === 0 ? 0 : (place.likes / totalVotes) * 100;
          // const dislikesPercentage =
          //   totalVotes === 0 ? 0 : (place.dislikes / totalVotes) * 100;

          return (
            <div key={place.id}>
              <p className="font-medium mb-1">{place.title}</p>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden flex">
                <div
                  className="bg-green-500 h-6 transition-all duration-500"
                  style={{ width: `${likesPercentage}%` }}
                ></div>
                {/* <div
                  className="bg-red-500 h-6 transition-all duration-500"
                  style={{ width: `${dislikesPercentage}%` }}
                ></div> */}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                👍 {place.likes} | ({totalVotes} votes)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoteDistribution;
