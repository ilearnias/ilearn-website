"use client";
import React, { useEffect } from 'react';
import './styles.scss';
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";

const ProgramsSection = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.program-card');
    const exploreButton = document.querySelector('.explore-button');

    const handleMouseMove = (e: MouseEvent, element: Element) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      (element as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (element as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    };

    const mouseHandlers = new Map<Element, (e: Event) => void>();

    const addMouseHandler = (element: Element) => {
      const handler = (e: Event) => handleMouseMove(e as MouseEvent, element);
      mouseHandlers.set(element, handler);
      element.addEventListener('mousemove', handler);
    };

    cards.forEach(addMouseHandler);
    if (exploreButton) {
      addMouseHandler(exploreButton);
    }

    return () => {
      mouseHandlers.forEach((handler, element) => {
        element.removeEventListener('mousemove', handler);
      });
    };
  }, []);

  return (
    <div className="programs-section">
      <Container>
        <div className="section-header">
          <Heading 
            text={<><span className="text-primary">Our</span> <span className="text-accent">Programs</span></>}
            className="!text-center !mb-4"
            animate={true}
          />
          <p className="description">
            Specialized training programs designed for your success in civil service examinations with proven results.
          </p>
        </div>

        <div className="programs-grid  p-0 md:p-4">
          <div className="program-card">
            <div className="icon">
              <i className="fas fa-university"></i>
            </div>
            <div className="content">
              <Heading 
                text={<>Prelims Cum Mains <span className="highlight">(PCM Program)</span></>}
                className="!text-xl !font-semibold !leading-normal"
              />
              <p>
                Comprehensive classroom program covering both preliminary and main examinations with proven methodology.
              </p>
              <div className="program-details">
                <div className="duration">
                  <i className="far fa-clock"></i> 12 months
                </div>
                <a href="#" className="view-details">View Program Details</a>
              </div>
            </div>
          </div>

          <div className="program-card ">
            <div className="icon">
              <i className="fas fa-newspaper"></i>
            </div>
            <div className="content">
              <Heading 
                text={<>Current Affairs and News Analysis <span className="highlight">(CANA)</span></>}
                className="!text-xl !font-semibold !leading-normal"
              />
              <p>
                Stay updated with the latest current affairs and develop analytical skills essential for UPSC examinations.
              </p>
              <div className="program-details">
                <div className="duration">
                  <i className="far fa-clock"></i> 6 months
                </div>
                <a href="#" className="view-details">View Program Details</a>
              </div>
            </div>
          </div>
        </div>

        <div className="explore-more">
          <a href="/programs" className="explore-button">
            <span>Explore All Programs</span> <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </Container>
    </div>
  );
};

export default ProgramsSection; 