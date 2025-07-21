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
      description: "Master the UPSC GS Basics with a structured learning approach, with LIVE classes (recording available) that simplify key GS concepts across Polity, Economy, Geography, History and more.",
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      description: "Familiarising UPSC Previous Year Questions (PYQs), thereby appraising the students of the current trends of the examination ",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      description: "Think, decide, and lead like a civil servant through ‘Officer on Duty’, a monthly LIVE skill-building session guided by serving IAS/IPS officers, focused on real-world leadership and ethical decision-making. ",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      description: "Stay on track with personalised guidance through 1-on-1 mentorship twice a month, monthly group sessions, and mentor-evaluated tests with feedback to sharpen your preparation. ",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      description: "Build a strong current affairs foundation with daily 30-minute newspaper analysis, iLearn BEACON, and UPSC-focused tools like Chai Pe Quest (Prelims Practice) and iMPACT (Mains Practice). ",
    },
     {
      icon: <FiAward className="w-6 h-6" />,
      description:"Develop exam-specific strategies through weekly LIVE Sunday sessions on MCQ-solving, Mains answer writing, essay writing, note-making, and doubt clearance, to boost performance in both Prelims and Mains.  ",
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