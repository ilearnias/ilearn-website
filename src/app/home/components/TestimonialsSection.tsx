"use client";
import React, { useState, useRef } from "react";
import { AnimatePresence, useInView, motion } from "framer-motion";
import "./styles.scss";
import Heading from "@/components/common/Heading";
import SubText from "@/components/common/SubText";
import Container from "@/components/common/Container";
import VideoCard from "@/components/common/VideoCard";
import { useMediaQuery } from "react-responsive";

export interface TestimonialItem {
  id: string;
  title: string;
  subtitle: string;
  videoId: string;
  thumbnailUrl: string;
}

// Sample testimonial data
const testimonialItems: TestimonialItem[] = [
  {
    id: "1",
    title: "From Aspirant to IAS Officer",
    subtitle:
      "Listen to Priya's inspiring journey from a small town to becoming an IAS officer. Her dedication and our guidance made her dream come true.",
    videoId: "Y8Tko2YC5hA",
    thumbnailUrl: "https://img.youtube.com/vi/Y8Tko2YC5hA/maxresdefault.jpg",
  },
  {
    id: "2",
    title: "Cracking UPSC in First Attempt",
    subtitle:
      "Rahul shares his strategy and experience of clearing UPSC in his very first attempt with AIR under 100.",
    videoId: "jNQXAC9IVRw",
    thumbnailUrl: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
  },
  {
    id: "3",
    title: "Journey to Indian Foreign Service",
    subtitle:
      "Watch how Meera's persistent effort and our mentorship helped her achieve her dream of joining the Indian Foreign Service.",
    videoId: "M7lc1UVf-VE",
    thumbnailUrl: "https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
  },
];

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

const TestimonialsSection: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleVideoClick = (videoId: string) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  const nextSlide = () => {
    setDirection("right");
    setActiveVideo(null);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection("left");
    setActiveVideo(null);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const dropdownVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section className="bg-gray-50 py-16">
      <Container>
        <div className="text-center mb-12">
          <Heading
            text="Student Testimonials"
            color="tricolor"
            animate={true}
            className={`font-bold mb-4 ${isMobile ? "leading-[1.1]" : ""}`}
          />
          <SubText
            text="Hear success stories from our students"
            className="!text-gray-600 !font-light !text-lg !leading-relaxed"
          />
        </div>

        {isMobile ? (
          <div className="relative max-w-[600px] mx-auto space-y-4">
            {testimonials.map((item) => (
              <div key={item.id} className="relative mb-4">
                <motion.button
                  className="w-full p-4 bg-white rounded-t-lg shadow-md flex items-center justify-between"
                  onClick={() => toggleDropdown(item.id)}
                  animate={{
                    backgroundColor:
                      openDropdownId === item.id ? "#F3F4F6" : "#FFFFFF",
                  }}
                >
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                  <motion.svg
                    className="w-6 h-6 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    animate={{ rotate: openDropdownId === item.id ? 180 : 0 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {openDropdownId === item.id && (
                    <motion.div
                      className="w-full bg-white rounded-b-lg shadow-lg overflow-hidden"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            type: "spring" as const,
                            stiffness: 300,
                            damping: 24,
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: {
                            type: "spring" as const,
                            stiffness: 300,
                            damping: 24,
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <VideoCard
                          id={item.id}
                          title={item.title}
                          subtitle={item.subtitle}
                          videoUrl={
                            activeVideo === item.videoId
                              ? `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`
                              : item.thumbnailUrl
                          }
                          thumbnailUrl={item.thumbnailUrl}
                          isPlaying={activeVideo === item.videoId}
                          onVideoClick={() => {
                            handleVideoClick(item.videoId);
                            toggleDropdown(item.id);
                          }}
                          direction={direction}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            ref={containerRef}
            className="relative max-w-[1100px] mx-auto"
            initial={{ x: -300, opacity: 0 }}
            animate={{
              x: isInView ? 0 : -300,
              opacity: isInView ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative px-16 md:px-24">
              <button
                className="absolute -left-4 md:left-2 top-[45%] -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all z-10"
                onClick={prevSlide}
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-7 h-7 text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>

              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  {testimonials.map(
                    (item, index) =>
                      index === currentIndex && (
                        <VideoCard
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          subtitle={item.subtitle}
                          videoUrl={
                            activeVideo === item.videoId
                              ? `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`
                              : item.thumbnailUrl
                          }
                          thumbnailUrl={item.thumbnailUrl}
                          isPlaying={activeVideo === item.videoId}
                          onVideoClick={() => handleVideoClick(item.videoId)}
                          direction={direction}
                        />
                      )
                  )}
                </AnimatePresence>
              </div>

              <button
                className="absolute -right-4 md:right-2 top-[45%] -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all z-10"
                onClick={nextSlide}
                aria-label="Next testimonial"
              >
                <svg
                  className="w-7 h-7 text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-indigo-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? "right" : "left");
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default TestimonialsSection;
