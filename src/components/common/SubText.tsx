import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface SubTextProps {
  text: string | React.ReactNode;
  color?: 'white' | 'black' | 'green' | 'light';
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'overlay' | 'card';
  className?: string;
  animate?: boolean;
  delay?: number;
  maxWidth?: string;
}

const SubText: React.FC<SubTextProps> = ({
  text,
  color = 'black',
  size = 'medium',
  variant = 'default',
  className = '',
  animate = true,
  delay = 0.2,
  maxWidth
}) => {
  const colorStyles = {
    white: 'text-white',
    black: 'text-black/70',
    green: 'text-green-700',
    light: 'text-green-50/90'
  };

  const sizeStyles = {
    small: 'text-sm sm:text-base',
    medium: 'text-base sm:text-lg',
    large: 'text-lg sm:text-xl'
  };

  const variantStyles = {
    default: 'font-light leading-relaxed',
    overlay: 'font-light leading-relaxed text-white/90',
    card: 'font-light leading-relaxed line-clamp-3'
  };

  // Base styles that should always be applied
  const baseStyles = 'font-arvo transition-colors duration-300';
  const maxWidthStyle = maxWidth ? `max-w-[${maxWidth}]` : '';

  const content = (
    <p className={twMerge(baseStyles, colorStyles[color], sizeStyles[size], variantStyles[variant], maxWidthStyle, className)}>
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