"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import JourneySection from "./components/JourneySection";
import CoreValuesSection from "./components/CoreValuesSection";
import TeamSection from "./components/TeamSection";
import MediaSection from "../home/components/MediaSection";
import BeginJourneySection from "./components/BeginJourneySection";
import ImageCarouselSection from "./components/ImageCarouselSection";

const PageContainer = () => {
  return (
    <div className="about-Container">
      <Header />
      <HeroSection
        className="font-bold"
        titleClassName="font-bold mb-3"
        title="About Us"
        pageName="About"
        description="Discover the story behind iLearn's journey in shaping civil service aspirants. We're committed to excellence, innovation, and your success in the UPSC examination."
      />
      <ImageCarouselSection />
      <JourneySection />
      <CoreValuesSection />
      <TeamSection />
      <MediaSection />
      <BeginJourneySection />
    </div>
  );
};

export default PageContainer;
