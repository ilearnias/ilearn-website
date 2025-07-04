"use client";
import React from 'react';
import './styles.scss';
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { FaTrophy, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ResultCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
  return (
    <motion.div 
      className="result-card"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="icon-circle">
        <Icon size={32} />
      </div>
      <div className="card-content">
        <Heading text={title} className="!text-xl !font-semibold !uppercase !leading-normal" />
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

const ResultsSection = () => {
  const results = [
    {
      icon: FaTrophy,
      title: "Top 100 Ranks",
      description: "Five of our students secured positions in the top 100 ranks nationwide"
    },
    {
      icon: FaChalkboardTeacher,
      title: "Classroom Success",
      description: "Selections from our Prelims-cum-Mains & Classroom Program"
    },
    {
      icon: FaUserGraduate,
      title: "Total Selections",
      description: "Overall selections from our institute in CSE 2024"
    }
  ];

  return (
    <section className="results-section w-full">
      <Container className='w-full'>
        <Heading 
          text={<>Civil Service Examination 2024<br /><span>Result Highlights</span></>}
          className="!text-center !mb-8"
          animate={true}
        />
        <div className="results-grid !w-full">
          {results.map((result, index) => (
            <ResultCard
              key={index}
              icon={result.icon}
              title={result.title}
              description={result.description}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ResultsSection; 