"use client";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import "../styles.scss";
import Container from "@/components/common/Container";

interface ResultCard {
  id: number;
  title: string;
  category: string;
}

type YearData = {
  [key in "2025" | "2024" | "2023" | "2022" | "2021" | "2020"]: ResultCard[];
};

const ResultSection = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState<keyof YearData>("2025");
  const [fadeActive, setFadeActive] = useState(false);
  const [visibleCards, setVisibleCards] = useState<{ [id: number]: boolean }>(
    {}
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openCard, setOpenCard] = useState<number | null>(null);

  const years: (keyof YearData)[] = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
  ];

  // Sample data structure - to be replaced with actual video links later
  const resultCards: YearData = {
    "2025": [
      {
        id: 1,
        title: "UPSC CSE 2024 Success Story",
        category: "UPSC Results",
      },
      {
        id: 2,
        title: "iLearn Top Rankers Interview",
        category: "UPSC Results",
      },
      {
        id: 3,
        title: "UPSC CSE Success Journey",
        category: "UPSC Results",
      },
    ],
    "2024": [
      {
        id: 4,
        title: "Sample 2024 Success Story",
        category: "UPSC Results",
      },
    ],
    "2023": [],
    "2022": [],
    "2021": [],
    "2020": [],
  };

  useEffect(() => {
    setFadeActive(false);
    const timeout = setTimeout(() => setFadeActive(true), 50);
    return () => clearTimeout(timeout);
  }, [selectedYear]);

  useEffect(() => {
    if (!fadeActive) return;

    // Store current refs to avoid closure issues
    const currentRefs = cardRefs.current;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(
            (entry.target as HTMLElement).getAttribute("data-index")
          );
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [idx]: true }));
          } else {
            setVisibleCards((prev) => ({ ...prev, [idx]: false }));
          }
        });
      },
      { threshold: 0.2 }
    );

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, [fadeActive]);

  return (
    <div className="results-section py-16 ">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-block  px-8 py-3 rounded-full">
            <Heading
              className="font-bold md:leading-[0.5] leading-[1.1]"
              text="The Most Genuine Results in Kerala"
              color="tricolor"
            />
          </div>
        </div>

        {/* Year Buttons (all devices) */}
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
                <TextLabel
                  text={year}
                  variant="button"
                  color={selectedYear === year ? "black" : "gray"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Grid */}
        <div
          className={`hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 results-fade${
            fadeActive ? " results-fade-active" : ""
          }`}
        >
          {resultCards[selectedYear].map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-index={index}
              className={`w-full video-card-scroll-in${
                visibleCards[index] ? " video-card-scroll-in-active" : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg h-full">
                <div className="aspect-video relative cursor-pointer group">
                  <iframe
                    width="300"
                    height="169"
                    src="https://www.youtube.com/embed/sTsjt8J4OmA"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <div className="p-3">
                  <SubHeading text={card.title} size="small" color="black" />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    <TextLabel
                      text={card.category}
                      color="blue"
                      variant="tag"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dropdown List */}
        <div className="sm:hidden">
          {resultCards[selectedYear].length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No results for this year.
            </div>
          ) : (
            <div className="space-y-4">
              {resultCards[selectedYear].map((card) => (
                <div key={card.id}>
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 rounded-lg focus:outline-none"
                    onClick={() =>
                      setOpenCard(openCard === card.id ? null : card.id)
                    }
                  >
                    <span className="text-left font-medium">{card.title}</span>
                    <span
                      className={`transform transition-transform ${
                        openCard === card.id ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openCard === card.id && (
                    <div className="mt-2 bg-white rounded-lg shadow p-3">
                      <div className="aspect-video mb-2">
                        <iframe
                          width="300"
                          height="169"
                          src="https://www.youtube.com/embed/sTsjt8J4OmA"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full object-cover"
                        ></iframe>
                      </div>
                      <div>
                        <SubHeading
                          text={card.title}
                          size="small"
                          color="black"
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                          <TextLabel
                            text={card.category}
                            color="green"
                            variant="tag"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ResultSection;
