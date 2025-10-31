import React from "react";
import { CiCalendar } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { MdOutlineLocationOn } from "react-icons/md";

const MeetingCard = ({ styleMaker, e }) => {
  return (
    <>
      <div className="w-full white:bg-slate-400 shadow-xs h-auto sm:h-24 rounded-lg border-2 flex flex-col sm:flex-row justify-between px-4 py-3 sm:py-0 items-start sm:items-center gap-3">
        {/* Left side */}
        <div className="flex gap-2 items-start sm:items-center w-full sm:w-auto">
          <div
            className={`${styleMaker(e)} bg-green-400 rounded-full w-4 h-4`}
          />
          <div className="text-sm sm:text-base">
            Team Strategy Meeting
            <div className="flex flex-wrap gap-2 sm:gap-5 mt-1">
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <CiCalendar /> 1/5/2004
              </span>
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <GoPeople /> 5 participants
              </span>
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <MdOutlineLocationOn /> Central Park Cafe
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          className={`${styleMaker(e)} bg-green-500 rounded-full text-xs sm:text-sm px-2 border-4 border-green-400 flex self-end sm:self-auto`}
        >
          {e}
        </div>
      </div>
    </>
  );
};

export default MeetingCard;
