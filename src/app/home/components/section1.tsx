"use client";
import Image from "next/image";
import { Carousel } from "antd";
import { useTranslation } from "react-i18next";
import Gif from "../../assets/images/move.gif";
import React, { useEffect, useState } from "react";

import Afl from "../../assets/partners/AFL@4x.png";
import Apc from "../../assets/partners/APC@4x.png";
import KTI from "../../assets/partners/kti.png";
import Aten from "../../assets/partners/ATEN@4x.png";
import Dell from "../../assets/partners/Dell@4x.png";
import Exfo from "../../assets/partners/Exfo@4x.png";
import Aruba from "../../assets/partners/Aruba@4x.png";
import Avaya from "../../assets/partners/Avaya@4x.png";
import Casio from "../../assets/partners/Casio@4x.png";
import Cisco from "../../assets/partners/Cisco@4x.png";
import Eaton from "../../assets/partners/Eaton@4x.png";
import Fluke from "../../assets/partners/Fluke@4x.png";
import Belden from "../../assets/partners/Belden@4x.png";
import Huawei from "../../assets/partners/Huawei@4x.png";
import Rittal from "../../assets/partners/Rittal@4x.png";
import Sophos from "../../assets/partners/Sophos@4x.png";
import Vertiv from "../../assets/partners/Vertiv@4x.png";
import Ruijie from "../../assets/partners/ruijie.png";
import Brother from "../../assets/partners/Brother@4x.png";
import Corning from "../../assets/partners/Corning@4x.png";
import Dinspace from "../../assets/partners/Dinspace@4x.png";
import Hubbell from "../../assets/partners/Hubbel@4x.png";
import Juniper from "../../assets/partners/Juniper@4x.png";
import Finosel from "../../assets/partners/Finosel@4x.png";
import Panduit from "../../assets/partners/Panduit@4x.png";
import Fortinet from "../../assets/partners/Fortinet@4x.png";
import Fujikura from "../../assets/partners/Fujikura@4x.png";
import Acceltex from "../../assets/partners/Acceltex@4x.png";
import Superior from "../../assets/partners/Superior Essex@4x.png";
import Ubiquiti from "../../assets/partners/Ubiqu@4x.png";
import Paloalto from "../../assets/partners/Paloalto@4x.png";
import Microsift from "../../assets/partners/Microsoft@4x.png";
import Commscope from "../../assets/partners/Commscope@4x.png";
import Chatsworth from "../../assets/partners/Chatsworth Products@4x.png";
import Hirschmann from "../../assets/partners/Hirschmannn@4x.png";
import Trend from "../../assets/partners/Trend Networks@4x.png";
import { Container } from "react-bootstrap";

const images = [
  Acceltex,
  Afl,
  Apc,
  Aruba,
  Aten,
  Avaya,
  Belden,
  Brother,
  Casio,
  Cisco,
  Corning,
  Dell,
  Dinspace,
  Eaton,
  Exfo,
  Fluke,
  Fortinet,
  Fujikura,
  Hirschmann,
  Huawei,
  Hubbell,
  Juniper,
  Microsift,
  Paloalto,
  Panduit,
  Rittal,
  Sophos,
  Superior,
  Ubiquiti,
  Vertiv,
  Finosel,
  Commscope,
  Ruijie,
  Trend,
  KTI,
  Chatsworth,
];

export default function Section1() {
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
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
    dots: false,
  };

  const carouselSettings2 = {
    slidesToShow: slidesToShow,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    dots: false,
  };

  const { t } = useTranslation();
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="Home-Parallax1">
      {/* <video
        loop
        autoPlay={true}
        id="vid"
        muted
        playsInline
        className="Home-video1"
      >
        <source type="video/mp4" src={"bg7.mp4"} />
      </video> */}
      <div className="Home-videoHover">
        <br />

        <Carousel className="Carousel1" {...carouselSettings}>
          <div>
            <h1 className="Home-text3">{t("Connecting_the_Future_of_IT")}</h1>
            <div className="Home-text4">{t("Your_Preferred_VAD")}</div>
          </div>
          <div>
            <h1 className="Home-text3">{t("Delivering_What_Matters")}</h1>
            <div className="Home-text4">{t("One_window_solution")}</div>
          </div>
          <div>
            <h1 className="Home-text3">{t("IP_Networking_and_ICT")}</h1>
            <div className="Home-text4">{t("Your_Trusted_Partner")}</div>
          </div>
        </Carousel>

        <div className="Home-Section1"></div>

        <Image
          src={Gif}
          width={100}
          alt="Logo"
          onClick={scrollDown}
          className="cursor-pointer mb-5"
        />
        <div className="Carousel2">
          <Container fluid>
            <Carousel {...carouselSettings2}>
              {images.map((img, index) => (
                <div key={index} className="brand-imgDiv">
                  <Image src={img} className="brand-img" alt="" />
                </div>
              ))}
            </Carousel>
          </Container>
        </div>
      </div>
    </div>
  );
}
