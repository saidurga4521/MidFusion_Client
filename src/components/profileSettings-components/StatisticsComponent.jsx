import React from "react";
import InfoCard from "../InfoCard";
import { FaRegCheckCircle, FaRegStar, FaUsers } from "react-icons/fa";

const StatisticsComponent = () => {
  const updates1 = [
    {
      title: "Total Meetings",
      number: 5,
      icon: <FaRegStar />,
      color: "#f70505",
    },
    {
      title: "Avg Participants",
      number: 5,
      icon: <FaUsers />,
      color: "#a063eb",
    },
    {
      title: "Success Rate",
      number: 5,
      icon: <FaRegCheckCircle />,
      color: "#ff7700",
    },
  ];
  return (
    <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 ">
        Your Statistics
      </h2>
      {/* <div className="flex flex-wrap gap-10 justify-between items-center text-gray-400">
        <div className="rounded-[5px] bg-blue-900 p-6 w-28 md:w-32 text-center shadow ">vis</div>
        <div className="rounded-[5px] bg-green-800 p-6 w-28 md:w-32 text-center shadow">cici</div>
        <div className="rounded-[5px] bg-purple-900 p-6 w-28 md:w-32 text-center shadow">coc</div>
        <div className="rounded-[5px] bg-amber-700 p-6 w-29 md:w-32 text-center shadow">ksk</div>
      </div> */}
      <InfoCard updates={updates1} />
    </div>
  );
};

export default StatisticsComponent;
