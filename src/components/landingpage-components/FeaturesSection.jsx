import React from "react";
import { motion } from "framer-motion";
import { RiUserLocationFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { MdMobileFriendly } from "react-icons/md";
import { BsLightning } from "react-icons/bs";

const FeaturesSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <RiUserLocationFill className="text-4xl text-indigo-600" />,
      heading: "Smart Location Finding",
      description:
        "our algorithm finds the perfect meeting spot equidistant from all participants",
    },
    {
      icon: <BsFillPeopleFill className="text-4xl text-indigo-600" />,
      heading: "Easy Collaboration",
      description:
        "Invite participants, share locations and vote on the best meeting places",
    },
    {
      icon: <MdOutlineAccessTime className="text-4xl text-indigo-600" />,
      heading: "Real Time Updates",
      description:
        "Get instant notifications about meeting changes and participant responses",
    },
    {
      icon: <GoGlobe className="text-4xl text-indigo-600" />,
      heading: "Global Coverage",
      description:
        "Works anywhere in the world with comprehensive location data",
    },
    {
      icon: <MdMobileFriendly className="text-4xl text-indigo-600" />,
      heading: "Mobile optimized",
      description: "Perfect experience on any device, from desktop to mobile",
    },
    {
      icon: <BsLightning className="text-4xl text-indigo-600" />,
      heading: "Lightning Fast",
      description: "Quick setup,instant results and seamless user experience",
    },
  ];
  return (
    <div className="py-12 px-6 bg-gray-50">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Why Choose Meet in Middle</h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Everything you need to organize perfect meetings with optimal
          locations for everyone.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 },
            }}
            className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
          >
            <motion.div className="mb-4 p-4  rounded-full">
              {item.icon}
            </motion.div>
            <h2 className="text-xl font-semibold mb-2">{item.heading}</h2>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
