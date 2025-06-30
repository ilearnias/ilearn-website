import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', noPadding = false }) => {
  const paddingClasses = noPadding ? '' : 'px-4 md:px-6 lg:px-8';
  return (
    <div className={`max-w-[1440px] mx-auto ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Container; 