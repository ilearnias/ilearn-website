"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";

import Container from "@/components/common/Container";
import YouTube from "react-youtube";
import { useRouter } from "next/navigation";

const HomeSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const router = useRouter();

  const handleExploreClick = () => {
    router.push("./programs");
  };

  const handleAboutClick = () => {
    router.push("./about");
  };

  return (
    <div className="home-section !mt-0 ! pt-0 !flex !flex-col !items-center !justify-center w-full">
      <Container className="w-full">
        <div className="content-wrapper w-full flex ">
          <div className={`video-container md:hidden block ${isVisible ? "visible" : ""}`}>
            {/* Mobile vedio */}


            <YouTube
              videoId="NVGwwVzTeJU"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  loop: 1,
                  autoplay: 1,
                  playlist: "NVGwwVzTeJU",
                  controls: 0,
                  mute: 1,
                  rel: 0,
                  showinfo: 0,
                  modestbranding: 1,
                },
              }}
              onEnd={() => {
                // This ensures the video restarts when it ends
                const iframe = document.querySelector('iframe[src*="youtube"]');
                if (iframe) {
                  const src = iframe.getAttribute("src");
                  if (src) {
                    iframe.setAttribute("src", src);
                  }
                }
              }}
            />

          </div>
          <div className="text-content ">
            <div className="heading-group">
              {/* Mobile */}
              <Heading
                color="red"
                text={
                  <>
                    <span>We don&apos;t claim</span>
                    <br />
                    <span>results,</span>
                    <br />
                    <span style={{ color: "#20468d" }}>We make </span>
                    <span style={{ color: "#20468d" }}>genuine</span>
                    <br />
                    <span style={{ color: "#20468d" }}>results.</span>
                  </>
                }
                animate={true}
             
                className="!text-[4rem] md:block hidden leading-[1.1]"
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
                
                className="leading-[1.1] block !text-[2.8rem] md:hidden"
              />
            </div>
            <SubHeading
              text="Kerala's highest Prelims-cum-Mains & Classroom program success rate.
              "
              animate={true}
              delay={0.4}
              className="!text-[#1F2937] !font-light !text-[16px] !m-0 !p-0"
            />
            <SubHeading
              text="
              343 Selections in 10 years."
              animate={true}
              delay={0.4}
              className="!text-[#1F2937] !font-light !text-[16px] !m-0 !p-0"
            />
            <div className="buttons !m-0 !pt-2">
              <button
                onClick={handleExploreClick}
                className="secondary-btn !text-white !bg-blue-600"
              >
                Explore  Programs 
              </button>
              <button
                onClick={handleAboutClick}
                className="!border-2 !border-blue-600 secondary-btn bg-transparent"
              >
                About Us
              </button>
            </div>
          </div>
          {/* Desktop vedio */}
          <div className={`video-container ${isVisible ? "visible" : ""}`}>
            <div className="md:block hidden">

              <YouTube
                videoId="NVGwwVzTeJU"
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    loop: 1,
                    autoplay: 1,
                    playlist: "NVGwwVzTeJU",
                    controls: 0,
                    mute: 1,
                    rel: 0,
                    showinfo: 0,
                    modestbranding: 1,
                  },
                }}
                onEnd={() => {
                  // This ensures the video restarts when it ends
                  const iframe = document.querySelector('iframe[src*="youtube"]');
                  if (iframe) {
                    const src = iframe.getAttribute("src");
                    if (src) {
                      iframe.setAttribute("src", src);
                    }
                  }
                }}
              />
            </div>

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
