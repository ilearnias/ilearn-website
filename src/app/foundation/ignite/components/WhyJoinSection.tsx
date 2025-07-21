"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiUsers, FiMessageSquare, FiCompass } from 'react-icons/fi';

interface BenefitItemProps {
  icon: React.ReactNode;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, description }) => {
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
      className="feature-card bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="feature-card-content relative z-10 flex-1">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 h-full">
          <div className="text-blue-600 bg-blue-50 p-3 rounded-lg flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="hover-effect"></div>
    </div>
  );
};

const WhyJoinSection = () => {
  const benefits = [
    {
      icon: <FiBook className="w-6 h-6" />,
      description: " Learn directly from experienced iLearn IAS faculty",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      description: " Build strong UPSC fundamentals during college with periodic assessment ",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      description: "Receive structured weekly guidance to stay on track with personalised mentorship ",
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      description: "Develop critical thinking and problem-solving skills from serving IAS/IPS officers ",
    },
    {
      icon: <FiCompass className="w-6 h-6" />,
      description: "Be part of Kerala’s most vibrant UPSC student network ",
    },
  ];

  return (
    <>
      <style jsx global>{`
        .feature-card {
          --mouse-x: 0;
          --mouse-y: 0;
        }

        .feature-card-content {
          height: 100%;
          position: relative;
          z-index: 10;
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

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section className="py-16 sm:py-20 bg-gray-50">
        <Container>
          <div className="max-w-[1400px] mx-auto">
          
            <div className='_heading-box-title1 text-center'>Why Join iLearn IAS Ignite?</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default WhyJoinSection; 