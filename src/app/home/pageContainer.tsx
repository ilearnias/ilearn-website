"use client";
import { useEffect, useRef, useState } from "react";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section4 from "./components/section4";
import Section5 from "./components/section5";
import Section6 from "./components/section6";
import Section7 from "./components/section7";
import Section8 from "./components/section8";
import Section9 from "./components/section9";
import Section10 from "./components/section10";
import Section11 from "./components/section11";
import Section12 from "./components/section12";
import Section14 from "./components/section14";
import Section13 from "./components/section13";
import Section15 from "./components/section15";
import Section16 from "./components/section16";
import Section17 from "./components/section17";
import Section18 from "./components/section18";
import { TawkToScript } from "./tawkToScript";

export default function PageContainer() {
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

  return (
    <>
      <Header />
      <div className="Home-Container">
        {/* <Section1 /> */}

        {/* Active Network */}
        <section data-section id="section4" ref={sectionRefs.section4}>
          <Section4 />
        </section>

        {/* Server & Storage */}
        <section data-section id="section5" ref={sectionRefs.section5}>
          <Section5 />
        </section>

        {/* Cyber Security System */}
        <section data-section id="section6" ref={sectionRefs.section6}>
          <Section6 />
        </section>

        {/* Data Center Solutions */}
        <section data-section id="section7" ref={sectionRefs.section7}>
          <Section7 />
        </section>

        {/* Cable Management */}
        <section data-section id="section8" ref={sectionRefs.section8}>
          <Section8 />
        </section>

        {/* Copper Products */}
        <section data-section id="section9" ref={sectionRefs.section9}>
          <Section9 />
        </section>

        {/* Optical Fiber Products */}
        <section data-section id="section10" ref={sectionRefs.section10}>
          <Section10 />
        </section>

        {/* Din-Rail Solutions */}
        <section data-section id="section11" ref={sectionRefs.section11}>
          <Section11 />
        </section>

        {/* Pre-Terminated Copper & Fiber Cables */}
        <section data-section id="section12" ref={sectionRefs.section12}>
          <Section12 />
        </section>

        {/* Racks & Cabinets */}
        <section data-section id="section13" ref={sectionRefs.section13}>
          <Section13 />
        </section>

        {/* IP Rated Racks & Enclosures */}
        <section data-section id="section14" ref={sectionRefs.section14}>
          <Section14 />
        </section>

        {/* Air-Conditioned Cabinets */}
        <section data-section id="section15" ref={sectionRefs.section15}>
          <Section15 />
        </section>

        {/* Toolts & Testing */}
        <section data-section id="section16" ref={sectionRefs.section16}>
          <Section16 />
        </section>

        {/* Power Solution */}
        <section data-section id="section17" ref={sectionRefs.section17}>
          <Section17 />
        </section>

        {/* Outside Plant (OSP) System Solutions */}
        <section data-section id="section18" ref={sectionRefs.section18}>
          <Section18 />
        </section>
      </div>
      <Section2
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />
      <Footer />
      {/* <TawkToScript /> */}
    </>
  );
}
