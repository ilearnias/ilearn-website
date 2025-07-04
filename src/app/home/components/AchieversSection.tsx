"use client";
import React, { useRef } from "react";
import "./styles.scss";
import Image from "next/image";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

interface AchieverCardProps {
  name: string;
  airRank: string;
  imageUrl?: string;
  index: number;
}

const AchieverCard: React.FC<AchieverCardProps> = ({
  name,
  airRank,
  imageUrl,
  index,
}) => {
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: false });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="achiever-card md:w-[300px]  my-4"
    >
      <div className="image-container">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className="achiever-image"
            loading="lazy"
            sizes="(max-width: 768px) 260px, 300px"
          />
        ) : (
          <div className="placeholder-image" />
        )}
      </div>
      <div className="achiever-info">
        <div className="air-rank">{airRank}</div>
        <Heading text={name} className="!text-lg !font-semibold !leading-normal" />
      </div>
    </motion.div>
  );
};

const AchieversSection = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToNextCard = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({ left: containerWidth, behavior: 'smooth' });
    }
  };

  const scrollToPreviousCard = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({ left: -containerWidth, behavior: 'smooth' });
    }
  };

  // Placeholder data - replace imageUrl when you have the actual images
  const achievers: Omit<AchieverCardProps, "index">[] = [
    {
      name: "John Smith IAS",
      airRank: "AIR 57",
      imageUrl: "/Achiver images/dummy.jpg",
    },
    {
      name: "Sarah Johnson",
      airRank: "AIR 81",
      imageUrl: "/Achiver images/dummy.jpg",
    },
    {
      name: "Michael Brown",
      airRank: "AIR 95",
      imageUrl: "/Achiver images/dummy.jpg",
    },
    {
      name: "Emily Davis IAS",
      airRank: "AIR 21",
      imageUrl: "/Achiver images/dummy.jpg",
    },
    {
      name: "Robert Wilson IAS",
      airRank: "AIR 42",
      imageUrl: "/Achiver images/dummy.jpg",
    },
    {
      name: "Jennifer Taylor IAS",
      airRank: "AIR 57",
      imageUrl: "/Achiver images/dummy.jpg",
    },
  ];

  return (
    <section className="achievers-section">
      <Container className="w-full">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <Heading text="Our Proud Achievers" className="!text-center !mb-4" animate={true} />
          <p className="section-subtitle">
            Success stories of India&apos;s future leaders
          </p>
        </motion.div>

        <div className="achievers-carousel relative">
          <div className="achievers-grid flex w-full" ref={scrollContainerRef}>
            {achievers.map((achiever, index) => (
              <AchieverCard
                key={index}
                index={index}
                name={achiever.name}
                airRank={achiever.airRank}
                imageUrl={achiever.imageUrl}
              />
            ))}
          </div>
          
          {/* Navigation Buttons - Only visible on mobile */}
          <button 
            onClick={scrollToPreviousCard}
            className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
            aria-label="Previous card"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={scrollToNextCard}
            className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
            aria-label="Next card"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <motion.div 
          className="view-all-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            className="view-all-button"
            onClick={() => router.push("/results")}
          >
            View All Results
            <span className="arrow">→</span>
          </button>
        </motion.div>
      </Container>
    </section>
  );
};

export default AchieversSection;
