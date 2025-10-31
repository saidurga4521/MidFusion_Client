import React from "react";
import { motion } from "framer-motion";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuTarget } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Howitworks = () => {
  const steps = [
    {
      icon: <FaRegCalendarAlt />,
      step: "1",
      title: "Enter Your Locations",
      description:
        "Simply add your location and your friends' locations into our tool.",
    },
    {
      icon: <LuTarget />,
      step: "2",
      title: "Find the Middle Point",
      description:
        "We calculate the perfect meeting spot that is fair for everyone.",
    },
    {
      icon: <FaRegCheckCircle />,
      step: "3",
      title: "Meet & Enjoy",
      description:
        "Head to the suggested location and have a great time together.",
    },
  ];
  return (
    <div className="py-16 px-6 bg-white">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold">How It Works</h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Just three easy steps to find the perfect meeting location.
        </p>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border hover:shadow-lg transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Step Number */}
            <div className="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white rounded-full text-xl font-bold mb-4">
              {item.icon}
            </div>
            <h2 className="text-lg font-semibold">{item.step}</h2>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
      {/* {card Section} */}

      <div className=" max-w-5xl mx-auto bg-indigo-600 text-white rounded-2xl p-8 md:p-12 flex flex-col items-center text-center shadow-lg mt-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Ready To Start Planning Better Meetings?
        </h1>
        <h3 className="text-base md:text-lg mb-6">
          Join thousands of teams who have simplified their meeting coordination
        </h3>
        <button className="flex items-center gap-2 bg-white cursor-pointer text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
          Get Started Free <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Howitworks;
