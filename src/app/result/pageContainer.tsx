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
      <HeroSection
        className="font-bold"
        title="Our Results"
        titleClassName="font-bold"
        pageName="Results"
        description="Celebrating excellence and achievement. Explore our track record of success stories and be inspired by the remarkable achievements of our students in civil service examinations."
      />
      <ResultSection />
      <ResultSummary />
      <TopAchievers />
    </div>
  );
};

export default PageContainer;
