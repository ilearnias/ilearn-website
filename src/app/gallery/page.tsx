"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import GalleryComponent from "./components/GalleryComponent";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const GalleryPage = () => {
  const { t } = useTranslation();

  // Example images array - replace with your actual images
  const galleryImages = [
    {
      src: "/path/to/image1.jpg",
      alt: "Gallery Image 1",
      title: "Art 01",
    },
    {
      src: "/path/to/image2.jpg",
      alt: "Gallery Image 2",
      title: "Art 02",
    },
    {
      src: "/path/to/image3.jpg",
      alt: "Gallery Image 3",
      title: "Art 03",
    },
    {
      src: "/path/to/image4.jpg",
      alt: "Gallery Image 4",
      title: "Art 04",
    },
    {
      src: "/path/to/image5.jpg",
      alt: "Gallery Image 5",
      title: "Art 05",
    },
    {
      src: "/path/to/image6.jpg",
      alt: "Gallery Image 6",
      title: "Art 06",
    },
    {
      src: "/path/to/image7.jpg",
      alt: "Gallery Image 7",
      title: "Art 07",
    },
    {
      src: "/path/to/image8.jpg",
      alt: "Gallery Image 8",
      title: "Art 08",
    },
    {
      src: "/path/to/image9.jpg",
      alt: "Gallery Image 9",
      title: "Art 09",
    },
  ];

  return (
    <div className="gallery-page">
      <Header />
      <div className="hero-section bg-gray-900">
        <Container>
          <Fade direction="up">
            <div className="hero-content">
              <h1 className="hero-title text-white">{t('gallery-HeaderTxt')}</h1>
              <p className="hero-subtitle text-gray-300">{t('gallery-HeaderSubTxt')}</p>
            </div>
          </Fade>
        </Container>
      </div>

      <section className="gallery-section">
        <Container>
          <Fade direction="up">
            <div className="section-header">
              <h2 className="section-title">{t("Onam_Celebration")}</h2>
              <p className="section-subtitle">
                {t("Onam_Celebration_Subtitle")}
              </p>
            </div>
          </Fade>
        </Container>
        <GalleryComponent images={galleryImages} />
      </section>

      <section className="gallery-section bg-gray-50">
        <Container>
          <Fade direction="up">
            <div className="section-header">
              <h2 className="section-title">{t("Life_At_iLearn")}</h2>
              <p className="section-subtitle">
                {t("Life_At_iLearn_Subtitle")}
              </p>
            </div>
          </Fade>
        </Container>
        <GalleryComponent images={galleryImages} />
      </section>

      <Footer />
    </div>
  );
}

export default GalleryPage;
