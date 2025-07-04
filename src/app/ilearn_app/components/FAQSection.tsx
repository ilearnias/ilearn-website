import React, { useState } from "react";
import Container from "@/components/common/Container";
import { FiChevronDown } from "react-icons/fi";
import Heading from "@/components/common/Heading";

type FAQ = {
  question: string;
  answer: string;
};

const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <Container>
        <Heading 
          text="Frequently Asked Questions"
          className="!text-center !text-4xl !font-bold !mb-8"
          animate={true}
        />
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item${openIndex === index ? " open" : ""}`}
              key={index}
            >
              <button
                className="faq-question"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "1rem",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  outline: "none",
                  borderBottom: "1px solid #eee",
                  transition: "background 0.2s"
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    float: "right",
                    display: "inline-block",
                    transition: "transform 0.3s",
                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                >
                  <FiChevronDown size={22} />
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                style={{
                  maxHeight: openIndex === index ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: "#fafbfc",
                  padding: openIndex === index ? "1rem" : "0 1rem",
                  opacity: openIndex === index ? 1 : 0,
                  pointerEvents: openIndex === index ? "auto" : "none"
                }}
              >
                <p style={{ margin: 0 }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection; 