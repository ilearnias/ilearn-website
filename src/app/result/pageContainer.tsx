"use client";

import Header from "@/components/header";
import ResultSection from "./components/ResultSection";
import ResultSummary from "./components/ResultSummary";
import TopAchievers from "./components/TopAchievers";
import { Fade } from "react-awesome-reveal";

const PageContainer = () => {
  return (
    <div className="results-container">
      <Header />
      <div className="_banner-box1">
        <Fade direction="up" duration={900}>
          <div className="_banner-header-txt1">
            {/* <span style={{ color: "#dc2626" }}>About</span> Us */}
            Results
          </div>
        </Fade>

        <Fade direction="up" duration={1000}>
          <div className="_banner-sub-header-txt1">
            {`Celebrating excellence and achievement. Explore our track record of success stories and be inspired by 
            the remarkable achievements of our students in civil service examinations.`}
          </div>
        </Fade>
      </div>

      <ResultSection />
      <ResultSummary />
      <TopAchievers />
    </div>
  );
};

export default PageContainer;
