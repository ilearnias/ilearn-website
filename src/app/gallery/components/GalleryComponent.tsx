"use client";
import React, { useState } from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";

interface GalleryImage {
  src: string;
  alt?: string;
  title?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
  title?: string;
  color?: "tricolor" | "white" | "black" | "gradient";
  headingClassName?: string;
}

export default function GalleryComponent({
  images,
  className = "",
  title,
  color = "tricolor",
  headingClassName = "",
}: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-black via-gray-600 to-gray-600 relative ${className}`}
    >
      {title && (
        <Heading
          text={title}
          color={color}
          className={`font-bold text-center ${headingClassName}`}
        />
      )}
      <div
        className="pt-24 md:pt-10 overflow-x-auto overflow-y-hidden pb-5 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          height: "auto",
          scrollBehavior: "smooth",
          overflowY: "hidden",
        }}
      >
        <div
          className="relative flex gap-3 pb-40 md:gap-12 px-4 md:px-12 min-h-[calc(100vh-64px)] items-center"
          style={{}}
        >
          {images.map((image, index) => {
            const yOffset =
              index === Math.floor(images.length / 2)
                ? "md:translate-y-24 translate-y-8"
                : index === Math.floor(images.length / 2) - 1 ||
                  index === Math.floor(images.length / 2) + 1
                ? "md:translate-y-12 translate-y-4"
                : "translate-y-0";

            const isSelected = selectedIndex === index;
            const isBeforeSelected =
              selectedIndex !== null && index < selectedIndex;
            const isAfterSelected =
              selectedIndex !== null && index > selectedIndex;

            return (
              <div
                key={image.src}
                className={`relative transform ${
                  !isSelected ? yOffset : ""
                } transition-all mb-20 duration-500 ease-in-out cursor-pointer
                  ${isSelected ? "z-10" : "z-0"}
                  ${
                    isBeforeSelected
                      ? "md:-translate-x-60 -translate-x-20 opacity-40"
                      : ""
                  }
                  ${
                    isAfterSelected
                      ? "md:translate-x-60 translate-x-20 opacity-40"
                      : ""
                  }
                `}
                onClick={() => setSelectedIndex(isSelected ? null : index)}
              >
                <div
                  className={`bg-white p-2 md:p-4 pb-10 md:pb-16 shadow-xl rounded-sm transition-all duration-500 w-[240px] md:w-[400px]
                  ${
                    isSelected
                      ? `md:scale-[1.8] scale-[1.5] md:mt-20 mt-16 ${
                          index === 0
                            ? "ml-20 md:ml-40"
                            : index === images.length - 1
                            ? "mr-20 md:mr-40"
                            : ""
                        }`
                      : "hover:scale-105 hover:-rotate-2"
                  }
                `}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    {image.src ? (
                      <Image
                        src={image.src}
                        alt={image.alt || `Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={400}
                        height={400}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Image placeholder</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 bg-white/90 px-1.5 md:px-3 py-0.5 md:py-1.5 text-[10px] md:text-sm text-gray-600 rounded">
                    {image.title || `Art ${String(index + 1).padStart(2, "0")}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
