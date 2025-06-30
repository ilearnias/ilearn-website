import { Row, Col } from "react-bootstrap";
import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { FaGraduationCap, FaUsers, FaChartLine, FaHeart } from "react-icons/fa";

const values = [
  {
    icon: <FaGraduationCap size={40} />,
    title: "Academic Excellence",
    description: "Commitment to providing top-quality education and guidance"
  },
  {
    icon: <FaUsers size={40} />,
    title: "Personal Mentorship",
    description: "Individual attention and support for every aspirant"
  },
  {
    icon: <FaChartLine size={40} />,
    title: "Continuous Growth",
    description: "Focus on consistent improvement and development"
  },
  {
    icon: <FaHeart size={40} />,
    title: "Student Care",
    description: "Nurturing environment that supports holistic growth"
  }
];

const CoreValuesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="core-values-section">
      <Container>
        <Fade>
          <h2 className="section-title">Our Core Values</h2>
        </Fade>
        <Row>
          {values.map((value, index) => (
            <Col md={6} lg={3} key={index}>
              <Fade direction="up" delay={index * 100}>
                <div className="value-card">
                  <div className="icon">{value.icon}</div>
                  <h3 className="title">{value.title}</h3>
                  <p className="description">{value.description}</p>
                </div>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CoreValuesSection; 