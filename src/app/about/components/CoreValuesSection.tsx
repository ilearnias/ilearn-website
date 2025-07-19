import { Row, Col } from "react-bootstrap";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { coreValues, CoreValue } from "../data/coreValues";
import { useRef, useEffect } from "react";
import "../styles.scss";
import { BiHomeHeart } from "react-icons/bi";
import { FiAward } from "react-icons/fi";

const CoreValuesSection = () => {
  const { t } = useTranslation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      className="core-values-section"
      aria-labelledby="core-values-title"
    >
      <Container>
        {/* <Fade>
          <div id="core-values-title">
            <Heading
              color="tricolor"
              text="Our Core Values"
              className="!text-center font-bold !mb-8"
              animate={true}
            />
          </div>
        </Fade> */}

        <Fade direction="up" duration={1000}>
          <div className="_heading-box">
            <div className="_heading-box-title1">Our Core Values</div>
            <div className="_heading-box-sub-title1">
              The principles that guide our approach to education and student
              care
            </div>
          </div>
          {/* </Fade>
        <Fade direction="up" duration={1000}> */}
          <Row className="g-4">
            <Col md={6}>
              <div className="_core_value_card">
                <div className="_core_value_icon">
                  <FiAward size={25} color="black" />
                </div>
                <div className="_core_value_txt1">Pursuit of Excellence</div>
                <div className="_core_value_txt2">
                  We are committed to continuous improvement in our academic
                  programs so every student can confidently pursue—and
                  achieve—their dream of becoming a civil-service officer who
                  serves Bharat.
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="_core_value_card">
                <div className="_core_value_icon">
                  <BiHomeHeart size={25} color="black" />
                </div>
                <div className="_core_value_txt1">Hospitality</div>
                <div className="_core_value_txt2">
                  {`Preparation for the civil services is a defining chapter in a
                student's life. We aim to be their "home away from home,"
                providing the emotional support and welcoming environment that
                sustains them throughout the journey.`}
                </div>
              </div>
            </Col>
            {/* {coreValues.map((value: CoreValue, index: number) => (
            <Col md={6} lg={3} key={index}>
              <Fade direction="up" delay={index * 100}>
                <div
                  className="value-card"
                  role="article"
                  aria-labelledby={`value-title-${index}`}
                  onMouseMove={handleMouseMove}
                >
                  <div className="card-content">
                    <div className="icon-wrapper" aria-hidden="true">
                      {value.icon}
                    </div>
                    <div id={`value-title-${index}`}>
                      <Heading
                        text={value.title}
                        className="!text-lg !font-semibold !leading-normal"
                        animate={false}
                      />
                    </div>
                    <p className="description">{value.description}</p>
                  </div>
                  <div className="hover-effect"></div>
                </div>
              </Fade>
            </Col>
          ))} */}
          </Row>
        </Fade>
      </Container>
    </section>
  );
};

export default CoreValuesSection;
