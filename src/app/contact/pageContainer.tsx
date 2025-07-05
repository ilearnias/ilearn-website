"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useTranslation } from "react-i18next";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import Container from "@/components/common/Container";
import HeroSection from "@/components/common/HeroSection";
import "./styles.scss";
import Heading from "@/components/common/Heading";

const PageContainer = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection
        className="font-bold"
        titleClassName="font-bold"
        title="Get in Touch"
        pageName="Contact Us"
        description="Have questions? We're here to help! Connect with our team for program inquiries, counseling sessions, or any assistance you need in your UPSC journey."
      />

      <section className="contact-section py-16">
        <Container className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <Heading
              color="tricolor"
              text="Contact Us"
              className="font-bold mb-4"
            ></Heading>

            <p className="text-gray-600 text-lg">
              Get in touch with us for inquiries about our programs, admission
              process, or to schedule a counselling session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="contact-info-container space-y-8">
              <div className="contact-card bg-white rounded-xl p-6 shadow-md transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="icon-container p-3 bg-primary/10 rounded-lg transition-all duration-300">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                    <p className="text-gray-600">
                      iLearn IAS Academy, Minchin Road, Chakka,
                      <br />
                      Thiruvananthapuram, Kerala 695011
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-card bg-white rounded-xl p-6 shadow-md transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="icon-container p-3 bg-primary/10 rounded-lg transition-all duration-300">
                    <FaClock className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Working Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday to Saturday: 9:00 AM - 8:00 PM
                    </p>
                    <p className="text-gray-600">
                      Sunday: Closed (Online support available)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="contact-card bg-white rounded-xl p-6 shadow-md transition-all duration-300">
                <div className="flex items-start space-x-4 h-full">
                  <div className="icon-container p-3 bg-primary/10 rounded-lg transition-all duration-300">
                    <FaPhone className="text-2xl text-primary" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Phone</h3>
                      <p className="text-gray-600 mb-3">8089166792</p>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="tel:8089166792"
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium group"
                      >
                        Call Now{" "}
                        <FaArrowRight className="ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-card bg-white rounded-xl p-6 shadow-md transition-all duration-300">
                <div className="flex items-start space-x-4 h-full">
                  <div className="icon-container p-3 bg-primary/10 rounded-lg transition-all duration-300">
                    <FaWhatsapp className="text-2xl text-primary" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                      <p className="text-gray-600 mb-3">
                        Chat with us for quick responses
                      </p>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="https://wa.me/918089166792"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium group"
                      >
                        Chat Now{" "}
                        <FaArrowRight className="ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-card bg-white rounded-xl p-6 shadow-md transition-all duration-300">
                <div className="flex items-start space-x-4 h-full">
                  <div className="icon-container p-3 bg-primary/10 rounded-lg transition-all duration-300">
                    <FaEnvelope className="text-2xl text-primary" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email</h3>
                      <p className="text-gray-600 mb-3">
                        ilearnoffic@gmail.com
                      </p>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="mailto:ilearnoffic@gmail.com"
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium group"
                      >
                        Send Email{" "}
                        <FaArrowRight className="ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="map-container mt-12">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8943246953245!2d76.91642631478386!3d8.482843793901775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbed1cc8f575%3A0x3a9fb8736d3e8590!2siLearn%20IAS%20Academy!5e0!3m2!1sen!2sin!4v1647887817943!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PageContainer;
