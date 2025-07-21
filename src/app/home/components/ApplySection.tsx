"use client";
import React from "react";
import "./styles.scss";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { FaPhone } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";

const ApplySection = () => {
  return (
    <div className="apply-section">
      <Container>
        <div className="apply-content">
          {/* Left: Text and Buttons */}
          <div className="apply-text">
            <Heading
              text={
                <>
                  Ready to Begin Your{" "}
                  <span className="underline">Civil Service</span> Journey?
                </>
              }
              className="text-white !text-2xl md:!text-3xl lg:!text-4xl !mb-4 poppins-bold"
              animate={true}
            />
            <p>
              Join Kerala&apos;s most trusted civil service coaching institute.
              Schedule a free counseling session with our experts to discuss
              your preparation strategy.
            </p>
            <div className="cta-buttons exact-clone">
              <Button
                variant="primary"
                className="apply-primary-btn exact-clone-btn"
                icon={<FaPhone size={12} />}
              >
                Book a Counselling Call
              </Button>
              <Button
                variant="secondary"
                className="apply-secondary-btn exact-clone-btn"
                icon={<HiDownload size={13} />}
              >
                Download iLearn IAS App
              </Button>
            </div>
          </div>
          {/* Right: Image, Tag, Stats */}
          <div className="apply-image-stats">
            <div className="apply-image-container exact-clone-img">
              <img
                src="/ilearn/handshake.jpg"
                alt="Handshake"
                className="apply-image"
              />
              <div className="free-counselling-tag exact-clone-tag">
                Free Counselling
              </div>
            </div>
            <div className="apply-stats-buttons">
              <button className="apply-stat-btn">343+ Selections</button>
              <button className="apply-stat-btn">10+ Years Experience</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ApplySection;
