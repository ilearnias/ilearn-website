"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import YouTube from "react-youtube";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/reset.css";
import Container from "@/components/common/Container";
import { getTestimonials } from "@/services/media.service";
import { Fade } from "react-awesome-reveal";

// Types
export interface TestimonialItem {
  id: string;
  description: string;
  video: string;
  isActive: boolean;
  isTestimonial: boolean;
  order: number;
}
interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

// Utility to extract YouTube videoId from a URL or take directly if provided
const getVideoId = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : url;
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials: propTestimonials,
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (propTestimonials) {
        setTestimonials(propTestimonials);
      } else {
        const data = await getTestimonials();
        setTestimonials(data.filter((item: TestimonialItem) => item.isActive));
      }
    };
    fetchTestimonials();
  }, [propTestimonials]);

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
    nextArrow: (
      <button
        type="button"
        className="slick-arrow slick-next !right-2 !md:right-4 !z-10 !top-1/2 !-translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow hover:bg-gray-100 flex items-center justify-center"
        aria-label="Next"
      >
        <svg
          className="w-4 h-4 md:w-7 md:h-7 text-[#dc2626]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
            fill="currentColor"
          />
        </svg>
      </button>
    ),
    prevArrow: (
      <button
        type="button"
        className="slick-arrow slick-prev !left-2 !md:left-4 !z-10 !top-1/2 !-translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow hover:bg-gray-100 flex items-center justify-center"
        aria-label="Previous"
      >
        <svg
          className="w-4 h-4 md:w-7 md:h-7 text-[#dc2626]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            fill="currentColor"
          />
        </svg>
      </button>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-6 flex justify-center">{dots}</div>
    ),
  };

  return (
    <section className="bg-gray-50 py-16">
      <Container>
        <Fade>
          <div className="_heading-box">
            <div className="_heading-box-title1">Student Testimonials</div>
            <div className="_heading-box-sub-title1">
              Hear success stories from our students
            </div>
          </div>
        </Fade>

        <div className="relative justify-center max-w-[1700px] mx-auto px-2 sm:px-4 md:px-16 ">
          <Slider {...sliderSettings} className="!w-full !p-0 !m-0">
            {testimonials.map((item, index) => (
              <div key={index} className=" px-2">
                <div className="w-full  rounded-xl overflow-hidden shadow aspect-video bg-white flex flex-col">
                  <div
                    className="relative w-full h-0"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <YouTube
                      videoId={getVideoId(item.video)}
                      className="absolute top-0 left-0 w-full h-full"
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: { autoplay: 0 },
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-lg font-semibold">
                      {item.description || "Testimonial"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
