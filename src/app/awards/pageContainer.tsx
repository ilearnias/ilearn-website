"use client";
import "./styles.scss";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import img1 from "../../app/assets/awards/Alba.jpg";
import img5 from "../../app/assets/awards/Bahrain-Airport-Services.jpg";
import img4 from "../../app/assets/awards/Bahrain-Defence-Force.jpg";
import img8 from "../../app/assets/awards/Bapco.jpg";
import img2 from "../../app/assets/awards/Batelco.jpg";
import img9 from "../../app/assets/awards/Labour-Fund-(Tamkeen).jpg";
import img3 from "../../app/assets/awards/Ministry-of-Information-affairs.jpg";
import img10 from "../../app/assets/awards/Nesto.jpg";
import img11 from "../../app/assets/awards/Electricity-and-Water-Authority.jpg";
import img12 from "../../app/assets/awards/SBI.jpg";
import img6 from "../../app/assets/awards/US-Navybase-Bahrain.jpg";






const PageContainer = () => {
  const { t } = useTranslation();
  const awards = [
    {
      img: img1,
      name: t("Alba"),
    },
    {
      img: img2,
      name: t("Batelco"),
    },
    {
      img: img3,
      name: t("Ministry_of_Information_affairs"),
    },
    {
      img: img4,
      name: t("Bahrain_Defense_Force"),
    },
    {
      img: img5,
      name: t("Bahrain_Airport_Services"),
    },
    {
      img: img6,
      name: t("US_Navybase_Bahrain"),
    },

    {
      img: img8,
      name: t("Bapco"),
    },
    {
      img: img9,
      name: t("Labour_Fund_(Tamkeen)"),
    },
    {
      img: img10,
      name: t("Nesto"),
    },
    {
      img: img11,
      name: t("Electricity_and_Water_Authority"),
    },
    {
      img: img12,
      name: t("State_Bank_Of_India_(O.B.U)"),
    },
  ];
  return (
    <div>
      <Header />

      <div className="awards-container">
        <div className="awards-box1">
          <Container>
            <div className="awards-text1">{t("Awards_and_Accreditations")}</div>
            <div className="awards-text2">{t("As_an_innovative")}</div>
          </Container>
        </div>
        <br />
        <br />
        <br />
        <Container>
          <Row className="gy-4">
            {awards.map((item, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12}>
                <Fade direction="up" className="h-100">
                  <div className="awards-card">
                    <div className="d-flex justify-content-center">
                      <Image
                        className="awards-img"
                        src={item.img}
                        alt=""
                        layout="responsive"
                      />
                    </div>
                    <div className="awards-cardTxt">{item.name}</div>
                  </div>
                </Fade>
              </Col>
            ))}
          </Row>
        </Container>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default PageContainer;
