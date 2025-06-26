"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PageContainer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="shipping-box1">
        <Container>
          <Fade>
            <div className="shipping-text1">{t("Shipping_Delivery")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="shipping-text2">{t("At_Connect")}</div>
              </Fade>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>

      <br />
      <br />

      <Container>
        <Fade direction="up">
          <p className="shipping-txt2 color">{t("When_you_place")}</p>
        </Fade>
        <Fade direction="up">
          <p className="shipping-txt2 color">{t("We_have_contracted")}</p>
        </Fade>
        <br />
        <Fade direction="up">
          <div className="shipping-txt3 color">{t("We_ship_to")}</div>

          <p className="shipping-txt2 color">{t("PRISM_ships_to")}</p>
        </Fade>

        <Fade direction="up">
          <div className="shipping-txt3 color">{t("Delivery_within_KSA")}</div>
          <p className="shipping-txt2 color">{t("KSA_orders_are")}</p>
        </Fade>

        <Fade direction="up">
          <div className="shipping-txt3 color">
            {t("International_shipping")}
          </div>
          <p className="shipping-txt2 color">{t("We_have_partnered")}</p>
        </Fade>

        <Fade direction="up">
          <div className="shipping-txt3 color">
            {t("Estimated_delivery_time")}
          </div>
          <p className="shipping-txt2 color">
            {t("Riyadh_Dammam")}
            <br />
            {t("GCC_Countries")}
          </p>
        </Fade>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PageContainer;
