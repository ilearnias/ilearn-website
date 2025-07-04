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
        title="Foundation Course"
        description="Build a strong foundation for your UPSC preparation journey"
        buttons={buttons}
      />
      {/* Additional sections will be added here based on the details you provide */}
      <Footer />
    </div>
  );
} 