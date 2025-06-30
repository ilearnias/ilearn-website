"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgramHero from "../ProgramHero";
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
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 mb-4 text-blue-600">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
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
      description: "Kerala's highest success rate"
    },
    {
      icon: <FiCheckCircle className="w-full h-full" />,
      title: "Complete Coverage",
      description: "Full syllabus included"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Program Overview</h2>
        <p className="text-center text-gray-600 mb-12">
          Our flagship program designed to take you from basics to success in both
          UPSC Prelims and Mains examinations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <OverviewItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Program Features Component
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Program Features</h2>
        <p className="text-center text-gray-600 mb-12">
          Everything you need to succeed in your UPSC journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="mb-6">
              <FiStar className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-bold mb-4">
                Athul Janardanan IFS - State Topper
              </h3>
            </div>
            <p className="text-gray-600 italic">
              "iLearn's PCM program provided me with the perfect foundation and guidance to achieve
              success in UPSC. The comprehensive approach and excellent faculty made all the
              difference."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 mb-8">
            Join our PCM program and be part of Kerala's most successful civil
            service coaching institute
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700">
              Enroll Today
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function PCMProgram() {
  return (
    <div className="program-page">
      <Header />
      <ProgramHero
        title="Prelims Cum Mains (PCM) Program"
        shortName="PCM Program"
        description="Comprehensive classroom program with proven methodology and Kerala's highest success rate"
        duration="12 months"
        bgColor="#f0f4f8"
      />
      <ProgramOverview />
      <ProgramFeatures />
      <SuccessStories />
      <Footer />
    </div>
  );
} 