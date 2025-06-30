// Inside VideoCard.tsx — clean version
import React, { useState } from 'react';
import { motion, Variants, Transition } from 'framer-motion';

interface VideoData {
  title: string;
  subtitle?: string;
  youtubeUrl: string;  // Original YouTube URL
}

interface VideoCardProps {
  videos?: VideoData[];
  onVideoClick?: (index: number) => void;
  playingIndex?: number;
}

// Helper function to convert YouTube URL to embed URL and thumbnail
const getVideoDetails = (youtubeUrl: string) => {
  // Extract video ID from YouTube URL
  const videoId = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/)?.[1];
  
  if (!videoId) return null;

  // Return multiple thumbnail qualities for fallback
  return {
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrls: [
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/default.jpg`
    ]
  };
};

const transition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.3
};

const containerVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  initial: {
    y: 20,
    opacity: 0,
    scale: 0.95
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
};

const VideoCard2: React.FC<VideoCardProps> = ({
  videos = [],
  onVideoClick,
  playingIndex: externalPlayingIndex
}) => {
  const [internalPlayingIndex, setInternalPlayingIndex] = useState(-1);
  const [thumbnailErrors, setThumbnailErrors] = useState<{ [key: number]: number }>({});
  const playingIndex = externalPlayingIndex ?? internalPlayingIndex;

  const handleVideoClick = (index: number) => {
    if (onVideoClick) {
      onVideoClick(index);
    } else {
      setInternalPlayingIndex(index === playingIndex ? -1 : index);
    }
  };

  const handleThumbnailError = (index: number) => {
    setThumbnailErrors(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ margin: 0 }}
      >
        {videos.map((video, index) => {
          const videoDetails = getVideoDetails(video.youtubeUrl);
          if (!videoDetails) return null;
          
          const currentThumbnailIndex = thumbnailErrors[index] || 0;
          const thumbnailUrl = videoDetails.thumbnailUrls[Math.min(currentThumbnailIndex, videoDetails.thumbnailUrls.length - 1)];

          return (
            <motion.div
              key={video.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-300 min-h-[360px]"
              variants={cardVariants}
              whileHover="hover"
              layout
            >
              <motion.div
                className="relative w-full pt-[56.25%] cursor-pointer bg-gray-900"
                onClick={() => handleVideoClick(index)}
              >
                {playingIndex === index ? (
                  <iframe
                    src={`${videoDetails.embedUrl}?autoplay=1&rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full group">
                    <motion.img
                      src={thumbnailUrl}
                      alt={video.title}
                      onError={() => handleThumbnailError(index)}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                      initial={{ opacity: 0.9 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <motion.div 
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-8 h-8 text-indigo-600 ml-1"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
              <motion.div 
                className="px-6 py-4 bg-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {video.title}
                </h3>
                {video.subtitle && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {video.subtitle}
                  </p>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default VideoCard2;
