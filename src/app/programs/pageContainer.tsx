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
      <HeroSection title="Our Programs" pageName="Programs" />
      <main>
        <ProgramsSection />
        <QuestionsSection />
      </main>
      <Footer />
    </>
  );
};

export default PageContainer;
