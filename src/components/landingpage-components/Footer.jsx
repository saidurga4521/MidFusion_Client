import React from "react";
import locationimage from "../../assets/locationimage.png";
// src\assets\locationimage.png
const Footer = () => {
  return (
    <div className="flex flex-wrap items-center justify-between bg-indigo-600 px-6 md:px-40 py-2 gap-6">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <img src={locationimage} height={25} width={20} alt="logo" />
        <h1 className="text-xl md:text-2xl font-semibold">Meet in Middle</h1>
      </div>

      {/* Right section */}
      <h2 className="text-sm  text-white md:text-base">
        © {new Date().getFullYear()} Meet in Middle. All rights reserved.
      </h2>
    </div>
  );
};

export default Footer;
