"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import "./styles.scss";

// Import section components
import HomeSection from "./components/HomeSection";
import ResultsSection from "./components/ResultsSection";
import AchieversSection from "./components/AchieversSection";
import MediaSection from "./components/MediaSection";
import TestimonialsSection, {
  TestimonialItem,
} from "./components/TestimonialsSection";
import SuccessStoriesSection from "./components/SuccessStoriesSection";
import ProgramsSection from "./components/ProgramsSection";
import ApplySection from "./components/ApplySection";

const testimonialData: TestimonialItem[] = [
  {
    id: "1",
    description: "Preparation Strategy - Learn from our top students",
    video: "wMTD8maO6U4",
    isActive: true,
    isTestimonial: true,
    order: 1
  },
  {
    id: "2",
    description: "Malavika G Nair - AIR 45 Success Story",
    video: "wMTD8maO6U4",
    isActive: true,
    isTestimonial: true,
    order: 2
  },
  {
    id: "3",
    description: "Success Journey - Path to achievement",
    video: "wMTD8maO6U4",
    isActive: true,
    isTestimonial: true,
    order: 3
  }
];

export default function PageContainer() {
  return (
    <div className="Home-Container overflow-x-hidden">
      {/* 1. Home Section */}
      <section id="home" className="section-home">
        <HomeSection />
      </section>

      {/* 2. Result Highlights Section */}
      <section id="results">
        <ResultsSection />
      </section>

      {/* 3. Achievers Section */}
      <section id="achievers">
        <AchieversSection />
      </section>

      {/* 4. Media Section */}
      <section id="media">
        <MediaSection />
      </section>

      {/* 5. Student Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* 6. Success Stories Section */}
      <section id="success-stories">
        <SuccessStoriesSection />
      </section>

      {/* 7. Our Programs Section */}
      <section id="programs">
        <ProgramsSection />
      </section>

      {/* 8. Apply Section */}
      <section id="apply">
        <ApplySection />
      </section>
    </div>
  );
}
