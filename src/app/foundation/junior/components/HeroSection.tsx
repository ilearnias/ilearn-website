"use client";

import React from 'react';
import HeroSection from '@/components/common/HeroSection';

const JuniorHeroSection = () => {
  const buttons = (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold">
        Enroll in Junior Program
      </button>
      <button className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors text-base sm:text-lg font-semibold border-2 border-blue-600">
        Get More Info
      </button>
    </div>
  );

  return (
    <HeroSection
      title="iLearn IAS Junior"
      titleClassName="font-bold"
      description="Building a strong foundation for future UPSC aspirants"
      buttons={buttons}
    />
  );
};

export default JuniorHeroSection; 