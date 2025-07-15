import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface HeadingProps {
  text: string | React.ReactNode;
  color?: "white" | "black" | "gradient" | "tricolor" | "red";
  className?: string;
  animate?: boolean;
  delay?: number;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const Heading: React.FC<HeadingProps> = ({
  text,
  color = "black",
  className = "",
  animate = true,
  delay = 0.2,
  size = "3xl",
}) => {
  const colorStyles = {
    white: "text-white",
    black: "text-black",
    red: "text-red-600",
    gradient: "bg-gradient-to-r from-green-50 to-white bg-clip-text text-transparent",
    tricolor: "text-red-600",
  };

  const sizeStyles = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl",
    "2xl": "text-4xl md:text-5xl",
    "3xl": "text-[2.65rem] md:text-[3.5rem]",
    "4xl": "text-[3rem] md:text-[4rem]",
  };

  // Base styles that should always be applied
  const baseStyles = twMerge(
    "font-bold tracking-[-0.02em] leading-[1.2]",
    sizeStyles[size],
    colorStyles[color],
    className
  );

  const content = (
    <h2 className={baseStyles}>
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
