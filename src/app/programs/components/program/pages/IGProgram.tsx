"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import SubText from "@/components/common/SubText";
import {
  FiUsers,
  FiUserPlus,
  FiMessageCircle,
  FiCheckCircle,
  FiClock,
  FiHelpCircle,
  FiVideo,
  FiChevronDown,
} from "react-icons/fi";
import { TestimonialItem } from "@/app/home/components/TestimonialsSection";
import TestimonialsSection from "@/app/home/components/TestimonialsSection";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

// Sample testimonial data for IGP
const igpTestimonials: TestimonialItem[] = [
  {
    id: "igp1",
    description: "Success in UPSC Interview - How iLearn's IGP helped me ace my UPSC interview with confidence.",
    video: "Y8Tko2YC5hA",
    isActive: true,
    isTestimonial: true,
    order: 1
  },
  {
    id: "igp2",
    description: "Interview Preparation Journey - My experience with iLearn's comprehensive IGP.",
    video: "jNQXAC9IVRw",
    isActive: true,
    isTestimonial: true,
    order: 2
  },
  {
    id: "igp3",
    description: "IGP Success Story - How the program's structured approach made the difference.",
    video: "M7lc1UVf-VE",
    isActive: true,
    isTestimonial: true,
    order: 3
  }
];

// Program Highlights Section
interface HighlightProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const Highlight: React.FC<HighlightProps> = ({ icon, title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  if (isMobile) {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
        <button
          className="w-full p-4 flex items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="text-blue-600 bg-blue-50 p-3 rounded-xl">
              {icon}
            </div>
            <h3 className="font-semibold">{title}</h3>
          </div>
          <FiChevronDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <p className="px-4 pb-4 text-gray-600">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="feature-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="feature-card-content relative z-10">
        <div className="flex flex-col h-full">
          <div className="text-blue-600 bg-blue-50 p-4 rounded-xl w-fit mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{text}</p>
        </div>
      </div>
      <div className="hover-effect"></div>
    </div>
  );
};

const ProgramHighlights = () => {
  const highlights = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Mock Interviews",
      text: "One-on-one mock interviews with experienced panel members to simulate the actual UPSC interview experience",
    },
    {
      icon: <FiUserPlus className="w-6 h-6" />,
      title: "Personality Development",
      text: "Comprehensive sessions focusing on communication skills, body language, and overall personality enhancement",
    },
    {
      icon: <FiMessageCircle className="w-6 h-6" />,
      title: "Current Affairs Discussion",
      text: "In-depth analysis of current events and their implications from interview perspective",
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Expert Feedback",
      text: "Detailed feedback and personalized guidance from experienced interview panel members",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <style jsx>{`
        .feature-card {
          --mouse-x: 0;
          --mouse-y: 0;
        }

        .hover-effect {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(229, 231, 235, 0.1),
            transparent 40%
          );
        }

        .feature-card:hover .hover-effect {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .hover-effect {
            display: none;
          }
        }
      `}</style>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Heading
            color="tricolor"
            text="Program Highlights"
            className="mb-4 font-bold"
            animate={true}
          />
          <p className="text-gray-600 leading-relaxed">
            Our comprehensive interview guidance program is designed to help you
            excel in the UPSC personality test
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Highlight key={index} {...highlight} />
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <FiClock className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Program Duration</h3>
                <p className="text-gray-600">2 months intensive preparation</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

// FAQ Section
interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
        <button
          className="w-full p-4 flex items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-gray-800">{question}</span>
          <FiChevronDown
            className={`w-5 h-5 text-blue-600 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <p className="px-4 pb-4 text-gray-600">{answer}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-center w-full text-left">
        <span className="font-semibold text-gray-800">{question}</span>
        <FiHelpCircle className="w-5 h-5 text-blue-600" />
      </div>
      <p className="mt-2 text-gray-600">{answer}</p>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "When should I join the IGP?",
      answer:
        "The best time to join the IGP is after clearing your Mains examination, as it specifically focuses on interview preparation and personality development.",
    },
    {
      question: "What is the duration of mock interviews?",
      answer:
        "Each mock interview session typically lasts for 30-45 minutes, followed by a detailed feedback session.",
    },
    {
      question: "How many mock interviews are conducted?",
      answer:
        "The program includes multiple mock interviews to ensure thorough preparation and improvement.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Heading
            color="tricolor"
            text="Frequently Asked Questions"
            animate={true}
            className=" font-bold mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            Get answers to common questions about our Interview Guidance Program
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQ key={index} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
};

// Call to Action Section
const CallToAction = () => {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <Container>
        <div className="text-center">
          <SubText
            text="Join Interview Guidance Program (IGP) at iLearn IAS Academy and take the first step towards achieving your goal of becoming a civil servant."
            className="!text-white !text-lg !mb-8"
          />
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Enroll Now
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
              Contact for Details
            </button>
          </div>
        </div>
      </Container>
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
        className="font-bold"
        titleClassName="font-bold"
        title="Interview Guidance"
        description="Expert guidance for UPSC personality test"
        buttons={buttons}
      />
      <ProgramHighlights />
      <TestimonialsSection testimonials={igpTestimonials} />
      <FAQSection />
      <CallToAction />
    </div>
  );
}
