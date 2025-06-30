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
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToNext = () => {
    if (carouselRef.current) {
      const cardWidth = isMobile ? 295 : 320; // Card width + gap
      const newScrollLeft = carouselRef.current.scrollLeft + cardWidth;
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      setCurrentIndex(prev => Math.min(prev + 1, successStories.length - 1));
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current) {
      const cardWidth = isMobile ? 295 : 320; // Card width + gap
      const newScrollLeft = carouselRef.current.scrollLeft - cardWidth;
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  // Prevent hydration issues by not rendering navigation buttons until client-side
  const renderNavButtons = isMounted && (
    <>
      <button 
        className="nav-button prev" 
        onClick={scrollToPrev}
        aria-label="Previous story"
        style={{ display: currentIndex === 0 ? 'none' : 'flex' }}
      >
        ‹
      </button>
      <button 
        className="nav-button next" 
        onClick={scrollToNext}
        aria-label="Next story"
        style={{ display: currentIndex === successStories.length - 1 ? 'none' : 'flex' }}
      >
        ›
      </button>
    </>
  );

  return (
    <div className="success-stories-section">
      <Container>
        <div className="section-header">
          <h2>
            <span className="text-primary">Success</span>
            <span className="text-accent"> Stories</span>
          </h2>
          <p className="subtitle">
            See how our students achieved remarkable results in the civil services examination
          </p>
        </div>

        <div className="stories-carousel">
          {renderNavButtons}
          <div className="flex gap-16 overflow-x-auto scroll-smooth scrollbar-none w-full" ref={carouselRef}>
            {successStories.map((story, index) => (
              <div 
                key={`${story.name}-${pathname}`}
                className="story-card"
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