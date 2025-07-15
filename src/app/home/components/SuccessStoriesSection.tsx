//600x800
"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import "./styles.scss";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { usePathname } from "next/navigation";
import {
  successStoryService,
  ISuccessStory,
} from "@/services/success-stories.service";

interface SuccessStory {
  name: string;
  achievement: string;
  imageUrl: string | null;
  caption: string;
}

const SuccessStoriesSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        setLoading(true);
        const response = await successStoryService.getAllSuccessStories();
        console.log("Success stories API response:", response);

        if (response.status && response.data) {
          // Transform API data to match component interface
          const transformedStories: SuccessStory[] = response.data
            .filter((story: ISuccessStory) => story.isActive && story.name)
            .map((story: ISuccessStory) => ({
              name: story.name || "Anonymous",
              achievement: story.description || "Achievement",
              imageUrl: story.image || null,
              caption: story.details || "Success story",
            }));
          console.log("Transformed stories:", transformedStories);
          setSuccessStories(transformedStories);
        } else {
          console.log("No data in response or status is false");
          // Fallback to hardcoded data if API fails
          setSuccessStories([
            {
              name: "Dr. Akshay Raj P",
              achievement: "UPSC Success - First Attempt",
              imageUrl: null,
              caption:
                "Cracked UPSC in his very first attempt from our PCM Classroom Program",
            },
            {
              name: "Dr. Vineeth Lohidakshan",
              achievement: "AIR 169 - First Attempt",
              imageUrl: null,
              caption:
                "Consistent hard work and focused study helped achieve AIR 169",
            },
            {
              name: "Rahul Raghavan",
              achievement: "AIR 404 - 6th Attempt",
              imageUrl: null,
              caption:
                "Persistence and determination finally paid off with AIR 404",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching success stories:", error);
        // Fallback to hardcoded data if API fails
        setSuccessStories([
          {
            name: "Dr. Akshay Raj P",
            achievement: "UPSC Success - First Attempt",
            imageUrl: null,
            caption:
              "Cracked UPSC in his very first attempt from our PCM Classroom Program",
          },
          {
            name: "Dr. Vineeth Lohidakshan",
            achievement: "AIR 169 - First Attempt",
            imageUrl: null,
            caption:
              "Consistent hard work and focused study helped achieve AIR 169",
          },
          {
            name: "Rahul Raghavan",
            achievement: "AIR 404 - 6th Attempt",
            imageUrl: null,
            caption:
              "Persistence and determination finally paid off with AIR 404",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchSuccessStories();
    }
  }, [isClient]);

  const scrollToNext = () => {
    if (!carouselRef.current || !isClient) return;

    const containerWidth = carouselRef.current.offsetWidth;
    const scrollAmount = Math.min(containerWidth, 320); // Use container width or max card width
    const newScrollLeft = carouselRef.current.scrollLeft + scrollAmount;

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
    setCurrentIndex((prev) => Math.min(prev + 1, successStories.length - 1));
  };

  const scrollToPrev = () => {
    if (!carouselRef.current || !isClient) return;

    const containerWidth = carouselRef.current.offsetWidth;
    const scrollAmount = Math.min(containerWidth, 320); // Use container width or max card width
    const newScrollLeft = carouselRef.current.scrollLeft - scrollAmount;

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <div className="success-stories-section">
        <Container noPadding className="mx-0 md:mx-4">
          <div className="section-header">
            <Heading
              color="tricolor"
              text={
                <>
                  <span >Success</span>
                  <span> Stories</span>
                </>
              }
              size="3xl"
              className="!text-center !mb-2"
              animate={true}
            />
            <p className="subtitle">
              See how our students achieved remarkable results in the civil
              services examination
            </p>
          </div>
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading success stories...</div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="success-stories-section ">
      <Container noPadding className="mx-0 md:mx-4 ">
        <div className="section-header">
          <Heading
            color="tricolor"
            text="Success Stories"
           
            className="!text-center !text-[40px] !mb-2"
            animate={true}
          />
          <p className="subtitle">
            See how our students achieved remarkable results in the civil
            services examination
          </p>
        </div>

        {successStories.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">No success stories available</div>
          </div>
        ) : (
          <div className="stories-carousel p-0 ">
            {isClient && (
              <>
                <button
                  className="nav-button prev md:hidden"
                  onClick={scrollToPrev}
                  aria-label="Previous story"
                  style={{ display: currentIndex === 0 ? "none" : "flex" }}
                >
                  <span>‹</span>
                </button>
                <button
                  className="nav-button next md:hidden"
                  onClick={scrollToNext}
                  aria-label="Next story"
                  style={{
                    display:
                      currentIndex === successStories.length - 1
                        ? "none"
                        : "flex",
                  }}
                >
                  <span>›</span>
                </button>
              </>
            )}
            <div
              className="flex px-10 md:pl-0  gap-[77px] md overflow-x-auto scroll-smooth scrollbar-none"
              ref={carouselRef}
            >
              {successStories.map((story: SuccessStory, index: number) => (
                <div key={`${story.name}-${pathname}`} className="story-card ">
                  <div className="success-badge">SUCCESS</div>
                  <div className="image-container">
                    {story.imageUrl ? (
                      <Image
                        src={story.imageUrl}
                        alt={story.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 280px, 300px"
                        priority={index < 3}
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="text-overlay">
                    <Heading
                      color="white"
                      text={story.name}
                      size="sm"
                      className="!mb-1"
                    />
                    <p className="achievement">{story.achievement}</p>
                    <p className="caption">{story.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SuccessStoriesSection;
