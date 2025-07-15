"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import VideoCard2 from "@/components/common/vediocard2";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
import { Avatar, Card, message } from "antd";
import { Meta } from "antd/es/list/Item";
import YouTube from "react-youtube";
import axios from "axios";
import { mediaService } from "@/services/media.service";

// Types for API response
interface MediaItem {
  id: string;
  description: string;
  video: string;
  isActive: boolean;
  isTestimonial: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

interface MediaResponse {
  status: boolean;
  message: string;
  data: MediaItem[];
  meta: {
    limit: number;
    itemCount: number;
    page: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

const MediaSection = () => {
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [startIndex, setStartIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = React.useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false });

  // useEffect(() => {
  //   const fetchMediaData = async () => {
  //     try {
  //       setError(null);
  //       const response = await axios.get<MediaResponse>(
  //         "https://ilearn-server.bairuhatech.com/v1/media",
  //         {
  //           params: {
  //             page: 1,
  //             limit: 10,
  //             isTestimonial: false,
  //           },
  //         }
  //       );

  //       if (!response.data.status) {
  //         throw new Error(
  //           response.data.message || "Failed to fetch media data"
  //         );
  //       }

  //       // Filter out inactive videos
  //       const activeVideos = response.data.data.filter(
  //         (video) => video.isActive
  //       );
  //       setVideos(activeVideos);
  //     } catch (error) {
  //       console.error("Error fetching media data:", error);
  //       setError("Failed to load media content. Please try again later.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchMediaData();
  // }, []);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      // setLoading(true);
      const response: any = await mediaService.getAllMedia(1, 10, false);
      console.log("response", response?.data);
      if (response.status) {
        setVideos(response.data || response.data);
        // setTotalItems(response.data.total || response.data.length);
      } else {
        console.error(response.message || "Failed to fetch media");
      }
    } catch (error: any) {
      // message.error(error.message || "Failed to fetch media");
      console.error("Error fetching media:", error);
    } finally {
      // setLoading(false);
    }
  };

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

  const getVideoId = (url: string) => {
    try {
      // Check if it's a YouTube URL
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        // Handle youtube.com URLs
        if (url.includes("youtube.com")) {
          const urlParams = new URLSearchParams(new URL(url).search);
          return urlParams.get("v") || "";
        }
        // Handle youtu.be URLs
        if (url.includes("youtu.be")) {
          return url.split("youtu.be/")[1]?.split("?")[0] || "";
        }
      }
      // For non-YouTube URLs, return the full URL
      return url;
    } catch (error) {
      console.error("Error parsing video URL:", error);
      return url;
    }
  };

  const getCurrentVideos = () => {
    if (isMobile && !isExpanded) {
      return videos.length > 0 ? [videos[startIndex]] : [];
    }

    if (isMobile && isExpanded) {
      return videos;
    }

    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % videos.length;
      if (videos[index]) {
        result.push(videos[index]);
      }
    }
    return result;
  };

  // if (isLoading) {
  //   return (
  //     <section className="bg-gray-50 py-16">
  //       <Container className="!w-full">
  //         <div className="text-center">
  //           <div className="animate-pulse">Loading media content...</div>
  //         </div>
  //       </Container>
  //     </section>
  //   );
  // }

  const TeamName = (name: any) => {
    return <div className="_team_name_txt">{name}</div>;
  };

  if (error) {
    return (
      <section className="bg-gray-50 py-16">
        <Container className="!w-full">
          <div className="text-center text-red-600">{error}</div>
        </Container>
      </section>
    );
  }

  if (!videos.length) {
    return (
      <section className="bg-gray-50 py-16">
        <Container className="!w-full">
          <div className="text-center text-gray-600">
            No media content available.
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 scroll-mt-16">
      <Container className="!w-full">
        <Fade direction="up" duration={1000}>
          <div className="_heading-box">
            <div className="_heading-box-title1">Media Coverage</div>
            <div className="_heading-box-sub-title1">iLearn in the News</div>
          </div>
        </Fade>

        <Row>
          {videos.map((item: any) => (
            <Col md={4} key={item.id}>
              <Fade direction="up" duration={1000}>
                <Card
                  style={{
                    width: "100%",
                    borderRadius: "15px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    border: "none",
                  }}
                  cover={
                    <YouTube
                      videoId={"zLwkn6BLJ4U"}
                      opts={{
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        width: "100%",
                        height: "250px",
                        playerVars: {
                          autoplay: 0,
                        },
                      }}
                    />
                  }
                >
                  <Meta title={TeamName(item.description)} />
                </Card>
              </Fade>
            </Col>
          ))}
        </Row>

        {/* <motion.div
          ref={containerRef}
          className="relative max-w-[1200px] mx-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: isInView ? 0 : 100,
            opacity: isInView ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full"> */}
        {/* {videos.length > 3 && !isMobile && (
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
            )} */}

        {/* {!isMobile && (
              <div className="hidden md:block">
                <VideoCard2
                  videos={videos.map((item: any) => ({
                    title: item.description || "Video",
                    subtitle: "",
                    youtubeUrl: item.video,
                    videoId: getVideoId(item.video),
                  }))}
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
                      videos={videos.map((item) => ({
                        title: item.description || "Video",
                        subtitle: "",
                        youtubeUrl: item.video,
                        videoId: getVideoId(item.video),
                      }))}
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

                {videos.length > 1 && (
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
              </>
            )} */}
        {/* </div>
        </motion.div> */}
      </Container>
    </section>
  );
};

export default MediaSection;
