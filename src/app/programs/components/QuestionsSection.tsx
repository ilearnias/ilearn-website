import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/SubHeading';
import TextLabel from '@/components/common/TextLabel';

const QuestionsSection = () => {
  const { t } = useTranslation();

  return (
    <div className="questions-section py-5">
      <Container>
        <div className="text-center mb-12">
          <Heading text={<>Frequently Asked Questions</>} color="black" />
          <TextLabel 
            text="Find answers to common questions about our programs and learning approach" 
            color="gray" 
            variant="default" 
            className="mt-4"
          />
        </div>

        <Row className="justify-content-center">
          <Col sm={8} className="text-center mb-5">
            <Fade direction="up">
              <p className="text-muted">
                Find answers to common questions about our programs and admission process.
              </p>
            </Fade>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            <Fade direction="up">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="How do I enroll in a program?" size="small" color="black" />
                  <TextLabel 
                    text="Click on the 'View Program Details' button of your chosen program and follow the enrollment instructions." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="Are there any scholarships available?" size="small" color="black" />
                  <TextLabel 
                    text="Yes, we offer merit-based scholarships. Contact our admissions team for more details." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="Do you offer online classes?" size="small" color="black" />
                  <TextLabel 
                    text="Yes, we offer both online and offline classes to accommodate different learning preferences." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="What is your batch size?" size="small" color="black" />
                  <TextLabel 
                    text="We maintain small batch sizes of 30-40 students to ensure personalized attention." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="What is the duration of the program?" size="small" color="black" />
                  <TextLabel 
                    text="The program duration varies based on the course you choose. Our foundation course is 8 months, while specialized courses range from 3-6 months." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="How are the classes conducted?" size="small" color="black" />
                  <TextLabel 
                    text="We offer both online and offline classes. Online classes are conducted through our interactive learning platform, while offline classes are held at our centers in Kerala." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="What study materials are provided?" size="small" color="black" />
                  <TextLabel 
                    text="Students receive comprehensive study materials including printed notes, online resources, practice questions, and mock test papers." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <SubHeading text="Is there a mock test series?" size="small" color="black" />
                  <TextLabel 
                    text="Yes, we conduct regular mock tests that simulate the actual UPSC exam pattern. These tests help students assess their preparation and improve their performance." 
                    color="gray" 
                    variant="default" 
                    className="mt-2"
                  />
                </div>
              </div>
            </Fade>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={6} className="text-center">
            <Fade direction="up">
              <a href="/contact" className="btn btn-primary">
                Contact us for more information
              </a>
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuestionsSection; 