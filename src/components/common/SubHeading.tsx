import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface SubHeadingProps {
  text: string | React.ReactNode;
  color?: 'white' | 'black' | 'green' | 'gray';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animate?: boolean;
  delay?: number;
  isActive?: boolean;
}

const SubHeading: React.FC<SubHeadingProps> = ({
  text,
  color = 'black',
  size = 'medium',
  className = '',
  animate = true,
  delay = 0.2,
  isActive = false
}) => {
  const colorStyles = {
    white: 'text-white',
    black: 'text-black',
    green: 'text-green-700',
    gray: isActive ? 'text-black' : 'text-gray-400 hover:text-gray-600'
  };

  const sizeStyles = {
    small: 'text-base sm:text-base md:text-lg',
    medium: 'text-lg sm:text-xl md:text-[1.75rem]',
    large: 'text-xl sm:text-2xl md:text-[2rem]'
  };

  // Base styles that should always be applied
  const baseStyles = 'font-extralight leading-tight tracking-tight font-arvo';

  const content = (
    <h3 className={twMerge(baseStyles, colorStyles[color], sizeStyles[size], className)}>
      {text}
    </h3>
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

export default SubHeading; 