"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/common/Container";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const PageContainer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="_banner-box1">
          <div className="_banner-header-txt1">Contact Us</div>
          <div className="_banner-sub-header-txt1">
            Get in touch with us for inquiries about our programs, admission
            process, or to schedule a counselling session.
          </div>
        </div>

        {/* Image */}
        <div className="w-full flex justify-center py-8 px-4 md:px-0">
          <img
            src="/About/Carousel/img1.jpg"
            alt="iLearn IAS Building"
            className="rounded-xl shadow-lg w-full max-w-2xl object-cover"
          />
        </div>

        <Container className="pb-4 md:pb-16 px-4 md:px-0">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "#e31837" }}
            >
              How to Reach Us
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Visit our campus for a personal consultation or reach out through
              any of our contact channels.
            </p>
          </div>

          {/* Map (left on desktop), Contact Info (right on desktop) */}
          <div className="flex flex-col md:flex-row-reverse gap-8 justify-center items-start w-full px-0">
            {/* Contact Info */}
            <div className="flex-1 max-w-lg w-full flex flex-col gap-6">
              {/* Location */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <IoLocationSharp className="text-white w-7 h-7" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Our Location</div>
                  <div className="text-gray-600 text-sm mb-1">
                    iLearn IAS Academy, Minchin Road, Chakka,
                    Thiruvananthapuram, Kerala 695011
                  </div>
                  <div className="text-gray-500 text-xs">
                    Monday to Saturday: 9:00 AM - 8:00 PM
                    <br />
                    Sunday: Closed (Online support available)
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                  <FaPhoneAlt className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Phone</div>
                  <div className="text-gray-600 text-sm mb-1">8089166792</div>
                  <a
                    href="tel:8089166792"
                    className="text-blue-700 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    <FaPhoneAlt className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <FaWhatsapp className="text-white w-60 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">WhatsApp</div>
                  <div className="text-gray-600 text-sm mb-1">
                    Chat with us for quick responses to your queries
                  </div>
                  <div className="flex gap-2 mt-1">
                    <a
                      href="https://wa.me/918089166792"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-300 hover:bg-green-200 transition"
                    >
                      Chat Now
                    </a>
                    <a
                      href="https://wa.me/918089166792?text=I%20have%20an%20inquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-300 hover:bg-gray-200 transition"
                    >
                      Send Inquiry
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                  <MdEmail className="text-white w-7 h-7" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Email</div>
                  <div className="text-gray-600 text-sm mb-1">
                    ilearnoffic@gmail.com
                  </div>
                  <a
                    href="mailto:ilearnoffic@gmail.com"
                    className="text-red-600 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    <MdEmail className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 max-w-xl w-full">
              <div className="rounded-xl overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8943246953245!2d76.91642631478386!3d8.482843793901775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbed1cc8f575%3A0x3a9fb8736d3e8590!2siLearn%20IAS%20Academy!5e0!3m2!1sen!2sin!4v1647887817943!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[350px]"
                ></iframe>
              </div>
              <div className="mt-2 text-left">
                <a
                  href="https://goo.gl/maps/2Qw1v6Qw1v6Qw1v6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-700 hover:underline mt-2 text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.362 17.748a9.043 9.043 0 01-3.362.652c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9s9 4.03 9 9c0 1.21-.23 2.37-.652 3.362M15 19l2 2 4-4"
                    />
                  </svg>
                  Get directions on Google Maps
                </a>
                <div className="text-xs text-gray-400 mt-1">
                  Central Location
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 mb-8">
            {/* YouTube */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl shadow-sm p-3 min-h-[80px]">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600">
                <FaYoutube className="text-white w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">YouTube</span>
                <span className="text-gray-500 text-xs">
                  Video lessons & strategy...
                </span>
                <a
                  href="#"
                  className="text-red-600 text-xs font-medium hover:underline flex items-center gap-1"
                >
                  Subscribe <span className="text-xs">→</span>
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl shadow-sm p-3 min-h-[80px]">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, #e1306c 0%, #833ab4 100%)",
                }}
              >
                <FaInstagram className="text-white w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">Instagram</span>
                <span className="text-gray-500 text-xs">
                  Study tips & updates
                </span>
                <a
                  href="#"
                  className="text-pink-600 text-xs font-medium hover:underline flex items-center gap-1"
                >
                  Follow <span className="text-xs">→</span>
                </a>
              </div>
            </div>

            {/* Facebook */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl shadow-sm p-3 min-h-[80px]">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600">
                <FaFacebook className="text-white w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">Facebook</span>
                <span className="text-gray-500 text-xs">Community & news</span>
                <a
                  href="#"
                  className="text-blue-600 text-xs font-medium hover:underline flex items-center gap-1"
                >
                  Like Page <span className="text-xs">→</span>
                </a>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;
