"use client";
import "./styles.scss";
import React from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Team from "../assets/images/Prism_ORG-CHART-Final_converted.png";
import Image from "next/image";

const PageContainer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />

      <div className="team-container">
        <div className="team-box1">
          <Container>
            <div className="team-text1">{t("OurTeam")}</div>
          </Container>
        </div>
        <br />
        <Container>
          <Image
            src={Team}
            width={0}
            height={0}
            alt="1"
            className="team-img1"
          />
        </Container>
        <br />
      </div>

      <Footer />
    </div>
  );
};

export default PageContainer;
