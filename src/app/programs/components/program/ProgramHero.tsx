"use client";

import React from "react";
import { Container } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './styles/programHero.scss';

export interface ProgramHeroProps {
  title: string;
  shortName: string;
  description: string;
  duration: string;
  bgColor?: string;
  textColor?: string;
}

const ProgramHero: React.FC<ProgramHeroProps> = ({
  title,
  shortName,
  description,
  duration,
  bgColor = "#f8f9fa",
  textColor = "text-gray-800"
}) => {
  return (
    <div className="program-hero bg-gray-900">
      <Container>
        <Fade direction="up">
          <div className="hero-content">
            <h1 className="hero-title text-white">{title}</h1>
            <p className="hero-subtitle text-gray-300">{description}</p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                Join {shortName}
              </button>
              <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

export default ProgramHero; 