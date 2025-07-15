"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import AppHeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import {
  FaChalkboardTeacher,
  FaChartLine,
  FaBookOpen,
  FaClipboardCheck,
} from "react-icons/fa";

import ReviewsSection from "./components/ReviewsSection";
import DownloadSection from "./components/DownloadSection";
import FAQSection from "./components/FAQSection";
import ScreenshotsSection from "./components/ScreenshotsSection";

const AppFeatures = [
  {
    title: "Interactive Learning",
    description: "Engage with interactive content and quizzes",
    icon: FaChalkboardTeacher,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your study progress and performance",
    icon: FaChartLine,
  },
  {
    title: "Study Materials",
    description: "Access comprehensive study materials anytime",
    icon: FaBookOpen,
  },
  {
    title: "Mock Tests",
    description: "Practice with realistic mock tests",
    icon: FaClipboardCheck,
  },
];

const UserReviews = [
  {
    name: "Rahul K",
    rating: 5,
    review:
      "The best app for civil service preparation! The study materials are regularly updated, make it effortless.",
  },
  {
    name: "Anjali S",
    rating: 4,
    review:
      "Great content and user interface. Very helpful for maintaining regular study patterns.",
  },
  {
    name: "Vidya R",
    rating: 5,
    review:
      "Being able to access all study materials on the go is a real game-changer. The performance tracking really helps.",
  },
];

const FAQs = [
  {
    question: "Is the app free to download?",
    answer:
      "Yes, the app is free to download. However, some premium features and content may require a subscription or one-time purchase.",
  },
  {
    question: "Can I access my course content from the app?",
    answer:
      "Yes, if you are enrolled in any of our programs, you can access all your course content directly through the mobile app after logging in.",
  },
  {
    question: "Does the app work offline?",
    answer:
      "Yes, you can access study materials, videos, and tests for offline access. However, some features may require an active internet connection.",
  },
  {
    question: "How often is the content updated?",
    answer:
      "Content updates are uploaded daily, while major materials are kept always up-to-date with current events and examination patterns.",
  },
];

const ILearnAppPage = () => {
  return (
    <>
      <Header />
      <HeroSection
    
        titleClassName="font-bold mb-2"
        title="iLearn App"
        pageName="iLearn App"
        description="Your complete UPSC preparation companion. Access study materials, take tests, track progress, and learn on the go with our feature-rich mobile application."
      />
      <div className="app-landing-container">
        <AppHeroSection />
        <FeaturesSection features={AppFeatures} />
        <ScreenshotsSection></ScreenshotsSection>
        <ReviewsSection reviews={UserReviews} />
        <DownloadSection />
        <FAQSection faqs={FAQs} />
      </div>
    </>
  );
};

export default ILearnAppPage;
