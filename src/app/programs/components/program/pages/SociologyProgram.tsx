"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/app/about/components/HeroSection";
import { 
  FiBook, FiTarget, FiGlobe, FiClipboard,
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
      icon: <FiBook className="w-6 h-6" />,
      text: "Comprehensive notes"
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      text: "Conceptual clarity"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      text: "Contemporary application"
    },
    {
      icon: <FiClipboard className="w-6 h-6" />,
      text: "Regular test series"
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
            <span>Duration: 6 months</span>
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
          Success stories from Sociology Optional students
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
  isOpen?: boolean;
  onClick?: () => void;
}

const FAQ: React.FC<FAQProps> = ({ question, isOpen = false, onClick }) => (
  <div className="border rounded-lg bg-white mb-4 overflow-hidden">
    <button 
      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <span className="text-[#27374D] text-lg">{question}</span>
      </div>
      <svg
        className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
);

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I enroll in a program?",
      answer: "You can enroll by clicking the 'Enroll Now' button or contacting us directly."
    },
    {
      question: "Are there any scholarships available?",
      answer: "Yes, we offer merit-based scholarships. Contact us for more details."
    },
    {
      question: "Do you offer online classes?",
      answer: "Yes, we provide both online and offline learning options."
    },
    {
      question: "What is your batch size?",
      answer: "We maintain small batch sizes to ensure personalized attention."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[#27374D]">Frequently Asked </span>
            <span className="text-red-600">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our programs and admission process.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQ key={index} question={faq.question} />
          ))}
          <div className="text-center mt-8">
            <a 
              href="/contact"
              className="text-[#27374D] hover:text-blue-800 font-medium inline-flex items-center"
            >
              Contact us for more information
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
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
          Join Sociology Optional at iLearn IAS Academy and take the first step towards
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

export default function SociologyProgram() {
  return (
    <div className="program-page">
      <Header />
      <HeroSection
        title="Sociology Optional"
        subtitle="Expert coaching for Sociology as an optional subject for UPSC Mains examination."
        className="program-box1"
      />
      <ProgramHighlights />
      <StudentTestimonials />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  );
} 