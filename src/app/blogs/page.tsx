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
import { blogService, IBlogPost, IBlogCategory } from "@/services/blog.service";
import { FiArrowRight } from "react-icons/fi";
import { Pagination } from "antd";

// Real data state
type BlogPostWithCategory = Omit<IBlogPost, "tags"> & {
  tags: string | string[];
  category?: IBlogCategory;
};

const DEFAULT_CATEGORY = "All Posts";

// BlogCard component
function BlogCard({
  title,
  description,
  image,
  tags,
  selectedTag,
  link, // Add link parameter
}: {
  title: string;
  description: string;
  image: string;
  tags?: string | string[];
  selectedTag?: string | null;
  link?: string; // Add link type
}) {
  // Fallback if image is not a valid path or URL
  const isValidImage =
    typeof image === "string" &&
    (image.startsWith("/") ||
      image.startsWith("http://") ||
      image.startsWith("https://"));
  const imageSrc = isValidImage ? image : "/About/Carousel/img1.jpg";

  // Tag highlighting logic
  const tagList = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
    ? tags
        .split(/,|;/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const isHighlighted = selectedTag && tagList.includes(selectedTag);

  return (
    <motion.div
      className={`blog-card${isHighlighted ? " blog-card--highlight" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="blog-card-content">
        <Heading
          color="tricolor"
          text={title}
          className="!text-xl !font-bold !leading-normal"
          animate={false}
        />
        <p className="blog-card-desc">{description}</p>
        {tagList.length > 0 && (
          <div className="blog-card-tags">
            {tagList.map((tag) => (
              <span
                key={tag}
                className={`blog-card-tag${
                  selectedTag === tag ? " selected" : ""
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {link && (
          <Link href={link} className="blog-card-button">
            View More <FiArrowRight className="ml-2" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [blogPosts, setBlogPosts] = useState<BlogPostWithCategory[]>([]);
  const [categories, setCategories] = useState<string[]>([DEFAULT_CATEGORY]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilterBtn, setShowFilterBtn] = useState(true);
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Extract unique tags from blogPosts
  const allTags = Array.from(
    new Set(
      blogPosts
        .flatMap((post) => {
          if (!post.tags) return [];
          if (Array.isArray(post.tags)) return post.tags;
          if (typeof post.tags === "string") {
            return post.tags
              .split(/,|;/)
              .map((t: string) => t.trim())
              .filter(Boolean);
          }
          return [];
        })
        .filter(Boolean)
    )
  );

  // Fetch blog posts and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const params: any = { page: currentPage, limit: POSTS_PER_PAGE };
      try {
        const [postsRes, catsRes]: any = await Promise.all([
          blogService.getAllPosts(params),
          blogService.getAllCategories(),
        ]);
        setBlogPosts(postsRes.data || []);
        setTotalPages(postsRes.meta?.totalPages || 1);
        setTotalItems(postsRes.meta?.itemCount || 0);
        const catTitles =
          catsRes.data?.map((cat: IBlogCategory) => cat.title) || [];
        setCategories([DEFAULT_CATEGORY, ...catTitles]);
      } catch (err: any) {
        setError(
          typeof err === "string"
            ? err
            : err?.message || "Failed to load blog data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

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

  // Reset to page 1 if filters change (category, tag)
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag]);

  // Filter posts by category, tag, and isActive (client-side, after API fetch)
  const filteredPosts = blogPosts.filter((post) => {
    if (post.isActive === false) return false;
    const inCategory =
      selectedCategory === DEFAULT_CATEGORY ||
      post.category?.title === selectedCategory;
    if (!selectedTag) return inCategory;
    const tagList = !post.tags
      ? []
      : Array.isArray(post.tags)
      ? post.tags
      : typeof post.tags === "string"
      ? post.tags
          .split(/,|;/)
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];
    return inCategory && tagList.includes(selectedTag);
  });

  return (
    <div>
      <div className="_banner-box1">
        <div className="_banner-header-txt1">Our blog</div>
        <div className="_banner-sub-header-txt1">
          Stay informed and inspired with our latest articles, success stories,
          and expert insights on civil service examination preparation.
        </div>
      </div>
      {/* <HeroSection
        titleClassName="font-bold mb-2"
        title="Our Blog"
        pageName="Blog"
        description="Stay informed and inspired with our latest articles, success stories, and expert insights on civil service examination preparation."
      /> */}
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
                        color="tricolor"
                        text="Categories"
                        className="!text-xl !font-bold !mb-4"
                        animate={false}
                      />
                      <div className="category-list  ">
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
                        color="tricolor"
                        text="Popular Tags"
                        className="!text-xl !font-bold !mb-4"
                        animate={false}
                      />
                      <div className="tags-list">
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            className={`tag-item${
                              selectedTag === tag ? " active" : ""
                            }`}
                            onClick={() =>
                              setSelectedTag(selectedTag === tag ? null : tag)
                            }
                          >
                            {tag}
                          </button>
                        ))}
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
                      color="tricolor"
                      text="Categories"
                      className="!text-xl !font-bold !mb-4"
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
                      color="tricolor"
                      text="Popular Tags"
                      className="!text-xl !font-bold !mb-4"
                      animate={false}
                    />
                    <div className="tags-list">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          className={`tag-item${
                            selectedTag === tag ? " active" : ""
                          }`}
                          onClick={() =>
                            setSelectedTag(selectedTag === tag ? null : tag)
                          }
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Main Blog Content */}
            <div className="blog-main">
              <div className="blog-cards-list" ref={cardsSectionRef}>
                {loading ? (
                  <div className="no-posts">
                    <h2>Loading...</h2>
                  </div>
                ) : error ? (
                  <div className="no-posts">
                    <h2>{error}</h2>
                  </div>
                ) : filteredPosts.length === 0 ? (
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
                      tags={post.tags}
                      selectedTag={selectedTag}
                      link={post.link}
                    />
                  ))
                )}
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="page-box" style={{ margin: "32px 0" }}>
                  <Pagination
                    current={currentPage}
                    pageSize={POSTS_PER_PAGE}
                    total={totalItems}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    responsive
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
