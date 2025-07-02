"use client";
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
<<<<<<< HEAD
=======
  useEffect(() => {
    const bottomNav: any = document.querySelector(".section2-position");
    bottomNav.style.position = "sticky";
    bottomNav.style.bottom = "0";

    const handleScroll = () => {
      const footer: any = document.getElementById("bfooter");
      const bottomNav: any = document.querySelector(".section2-position");
      const footerTop: any = footer.getBoundingClientRect().top;
      const windowHeight: any = window.innerHeight;
      if (footerTop <= windowHeight) {
        bottomNav.style.position = "";
      } else {
        bottomNav.style.position = "sticky";
        bottomNav.style.bottom = "0";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs: any = {
    section3: useRef(null),
    section4: useRef(null),
    section5: useRef(null),
    section6: useRef(null),
    section7: useRef(null),
    section8: useRef(null),
    section9: useRef(null),
    section10: useRef(null),
    section11: useRef(null),
    section12: useRef(null),
    section13: useRef(null),
    section14: useRef(null),
    section15: useRef(null),
    section16: useRef(null),
    section17: useRef(null),
    section18: useRef(null),
  };

  const scrollToSection = (sectionId: any) => {
    console.log("sectionId -- ", sectionId);
    sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth" });
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
  }, []);

>>>>>>> master
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
