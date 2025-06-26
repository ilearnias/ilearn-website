"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation, UseTranslation } from "next-i18next";
function Warranty() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="Warranty-box1">
        <Container>
          <Fade>
            <div className="Warranty-txt1">{t("Warranty_Policy")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="Warranty-txt2">{t("Our_warranty")}</div>
              </Fade>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>
      <div className="Warranty-box2">
        <Container>
          <Fade>
            <div className="Warranty-txt4 color">{t("If_your_item")}</div>
            <br />
          </Fade>
          <Fade>
            <div className="Warranty-txt3 color">{t("Where_is_the")}</div>
            <div className="Warranty-txt4 color">{t("The_warranty")}</div>
            <br />
          </Fade>
          <Fade>
            <div className="Warranty-txt3 color">{t("Who_will_pay")}</div>
            <div className="Warranty-txt4 color">{t("Shipping_costs")}</div>
            <br />
          </Fade>
          <Fade>
            <div className="Warranty-txt3 color">{t("Warranty_policy")}</div>
            <ul>
              <li className="Warranty-txt4 color">{t("Please_note")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("Not_all_products")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("Repair_or")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("The_time_required")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("The_customer")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("The_warranty_will")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("Defect_or_damage")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("Liquid_spill_on")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("Product_having")}</li>
              <br />
              <li className="Warranty-txt4 color">{t("The_customer_shall")}</li>
              <br />
            </ul>
            <br />
          </Fade>
          <Fade>
            <div className="Warranty-txt4 color">
              {t("For_more_information")}{" "}
              <a href="mailto:info@prismwll.com">info@prismwll.com</a>
              &nbsp;
              {t("social_media")}
            </div>
          </Fade>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Warranty;
