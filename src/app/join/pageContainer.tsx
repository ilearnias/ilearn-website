"use client";
import "./styles.scss";
import React from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";

const PageContainer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="join-container">
        <div className="join-box1">
          <Container>
            <Fade direction="up" delay={200}>
              <div className="join-text1">{t("Join_With_Us")}</div>
              <div className="join-text2">{t("At_Connect_Networks")}</div>
            </Fade>
          </Container>
        </div>
        <div className="join-box2">
          <Container>
            <Fade direction="up" delay={200}>
              <div className="join-text3">{t("Why_Join_Us")}</div>
              <div className="join-text4">{t("Joining_Connect")}</div>
            </Fade>
            <br />
            <Fade direction="up" delay={200}>
              <div className="join-text3">{t("Our_Values")}</div>
              <div className="join-text4">{t("Our_core_values")}</div>
            </Fade>
            <br />
            <Fade direction="up" delay={200}>
              <div className="join-text3">{t("How_to_Join")}</div>
              <div className="join-text4">
                {t("Becoming_part_of")}&nbsp;
                <a href="mailto:info@prismwll.com">info@prismwll.com</a>
                &nbsp;{t("Out_team_will")}
              </div>
            </Fade>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageContainer;
