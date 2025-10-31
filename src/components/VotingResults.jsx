import React from "react";
import "../winner.css";

const VotingResults = ({ locations }) => {
  if (!locations || locations.length === 0) return null;

  // Find the place with max likes
  const maxLikes = Math.max(...locations.map((place) => place.likes));

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Voting Results</h2>
      <div className="space-y-4">
        {locations.map((place, i) => {
          const isWinner = place.likes === maxLikes && maxLikes > 0;

          return (
            <div
              key={place.id}
              className={`p-4 rounded-lg border ${
                isWinner ? "winner-card" : "bg-gray-50"
              } ${i === 0 && "winnerr"}`}  //remove extra r to apply css
            >
              <p className="text-lg font-semibold">{place.title}</p>
              <p className="text-gray-600">👍 {place.likes}</p>
              {isWinner && (
                <p className="text-green-600 font-bold mt-1">🏆 Winner!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VotingResults;
