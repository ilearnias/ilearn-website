import React from "react";
import IgniteHeroSection from "./components/Herosection";
import AboutSection from "./components/AboutSection";
import WhyJoinSection from "./components/WhyJoinSection";
import ProgramHighlights from "./components/ProgramHighlights";
import LearningOutcomes from "./components/LearningOutcomes";
import EnrollmentSection from "./components/EnrollmentSection";
import CommunitySection from "./components/CommunitySection";

const Ignite = () => {
  return <div>
    <IgniteHeroSection />
    <AboutSection />
    <WhyJoinSection />
    <ProgramHighlights />
    <LearningOutcomes />
    <EnrollmentSection />
    <CommunitySection />
  </div>;
};

export default Ignite;
