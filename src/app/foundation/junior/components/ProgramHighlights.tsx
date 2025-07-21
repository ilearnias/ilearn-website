"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { FiCalendar, FiMonitor, FiClock, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi';

interface ProgramFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
}

const ProgramFeature: React.FC<ProgramFeatureProps> = ({ icon, title, description, className = "" }) => {
  return (
    <motion.div
      className={`bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="text-blue-600 bg-blue-50 p-3 rounded-lg flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
          <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SessionDetails: React.FC<{ title: string; details: React.ReactNode }> = ({ title, details }) => (
  <div className="mb-4">
    <h4 className="font-semibold text-blue-800 mb-2">{title}</h4>
    <div className="text-gray-600 pl-4 border-l-2 border-blue-200">
      {details}
    </div>
  </div>
);

const ProgramHighlights = () => {
  const mainFeatures = [
    {
      icon: <FiCalendar className="w-6 h-6" />,
      title: "Duration",
      description: "10 months till June 2026",
    },
    {
      icon: <FiMonitor className="w-6 h-6" />,
      title: "Delivery Mode",
      description: "Online (LIVE + REC)",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Daily Analysis",
      description: "15-minute Newspaper Analysis [REC]",
    }
  ];

  const weeklySchedule = {
    icon: <FiBookOpen className="w-6 h-6" />,
    title: "Weekly Schedule",
    description: (
      <>
        <SessionDetails 
          title="Saturdays"
          details="2-hour General Studies [GS] Session - Content aligned with UPSC foundation themes [LIVE + REC]"
        />
        <SessionDetails 
          title="Sundays"
          details={
            <>
              2 &quot;Think like a Civil Servant&quot; - 2-hour LIVE case study-solving sessions (moderated by serving IAS/IPS officers)<br/>
              2 &quot;QUIZZYBEE&quot; - weekly mixed-format tests (MCQ + descriptive)<br/>
              • Skill Development Sessions on Debate/Public Speaking, Communicative English etc
            </>
          }
        />
      </>
    ),
    className: "col-span-full"
  };

  const mentorship = {
    icon: <FiUsers className="w-6 h-6" />,
    title: "Personalized Mentorship",
    description: "1-on-1 Personalized Mentorship sessions for students along with parents' participation and regular progress tracking (thrice a month)",
    className: "col-span-full"
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
       
        <div className='_heading-box-title1 text-center'>Program Structure</div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {mainFeatures.map((feature, index) => (
              <ProgramFeature key={index} {...feature} />
            ))}
          </div>
          
          <ProgramFeature {...weeklySchedule} />
          <div className="h-6"></div>
          <ProgramFeature {...mentorship} />
        </div>
      </Container>
    </section>
  );
};

export default ProgramHighlights; 