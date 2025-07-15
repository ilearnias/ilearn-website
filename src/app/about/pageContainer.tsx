"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import JourneySection from "./components/JourneySection";
import CoreValuesSection from "./components/CoreValuesSection";
import TeamSection from "./components/TeamSection";
import MediaSection from "../home/components/MediaSection";
import BeginJourneySection from "./components/BeginJourneySection";
import ImageCarouselSection from "./components/ImageCarouselSection";
import { Col, Row, Container } from "react-bootstrap";
import Image from "next/image";
import Classroom from "../assets/images/classroom.jpg";
import { Fade } from "react-awesome-reveal";
import { FaAward } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiBuildingsFill } from "react-icons/pi";
import { BsFillAwardFill } from "react-icons/bs";

const PageContainer = () => {
  return (
    <div className="about-Container">
      <Header />

      <div className="_banner-box1">
        <Fade direction="up" duration={1000}>
          <div className="_banner-header-txt1">
            {/* <span style={{ color: "#dc2626" }}>About</span> Us */}
            About Us
          </div>
        </Fade>

        <Fade direction="up" duration={1000}>
          <div className="_banner-sub-header-txt1">
            {`Discover the story behind iLearn's journey in shaping civil service
          aspirants. We're committed to excellence, innovation, and your success
          in the UPSC examination.`}
          </div>
        </Fade>
      </div>

      {/* <br />
      <br />
      <br /> */}
      <Container>
        <Row>
          <Col md={6}>
            <div className="_about_box_4">
              <div className="_about-us-box1-title1">
                {`Since 2015, iLearn has been transforming dreams into reality, redefining civil service coaching with trust, innovation, and care. We're not just an institute but an extended family, offering academic excellence through:`}
              </div>

              <div className="_about_box_1">
                <div className="_about_box_2">
                  <div className="_about_icon_1">
                    <FaAward size={20} color="#20468d" />
                  </div>
                  <div className="_about_txt_1">
                    <span className="_about_txt_2">Personal mentorship</span>{" "}
                    tailored to individual learning needs
                  </div>
                </div>

                <div className="_about_box_2">
                  <div className="_about_icon_1">
                    <FaHeartbeat size={20} color="#20468d" />
                  </div>
                  <div className="_about_txt_1">
                    <span className="_about_txt_2">Continuous support</span>{" "}
                    throughout the UPSC preparation journey
                  </div>
                </div>

                <div className="_about_box_2">
                  <div className="_about_icon_1">
                    <FaRegCalendarCheck size={20} color="#20468d" />
                  </div>
                  <div className="_about_txt_1">
                    <span className="_about_txt_2">
                      Integrated learning routine
                    </span>{" "}
                    designed for optimal progress
                  </div>
                </div>

                <div className="_about_box_2">
                  <div className="_about_icon_1">
                    <PiBuildingsFill size={20} color="#20468d" />
                  </div>
                  <div className="_about_txt_1">
                    <span className="_about_txt_2">Supportive environment</span>{" "}
                    that nurtures every aspirant&apos;s journey
                  </div>
                </div>
              </div>

              <div className="_about_box_8">
                <div className="_about_box_3">
                  <div className="_about_box_5">
                    <div
                      className="_about_box_6"
                      style={{ backgroundColor: "#eef2ff" }}
                    >
                      <BsFillAwardFill size={20} color="#20468d" />
                    </div>
                    <div className="_about_box_7">
                      <div className="_about_txt_3">Exceptional Results</div>
                      <div className="_about_txt_4">
                        Consistently producing top UPSC rankers every year
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="_about_box_3">
                  <div className="_about_box_5">
                    <div
                      className="_about_box_6"
                      style={{ backgroundColor: "#ffeef0" }}
                    >
                      <BsFillAwardFill size={20} color="#20468d" />
                    </div>
                    <div className="_about_box_7">
                      <div className="_about_txt_3">Student-First Approach</div>
                      <div className="_about_txt_4">
                        Personalized mentoring with focus on holistic
                        development
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <Fade direction="up" duration={1000}>
              <Image
                src={Classroom}
                alt="classroom"
                width={500}
                height={500}
                className="_about-us-img"
              />
            </Fade>
          </Col>
        </Row>
        <br />
      </Container>

      {/* <ImageCarouselSection /> */}
      <JourneySection />
      <CoreValuesSection />
      <TeamSection />
      <MediaSection />
      <BeginJourneySection />
    </div>
  );
};

export default PageContainer;
