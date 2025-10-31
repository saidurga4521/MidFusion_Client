import React from "react";
import HeroSection from "../components/landingpage-components/HeroSection";
import FeaturesSection from "../components/landingpage-components/FeaturesSection";
import Howitworks from "../components/landingpage-components/Howitworks";
import Testimonials from "../components/landingpage-components/Testimonials";
import Footer from "../components/landingpage-components/Footer";

const Landingpage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Howitworks />
      <Testimonials />
      <Footer />
      
    </>
  );
};

export default Landingpage;
