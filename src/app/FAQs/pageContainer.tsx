"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import faqItems from "./faqItem.json";

const PageContainer = () => {
  const { t } = useTranslation();
  const [openItemId, setOpenItemId] = useState(1);

  const toggleAccordion = (id: any) => {
    setOpenItemId((prevOpenItemId: any) => (prevOpenItemId === id ? null : id));
  };

  return (
    <div className="faq-Container">
      <Header />
      <div className="faq-box1">
        <Container>
          <Fade>
            <div className="faq-text1">{t("FAQs")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="faq-text2">{t("Answers_to_Frequently")}</div>
              </Fade>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <Container>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <div className="faq-accordianBox">
              {faqItems.map((item) => (
                <div
                  className={`faq-accordianItems ${
                    openItemId === item.id ? "open" : "closed"
                  }`}
                  key={item.id}
                >
                  <div
                    className="faq-accordianHeader"
                    onClick={() => toggleAccordion(item.id)}
                  >
                    <div className="faq-questiontxt">
                      {item.question.replace(/t\('([^']+)'\)/g, (_, key) =>
                        t(key)
                      )}
                    </div>
                    <div className="faq-accordianIconBox">
                      {openItemId === item.id ? (
                        <FaMinus color="#585B63" />
                      ) : (
                        <FaPlus color="#585B63" />
                      )}
                    </div>
                  </div>
                  {openItemId === item.id && (
                    <div
                      className="faq-answertxt mt-2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {item.answer.replace(/t\('([^']+)'\)/g, (_, key) =>
                        t(key)
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PageContainer;
