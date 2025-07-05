import { Col, Row } from "react-bootstrap";
import { FaStar, FaMobileAlt, FaLock, FaRocket } from "react-icons/fa";
import { IconType } from "react-icons";
import Container from "@/components/common/Container";
import { motion } from "framer-motion";
import Heading from "@/components/common/Heading";

type Feature = {
  title: string;
  description: string;
  icon?: IconType;
};

// Default icons for demonstration
const defaultIcons: IconType[] = [FaStar, FaMobileAlt, FaLock, FaRocket];

const FeaturesSection = ({ features }: { features: Feature[] }) => (
  <section className="features-section">
    <Container>
      <Heading
        color="tricolor"
        text="App Features"
        className="!text-center !font-bold !mb-8"
        animate={true}
      />
      <Row className="feature-row">
        {features.map((feature, index) => {
          const Icon =
            feature.icon || defaultIcons[index % defaultIcons.length];
          return (
            <Col md={3} sm={6} key={index} className="feature-col">
              <motion.div
                className="feature-card"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="feature-icon">
                  <Icon />
                </div>
                <Heading
                  color="white"
                  text={feature.title}
                  className="!text-xl !font-bold !mb-2"
                />
                <p>{feature.description}</p>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Container>
  </section>
);

export default FeaturesSection;
