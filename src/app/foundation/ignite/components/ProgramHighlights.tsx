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
      description: "10 months (Aug 15, 2025 - June 20, 2026)",
    },
    {
      icon: <FiMonitor className="w-6 h-6" />,
      title: "Delivery Mode",
      description: "Online (REC + LIVE)",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Total Hours",
      description: "300+ hrs of structured content",
    }
  ];

  const weeklySchedule = {
    icon: <FiBookOpen className="w-6 h-6" />,
    title: "Weekly Schedule",
    description: (
      <>
        <SessionDetails 
          title="Saturday"
          details="3-hour LIVE GS Session led by iLearn IAS Faculty Team"
        />
        <SessionDetails 
          title="Sunday"
          details={
            <>
              LIVE STRATEGY Session on:<br/>
              <ul className="list-disc pl-6">
                <li>Solving Prelims MCQs</li>
                <li>Mains Answer Writing</li>
                <li>Note Making</li>
                <li>Essay writing</li>
                <li>Doubt Clearance</li>
              </ul>
            </>
          }
        />
        <SessionDetails
          title="Weekly Prelims Practice Tests"
          details={
            <>25 Q on portal; Open from Saturday 5 PM till end of next day</>
          }
        />
        <SessionDetails
          title="Monthly Mains Answer Writing Test"
          details={
            <>
              On a Sunday, followed by a brief discussion<br/>
              5 Q per test; Evaluation & feedback by mentor
            </>
          }
        />
      </>
    ),
    className: "col-span-full"
  };

  const mentorship = {
    icon: <FiUsers className="w-6 h-6" />,
    title: "Mentorship & Feedback",
    description: (
      <>
        <ul className="list-disc pl-6">
          <li>1-on-1 Personal Mentorship & Feedback (twice a month; on weekdays)</li>
          <li>One Group Mentorship on monthly basis (Sunday)</li>
        </ul>
      </>
    ),
    className: "col-span-full"
  };

  const additionalFeatures = [
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Subject wise UPSC PYQ Compilation",
      description: "(2013-2025)",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Daily Newspaper Analysis",
      description: "Daily 30 Min Newspaper Analysis (REC) with experts curated notes",
    },
    {
      icon: <FiBookOpen className="w-6 h-6" />,
      title: "Current Affairs Material Support",
      description: (
        <ul className="list-disc pl-6">
          <li>Daily News Headlines: iLearn BEACON</li>
          <li>Daily Prelims Practice: Chai Pe Quest</li>
          <li>Daily Mains Practice: iMPACT</li>
        </ul>
      ),
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Officer On Duty",
      description: (
        <>Learn how real civil servants think, decide and lead through monthly LIVE skill-building sessions curated by serving IAS/IPS officers.</>
      ),
    },
  ];

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
          <div className="h-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalFeatures.map((feature, index) => (
              <ProgramFeature key={index} {...feature} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProgramHighlights; 