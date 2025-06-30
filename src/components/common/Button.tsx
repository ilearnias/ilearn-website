import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text' | 'icon';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  icon,
  isActive = false,
}) => {
  const baseStyles = {
    primary: 'bg-white text-green-700 hover:bg-white/90 shadow-lg',
    secondary: 'bg-white/10 backdrop-blur text-white hover:bg-white/20 border border-white/20',
    text: 'transition-colors text-left hover:text-gray-600',
    icon: 'rounded-full flex items-center justify-center border-2 transition-all duration-700'
  };

  const commonStyles = 'px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-light tracking-wide uppercase text-sm inline-flex items-center gap-2 transition-colors';

  const buttonContent = (
    <motion.div
      className={`
        ${baseStyles[variant]} 
        ${variant !== 'text' ? commonStyles : ''} 
        ${className}
        ${isActive && variant === 'text' ? 'text-black' : variant === 'text' ? 'text-gray-400' : ''}
      `}
      whileHover={
        variant === 'icon' 
          ? { scale: 1.1 }
          : variant === 'text'
          ? { x: 5 }
          : { y: -2 }
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button">
      {buttonContent}
    </button>
  );
};

export default Button; 