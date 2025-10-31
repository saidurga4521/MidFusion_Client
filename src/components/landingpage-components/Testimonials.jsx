import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      designation: "Product Manager",
      review:
        "This tool saved us hours of planning and made our meetings stress-free!",
      rating: 5,
    },
    {
      name: "Sarah Smith",
      designation: "Team Lead",
      review: "Super easy to use and very accurate in finding meeting points.",
      rating: 4,
    },
    {
      name: "Michael Brown",
      designation: "Software Engineer",
      review: "The design is intuitive and the algorithm is spot on!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      designation: "Marketing Specialist",
      review: "Helped our remote team meet halfway without endless debates.",
      rating: 4,
    },
    {
      name: "David Wilson",
      designation: "Business Analyst",
      review: "Fast, reliable, and easy to share with the team.",
      rating: 5,
    },
  ];

  const [index, setIndex] = useState(0);
  const visibleCount = 3;

  const handlePrev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setIndex((prev) =>
      prev + 1 > testimonials.length - visibleCount ? 0 : prev + 1
    );
  };

  return (
    <div className="py-16 px-6 bg-gray-50">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold">What Our Users Say</h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Hear from people who have used Meet in Middle to simplify their
          meetings.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute cursor-pointer left-0 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100 z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-x-6"
            animate={{ x: `-${index * (100 / visibleCount)}%` }}
            transition={{ duration: 0.5 }}
            style={{ width: `${(testimonials.length / visibleCount) * 100}%` }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
                style={{ width: `${100 / visibleCount}%` }}
              >
                {/* Rating */}
                <div className="flex text-yellow-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-600 mb-6 italic">"{t.review}"</p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.designation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100 z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
