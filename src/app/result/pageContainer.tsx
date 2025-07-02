"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ResultSection from "./components/ResultSection";
import ResultSummary from "./components/ResultSummary";
import TopAchievers from "./components/TopAchievers";
import HeroSection from "@/components/common/HeroSection";

const PageContainer = () => {
  return (
    <div className="results-container">
      <Header />
      <HeroSection title="Our Results" pageName="Results" />
      <ResultSection />
      <ResultSummary />
      <TopAchievers />

    </div>
  );
};

export default PageContainer;
