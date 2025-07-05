"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";

export default function FoundationProgram() {
  const buttons = (
    <div className="flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Join Foundation Course
      </button>
      <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
        Learn More
      </button>
    </div>
  );

  return (
    <div className="program-page">
      <Header />
      <HeroSection
        className="font-bold"
        titleClassName="font-bold"
        title="Foundation Course"
        description="Build a strong foundation for your UPSC preparation journey"
        buttons={buttons}
      />
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Data Available
        </h2>
        <p className="text-gray-600 text-center mb-8">
          The program details are currently being updated. Please check back
          later or contact us for more information.
        </p>
        <a
          href="/contact"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
