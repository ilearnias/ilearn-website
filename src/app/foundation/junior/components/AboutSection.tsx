"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { FiBook, FiTarget, FiUsers, FiAward } from 'react-icons/fi';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
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

const AboutSection = () => {
  const features = [
    {
      icon: <FiTarget className="w-full h-full" />,
      title: "Early Preparation",
      description: "Start your UPSC journey early with structured guidance",
    },
    {
      icon: <FiBook className="w-full h-full" />,
      title: "Strong Foundation",
      description: "Build core concepts and analytical skills",
    },
    {
      icon: <FiUsers className="w-full h-full" />,
      title: "Interactive Learning",
      description: "Engage in group discussions and peer learning",
    },
    {
      icon: <FiAward className="w-full h-full" />,
      title: "Expert Mentoring",
      description: "Learn from experienced UPSC mentors",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <Container>
        <Heading
          color="tricolor"
          text="Why Start Early?"
          className="text-center font-bold mb-4 sm:mb-6"
        />
        <p className="text-center text-sm sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Early preparation is key to UPSC success. Our Junior program helps students build a strong foundation
          and develop the right mindset from an early age.
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

export default AboutSection; 