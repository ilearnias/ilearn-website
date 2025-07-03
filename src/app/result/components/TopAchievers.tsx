"use client";

import Image from "next/image";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import Container from "@/components/common/Container";
import { motion, useInView } from "framer-motion";
import React from "react";

interface Achiever {
  id: number;
  name: string;
  image: string;
  rank: number;
  year: number;
}

const achievers: Achiever[] = [
  {
    id: 1,
    name: "Midhun Premraj IAS",
    image: "/result/dummy.jpg",
    rank: 12,
    year: 2024
  },
  {
    id: 2,
    name: "Dileep Kainikkara IAS",
    image: "/result/dummy.jpg",
    rank: 21,
    year: 2024
  },
  {
    id: 3,
    name: "Alfred OV IAS",
    image: "/result/dummy.jpg",
    rank: 57,
    year: 2024
  },
  {
    id: 4,
    name: "Reenu Anna Mathew",
    image: "/result/dummy.jpg",
    rank: 81,
    year: 2024
  },
  {
    id: 5,
    name: "Annie George",
    image: "/result/dummy.jpg",
    rank: 93,
    year: 2024
  },
  {
    id: 6,
    name: "Devika Priyadersini",
    image: "/result/dummy.jpg",
    rank: 95,
    year: 2024
  },
  {
    id: 7,
    name: "Jayakrishnan IAS",
    image: "/result/dummy.jpg",
    rank: 444,
    year: 2024
  }
];

const TopAchievers = () => {
  return (
    <section className="py-16 bg-white">
      <Container >
        <div className="achievers-content">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8">
              <Image 
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
            <Heading text="Our Top Achievers" color="black" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievers.map((achiever, idx) => {
              const ref = React.useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: false, margin: '-50px' });
              return (
                <motion.div
                  key={achiever.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="aspect-[4/5] relative">
                    <Image
                      src={achiever.image}
                      alt={achiever.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <SubHeading text={achiever.name} size="small" color="black" />
                    <div className="flex justify-between items-center mt-2">
                      <div className="bg-red-100 px-3 py-1 rounded-full">
                        <TextLabel text={`AIR ${achiever.rank}`} color="blue" variant="tag" />
                      </div>
                      <TextLabel text={achiever.year} color="gray" variant="tag" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopAchievers; 