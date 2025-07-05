"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/common/HeroSection";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Container from "@/components/common/Container";
import { Drawer } from "antd";
import { FiFilter } from "react-icons/fi";
import Heading from "@/components/common/Heading";

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: "Annual Science Fair 2024",
    description:
      "Our institution hosted the Annual Science Fair with over 500 students participating in innovative projects and workshops.",
    image: "/About/Carousel/img1.jpg",
    category: "Events",
  },
  {
    id: 2,
    title: "Teachers' Day Celebration",
    description:
      "A special event to honor our dedicated teachers with cultural performances and awards.",
    image: "/About/Carousel/img1.jpg",
    category: "Celebrations",
  },
  {
    id: 3,
    title: "Inter-School Quiz Competition",
    description:
      "Our students secured first place in the regional quiz competition, showcasing their knowledge and teamwork.",
    image: "/About/Carousel/img1.jpg",
    category: "Achievements",
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting 2024",
    description:
      "A successful parent-teacher meeting was conducted to discuss students' progress and future plans.",
    image: "/About/Carousel/img1.jpg",
    category: "Meetings",
  },
];

const categories = [
  "All Posts",
  "Events",
  "Celebrations",
  "Achievements",
  "Meetings",
];

// BlogCard component
function BlogCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <motion.div
      className="blog-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* <img src={image} alt={title} className="blog-card-img" /> */}
      {/* <Image src={image} alt={title} className="blog-card-img" /> */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="blog-card-content">
        <Heading 
          text={title}
          className="!text-xl !font-semibold !leading-normal"
          animate={false}
        />
        <p className="blog-card-desc">{description}</p>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilterBtn, setShowFilterBtn] = useState(true);
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const cardsSection = cardsSectionRef.current;
    const footer = document.querySelector("footer");
    const hero = document.querySelector(".hero-section");
    if (!cardsSection) return;
    let lastVisible = true;
    const observer = new window.IntersectionObserver(
      (entries) => {
        let show = true;
        entries.forEach((entry) => {
          if (entry.target === cardsSection && !entry.isIntersecting)
            show = false;
          if (footer && entry.target === footer && entry.isIntersecting)
            show = false;
          if (hero && entry.target === hero && entry.isIntersecting)
            show = false;
        });
        setShowFilterBtn(show);
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(cardsSection);
    if (footer) observer.observe(footer);
    if (hero) observer.observe(hero);
    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const filteredPosts =
    selectedCategory === "All Posts"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div>
      <HeroSection 
        title="Our Blog" 
        pageName="Blog"
        description="Stay informed and inspired with our latest articles, success stories, and expert insights on civil service examination preparation."
      />
      <Container>
        <div className="blog-container">
          {/* Main Content */}
          <div className="blog-content">
            {/* Left Sidebar for desktop, Filter button for mobile */}
            {isMobile && showFilterBtn ? (
              <>
                <button
                  className="blog-filter-icon-btn"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open filter options"
                >
                  <FiFilter size={28} />
                </button>
                <Drawer
                  title={
                    <>
                      <span className="drawer-drag-handle" />
                      Filter Blog Posts
                    </>
                  }
                  placement="bottom"
                  closable={true}
                  onClose={() => setDrawerOpen(false)}
                  open={drawerOpen}
                  height={360}
                >
                  <div className="sidebar-mobile-wrap">
                    <div className="categories-section">
                      <Heading 
                        text="Categories"
                        className="!text-xl !font-semibold !mb-4"
                        animate={false}
                      />
                      <div className="category-list ">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            className={`category-item${
                              selectedCategory === cat ? " active" : ""
                            }`}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setDrawerOpen(false);
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="tags-section">
                      <Heading 
                        text="Popular Tags"
                        className="!text-xl !font-semibold !mb-4"
                        animate={false}
                      />
                      <div className="tags-list">
                        {/* Add tags here */}
                      </div>
                    </div>
                  </div>
                </Drawer>
              </>
            ) : (
              <div className="blog-sidebar">
                <div className="sidebar-mobile-wrap  mt-[1rem]">
                  <div className="categories-section ">
                    <Heading 
                      text="Categories"
                      className="!text-xl !font-semibold !mb-4"
                      animate={false}
                    />
                    <div className="category-list ">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          className={`category-item${
                            selectedCategory === cat ? " active" : ""
                          }`}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="tags-section">
                    <Heading 
                      text="Popular Tags"
                      className="!text-xl !font-semibold !mb-4"
                      animate={false}
                    />
                    <div className="tags-list">
                      {/* Add tags here */}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Main Blog Content */}
            <div className="blog-main">
              <div className="blog-cards-list" ref={cardsSectionRef}>
                {filteredPosts.length === 0 ? (
                  <div className="no-posts">
                    <h2>No posts found</h2>
                    <p>
                      There are no blog posts available for this category at the
                      moment.
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      title={post.title}
                      description={post.description}
                      image={post.image}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
