//720X800
"use client";
import React, { useRef, useEffect, useState } from "react";
import "./styles.scss";
import Image from "next/image";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import AchieverCard from "@/components/common/AchieverCard";
import { achieverService, IAchiever } from "@/services/achievers.service";

interface AchieverCardProps {
  name: string;
  airRank: string;
  imageUrl?: string;
  index: number;
}

const AchieversSection = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [achievers, setAchievers] = useState<IAchiever[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await achieverService.getAllAchievers();
        if (res.status && Array.isArray(res.data)) {
          // Filter for order 1-4 and sort by order
          const filtered = res.data
            .filter(
              (a) =>
                typeof a.order === "number" && [1, 2, 3, 4].includes(a.order)
            )
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setAchievers(filtered);
        }
      } catch (e) {
        setAchievers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollToNextCard = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: containerWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToPreviousCard = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: -containerWidth,
        behavior: "smooth",
      });
    }
  };

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
          <Heading
            color="red"
            text="Our Proud Achievers"
   
            className="!text-center !text-[40px] !mb-2"
            animate={true}
          />
          <p className="section-subtitle">
            Success stories of India&apos;s future leaders
          </p>
        </motion.div>

        <div className="achievers-carousel relative">
          <div className="achievers-grid flex w-full" ref={scrollContainerRef}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              achievers.map((achiever, index) => {
                // Extract rank number from details (e.g., "Air 33")
                const details = achiever.details ?? "";
                const rankMatch = details.match(/AIR\s*(\d+)/i);
                const rank = rankMatch
                  ? rankMatch[1]
                  : details.match(/(\d+)/)?.[1] || "";
                return (
                  <AchieverCard
                    key={achiever.id}
                    name={achiever.name ?? ""}
                    rank={rank}
                    imageUrl={achiever.image ?? ""}
                  />
                );
              })
            )}
          </div>

          {/* Navigation Buttons - Only visible on mobile */}
          <button
            onClick={scrollToPreviousCard}
            className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
            aria-label="Previous card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={scrollToNextCard}
            className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
            aria-label="Next card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
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
            onClick={() => router.push("/result")}
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
