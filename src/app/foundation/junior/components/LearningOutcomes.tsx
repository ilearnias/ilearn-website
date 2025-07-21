"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { FiTarget, FiBook, FiUsers, FiClock, FiAward } from 'react-icons/fi';

interface OutcomeItemProps {
  icon: React.ReactNode;
  description: string;
}

const OutcomeItem: React.FC<OutcomeItemProps> = ({ icon, description }) => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-blue-600 bg-blue-50 p-3 rounded-lg flex-shrink-0">
        {icon}
      </div>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const LearningOutcomes = () => {
  const outcomes = [
    {
      icon: <FiTarget className="w-6 h-6" />,
      description: "Nurturing little minds in creative problem solving & real-life decision making, learning from top IAS/IPS officers of the nation",
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      description: "Gain general understanding in core subjects like Polity, History, Geography, Economy, etc. through structured learning sessions.",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      description: "Receive personalized mentorship with regular 1-on-1 sessions and parent involvement to guide academic and mindset growth.",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      description: "Develop a daily newspaper reading routine through 15-minute news analysis, helping the child to be an active learner.",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      description: "Enhance retention and engagement through weekly 'QuizzyBee' mixed-format tests with MCQs and descriptive questions.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
         
          <div className='_heading-box-title1 text-center'>Learning Outcomes</div>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our program is designed to shape young minds into future leaders through comprehensive learning and skill development
          </p>
          
          <div className="space-y-4">
            {outcomes.map((outcome, index) => (
              <OutcomeItem key={index} {...outcome} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LearningOutcomes; 