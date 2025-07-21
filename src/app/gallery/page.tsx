"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/common/Container";
import HeroSection from "@/components/common/HeroSection";
import Heading from "@/components/common/Heading";
import { Fade } from "react-awesome-reveal";
import GalleryComponent from "./components/GalleryComponent";
import { galleryService, IGalleryItem } from "@/services/gallery.service";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const GalleryPage = () => {
  const { t } = useTranslation();
  const [gallerySections, setGallerySections] = useState<{
    [key: string]: any[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await galleryService.getPublicGalleryItems(
          1,
          50,
          "ASC"
        );

        if (response.status && response.data) {
          // Group images by title
          const groupedImages: { [key: string]: any[] } = {};

          response.data.forEach((item: IGalleryItem) => {
            if (item.isActive && item.images && item.images.length > 0) {
              const title = item.title || "Untitled";

              if (!groupedImages[title]) {
                groupedImages[title] = [];
              }

              // Add each image from this item to the group
              item.images.forEach((imageUrl: string) => {
                groupedImages[title].push({
                  src: imageUrl,
                  alt: item.title || "Gallery image",
                  title: item.title || "Untitled",
                });
              });
            }
          });

          setGallerySections(groupedImages);
        }
      } catch (err: any) {
        console.error("Error fetching gallery data:", err);
        setError(err.message || "Failed to load gallery images");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return (
      <div className="gallery-page">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-page">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <Header />

      <HeroSection
        titleClassName="font-bold mb-2"
        title="Gallery"
        pageName="Gallery"
        description="Experience the vibrant life at iLearn through our collection of memorable moments, celebrations, and academic milestones."
      
      />

      <div className="gallery-content">
        {Object.keys(gallerySections).length > 0 ? (
          Object.entries(gallerySections).map(([title, images]) => (
            <section key={title}>
              <GalleryComponent
                images={images}
                title={title}
                color="tricolor"
                headingClassName="font-bold"
              />
            </section>
          ))
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-gray-600">No gallery images found.</p>
              <p className="text-sm text-gray-500 mt-2">
                Please check back later for updates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
