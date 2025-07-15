"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import { Container, Row, Col } from "react-bootstrap";
import Heading from "@/components/common/Heading";
import "./styles.scss";
import { useRouter } from "next/navigation";

export default function FoundationProgram() {
  const buttons = (
    <div className="flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Join Foundation Course
      </button>
      <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
        Learn More
      </button>
    </div>
  );

  const router = useRouter();

  return (
    <div className="program-page">
      <Header />
      <HeroSection
        className="font-bold"
        titleClassName="font-bold"
        title="Foundation Course"
        description="Build a strong foundation for your UPSC preparation journey"
        buttons={buttons}
      />
      <div className="">
        <br />
        <br />
        <Container>
          <Row>
            <Col md={2} className="mb-4" />
            <Col md={4} className="mb-4">
              <div className="program-card">
                <div className="icon-wrapper mb-3"></div>
                <Heading
                  text={"iLearn IAS Ignite"}
                  color="tricolor"
                  className="font-bold md:leading-[0.5] leading-[1.1] !text-2xl text-center"
                />
                <p>An Exclusive UPSC Foundation Program for College Students</p>
                <div className="duration">{"10 months"}</div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => router.replace("/foundation/ignite")}
                >
                  View Program Details
                </button>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="program-card">
                <div className="icon-wrapper mb-3"></div>
                <Heading
                  text={"iLearn IAS Junior"}
                  color="tricolor"
                  className="font-bold md:leading-[0.5] leading-[1.1] !text-2xl text-center"
                />
                <p>
                  A Flagship IAS Skill Development Program for School Students
                </p>
                <div className="duration">{"10 months"}</div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => router.replace("/foundation/junior")}
                >
                  View Program Details
                </button>
              </div>
            </Col>
            <Col md={2} className="mb-4" />
          </Row>
        </Container>
        <br />
      </div>
    </div>
  );
}
