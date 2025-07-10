import React from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import { motion } from "framer-motion";

interface AchieverCardProps {
  name: string;
  rank: string | number;
  imageUrl: string;
  year?: number;
  className?: string;
}

const AchieverCard: React.FC<AchieverCardProps> = ({
  name,
  rank,
  imageUrl,
  year,
  className = "",
}) => (
  <motion.div
    className={`achiever-card w-[300px] h-[400px] flex flex-col rounded-lg overflow-hidden shadow-md bg-white ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
  >
    {/*
      Recommended image resolution for achiever images:
      360px (width) x 400px (height) or higher, aspect ratio 9:10, optimized for web (e.g., 720x800 for retina displays)
    */}
    <div className="image-container w-full h-[400px] relative">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 320px, 360px"
        loading="lazy"
      />
    </div>
    <div className="p-4 flex-1 flex flex-col justify-between">
      <SubHeading text={name} size="small" color="black" />
      <div className="flex justify-between items-center mt-2">
        <div className="bg-red-100 px-3 py-1 rounded-full">
          <TextLabel text={`AIR ${rank}`} color="blue" variant="tag" />
        </div>
        {year && <TextLabel text={year} color="gray" variant="tag" />}
      </div>
    </div>
  </motion.div>
);

export default AchieverCard;
