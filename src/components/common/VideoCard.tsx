// Inside VideoCard.tsx — clean version
import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';

interface VideoCardProps {
  title: string;
  subtitle?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isPlaying?: boolean;
  onVideoClick?: () => void;
  direction?: 'left' | 'right';
  id?: string;
}

const transition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.3
};

const cardVariants: Variants = {
  initial: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? '-30%' : '30%',
    opacity: 0,
    filter: 'blur(10px)'
  }),
  animate: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition
  },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? '30%' : '-30%',
    opacity: 0,
    filter: 'blur(10px)',
    transition: {
      ...transition,
      duration: 0.25
    }
  })
};

const contentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(5px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      ...transition,
      delay: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(5px)',
    transition: {
      duration: 0.2
    }
  }
};

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  subtitle,
  videoUrl,
  thumbnailUrl,
  isPlaying = false,
  onVideoClick,
  direction = 'right',
  id
}) => {
  return (
    <motion.div
      key={id || title}
      className="w-full max-w-[1100px] mx-auto bg-blue-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl"
      custom={direction}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <motion.div
        className="relative w-full pt-[40%] cursor-pointer bg-black"
        onClick={onVideoClick}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileTap={{ 
          scale: 0.99,
          transition: { duration: 0.1 }
        }}
      >
        {isPlaying ? (
          <iframe
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <motion.img
              src={thumbnailUrl || videoUrl}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ filter: 'brightness(0.9)' }}
              whileHover={{ filter: 'brightness(1.1)' }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="absolute flex items-center justify-center w-16 h-16 bg-white/90 rounded-full"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)"
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-indigo-600 ml-1"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M8 5v14l11-7z" />
              </motion.svg>
            </motion.div>
          </div>
        )}
      </motion.div>
      <motion.div 
        className="px-4 py-2 bg-blue-200 border-t border-gray-200"
        variants={contentVariants}
      >
        <h3 className="text-2xl font-bold text-[#1F2937] mb-2 line-clamp-2 leading-tight tracking-[-0.02em]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-base font-light text-gray-600 leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VideoCard;
