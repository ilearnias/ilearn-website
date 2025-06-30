import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

interface ProgramDetailsProps {
  program: {
    title: string;
    shortName: string;
    description: string;
    duration: string;
    highlights: string[];
    curriculum: {
      title: string;
      topics: string[];
    }[];
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
    eligibility: string[];
    fees: {
      amount: string;
      includes: string[];
    };
    batches: {
      timing: string;
      startDate: string;
      mode: string;
    }[];
  };
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ program }) => {
  const { t } = useTranslation();

  return (
    <div className="program-details-page">
      <div className="program-header">
        <Container>
          <Fade>
            <h1>
              <span className="text-primary">{program.title}</span>
              <span className="program-short-name">({program.shortName})</span>
            </h1>
            <p className="lead">{program.description}</p>
            <div className="duration-badge">Duration: {program.duration}</div>
          </Fade>
        </Container>
      </div>

      <Container className="my-5">
        {/* Program Highlights */}
        <section className="program-section">
          <Fade>
            <h2>Program Highlights</h2>
            <Row>
              {program.highlights.map((highlight, index) => (
                <Col md={6} key={index} className="mb-3">
                  <div className="highlight-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{highlight}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Fade>
        </section>

        {/* Curriculum */}
        <section className="program-section">
          <Fade>
            <h2>Curriculum</h2>
            <div className="curriculum-content">
              {program.curriculum.map((module, index) => (
                <div key={index} className="curriculum-module">
                  <h3>{module.title}</h3>
                  <ul>
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Fade>
        </section>

        {/* Key Features */}
        <section className="program-section">
          <Fade>
            <h2>Key Features</h2>
            <Row>
              {program.features.map((feature, index) => (
                <Col md={4} key={index} className="mb-4">
                  <div className="feature-card">
                    <i className={feature.icon}></i>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Fade>
        </section>

        {/* Eligibility */}
        <section className="program-section">
          <Fade>
            <h2>Eligibility Criteria</h2>
            <ul className="eligibility-list">
              {program.eligibility.map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </Fade>
        </section>

        {/* Fees Structure */}
        <section className="program-section">
          <Fade>
            <h2>Fees Structure</h2>
            <div className="fees-card">
              <h3>Program Fee: {program.fees.amount}</h3>
              <h4>Fee Includes:</h4>
              <ul>
                {program.fees.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </Fade>
        </section>

        {/* Batch Details */}
        <section className="program-section">
          <Fade>
            <h2>Upcoming Batches</h2>
            <Row>
              {program.batches.map((batch, index) => (
                <Col md={4} key={index} className="mb-4">
                  <div className="batch-card">
                    <h4>Batch {index + 1}</h4>
                    <p><strong>Timing:</strong> {batch.timing}</p>
                    <p><strong>Start Date:</strong> {batch.startDate}</p>
                    <p><strong>Mode:</strong> {batch.mode}</p>
                    <button className="btn btn-primary mt-3">Enroll Now</button>
                  </div>
                </Col>
              ))}
            </Row>
          </Fade>
        </section>
      </Container>
    </div>
  );
};

export default ProgramDetails; 