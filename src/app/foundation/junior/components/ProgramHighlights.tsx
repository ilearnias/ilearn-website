"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { FiBook, FiCheckCircle, FiTarget, FiUsers, FiAward, FiBarChart } from 'react-icons/fi';

interface ProgramFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProgramFeature: React.FC<ProgramFeatureProps> = ({ icon, title, description }) => {
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

const ProgramHighlights = () => {
  const features = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Foundation Building",
      description: "Strong focus on building fundamental concepts and analytical skills",
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Regular Assessments",
      description: "Periodic tests and evaluations to track progress and improvement",
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: "Targeted Learning",
      description: "Age-appropriate content delivery with focus on core subjects",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Interactive Sessions",
      description: "Group discussions and peer learning activities",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Mentoring from experienced teachers and UPSC professionals",
    },
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: "Skill Development",
      description: "Focus on developing critical thinking and analytical abilities",
    },
  ];

  return (
    <>
      <style>
        {`
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
        `}
      </style>
      <section className="py-16 bg-gray-50">
        <Container>
          <Heading
            color="tricolor"
            text="Program Features"
            className="text-center font-bold mb-6"
          />
          <p className="text-center text-gray-600 mb-12">
            Comprehensive foundation program designed for young UPSC aspirants
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ProgramFeature key={index} {...feature} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProgramHighlights; 