"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PageContainer = () => {
  const { t } = useTranslation();

  return (
    <div className="about-Container">
      <Header />
      <div className="about-box1">
        <Container>
          <Fade>
            <div className="about-text1">{t("About Us")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="about-text2">{t("aboutUs-HeaderSubTxt")}</div>
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
          <div className="about-txt3">{t("aboutUsSubTxt1")}</div>

          <div className="about-txt3">{t("aboutUsSubTxt2")}</div>

          <div className="about-txt3">{t("aboutUsSubTxt3")}</div>

          <div className="about-txt1">{t("Our Vision")}</div>
          <div className="about-txt3">{t("visionSubTxt")}</div>

          <div className="about-txt1">{t("Our Mission")}</div>
          <div className="about-txt3">{t("missionSubTxt")}</div>

          <div className="about-txt1">{t("OurGuiding")}</div>

          <div className="about-txt2">{t("Integrity")}</div>
          <div className="about-txt3">{t("IntegritySubTxt")}</div>

          <div className="about-txt2">{t("Responsibility")}</div>
          <div className="about-txt3">{t("ResponsibilitySubTxt")}</div>

          <div className="about-txt2">{t("Talent")}</div>
          <div className="about-txt3">{t("TalentSubTxt")}</div>

          <div className="about-txt2">{t("Results")}</div>
          <div className="about-txt3">{t("ResultSubTxt")}</div>

          <div className="about-txt1">{t("Why")}</div>

          <div className="about-txt2">{t("Proven Track Record")}</div>
          <div className="about-txt3">{t("trackSubTxt")}</div>

          <div className="about-txt2">{t("Experienced Team")}</div>
          <div className="about-txt3">{t("ExperienceSubTxt")}</div>

          <div className="about-txt2">{t("DominantPresence")}</div>
          <div className="about-txt3">{t("DominantPresenceSubTxt")}</div>

          <div className="about-txt2">{t("Comprehensive Stock")}</div>
          <div className="about-txt3">{t("ComprehensiveSubTxt")}</div>

          <div className="about-txt2">{t("Diverse Options")}</div>
          <div className="about-txt3">{t("DiverseSubTxt")}</div>

          <div className="about-txt2">{t("CentralWarehouse")}</div>
          <div className="about-txt3">{t("CentralWarehouseSubTxt")}</div>

          <div className="about-txt2">{t("Commitment to Quality")}</div>
          <div className="about-txt3">{t("CommitmentSubTxt")}</div>

          <div className="about-txt2">{t("Extensive Industry Experience")}</div>
          <div className="about-txt3">{t("IndustryExpSubTxt")}</div>

          <div className="about-txt2">{t("Exceptional Customer Service")}</div>
          <div className="about-txt3">{t("CustomerSerSubTxt")}</div>

          <div className="about-txt2">{t("Timely Delivery")}</div>
          <div className="about-txt3">{t("TimelyDelSubTxt")}</div>

          <div className="about-txt2">{t("Commitment to Sustainability")}</div>
          <div className="about-txt3">{t("SustainabilitySubTxt")}</div>
        </Fade>
        <br />
        <br />
      </Container>
      <Footer />
    </div>
  );
};

export default PageContainer;
