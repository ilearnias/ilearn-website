"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import VideoCard2 from "@/components/common/vediocard2";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
import { Avatar, Card } from "antd";
import { Meta } from "antd/es/list/Item";
import YouTube from "react-youtube";

// Video data array with the provided YouTube videos
const videos = [
  {
    title: "iLearn IAS Academy - Success Stories",
    subtitle: "Learn more about our educational programs and success stories",
    youtubeUrl: "https://youtu.be/mu-eiYz9Ur8?si=npVhpO0o-NCOvzaf",
    videoId: "ZyAtOz00oEs",
  },
  {
    title: "UPSC Preparation Guide by iLearn",
    subtitle: "Discover our teaching methodology and approach",
    youtubeUrl: "https://youtu.be/mu-eiYz9Ur8?si=npVhpO0o-NCOvzaf",
    videoId: "ZyAtOz00oEs",
  },
  {
    title: "iLearn Academy Training Program",
    subtitle: "Student testimonials and achievements",
    youtubeUrl: "https://youtu.be/ZyAtOz00oEs",
    videoId: "ZyAtOz00oEs",
  },
  {
    title: "Civil Services Coaching Excellence",
    subtitle: "Advanced Learning Techniques",
    youtubeUrl: "https://www.youtube.com/watch?v=NEehMXQ0zdk",
    videoId: "ZyAtOz00oEs",
  },
];

const MediaSection = () => {
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [startIndex, setStartIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = React.useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleVideoClick = (index: number) => {
    setPlayingIndex(playingIndex === index ? -1 : index);
  };

  const handleNext = () => {
    setPlayingIndex(-1);
    setStartIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setPlayingIndex(-1);
    setStartIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleDropdownToggle = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);

    if (!newExpandedState && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const getCurrentVideos = () => {
    if (isMobile && !isExpanded) {
      return [videos[startIndex]];
    }

    if (isMobile && isExpanded) {
      return videos;
    }

    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % videos.length;
      result.push(videos[index]);
    }
    return result;
  };

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 scroll-mt-16">
      <Container className="!w-full">
        <div className="text-center mb-12">
          <Heading
            text="iLearn in Media"
            color="red"
            animate={true}
            className="font-bold mb-4"
          />
          <SubHeading
            text="Watch our featured videos and success stories"
            animate={true}
            delay={0.4}
            className="!text-gray-600 !font-light !text-lg !leading-relaxed"
          />
        </div>

        {/* <Fade>
          <Row>
            <Col md={4}>
              <Card
                style={{ width: "100%", borderRadius: "10px" }}
                cover={
                  <div className="media-card-box1">
                    <div className="media-card-box1-inner">
                      <YouTube
                        videoId="ZyAtOz00oEs"
                        opts={{
                          width: "100%",
                          height: "100%",
                          playerVars: {
                            modestbranding: 1,
                            rel: 0,
                          },
                        }}
                        className="youtube-box1"
                      />
                    </div>
                  </div>
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>

            <Col md={4}>
              <Card
                style={{ width: "100%" }}
                cover={
                  <div className="media-card-box1">
                    <div className="media-card-box1-inner">
                      <YouTube
                        videoId="ZyAtOz00oEs"
                        opts={{
                          width: "100%",
                          height: "100%",
                          playerVars: {
                            modestbranding: 1,
                            rel: 0,
                          },
                        }}
                        className="youtube-box1"
                      />
                    </div>
                  </div>
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>

            <Col md={4}>
              <Card
                style={{ width: "100%" }}
                cover={
                  <div className="media-card-box1">
                    <div className="media-card-box1-inner">
                      <YouTube
                        videoId="ZyAtOz00oEs"
                        opts={{
                          width: "100%",
                          height: "100%",
                          playerVars: {
                            modestbranding: 1,
                            rel: 0,
                          },
                        }}
                        className="youtube-box1"
                      />
                    </div>
                  </div>
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          </Row>
        </Fade> */}

        <motion.div
          ref={containerRef}
          className="relative max-w-[1200px] mx-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: isInView ? 0 : 100,
            opacity: isInView ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full">
            {videos.length > 3 && !isMobile && (
              <div className="hidden md:block">
                <button
                  onClick={handlePrev}
                  className="absolute -left-24 md:-left-26 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-110 z-10 flex items-center justify-center border border-gray-100"
                  aria-label="Previous videos"
                >
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute -right-24 md:-right-26 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-110 z-10 flex items-center justify-center border border-gray-100"
                  aria-label="Next videos"
                >
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {!isMobile && (
              <div className="hidden md:block">
                <VideoCard2
                  videos={getCurrentVideos()}
                  onVideoClick={(index) =>
                    handleVideoClick((startIndex + index) % videos.length)
                  }
                  playingIndex={
                    playingIndex !== -1
                      ? (playingIndex - startIndex + videos.length) %
                        videos.length
                      : -1
                  }
                />
              </div>
            )}

            {isMobile && (
              <>
                <div className="perspective-1000">
                  <motion.div
                    className="overflow-hidden origin-top"
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : "500px",
                    }}
                    transition={{
                      height: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                    }}
                  >
                    <VideoCard2
                      videos={[videos[startIndex]]}
                      onVideoClick={(index) =>
                        handleVideoClick((startIndex + index) % videos.length)
                      }
                      playingIndex={
                        playingIndex !== -1
                          ? (playingIndex - startIndex + videos.length) %
                            videos.length
                          : -1
                      }
                    />
                  </motion.div>
                </div>

                <div className="perspective-1000">
                  <motion.div
                    className="origin-top"
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{
                      rotateX: isExpanded ? 0 : -90,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1],
                      opacity: { duration: 0.3 },
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      display: isExpanded ? "block" : "none",
                    }}
                  >
                    {isExpanded && (
                      <VideoCard2
                        videos={videos.slice(1)}
                        onVideoClick={(index) => handleVideoClick(index + 1)}
                        playingIndex={playingIndex > 0 ? playingIndex - 1 : -1}
                      />
                    )}
                  </motion.div>
                </div>
              </>
            )}

            {isMobile && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleDropdownToggle}
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                  <svg
                    className={`ml-2 w-5 h-5 transform transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default MediaSection;
