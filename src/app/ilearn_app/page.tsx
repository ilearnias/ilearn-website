"use client";
import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import { Col, Container, Row } from "react-bootstrap";
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const AppFeatures = [
  {
    title: "Interactive Learning",
    description: "Engage with interactive content and quizzes"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your study progress and performance"
  },
  {
    title: "Study Materials",
    description: "Access comprehensive study materials anytime"
  },
  {
    title: "Mock Tests",
    description: "Practice with realistic mock tests"
  }
];

const UserReviews = [
  {
    name: "Rahul K",
    rating: 5,
    review: "The best app for civil service preparation! The study materials are regularly updated, make it effortless."
  },
  {
    name: "Anjali S",
    rating: 4,
    review: "Great content and user interface. Very helpful for maintaining regular study patterns."
  },
  {
    name: "Vidya R",
    rating: 5,
    review: "Being able to access all study materials on the go is a real game-changer. The performance tracking really helps."
  }
];

const FAQs = [
  {
    question: "Is the app free to download?",
    answer: "Yes, the app is free to download. However, some premium features and content may require a subscription or one-time purchase."
  },
  {
    question: "Can I access my course content from the app?",
    answer: "Yes, if you are enrolled in any of our programs, you can access all your course content directly through the mobile app after logging in."
  },
  {
    question: "Does the app work offline?",
    answer: "Yes, you can access study materials, videos, and tests for offline access. However, some features may require an active internet connection."
  },
  {
    question: "How often is the content updated?",
    answer: "Content updates are uploaded daily, while major materials are kept always up-to-date with current events and examination patterns."
  }
];

const ILearnAppPage = () => {
  return (
    <>
      <Header />
      <HeroSection title="iLearn App" pageName="iLearn App" />
      <div className="app-landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <div className="app-content">
                  <h1>Learn Anytime, Anywhere</h1>
                  <p>Download the iLearn IAS app and start your UPSC preparation journey today.</p>
                  <div className="download-buttons">
                    <a href="#" className="download-btn">
                      <FaGooglePlay /> Get it on Play Store
                    </a>
                    <a href="#" className="download-btn">
                      <FaApple /> Download on App Store
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="app-image">
                  {/* Add your app screenshot or mockup image here */}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <Container>
            <h2>App Features</h2>
            <Row>
              {AppFeatures.map((feature, index) => (
                <Col md={3} sm={6} key={index}>
                  <div className="feature-card">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* App Screenshots Section */}
        <section className="screenshots-section">
          <Container>
            <h2 className="section-title text-center">App Screenshots</h2>
            <p className="section-subtitle text-center">Take a look at the intuitive interface and features of the iLearn IAS App.</p>
            <div className="screenshot-tabs">
              <button className="tab active">All View</button>
              <button className="tab">Preview</button>
              <button className="tab">Test Progress</button>
            </div>
            <div className="screenshot-gallery">
              {/* Screenshot placeholders - will be added later */}
            </div>
          </Container>
        </section>

        {/* User Reviews Section */}
        <section className="reviews-section">
          <Container>
            <h2 className="section-title text-center">User Reviews</h2>
            <Row>
              {UserReviews.map((review, index) => (
                <Col md={4} key={index}>
                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer-name">{review.name}</div>
                      <div className="review-rating">
                        {"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}
                      </div>
                    </div>
                    <p className="review-content">{review.review}</p>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="review-summary text-center">
              <div className="rating">4.8/5</div>
              <div className="total-reviews">(5000+ reviews)</div>
            </div>
          </Container>
        </section>

        {/* Download App Section */}
        <section className="download-section" id="download">
          <Container>
            <h2 className="section-title text-center">Download the App Today</h2>
            <p className="section-subtitle text-center">Take your IAS learning preparation to the next level with our comprehensive mobile learning platform.</p>
            <div className="download-buttons">
              <a href="#" className="store-button google-play">
                <FaGooglePlay className="store-icon" />
                <div className="button-text">
                  <span>GET IT ON</span>
                  <strong>Google Play</strong>
                </div>
              </a>
              <a href="#" className="store-button app-store">
                <FaApple className="store-icon" />
                <div className="button-text">
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </a>
            </div>
            <div className="download-count text-center">
              <span>50,000+ downloads</span>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <Container>
            <h2 className="section-title text-center">Frequently Asked Questions</h2>
            <div className="faq-container">
              {FAQs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <div className="faq-question">
                    <span>{faq.question}</span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ILearnAppPage;
