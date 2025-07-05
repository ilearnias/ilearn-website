"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { motion } from "framer-motion";
import { 
  FiUser, FiUsers, FiCheckCircle, FiClock,
  FiFileText, FiMessageSquare, FiAward, FiStar,
  FiChevronDown
} from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import Image from 'next/image';
import { useMediaQuery } from "react-responsive";

// Expert Faculty Section
interface FacultyMemberProps {
  name: string;
  qualification: string;
  description: string;
  gender: 'male' | 'female';
}

const FacultyMember: React.FC<FacultyMemberProps> = ({ name, qualification, description, gender }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${gender === 'male' ? 'bg-blue-100' : 'bg-red-100'}`}>
        <FiUser className={`w-8 h-8 ${gender === 'male' ? 'text-blue-500' : 'text-red-500'}`} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{qualification}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const ExpertFaculty = () => {
  const faculty = [
    {
      name: "Nikhil Lohitakshan",
      qualification: "UPSC AIR 622 - History Optional",
      description: "Expert in Indian history and comprehensive geography coverage",
      gender: "male"
    },
    {
      name: "Rahul Raghavan",
      qualification: "UPSC AIR 825 - Public Administration",
      description: "Expert in public administration and selective test prep",
      gender: "male"
    },
    {
      name: "Vineeth Lohitakshan",
      qualification: "UPSC AIR 891 - Geography & Environment",
      description: "Expert in geography and environmental studies",
      gender: "male"
    },
    {
      name: "Ashil Shukoor",
      qualification: "UPSC AIR 522 - International Relations",
      description: "Expert in international relations and global affairs",
      gender: "male"
    },
    {
      name: "Aditya Narayan H",
      qualification: "UPSC AIR 350 - Society",
      description: "Specialist in social issues and contemporary studies",
      gender: "male"
    },
    {
      name: "Dr. Jayesh Khaddar",
      qualification: "Essay Writing Specialist",
      description: "Expert in essay writing, editing and text improvement",
      gender: "male"
    }
  ] as const;

  return (
    <section className="py-16 bg-white">
      <Container>
        <Heading 
          text="Expert Faculty & UPSC Toppers" 
          className="text-center mb-6"
          animate={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {faculty.map((member, index) => (
            <FacultyMember key={index} {...member} />
          ))}
        </div>
      </Container>
    </section>
  );
};

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
      icon: <FiFileText className="w-6 h-6" />,
      title: "Regular Tests",
      text: "Comprehensive tests covering both GS and optional papers for thorough preparation"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Detailed Evaluation",
      text: "In-depth assessment of your answers with constructive feedback for improvement"
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: "Personal Feedback",
      text: "One-on-one sessions to discuss your progress and areas of improvement"
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Writing Excellence",
      text: "Master the art of answer writing with proven techniques and strategies"
    }
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
            text="Program Highlights" 
            className="mb-4"
            animate={true}
          />
          <p className="text-gray-600 leading-relaxed">
            Our comprehensive program is designed to give you the edge you need in UPSC Mains examination
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
              <div className="text-blue-600 bg-blue-50 p-4 rounded-xl">
                <FiClock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Program Duration</h3>
                <p className="text-gray-600">4 months intensive training</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              View Schedule
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

// Testimonials Section
const TestimonialCard = ({ name, rank, text, image }: { name: string; rank: string; text: string; image: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
        <button
          className="w-full p-4 flex items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold">{name}</h4>
              <p className="text-blue-600 text-sm">{rank}</p>
            </div>
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
          <div className="px-4 pb-4">
            <div className="relative">
              <RiDoubleQuotesL className="text-gray-200 w-8 h-8 absolute -top-2 -left-2" />
              <p className="text-gray-600 leading-relaxed pl-6">{text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-blue-600">{rank}</p>
        </div>
      </div>
      <div className="relative">
        <RiDoubleQuotesL className="text-gray-200 w-8 h-8 absolute -top-2 -left-2" />
        <p className="text-gray-600 leading-relaxed pl-6">{text}</p>
      </div>
    </div>
  );
};

const StudentTestimonials = () => {
  const testimonials = [
    {
      name: "Rahul Kumar",
      rank: "AIR 45, CSE 2023",
      image: "/result/dummy.jpg",
      text: "The Mains Mastery Program helped me develop a structured approach to answer writing. The regular feedback and evaluation were invaluable."
    },
    {
      name: "Priya Singh",
      rank: "AIR 89, CSE 2023",
      image: "/result/dummy.jpg",
      text: "What sets MMP apart is their personalized attention. The mentors helped me identify and work on my weak areas effectively."
    },
    {
      name: "Amit Patel",
      rank: "AIR 156, CSE 2023",
      image: "/result/dummy.jpg",
      text: "The program's focus on current affairs integration and answer presentation techniques significantly improved my mains score."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <Heading 
            text="What Our Students Say about Mains Mastery Program (MMP)" 
            className="mb-4"
            animate={true}
          />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hear from our successful candidates about their experience with our program
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-800">{question}</span>
        <div className={`text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <FiChevronDown size={20} />
        </div>
      </button>
      <div className={`mt-2 text-gray-600 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        {answer}
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How many tests are included?",
      answer: "The program includes regular tests covering both GS and optional papers, with detailed evaluation and personalized feedback."
    }
    // Add more FAQs as needed
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <Heading 
          text="Frequently Asked Questions" 
          className="text-center mb-8"
          animate={true}
        />
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQ key={index} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default function MMProgram() {
  const buttons = (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold">
        Join Mains Mastery
      </button>
      <button className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors text-base sm:text-lg font-semibold border-2 border-blue-600">
        Learn More
      </button>
    </div>
  );

  return (
    <div className="program-page">
      <Header />
      <HeroSection
        title="Mains Mastery Program"
        description="Master UPSC Mains with our comprehensive program"
        buttons={buttons}
      />
      <ExpertFaculty />
      <ProgramHighlights />
      <StudentTestimonials />
      <FAQSection />
        
    </div>
  );
} 