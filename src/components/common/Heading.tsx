import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface HeadingProps {
  text: string | React.ReactNode;
  color?: "white" | "black" | "gradient" | "tricolor" | "red";
  className?: string;
  animate?: boolean;
  delay?: number;
}

const Heading: React.FC<HeadingProps> = ({
  text,
  color = "black",
  className = "",
  animate = true,
  delay = 0.2,
}) => {
  const colorStyles = {
    white: "text-white",
    black: "text-black",
    red: "text-red-600",
    gradient:
      "bg-gradient-to-r from-green-50 to-white bg-clip-text text-transparent",
    tricolor: "text-red-600",
  };

  // Base styles that should always be applied
  const baseStyles =
    "text-[2.65rem] sm:text-[2.5rem] md:text-[3.5rem] font-extralight tracking-[-0.02em] leading-[0.1]  font-arvo";

  const content = (
    <h2 className={twMerge(baseStyles, colorStyles[color], className)}>
      {text}
    </h2>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Heading;
