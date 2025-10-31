import React, { useState } from "react";
import locationimage from "../../assets/locationimage.png";
import { Menu, X } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigator = useNavigate();

  return (
    <div className="min-h-[90vh] flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex gap-2 items-center">
          <img src={locationimage} height={30} width={40} alt="logo" />
          <h1 className="font-semibold text-xl sm:text-2xl">Meet In Middle</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            className="text-gray-700 cursor-pointer hover:text-indigo-600 font-medium"
            onClick={() => navigator("/login")}
          >
            Sign In
          </button>
          <button
            className="bg-indigo-600 cursor-pointer hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
            onClick={() => navigator("/home")}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-4 sm:hidden w-full">
          <button
            className="w-full text-gray-700 hover:text-[#FF4C61] font-medium border border-gray-300 py-2 rounded-lg transition"
            onClick={() => navigator("/login")}
          >
            Sign In
          </button>
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
            onClick={() => navigator("/home")}
          >
            Get Started
          </button>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex flex-col justify-center items-center text-center flex-1 px-4">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800"
        >
          Find The Perfect
        </motion.h1>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-indigo-600"
        >
          Meeting Location
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl mt-3 max-w-3xl text-gray-700"
        >
          Meet in Middle helps you find the ideal location equidistant from all
          participants. No more complicated discussions about where to meet.
        </motion.h2>
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.6,
          }}
          whileHover={{ scale: 1.05 }}
          className="mt-6 bg-indigo-600 cursor-pointer hover:bg-indigo-500 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-md transition"
          onClick={() => navigator("/home")}
        >
          Start Meeting Plan
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
