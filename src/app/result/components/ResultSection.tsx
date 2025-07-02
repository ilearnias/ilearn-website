"use client";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Image from 'next/image';
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";

interface ResultCard {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
}

type YearData = {
  [key in "2025" | "2024" | "2023" | "2022" | "2021" | "2020"]: ResultCard[];
};

const ResultSection = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState<keyof YearData>("2025");
  const [viewMode, setViewMode] = useState("carousel");

  const years: (keyof YearData)[] = ["2025", "2024", "2023", "2022", "2021", "2020"];

  // Sample data structure - to be replaced with actual video links later
  const resultCards: YearData = {
    "2025": [
      {
        id: 1,
        title: "UPSC CSE 2024 Success Story",
        category: "UPSC Results",
        thumbnail: "/path/to/thumbnail1.jpg",
      },
      {
        id: 2,
        title: "iLearn Top Rankers Interview",
        category: "UPSC Results",
        thumbnail: "/path/to/thumbnail2.jpg",
      },
      {
        id: 3,
        title: "UPSC CSE Success Journey",
        category: "UPSC Results",
        thumbnail: "/path/to/thumbnail3.jpg",
      },
    ],
    "2024": [
      {
        id: 4,
        title: "Sample 2024 Success Story",
        category: "UPSC Results",
        thumbnail: "/path/to/thumbnail4.jpg",
      },
    ],
    "2023": [],
    "2022": [],
    "2021": [],
    "2020": [],
  };

  return (
    <div className="results-section py-16">
      <Container>
        <div className="text-center mb-12">
          <Heading text="Our Results" color="black" />
          <div className="inline-block bg-[#1e3a8a] px-8 py-3 rounded-full">
            <SubHeading text="The Most Genuine Results in Kerala" color="white" size="medium" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full transition-all whitespace-nowrap ${
                  selectedYear === year
                    ? "bg-yellow-400 text-black"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <TextLabel text={year} variant="button" color={selectedYear === year ? 'black' : 'gray'} />
              </button>
            ))}
          </div>
          
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setViewMode("carousel")}
              className={`px-4 py-2 rounded ${
                viewMode === "carousel"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-gray-100"
              }`}
            >
              <TextLabel text="🔄 Carousel" variant="button" color={viewMode === "carousel" ? 'white' : 'gray'} />
            </button>
            <button
              onClick={() => setViewMode("gallery")}
              className={`px-4 py-2 rounded ${
                viewMode === "gallery"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-gray-100"
              }`}
            >
              <TextLabel text="🖼️ Gallery" variant="button" color={viewMode === "gallery" ? 'white' : 'gray'} />
            </button>
          </div>
        </div>

        <div className={`${viewMode === 'gallery' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'flex overflow-x-auto pb-4'}`}>
          {resultCards[selectedYear].map((card, index) => (
            <div 
              key={card.id} 
              className={`${
                viewMode === 'carousel' 
                  ? 'flex-none mr-4 w-[300px]' 
                  : 'w-full'
              }`}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg h-full">
                <div className="aspect-video relative cursor-pointer group">
                  <Image
                    src={card.thumbnail}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    width={300}
                    height={169}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">▶</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <SubHeading text={card.title} size="small" color="black" />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    <TextLabel text={card.category} color="green" variant="tag" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {resultCards[selectedYear].length === 0 && (
            <div className="text-center w-full py-8">
              <TextLabel text={`No results available for ${selectedYear}`} color="gray" variant="default" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ResultSection; 