"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import SubText from "@/components/common/SubText";
import {
  FiBook,
  FiTarget,
  FiGlobe,
  FiClipboard,
  FiClock,
  FiHelpCircle,
  FiVideo,
  FiChevronDown,
} from "react-icons/fi";
import { TestimonialItem } from "@/app/home/components/TestimonialsSection";
import TestimonialsSection from "@/app/home/components/TestimonialsSection";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

// Sample testimonial data for Sociology
const sociologyTestimonials: TestimonialItem[] = [
  {
    id: "soc1",
    description: "Success in Sociology Optional - How iLearn's comprehensive notes helped me score high marks.",
    video: "Y8Tko2YC5hA",
    isActive: true,
    isTestimonial: true,
    order: 1
  },
  {
    id: "soc2",
    description: "From Basics to Advanced - My journey through the sociology optional preparation.",
    video: "jNQXAC9IVRw",
    isActive: true,
    isTestimonial: true,
    order: 2
  },
  {
    id: "soc3",
    description: "Sociology - The Right Choice - How conceptual clarity and test series made the difference.",
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
      icon: <FiBook className="w-6 h-6" />,
      title: "Comprehensive Notes",
      text: "Detailed study material covering all topics of Paper I and Paper II",
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: "Conceptual Clarity",
      text: "Focus on building strong theoretical understanding with practical applications",
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Contemporary Application",
      text: "Regular updates on current events and their sociological analysis",
    },
    {
      icon: <FiClipboard className="w-6 h-6" />,
      title: "Regular Test Series",
      text: "Periodic assessments with detailed feedback and performance analysis",
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
            Our comprehensive sociology optional program is designed to help you
            excel in UPSC optional papers
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
                <p className="text-gray-600">6 months intensive preparation</p>
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
      question: "How do I enroll in the program?",
      answer:
        "You can enroll by clicking the 'Enroll Now' button or contacting us directly through our contact page.",
    },
    {
      question: "Are there any scholarships available?",
      answer:
        "Yes, we offer merit-based scholarships. Contact our admissions team for more details.",
    },
    {
      question: "Do you offer online classes?",
      answer:
        "Yes, we provide both online and offline learning options to suit your convenience.",
    },
    {
      question: "What is your batch size?",
      answer:
        "We maintain small batch sizes of 30-40 students to ensure personalized attention to each student.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Heading
            text="Frequently Asked Questions"
            color="tricolor"
            animate={true}
            className="font-bold mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            Get answers to common questions about our Sociology Optional Program
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
            text="Join Sociology Optional at iLearn IAS Academy and take the first step towards achieving your goal of becoming a civil servant."
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

export default function SociologyProgram() {
  const buttons = (
    <div className="flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Join Sociology Optional
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
        title="Sociology Optional"
        titleClassName="font-bold"
        description="Master Sociology for UPSC Mains with our comprehensive program"
        buttons={buttons}
      />
      <ProgramHighlights />
      <TestimonialsSection testimonials={sociologyTestimonials} />
      <FAQSection />
      <CallToAction />
    </div>
  );
}
