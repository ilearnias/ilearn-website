"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import OSP from "../../assets/icons/osp_system.svg";
import DinRail from "../../assets/icons/din_rail.svg";
import Tools from "../../assets/icons/tools_testing.svg";
import Power from "../../assets/icons/power_solution.svg";
import Racks from "../../assets/icons/racks_cabinets.svg";
import Cyber from "../../assets/icons/cyber_security.svg";
import Server from "../../assets/icons/server_storage.svg";
import AcCabinet from "../../assets/icons/ac_cabinets.svg";
import DataCentre from "../../assets/icons/data_center.svg";
import IpRacket from "../../assets/icons/ip_rated_cabinets.svg";
import OpticalFiber from "../../assets/icons/fiber_products.svg";
import CopperProducts from "../../assets/icons/copper_product.svg";
import Activenetwork from "../../assets/icons/active_networking.svg";
import CableManagement from "../../assets/icons/cable_management.svg";
import PreTermCopper from "../../assets/icons/pre_terminated_cables.svg";
import { Carousel } from "antd";

export default function Section2({ scrollToSection, activeSection }: any) {
  const { t } = useTranslation();
  const listRef: any = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(6);
  const updateSlidesToShow = () => {
    if (window.innerWidth > 1600) {
      setSlidesToShow(8);
    } else if (window.innerWidth <= 1600 && window.innerWidth > 1000) {
      setSlidesToShow(6);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 768) {
      setSlidesToShow(4);
    } else if (window.innerWidth <= 768 && window.innerWidth > 576) {
      setSlidesToShow(3);
    } else if (window.innerWidth <= 576) {
      setSlidesToShow(2);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);
  const carouselSettings = {
    dots: false,
    slidesToShow: slidesToShow,
    arrows: true,
  };

  const sections = [
    { id: "section4", icon: Activenetwork, label: "Active Networking" },
    { id: "section5", icon: Server, label: "Server & Storage" },
    { id: "section6", icon: Cyber, label: "Cyber Security", label2: "" },
    {
      id: "section7",
      icon: DataCentre,
      label: "Data Center",
      label2: "",
    },
    {
      id: "section8",
      icon: CableManagement,
      label: "Cable Management",
    },
    { id: "section9", icon: CopperProducts, label: "Copper Products" },
    {
      id: "section10",
      icon: OpticalFiber,
      label: "Optical Fiber Products",
      label2: "",
    },
    { id: "section11", icon: DinRail, label: "Din-Rail Solutions", label2: "" },
    {
      id: "section12",
      icon: PreTermCopper,
      label: "Pre-Terminated Cables",
      label2: "",
    },
    { id: "section13", icon: Racks, label: "Racks & Cabinets" },
    {
      id: "section14",
      icon: IpRacket,
      label: "IP Rated Racks & Enclosures",
      label2: "",
    },
    {
      id: "section15",
      icon: AcCabinet,
      label: "AC Cabinets",
      label2: "",
    },
    { id: "section16", icon: Tools, label: "Tools & Testing" },
    { id: "section17", icon: Power, label: "Power Solutions" },
    {
      id: "section18",
      icon: OSP,
      label: "OSP System Solutions",
      label2: "",
    },
  ];

  return (
    <div className="section2-position">
      <Container fluid>
        <Carousel {...carouselSettings} ref={listRef}>
          {sections.map((section) => (
            <div
              key={section.id}
              className={`Home-Section2Item ${
                activeSection === section.id ? "active" : ""
              }`}
              onClick={() => scrollToSection(section.id)}
            >
              <Image src={section.icon} width={0} height={0} alt="Logo" />
              <div>{section.label}</div>
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
