"use client";

import "./styles.scss";
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
