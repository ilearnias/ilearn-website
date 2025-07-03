import { Col,  Row } from "react-bootstrap";
import ScreenshotsSection from "./ScreenshotsSection";
import Container from "@/components/common/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Review = {
  name: string;
  rating: number;
  review: string;
};

const ReviewsSection = ({ reviews }: { reviews: Review[] }) => (
  <section className="reviews-section">
    <Container>
      
      <h2 className="section-title text-center">User Reviews</h2>
      <Row>
        {reviews.map((review, index) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: false });
          return (
            <Col md={4} key={index}>
              <motion.div
                ref={ref}
                className="review-card"
                initial={{ opacity: 0, y: 160, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 160, scale: 0.95 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
              >
                <div className="review-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div className="review-avatar-wrapper" style={{ paddingLeft: '10px', paddingRight: '16px' }}>
                    <img
                      src="/About/team/dummy.jpg"
                      alt="User Avatar"
                      className="review-avatar"
                      style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="reviewer-name">{review.name}</div>
                    <div className="review-rating">
                      {"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}
                    </div>
                  </div>
                </div>
                <p className="review-content">{review.review}</p>
              </motion.div>
            </Col>
          );
        })}
      </Row>
      <div className="review-summary text-center">
        <div className="rating">4.8/5</div>
        <div className="total-reviews">(5000+ reviews)</div>
      </div>
    </Container>
  </section>
);

export default ReviewsSection; 