import { Row, Col } from "react-bootstrap";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { coreValues, CoreValue } from "../data/coreValues";
import { useRef, useEffect } from "react";
import "../styles/coreValues.scss";

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
            <div className="_heading-box-sub-title1"></div>
          </div>
        </Fade>
        <Row className="g-4">
          {coreValues.map((value: CoreValue, index: number) => (
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
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CoreValuesSection;
