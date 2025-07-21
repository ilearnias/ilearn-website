"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/Container";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";
import YouTube from "react-youtube";
import { Card } from "antd";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../styles.scss";

interface ResultCard {
  id: number;
  title: string;
  category: string;
  videoId: string; // <-- ADDED for videoId
}

type YearData = {
  [key in "2025" | "2024" | "2023" | "2022" | "2021" | "2020"]: ResultCard[];
};

const ResultSection = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState<keyof YearData>("2025");

  // Add valid video IDs to cards for demo (replace as needed)
  const resultCards: YearData = {
    "2025": [
      {
        id: 1,
        title: "UPSC CSE 2024 Success Story",
        category: "UPSC Results",
        videoId: "sTsjt8J4OmA",
      },
      {
        id: 2,
        title: "iLearn Top Rankers Interview",
        category: "UPSC Results",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "UPSC CSE Success Journey",
        category: "UPSC Results",
        videoId: "3JZ_D3ELwOQ",
      },
    ],
    "2024": [
      {
        id: 4,
        title: "Sample 2024 Success Story",
        category: "UPSC Results",
        videoId: "sTsjt8J4OmA",
      },
    ],
    "2023": [],
    "2022": [],
    "2021": [],
    "2020": [],
  };

  const years = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
  ] as (keyof YearData)[];

  // React Slick Slider settings (copying from your MediaSection)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: (
      <IoIosArrowForward color="red" size={30} className="next-arrow" />
    ),
    prevArrow: <IoIosArrowBack color="red" size={30} className="prev-arrow" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="results-section py-16">
      <Container>
        <div id="journey-section-title">
          <Fade direction="up" duration={1000}>
            <div className="_heading-box">
              <div className="_heading-box-title1">
                The Most Genuine Results in Kerala
              </div>
              <div className="_heading-box-sub-title1"></div>
            </div>
          </Fade>
        </div>

        {/* Year Buttons */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full transition-all whitespace-nowrap ${
                  selectedYear === year
                    ? "text-white bg-[#20468d] "
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <TextLabel
                  text={year}
                  variant="button"
                  color={selectedYear === year ? "white" : "gray"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Slider Section */}
        {resultCards[selectedYear].length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No results for this year.
          </div>
        ) : (
          <div className="slider-container ">
            {resultCards[selectedYear].length > 1 ? (
              <Slider {...settings}>
                {resultCards[selectedYear].map((card) => (
                  <div key={card.id}>
                    <Card
                      style={{
                        width: "98%",
                        margin: "0 auto",

                        borderRadius: "15px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px 0 rgba(158, 158, 158, 0.1)",
                        transition: "transform 0.3s ease",
                        border: "none",
                      }}
                      cover={
                        <YouTube
                          videoId={card.videoId}
                          opts={{
                            width: "100%",
                            height: "250px",
                            playerVars: { autoplay: 0 },
                          }}
                        />
                      }
                    >
                      <SubHeading
                        text={card.title}
                        size="small"
                        color="black"
                      />
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 bg-red-600 inline-block rounded-full"></span>
                        <TextLabel
                          text={card.category}
                          color="blue"
                          variant="tag"
                        />
                      </div>
                    </Card>
                  </div>
                ))}
              </Slider>
            ) : resultCards[selectedYear].length === 1 ? (
              <div style={{ maxWidth: 350, margin: "0 auto" }}>
                <Card
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 0 10px 0 rgba(158, 158, 158, 0.1)",
                    border: "none",
                  }}
                  cover={
                    <YouTube
                      videoId={resultCards[selectedYear][0].videoId}
                      opts={{
                        width: "100%",
                        height: "250px",
                        playerVars: { autoplay: 0 },
                      }}
                    />
                  }
                >
                  <SubHeading
                    text={resultCards[selectedYear][0].title}
                    size="small"
                    color="black"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-red-600 inline-block rounded-full"></span>
                    <TextLabel
                      text={resultCards[selectedYear][0].category}
                      color="blue"
                      variant="tag"
                    />
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No results for this year.
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ResultSection;
