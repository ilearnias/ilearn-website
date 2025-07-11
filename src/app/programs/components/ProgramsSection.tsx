"use client";

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { programRoutes } from "./program/routes";
import {
  FaGraduationCap,
  FaNewspaper,
  FaPencilAlt,
  FaUserTie,
  FaBook,
  FaGlobe,
  FaBalanceScale,
  FaUsers,
  FaLanguage,
} from "react-icons/fa";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { programmeService, IProgramme } from "@/services/programmes.service";

const ProgramsSection = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [programs, setPrograms] = useState<IProgramme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping for different program categories
  const getIconForCategory = (category: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      Marketing: <FaGraduationCap className="program-icon" />,
      "Current Affairs": <FaNewspaper className="program-icon" />,
      Mains: <FaPencilAlt className="program-icon" />,
      Interview: <FaUserTie className="program-icon" />,
      Foundation: <FaBook className="program-icon" />,
      Geography: <FaGlobe className="program-icon" />,
      "Political Science": <FaBalanceScale className="program-icon" />,
      Sociology: <FaUsers className="program-icon" />,
      Literature: <FaLanguage className="program-icon" />,
    };
    return iconMap[category] || <FaGraduationCap className="program-icon" />;
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await programmeService.getPublicProgrammes(1, 10);
        if (response.status && response.data) {
          setPrograms(response.data);
        } else {
          setError("Failed to fetch programs");
        }
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Failed to fetch programs");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleProgramClick = (program: IProgramme) => {
    // Only navigate if route is provided from backend
    if (program.route && program.route.trim() !== "") {
      router.push(program.route);
    }
    // If no route is provided, the button will do nothing (as requested)
  };

  if (loading) {
    return (
      <div className="programs-section">
        <Container>
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="programs-section">
        <Container>
          <div className="text-center py-5">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="programs-section">
      <Container>
        <Row className="mt-5">
          {programs.map((program, index) => (
            <Col md={4} className="mb-4" key={program.id || index}>
              <div className="program-card">
                <div className="icon-wrapper mb-3">
                  {getIconForCategory(program.category || "Marketing")}
                </div>
                <Heading
                  text={program.title}
                  color="tricolor"
                  className="font-bold md:leading-[0.5] leading-[1.1] !text-2xl"
                />
                <p>{program.description}</p>
                <div className="duration">{program.duration} months</div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleProgramClick(program)}
                  disabled={!program.route || program.route.trim() === ""}
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
