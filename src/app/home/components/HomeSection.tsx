"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import SubText from "@/components/common/SubText";
import Container from "@/components/common/Container";
import YouTube from "react-youtube";

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
      <Container className="w-full">
        <div className="content-wrapper w-full flex ">
          <div className="text-content ">
            <div className="heading-group">
              <Heading
                color="red"
                text={
                  <>
                    <span>We don&apos;t claim</span>
                    <br />
                    <span>results,</span>
                    <br />
                    <span style={{ color: "#20468d" }}>we make </span>
                    <span style={{ color: "#20468d" }}>genuine</span>
                    <br />
                    <span style={{ color: "#20468d" }}>results.</span>
                  </>
                }
                animate={true}
                className="md:block hidden leading-[1.1] font-bold"
              />
              <Heading
                text={
                  <>
                    <span>We don&apos;t claim</span>
                    <br />
                    <span>results, We</span>
                    <br />
                    <span style={{ color: "#20468d" }}>make genuine</span>{" "}
                    <br />
                    <span style={{ color: "#20468d" }}>results.</span>
                  </>
                }
                color="red"
                animate={true}
                className=" leading-[1.1] font-bold md:hidden"
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
          <div className={`video-container ${isVisible ? "visible" : ""}`}>
            <YouTube
              videoId="NVGwwVzTeJU"
              opts={{ width: "100%", height: "100%" }}
            />
            {/* <iframe
              src="https://www.youtube.com/embed/zLwkn6BLJ4U?si=xLhAKmAGK-Ay5YQA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onError={(e) => {
                console.error("Video failed to load:", e);
              }}
            /> */}
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
