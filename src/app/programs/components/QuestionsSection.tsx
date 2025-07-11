import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  useAccordionButton,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import { FaChevronDown } from "react-icons/fa";
import Button from "@/components/common/Button";

interface CustomToggleProps {
  children: React.ReactNode;
  eventKey: string;
  isActive: boolean;
}

const CustomToggle = ({ children, eventKey, isActive }: CustomToggleProps) => {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div
      className="d-flex justify-content-between align-items-center w-100 cursor-pointer"
      onClick={decoratedOnClick}
    >
      {children}
      <FaChevronDown
        className={`transition-transform ${isActive ? "rotate-180" : ""}`}
      />
    </div>
  );
};

const QuestionsSection = () => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<string>("");

  const faqItems = [
    {
      question: "How do I enroll in a program?",
      answer:
        "Click on the 'View Program Details' button of your chosen program and follow the enrollment instructions.",
    },
    {
      question: "Are there any scholarships available?",
      answer:
        "Yes, we offer merit-based scholarships. Contact our admissions team for more details.",
    },
    {
      question: "Do you offer online classes?",
      answer:
        "Yes, we offer both online and offline classes to accommodate different learning preferences.",
    },
    {
      question: "What is your batch size?",
      answer:
        "We maintain small batch sizes of 30-40 students to ensure personalized attention.",
    },
    {
      question: "What is the duration of the program?",
      answer:
        "The program duration varies based on the course you choose. Our foundation course is 8 months, while specialized courses range from 3-6 months.",
    },
    {
      question: "How are the classes conducted?",
      answer:
        "We offer both online and offline classes. Online classes are conducted through our interactive learning platform, while offline classes are held at our centers in Kerala.",
    },
    {
      question: "What study materials are provided?",
      answer:
        "Students receive comprehensive study materials including printed notes, online resources, practice questions, and mock test papers.",
    },
    {
      question: "Is there a mock test series?",
      answer:
        "Yes, we conduct regular mock tests that simulate the actual UPSC exam pattern. These tests help students assess their preparation and improve their performance.",
    },
  ];

  return (
    <div className="questions-section py-5">
      <Container>
        <div className="text-center mb-12">
          <Heading
            text={<>Frequently Asked Questions</>}
            color="tricolor"
            className="font-bold md:leading-[0.1] leading-[1.1]"
          />
          <TextLabel
            text="Find answers to common questions about our programs and learning approach"
            color="gray"
            variant="default"
            className="mt-4"
          />
        </div>

        <Row className="justify-content-center">
          <Col md={8}>
            <div className="space-y-6">
              <Accordion
                activeKey={activeKey}
                onSelect={(key) => setActiveKey(key as string)}
              >
                {faqItems.map((item, index) => (
                  <Accordion.Item
                    key={index}
                    eventKey={index.toString()}
                    className="faq-item mb-3"
                  >
                    <Accordion.Header as="div">
                      <CustomToggle
                        eventKey={index.toString()}
                        isActive={activeKey === index.toString()}
                      >
                        <SubHeading
                          text={item.question}
                          size="small"
                          color="black"
                        />
                      </CustomToggle>
                    </Accordion.Header>
                    <Accordion.Body>
                      <TextLabel
                        text={item.answer}
                        color="gray"
                        variant="default"
                        className="mt-2"
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={6} className="text-center">
            <Button href="/contact" className="!text-black" variant="primary">
              Contact us for more information
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuestionsSection;
