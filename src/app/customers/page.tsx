"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Logo } from "./components/image";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";


import Almoid from "../assets/customers/Al-Moayyed.jpg";
import Binhindi from "../assets/customers/Bin-Hindi-Informatics.jpg";
import Canar from "../assets/customers/Canar.jpg";
import Ebrahimk from "../assets/customers/Ebrahim-K-Kanoo.jpg";
import Fits from "../assets/customers/Fits.jpg";
import Gbm from "../assets/customers/GBM.jpg";
import HilalComputer from "../assets/customers/Hilal-Computers.jpg";
import Acme from "../assets/customers/img1.jpg";
import MidalCable from "../assets/customers/Midal-Cables.jpg";
import OregonSystem from "../assets/customers/Oregon-Systems.jpg";
import Pke from "../assets/customers/PKE.jpg";
import Q4s from "../assets/customers/Q4S.jpg";
import SecureCash from "../assets/customers/Secure-Cash-Processing.jpg";
import UniData from "../assets/customers/Uni-Data.jpg";
import Yokagava from "../assets/customers/Yokogawa.jpg";





import { useTranslation } from "react-i18next";

export default function Customers() {
  const { t } = useTranslation();

  return (
    <div className="customers-Container">
      <Header />
      <div className="customers-box1 ">
        <Container>
          <Fade>
            <div className="customers-text1">{t("Our Customers")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up" style={{ height: "100%" }}>
                <div className="customers-text2">
                  {t("customer-HeaderSubTxt")}
                </div>
              </Fade>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <div className="customers-box2">
        <Container>
          <Row>
            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                <Logo img={Almoid} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                <Logo img={Binhindi} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                <Logo img={UniData} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                <Logo img={Ebrahimk} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={Fits} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={Gbm} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={HilalComputer} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={Canar} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={Acme} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={MidalCable} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                <Logo img={OregonSystem} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                <Logo img={Pke} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={Q4s} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={SecureCash} />
              </Fade>
            </Col>

            <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                {" "}
                <Logo img={Yokagava} />
              </Fade>
            </Col>

            {/* new update */}
            {/* <Col md="2" xs={6}>
              <Fade direction="up" style={{ height: "100%" }}>
                <Logo img={Almoid} />
              </Fade>
            </Col> */}

          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
