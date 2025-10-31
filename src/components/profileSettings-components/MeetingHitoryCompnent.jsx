import React, { useCallback, useState } from "react";
import MeetingCard from "./MeetingCard";

const MeetingHitoryCompnent = () => {
  const [typeofMeeting, setTypeofMetting] = useState([
    "complete",
    "upcomming",
    "pending",
    "rejected",
    "complete",
    "upcomming",
    "pending",
    "rejected",
    "complete",
    "upcomming",
    "pending",
    "rejected",
  ]);

  const styleMaker = useCallback((str) => {
    switch (str) {
      case "complete":
        return "bg-green-400 border- green-200";
      case "upcomming":
        return "bg-sky-400 border-sky-200";
      case "pending":
        return "bg-orange-400 border-orange-200";
      case "rejected":
        return "bg-rose-400 border-rose-200 ";
    }
  }, []);
  return (
    <div className="">
      <div className="text-3xl mb-4">Recent Meetings</div>
      <div
        style={{ scrollbarWidth: "none" }}
        className="rounded-2xl h-[50vh] border-2 overflow-scroll p-5 grid grid-cols-1 gap-4"
      >
        {typeofMeeting.map((e, i) => (
          <MeetingCard key={i} styleMaker={styleMaker} e={e} />
        ))}
      </div>
    </div>
  );
};

export default MeetingHitoryCompnent;
