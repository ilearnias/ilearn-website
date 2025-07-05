"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import Heading from "@/components/common/Heading";
import Container from "@/components/common/Container";
import { 
  FiClock, FiUsers, FiAward, FiCheckCircle,
  FiBook, FiTarget, FiClipboard, FiMessageSquare,
  FiBarChart, FiBookOpen, FiStar
} from "react-icons/fi";

// Program Overview Component
interface OverviewItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const OverviewItem: React.FC<OverviewItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-lg hover:shadow-md transition-all duration-300">
    <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 text-blue-600 bg-blue-50 rounded-full flex items-center justify-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8">
        {icon}
      </div>
    </div>
    <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const ProgramOverview = () => {
  const features = [
    {
      icon: <FiClock className="w-full h-full" />,
      title: "12 Months",
      description: "Comprehensive duration"
    },
    {
      icon: <FiUsers className="w-full h-full" />,
      title: "Expert Faculty",
      description: "Experienced instructors"
    },
    {
      icon: <FiAward className="w-full h-full" />,
      title: "Best Results",
      description: "Kerala&apos;s highest success rate"
    },
    {
      icon: <FiCheckCircle className="w-full h-full" />,
      title: "Complete Coverage",
      description: "Full syllabus included"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <Container>
        <Heading 
          text="Program Overview"
          className="!text-center !mb-3 sm:!mb-4"
          animate={true}
        />
        <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12">
          Our flagship program designed to take you from basics to success in both
          UPSC Prelims and Mains examinations
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8">
          {features.map((feature, index) => (
            <OverviewItem key={index} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

// Program Features Component
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
      className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="feature-card-content relative z-10">
        <div className="flex items-start gap-4">
          <div className="text-blue-600 bg-blue-50 p-3 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      <div className="hover-effect"></div>
    </div>
  );
};

const ProgramFeatures = () => {
  const features = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Complete Syllabus Coverage",
      description: "Comprehensive coverage of both Prelims and Mains syllabus with integrated approach"
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: "Proven Methodology",
      description: "Time-tested teaching methods that have consistently produced top results"
    },
    {
      icon: <FiClipboard className="w-6 h-6" />,
      title: "Regular Assessment",
      description: "Continuous evaluation through tests and mock examinations"
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: "Personal Attention",
      description: "Individual guidance and doubt clearing sessions"
    },
    {
      icon: <FiBookOpen className="w-6 h-6" />,
      title: "Study Materials",
      description: "Comprehensive study materials and reference books"
    },
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: "Interview Preparation",
      description: "Complete personality test and interview guidance"
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
      `}</style>
      <Container>
        <Heading 
          text="Program Features"
          className="!text-center !mb-4"
          animate={true}
        />
        <p className="text-center text-gray-600 mb-12">
          Everything you need to succeed in your UPSC journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

// Success Stories Component
interface StatProps {
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-primary mb-2">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const SuccessStories = () => {
  const stats = [
    {
      value: "45+",
      label: "UPSC Selections"
    },
    {
      value: "5",
      label: "Women in Top 100"
    },
    {
      value: "#1",
      label: "Success Rate in Kerala"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <Heading 
          text="Success Stories"
          className="!text-center !mb-4"
          animate={true}
        />
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg text-center shadow-md">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <FiStar className="w-10 h-10 text-blue-600" />
              </div>
              <Heading 
                text="Athul Janardanan IFS - State Topper"
                className="!text-xl !font-bold !mb-4"
                animate={false}
              />
            </div>
            <p className="text-gray-600 italic text-lg leading-relaxed">
              &quot;iLearn&apos;s PCM program provided me with the perfect foundation and guidance to achieve
              success in UPSC. The comprehensive approach and excellent faculty made all the
              difference.&quot;
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-all duration-300">
              <Stat {...stat} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 mb-8 text-lg">
            Join our PCM program and be part of Kerala&apos;s most successful civil
            service coaching institute
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
              Enroll Today
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default function PCMProgram() {
  const buttons = (
    <div className="flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
        Join PCM Program
      </button>
      <button className="bg-white text-gray-800 px-8 py-3 rounded-md hover:bg-gray-100 transition-all duration-300 border border-gray-200">
        Learn More
      </button>
    </div>
  );

  return (
    <div className="program-page">
      <Header />
      <HeroSection
        title="Prelims Cum Mains Program"
        description="Comprehensive preparation for both UPSC Prelims and Mains"
        buttons={buttons}
      />
      <ProgramOverview />
      <ProgramFeatures />
      <SuccessStories />

    </div>
  );
} 