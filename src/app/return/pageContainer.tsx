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
      <div className="return-box1">
        <Container>
          <Fade direction="up">
            <div className="return-text1">{t("Returns_Exchange_Policy")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="return-text2">{t("aboutUs-HeaderSubTxt")}</div>
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
          <div className="return-txt2 color">
            {t("Please_read_all")}
            <br />
            {t("PRISM_reserves_the")}
            <br />
            {t("Please_make_your")}
          </div>
        </Fade>
        <br />

        <Fade direction="up">
          <div className="return-txt3 color">{t("Is_my_product_eligible")}</div>
          <p className="return-txt2 color">{t("All_of_the_products")}</p>
          <p className="return-txt2 color">{t("If_you_decide")}</p>
          <ul>
            <li className="return-txt2 color">{t("The_product")}</li>
            <br />
            <li className="return-txt2 color">{t("If_the_product")}</li>
            <br />
            <li className="return-txt2 color">{t("If_the_product_working")}</li>
          </ul>

          <p className="return-txt2 color">{t("If_your_item_is")}</p>
        </Fade>

        <Fade direction="up">
          <div className="return-txt3 color">{t("Cancelling_an_order")}</div>
          <p className="return-txt2 color">{t("You_may_cancel")}</p>
          <p className="return-txt2 color">{t("If_you_could")}</p>
        </Fade>

        <Fade direction="up">
          <div className="return-txt3 color">{t("Payment_refunds")}</div>
          <p className="return-txt2 color">{t("Refunds_are")}</p>

          <p className="return-txt2 color">{t("If_the_return_was")}</p>
        </Fade>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PageContainer;
