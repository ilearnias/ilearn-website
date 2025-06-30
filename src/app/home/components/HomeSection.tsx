"use client";
import React, { useEffect, useState } from 'react';
import './styles.scss';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/SubHeading';
import SubText from '@/components/common/SubText';
import Container from "@/components/common/Container";

const HomeSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after the loader is expected to disappear
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Matches the loader timeout

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-section !flex !flex-col !items-center !justify-center w-full">
      <Container className='w-full'>
        <div className="content-wrapper w-full flex ">
          <div className="text-content ">
            <div className="heading-group">
              <Heading 
                text={
                  <>
                    <span>We don't claim</span><br />
                    <span>results,</span><br />
                    <span>we make </span>
                    <span>genuine</span><br />
                    <span>results.</span>
                  </>
                }
                color="black"
                animate={true}
                className="text-[#1F2937] font-bold"
              />
            </div>
            <SubHeading
              text="Kerala's highest Prelims-cum-Mains & Classroom program success rate."
              animate={true}
              delay={0.4}
              className="!text-[#1F2937] !font-light !text-[16px] !m-0 !p-0"
            />
            <SubText
              text="343 Selections in 10 years."
              size="large"
              animate={true}
              delay={0.6}
              className="!text-[#1F2937] !font-light !text-[16px]"
            />
            <div className="buttons !m-0 !p-0">
              <button className="secondary-btn !text-white !bg-blue-600">
                Explore Programs
              </button>
              <button className="!border-2 !border-blue-600 secondary-btn bg-transparent">
                About Us
              </button>
            </div>
          </div>
          <div className={`video-container ${isVisible ? 'visible' : ''}`}>
            <iframe
              src="https://www.youtube.com/embed/3FdY6vrK4y8?si=5z6YSsX-OOz9-UuB&enablejsapi=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onError={(e) => {
                console.error('Video failed to load:', e);
              }}
            />
            {!isVisible && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeSection; 