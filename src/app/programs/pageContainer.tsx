"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgramsSection from "./components/ProgramsSection";
import QuestionsSection from "./components/QuestionsSection";
import HeroSection from "@/components/common/HeroSection";

const PageContainer = () => {
  return (
    <>
      <Header />
      <HeroSection
        title="Our Programs"
        titleClassName="font-bold"
        className="font-bold"
        pageName="Programs"
        description="Find Your Perfect Learning Path. Choose from our comprehensive range of programs tailored to different aspects of civil service examination preparation."
      />
      <main>
        <ProgramsSection />
        <QuestionsSection />
      </main>
    </>
  );
};

export default PageContainer;
