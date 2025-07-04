"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import { 
  FiClock, FiRefreshCw, FiSearch, FiTarget,
  FiCheckCircle, FiBook, FiGlobe, FiDollarSign,
  FiHelpCircle, FiAward, FiBarChart, FiBookOpen
} from "react-icons/fi";

// Why CANA Matters Component
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 mb-4 text-blue-600">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const WhyCANAMatters = () => {
  const features = [
    {
      icon: <FiClock className="w-full h-full" />,
      title: "Ongoing",
      description: "Continuous program duration"
    },
    {
      icon: <FiRefreshCw className="w-full h-full" />,
      title: "Daily Updates",
      description: "Fresh content every day"
    },
    {
      icon: <FiSearch className="w-full h-full" />,
      title: "Analysis Focus",
      description: "Deep analytical approach"
    },
    {
      icon: <FiTarget className="w-full h-full" />,
      title: "UPSC Focused",
      description: "Exam-specific content"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Why CANA Matters</h2>
        <p className="text-center text-gray-600 mb-12">
          Current affairs form the backbone of UPSC preparation. Our CANA program
          ensures you&apos;re always updated and analysis-ready.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Program Features Component
interface ProgramFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProgramFeature: React.FC<ProgramFeatureProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-start gap-4">
      <div className="text-green-500">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const CANAFeatures = () => {
  const features = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Daily News Analysis",
      description: "Comprehensive analysis of important daily news events with UPSC relevance"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Monthly Compilations",
      description: "Organized monthly compilations for effective revision and quick reference"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Government Schemes",
      description: "Updated coverage of all government schemes and policy developments"
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "International Relations",
      description: "Detailed analysis of international events and their implications"
    },
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: "Economic Updates",
      description: "Current economic developments with simplified explanations"
    },
    {
      icon: <FiHelpCircle className="w-6 h-6" />,
      title: "Practice Questions",
      description: "Regular practice questions based on current affairs for both Prelims and Mains"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Program Features</h2>
        <p className="text-center text-gray-600 mb-12">
          Comprehensive current affairs preparation tailored for UPSC aspirants
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ProgramFeature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Success Impact Component
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

interface SpecialFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SpecialFeature: React.FC<SpecialFeatureProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4 mb-8">
    <div className="text-blue-600 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const CANASuccess = () => {
  const stats = [
    {
      value: "90%",
      label: "Students report improved confidence in current affairs"
    },
    {
      value: "Daily",
      label: "Fresh content updates keeping you current"
    },
    {
      value: "100%",
      label: "UPSC-relevant content coverage"
    }
  ];

  const specialFeatures = [
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Exam-Specific Approach",
      description: "Every piece of content is filtered through the lens of UPSC relevance, ensuring you focus only on what matters for your exam."
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: "Analytical Framework",
      description: "Learn to analyze news events from multiple perspectives - political, economic, social, and international dimensions."
    },
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Integration with Syllabus",
      description: "Current affairs seamlessly integrated with static portions of the syllabus for comprehensive understanding."
    }
  ];

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Makes Our CANA Special?</h2>
          <div className="max-w-3xl mx-auto">
            {specialFeatures.map((feature, index) => (
              <SpecialFeature key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">CANA Success Impact</h2>
          <p className="text-center text-gray-600 mb-12">
            Our current affairs program has been instrumental in our students&apos; success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Stat key={index} {...stat} />
            ))}
          </div>

          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Stay Ahead with CANA</h2>
            <p className="text-gray-700 mb-8">
              Join our Current Affairs and News Analysis program and never
              miss an important development for your UPSC preparation
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                Enroll in CANA
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">
                Get More Info
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default function CANAProgram() {
  const buttons = (
    <div className="flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Join CANA
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
        title="Current Affairs and News Analysis (CANA)"
        description="Stay ahead with daily current affairs coverage and analytical skills for UPSC success"
        buttons={buttons}
      />
      <WhyCANAMatters />
      <CANAFeatures />
      <CANASuccess />
      <Footer />
    </div>
  );
} 