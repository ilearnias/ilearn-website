"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgramsSection from "./components/ProgramsSection";
import QuestionsSection from "./components/QuestionsSection";
import HeroSection from "@/components/common/HeroSection";
import { Fade } from "react-awesome-reveal";

const PageContainer = () => {
  return (
    <>
      <Header />
      <div className="_banner-box1">
        <Fade direction="up" duration={900}>
          <div className="_banner-header-txt1">
            {/* <span style={{ color: "#dc2626" }}>About</span> Us */}
            Our Programs
          </div>
        </Fade>

        <Fade direction="up" duration={1000}>
          <div className="_banner-sub-header-txt1">
            {`Find Your Perfect Learning Path. Choose from our comprehensive range of programs tailored to different aspects of civil service examination preparation.`}
          </div>
        </Fade>
      </div>
      <main>
        <ProgramsSection />
        <QuestionsSection />
      </main>
    </>
  );
};

export default PageContainer;
