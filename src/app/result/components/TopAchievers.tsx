// Recommended achiever image resolution: at least 300x400px (3:4 aspect ratio), ideally 600x800px or higher for retina displays. Optimize for web.
"use client";

import Image from "next/image";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import Container from "@/components/common/Container";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useState } from "react";
import AchieverCard from "@/components/common/AchieverCard";
import { achieverService, IAchiever } from "@/services/achievers.service";

const TopAchievers = () => {
  const [achievers, setAchievers] = useState<IAchiever[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await achieverService.getAllAchievers();
        if (res.status && Array.isArray(res.data)) {
          // Sort by order
          const sorted = res.data.slice().sort((a, b) => a.order - b.order);
          setAchievers(sorted);
        }
      } catch (e) {
        setAchievers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="achievers-content">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Heading
              text="Our Top Achievers"
              color="tricolor"
              className="font-bold "
            />
          </div>

          <div className="flex flex-wrap gap-10 justify-center ">
            {loading ? (
              <div>Loading...</div>
            ) : (
              achievers.map((achiever) => {
                // Extract rank number from details (e.g., "Air 33")
                const rankMatch = achiever.details.match(/AIR\s*(\d+)/i);
                const rank = rankMatch
                  ? rankMatch[1]
                  : achiever.details.match(/(\d+)/)?.[1] || "";
                return (
                  <AchieverCard
                    key={achiever.id}
                    name={achiever.name}
                    rank={rank}
                    imageUrl={achiever.image}
                  />
                );
              })
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopAchievers;
