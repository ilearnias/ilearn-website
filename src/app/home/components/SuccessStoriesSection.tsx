"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import './styles.scss';
import Container from "@/components/common/Container";
import { usePathname } from 'next/navigation';

interface SuccessStory {
  name: string;
  achievement: string;
  imageUrl: string;
  caption: string;
}

const successStories: SuccessStory[] = [
  {
    name: "Dr. Akshay Raj P",
    achievement: "UPSC Success - First Attempt",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Cracked UPSC in his very first attempt from our PCM Classroom Program"
  },
  {
    name: "Dr. Vineeth Lohidakshan",
    achievement: "AIR 169 - First Attempt",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Consistent hard work and focused study helped achieve AIR 169"
  },
  {
    name: "Rahul Raghavan",
    achievement: "AIR 404 - 6th Attempt",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Persistence and determination finally paid off with AIR 404"
  },
  {
    name: "Alex Abraham",
    achievement: "IPS Officer",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Dream of serving the nation as an IPS officer fulfilled"
  },
  {
    name: "Anjali Sharma",
    achievement: "AIR 235 - Second Attempt",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Focused preparation and strategic approach led to success"
  },
  {
    name: "Dr. Priya Kumar",
    achievement: "AIR 89 - First Attempt",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Balanced medical practice with UPSC preparation for remarkable success"
  },
  {
    name: "Mohammed Rafi",
    achievement: "IAS Officer - AIR 298",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Dedicated preparation with our guidance program paved the way"
  },
  {
    name: "Sneha Patel",
    achievement: "IFS Officer - AIR 122",
    imageUrl: "/Achiver images/dummy.jpg",
    caption: "Achieved dream of joining Indian Foreign Service through focused study"
  }
];

const SuccessStoriesSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToNext = () => {
    if (!carouselRef.current || !isClient) return;
    
    const containerWidth = carouselRef.current.offsetWidth;
    const scrollAmount = Math.min(containerWidth, 320); // Use container width or max card width
    const newScrollLeft = carouselRef.current.scrollLeft + scrollAmount;
    
    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    setCurrentIndex(prev => Math.min(prev + 1, successStories.length - 1));
  };

  const scrollToPrev = () => {
    if (!carouselRef.current || !isClient) return;
    
    const containerWidth = carouselRef.current.offsetWidth;
    const scrollAmount = Math.min(containerWidth, 320); // Use container width or max card width
    const newScrollLeft = carouselRef.current.scrollLeft - scrollAmount;
    
    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="success-stories-section ">
      <Container noPadding className="mx-0 md:mx-4 ">
        <div className="section-header">
          <h2>
            <span className="text-primary">Success</span>
            <span className="text-accent"> Stories</span>
          </h2>
          <p className="subtitle">
            See how our students achieved remarkable results in the civil services examination
          </p>
        </div>

        <div className="stories-carousel p-0 ">
          {isClient && (
            <>
              <button 
                className="nav-button prev md:hidden" 
                onClick={scrollToPrev}
                aria-label="Previous story"
                style={{ display: currentIndex === 0 ? 'none' : 'flex' }}
              >
                <span>‹</span>
              </button>
              <button 
                className="nav-button next md:hidden" 
                onClick={scrollToNext}
                aria-label="Next story"
                style={{ display: currentIndex === successStories.length - 1 ? 'none' : 'flex' }}
              >
                <span>›</span>
              </button>
            </>
          )}
          <div className="flex px-10 md:pl-0  gap-[77px] md overflow-x-auto scroll-smooth scrollbar-none" ref={carouselRef}>
            {successStories.map((story, index) => (
              <div 
                key={`${story.name}-${pathname}`}
                className="story-card "
              >
                <div className="success-badge">SUCCESS</div>
                <div className="image-container">
                  <Image
                    src={story.imageUrl}
                    alt={story.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 280px, 300px"
                    priority={index < 3}
                  />
                </div>
                <div className="text-overlay">
                  <h3>{story.name}</h3>
                  <p className="achievement">{story.achievement}</p>
                  <p className="caption">{story.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SuccessStoriesSection; 