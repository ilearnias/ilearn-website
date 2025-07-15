"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WhyJoinSection from "./components/WhyJoinSection";
import ProgramHighlights from "./components/ProgramHighlights";

const Junior = () => {
  const buttons = (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold">
        Join
      </button>
      <button className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors text-base sm:text-lg font-semibold border-2 border-blue-600">
        Learn More
      </button>
    </div>
  );

  return (
    <div className="program-page">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyJoinSection />
        <ProgramHighlights />
      </main>
      <Footer />
    </div>
  );
};

export default Junior;
