"use client";

import React from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { programRoutes } from "./program/routes";
import { FaGraduationCap, FaNewspaper, FaPencilAlt, FaUserTie, FaBook, FaGlobe, FaBalanceScale, FaUsers, FaLanguage } from "react-icons/fa";
import Container from "@/components/common/Container";

const ProgramsSection = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const programs = [
    {
      id: "pcm",
      title: "Prelims Cum Mains (PCM Program)",
      description: "Comprehensive classroom program covering both preliminary and main examinations with proven methodol...",
      duration: "12 months",
      icon: <FaGraduationCap className="program-icon" />
    },
    {
      id: "cana",
      title: "Current Affairs and News Analysis (CANA)",
      description: "Stay updated with the latest current affairs and develop analytical skills essential for UPSC examin...",
      duration: "ongoing",
      icon: <FaNewspaper className="program-icon" />
    },
    {
      id: "mmp",
      title: "Mains Mastery Program (MMP)",
      description: "Comprehensive Mains preparation program featuring daily answer writing practice, masterclasses by ex...",
      duration: "3.5 months",
      icon: <FaPencilAlt className="program-icon" />
    },
    {
      id: "igp",
      title: "Interview Guidance Program (IGP)",
      description: "Specialized program for candidates who have cleared mains examination, focusing on personality devel...",
      duration: "2 months",
      icon: <FaUserTie className="program-icon" />
    },
    {
      id: "foundation",
      title: "Foundation Course for Civil Services",
      description: "Comprehensive foundation program for beginners starting their civil services preparation journey wit...",
      duration: "8 months",
      icon: <FaBook className="program-icon" />
    },
    {
      id: "geography",
      title: "Geography Optional",
      description: "Comprehensive coaching for Geography optional with physical and human geography coverage, map work,...",
      duration: "6 months",
      icon: <FaGlobe className="program-icon" />
    },
    {
      id: "psir",
      title: "Political Science & International Relations",
      description: "Expert coaching for Political Science & IR optional covering Indian politics, comparative politics...",
      duration: "6 months",
      icon: <FaBalanceScale className="program-icon" />
    },
    {
      id: "sociology",
      title: "Sociology Optional",
      description: "Comprehensive Sociology optional coaching covering social theory, Indian society, and contemporary s...",
      duration: "6 months",
      icon: <FaUsers className="program-icon" />
    },
    {
      id: "malayalam",
      title: "Malayalam Literature Optional",
      description: "Specialized coaching for Malayalam literature optional covering classical and modern literature, poe...",
      duration: "6 months",
      icon: <FaLanguage className="program-icon" />
    }
  ];

  const handleProgramClick = (programId: string) => {
    const route = programRoutes[programId as keyof typeof programRoutes];
    if (route) {
      router.push(route.path);
    }
  };

  return (
    <div className="programs-section">
      <Container>
        <Row className="mt-5">
          {programs.map((program, index) => (
            <Col md={4} className="mb-4" key={index}>
              <div className="program-card">
                <div className="icon-wrapper mb-3">
                  {program.icon}
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className="duration">{program.duration}</div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleProgramClick(program.id)}
                >
                  View Program Details
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProgramsSection; 