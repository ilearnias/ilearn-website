"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { FiTarget, FiBarChart, FiBookOpen } from 'react-icons/fi';

interface SpecialFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SpecialFeature: React.FC<SpecialFeatureProps> = ({ icon, title, description }) => {
  return (
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
  );
};

const WhyJoinSection = () => {
  const specialFeatures = [
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Early Start Advantage",
      description:
        "Begin your UPSC preparation journey early with a structured approach that builds strong fundamentals and the right mindset.",
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: "Comprehensive Development",
      description:
        "Focus on overall development including academic excellence, critical thinking, and personality development.",
    },
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Interactive Learning",
      description:
        "Engage in interactive sessions, group discussions, and practical activities that make learning enjoyable and effective.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Heading
          color="tricolor"
          text="Why Join iLearn IAS Junior?"
          className="font-bold text-center mb-6"
        />
        <div className="max-w-4xl mx-auto">
          {specialFeatures.map((feature, index) => (
            <SpecialFeature key={index} {...feature} />
          ))}
        </div>

        <div className="text-center bg-blue-50 p-6 sm:p-12 rounded-2xl mt-16">
          <Heading
            color="tricolor"
            text="Start Your Journey Early"
            className="!text-3xl !font-bold mb-4"
          />
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
            Join our Junior program and lay a strong foundation for your future UPSC success
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold">
              Enroll Now
            </button>
            <button className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors text-base sm:text-lg font-semibold border-2 border-blue-600">
              Learn More
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyJoinSection; 