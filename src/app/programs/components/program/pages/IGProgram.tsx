"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import { 
  FiUsers, FiUserPlus, FiMessageCircle, FiCheckCircle,
  FiClock, FiHelpCircle, FiVideo
} from "react-icons/fi";

// Program Highlights Section
interface HighlightProps {
  icon: React.ReactNode;
  text: string;
}

const Highlight: React.FC<HighlightProps> = ({ icon, text }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="text-red-500 flex-shrink-0">
      {icon}
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const ProgramHighlights = () => {
  const highlights = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      text: "One-on-one mock interviews"
    },
    {
      icon: <FiUserPlus className="w-6 h-6" />,
      text: "Personality development"
    },
    {
      icon: <FiMessageCircle className="w-6 h-6" />,
      text: "Current affairs discussion"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      text: "Expert panel feedback"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Program Highlights</h2>
        <div className="max-w-2xl">
          {highlights.map((highlight, index) => (
            <Highlight key={index} {...highlight} />
          ))}
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Program Details</h3>
          <div className="flex items-center gap-2 text-gray-700">
            <FiClock className="w-5 h-5" />
            <span>Duration: 2 months</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Student Testimonials Section
const StudentTestimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Student Testimonials</h2>
        <p className="text-center text-gray-600 mb-12">
          Success stories from Interview Guidance Program (IGP) students
        </p>
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <FiVideo className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Video Testimonials Yet</h3>
            <p className="text-gray-600">
              Video testimonials for this program will appear here in a horizontal carousel, just like on the homepage
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <div className="w-24 h-12 bg-gray-200 rounded-md"></div>
            <div className="w-24 h-12 bg-gray-200 rounded-md"></div>
            <div className="w-24 h-12 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => (
  <div className="border-b border-gray-200 py-4">
    <button className="flex justify-between items-center w-full text-left">
      <span className="font-semibold text-gray-800">{question}</span>
      <FiHelpCircle className="w-5 h-5 text-gray-400" />
    </button>
    <p className="mt-2 text-gray-600">{answer}</p>
  </div>
);

const FAQSection = () => {
  const faqs = [
    {
      question: "When should I join the IGP?",
      answer: "The best time to join the IGP is after clearing your Mains examination, as it specifically focuses on interview preparation and personality development."
    }
    // Add more FAQs as needed
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQ key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Section
const CallToAction = () => {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg mb-8">
          Join Interview Guidance Program (IGP) at iLearn IAS Academy and take the first step towards
          achieving your goal of becoming a civil servant.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700">
            Enroll Now
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white/10">
            Contact for Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default function IGProgram() {
  const buttons = (
    <div className="flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Join Interview Guidance
      </button>
      <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
        Learn More
      </button>
    </div>
  );

  return (
    <div className="program-page">
      <Header />
      <HeroSection
        title="Interview Guidance"
        description="Expert guidance for UPSC personality test"
        buttons={buttons}
      />
      <ProgramHighlights />
      <StudentTestimonials />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  );
} 