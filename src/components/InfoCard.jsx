import React from "react";
import { motion } from "framer-motion";

const InfoCard = ({ updates }) => {
  return (
    <div>
      {/* {card components} */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        {updates.map((elem, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 },
            }}
            style={{ backgroundColor: elem.color }}
            className={` p-4 rounded-lg shadow-md flex items-center justify-between`}
          >
            {/* Left section - title and number inline */}
            <div className="flex flex-col items-center gap-2 text-white">
              <h3 className="text-lg font-bold">{elem.title}</h3>
              <p className="text-xl font-extrabold">{elem.number}</p>
            </div>

            {/* Right section - icon */}
            <div className="text-2xl text-white">{elem.icon}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
