"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import "./styles.scss";

// Import section components
import HomeSection from "./components/HomeSection";
import ResultsSection from "./components/ResultsSection";
import AchieversSection from "./components/AchieversSection";
import MediaSection from "./components/MediaSection";
import TestimonialsSection, { TestimonialItem } from "./components/TestimonialsSection";
import SuccessStoriesSection from "./components/SuccessStoriesSection";
import ProgramsSection from "./components/ProgramsSection";
import ApplySection from "./components/ApplySection";

const testimonialData: TestimonialItem[] = [
  {
    id: "1",
    title: "Preparation Strategy",
    subtitle: "Learn from our top students",
    videoId: "wMTD8maO6U4",
    thumbnailUrl: `https://img.youtube.com/vi/wMTD8maO6U4/maxresdefault.jpg`
  },
  {
    id: "2",
    title: "Malavika G Nair",
    subtitle: "AIR 45 - Success Story",
    videoId: "wMTD8maO6U4",
    thumbnailUrl: `https://img.youtube.com/vi/wMTD8maO6U4/maxresdefault.jpg`
  },
  {
    id: "3",
    title: "Success Journey",
    subtitle: "Path to achievement",
    videoId: "wMTD8maO6U4",
    thumbnailUrl: `https://img.youtube.com/vi/wMTD8maO6U4/maxresdefault.jpg`
  }
];

export default function PageContainer() {
  useEffect(() => {
    const bottomNav = document.querySelector(".section2-position") as HTMLElement;
    if (bottomNav) {
      bottomNav.style.position = "sticky";
      bottomNav.style.bottom = "0";

      const handleScroll = () => {
        const footer = document.getElementById("bfooter") as HTMLElement;
        if (footer && bottomNav) {
          const footerTop = footer.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (footerTop <= windowHeight) {
            bottomNav.style.position = "";
          } else {
            bottomNav.style.position = "sticky";
            bottomNav.style.bottom = "0";
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  type SectionRefs = {
    [key: string]: React.RefObject<HTMLElement>;
  };

  // Create refs outside of useMemo
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);
  const section5Ref = useRef<HTMLElement>(null);
  const section6Ref = useRef<HTMLElement>(null);
  const section7Ref = useRef<HTMLElement>(null);
  const section8Ref = useRef<HTMLElement>(null);
  const section9Ref = useRef<HTMLElement>(null);
  const section10Ref = useRef<HTMLElement>(null);
  const section11Ref = useRef<HTMLElement>(null);
  const section12Ref = useRef<HTMLElement>(null);
  const section13Ref = useRef<HTMLElement>(null);
  const section14Ref = useRef<HTMLElement>(null);
  const section15Ref = useRef<HTMLElement>(null);
  const section16Ref = useRef<HTMLElement>(null);
  const section17Ref = useRef<HTMLElement>(null);
  const section18Ref = useRef<HTMLElement>(null);

  const sectionRefs = useMemo<SectionRefs>(() => ({
    section3: section3Ref,
    section4: section4Ref,
    section5: section5Ref,
    section6: section6Ref,
    section7: section7Ref,
    section8: section8Ref,
    section9: section9Ref,
    section10: section10Ref,
    section11: section11Ref,
    section12: section12Ref,
    section13: section13Ref,
    section14: section14Ref,
    section15: section15Ref,
    section16: section16Ref,
    section17: section17Ref,
    section18: section18Ref,
  }), []);

  const scrollToSection = (sectionId: keyof SectionRefs) => {
    console.log("sectionId -- ", sectionId);
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs).forEach((ref: any) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref: any) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);


  return (
    <div className="Home-Container overflow-x-hidden">
      {/* 1. Home Section */}
      <section id="home" className="section-home">
        <HomeSection />
      </section>

      {/* 2. Result Highlights Section */}
      <section id="results" >
        <ResultsSection />
      </section>

      {/* 3. Achievers Section */}
      <section id="achievers">
        <AchieversSection />
      </section>

      {/* 4. Media Section */}
      <section id="media" >
        <MediaSection />
      </section>

      {/* 5. Student Testimonials Section */}
      <section id="testimonials" >
        <TestimonialsSection testimonials={testimonialData} />
      </section>

      {/* 6. Success Stories Section */}
      <section id="success-stories" >
        <SuccessStoriesSection />
      </section>

      {/* 7. Our Programs Section */}
      <section id="programs" >
        <ProgramsSection />
      </section>

      {/* 8. Apply Section */}
      <section id="apply" >
        <ApplySection />
      </section>
    </div>
  );
}
