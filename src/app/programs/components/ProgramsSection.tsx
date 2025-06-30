"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { programRoutes } from "./program/routes";

const ProgramsSection = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const programs = [
    {
      id: "pcm",
      title: "Prelims Cum Mains (PCM Program)",
      description: "Comprehensive classroom program covering both preliminary and main examinations with proven methodol...",
      duration: "12 months"
    },
    {
      id: "cana",
      title: "Current Affairs and News Analysis (CANA)",
      description: "Stay updated with the latest current affairs and develop analytical skills essential for UPSC examin...",
      duration: "ongoing"
    },
    {
      id: "mmp",
      title: "Mains Mastery Program (MMP)",
      description: "Comprehensive Mains preparation program featuring daily answer writing practice, masterclasses by ex...",
      duration: "3.5 months"
    },
    {
      id: "igp",
      title: "Interview Guidance Program (IGP)",
      description: "Specialized program for candidates who have cleared mains examination, focusing on personality devel...",
      duration: "2 months"
    },
    {
      id: "foundation",
      title: "Foundation Course for Civil Services",
      description: "Comprehensive foundation program for beginners starting their civil services preparation journey wit...",
      duration: "8 months"
    },
    {
      id: "geography",
      title: "Geography Optional",
      description: "Comprehensive coaching for Geography optional with physical and human geography coverage, map work,...",
      duration: "6 months"
    },
    {
      id: "psir",
      title: "Political Science & International Relations",
      description: "Expert coaching for Political Science & IR optional covering Indian politics, comparative politics...",
      duration: "6 months"
    },
    {
      id: "sociology",
      title: "Sociology Optional",
      description: "Comprehensive Sociology optional coaching covering social theory, Indian society, and contemporary s...",
      duration: "6 months"
    },
    {
      id: "malayalam",
      title: "Malayalam Literature Optional",
      description: "Specialized coaching for Malayalam literature optional covering classical and modern literature, poe...",
      duration: "6 months"
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
        <Fade>
          <h1 className="text-center">
            <span className="text-primary">Our</span>{" "}
            <span className="text-danger">Programs</span>
          </h1>
        </Fade>
        <Fade>
          <h2 className="text-center mb-4">
            <span className="text-primary">Find Your Perfect</span>{" "}
            <span className="text-danger">Learning Path</span>
          </h2>
        </Fade>
        <Row className="justify-content-center">
          <Col sm={8} className="text-center">
            <Fade direction="up">
              <p className="text-muted">
                Choose from our comprehensive range of programs tailored to different aspects of civil service examination preparation.
              </p>
            </Fade>
          </Col>
        </Row>

        <Row className="mt-5">
          {programs.map((program, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Fade direction="up">
                <div className="program-card">
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
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProgramsSection; 