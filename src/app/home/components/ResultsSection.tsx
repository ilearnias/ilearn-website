"use client";
import React from "react";
import "./styles.scss";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { FaTrophy, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

const ResultCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => {
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
        <Heading
          text={title}
          size="sm"
          className="!uppercase !leading-normal text-white"
        />
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

const ResultsSection = () => {
  const results = [
    {
      icon: FaTrophy,
      title: "Highest selection in Top 100 Ranks",
      description:
        "Five of our students secured positions in the top 100 ranks nationwide",
    },
    {
      icon: FaChalkboardTeacher,
      title: "Consistent Classroom results",
      description: "Selections from our Prelims-cum-Mains & Classroom Program",
    },
    // {
    //   icon: FaUserGraduate,
    //   title: "Total Selections ",
    //   description: "Overall selections from our institute in CSE 2024",
    // },
  ];

  return (
    <section className="results-section w-full">
      <Container className="w-full">
        <Heading
          color="red"
          text={
            <>
              Civil Service Examination 2024
              <br />
              <span>Result Highlights</span>
            </>
          }
          className="!text-center !text-[40px] leading-[1.1] !mb-4"
          animate={true}
        />
        <div className="results-grid !w-full !mt-4">
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
