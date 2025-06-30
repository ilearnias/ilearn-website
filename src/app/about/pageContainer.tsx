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
      <HeroSection title="About Us" pageName="About" />
      <ImageCarouselSection />
      <JourneySection />
      <CoreValuesSection />
      <TeamSection />
      <MediaSection />
      <BeginJourneySection />
      <Footer />
    </div>
  );
};

export default PageContainer;
