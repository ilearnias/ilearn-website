import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface SubTextProps {
  text: string | React.ReactNode;
  color?: string;
  size?: "small" | "medium" | "large";
  variant?: "default" | "overlay" | "card";
  className?: string;
  animate?: boolean;
  delay?: number;
  maxWidth?: string;
}

const SubText: React.FC<SubTextProps> = ({
  text,
  color = "#20468d",
  size = "medium",
  variant = "default",
  className = "",
  animate = true,
  delay = 0.2,
  maxWidth,
}) => {
  const sizeStyles = {
    small: "text-sm sm:text-base",
    medium: "text-base sm:text-lg",
    large: "text-lg sm:text-xl",
  };

  const variantStyles = {
    default: "font-light leading-relaxed",
    overlay: "font-light leading-relaxed text-white/90",
    card: "font-light leading-relaxed line-clamp-3",
  };

  // Base styles that should always be applied
  const baseStyles = "font-arvo transition-colors duration-300";
  const maxWidthStyle = maxWidth ? `max-w-[${maxWidth}]` : "";

  const content = (
    <p
      style={{ color: "#20468d" }}
      className={twMerge(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        maxWidthStyle,
        className
      )}
    >
      {text}
    </p>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default SubText;
