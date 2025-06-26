"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Fade } from "react-awesome-reveal";
import { Logo } from "./components/vendorItem";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Acceltex from "../assets/partners/Acceltex@4x.png";
import Afl from "../assets/partners/AFL@4x.png";
import Apc from "../assets/partners/APC@4x.png";
import Aruba from "../assets/partners/Aruba@4x.png";
import Aten from "../assets/partners/ATEN@4x.png";
import Avaya from "../assets/partners/Avaya@4x.png";
import Belden from "../assets/partners/Belden@4x.png";
import Brother from "../assets/partners/Brother@4x.png";
import Casio from "../assets/partners/Casio@4x.png";
import Cisco from "../assets/partners/Cisco@4x.png";
import Corning from "../assets/partners/Corning@4x.png";
import Dell from "../assets/partners/Dell@4x.png";
import Dinspace from "../assets/partners/Dinspace@4x.png";
import Eaton from "../assets/partners/Eaton@4x.png";
import Exfo from "../assets/partners/Exfo@4x.png";
import Fluke from "../assets/partners/Fluke@4x.png";
import Fortinet from "../assets/partners/Fortinet@4x.png";
import Fujikura from "../assets/partners/Fujikura@4x.png";
import Hirschmann from "../assets/partners/Hirschmannn@4x.png";
import Huawei from "../assets/partners/Huawei@4x.png";
import Hubbell from "../assets/partners/Hubbel@4x.png";
import Juniper from "../assets/partners/Juniper@4x.png";
import Microsift from "../assets/partners/Microsoft@4x.png";
import Paloalto from "../assets/partners/Paloalto@4x.png";
import Panduit from "../assets/partners/Panduit@4x.png";
import Rittal from "../assets/partners/Rittal@4x.png";
import Sophos from "../assets/partners/Sophos@4x.png";
import Superior from "../assets/partners/Superior Essex@4x.png";
import Ubiquiti from "../assets/partners/Ubiqu@4x.png";
import Vertiv from "../assets/partners/Vertiv@4x.png";
import Finosel from "../assets/partners/Finosel@4x.png";
import Commscope from "../assets/partners/Commscope@4x.png";
import Ruijie from "../assets/partners/ruijie.png";
import Trend from "../assets/partners/Trend Networks@4x.png";
import KTI from "../assets/partners/kti.png";
import Chatsworth from "../assets/partners/Chatsworth Products@4x.png";
import Moxa from "../assets/partners/Moxa.png";
import grandstream from "../assets/partners/grandstream.png";
export default function PageContainer() {
  const { t } = useTranslation();

  return (
    <div className="vendor-Container">
      <Header />
      <div className="vendor-box1">
        <Container>
          <Fade>
            <div className="vendor-text1">{t("Vendors")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="vendor-text2">{t("vendor-HeaderSubTxt")}</div>
              </Fade>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <Container>
        <div className="vendor-title">{t("Distributors")}</div>
        <Row className="justify-content-center">
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Finosel} />
            </Fade>
          </Col>
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Acceltex} />{" "}
            </Fade>
          </Col>
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Huawei} />{" "}
            </Fade>
          </Col>
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Hubbell} />{" "}
            </Fade>
          </Col>
        </Row>
        <Row className="justify-content-center">
          
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Trend} />{" "}
            </Fade>
          </Col>
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={KTI} />{" "}
            </Fade>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <div className="vendor-title">{t("Sub_Distributors")}</div>
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Commscope} />{" "}
            </Fade>
          </Col>
          <Col md={2}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Apc} />{" "}
            </Fade>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <div className="vendor-title">{t("Partners")}</div>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Afl} />{" "}
            </Fade>
          </Col>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Aruba} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Aten} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Avaya} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Belden} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Brother} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Casio} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Chatsworth} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Cisco} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Corning} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Dell} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Dinspace} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Eaton} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Exfo} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Vertiv} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Ubiquiti} />{" "}
            </Fade>
          </Col>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Superior} />{" "}
            </Fade>
          </Col>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Sophos} />{" "}
            </Fade>
          </Col>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Rittal} />{" "}
            </Fade>
          </Col>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Panduit} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Paloalto} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Microsift} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Juniper} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Hirschmann} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Fujikura} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Fortinet} />{" "}
            </Fade>
          </Col>

          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Fluke} />{" "}
            </Fade>
          </Col>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={Moxa} />{" "}
            </Fade>
          </Col>
          <Col md="2" xs={6}>
            <Fade direction="up" style={{ height: "100%" }}>
              <Logo img={grandstream} />{" "}
            </Fade>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
