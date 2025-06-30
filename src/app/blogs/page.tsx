"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import HeroSection from "@/components/common/HeroSection";

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <Header />
      <HeroSection title="Our Blog" pageName="Blog" />
      

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span> &gt; </span>
        <span>Blog</span>
      </div>

      {/* Main Content */}
      <div className="blog-content">
        {/* Left Sidebar */}
        <div className="blog-sidebar">
          <div className="categories-section">
            <h2>Categories</h2>
            <div className="category-list">
              <button className="category-item active">All Posts</button>
              {/* Add more categories here as needed */}
            </div>
          </div>

          <div className="tags-section">
            <h2>Popular Tags</h2>
            <div className="tags-list">
              {/* Add tags here */}
            </div>
          </div>
        </div>

        {/* Main Blog Content */}
        <div className="blog-main">
          <div className="no-posts">
            <h2>No posts found</h2>
            <p>There are no blog posts available at the moment.</p>
            <button className="view-all-btn">View All Posts</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
