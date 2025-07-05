"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/common/Container";
import HeroSection from "@/components/common/HeroSection";
import Heading from "@/components/common/Heading";
import { Fade } from "react-awesome-reveal";
import GalleryComponent from "./components/GalleryComponent";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const GalleryPage = () => {
  const { t } = useTranslation();

  // Separate arrays for each gallery section
  const onamGalleryImages = [
    {
      src: "/gallery/onam.jpg",
      alt: "Onam Celebration",
      title: "Onam Celebration",
    },
    {
      src: "/gallery/onam.jpg",
      alt: "Onam Celebration",
      title: "Onam Celebration",
    },
    {
      src: "/gallery/onam.jpg",
      alt: "Onam Celebration",
      title: "Onam Celebration",
    },
    {
      src: "/gallery/onam.jpg",
      alt: "Onam Celebration",
      title: "Onam Celebration",
    },
    {
      src: "/gallery/onam.jpg",
      alt: "Onam Celebration",
      title: "Onam Celebration",
    },
  ];

  const lifeGalleryImages = [
    {
      src: "/gallery/life.jpg",
      alt: "Life at iLearn",
      title: "Life at iLearn",
    },
    {
      src: "/gallery/life.jpg",
      alt: "Life at iLearn",
      title: "Life at iLearn",
    },
    {
      src: "/gallery/life.jpg",
      alt: "Life at iLearn",
      title: "Life at iLearn",
    },
    {
      src: "/gallery/life.jpg",
      alt: "Life at iLearn",
      title: "Life at iLearn",
    },
  ];

  return (
    <div className="gallery-page">
      <Header />

      <HeroSection
        titleClassName="font-bold"
        title="Gallery"
        pageName="Gallery"
        description="Experience the vibrant life at iLearn through our collection of memorable moments, celebrations, and academic milestones."
        className="!font-bold"
      />

      <div className="gallery-content">
        <section>
          <GalleryComponent
            images={onamGalleryImages}
            title={t("Onam_Celebration")}
            color="tricolor"
            headingClassName="font-bold text-center  pt-10"
          />
        </section>

        <section>
          <GalleryComponent
            images={lifeGalleryImages}
            title={t("Life_At_iLearn")}
            color="tricolor"
            headingClassName="font-bold text-center pt-10"
          />
        </section>
      </div>
    </div>
  );
};

export default GalleryPage;
