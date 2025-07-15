"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { motion } from "framer-motion";
import {
  FiClock,
  FiRefreshCw,
  FiSearch,
  FiTarget,
  FiCheckCircle,
  FiBook,
  FiGlobe,
  FiDollarSign,
  FiHelpCircle,
  FiAward,
  FiBarChart,
  FiBookOpen,
  FiChevronDown,
} from "react-icons/fi";

// Why CANA Matters Component
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-6 text-blue-600 bg-blue-50 rounded-full flex items-center justify-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8">{icon}</div>
    </div>
    <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{description}</p>
  </motion.div>
);

const WhyCANAMatters = () => {
  const features = [
    {
      icon: <FiClock className="w-full h-full" />,
      title: "Ongoing",
      description: "Continuous program duration",
    },
    {
      icon: <FiRefreshCw className="w-full h-full" />,
      title: "Daily Updates",
      description: "Fresh content every day",
    },
    {
      icon: <FiSearch className="w-full h-full" />,
      title: "Analysis Focus",
      description: "Deep analytical approach",
    },
    {
      icon: <FiTarget className="w-full h-full" />,
      title: "UPSC Focused",
      description: "Exam-specific content",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <Container>
        <Heading
          color="tricolor"
          text="Why CANA Matters"
          className="text-center font-bold mb-4 sm:mb-6"
        />
        <p className="text-center text-sm sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Current affairs form the backbone of UPSC preparation. Our CANA
          program ensures you&apos;re always updated and analysis-ready.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

// Program Features Component
interface ProgramFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProgramFeature: React.FC<ProgramFeatureProps> = ({
  icon,
  title,
  description,
}) => {
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
      className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden h-[200px] flex"
      onMouseMove={handleMouseMove}
    >
      <div className="feature-card-content relative z-10 flex-1">
        <div className="flex items-start gap-4 h-full">
          <div className="text-blue-600 bg-blue-50 p-3 rounded-lg flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="hover-effect"></div>
    </div>
  );
};

const CANAFeatures = () => {
  const features = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Daily News Analysis",
      description:
        "Comprehensive analysis of important daily news events with UPSC relevance",
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Monthly Compilations",
      description:
        "Organized monthly compilations for effective revision and quick reference",
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Government Schemes",
      description:
        "Updated coverage of all government schemes and policy developments",
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "International Relations",
      description:
        "Detailed analysis of international events and their implications",
    },
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: "Economic Updates",
      description: "Current economic developments with simplified explanations",
    },
    {
      icon: <FiHelpCircle className="w-6 h-6" />,
      title: "Practice Questions",
      description:
        "Regular practice questions based on current affairs for both Prelims and Mains",
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
      `}</style>
      <Container>
        <Heading
          color="tricolor"
          text="Program Features"
          className="text-center font-bold mb-6"
        />
        <p className="text-center text-gray-600 mb-12">
          Comprehensive current affairs preparation tailored for UPSC aspirants
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ProgramFeature key={index} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

// Success Impact Component
interface StatProps {
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => (
  <motion.div
    className="text-center p-8 bg-white rounded-xl shadow-sm"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="text-5xl font-bold text-blue-600 mb-4">{value}</div>
    <div className="text-gray-600 text-lg">{label}</div>
  </motion.div>
);

interface SpecialFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SpecialFeature: React.FC<SpecialFeatureProps> = ({
  icon,
  title,
  description,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile View - Dropdown */}
      <details
        className="mb-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow sm:hidden"
        open={isOpen}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <summary className="flex items-center gap-4 p-4 cursor-pointer">
          <div className="text-blue-600 bg-blue-50 p-4 rounded-lg flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-xl font-semibold flex-1">{title}</h3>
          <div
            className={`text-blue-600 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <FiChevronDown size={24} />
          </div>
        </summary>
        <div className="px-4 pb-4 pt-2">
          <p className="text-gray-600 leading-relaxed ml-[4.5rem]">
            {description}
          </p>
        </div>
      </details>

      {/* Desktop View - Regular Card */}
      <motion.div
        className="hidden sm:flex items-start gap-6 mb-10 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-blue-600 bg-blue-50 p-4 rounded-lg flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </>
  );
};

const CANASuccess = () => {
  const stats = [
    {
      value: "90%",
      label: "Students report improved confidence in current affairs",
    },
    {
      value: "Daily",
      label: "Fresh content updates keeping you current",
    },
    {
      value: "100%",
      label: "UPSC-relevant content coverage",
    },
  ];

  const specialFeatures = [
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Exam-Specific Approach",
      description:
        "Every piece of content is filtered through the lens of UPSC relevance, ensuring you focus only on what matters for your exam.",
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: "Analytical Framework",
      description:
        "Learn to analyze news events from multiple perspectives - political, economic, social, and international dimensions.",
    },
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Integration with Syllabus",
      description:
        "Current affairs seamlessly integrated with static portions of the syllabus for comprehensive understanding.",
    },
  ];

  return (
    <>
      <section className="py-20 bg-gray-50">
        <style jsx>{`
          details > summary {
            list-style: none;
          }
          details > summary::-webkit-details-marker {
            display: none;
          }
        `}</style>
        <Container>
          <Heading
            color="tricolor"
            text="What Makes Our CANA Special?"
            className=" font-bold text-center mb-6"
          />
          <div className="max-w-4xl mx-auto">
            {specialFeatures.map((feature, index) => (
              <SpecialFeature key={index} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <Heading
            color="tricolor"
            text="CANA Success Impact"
            className="text-center font-bold mb-6"
          />
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Our current affairs program has been instrumental in our
            students&apos; success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Stat key={index} {...stat} />
            ))}
          </div>

          <div className="text-center bg-blue-50 p-6 sm:p-12 rounded-2xl">
            <Heading
              color="tricolor"
              text="Stay Ahead with CANA"
              className="!text-3xl !font-bold mb-4"
            ></Heading>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
              Join our Current Affairs and News Analysis program and never miss
              an important development for your UPSC preparation
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold">
                Enroll in CANA
              </button>
              <button className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors text-base sm:text-lg font-semibold border-2 border-blue-600">
                Get More Info
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default function CANAProgram() {
  const buttons = (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold">
        Join
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
        title="Current Affairs & News Analysis"
        titleClassName="font-bold"
        description="Stay updated with UPSC-focused current affairs analysis"
        buttons={buttons}
      />
      <WhyCANAMatters />
      <CANAFeatures />
      <CANASuccess />
    </div>
  );
}
