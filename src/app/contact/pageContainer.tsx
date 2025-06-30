"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import HeroSection from "@/components/common/HeroSection";
import "./styles.scss";

const PageContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <HeroSection title="Get in Touch" pageName="Contact Us" />
      <div className="contact-container">
        <Container>
          <div className="contact-header text-center">
            <h2>
              Contact <span className="text-primary">Us</span>
            </h2>
            <p className="subtitle">
              Get in touch with us for inquiries about our programs, admission process,
              or to schedule a counselling session.
            </p>
          </div>

          <div className="contact-details">
            <div className="location-info">
              <div className="info-item">
                <FaMapMarkerAlt className="icon" />
                <div className="info-content">
                  <h2>Our Location</h2>
                  <p>iLearn IAS Academy, Minchin Road, Chakka, Thiruvananthapuram, Kerala 695011</p>
                </div>
              </div>
              <div className="info-item">
                <FaClock className="icon" />
                <div className="info-content">
                  <h2>Working Hours</h2>
                  <p>Monday to Saturday: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: Closed (Online support available)</p>
                </div>
              </div>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <FaPhone className="icon" />
                <div className="method-content">
                  <h3>Phone</h3>
                  <p>8089166792</p>
                  <a href="tel:8089166792" className="contact-link">
                    Call Now
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <FaWhatsapp className="icon" />
                <div className="method-content">
                  <h3>WhatsApp</h3>
                  <p>Chat with us for quick responses</p>
                  <div className="whatsapp-links">
                    <a href="#" className="contact-link">Chat Now</a>
                    <a href="#" className="contact-link">Send Inquiry</a>
                  </div>
                </div>
              </div>

              <div className="contact-method">
                <FaEnvelope className="icon" />
                <div className="method-content">
                  <h3>Email</h3>
                  <p>ilearnoffic@gmail.com</p>
                  <a href="mailto:ilearnoffic@gmail.com" className="contact-link">
                    Send Email
                  </a>
                </div>
              </div>
            </div>

            <div className="map-container mt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8943246953245!2d76.91642631478386!3d8.482843793901775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbed1cc8f575%3A0x3a9fb8736d3e8590!2siLearn%20IAS%20Academy!5e0!3m2!1sen!2sin!4v1647887817943!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PageContainer;
